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
}

export interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  eligibilityRules: string;
  benefitsFrequency: string;
  benefitsDuration: string;
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

export interface Enrollment {
  id: string;
  memberId: string;
  programId: string;
  status: EnrollmentStatus;
  enrollmentSource: EnrollmentSource;
  sourceId?: string;
  enrollmentDate: string;
  benefitLevel: string;
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

// Demo data
export const programs: Program[] = [
  {
    id: 'prog-001',
    name: 'Diabetes Support – Medicaid',
    description: 'Comprehensive nutrition program for Medicaid members with Type 2 Diabetes',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    eligibilityRules: 'Medicaid eligible, Diabetes diagnosis (ICD-10: E11.x), County in [Los Angeles, Orange, San Diego]',
    benefitsFrequency: 'Weekly',
    benefitsDuration: '12 weeks',
    status: 'active',
  },
  {
    id: 'prog-002',
    name: 'Heart Health – Medicare Advantage',
    description: 'Medically tailored meals for members with cardiovascular conditions',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    eligibilityRules: 'Medicare Advantage, CHF or CAD diagnosis, SDOH risk score > 3',
    benefitsFrequency: 'Bi-weekly',
    benefitsDuration: '16 weeks',
    status: 'active',
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
    name: 'John Smith',
    firstName: 'John',
    lastName: 'Smith',
    dob: '1958-03-15',
    address: '123 Main St',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    county: 'Los Angeles',
    phone: '(213) 555-0001',
    email: 'jsmith@email.com',
    preferredLanguage: 'English',
    consentGiven: true,
    consentDate: '2024-01-20',
    riskFlags: ['High A1C', 'Food Insecurity'],
    createdAt: '2024-01-20',
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

export const enrollments: Enrollment[] = members.map((member, idx) => {
  const statuses: Enrollment['status'][] = ['active', 'active', 'active', 'pending', 'paused', 'complete'];
  const sources: EnrollmentSource[] = ['CBO', 'CBO', 'HP Outreach', 'Provider', 'Self'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: `enr-${String(idx + 1).padStart(3, '0')}`,
    memberId: member.id,
    programId: Math.random() > 0.4 ? 'prog-001' : 'prog-002',
    status,
    enrollmentSource: sources[Math.floor(Math.random() * sources.length)],
    sourceId: Math.random() > 0.5 ? cbos[Math.floor(Math.random() * cbos.length)].id : undefined,
    enrollmentDate: member.createdAt,
    benefitLevel: Math.random() > 0.3 ? '12 weeks' : '8 weeks',
    nextShipmentDate: status === 'active' ? `2024-04-${String(Math.floor(Math.random() * 15) + 1).padStart(2, '0')}` : undefined,
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
  const statuses: Order['shipmentStatus'][] = ['delivered', 'delivered', 'in_transit', 'shipped', 'processing', 'exception'];
  return [{
    id: `ord-${String(idx + 1).padStart(3, '0')}`,
    memberId: enrollment.memberId,
    enrollmentId: enrollment.id,
    mealPlan: Math.random() > 0.5 ? 'Diabetes-Friendly' : 'Heart Healthy',
    mealsCount: Math.random() > 0.5 ? 14 : 21,
    shipmentStatus: statuses[Math.floor(Math.random() * statuses.length)],
    trackingNumber: `TRK${Math.floor(Math.random() * 900000) + 100000}`,
    estimatedDelivery: `2024-04-${String(Math.floor(Math.random() * 10) + 5).padStart(2, '0')}`,
    deliveryExceptions: Math.random() > 0.9 ? ['Address not found', 'Recipient unavailable'] : undefined,
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
    submittedAt: status !== 'pending' ? `2024-04-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}` : undefined,
    paidAt: status === 'paid' ? `2024-04-${String(Math.floor(Math.random() * 10) + 10).padStart(2, '0')}` : undefined,
    source: 'NetSuite',
  };
});

export const campaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Q1 Diabetes Program Launch',
    segment: 'New Medicaid enrollees with diabetes',
    programId: 'prog-001',
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
    name: 'Heart Health Awareness',
    segment: 'Medicare Advantage with CHF diagnosis',
    programId: 'prog-002',
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
    name: 'Re-engagement Campaign',
    segment: 'Paused members - all programs',
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
    createdAt: '2024-03-15',
    source: 'Salesforce',
  },
  {
    id: 'case-002',
    memberId: 'mem-004',
    subject: 'Missing Shipment',
    description: 'Member reports shipment marked delivered but not received.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2024-03-18',
    source: 'Salesforce',
  },
  {
    id: 'case-003',
    memberId: 'mem-002',
    subject: 'Dietary Preference Update',
    description: 'Member requesting change to vegetarian meal options.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-10',
    resolvedAt: '2024-03-12',
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
      completedAt: Math.random() > 0.5 ? '2024-03-05' : undefined,
      engagementScore: Math.floor(Math.random() * 40) + 60,
    },
    {
      id: `mod-${idx}-2`,
      title: 'Healthy Meal Preparation',
      type: 'class',
      status: Math.random() > 0.7 ? 'completed' : 'in_progress',
      completedAt: Math.random() > 0.7 ? '2024-03-12' : undefined,
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
  { id: 'evt-001', memberId: 'mem-001', timestamp: '2024-01-20 09:00', eventType: 'Intake Submitted', description: 'Member completed Healthie intake form', source: 'Healthie' },
  { id: 'evt-002', memberId: 'mem-001', timestamp: '2024-01-20 09:15', eventType: 'Eligibility Approved', description: 'NetSuite rules engine approved eligibility for Diabetes Support program', source: 'NetSuite' },
  { id: 'evt-003', memberId: 'mem-001', timestamp: '2024-01-20 10:00', eventType: 'Content Assigned', description: 'Nudge assigned 3 educational modules', source: 'Nudge' },
  { id: 'evt-004', memberId: 'mem-001', timestamp: '2024-01-22 14:00', eventType: 'First Shipment', description: 'Order #ORD-001 shipped - 14 meals', source: 'NetSuite' },
  { id: 'evt-005', memberId: 'mem-001', timestamp: '2024-01-25 11:00', eventType: 'Delivery Confirmed', description: 'Shipment delivered successfully', source: 'NetSuite' },
  { id: 'evt-006', memberId: 'mem-001', timestamp: '2024-02-01 10:00', eventType: 'Campaign Touch', description: 'Received Q1 engagement email', source: 'Salesforce' },
  { id: 'evt-007', memberId: 'mem-001', timestamp: '2024-02-05 16:00', eventType: 'Module Completed', description: 'Completed "Understanding Your Condition" video', source: 'Nudge' },
];

export const integrations: IntegrationStatus[] = [
  {
    id: 'int-001',
    name: 'Healthie',
    type: 'Healthie',
    status: 'connected',
    lastSync: '2024-03-20 14:32:00',
    recordsProcessed: 1247,
    description: 'Forms & Assessments Ingestion',
  },
  {
    id: 'int-002',
    name: 'NetSuite',
    type: 'NetSuite',
    status: 'connected',
    lastSync: '2024-03-20 14:30:00',
    recordsProcessed: 3891,
    description: 'Rules Engine & Fulfillment',
  },
  {
    id: 'int-003',
    name: 'Salesforce',
    type: 'Salesforce',
    status: 'syncing',
    lastSync: '2024-03-20 14:28:00',
    recordsProcessed: 892,
    description: 'CRM & Service Cases',
  },
  {
    id: 'int-004',
    name: 'Nudge',
    type: 'Nudge',
    status: 'connected',
    lastSync: '2024-03-20 14:25:00',
    recordsProcessed: 456,
    description: 'Content & Education',
  },
];

export const rules: Rule[] = [
  {
    id: 'rule-001',
    name: 'Diabetes Support Eligibility',
    condition: 'program = "Diabetes Support" AND member_county IN ["Los Angeles", "San Diego", "Orange"] AND consent = true',
    action: 'benefit = 12 weeks, frequency = weekly, meal_plan = "Diabetes-Friendly"',
    version: 'v2.3',
    status: 'published',
    createdAt: '2024-01-01',
    updatedAt: '2024-02-15',
  },
  {
    id: 'rule-002',
    name: 'Heart Health Eligibility',
    condition: 'program = "Heart Health" AND (diagnosis_code STARTS_WITH "I50" OR diagnosis_code STARTS_WITH "I25") AND consent = true',
    action: 'benefit = 16 weeks, frequency = bi-weekly, meal_plan = "Heart Healthy"',
    version: 'v1.2',
    status: 'published',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
  },
  {
    id: 'rule-003',
    name: 'High Risk Override',
    condition: 'risk_score > 8 AND any_active_enrollment = true',
    action: 'escalate_to_care_manager = true, priority = "high"',
    version: 'v1.0',
    status: 'draft',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
];

// Demo steps
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
