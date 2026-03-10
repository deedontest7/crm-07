

## Fix Action Item Modal - Module Options and Searchable Record Dropdown

### Changes Required

#### 1. Add 'accounts' to ModuleType and reorder options

**File: `src/hooks/useActionItems.tsx`** (line 9)
- Change `ModuleType` to: `'accounts' | 'contacts' | 'deals'` (remove `'leads'`, add `'accounts'`)

**File: `src/components/ActionItemModal.tsx`** (lines 70-74)
- Update `moduleOptions` to: Accounts, Contacts, Deals (remove Leads)
- Update `defaultModuleType` default from `'deals'` to `'accounts'`

**File: `src/hooks/useModuleRecords.tsx`**
- Add `accounts` case: query `accounts` table for `id, account_name`, ordered by `account_name`
- Remove `leads` case
- Update `useModuleRecordName` and `useModuleRecordNames` similarly

#### 2. Replace Record Select with searchable Command/Combobox

**File: `src/components/ActionItemModal.tsx`**
- Replace the Record `<Select>` (lines 214-235) with a Popover + Command pattern (same as `AccountSearchableDropdown`)
- Add local `searchValue` state, filter records by search text
- Use `CommandInput` for search, `CommandList` with `CommandItem` for results
- Set popover width to match trigger width via `w-[--radix-popover-trigger-width]`
- Include "No linked record" as first option, loading spinner when fetching

#### 3. Update references

- Update `ActionItemsTable.tsx` `handleLinkedRecordClick` to handle `accounts` module type
- Update `getRecordPlaceholder` to include accounts case
- Update filter type in `useActionItems.tsx` to include `'accounts'`

### Technical Notes
- The searchable dropdown follows the existing `AccountSearchableDropdown` pattern using `Command` + `Popover`
- No new dependencies needed -- `cmdk` is already installed
- The `accounts` table already exists with `id` and `account_name` columns

