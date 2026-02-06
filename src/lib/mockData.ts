// Core data types for Umoja Health Platform

export type UserRole = 'member' | 'cbo' | 'healthplan' | 'internal';

export interface Member {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  consentGiven: boolean;
  consentDate?: string;
  riskFlags: string[];
  createdAt: string;
  healthieUserId?: string; // Healthie user ID for chat integration
  healthieEmail?: string; // Healthie email for authentication
  healthiePassword?: string; // Healthie password for authentication (demo only)
  healthieConversationId?: string; // Specific conversation ID for chat
}

export interface Program {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  riskLevel: 'high' | 'medium' | 'preventive';
  description: string;
  startDate: string;
  endDate: string;
  eligibilityRules: string;
  duration: string; // "12 weeks"
  mealsPerWeek: number;
  mtmWeeks: number; // Medically Tailored Meals phase
  mtgWeeks: number; // Medically Tailored Groceries phase
  clinicalSupport: string; // "3 months"
  status: 'active' | 'inactive' | 'planning';
}

export interface CBO {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  address: string;
  serviceArea: string[];
  partnerId: string;
  enrolledMemberCount: number;
  createdAt: string;
}

export type EnrollmentStatus = 'pending' | 'active' | 'paused' | 'complete';
export type EnrollmentSource = 'CBO' | 'HP Outreach' | 'Provider' | 'Self';
export type FoodPhase = 'MTM' | 'MTG' | 'Produce';

export interface Enrollment {
  id: string;
  memberId: string;
  programId: string;
  status: EnrollmentStatus;
  enrollmentSource: EnrollmentSource;
  sourceId?: string;
  enrollmentDate: string;
  currentWeek: number; // 1-12
  currentPhase: FoodPhase; // Current food protocol phase
  benefitLevel: string; // e.g., "Tier 1 - Week 4"
  nextShipmentDate?: string;
}

export interface Assessment {
  id: string;
  memberId: string;
  date: string;
  type: string;
  dietScore: number;
  sdohNeeds: string[];
  notes: string;
  source: 'Healthie';
}

export interface RulesDecision {
  id: string;
  memberId: string;
  enrollmentId: string;
  eligibilityResult: 'approved' | 'denied' | 'pending_review';
  benefitLevel: string;
  frequency: string;
  nextShipmentDate: string;
  exceptions: string[];
  ruleVersion: string;
  decidedAt: string;
  source: 'NetSuite';
}

export interface Order {
  id: string;
  memberId: string;
  enrollmentId: string;
  mealPlan: string;
  mealsCount: number;
  shipmentStatus: 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'exception';
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveryExceptions?: string[];
  createdAt: string;
  source: 'NetSuite';
}

export interface Campaign {
  id: string;
  name: string;
  segment: string;
  programId?: string;
  touchCount: number;
  smsCount: number;
  emailCount: number;
  openRate: number;
  clickRate: number;
  status: 'draft' | 'active' | 'completed';
  source: 'Salesforce';
}

export interface ServiceCase {
  id: string;
  memberId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  resolvedAt?: string;
  source: 'Salesforce';
}

export interface ContentPlan {
  id: string;
  memberId: string;
  modules: ContentModule[];
  source: 'Nudge';
}

export interface ContentModule {
  id: string;
  title: string;
  type: 'video' | 'article' | 'class';
  status: 'assigned' | 'in_progress' | 'completed';
  completedAt?: string;
  engagementScore: number;
}

export interface TimelineEvent {
  id: string;
  memberId: string;
  timestamp: string;
  eventType: string;
  description: string;
  source: 'Healthie' | 'NetSuite' | 'Salesforce' | 'Nudge' | 'System';
  metadata?: Record<string, any>;
}

// Clinical data for outcomes tracking (pre/post measurements)
export interface MemberClinicalData {
  id: string;
  memberId: string;
  measurementDate: string;
  measurementType: 'baseline' | 'current';
  a1c?: number;              // e.g., 8.5 -> 7.2
  systolicBP?: number;       // e.g., 148 -> 126
  diastolicBP?: number;      // e.g., 92 -> 78
  bmi?: number;              // e.g., 32.5 -> 30.1
  hospitalAdmissions?: number; // Count in past 12 months
}

// Financial value constants based on HCSC proposal (using higher values)
export const CLINICAL_SAVINGS = {
  A1C_PER_PERCENT: 736,          // $736 per 1% reduction per member
  READMISSION_AVOIDED: 13000,    // $13,000 per avoided readmission
  BP_CONTROL_ACHIEVED: 500,      // $500 per member achieving BP control
  BMI_PER_POINT: 250,            // $250 per point reduction per member
};

