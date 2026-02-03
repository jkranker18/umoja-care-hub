

# Education Section Expansion Plan

## Current State

The Education tab currently has 3 modules in a flat list:
- General Nutrition
- Reading a Nutrition Label
- Budget-Friendly Meals Made Easy

## MSA Content Requirements

Based on the uploaded MSA document, the education content must cover these categories:

| Category | Description |
|----------|-------------|
| **Healthy Eating** | Nutrition education, reading labels, meal planning |
| **Lifestyle & Mental Health** | Stress management, sleep, physical activity |
| **Managing Health Conditions** | Disease-specific content (diabetes, heart health, etc.) |
| **Recipes & Food Prep** | Practical cooking guidance, batch cooking, kitchen tips |
| **Understanding Healthcare** | Navigating the healthcare system, preventive care |
| **Local Resources** | Community resources, food assistance programs |

---

## Proposed Structure

### Two-Section Layout

**1. "Recommended for You"** - Personalized content based on member profile
   - Shows 3-4 modules most relevant to the member's conditions
   - Could be tied to their chronic conditions (e.g., Hypertension -> Heart Health content)
   - Visual emphasis with larger cards

**2. "Explore More"** - Full category library with collapsible sections
   - All 6 categories as expandable accordions
   - Each category contains multiple modules
   - Progress tracking per category

---

## Content Categories & Modules

### 1. Healthy Eating
| Module | Description |
|--------|-------------|
| General Nutrition | What Your Body Needs (existing) |
| Reading a Nutrition Label | Make healthier choices (existing) |
| Budget-Friendly Meals | Eat well on a budget (existing) |
| Meal Planning 101 | Plan your week (new) |
| Portion Control | Right-sizing your plate (new) |

### 2. Lifestyle & Mental Health
| Module | Description |
|--------|-------------|
| Stress & Eating | How stress affects food choices |
| Better Sleep Habits | Sleep's role in health |
| Staying Active | Movement for all abilities |
| Mindful Eating | Eating with awareness |

### 3. Managing Health Conditions
| Module | Description |
|--------|-------------|
| Heart-Healthy Living | Managing cardiovascular health |
| Diabetes & Nutrition | Blood sugar management |
| Managing Hypertension | Reducing sodium, DASH diet |
| Kidney Health Basics | Diet for kidney care |

### 4. Recipes & Food Prep
| Module | Description |
|--------|-------------|
| Kitchen Basics | Essential cooking skills |
| Batch Cooking | Prep meals for the week |
| Healthy Substitutions | Swap ingredients smartly |
| Quick & Easy Recipes | 30-minute healthy meals |

### 5. Understanding Healthcare
| Module | Description |
|--------|-------------|
| Preventive Care 101 | Screenings and check-ups |
| Talking to Your Doctor | Getting the most from visits |
| Understanding Your Medications | Safe medication use |
| Health Insurance Basics | Navigating coverage |

### 6. Local Resources
| Module | Description |
|--------|-------------|
| Food Assistance Programs | SNAP, WIC, food banks |
| Community Health Resources | Free clinics, support groups |
| Transportation Assistance | Getting to appointments |

---

## Technical Implementation

### File Changes

| File | Change |
|------|--------|
| `src/hooks/useEducationProgress.ts` | Expand MODULES array with all new module IDs |
| `src/lib/educationData.ts` | **New file** - Define content categories, modules, and metadata |
| `src/pages/member/MemberHome.tsx` | Refactor Education tab with new two-section layout |
| `src/pages/member/education/*.tsx` | Create placeholder pages for each new module |
| `src/App.tsx` | Add routes for all new education modules |
| `src/components/education/CategoryAccordion.tsx` | **New** - Reusable accordion for category sections |
| `src/components/education/ModuleCard.tsx` | **New** - Reusable module display card |

### Data Structure

