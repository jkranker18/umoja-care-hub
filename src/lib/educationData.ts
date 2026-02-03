// Education module data and types

export const MODULES = [
  // Healthy Eating
  'general-nutrition',
  'reading-nutrition-label',
  'budget-friendly-meals',
  'meal-planning',
  'portion-control',
  // Lifestyle & Mental Health
  'stress-eating',
  'better-sleep',
  'staying-active',
  'mindful-eating',
  // Managing Health Conditions
  'heart-healthy',
  'diabetes-nutrition',
  'managing-hypertension',
  'kidney-health',
  // Recipes & Food Prep
  'kitchen-basics',
  'batch-cooking',
  'healthy-substitutions',
  'quick-recipes',
  // Understanding Healthcare
  'preventive-care',
  'talking-to-doctor',
  'medications',
  'insurance-basics',
  // Local Resources
  'food-assistance',
  'community-health',
  'transportation',
] as const;

export type ModuleId = typeof MODULES[number];

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
  icon: string;
  duration?: string;
  conditions?: string[]; // For personalization based on member health profile
  isPlaceholder?: boolean; // True for modules without full content yet
}

export interface ContentCategoryInfo {
  id: ContentCategory;
  title: string;
  description: string;
  icon: string;
}

export const CATEGORIES: ContentCategoryInfo[] = [
  {
    id: 'healthy-eating',
    title: 'Healthy Eating',
    description: 'Nutrition basics, meal planning, and making better food choices',
    icon: 'Apple',
  },
  {
    id: 'lifestyle-mental-health',
    title: 'Lifestyle & Mental Health',
    description: 'Managing stress, sleep, and physical activity',
    icon: 'Brain',
  },
  {
    id: 'managing-conditions',
    title: 'Managing Health Conditions',
    description: 'Nutrition guidance for specific health conditions',
    icon: 'HeartPulse',
  },
  {
    id: 'recipes-food-prep',
    title: 'Recipes & Food Prep',
    description: 'Practical cooking skills and healthy recipes',
    icon: 'ChefHat',
  },
  {
    id: 'understanding-healthcare',
    title: 'Understanding Healthcare',
    description: 'Navigating the healthcare system and preventive care',
    icon: 'Stethoscope',
  },
  {
    id: 'local-resources',
    title: 'Local Resources',
    description: 'Community resources and assistance programs',
    icon: 'MapPin',
  },
];