// Cohort utilization data for tracking healthcare cost reduction over time
export interface CohortUtilization {
  id: string;
  cohortName: string;    // "Oct 2024"
  cohortMonth: string;   // "2024-10"
  tier: 1 | 2 | 3;
  memberCount: number;
  utilizationData: {
    period: string;      // "Baseline", "Month 1", etc.
    cost: number;        // Average PMPM cost
  }[];
}

export const cohortUtilizationData: CohortUtilization[] = [
  {
    id: 'cohort-oct-24',
    cohortName: 'Oct 2024',
    cohortMonth: '2024-10',
    tier: 1,
    memberCount: 12,
    utilizationData: [
      { period: 'Baseline', cost: 17200 },
      { period: 'Month 1', cost: 15100 },
      { period: 'Month 2', cost: 13400 },
      { period: 'Month 3', cost: 11800 },
      { period: 'Month 4', cost: 10500 },
    ],
  },
  {
    id: 'cohort-nov-24',
    cohortName: 'Nov 2024',
    cohortMonth: '2024-11',
    tier: 1,
    memberCount: 15,
    utilizationData: [
      { period: 'Baseline', cost: 16800 },
      { period: 'Month 1', cost: 14900 },
      { period: 'Month 2', cost: 13200 },
      { period: 'Month 3', cost: 11900 },
    ],
  },
  {
    id: 'cohort-dec-24',
    cohortName: 'Dec 2024',
    cohortMonth: '2024-12',
    tier: 2,
    memberCount: 18,
    utilizationData: [
      { period: 'Baseline', cost: 12400 },
      { period: 'Month 1', cost: 10800 },
      { period: 'Month 2', cost: 9600 },
    ],
  },
  {
    id: 'cohort-jan-25',
    cohortName: 'Jan 2025',
    cohortMonth: '2025-01',
    tier: 2,
    memberCount: 21,
    utilizationData: [
      { period: 'Baseline', cost: 9800 },
      { period: 'Month 1', cost: 8900 },
    ],
  },
];

export interface IntegrationStatus {
  id: string;
  name: string;
  type: 'Healthie' | 'NetSuite' | 'Salesforce' | 'Nudge';
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync: string;
  recordsProcessed: number;
  description: string;
}

