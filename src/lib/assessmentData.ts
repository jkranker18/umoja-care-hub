// Assessment library data for Health Plan portal

export type AssessmentCategoryId =
  | 'sdoh'
  | 'initial-assessment'
  | 'follow-up-assessment'
  | 'reauthorization'
  | 'program-survey';

export interface AssessmentQuestion {
  label: string;
  type: 'text' | 'rating' | 'yes-no' | 'multi-select' | 'textarea' | 'number';
  options?: string[];
  scaleLabel?: string;
  conditionalNote?: string;
}

export interface AssessmentSection {
  title: string;
  questions: AssessmentQuestion[];
}

export interface AssessmentModule {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategoryId;
  icon: string;
  sections: AssessmentSection[];
  sourceLabel?: string;
}

export interface AssessmentCategoryInfo {
  id: AssessmentCategoryId;
  title: string;
  description: string;
  icon: string;
}

export const ASSESSMENT_CATEGORIES: AssessmentCategoryInfo[] = [
  {
    id: 'sdoh',
    title: 'SDOH (Social Determinants of Health)',
    description: 'Screenings for food security, housing, transportation, and social needs',
    icon: 'Home',
  },
  {
    id: 'initial-assessment',
    title: 'Initial Assessment',
    description: 'Comprehensive intake assessments for new program enrollees',
    icon: 'ClipboardList',
  },
  {
    id: 'follow-up-assessment',
    title: 'Follow-Up Assessment',
    description: 'Progress check-ins to track member outcomes over time',
    icon: 'ClipboardCheck',
  },
  {
    id: 'reauthorization',
    title: 'Reauthorization',
    description: 'Assessments for continued program eligibility and renewal',
    icon: 'RefreshCw',
  },
  {
    id: 'program-survey',
    title: 'Complete Program Survey',
    description: 'End-of-program satisfaction and outcomes surveys',
    icon: 'CheckSquare',
  },
];