export const EDUCATION_MODULES: EducationModule[] = [
  // Healthy Eating
  {
    id: 'general-nutrition',
    title: 'General Nutrition',
    description: 'What Your Body Needs to Stay Healthy',
    category: 'healthy-eating',
    icon: 'BookOpen',
    duration: '5 min read',
  },
  {
    id: 'reading-nutrition-label',
    title: 'Reading a Nutrition Label',
    description: 'Learn to make healthier food choices',
    category: 'healthy-eating',
    icon: 'FileText',
    duration: '4 min read',
  },
  {
    id: 'budget-friendly-meals',
    title: 'Budget-Friendly Meals Made Easy',
    description: 'Create satisfying meals without overspending',
    category: 'healthy-eating',
    icon: 'DollarSign',
    duration: '6 min read',
  },
  {
    id: 'meal-planning',
    title: 'Meal Planning 101',
    description: 'Plan your week for healthier eating',
    category: 'healthy-eating',
    icon: 'Calendar',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'portion-control',
    title: 'Portion Control',
    description: 'Right-sizing your plate for better health',
    category: 'healthy-eating',
    icon: 'Scale',
    duration: '4 min read',
    isPlaceholder: true,
  },

  // Lifestyle & Mental Health
  {
    id: 'stress-eating',
    title: 'Stress & Eating',
    description: 'How stress affects your food choices',
    category: 'lifestyle-mental-health',
    icon: 'Frown',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'better-sleep',
    title: 'Better Sleep Habits',
    description: "Sleep's role in your overall health",
    category: 'lifestyle-mental-health',
    icon: 'Moon',
    duration: '4 min read',
    isPlaceholder: true,
  },
  {
    id: 'staying-active',
    title: 'Staying Active',
    description: 'Movement for all abilities',
    category: 'lifestyle-mental-health',
    icon: 'Footprints',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'mindful-eating',
    title: 'Mindful Eating',
    description: 'Eating with awareness and intention',
    category: 'lifestyle-mental-health',
    icon: 'Leaf',
    duration: '4 min read',
    isPlaceholder: true,
  },

  // Managing Health Conditions
  {
    id: 'heart-healthy',
    title: 'Heart-Healthy Living',
    description: 'Managing cardiovascular health through diet',
    category: 'managing-conditions',
    icon: 'Heart',
    duration: '6 min read',
    conditions: ['heart disease', 'cardiovascular'],
    isPlaceholder: true,
  },
  {
    id: 'diabetes-nutrition',
    title: 'Diabetes & Nutrition',
    description: 'Blood sugar management through food choices',
    category: 'managing-conditions',
    icon: 'Droplet',
    duration: '7 min read',
    conditions: ['diabetes', 'pre-diabetes'],
    isPlaceholder: true,
  },
  {
    id: 'managing-hypertension',
    title: 'Managing Hypertension',
    description: 'Reducing sodium and the DASH diet',
    category: 'managing-conditions',
    icon: 'Activity',
    duration: '6 min read',
    conditions: ['hypertension', 'high blood pressure'],
    isPlaceholder: true,
  },
  {
    id: 'kidney-health',
    title: 'Kidney Health Basics',
    description: 'Diet considerations for kidney care',
    category: 'managing-conditions',
    icon: 'Bean',
    duration: '5 min read',
    conditions: ['kidney disease', 'CKD'],
    isPlaceholder: true,
  },

  // Recipes & Food Prep
  {
    id: 'kitchen-basics',
    title: 'Kitchen Basics',
    description: 'Essential cooking skills for healthy meals',
    category: 'recipes-food-prep',
    icon: 'Utensils',
    duration: '6 min read',
    isPlaceholder: true,
  },
  {
    id: 'batch-cooking',
    title: 'Batch Cooking',
    description: 'Prep meals for the entire week',
    category: 'recipes-food-prep',
    icon: 'Container',
    duration: '7 min read',
    isPlaceholder: true,
  },
  {
    id: 'healthy-substitutions',
    title: 'Healthy Substitutions',
    description: 'Swap ingredients for smarter choices',
    category: 'recipes-food-prep',
    icon: 'ArrowLeftRight',
    duration: '4 min read',
    isPlaceholder: true,
  },
  {
    id: 'quick-recipes',
    title: 'Quick & Easy Recipes',
    description: '30-minute healthy meals',
    category: 'recipes-food-prep',
    icon: 'Timer',
    duration: '5 min read',
    isPlaceholder: true,
  },

  // Understanding Healthcare
  {
    id: 'preventive-care',
    title: 'Preventive Care 101',
    description: 'Screenings and check-ups you need',
    category: 'understanding-healthcare',
    icon: 'Shield',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'talking-to-doctor',
    title: 'Talking to Your Doctor',
    description: 'Getting the most from your visits',
    category: 'understanding-healthcare',
    icon: 'MessageCircle',
    duration: '4 min read',
    isPlaceholder: true,
  },
  {
    id: 'medications',
    title: 'Understanding Your Medications',
    description: 'Safe and effective medication use',
    category: 'understanding-healthcare',
    icon: 'Pill',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'insurance-basics',
    title: 'Health Insurance Basics',
    description: 'Navigating your coverage',
    category: 'understanding-healthcare',
    icon: 'FileCheck',
    duration: '6 min read',
    isPlaceholder: true,
  },

  // Local Resources
  {
    id: 'food-assistance',
    title: 'Food Assistance Programs',
    description: 'SNAP, WIC, and food bank resources',
    category: 'local-resources',
    icon: 'HandHeart',
    duration: '5 min read',
    isPlaceholder: true,
  },
  {
    id: 'community-health',
    title: 'Community Health Resources',
    description: 'Free clinics and support groups',
    category: 'local-resources',
    icon: 'Users',
    duration: '4 min read',
    isPlaceholder: true,
  },
  {
    id: 'transportation',
    title: 'Transportation Assistance',
    description: 'Getting to your appointments',
    category: 'local-resources',
    icon: 'Bus',
    duration: '3 min read',
    isPlaceholder: true,
  },
];

// Helper to get modules by category
export function getModulesByCategory(categoryId: ContentCategory): EducationModule[] {
  return EDUCATION_MODULES.filter(m => m.category === categoryId);
}

// Helper to get category info
export function getCategoryInfo(categoryId: ContentCategory): ContentCategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === categoryId);
}

// Get recommended modules based on member conditions
export function getRecommendedModules(
  memberConditions: string[],
  completedModuleIds: Set<ModuleId>,
  currentWeek: number
): EducationModule[] {
  const recommendations: EducationModule[] = [];
  
  // Add condition-specific modules first (if not completed)
  for (const module of EDUCATION_MODULES) {
    if (module.conditions && !completedModuleIds.has(module.id)) {
      const matchesCondition = memberConditions.some(condition =>
        module.conditions?.some(mc => 
          mc.toLowerCase().includes(condition.toLowerCase()) ||
          condition.toLowerCase().includes(mc.toLowerCase())
        )
      );
      if (matchesCondition) {
        recommendations.push(module);
      }
    }
  }

  // Add phase-appropriate basics if early in program
  if (currentWeek <= 4) {
    const basics = ['general-nutrition', 'kitchen-basics', 'reading-nutrition-label'];
    for (const id of basics) {
      const module = EDUCATION_MODULES.find(m => m.id === id);
      if (module && !completedModuleIds.has(module.id) && !recommendations.find(r => r.id === module.id)) {
        recommendations.push(module);
      }
    }
  }

  // Add meal prep modules during MTG transition phase
  if (currentWeek >= 5) {
    const mealPrepModules = ['meal-planning', 'batch-cooking', 'budget-friendly-meals'];
    for (const id of mealPrepModules) {
      const module = EDUCATION_MODULES.find(m => m.id === id);
      if (module && !completedModuleIds.has(module.id) && !recommendations.find(r => r.id === module.id)) {
        recommendations.push(module);
      }
    }
  }

  // Limit to 4 recommendations
  return recommendations.slice(0, 4);
}