export interface Rule {
  id: string;
  name: string;
  condition: string;
  action: string;
  version: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface BillingRecord {
  id: string;
  memberId: string;
  enrollmentId: string;
  orderId: string;
  status: 'pending' | 'submitted' | 'paid' | 'rejected';
  amount: number;
  submittedAt?: string;
  paidAt?: string;
  source: 'NetSuite';
}

// Demo data - HCSC SOW Tier-based Programs
export const programs: Program[] = [
  {
    id: 'prog-tier1',
    name: 'Tier 1: High Risk & Comorbidity',
    tier: 1,
    riskLevel: 'high',
    description: 'Intensive 12-week program for high-acuity members requiring immediate nutritional and behavioral stabilization',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'High risk score, multiple chronic conditions, comorbidity present',
    duration: '12 weeks',
    mealsPerWeek: 14,
    mtmWeeks: 8, // Weeks 1-8: Medically Tailored Meals
    mtgWeeks: 4, // Weeks 9-12: Medically Tailored Groceries
    clinicalSupport: '3 months',
    status: 'active',
  },
  {
    id: 'prog-tier2',
    name: 'Tier 2: Medium Risk',
    tier: 2,
    riskLevel: 'medium',
    description: '12-week step-down program for members with chronic conditions who have some capacity for self-preparation',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'Medium risk score, chronic condition diagnosis, capacity for meal preparation',
    duration: '12 weeks',
    mealsPerWeek: 14,
    mtmWeeks: 4, // Weeks 1-4: Medically Tailored Meals
    mtgWeeks: 8, // Weeks 5-12: Medically Tailored Groceries
    clinicalSupport: '3 months',
    status: 'active',
  },
  {
    id: 'prog-tier3',
    name: 'Tier 3: Diet Quality & Preventive',
    tier: 3,
    riskLevel: 'preventive',
    description: 'Preventive program for diet quality improvement and inflammation reduction via increased plant-based intake',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    eligibilityRules: 'Preventive care, diet quality improvement, inflammation reduction goals',
    duration: '12 weeks',
    mealsPerWeek: 0, // Uses produce boxes instead
    mtmWeeks: 0,
    mtgWeeks: 0,
    clinicalSupport: '3 months',
    status: 'active',
  },
];

// Helper function to calculate phase based on tier and week
export function calculatePhase(tier: 1 | 2 | 3, currentWeek: number): FoodPhase {
  if (tier === 3) return 'Produce';
  if (tier === 1) {
    return currentWeek <= 8 ? 'MTM' : 'MTG';
  }
  // Tier 2
  return currentWeek <= 4 ? 'MTM' : 'MTG';
}

// Helper to get phase week info
export function getPhaseInfo(program: Program, currentWeek: number): { 
  phase: FoodPhase; 
  phaseWeek: number; 
  phaseTotal: number;
  phaseName: string;
} {
  if (program.tier === 3) {
    const distribution = Math.ceil(currentWeek / 2); // Bi-weekly
    return { 
      phase: 'Produce', 
      phaseWeek: distribution, 
      phaseTotal: 6,
      phaseName: 'Produce Box'
    };
  }
  
  const phase = calculatePhase(program.tier, currentWeek);
  
  if (program.tier === 1) {
    if (phase === 'MTM') {
      return { phase, phaseWeek: currentWeek, phaseTotal: 8, phaseName: 'Medically Tailored Meals' };
    }
    return { phase, phaseWeek: currentWeek - 8, phaseTotal: 4, phaseName: 'Medically Tailored Groceries' };
  }
  
  // Tier 2
  if (phase === 'MTM') {
    return { phase, phaseWeek: currentWeek, phaseTotal: 4, phaseName: 'Medically Tailored Meals' };
  }
  return { phase, phaseWeek: currentWeek - 4, phaseTotal: 8, phaseName: 'Medically Tailored Groceries' };
}

// CBO Authorized Users
export interface CBOUser {
  id: string;
  cboId: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export const cboUsers: CBOUser[] = [
  {
    id: 'cbo-user-001',
    cboId: 'cbo-001',
    name: 'Maria Garcia',
    email: 'mgarcia@laregionalfoodbank.org',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-28',
  },
  {
    id: 'cbo-user-002',
    cboId: 'cbo-001',
    name: 'Jose Martinez',
    email: 'jmartinez@laregionalfoodbank.org',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-03-27',
  },
  {
    id: 'cbo-user-003',
    cboId: 'cbo-001',
    name: 'Sarah Johnson',
    email: 'sjohnson@laregionalfoodbank.org',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-02-15',
  },
  {
    id: 'cbo-user-004',
    cboId: 'cbo-001',
    name: 'Michael Chen',
    email: 'mchen@laregionalfoodbank.org',
    role: 'staff',
    status: 'active',
    lastLogin: '2024-03-26',
  },
];

export const cbos: CBO[] = [
  {
    id: 'cbo-001',
    name: 'LA Regional Food Bank',
    contactName: 'Maria Garcia',
    contactEmail: 'mgarcia@laregionalfoodbank.org',
    phone: '(323) 555-0101',
    address: '1734 E 41st St, Los Angeles, CA 90058',
    serviceArea: ['Los Angeles', 'Long Beach', 'Pasadena'],
    partnerId: 'PRTN-LA001',
    enrolledMemberCount: 23,
    createdAt: '2024-01-15',
  },
  {
    id: 'cbo-002',
    name: 'San Diego Food Connection',
    contactName: 'Robert Chen',
    contactEmail: 'rchen@sdfoodconnection.org',
    phone: '(619) 555-0202',
    address: '9850 Distribution Ave, San Diego, CA 92121',
    serviceArea: ['San Diego', 'Chula Vista', 'Oceanside'],
    partnerId: 'PRTN-SD002',
    enrolledMemberCount: 18,
    createdAt: '2024-02-01',
  },
  {
    id: 'cbo-003',
    name: 'Orange County Community Nutrition',
    contactName: 'Jennifer Williams',
    contactEmail: 'jwilliams@occn.org',
    phone: '(714) 555-0303',
    address: '8014 Marine Way, Irvine, CA 92618',
    serviceArea: ['Irvine', 'Anaheim', 'Santa Ana'],
    partnerId: 'PRTN-OC003',
    enrolledMemberCount: 9,
    createdAt: '2024-02-20',
  },
];

export const members: Member[] = [
  {
    id: 'mem-001',
    name: 'John TestSmith',
    firstName: 'John',
    lastName: 'TestSmith',
    dob: '1958-03-15',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    county: 'Los Angeles',
    phone: '303829837',
    email: 'jason@wellchemy.ai',
    preferredLanguage: 'English',
    consentGiven: true,
    consentDate: '2024-01-20',
    riskFlags: ['High A1C', 'Food Insecurity'],
    createdAt: '2024-01-20',
    healthieUserId: '13159857', // Linked Healthie user ID for chat
    // TODO: Replace with actual Healthie credentials for John TestSmith
    healthieEmail: 'jason@wellchemy.ai',
    healthiePassword: 'Tightlines2026..',
    healthieConversationId: '17976028', // Conversation with health coach
  },
  {
    id: 'mem-002',
    name: 'Maria Rodriguez',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    dob: '1965-07-22',
    address: '456 Oak Ave',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    county: 'San Diego',
    phone: '(619) 555-0002',
    email: 'mrodriguez@email.com',
    preferredLanguage: 'Spanish',
    consentGiven: true,
    consentDate: '2024-02-05',
    riskFlags: ['CHF Stage 2'],
    createdAt: '2024-02-05',
  },
  {
    id: 'mem-003',
    name: 'David Chen',
    firstName: 'David',
    lastName: 'Chen',
    dob: '1972-11-30',
    address: '789 Pine Rd',
    city: 'Irvine',
    state: 'CA',
    zip: '92618',
    county: 'Orange',
    phone: '(714) 555-0003',
    email: 'dchen@email.com',
    preferredLanguage: 'English',
    consentGiven: true,
    consentDate: '2024-02-15',
    riskFlags: [],
    createdAt: '2024-02-15',
  },
  {
    id: 'mem-004',
    name: 'Patricia Williams',
    firstName: 'Patricia',
    lastName: 'Williams',
    dob: '1948-05-08',
    address: '321 Elm St',
    city: 'Long Beach',
    state: 'CA',
    zip: '90802',
    county: 'Los Angeles',
    phone: '(562) 555-0004',
    email: 'pwilliams@email.com',
    preferredLanguage: 'English',
    consentGiven: false,
    riskFlags: ['Missing Consent', 'Transportation Barrier'],
    createdAt: '2024-03-01',
  },
  {
    id: 'mem-005',
    name: 'James Wilson',
    firstName: 'James',
    lastName: 'Wilson',
    dob: '1955-09-12',
    address: '654 Maple Dr',
    city: 'Pasadena',
    state: 'CA',
    zip: '91101',
    county: 'Los Angeles',
    phone: '(626) 555-0005',
    email: 'jwilson@email.com',
    preferredLanguage: 'English',
    consentGiven: true,
    consentDate: '2024-03-10',
    riskFlags: ['High A1C'],
    createdAt: '2024-03-10',
  },
];

// Generate more members for demo
const firstNames = ['Michael', 'Sarah', 'Robert', 'Jennifer', 'William', 'Linda', 'Richard', 'Elizabeth', 'Joseph', 'Barbara', 'Thomas', 'Susan', 'Charles', 'Jessica', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Dorothy', 'Paul', 'Kimberly', 'Andrew', 'Emily', 'Joshua', 'Donna', 'Kenneth', 'Michelle', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Timothy', 'Deborah', 'Ronald'];
const lastNames = ['Johnson', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter'];
const counties = ['Los Angeles', 'San Diego', 'Orange'];
const cities: Record<string, string[]> = {
  'Los Angeles': ['Los Angeles', 'Long Beach', 'Pasadena', 'Glendale'],
  'San Diego': ['San Diego', 'Chula Vista', 'Oceanside', 'Carlsbad'],
  'Orange': ['Irvine', 'Anaheim', 'Santa Ana', 'Huntington Beach'],
};
const riskOptions = ['High A1C', 'Food Insecurity', 'CHF Stage 2', 'Transportation Barrier', 'Language Barrier', 'Medication Non-adherence'];

for (let i = 6; i <= 50; i++) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const county = counties[Math.floor(Math.random() * counties.length)];
  const city = cities[county][Math.floor(Math.random() * cities[county].length)];
  const hasConsent = Math.random() > 0.1;
  const risks = riskOptions.filter(() => Math.random() > 0.8);
  if (!hasConsent) risks.push('Missing Consent');
  
  members.push({
    id: `mem-${String(i).padStart(3, '0')}`,
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    dob: `${1945 + Math.floor(Math.random() * 35)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    address: `${Math.floor(Math.random() * 9999) + 100} ${['Oak', 'Pine', 'Maple', 'Elm', 'Cedar', 'Birch'][Math.floor(Math.random() * 6)]} ${['St', 'Ave', 'Rd', 'Dr', 'Blvd'][Math.floor(Math.random() * 5)]}`,
    city,
    state: 'CA',
    zip: String(90000 + Math.floor(Math.random() * 3000)),
    county,
    phone: `(${['213', '310', '323', '619', '858', '714', '949'][Math.floor(Math.random() * 7)]}) 555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@email.com`,
    preferredLanguage: Math.random() > 0.7 ? 'Spanish' : 'English',
    consentGiven: hasConsent,
    consentDate: hasConsent ? `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : undefined,
    riskFlags: risks,
    createdAt: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  });
}

// Assign members to tiers: 40% Tier 1, 40% Tier 2, 20% Tier 3
const programIds = ['prog-tier1', 'prog-tier2', 'prog-tier3'];

export const enrollments: Enrollment[] = members.map((member, idx) => {
  const statuses: Enrollment['status'][] = ['active', 'active', 'active', 'pending', 'paused', 'complete'];
  const sources: EnrollmentSource[] = ['CBO', 'CBO', 'HP Outreach', 'Provider', 'Self'];
  
  // First member (demo member) is always active in Tier 1
  const status = idx === 0 ? 'active' : statuses[Math.floor(Math.random() * statuses.length)];
  
  // Distribute across tiers: 40% Tier 1, 40% Tier 2, 20% Tier 3
  let programId: string;
  const tierRoll = Math.random();
  if (tierRoll < 0.4) {
    programId = 'prog-tier1';
  } else if (tierRoll < 0.8) {
    programId = 'prog-tier2';
  } else {
    programId = 'prog-tier3';
  }
  
  // First member (demo member) is always Tier 1, Week 3
  if (idx === 0) {
    programId = 'prog-tier1';
  }
  
  const program = programs.find(p => p.id === programId)!;
  
  // Calculate current week (1-12), demo member is week 3
  const currentWeek = idx === 0 ? 3 : Math.floor(Math.random() * 12) + 1;
  const currentPhase = calculatePhase(program.tier, currentWeek);
  
  return {
    id: `enr-${String(idx + 1).padStart(3, '0')}`,
    memberId: member.id,
    programId,
    status,
    enrollmentSource: idx === 0 ? 'CBO' : sources[Math.floor(Math.random() * sources.length)],
    sourceId: idx === 0 ? 'cbo-001' : (Math.random() > 0.5 ? cbos[Math.floor(Math.random() * cbos.length)].id : undefined),
    enrollmentDate: member.createdAt,
    currentWeek,
    currentPhase,
    benefitLevel: `Tier ${program.tier} - Week ${currentWeek}`,
    nextShipmentDate: status === 'active' ? `2025-02-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}` : undefined,
  };
});

export const assessments: Assessment[] = members.slice(0, 30).map((member, idx) => ({
  id: `ass-${String(idx + 1).padStart(3, '0')}`,
  memberId: member.id,
  date: member.createdAt,
  type: 'Initial Intake Assessment',
  dietScore: Math.floor(Math.random() * 40) + 30,
  sdohNeeds: ['Food Access', 'Transportation', 'Housing', 'Employment'].filter(() => Math.random() > 0.6),
  notes: 'Assessment completed via telehealth intake.',
  source: 'Healthie',
}));

export const rulesDecisions: RulesDecision[] = enrollments.slice(0, 35).map((enrollment, idx) => ({
  id: `rul-${String(idx + 1).padStart(3, '0')}`,
  memberId: enrollment.memberId,
  enrollmentId: enrollment.id,
  eligibilityResult: enrollment.status === 'pending' ? 'pending_review' : (Math.random() > 0.1 ? 'approved' : 'denied'),
  benefitLevel: enrollment.benefitLevel,
  frequency: 'Weekly',
  nextShipmentDate: enrollment.nextShipmentDate || '',
  exceptions: Math.random() > 0.85 ? ['Address verification needed', 'Manual review required'] : [],
  ruleVersion: 'v2.3',
  decidedAt: enrollment.enrollmentDate,
  source: 'NetSuite',
}));

export const orders: Order[] = enrollments.filter(e => e.status === 'active').slice(0, 25).flatMap((enrollment, idx) => {
  // Heavily weight toward 'delivered' for ~98% on-time rate
  const getStatus = (): Order['shipmentStatus'] => {
    const rand = Math.random();
    if (rand < 0.98) return 'delivered';
    if (rand < 0.99) return 'in_transit';
    return 'exception';
  };
  
  const program = programs.find(p => p.id === enrollment.programId);
  
  // Set meal plan based on phase
  let mealPlan = 'Medically Tailored Meals (MTM)';
  if (enrollment.currentPhase === 'MTG') {
    mealPlan = 'Medically Tailored Groceries (MTG)';
  } else if (enrollment.currentPhase === 'Produce') {
    mealPlan = 'Produce Box (15 lbs)';
  }
  
  return [{
    id: `ord-${String(idx + 1).padStart(3, '0')}`,
    memberId: enrollment.memberId,
    enrollmentId: enrollment.id,
    mealPlan,
    mealsCount: program?.tier === 3 ? 0 : 14,
    shipmentStatus: getStatus(),
    trackingNumber: `TRK${Math.floor(Math.random() * 900000) + 100000}`,
    estimatedDelivery: `2025-02-${String(Math.floor(Math.random() * 10) + 5).padStart(2, '0')}`,
    deliveryExceptions: Math.random() > 0.98 ? ['Address not found'] : undefined,
    createdAt: enrollment.enrollmentDate,
    source: 'NetSuite',
  }];
});

// Generate billing records for orders
export const billingRecords: BillingRecord[] = orders.map((order, idx) => {
  const statuses: BillingRecord['status'][] = ['pending', 'submitted', 'submitted', 'paid', 'paid', 'paid', 'rejected'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `bill-${String(idx + 1).padStart(3, '0')}`,
    memberId: order.memberId,
    enrollmentId: order.enrollmentId,
    orderId: order.id,
    status,
    amount: Math.floor(Math.random() * 200) + 100,
    submittedAt: status !== 'pending' ? `2025-02-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}` : undefined,
    paidAt: status === 'paid' ? `2025-02-${String(Math.floor(Math.random() * 10) + 10).padStart(2, '0')}` : undefined,
    source: 'NetSuite',
  };
});

export const campaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Tier 1 High Risk Onboarding',
    segment: 'New enrollees with high-risk comorbidities',
    programId: 'prog-tier1',
    touchCount: 156,
    smsCount: 312,
    emailCount: 156,
    openRate: 0.42,
    clickRate: 0.18,
    status: 'active',
    source: 'Salesforce',
  },
  {
    id: 'camp-002',
    name: 'Tier 2 MTG Transition',
    segment: 'Members transitioning from MTM to MTG phase',
    programId: 'prog-tier2',
    touchCount: 89,
    smsCount: 178,
    emailCount: 89,
    openRate: 0.38,
    clickRate: 0.15,
    status: 'active',
    source: 'Salesforce',
  },
  {
    id: 'camp-003',
    name: 'Tier 3 Produce Box Reminder',
    segment: 'Preventive program members - produce delivery',
    programId: 'prog-tier3',
    touchCount: 34,
    smsCount: 68,
    emailCount: 34,
    openRate: 0.29,
    clickRate: 0.08,
    status: 'completed',
    source: 'Salesforce',
  },
];

