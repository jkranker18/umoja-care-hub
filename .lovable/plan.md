

# Add 4 New Education Modules

## Overview

Add 4 new education modules from uploaded PDF content:
1. **Mindful Eating & Stress Management** - Mindfulness techniques and stress management resources
2. **Meal Planning & Portion Control** - Combined module with plate model and weekly planning worksheets
3. **Hydration & Gastrointestinal Health** - Fluid balance, dehydration risks, and managing digestive issues
4. **Micronutrients for Immunity & Healing** - Vitamins, minerals, and their food sources

Additionally:
- Set Mindful Eating and Meal Planning as "Recommended for You" modules
- Remove the "Coming Soon" badge from all module cards

---

## Content Categorization

| New Module | Category | Rationale |
|------------|----------|-----------|
| Mindful Eating | Lifestyle & Mental Health | Covers mindfulness and stress management |
| Meal Planning & Portion Control | Healthy Eating | Core nutrition planning skills |
| Hydration & GI Health | Managing Conditions | Addresses digestive health conditions |
| Micronutrients | Healthy Eating | Foundational nutrition knowledge |

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/lib/educationData.ts` | Add 2 new module IDs, update existing modules, remove isPlaceholder flags |
| `src/pages/member/education/MindfulEating.tsx` | Replace placeholder with full content |
| `src/pages/member/education/MealPlanning.tsx` | Replace placeholder with combined meal planning + portion control content |
| `src/pages/member/education/HydrationGIHealth.tsx` | Create new page |
| `src/pages/member/education/MicronutrientsImmunity.tsx` | Create new page |
| `src/App.tsx` | Add routes for 2 new education pages |
| `src/components/education/ModuleCard.tsx` | Remove "Coming Soon" badge logic |

---

## Technical Details

### 1. educationData.ts Updates

Add two new module IDs to the MODULES array:
- `'hydration-gi-health'`
- `'micronutrients-immunity'`

Add new module definitions:

```typescript
// In healthy-eating category
{
  id: 'micronutrients-immunity',
  title: 'Micronutrients for Immunity',
  description: 'Vitamins and minerals that support healing',
  category: 'healthy-eating',
  icon: 'Sparkles',
  duration: '4 min read',
}

// In managing-conditions category
{
  id: 'hydration-gi-health',
  title: 'Hydration & GI Health',
  description: 'Managing fluid balance and digestive comfort',
  category: 'managing-conditions',
  icon: 'Droplets',
  duration: '5 min read',
}
```

Update existing modules to remove `isPlaceholder: true` for all modules (per user request to remove "Coming Soon" badge).

Update `getRecommendedModules()` to prioritize `'mindful-eating'` and `'meal-planning'` as recommended.

### 2. MindfulEating.tsx - Full Content

Replace placeholder with content adapted from PDF:
- Why Try Mindful Eating section
- 10 Steps to Practice (numbered list)
- Tips for Success
- Stress-Management Resource List (Deep breathing, Apps, Journaling, Support groups, Helplines)
- Mark as Complete button

### 3. MealPlanning.tsx - Combined Content

Replace placeholder with content from PDF:
- Plate Model section (half veggies, quarter protein, quarter grains)
- Weekly Meal Planning Worksheet (visual table)
- Grocery Shopping List (organized by category)
- Mark as Complete button

Note: Portion Control content is merged here since the PDF combines both topics.

### 4. HydrationGIHealth.tsx - New Page

Create new education page with:
- Fluid Balance & Dehydration Risks
- Signs of dehydration
- Managing Diarrhea (BRAT diet tips)
- Managing Constipation (fiber, fluids)
- Hydration Log Template
- Electrolyte Solution Recipes (DIY sports drink, Coconut water refresher)
- Fiber Timing Chart
- Mark as Complete button

### 5. MicronutrientsImmunity.tsx - New Page

Create new education page with:
- Why Micronutrients Matter section
- Table of Key Antioxidant Vitamins & Trace Minerals (Vitamin A, C, E, Zinc, Selenium)
- Food Sources vs Supplements guidance
- Mark as Complete button

### 6. App.tsx Updates

Add two new routes:
```tsx
<Route path="/member/education/hydration-gi-health" element={<HydrationGIHealth />} />
<Route path="/member/education/micronutrients-immunity" element={<MicronutrientsImmunity />} />
```

### 7. ModuleCard.tsx Update

Remove the "Coming Soon" badge logic:
- Remove lines 37-39 in featured variant
- Remove lines 66-68 in default variant

---

## Recommendation Logic Update

Modify `getRecommendedModules()` in educationData.ts to ensure Mindful Eating and Meal Planning appear in recommendations:

```typescript
// Add to the beginning of recommendations if not completed
const priorityModules = ['mindful-eating', 'meal-planning'];
for (const id of priorityModules) {
  const module = EDUCATION_MODULES.find(m => m.id === id);
  if (module && !completedModuleIds.has(module.id)) {
    recommendations.unshift(module);
  }
}
```

---

## Acceptance Criteria

After implementation:
- 4 new education modules are accessible from the Education tab
- Mindful Eating and Meal Planning appear in "Recommended for You" section
- No "Coming Soon" badges appear on any module cards
- All modules have Mark as Complete functionality
- New modules appear in their respective category accordions

