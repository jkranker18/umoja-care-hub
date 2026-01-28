

# Update Sidebar Logo for Better Contrast

## Overview
Replace the current Umoja logo in the sidebar with the new 2-color version that has white text, ensuring proper contrast against the dark sidebar background.

## Current State
- The sidebar uses `umoja-food-for-health-logo.webp` which appears to have dark text
- This causes contrast issues on the dark `bg-sidebar` background
- CBO portal uses LA Food Bank logo (will remain unchanged)

## Implementation

### Step 1: Copy New Logo to Assets
Copy the uploaded logo to the project assets folder:
- **Source:** `user-uploads://Umoja-FoodForHealth_Logo-2C.png`
- **Destination:** `src/assets/umoja-logo-light.png`

### Step 2: Update Sidebar Component
**File:** `src/components/layout/Sidebar.tsx`

Update the import and usage:

```tsx
// Update import
import umojaLogoLight from '@/assets/umoja-logo-light.png';

// In the logo area (lines 126-131)
<img 
  src={umojaLogoLight} 
  alt="Umoja Food For Health" 
  className="h-10 object-contain"
/>
```

## Files to Modify
1. Copy `user-uploads://Umoja-FoodForHealth_Logo-2C.png` to `src/assets/umoja-logo-light.png`
2. `src/components/layout/Sidebar.tsx` - Update logo import and reference

## Result
- Member, Health Plan, and Internal Ops portals will display the new light-colored logo
- CBO portal continues to show the LA Food Bank logo
- Proper contrast on the dark sidebar background

