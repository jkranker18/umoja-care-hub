

# Add RPM Device Readings to Trackers Tab

## Overview
Add a "Connected Devices" section above the Food Diary and Activity Tracker in the Trackers tab, showing RPM device readings per member persona with sample historical data.

## Device Assignments
- **John**: Smart Scale + Blood Pressure Cuff
- **Suzie**: Glucometer
- **Olivia**: Smart Scale

## Changes

### 1. `src/pages/member/MemberHome.tsx`
Insert a new "Connected Devices" section at the top of the Trackers `TabsContent` (before the date selector, around line 946). This section will:

- Use the `activeDemoMemberId` to determine which device cards to show
- Each device is a `Card` with:
  - Device icon (Scale → `Weight`, BP Cuff → `Heart`, Glucometer → `Droplets` from lucide)
  - Device name + "Connected" badge (green)
  - Last 5 sample readings in a small table (Date, Value, Status pill)
  - A subtle "Last synced: X minutes ago" footer

**Sample data (hardcoded per persona):**

**John — Smart Scale:**
| Date | Weight | Trend |
|------|--------|-------|
| Mar 10 | 214.2 lbs | — |
| Mar 7 | 215.0 lbs | ↓ |
| Mar 3 | 216.1 lbs | ↓ |
| Feb 28 | 217.4 lbs | ↓ |
| Feb 24 | 218.0 lbs | — |

**John — Blood Pressure Cuff:**
| Date | Reading | Status |
|------|---------|--------|
| Mar 10 | 138/88 | Elevated |
| Mar 7 | 142/90 | High |
| Mar 3 | 140/89 | High |
| Feb 28 | 144/92 | High |
| Feb 24 | 146/94 | High |

**Suzie — Glucometer:**
| Date | Fasting BG | Status |
|------|-----------|--------|
| Mar 10 | 128 mg/dL | Above Target |
| Mar 7 | 134 mg/dL | Above Target |
| Mar 3 | 142 mg/dL | High |
| Feb 28 | 138 mg/dL | High |
| Feb 24 | 145 mg/dL | High |

**Olivia — Smart Scale:**
| Date | Weight | Trend |
|------|--------|-------|
| Mar 10 | 156.8 lbs | — |
| Mar 7 | 157.2 lbs | ↓ |
| Mar 3 | 157.0 lbs | — |
| Feb 28 | 158.1 lbs | ↓ |
| Feb 24 | 158.5 lbs | — |

### Layout
- Full-width section above the existing `grid gap-6 lg:grid-cols-2` that holds Food Diary and Activity Tracker
- Devices displayed in a responsive grid: `grid gap-4 md:grid-cols-2` (John gets 2 cards side by side, Suzie and Olivia get 1 card)
- Add `Bluetooth`, `Weight`, `Droplets` icons from lucide-react imports

### 2. Icons Import Update
Add `Weight`, `Droplets`, `Bluetooth` to the existing lucide-react import line.

## Files Modified
- `src/pages/member/MemberHome.tsx` — one file, no new files needed

