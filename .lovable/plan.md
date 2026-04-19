

## Simplify Create Campaign Modal

### Issues found in current modal
1. **Tags field** — user wants removed (rarely used, clutters form)
2. **Priority field too wide** — full-width select for a 3-option enum wastes space
3. **Section labels redundant** — "Basics", "Schedule", "Reach", "Details" add visual noise for a small form
4. **Type dropdown shows description sub-text** — makes options tall and noisy
5. **Goal field placement** — paired oddly with Primary Channel; goal is more of a detail than a reach setting
6. **Description textarea** — 3 rows + own section for an optional field
7. **Owner defaults to current user but still shown as required selector** — most users only ever pick themselves
8. **Status field in edit mode** — shown disabled with helper text taking 2 lines (clutter)
9. **Tag helper text** — "Up to 10 tags. Use Enter or comma to add." (will be removed with tags)
10. **Modal vertical density** — lots of `space-y` and section gaps make it feel longer than needed

### New compact layout

```text
┌─ Create Campaign ──────────────────────────┐
│ Name *                                      │
│ [____________________________________]      │
│                                             │
│ Type *              Priority                │
│ [New Outreach ▾]    [● Medium ▾] (compact) │
│                                             │
│ Owner *             Channel                 │
│ [Deepak ▾]          [Email ▾]               │
│                                             │
│ Start *             End *                   │
│ [date]              [date]                  │
│                                             │
│ Goal (optional)                             │
│ [e.g. 50 demos booked_______________]       │
│                                             │
│ Description (optional)                      │
│ [_________________________________]  2 rows │
│                                             │
│              [Cancel]  [Create]             │
└─────────────────────────────────────────────┘
```

### Specific changes to `CampaignModal.tsx`

**Remove:**
- All `<SectionLabel>` headings + the component definition
- Tags field (chips input + helper text + state: `tagInput`, `addTagFromInput`, `removeTag`, `handleTagKeyDown`)
- `tags` from form state and submit payload
- Type option `description` sub-text in dropdown items (keep just the label — cleaner)
- Status read-only field + helper text in edit mode (status belongs in header; no need to show here at all)
- Helper paragraph under tags

**Restructure into 5 compact rows:**
1. Name (full width)
2. Type + Priority (50/50) — Priority becomes a compact select with just colored dot + label
3. Owner + Primary Channel (50/50) — moves Channel up next to Owner
4. Start Date + End Date (50/50)
5. Goal (full width, single input)
6. Description (full width, 2 rows instead of 3)

**Tighten spacing:**
- `gap-3` → `gap-2.5` between rows
- Remove `mt-1` on section labels (no longer exist)
- Reduce `py-2` padding on grid container
- Modal stays `sm:max-w-[520px]` (slightly narrower since less content)

**Priority compact rendering:**
- Trigger shows: `● Medium` (dot + word, no extra padding)
- Same width as Type select beside it (50% column)

### Files to modify
| File | Change |
|------|--------|
| `src/components/campaigns/CampaignModal.tsx` | Rewrite layout: remove tags/sections/status field, regroup fields into compact rows, simplify type dropdown, tighten spacing |

### Out of scope
- Removing fields from DB (tags column stays for backward compat)
- Changing `useCampaigns` hook (still accepts `tags` optionally; we just send `[]` or omit)
- Editing other modals

