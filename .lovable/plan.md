

# Replace Health Plan Logo with Blue Cross Blue Shield of Illinois

## Summary

Replace the text-based "Blue Cross of California" branding in the Health Plan sidebar with the uploaded Blue Cross Blue Shield of Illinois logo image.

## Current State

The sidebar currently displays plain text for the Health Plan role:
```tsx
<div className="flex flex-col">
  <span className="text-lg font-display font-bold text-sidebar-foreground">Blue Cross</span>
  <span className="text-xs text-sidebar-foreground/70">of California</span>
</div>
```

## Changes

### 1. Copy the Logo to Project Assets

Copy the uploaded image to the project's assets folder:
- **Source**: `user-uploads://image-16.png`
- **Destination**: `src/assets/bcbs-illinois-logo.png`

### 2. Update Sidebar Component

| File | Change |
|------|--------|
| `src/components/layout/Sidebar.tsx` | Import the new logo and replace the text with an `<img>` tag |

#### Code Changes

**Add import:**
```typescript
import bcbsIllinoisLogo from '@/assets/bcbs-illinois-logo.png';
```

**Replace the healthplan conditional (lines 113-117):**
```tsx
// Before
<div className="flex flex-col">
  <span className="text-lg font-display font-bold text-sidebar-foreground">Blue Cross</span>
  <span className="text-xs text-sidebar-foreground/70">of California</span>
</div>

// After
<img 
  src={bcbsIllinoisLogo} 
  alt="Blue Cross Blue Shield of Illinois" 
  className="h-12 object-contain"
/>
```

## Result

The Health Plan sidebar will display the official Blue Cross Blue Shield of Illinois logo instead of plain text, matching the styling pattern already used for the CBO (LA Food Bank) and Member (Umoja) portals.

