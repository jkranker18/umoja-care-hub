
# Fix HCSC Logo Visibility in Member Sidebar

## Problem
The HCSC logo has dark text, but the sidebar header has a dark background, making the logo invisible on member pages.

## Solution
Add a white background to the sidebar logo area specifically for the member (and any other role using the dark HCSC logo). This keeps the dark sidebar aesthetic while making the logo section readable.

## Changes

### `src/components/layout/Sidebar.tsx`
- On the logo container div (line 109), add a conditional white background when the current role uses the dark HCSC logo (i.e., `member` or `internal` roles -- the default case)
- Add rounded corners and some padding so it looks like a clean branded strip
- Specifically: add `bg-white rounded` classes to the logo wrapper div for roles that fall into the default (HCSC) case

### Files Modified
- `src/components/layout/Sidebar.tsx`
