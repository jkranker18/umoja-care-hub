

# Swap Logos: Umoja in Sidebar, HCSC in Header (Health Plan Portal)

## Overview
For `/healthplan` pages, the sidebar currently shows the HCSC logo and the header shows the Umoja logo. You want them swapped: **Umoja FFH logo in the sidebar**, **HCSC logo in the header**.

## Changes

### 1. Sidebar (`src/components/layout/Sidebar.tsx`)
- Change the `healthplan` condition to show the **Umoja light logo** (`umojaLogoLight`) instead of `hcscLogo`
- Update alt text to "Umoja Food For Health"

### 2. Header (`src/components/layout/Header.tsx`)
- Import `useApp` from AppContext and `hcscLogo` asset
- When `currentRole === 'healthplan'`, display the **HCSC logo** instead of the default Umoja logo
- Keep the default Umoja logo for all other roles

### Files Modified
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`

