
# Add Health Coach Section to Member Portal

## Overview
Add a new "Health Coach" section to the member portal that allows members to book coaching sessions through an embedded Healthie calendar. This will be accessible both from the sidebar navigation and the tabs.

---

## Changes Summary

| File | Action |
|------|--------|
| `src/components/layout/Sidebar.tsx` | Add "Health Coach" nav item to memberNav array |
| `src/pages/member/MemberHome.tsx` | Add "Health Coach" tab trigger and content with Healthie iframe |

---

## Implementation Details

### 1. Update Sidebar Navigation

**File:** `src/components/layout/Sidebar.tsx`

Add a new nav item to the `memberNav` array with a calendar/coach icon:

```typescript
const memberNav: NavItem[] = [
  { label: 'Home', path: '/member', icon: Home, tabId: 'overview' },
  { label: 'My Program', path: '/member', icon: ClipboardList, tabId: 'plan' },
  { label: 'My Orders', path: '/member', icon: Package, tabId: 'orders' },
  { label: 'Education', path: '/member', icon: FileText, tabId: 'content' },
  { label: 'Health Coach', path: '/member', icon: CalendarCheck, tabId: 'coach' },  // NEW
  { label: 'Profile', path: '/member/profile', icon: User },
];
```

Import the `CalendarCheck` icon from lucide-react (represents scheduling/coaching appointments).

---

### 2. Update Member Home Tabs

**File:** `src/pages/member/MemberHome.tsx`

#### Add Tab Trigger

Add a new tab trigger in the TabsList (after "Education"):

```tsx
<TabsTrigger value="coach">Health Coach</TabsTrigger>
```

#### Add Tab Content

Add a new TabsContent section that embeds the Healthie calendar:

```tsx
<TabsContent value="coach">
  <Card>
    <CardHeader>
      <CardTitle>Health Coach</CardTitle>
      <CardDescription>
        Book a session with one of our certified health coaches.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="w-full min-h-[600px] rounded-lg overflow-hidden border">
        <iframe 
          src="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=11976136&provider_ids=%5B8869243,8962005,9151476,11170106,11976136,12000025%5D&appt_type_ids=%5B466786,466787,466788%5D&org_level=true" 
          style={{ width: '100%', height: '600px', border: 'none' }}
          title="Book Health Coach Appointment"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Booking provided by{' '}
        <a 
          href="https://gethealthie.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Healthie
        </a>
      </p>
    </CardContent>
  </Card>
</TabsContent>
```

---

## Visual Preview

**Sidebar (Member):**
```
┌─────────────────────────┐
│ [Umoja Logo]            │
├─────────────────────────┤
│ 🏠 Home                 │
│ 📋 My Program           │
│ 📦 My Orders            │
│ 📄 Education            │
│ 📅 Health Coach   ← NEW │
│ 👤 Profile              │
└─────────────────────────┘
```

**Tab Bar:**
```
┌──────────┬────────────┬───────────┬───────────┬──────────────┐
│ Overview │ My Program │ My Orders │ Education │ Health Coach │
└──────────┴────────────┴───────────┴───────────┴──────────────┘
                                                      ↑ NEW
```

**Health Coach Tab Content:**
```
┌─────────────────────────────────────────────────────────┐
│ Health Coach                                            │
│ Book a session with one of our certified health coaches │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                                     │ │
│ │        [Healthie Calendar Embed]                    │ │
│ │                                                     │ │
│ │  Select a provider, appointment type, and time...   │ │
│ │                                                     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│         Booking provided by Healthie                    │
└─────────────────────────────────────────────────────────┘
```

---

## Technical Notes

- The iframe uses the exact URL and parameters provided by the user
- The `CalendarCheck` icon from lucide-react represents appointment scheduling
- The iframe has `min-h-[600px]` to match the requested minimum height
- A border and rounded corners are added around the iframe for visual consistency
- The Healthie attribution link opens in a new tab with proper security attributes
- The tab ID `coach` is used consistently in both the sidebar and tabs for synchronized navigation
