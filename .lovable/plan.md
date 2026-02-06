

# Show Both Logos in Health Plan Sidebar

## Overview
Update the health plan sidebar header to display both the HCSC logo and the Umoja Food For Health logo side-by-side, with HCSC on the left and Umoja on the right — matching the uploaded reference image.

## Change

**File: `src/components/layout/Sidebar.tsx`** (lines ~114-120)

Replace the current healthplan logo block (which only shows HCSC) with a layout that shows both logos:

```tsx
) : currentRole === 'healthplan' ? (
  <div className="flex items-center gap-3 w-full">
    <img 
      src={hcscLogo} 
      alt="HCSC" 
      className="h-12 object-contain"
    />
    <img 
      src={umojaLogoLight} 
      alt="Umoja Food For Health" 
      className="h-10 object-contain"
    />
  </div>
)
```

No other files need to change. The `umojaLogoLight` import is already present in the file.

