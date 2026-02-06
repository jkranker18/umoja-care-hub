

# HCSC Logo on Member Pages

## Overview
Replace the Umoja FFH logo with the HCSC logo in both the sidebar and the main header when viewing `/member` pages.

## Changes

### 1. Sidebar (`src/components/layout/Sidebar.tsx`)
- The default/member case currently shows `umojaLogoLight` -- change it to show `hcscLogo` with appropriate alt text and sizing

### 2. Header (`src/components/layout/Header.tsx`)
- Expand the conditional so that both `healthplan` and `member` roles show the HCSC logo instead of the Umoja logo

### Files Modified
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`