export const serviceCases: ServiceCase[] = [
  {
    id: 'case-001',
    memberId: 'mem-001',
    subject: 'Delivery Address Update',
    description: 'Member needs to update delivery address due to recent move.',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-01-15',
    source: 'Salesforce',
  },
  {
    id: 'case-002',
    memberId: 'mem-004',
    subject: 'Missing Shipment',
    description: 'Member reports shipment marked delivered but not received.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-01-18',
    source: 'Salesforce',
  },
  {
    id: 'case-003',
    memberId: 'mem-002',
    subject: 'Dietary Preference Update',
    description: 'Member requesting change to vegetarian meal options.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2025-01-10',
    resolvedAt: '2025-01-12',
    source: 'Salesforce',
  },
];

export const contentPlans: ContentPlan[] = members.slice(0, 20).map((member, idx) => ({
  id: `cp-${String(idx + 1).padStart(3, '0')}`,
  memberId: member.id,
  modules: [
    {
      id: `mod-${idx}-1`,
      title: 'Understanding Your Condition',
      type: 'video',
      status: Math.random() > 0.5 ? 'completed' : 'assigned',
      completedAt: Math.random() > 0.5 ? '2025-01-05' : undefined,
      engagementScore: Math.floor(Math.random() * 40) + 60,
    },
    {
      id: `mod-${idx}-2`,
      title: 'Healthy Meal Preparation',
      type: 'class',
      status: Math.random() > 0.7 ? 'completed' : 'in_progress',
      completedAt: Math.random() > 0.7 ? '2025-01-12' : undefined,
      engagementScore: Math.floor(Math.random() * 30) + 70,
    },
    {
      id: `mod-${idx}-3`,
      title: 'Managing Blood Sugar',
      type: 'article',
      status: 'assigned',
      engagementScore: 0,
    },
  ],
  source: 'Nudge',
}));

