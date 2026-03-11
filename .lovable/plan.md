

## Notification Settings - Complete Audit and Fix

### Bugs Found

1. **"Leads" in Modules section** -- Should be "Deals" since Leads module was removed and Deals is a core module. The DB column `leads_notifications` maps to the old Leads module.
2. **push_notifications toggle missing** -- Column exists in DB, preference is loaded/saved, but no UI toggle is rendered.
3. **Email/In-App toggles not visually responsive** -- The `ToggleChip` component works functionally but the Switch may appear stuck due to auto-save debounce (600ms). No visual feedback that the save happened.
4. **"Lead Assigned" event is dead** -- No backend trigger checks the `lead_assigned` preference. The `create_lead_notification` trigger fires unconditionally. Since Leads was removed, this event name is confusing.
5. **"Meeting Reminders" event is dead** -- No meeting system exists in the app. No trigger or edge function generates meeting-related notifications. This is a dead toggle.
6. **"Weekly Digest" event is dead** -- No weekly digest edge function or cron job exists. Toggle saves to DB but nothing reads it.
7. **Notification triggers ignore user preferences** -- `create_unified_action_item_notification`, `create_deal_notification`, `create_lead_notification` all insert notifications without checking if the user has the relevant preference enabled (e.g., `deal_updates`, `contacts_notifications`).
8. **No save confirmation** -- User has no feedback that toggling a switch actually persisted.

### Plan

#### 1. Fix Modules Section -- Replace "Leads" with "Deals"

**File: `src/components/settings/account/NotificationsSection.tsx`**
- Change `leads_notifications` label from "Leads" to "Deals"
- Reorder: Accounts, Contacts, Deals
- Add `deals_notifications` concept mapped to existing `leads_notifications` DB column (reuse column, just relabel)
  - Note: We reuse the existing `leads_notifications` column to avoid a migration. The column name is internal; the UI label is what matters.

#### 2. Remove Dead Event Toggles, Rename Others

**Events section changes:**
- Remove "Lead Assigned" (`lead_assigned`) -- Leads module removed, and no backend checks this
- Remove "Meeting Reminders" (`meeting_reminders`) -- No meeting system exists
- Remove "Weekly Digest" (`weekly_digest`) -- No backend implementation
- Keep "Deal Updates" (`deal_updates`) -- `create_deal_notification` trigger exists
- Keep "Action Reminders" (`task_reminders`) -- `daily-action-reminders` edge function checks this
- Add "Contact Updates" -- map to `contacts_notifications` (already exists), shown as event

Simplified events: **Deal Stage Changes**, **Action Item Reminders**

#### 3. Add Push Notifications Toggle (or Remove)

Since there's no push notification infrastructure, remove `push_notifications` from the interface entirely. Keep the DB column for future use but don't expose a non-functional toggle.

#### 4. Add Save Feedback

- Show a subtle toast or inline "Saved" indicator when auto-save completes successfully
- Add a brief checkmark animation or text near the section header

#### 5. Redesigned Layout

Replace the current flat grid with a cleaner grouped layout:

```text
DELIVERY CHANNELS
┌─────────────────────────────────────────────┐
│ Email Notifications    [toggle]             │
│ In-App Notifications   [toggle]             │
│ Frequency  [Instant ▾]  Reminder [7:00 AM ▾]│
└─────────────────────────────────────────────┘

NOTIFY ME ABOUT
┌─────────────────────────────────────────────┐
│ Deal Stage Changes     [toggle]             │
│ Action Item Reminders  [toggle]             │
│ Account Updates        [toggle]             │
│ Contact Updates        [toggle]             │
└─────────────────────────────────────────────┘
```

This merges the confusing "Modules" and "Events" sections into a single "Notify Me About" section since the distinction was unclear and most toggles were non-functional.

### Files to Modify

- `src/components/settings/account/NotificationsSection.tsx` -- Complete rewrite of layout and toggle list
- `src/components/settings/AccountSettingsPage.tsx` -- Simplify `NotificationPrefs` interface, remove dead fields from state

### Technical Details

**Interface simplification:**
```typescript
interface NotificationPrefs {
  email_notifications: boolean;
  in_app_notifications: boolean;
  push_notifications: boolean;      // kept for DB compat, not shown
  deal_updates: boolean;
  task_reminders: boolean;
  notification_frequency: string;
  leads_notifications: boolean;      // reused as "Deals" toggle
  contacts_notifications: boolean;
  accounts_notifications: boolean;
  daily_reminder_time: string;
  // Remove from UI (keep in DB): lead_assigned, meeting_reminders, weekly_digest
}
```

**Save function still writes all fields** to avoid nullifying existing DB values. We just stop rendering the dead toggles.

**No database migration needed** -- we're only changing UI labels and hiding unused toggles. The DB columns remain for backward compatibility.

