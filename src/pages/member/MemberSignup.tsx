import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { programs, Member, Enrollment } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IntegrationBadge } from '@/components/shared/IntegrationBadge';
import { SourceOfTruth } from '@/components/shared/SourceOfTruth';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Identity' },
  { id: 2, name: 'Address' },
  { id: 3, name: 'Health Information' },
  { id: 4, name: 'Consent' },
];

const chronicConditionsList = [
  'Type 2 Diabetes',
  'Hypertension (High Blood Pressure)',
  'Heart Disease',
  'Chronic Kidney Disease',
  'COPD (Chronic Obstructive Pulmonary Disease)',
  'Asthma',
  'Cancer',
  'Stroke',
  'Arthritis',
  'Obesity',
  'Depression',
  'Anxiety',
  'Alzheimer\'s/Dementia',
  'Osteoporosis',
  'Liver Disease',
];

const fdaAllergens = [
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish (e.g., crab, lobster, shrimp)',
  'Tree Nuts (e.g., almonds, walnuts, pecans)',
  'Peanuts',
  'Wheat',
  'Soybeans',
  'Sesame',
];

export default function MemberSignup() {
  const navigate = useNavigate();
  const { members, setMembers, enrollments, setEnrollments } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    preferredLanguage: 'English',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    county: '',
    healthInsuranceProvider: '',
    chronicConditions: [] as string[],
    chronicConditionsOther: '',
    dietaryPreferences: [] as string[],
    allergens: [] as string[],
    consent: false,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.consent) {
      toast.error('Please provide consent to continue.');
      return;
    }

    // Create new member
    const newMemberId = `mem-${String(members.length + 1).padStart(3, '0')}`;
    const newMember: Member = {
      id: newMemberId,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      county: formData.county,
      phone: formData.phone,
      email: formData.email,
      preferredLanguage: formData.preferredLanguage,
      consentGiven: formData.consent,
      consentDate: new Date().toISOString().split('T')[0],
      riskFlags: [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Create enrollment (program will be assigned later based on health info)
    const newEnrollment: Enrollment = {
      id: `enr-${String(enrollments.length + 1).padStart(3, '0')}`,
      memberId: newMemberId,
      programId: 'prog-001', // Default program, to be assigned during triage
      status: 'pending',
      enrollmentSource: 'Self',
      enrollmentDate: new Date().toISOString().split('T')[0],
      benefitLevel: '12 weeks',
    };

    setMembers([...members, newMember]);
    setEnrollments([...enrollments, newEnrollment]);

    toast.success('Enrollment submitted successfully!');
    navigate('/member');
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleArrayField = (field: 'chronicConditions' | 'dietaryPreferences' | 'allergens', value: string) => {
    const arr = formData[field];
    if (arr.includes(value)) {
      updateFormData(field, arr.filter(v => v !== value));
    } else {
      updateFormData(field, [...arr, value]);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">Member Intake Form</h1>
          <p className="text-muted-foreground">
            Complete your enrollment to start receiving nutritious meals.
          </p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Step {currentStep} of {steps.length}</span>
            <span className="font-medium">{steps[currentStep - 1].name}</span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} />
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Tell us about yourself.'}
              {currentStep === 2 && 'Where should we deliver your meals?'}
              {currentStep === 3 && 'Help us personalize your experience.'}
              {currentStep === 4 && 'Review and consent to participate.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Identity */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateFormData('dob', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="john@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(v) => updateFormData('preferredLanguage', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => updateFormData('zip', e.target.value)}
                      placeholder="90001"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Select
                    value={formData.county}
                    onValueChange={(v) => updateFormData('county', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="San Diego">San Diego</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 3: Health Information */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="healthInsurance">Health Insurance Provider</Label>
                  <Input
                    id="healthInsurance"
                    value={formData.healthInsuranceProvider}
                    onChange={(e) => updateFormData('healthInsuranceProvider', e.target.value)}
                    placeholder="e.g., Kaiser Permanente, Blue Shield, Medi-Cal"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chronic Conditions (select all that apply)</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {chronicConditionsList.map(condition => (
                      <label
                        key={condition}
                        className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={formData.chronicConditions.includes(condition)}
                          onCheckedChange={() => toggleArrayField('chronicConditions', condition)}
                        />
                        <span className="text-sm">{condition}</span>
                      </label>
                    ))}
                    <label
                      className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={formData.chronicConditions.includes('Other')}
                        onCheckedChange={() => toggleArrayField('chronicConditions', 'Other')}
                      />
                      <span className="text-sm">Other</span>
                    </label>
                  </div>
                  {formData.chronicConditions.includes('Other') && (
                    <Input
                      placeholder="Please specify other chronic condition(s)"
                      value={formData.chronicConditionsOther}
                      onChange={(e) => updateFormData('chronicConditionsOther', e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Dietary Preferences</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {['Vegetarian', 'Low sodium', 'Gluten-free', 'Dairy-free'].map(pref => (
                      <label
                        key={pref}
                        className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={formData.dietaryPreferences.includes(pref)}
                          onCheckedChange={() => toggleArrayField('dietaryPreferences', pref)}
                        />
                        <span className="text-sm">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>FDA Major Food Allergens</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {fdaAllergens.map(allergen => (
                      <label
                        key={allergen}
                        className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={formData.allergens.includes(allergen)}
                          onCheckedChange={() => toggleArrayField('allergens', allergen)}
                        />
                        <span className="text-sm">{allergen}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Consent */}
            {currentStep === 4 && (
              <>
                <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-3">
                  <h4 className="font-semibold">Program Participation Agreement</h4>
                  <p className="text-muted-foreground">
                    By enrolling in the Umoja Health nutrition program, I understand and agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Receive medically tailored meals and nutrition education</li>
                    <li>Share my health information with program partners for care coordination</li>
                    <li>Participate in assessments and surveys to measure outcomes</li>
                    <li>Be contacted by phone, email, or text about my program</li>
                  </ul>
                </div>

                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                  <Checkbox
                    checked={formData.consent}
                    onCheckedChange={(checked) => updateFormData('consent', checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium">I consent to participate</span>
                    <p className="text-sm text-muted-foreground">
                      I have read and agree to the terms above.
                    </p>
                  </div>
                </label>

                <SourceOfTruth source="Healthie" description="Consent Management" />
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Check className="h-4 w-4 mr-2" />
              Complete Enrollment
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
