

## Fix Timezone Display and Auto-Selection

### Problem 1: Incorrect UTC Offsets
The timezone labels are hardcoded with **standard time** offsets (e.g., Germany shows "UTC+01:00 CET") but right now (April 2026) Germany is in **daylight saving time** and should show "UTC+02:00 CEST". This affects all countries that observe DST -- most of Europe, North America, Australia, etc.

**Fix**: Compute timezone labels dynamically at runtime using JavaScript's `Intl.DateTimeFormat` API. This automatically reflects the current DST state.

### Problem 2: Auto-Select Not Triggering
When selecting a country with only one timezone (e.g., Germany), the timezone should auto-fill. Currently the auto-select code only runs when the existing timezone is *invalid* for the new country -- it skips auto-selection when no timezone was previously set.

**Fix**: Also auto-select when the timezone field is empty and there's exactly one option.

### Changes

#### File: `src/utils/countryRegionMapping.ts`
- Replace static `TIMEZONE_LIST` labels with a helper function `getTimezoneLabel(ianaName)` that computes the current UTC offset and abbreviation dynamically using `Intl.DateTimeFormat`
- Keep the `value` (IANA identifier) unchanged
- Add a `getFormattedTimezoneList()` function that returns the list with current-correct labels
- Update `getTimezonesForCountry()` to use dynamic labels

#### File: `src/components/campaigns/CampaignMARTRegion.tsx`
- Use `getFormattedTimezoneList()` and updated `getTimezonesForCountry()` for dropdown options
- Fix `handleCountryChange`: when `!newForm.timezone && validTzs.length === 1`, auto-set timezone
- Fix `getTimezoneDisplay()` to use dynamic label computation

### Technical Detail

Dynamic label generation:
```typescript
function getTimezoneLabel(iana: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: iana,
    timeZoneName: "shortOffset"  // e.g. "GMT+2"
  });
  // Extract offset, convert to "UTC+02:00" format
  // Get long name via "long" option
  // Return "UTC+02:00 Central European Summer Time (CEST)"
}
```

This ensures Germany shows `UTC+02:00` during summer and `UTC+01:00` during winter, automatically.

### Files Modified

| File | Change |
|------|--------|
| `src/utils/countryRegionMapping.ts` | Dynamic timezone label generation replacing static labels |
| `src/components/campaigns/CampaignMARTRegion.tsx` | Auto-select single timezone, use dynamic labels |

