## Reply Detection — Root Cause & Fix Plan

### What's actually broken (verified against live data)

The reply at **2026-04-28 20:35:59** from `deedontest1@gmail.com` (visible in your screenshot, "29 Apr 02:08") is sitting in `email_reply_skip_log` with `skip_reason = chronology`. It is one of **4 chronology-skipped replies** in the last 24 hours, plus one historical from Apr 24. None of them landed in the conversation reader because the same chain of failures keeps repeating:

1. **Outbound emails ship without working threading headers.** `azure-email.ts` first tries standard `In-Reply-To`/`References` against Microsoft Graph, Graph rejects them with `ErrorInvalidInternetMessageHeader`, then we fall back to **`x-In-Reply-To`/`x-References`**. Gmail and Outlook both **ignore `x-` prefixed headers** for threading. So replies arrive with no usable In-Reply-To pointing at our outbound's `internet_message_id`.

2. **`createReply` (the only path that produces *real* RFC 5322 threading) returns 403 ErrorAccessDenied.** When the parent was sent as the shared mailbox `crm@realthingks.com`, the function calls `createReply` against the user mailbox `deepak.dongare@realthingks.com/messages/{id}` — wrong mailbox, message not found, 403. Code attempts a partial mailbox swap but only *after* the first failure and only when explicitly `sentAsShared=true`. Today's parent (`9f1b2562`) was sent with `sender_email = deepak.dongare@realthingks.com` and `sent_as_shared = false`, so the swap logic doesn't even trigger — yet the recipient's reply still has no usable In-Reply-To, proving the standard-header send path is the real culprit.

3. **Outlook rotates `conversationId` on every send** because it never sees a real In-Reply-To from us. The DB shows two outbounds to the same contact with the same subject sent 3 minutes apart, each in a *different* `conversation_id`. The contact's reply lands in conv `...ACrsQoXR...` which only contains the 20:38 outbound — but the reply was received at 20:35:59, *before* 20:38:14 → bucket chronology skips it. The **real parent** (`9f1b2562`, sent 20:35:27) is in a different bucket the reply detector never reaches.

4. **The `Step 1b` rescue path exists but isn't catching today's case.** Tracing the code shows the rescue *should* match `9f1b2562` (within ±10 min, subjects compatible, contact lookup hits). It's silently failing because either (a) Step 1's header IN-query is matching against `bccc7b5e`'s `internet_message_id` due to a header value that survived from an *earlier* thread, or (b) `bucketsByConvId.get(compatible.conversation_id)` returns empty when the rescue points at a conv whose key is filed under a different campaign/contact composite. We'll instrument and harden both branches.

5. **Some outbounds have `internet_message_id = NULL`** (e.g. `c06785f5`, `251d9fed` from 19:48 / 19:22). Even if the contact's mail client *did* stamp a proper In-Reply-To, header-anchored lookup can't match a NULL on our side. Cause: `fetchSentMessageMetadata` returns empty when the Sent Items lookup loses the race against the cron, and we persist the row anyway.

6. **UI: messages don't collapse on thread switch.** `expandedMessages: Set<string>` in `CampaignCommunications.tsx` is seeded from initial render but never cleared when the user clicks a different thread, leaving stale expansions.

---

### Fix plan

#### A. `supabase/functions/_shared/azure-email.ts` — fix outbound threading at the source

1. **Detect shared-mailbox parent up front.** Before calling `createReply`, compare `parentComm.sender_email` against the authenticated user. If they differ (or `sent_as_shared=true`), call `createReply` against the **parent's mailbox** (`/users/{parentSenderEmail}/messages/{id}/createReply`) on the *first* attempt — eliminates the 403 round-trip.
2. **Stop sending standard `In-Reply-To`/`References` via `sendMail`.** Graph rejects them; the `x-` retry produces headers no MUA respects. Either:
   - Path succeeds via `createReply` (which embeds proper RFC 5322 headers Graph generates server-side), or
   - We **hard-fail** with `errorCode: "REPLY_THREADING_BROKEN"` so the UI surfaces it instead of silently sending an unthreaded message.
3. **Remove the noisy "Standard threading headers rejected by Graph; retrying with x- prefix" warning** — it's no longer a fallback path.

#### B. `supabase/functions/send-campaign-email/index.ts` — preserve mailbox identity