export const ASSESSMENT_MODULES: AssessmentModule[] = [
  // SDOH
  {
    id: 'sdoh-food-security',
    title: 'Food Security Screening',
    description: 'Assess food access, affordability, and nutrition security',
    category: 'sdoh',
    icon: 'Apple',
    sections: [
      {
        title: 'Food Access',
        questions: [
          { label: 'In the past 12 months, how often did you worry about running out of food?', type: 'rating', scaleLabel: '1 = Never, 2 = Sometimes, 3 = Often' },
          { label: 'In the past 12 months, did you ever eat less than you felt you should because there wasn\'t enough money for food?', type: 'yes-no' },
          { label: 'Do you have reliable transportation to a grocery store?', type: 'yes-no' },
        ],
      },
      {
        title: 'Nutrition Quality',
        questions: [
          { label: 'How many servings of fruits and vegetables do you eat per day?', type: 'number' },
          { label: 'Do you have access to cooking facilities?', type: 'yes-no' },
          { label: 'Any dietary restrictions or food allergies?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'sdoh-housing-transportation',
    title: 'Housing & Transportation',
    description: 'Evaluate housing stability and transportation access',
    category: 'sdoh',
    icon: 'Home',
    sections: [
      {
        title: 'Housing',
        questions: [
          { label: 'Do you have stable housing?', type: 'yes-no' },
          { label: 'Are you worried about losing your housing?', type: 'yes-no' },
          { label: 'Do you have any issues with your housing (mold, pests, safety)?', type: 'textarea' },
        ],
      },
      {
        title: 'Transportation',
        questions: [
          { label: 'Do you have reliable transportation to medical appointments?', type: 'yes-no' },
          { label: 'Has lack of transportation caused you to miss appointments?', type: 'yes-no' },
        ],
      },
    ],
  },
  {
    id: 'sdoh-social-needs',
    title: 'Social & Community Needs',
    description: 'Screen for social isolation, safety, and community support',
    category: 'sdoh',
    icon: 'Users',
    sections: [
      {
        title: 'Social Support',
        questions: [
          { label: 'Do you have someone to talk to about your health concerns?', type: 'yes-no' },
          { label: 'How often do you feel isolated or lonely?', type: 'rating', scaleLabel: '1 = Never, 2 = Sometimes, 3 = Often' },
          { label: 'Do you feel safe in your home?', type: 'yes-no' },
        ],
      },
    ],
  },

  // Initial Assessments
  {
    id: 'initial-metabolic',
    title: 'Initial Assessment — Metabolic Syndrome / Chronic Conditions',
    description: 'Comprehensive intake covering health, nutrition, lifestyle, and SMART goals',
    category: 'initial-assessment',
    icon: 'HeartPulse',
    sourceLabel: 'Living 365',
    sections: [
      {
        title: 'Member Information',
        questions: [
          { label: 'Member First Name', type: 'text' },
          { label: 'Member Last Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Date of Birth', type: 'text' },
          { label: 'RD Name', type: 'text' },
        ],
      },
      {
        title: 'Goals & Motivation',
        questions: [
          { label: 'Why were you interested in the offer for nutrition support?', type: 'textarea' },
          { label: 'Do you have any health or nutrition related goals?', type: 'textarea' },
        ],
      },
      {
        title: 'General Health',
        questions: [
          { label: 'How would you rate your overall health?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
        ],
      },
      {
        title: 'Medical History',
        questions: [
          { label: 'Select all conditions that apply', type: 'multi-select', options: ['Diabetes Type 1', 'Diabetes Type 2', 'Kidney Disease', 'High Blood Pressure', 'High Cholesterol', 'High Triglycerides', 'Heart Disease', 'None', 'Other'] },
          { label: 'If Kidney Disease — are you on dialysis?', type: 'yes-no' },
          { label: 'Any recent diagnoses?', type: 'textarea' },
          { label: 'What is your confidence in your ability to manage your health conditions?', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
        ],
      },
      {
        title: 'Nutrition',
        questions: [
          { label: 'How would you rate the quality of your diet?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: '24 Hour Diet Recall', type: 'textarea' },
          { label: 'What is your confidence level in your ability to make healthy food choices?', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Hydration', type: 'textarea' },
          { label: 'Barriers', type: 'textarea' },
        ],
      },
      {
        title: 'Lifestyle',
        questions: [
          { label: 'How would you describe your stress level?', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Do you use any tools to manage your stress?', type: 'textarea' },
          { label: 'Do you have a support system in place to help you reach your health goals?', type: 'textarea' },
        ],
      },
      {
        title: 'Fitness & Weight',
        questions: [
          { label: 'Are you currently exercising?', type: 'yes-no' },
          { label: 'Height', type: 'text' },
          { label: 'Current Weight', type: 'text' },
          { label: 'Any recent changes in weight?', type: 'yes-no' },
          { label: 'Goal weight (if applicable)', type: 'text' },
        ],
      },
      {
        title: 'SMART Goals',
        questions: [
          { label: 'Discussion / Member Comments', type: 'textarea' },
          { label: 'SMART Goals', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'initial-prenatal',
    title: 'Initial Assessment — Prenatal / Postnatal',
    description: 'Intake assessment tailored for prenatal and postnatal members',
    category: 'initial-assessment',
    icon: 'Baby',
    sourceLabel: 'Living 365',
    sections: [
      {
        title: 'Member Information',
        questions: [
          { label: 'Member First Name', type: 'text' },
          { label: 'Member Last Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Date of Birth', type: 'text' },
          { label: 'RD Name', type: 'text' },
          { label: 'Due Date or Delivery Date', type: 'text' },
          { label: 'Number of Weeks Pregnant (if applicable)', type: 'number' },
        ],
      },
      {
        title: 'General Health',
        questions: [
          { label: 'How would you rate your overall health?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: 'Symptoms experienced', type: 'multi-select', options: ['Nausea', 'Vomiting', 'Heartburn', 'Constipation', 'Cravings', 'Taste Aversions', 'None'] },
          { label: 'Confidence in managing health conditions', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
        ],
      },
      {
        title: 'Nutrition',
        questions: [
          { label: 'How would you rate the quality of your diet?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: '24 Hour Diet Recall', type: 'textarea' },
          { label: 'Hydration', type: 'textarea' },
          { label: 'Caffeine intake', type: 'textarea' },
          { label: 'Alcohol intake', type: 'textarea' },
          { label: 'Confidence in making healthy food choices', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Barriers', type: 'textarea' },
        ],
      },
      {
        title: 'Weight & Fitness',
        questions: [
          { label: 'Height', type: 'text' },
          { label: 'Pre-Pregnancy Weight', type: 'text' },
          { label: 'Current Weight', type: 'text' },
          { label: 'Are you currently exercising?', type: 'yes-no' },
        ],
      },
      {
        title: 'SMART Goals',
        questions: [
          { label: 'Discussion / Member Comments', type: 'textarea' },
          { label: 'SMART Goals', type: 'textarea' },
        ],
      },
    ],
  },

  // Follow-Up Assessments
  {
    id: 'followup-metabolic',
    title: 'Follow-Up Assessment — Metabolic Syndrome / Chronic Conditions',
    description: 'Progress check-in covering goal review, health, nutrition, and updated SMART goals',
    category: 'follow-up-assessment',
    icon: 'HeartPulse',
    sourceLabel: 'Living 365',
    sections: [
      {
        title: 'Member Information',
        questions: [
          { label: 'Member First Name', type: 'text' },
          { label: 'Member Last Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Date of Birth', type: 'text' },
          { label: 'RD Name', type: 'text' },
        ],
      },
      {
        title: 'Goal Progress',
        questions: [
          { label: 'Goal progress (pull SMART goals from previous assessment)', type: 'textarea' },
          { label: 'Do you have any health or nutrition related goals?', type: 'textarea' },
        ],
      },
      {
        title: 'General Health',
        questions: [
          { label: 'How would you rate your overall health?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: 'Any improvements?', type: 'textarea' },
          { label: 'Any recent changes or diagnoses?', type: 'textarea' },
          { label: 'Confidence in managing health conditions', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
        ],
      },
      {
        title: 'Nutrition',
        questions: [
          { label: 'How would you rate the quality of your diet?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: '24 Hour Diet Recall', type: 'textarea' },
          { label: 'Confidence in making healthy food choices', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Hydration', type: 'textarea' },
          { label: 'Barriers', type: 'textarea' },
        ],
      },
      {
        title: 'Lifestyle',
        questions: [
          { label: 'Stress level', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Do you use any tools to manage your stress?', type: 'textarea' },
        ],
      },
      {
        title: 'Fitness & Weight',
        questions: [
          { label: 'Are you currently exercising?', type: 'yes-no' },
          { label: 'Height', type: 'text' },
          { label: 'Current Weight', type: 'text' },
          { label: 'Any recent changes in weight?', type: 'yes-no' },
          { label: 'Goal weight (if applicable)', type: 'text' },
          { label: 'Do you have access to the VHPGO app/platform?', type: 'yes-no' },
        ],
      },
      {
        title: 'SMART Goals',
        questions: [
          { label: 'Discussion / Member Comments', type: 'textarea' },
          { label: 'SMART Goals', type: 'textarea' },
          { label: 'Member demonstrates readiness to change and would benefit from more nutrition counseling sessions?', type: 'yes-no' },
        ],
      },
    ],
  },
  {
    id: 'followup-prenatal',
    title: 'Follow-Up Assessment — Prenatal / Postnatal',
    description: 'Progress check-in for prenatal and postnatal members including RSV vaccine reminder',
    category: 'follow-up-assessment',
    icon: 'Baby',
    sourceLabel: 'Living 365',
    sections: [
      {
        title: 'Member Information',
        questions: [
          { label: 'Member First Name', type: 'text' },
          { label: 'Member Last Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Date of Birth', type: 'text' },
          { label: 'RD Name', type: 'text' },
          { label: 'Due Date or Delivery Date', type: 'text' },
          { label: 'Number of Weeks Pregnant (if applicable)', type: 'number' },
        ],
      },
      {
        title: 'Goal Progress',
        questions: [
          { label: 'Goal progress (pull SMART goals from previous assessment)', type: 'textarea' },
        ],
      },
      {
        title: 'Postpartum Check-in',
        questions: [
          { label: 'How did you deliver your baby (if applicable)?', type: 'text' },
          { label: 'How are you feeding your baby (if applicable)?', type: 'text' },
        ],
      },
      {
        title: 'General Health',
        questions: [
          { label: 'How would you rate your overall health?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: 'Symptoms experienced', type: 'multi-select', options: ['Nausea', 'Vomiting', 'Heartburn', 'Constipation', 'Cravings', 'Taste Aversions', 'None'] },
          { label: 'Confidence in managing health conditions', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
        ],
      },
      {
        title: 'Nutrition',
        questions: [
          { label: 'How would you rate the quality of your diet?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: '24 Hour Diet Recall', type: 'textarea' },
          { label: 'Hydration', type: 'textarea' },
          { label: 'Caffeine', type: 'textarea' },
          { label: 'Alcohol', type: 'textarea' },
          { label: 'Confidence in making healthy food choices', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Barriers', type: 'textarea' },
        ],
      },
      {
        title: 'Lifestyle & Fitness',
        questions: [
          { label: 'Stress level', type: 'rating', scaleLabel: '1 = Low, 2 = Medium, 3 = High' },
          { label: 'Do you use any tools to manage your stress?', type: 'textarea' },
          { label: 'Do you have a support system in place?', type: 'textarea' },
          { label: 'Are you currently exercising?', type: 'yes-no' },
        ],
      },
      {
        title: 'SMART Goals',
        questions: [
          { label: 'Discussion / Member Comments', type: 'textarea' },
          { label: 'SMART Goals', type: 'textarea' },
          { label: 'Member demonstrates readiness to change and would benefit from more nutrition counseling sessions?', type: 'yes-no' },
        ],
      },
      {
        title: 'RSV Vaccine Reminder',
        questions: [
          { label: 'Provided RSV vaccine reminder?', type: 'yes-no', conditionalNote: 'During 32-36 weeks of pregnancy it is important to get the RSV vaccine as it can prevent infection in infants that can lead to hospitalization.' },
        ],
      },
    ],
  },

  // Reauthorization
  {
    id: 'reauth-clinical-review',
    title: 'Clinical Review for Reauthorization',
    description: 'Clinical summary and justification for continued program enrollment',
    category: 'reauthorization',
    icon: 'FileCheck',
    sections: [
      {
        title: 'Member Summary',
        questions: [
          { label: 'Member Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Current Program Tier', type: 'text' },
          { label: 'Weeks Completed', type: 'number' },
        ],
      },
      {
        title: 'Clinical Justification',
        questions: [
          { label: 'Summary of progress to date', type: 'textarea' },
          { label: 'Remaining health goals', type: 'textarea' },
          { label: 'Clinical rationale for continued enrollment', type: 'textarea' },
          { label: 'Recommended program tier for renewal', type: 'text' },
        ],
      },
    ],
  },

  // Complete Program Survey
  {
    id: 'survey-member-satisfaction',
    title: 'Member Satisfaction Survey',
    description: 'End-of-program feedback on meals, coaching, and overall experience',
    category: 'program-survey',
    icon: 'Star',
    sections: [
      {
        title: 'Overall Experience',
        questions: [
          { label: 'How would you rate your overall experience with the program?', type: 'rating', scaleLabel: '1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent' },
          { label: 'How satisfied were you with the meals/groceries you received?', type: 'rating', scaleLabel: '1 = Very Dissatisfied to 5 = Very Satisfied' },
          { label: 'How helpful was your health coach / RD?', type: 'rating', scaleLabel: '1 = Not Helpful to 5 = Extremely Helpful' },
        ],
      },
      {
        title: 'Health Outcomes',
        questions: [
          { label: 'Do you feel your health has improved since starting the program?', type: 'yes-no' },
          { label: 'Have you made lasting changes to your eating habits?', type: 'yes-no' },
          { label: 'What was the most valuable part of the program?', type: 'textarea' },
        ],
      },
      {
        title: 'Suggestions',
        questions: [
          { label: 'What could we improve?', type: 'textarea' },
          { label: 'Would you recommend this program to others?', type: 'yes-no' },
        ],
      },
    ],
  },
  {
    id: 'survey-outcomes-report',
    title: 'Program Outcomes Report',
    description: 'Clinician-completed outcomes summary for program completers',
    category: 'program-survey',
    icon: 'BarChart3',
    sections: [
      {
        title: 'Member Outcomes',
        questions: [
          { label: 'Member Name', type: 'text' },
          { label: 'Client ID', type: 'text' },
          { label: 'Program Start Date', type: 'text' },
          { label: 'Program End Date', type: 'text' },
        ],
      },
      {
        title: 'Health Metrics',
        questions: [
          { label: 'Initial overall health rating', type: 'rating', scaleLabel: '1 = Poor to 5 = Excellent' },
          { label: 'Final overall health rating', type: 'rating', scaleLabel: '1 = Poor to 5 = Excellent' },
          { label: 'Initial diet quality rating', type: 'rating', scaleLabel: '1 = Poor to 5 = Excellent' },
          { label: 'Final diet quality rating', type: 'rating', scaleLabel: '1 = Poor to 5 = Excellent' },
          { label: 'Weight change (lbs)', type: 'text' },
          { label: 'SMART goals achieved', type: 'textarea' },
        ],
      },
      {
        title: 'Clinician Notes',
        questions: [
          { label: 'Summary and recommendations', type: 'textarea' },
        ],
      },
    ],
  },
];

export function getAssessmentsByCategory(categoryId: AssessmentCategoryId): AssessmentModule[] {
  return ASSESSMENT_MODULES.filter(m => m.category === categoryId);
}

export function getAssessmentById(id: string): AssessmentModule | undefined {
  return ASSESSMENT_MODULES.find(m => m.id === id);
}