```typescript
// src/lib/educationData.ts
export type ContentCategory = 
  | 'healthy-eating'
  | 'lifestyle-mental-health'
  | 'managing-conditions'
  | 'recipes-food-prep'
  | 'understanding-healthcare'
  | 'local-resources';

export interface EducationModule {
  id: ModuleId;
  title: string;
  description: string;
  category: ContentCategory;
  icon: string; // Lucide icon name
  duration?: string; // e.g., "5 min read"
  conditions?: string[]; // For personalization
}

export interface ContentCategoryInfo {
  id: ContentCategory;
  title: string;
  description: string;
  icon: string;
  color: string;
}
```

### UI Layout

```text
+-------------------------------------------+
|  Education                                |
|  Your personalized learning journey       |
+-------------------------------------------+
|  [Progress Bar: 3 of 24 complete]         |
+-------------------------------------------+
|                                           |
|  RECOMMENDED FOR YOU                      |
|  +-------+  +-------+  +-------+          |
|  | Heart |  | Manag |  | DASH  |          |
|  | Health|  | Hyper |  | Diet  |          |
|  +-------+  +-------+  +-------+          |
|                                           |
+-------------------------------------------+
|  EXPLORE MORE                             |
|  +---------------------------------------+|
|  | ▼ Healthy Eating (3/5 complete)       ||
|  |   - General Nutrition ✓               ||
|  |   - Reading Labels ✓                  ||
|  |   - Budget Meals ✓                    ||
|  |   - Meal Planning                     ||
|  |   - Portion Control                   ||
|  +---------------------------------------+|
|  | ▶ Lifestyle & Mental Health (0/4)     ||
|  +---------------------------------------+|
|  | ▶ Managing Health Conditions (0/4)    ||
|  +---------------------------------------+|
|  ...                                      |
+-------------------------------------------+
```

---

## Personalization Logic

The "Recommended for You" section will be populated based on:

1. **Chronic Conditions** - Member's conditions from their profile
   - Hypertension → "Managing Hypertension", "Heart-Healthy Living"
   - Diabetes → "Diabetes & Nutrition", "Reading Labels"

2. **Program Phase** - Current week in the program
   - Early weeks → Focus on basics (General Nutrition, Kitchen Basics)
   - MTG transition → Recipes, Meal Planning, Budget Meals

3. **Incomplete Required Content** - Priority modules not yet completed

---

## Implementation Phases

### Phase 1: Structure & Placeholder Content
- Create data structure for all categories/modules
- Build new Education tab UI with sections
- Create placeholder pages for new modules with "Coming Soon" content

### Phase 2: Content Population
- Populate module content (can be done incrementally)
- Add images/illustrations where appropriate

### Phase 3: Personalization
- Implement recommendation logic based on member profile
- Track category-level progress

---

## Routes to Add

```typescript
// New education routes in App.tsx
<Route path="/member/education/meal-planning" element={<MealPlanning />} />
<Route path="/member/education/portion-control" element={<PortionControl />} />
<Route path="/member/education/stress-eating" element={<StressEating />} />
<Route path="/member/education/better-sleep" element={<BetterSleep />} />
<Route path="/member/education/staying-active" element={<StayingActive />} />
<Route path="/member/education/mindful-eating" element={<MindfulEating />} />
<Route path="/member/education/heart-healthy" element={<HeartHealthy />} />
<Route path="/member/education/diabetes-nutrition" element={<DiabetesNutrition />} />
<Route path="/member/education/managing-hypertension" element={<ManagingHypertension />} />
<Route path="/member/education/kidney-health" element={<KidneyHealth />} />
<Route path="/member/education/kitchen-basics" element={<KitchenBasics />} />
<Route path="/member/education/batch-cooking" element={<BatchCooking />} />
<Route path="/member/education/healthy-substitutions" element={<HealthySubstitutions />} />
<Route path="/member/education/quick-recipes" element={<QuickRecipes />} />
<Route path="/member/education/preventive-care" element={<PreventiveCare />} />
<Route path="/member/education/talking-to-doctor" element={<TalkingToDoctor />} />
<Route path="/member/education/medications" element={<Medications />} />
<Route path="/member/education/insurance-basics" element={<InsuranceBasics />} />
<Route path="/member/education/food-assistance" element={<FoodAssistance />} />
<Route path="/member/education/community-health" element={<CommunityHealth />} />
<Route path="/member/education/transportation" element={<Transportation />} />
```