4. **When sending a reply, route through the parent's mailbox.** If `parentComm.sender_email` differs from the current user's mailbox, set `replyMailbox = parentComm.sender_email` *before* calling `azureSendEmail`. Pairs with fix A1.
5. **Persist `internet_message_id` reliably.** Extend `fetchSentMessageMetadata` retry budget; if still empty, fall back to a `findSentMessageGraphId` lookup keyed on `conversationId` + `subject` + `recipient` to recover the Internet-Message-Id rather than writing NULL. If recovery still fails, write a placeholder `delivery_status='sent_no_metadata'` so the metadata back-fill cron can retry instead of leaving a permanent NULL.

#### C. `supabase/functions/check-email-replies/index.ts` — make the detector forgiving

6. **Always re-fetch `internetMessageHeaders` per relevant message** when the list endpoint returned an empty array, even when `conversationId` matches a tracked conv. Currently the per-message refetch only runs in the *non-matching* branch (line 432); move/duplicate it into the matching branch so header-anchored lookup always has data to work with.
7. **Loosen header normalization.** Strip `<>` AND lowercase on both sides before the IN query (we already generate variants, but contact replies sometimes return `In-Reply-To` quoted, with surrounding whitespace, or with `\r\n` folding from forwarded threads).
8. **Fix the rescue path's bucket lookup.** When Step 1b finds a `compatible` parent via subject+contact+time, **synthesize a bucket** from the recovered parent row instead of relying on `bucketsByConvId.get(...)` (which returns `[]` whenever the parent's conv was rotated or filed under a different composite key). Set `chosenBucketSample` directly from the recovered row.
9. **Add a "header anchored takes absolute precedence" guard.** Once Step 1 *or* Step 1b sets `headerAnchoredParent`, skip bucket chronology entirely — treat the header-anchored parent as authoritative regardless of `convEmails` membership.
10. **Loosen the chronology skew to 120 seconds** (currently 60s). Outlook's `receivedDateTime` versus our async `communication_date` insert routinely drifts >60s under load.
11. **One-shot replay at the end of the run**: query `email_reply_skip_log` rows from the last 24h with `skip_reason='chronology'` whose `parent_communication_id` no longer matches the closest header-or-rescue parent, and re-run them through the matcher. Insert successful matches into `campaign_communications`. Idempotent — already-inserted replies (same `internet_message_id` + contact) are skipped via existing dedupe.

#### D. `src/components/campaigns/CampaignCommunications.tsx` — UI collapse fix

12. **Reset `expandedMessages` on thread switch.** In the `useEffect` that fires when `selectedThreadKey` changes, call `setExpandedMessages(new Set([latestMessageId]))`. Fixes the "old messages stay expanded when I open a different thread" behaviour visible in the uploaded screenshot.

---

### Validation steps after deploy

1. Manually invoke `check-email-replies`. Confirm the **4 existing chronology-skipped replies** (Apr 28 19:12, 20:00, 20:23, 20:38) are ingested via the replay step (#11) and appear in the conversation reader.
2. Send a fresh email from the app, then reply from `deedontest1@gmail.com`. Within one cron tick the reply must show up under the original thread (not a new one) and the contact's mail client must show it threaded under our outbound (not a fresh thread).
3. Check `email_send_log` shows `success` with non-null `internet_message_id` for new sends.
4. Check edge logs no longer contain `"Standard threading headers rejected"` warnings or `createReply failed (403)` errors.
5. Click between two campaign threads in the UI and confirm previously-expanded messages collapse.

### Files touched

| File | Change |
|------|--------|
| `supabase/functions/_shared/azure-email.ts` | Mailbox-aware createReply; remove standard-header sendMail fallback; emit `REPLY_THREADING_BROKEN` on hard failure |
| `supabase/functions/send-campaign-email/index.ts` | Set `replyMailbox` from parent; reliable `internet_message_id` persistence |
| `supabase/functions/check-email-replies/index.ts` | Always-fetch headers; header-anchored precedence; rescue synthesizes bucket; 120s skew; 24h replay step |
| `src/components/campaigns/CampaignCommunications.tsx` | Reset `expandedMessages` on `selectedThreadKey` change |

### Out of scope

- Switching from cron to Microsoft Graph webhooks/subscriptions (architectural change — separate effort).
- Backfilling `internet_message_id` on the 3 historical NULL rows (one-shot SQL job — happy to run separately on request).