export const timelineEvents: TimelineEvent[] = [
  // Member 1 timeline
  { id: 'evt-001', memberId: 'mem-001', timestamp: '2025-01-06 09:00', eventType: 'Intake Submitted', description: 'Member completed Healthie intake form', source: 'Healthie' },
  { id: 'evt-002', memberId: 'mem-001', timestamp: '2025-01-06 09:15', eventType: 'Eligibility Approved', description: 'Approved for Tier 1: High Risk & Comorbidity program', source: 'NetSuite' },
  { id: 'evt-003', memberId: 'mem-001', timestamp: '2025-01-06 10:00', eventType: 'Content Assigned', description: 'Nudge assigned 3 educational modules', source: 'Nudge' },
  { id: 'evt-004', memberId: 'mem-001', timestamp: '2025-01-08 14:00', eventType: 'First MTM Shipment', description: 'Order #ORD-001 shipped - 14 Medically Tailored Meals', source: 'NetSuite' },
  { id: 'evt-005', memberId: 'mem-001', timestamp: '2025-01-11 11:00', eventType: 'Delivery Confirmed', description: 'Week 1 MTM shipment delivered successfully', source: 'NetSuite' },
  { id: 'evt-006', memberId: 'mem-001', timestamp: '2025-01-15 10:00', eventType: 'Health Coach Session', description: 'Completed first health coach consultation', source: 'Healthie' },
  { id: 'evt-007', memberId: 'mem-001', timestamp: '2025-01-20 16:00', eventType: 'Module Completed', description: 'Completed "Understanding Your Condition" video', source: 'Nudge' },
];

