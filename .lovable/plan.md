

# Add Trackers Tab (Food Diary & Activity Tracker)

## Overview

Add a new "Trackers" tab to the Member Home page, positioned between Health Coach and Profile in the navigation. This tab will contain two sub-sections:
1. **Food Diary** - Log daily meals and snacks
2. **Activity Tracker** - Log physical activities and exercise

---

## UI Structure

The Trackers tab will use an internal layout with two cards or sub-tabs:

```text
+--------------------------------------------------+
| TRACKERS TAB                                      |
+--------------------------------------------------+
|                                                   |
|  [Food Diary]              [Activity Tracker]     |
|  +-----------------------+ +--------------------+ |
|  | Today's Meals         | | Today's Activity   | |
|  | + Add Breakfast       | | + Add Activity     | |
|  | + Add Lunch           | |                    | |
|  | + Add Dinner          | | Steps: ___         | |
|  | + Add Snack           | | Minutes: ___       | |
|  |                       | | Type: Walking...   | |
|  | [View History]        | | [View History]     | |
|  +-----------------------+ +--------------------+ |
|                                                   |
+--------------------------------------------------+
```

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/pages/member/MemberHome.tsx` | Add "trackers" tab with Food Diary and Activity Tracker UI |
| `src/components/layout/Sidebar.tsx` | Add Trackers nav item with tabId: 'trackers' |
| `src/hooks/useFoodDiary.ts` | New hook for managing food diary entries (localStorage) |
| `src/hooks/useActivityTracker.ts` | New hook for managing activity entries (localStorage) |

---

## Technical Details

### 1. Sidebar.tsx Update

Add new nav item to `memberNav` array:

```typescript
const memberNav: NavItem[] = [
  { label: 'Home', path: '/member', icon: Home, tabId: 'overview' },
  { label: 'My Program', path: '/member', icon: ClipboardList, tabId: 'plan' },
  { label: 'My Orders', path: '/member', icon: Package, tabId: 'orders' },
  { label: 'Education', path: '/member', icon: FileText, tabId: 'content' },
  { label: 'Health Coach', path: '/member', icon: CalendarCheck, tabId: 'coach' },
  { label: 'Trackers', path: '/member', icon: Activity, tabId: 'trackers' },  // NEW
  { label: 'Profile', path: '/member/profile', icon: User },
];
```

Import `Activity` icon from lucide-react.

### 2. MemberHome.tsx Updates

**Add new TabsTrigger and TabsContent:**

```tsx
<TabsTrigger value="trackers">Trackers</TabsTrigger>

<TabsContent value="trackers" className="space-y-6">
  {/* Food Diary and Activity Tracker components */}
</TabsContent>
```

### 3. useFoodDiary.ts Hook (New File)

Manages food diary entries with localStorage persistence:

```typescript
interface FoodEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  timestamp: string;
}

// Functions: addEntry, getEntriesByDate, deleteEntry
```

### 4. useActivityTracker.ts Hook (New File)

Manages activity entries with localStorage persistence:

```typescript
interface ActivityEntry {
  id: string;
  date: string;
  activityType: string;  // walking, running, swimming, etc.
  duration: number;      // minutes
  steps?: number;        // optional step count
  notes?: string;
  timestamp: string;
}

// Functions: addActivity, getActivitiesByDate, deleteActivity
```

### 5. Trackers Tab Content

The tab will include:

**Food Diary Section:**
- Date selector (today by default)
- Add meal buttons for Breakfast, Lunch, Dinner, Snack
- Simple form dialog to log meal description
- Daily meal list showing logged entries
- Quick delete option

**Activity Tracker Section:**
- Date selector (synced with Food Diary)
- Add activity form with:
  - Activity type dropdown (Walking, Running, Swimming, Cycling, Strength Training, Yoga, Other)
  - Duration in minutes
  - Optional step count
  - Optional notes
- Daily activity summary
- List of logged activities

---

## Data Persistence

Both trackers use localStorage for demo purposes:
- `umoja-food-diary` - stores food entries
- `umoja-activity-log` - stores activity entries

This follows the existing pattern used by `useEducationProgress` and `useSupportCases`.

---

## Icons Used

| Feature | Icon |
|---------|------|
| Trackers nav item | `Activity` |
| Food Diary | `UtensilsCrossed` or `Apple` |
| Activity Tracker | `Footprints` or `Dumbbell` |
| Add buttons | `Plus` |

---

## Mobile Responsiveness

- Cards stack vertically on mobile (`grid-cols-1 lg:grid-cols-2`)
- Form dialogs are mobile-friendly (already using Dialog component)
- Tab navigation remains horizontally scrollable

---

## Acceptance Criteria

After implementation:
- New "Trackers" tab appears between Health Coach and Profile in both tabs and sidebar
- Food Diary allows logging meals by type with descriptions
- Activity Tracker allows logging activities with duration and optional steps
- Entries persist across page refreshes (localStorage)
- Both sections show today's entries by default
- Works correctly on mobile devices

