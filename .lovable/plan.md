

# Add "Classes" Section to Education Tab

## Overview
Add an "On-Demand Classes" section between "Recommended for You" and "Explore More" in the Education tab, featuring three video cards that open iframed videos inline or in a dialog.

## Changes

### `src/pages/member/MemberHome.tsx`
1. Add a new "On-Demand Classes" section after the Recommended modules block (after line 765, before line 767)
2. Define a static array of 3 classes with title, description, category tag, and URL
3. Each class renders as a Card with a thumbnail/icon area, title, description, and a "Watch Now" button
4. Clicking "Watch Now" opens a Dialog containing an iframe pointing to the video URL (full-width, ~450px height)
5. Add state for the currently-selected video (`activeVideoUrl` / `activeVideoTitle`)
6. Import `Video` icon from lucide-react for the section header and card visuals

### Video data (hardcoded in component):
```typescript
const onDemandClasses = [
  { title: 'Cooking Class: Layered Roasted Vegetables', category: 'Cooking', url: '...vhpgo link...' },
  { title: 'Nutrition Basics: Salt', category: 'Nutrition', url: '...vhpgo link...' },
  { title: 'Beginner Treadmill Walking Workout', category: 'Exercise', url: '...vhpgo link...' },
];
```

### UI layout
- Section header: Video icon + "On-Demand Classes"
- 3-column grid (responsive: 1 col mobile, 3 col desktop)
- Each card: colored icon area at top, title, category badge, "Watch Now" button
- Dialog: full-width iframe embed of the selected video URL

