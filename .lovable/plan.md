# Auto Activate / Revert-to-Draft Prompt for Setup

## Goal
Make the Draft → Active transition feel automatic:
1. The moment all 4 Setup sections (Region, Audience, Message, Timing) flip to done **while status is Draft**, show an "Activate Campaign?" popup automatically.
2. If the user later **unmarks** any Setup section while status is `Active`, `Scheduled`, or `Paused`, show a "Revert to Draft?" popup. On confirm, both the section is unmarked **and** status flips to `Draft`. On cancel, the unmark is rolled back so state stays consistent.
3. After reverting to Draft, when all 4 sections are marked done again, the Activate popup appears again (same flow as step 1).

## UX rules
- Activate popup re-uses the existing `activateOpen` AlertDialog — same copy, same scheduled-start warning. No new dialog component.
- The popup auto-fires only **once per "all-done" transition** (track the previous all-done state with a ref so it doesn't re-open on every re-render or after the user dismisses it). It fires again only after the campaign drops out of "all done" and re-enters it.
- Auto-popup is suppressed when: status is `Completed`/`Failed`, the campaign is read-only, or `isCampaignEnded` is true (end date passed).
- Revert-to-Draft popup is a new small AlertDialog; copy: "Revert to Draft? This will pause outreach and monitoring so you can edit the {section} setup."
- Toast messages remain ("Region marked as done"); the popup appears immediately after.

## Technical changes

### `src/pages/CampaignDetail.tsx`
- Add a `useEffect` watching `isFullyStrategyComplete` + `currentStatus`. When it transitions `false → true` and status is `Draft` (and not ended/read-only), `setActivateOpen(true)`. Use a `useRef<boolean>` to remember the previous value so we only fire on the edge.
- Add `revertOpen` state + `pendingRevertSection` ref holding `{ flag, label }` so the dialog knows which section triggered it.
- Pass a new optional prop `onSectionUnmarkRequiresRevert?: (flag, label) => boolean` to `CampaignStrategy`. If status is non-Draft/non-Completed and the user clicks an already-done circle, the page intercepts: opens revert dialog instead of immediately calling `updateStrategyFlag(flag, false)`.
- Confirm handler: `await updateStrategyFlag(flag, false)` then `performStatusChange("Draft")`.
- Cancel handler: do nothing (section stays done).

### `src/components/campaigns/CampaignStrategy.tsx`
- Accept the new optional callback. In `handleUnmark`, if the callback returns `true` (intercepted), skip the local update — the page handles it.
- No other behavior changes.

## Bugs / improvements found during review

1. **Status guard inconsistency**: `buildMenuOptions` allows "Revert to Draft" only from `Paused`, but the Setup-driven revert flow needs to also work from `Active` and `Scheduled`. Decision: the auto-revert popup bypasses the menu rule (it's an explicit user-confirmed action triggered by editing setup). The menu itself stays unchanged to keep manual reverts conservative.
2. **Race on rapid toggling**: clicking "mark done" on the 4th section while the previous section's mutation is still pending could fire the popup before the DB flip lands. Mitigation: the popup reads `isFullyStrategyComplete` from the same `detail` snapshot, which already updates after `updateStrategyFlag` resolves, so the edge-detect ref is safe. No extra debounce needed.
3. **`isCampaignEnded` Draft case**: existing banner already says "End date has passed while still in Draft." Auto-activate popup must be suppressed here so we don't prompt to activate an expired campaign.
4. **`Completed` campaigns**: `isReadOnly` is already true; popup is suppressed via the same guard.
5. **Toast spam**: when reverting, we currently emit "Region unmarked" toast plus would emit a "Status changed" toast. Suppress the section unmark toast in the revert path (page already shows the dialog + we can show one combined toast: "Reverted to Draft — edit {section} and re-activate when ready").
6. **Audience hint suppression edge case** (pre-existing, not part of this task but flagged): in `CampaignStrategy.validateSection`, the audience reachable-on-primary check uses `counts.contactCount` truthiness — if `contactCount` is `0` the message is correctly skipped, but if it's `undefined` (loading) the warning also hides. Acceptable, just noting.
7. **Mobile dialog overflow**: existing `AlertDialog` content is fine at 1176px; no changes needed.

## Out of scope
- No changes to status state machine in `campaignStatus.ts` (`allowedTransitions` stays as-is).
- No DB changes; uses existing `region_done`/`audience_done`/`message_done`/`timing_done` flags and existing status mutation.
- No changes to send/queue logic.

## Files touched
- `src/pages/CampaignDetail.tsx` — auto-popup effect, revert dialog, intercept callback wiring.
- `src/components/campaigns/CampaignStrategy.tsx` — accept and call the optional intercept callback in `handleUnmark`.