export const integrations: IntegrationStatus[] = [
  {
    id: 'int-001',
    name: 'Healthie',
    type: 'Healthie',
    status: 'connected',
    lastSync: '2025-01-29 14:32:00',
    recordsProcessed: 1247,
    description: 'Forms & Assessments Ingestion',
  },
  {
    id: 'int-002',
    name: 'NetSuite',
    type: 'NetSuite',
    status: 'connected',
    lastSync: '2025-01-29 14:30:00',
    recordsProcessed: 3891,
    description: 'Rules Engine & Fulfillment',
  },
  {
    id: 'int-003',
    name: 'Salesforce',
    type: 'Salesforce',
    status: 'syncing',
    lastSync: '2025-01-29 14:28:00',
    recordsProcessed: 892,
    description: 'CRM & Service Cases',
  },
  {
    id: 'int-004',
    name: 'Nudge',
    type: 'Nudge',
    status: 'connected',
    lastSync: '2025-01-29 14:25:00',
    recordsProcessed: 456,
    description: 'Content & Education',
  },
];

export const rules: Rule[] = [
  {
    id: 'rule-001',
    name: 'Tier 1 High Risk Eligibility',
    condition: 'program = "Tier 1" AND risk_score >= 7 AND comorbidity_count >= 2 AND consent = true',
    action: 'benefit = 12 weeks, phase_1 = MTM (weeks 1-8), phase_2 = MTG (weeks 9-12), meals = 14/week',
    version: 'v2.3',
    status: 'published',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-15',
  },
  {
    id: 'rule-002',
    name: 'Tier 2 Medium Risk Eligibility',
    condition: 'program = "Tier 2" AND risk_score >= 4 AND risk_score < 7 AND chronic_condition = true AND consent = true',
    action: 'benefit = 12 weeks, phase_1 = MTM (weeks 1-4), phase_2 = MTG (weeks 5-12), meals = 14/week',
    version: 'v1.2',
    status: 'published',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'rule-003',
    name: 'Tier 3 Preventive Eligibility',
    condition: 'program = "Tier 3" AND diet_quality_goal = true AND consent = true',
    action: 'benefit = 12 weeks, produce_box = bi-weekly (6 distributions), produce_weight = 15lbs',
    version: 'v1.0',
    status: 'published',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

// Health Plan Organization and Users
export interface HealthPlan {
  id: string;
  name: string;
  planId: string;
  contactName: string;
  contactEmail: string;
  phone: string;
  address: string;
  memberCount: number;
}

export interface HealthPlanUser {
  id: string;
  healthPlanId: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export const healthPlans: HealthPlan[] = [
  {
    id: 'hp-001',
    name: 'HCSC',
    planId: 'BCCA-2024',
    contactName: 'Jennifer Adams',
    contactEmail: 'jadams@bluecross.com',
    phone: '(800) 555-BLUE',
    address: '300 E Randolph St, Chicago, IL 60601',
    memberCount: 50,
  },
];

export const healthPlanUsers: HealthPlanUser[] = [
  {
    id: 'hp-user-001',
    healthPlanId: 'hp-001',
    name: 'Jennifer Adams',
    email: 'jadams@bluecross.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-01-28',
  },
  {
    id: 'hp-user-002',
    healthPlanId: 'hp-001',
    name: 'Michael Torres',
    email: 'mtorres@bluecross.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2025-01-27',
  },
  {
    id: 'hp-user-003',
    healthPlanId: 'hp-001',
    name: 'Sarah Kim',
    email: 'skim@bluecross.com',
    role: 'viewer',
    status: 'active',
    lastLogin: '2025-01-25',
  },
  {
    id: 'hp-user-004',
    healthPlanId: 'hp-001',
    name: 'David Lee',
    email: 'dlee@bluecross.com',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2024-12-10',
  },
];

// Generate clinical data for members with active/complete enrollments
// This simulates pre/post measurements for outcomes tracking
function generateClinicalData(): MemberClinicalData[] {
  const clinicalData: MemberClinicalData[] = [];
  
  // Get members with active or complete enrollments (those who would have pre/post data)
  const eligibleEnrollments = enrollments.filter(e => 
    e.status === 'active' || e.status === 'complete'
  );
  
  // Take a subset (~80% of eligible members have clinical data)
  const membersWithClinicalData = eligibleEnrollments
    .filter(() => Math.random() > 0.2)
    .slice(0, 45); // Cap at 45 members for realistic numbers
  
  membersWithClinicalData.forEach((enrollment, idx) => {
    const memberId = enrollment.memberId;
    const baseDate = new Date('2024-01-01');
    baseDate.setDate(baseDate.getDate() + Math.floor(Math.random() * 60));
    
    // Generate baseline measurements
    const baselineA1c = 7.5 + Math.random() * 3; // 7.5-10.5
    const baselineSystolic = 140 + Math.floor(Math.random() * 20); // 140-160
    const baselineDiastolic = 85 + Math.floor(Math.random() * 15); // 85-100
    const baselineBmi = 28 + Math.random() * 10; // 28-38
    const baselineAdmissions = Math.floor(Math.random() * 3) + 1; // 1-3
    
    // Baseline measurement
    clinicalData.push({
      id: `clin-base-${String(idx + 1).padStart(3, '0')}`,
      memberId,
      measurementDate: baseDate.toISOString().split('T')[0],
      measurementType: 'baseline',
      a1c: Math.round(baselineA1c * 10) / 10,
      systolicBP: baselineSystolic,
      diastolicBP: baselineDiastolic,
      bmi: Math.round(baselineBmi * 10) / 10,
      hospitalAdmissions: baselineAdmissions,
    });
    
    // Current measurement (showing improvement)
    const currentDate = new Date(baseDate);
    currentDate.setMonth(currentDate.getMonth() + 3 + Math.floor(Math.random() * 3));
    
    const a1cReduction = 0.5 + Math.random() * 1.5; // 0.5-2.0 reduction
    const systolicReduction = 12 + Math.floor(Math.random() * 18); // 12-30 reduction
    const diastolicReduction = 8 + Math.floor(Math.random() * 12); // 8-20 reduction
    const bmiReduction = 1 + Math.random() * 3; // 1-4 reduction
    const admissionReduction = Math.min(baselineAdmissions, Math.floor(Math.random() * 2) + 1); // Reduce by 1-2, not below 0
    
    clinicalData.push({
      id: `clin-curr-${String(idx + 1).padStart(3, '0')}`,
      memberId,
      measurementDate: currentDate.toISOString().split('T')[0],
      measurementType: 'current',
      a1c: Math.round((baselineA1c - a1cReduction) * 10) / 10,
      systolicBP: baselineSystolic - systolicReduction,
      diastolicBP: baselineDiastolic - diastolicReduction,
      bmi: Math.round((baselineBmi - bmiReduction) * 10) / 10,
      hospitalAdmissions: Math.max(0, baselineAdmissions - admissionReduction),
    });
  });
  
  return clinicalData;
}

export const memberClinicalData: MemberClinicalData[] = generateClinicalData();


export const demoSteps = [
  {
    step: 1,
    title: 'Member Intake via Healthie',
    description: 'Create a new member through the intake form. Data syncs from Healthie.',
    portal: 'member' as UserRole,
    path: '/member/signup',
  },
  {
    step: 2,
    title: 'NetSuite Rules Decision',
    description: 'View how the rules engine determines eligibility and assigns benefits.',
    portal: 'internal' as UserRole,
    path: '/internal/rules',
  },
  {
    step: 3,
    title: 'CBO Member Roster',
    description: 'See the members enrolled by a community partner organization.',
    portal: 'cbo' as UserRole,
    path: '/cbo',
  },
  {
    step: 4,
    title: 'Health Plan Outcomes',
    description: 'Review program KPIs and population health outcomes.',
    portal: 'healthplan' as UserRole,
    path: '/healthplan',
  },
  {
    step: 5,
    title: 'Resolve an Exception',
    description: 'Handle eligibility or delivery exceptions in the Ops cockpit.',
    portal: 'internal' as UserRole,
    path: '/internal',
  },
];
