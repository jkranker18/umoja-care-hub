import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CBOIntakeFormData {
  // Member info
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  preferredLanguage: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  
  // Living Situation (Q1-Q2)
  livingSituation: string;
  housingProblems: string[];
  
  // Food (Q3-Q4)
  foodWorry: string;
  foodDidntLast: string;
  
  // Transportation (Q5)
  transportationIssues: string;
  
  // Utilities (Q6)
  utilityThreat: string;
  
  // Safety (Q7-Q10)
  physicalHurt: string;
  insultTalkDown: string;
  threatenHarm: string;
  screamCurse: string;
  
  // Financial (Q11)
  financialStrain: string;
  
  // Employment (Q12)
  employmentHelp: string;
  
  // Support (Q13-Q14)
  dailyActivitiesHelp: string;
  loneliness: string;
  
  // Education (Q15-Q16)
  speaksOtherLanguage: string;
  wantsEducationHelp: string;
  
  // Physical Activity (Q17-Q18)
  exerciseDaysPerWeek: string;
  exerciseMinutesPerDay: string;
  
  // Substance Use (Q19-Q22)
  alcoholUse: string;
  tobaccoUse: string;
  prescriptionMisuse: string;
  illegalDrugUse: string;
  
  // Mental Health PHQ-2 (Q23-Q24)
  littleInterest: string;
  feelingDown: string;
}

const initialFormData: CBOIntakeFormData = {
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  email: '',
  preferredLanguage: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  county: '',
  livingSituation: '',
  housingProblems: [],
  foodWorry: '',
  foodDidntLast: '',
  transportationIssues: '',
  utilityThreat: '',
  physicalHurt: '',
  insultTalkDown: '',
  threatenHarm: '',
  screamCurse: '',
  financialStrain: '',
  employmentHelp: '',
  dailyActivitiesHelp: '',
  loneliness: '',
  speaksOtherLanguage: '',
  wantsEducationHelp: '',
  exerciseDaysPerWeek: '',
  exerciseMinutesPerDay: '',
  alcoholUse: '',
  tobaccoUse: '',
  prescriptionMisuse: '',
  illegalDrugUse: '',
  littleInterest: '',
  feelingDown: '',
};

const STEP_TITLES = [
  'Member Information',
  'Address',
  'Living & Food Security',
  'Transportation, Utilities & Safety',
  'Support & Wellness',
  'Review & Submit',
];

const FREQUENCY_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'fairly_often', label: 'Fairly often' },
  { value: 'frequently', label: 'Frequently' },
];

const PHQ2_OPTIONS = [
  { value: '0', label: 'Not at all' },
  { value: '1', label: 'Several days' },
  { value: '2', label: 'More than half the days' },
  { value: '3', label: 'Nearly every day' },
];

const HOUSING_PROBLEMS = [
  { value: 'pests', label: 'Pests such as bugs, ants, or mice' },
  { value: 'mold', label: 'Mold' },
  { value: 'lead', label: 'Lead paint or pipes' },
  { value: 'heat', label: 'Lack of heat' },
  { value: 'oven', label: 'Oven or stove not working' },
  { value: 'smoke_detector', label: 'Smoke detectors missing or not working' },
  { value: 'water', label: 'Water leaks' },
  { value: 'none', label: 'None of the above' },
];

export default function CBOMemberIntake() {
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CBOIntakeFormData>(initialFormData);

  useEffect(() => {
    setCurrentRole('cbo');
  }, [setCurrentRole]);

  const progress = (currentStep / 6) * 100;

  const updateField = (field: keyof CBOIntakeFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleHousingProblem = (value: string) => {
    setFormData((prev) => {
      if (value === 'none') {
        return { ...prev, housingProblems: prev.housingProblems.includes('none') ? [] : ['none'] };
      }
      const filtered = prev.housingProblems.filter((p) => p !== 'none');
      if (filtered.includes(value)) {
        return { ...prev, housingProblems: filtered.filter((p) => p !== value) };
      }
      return { ...prev, housingProblems: [...filtered, value] };
    });
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    toast({
      title: 'Member Enrolled',
      description: `${formData.firstName} ${formData.lastName} has been successfully enrolled.`,
    });
    navigate('/cbo');
  };

  const calculateRiskFlags = () => {
    const flags: string[] = [];
    
    if (formData.livingSituation && formData.livingSituation !== 'steady') {
      flags.push('Housing Instability');
    }
    if (formData.housingProblems.length > 0 && !formData.housingProblems.includes('none')) {
      flags.push('Housing Quality Issues');
    }
    if (formData.foodWorry === 'often' || formData.foodDidntLast === 'often') {
      flags.push('Food Insecurity');
    }
    if (formData.transportationIssues === 'yes') {
      flags.push('Transportation Needs');
    }
    if (formData.utilityThreat === 'yes' || formData.utilityThreat === 'already') {
      flags.push('Utility Assistance Needed');
    }
    if (['sometimes', 'fairly_often', 'frequently'].includes(formData.physicalHurt) ||
        ['sometimes', 'fairly_often', 'frequently'].includes(formData.threatenHarm)) {
      flags.push('Safety Concerns');
    }
    if (['very_hard', 'somewhat_hard'].includes(formData.financialStrain)) {
      flags.push('Financial Strain');
    }
    if (formData.employmentHelp === 'yes_interested') {
      flags.push('Employment Support');
    }
    if (['sometimes', 'fairly_often', 'frequently'].includes(formData.loneliness)) {
      flags.push('Social Isolation');
    }
    if (['daily', 'weekly'].includes(formData.alcoholUse) ||
        ['daily', 'weekly'].includes(formData.tobaccoUse) ||
        formData.prescriptionMisuse !== 'never' ||
        formData.illegalDrugUse !== 'never') {
      flags.push('Substance Use Concerns');
    }
    const phq2Score = (parseInt(formData.littleInterest) || 0) + (parseInt(formData.feelingDown) || 0);
    if (phq2Score >= 3) {
      flags.push('Mental Health Follow-up Recommended');
    }
    
    return flags;
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Enter last name"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth *</Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => updateField('dob', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="(555) 555-5555"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredLanguage">Preferred Language</Label>
        <Select value={formData.preferredLanguage} onValueChange={(v) => updateField('preferredLanguage', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="chinese">Chinese</SelectItem>
            <SelectItem value="vietnamese">Vietnamese</SelectItem>
            <SelectItem value="korean">Korean</SelectItem>
            <SelectItem value="tagalog">Tagalog</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateField('address', e.target.value)}
          placeholder="123 Main St"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            placeholder="Los Angeles"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select value={formData.state} onValueChange={(v) => updateField('state', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP Code *</Label>
          <Input
            id="zip"
            value={formData.zip}
            onChange={(e) => updateField('zip', e.target.value)}
            placeholder="90001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="county">County</Label>
          <Input
            id="county"
            value={formData.county}
            onChange={(e) => updateField('county', e.target.value)}
            placeholder="Los Angeles County"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">1. What is your living situation today?</Label>
        <RadioGroup value={formData.livingSituation} onValueChange={(v) => updateField('livingSituation', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="steady" id="living-steady" />
            <Label htmlFor="living-steady" className="font-normal">I have a steady place to live</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="worried" id="living-worried" />
            <Label htmlFor="living-worried" className="font-normal">I have a place to live today, but I am worried about losing it in the future</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unstable" id="living-unstable" />
            <Label htmlFor="living-unstable" className="font-normal">I do not have a steady place to live (staying with others, in a hotel, in a shelter, living outside, etc.)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">2. Think about the place you live. Do you have problems with any of the following? (select all that apply)</Label>
        <div className="space-y-2">
          {HOUSING_PROBLEMS.map((problem) => (
            <div key={problem.value} className="flex items-center space-x-2">
              <Checkbox
                id={`housing-${problem.value}`}
                checked={formData.housingProblems.includes(problem.value)}
                onCheckedChange={() => toggleHousingProblem(problem.value)}
              />
              <Label htmlFor={`housing-${problem.value}`} className="font-normal">{problem.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">3. Within the past 12 months, you worried that your food would run out before you got money to buy more.</Label>
        <RadioGroup value={formData.foodWorry} onValueChange={(v) => updateField('foodWorry', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="often" id="food-worry-often" />
            <Label htmlFor="food-worry-often" className="font-normal">Often true</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="food-worry-sometimes" />
            <Label htmlFor="food-worry-sometimes" className="font-normal">Sometimes true</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="food-worry-never" />
            <Label htmlFor="food-worry-never" className="font-normal">Never true</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">4. Within the past 12 months, the food you bought just didn't last and you didn't have money to get more.</Label>
        <RadioGroup value={formData.foodDidntLast} onValueChange={(v) => updateField('foodDidntLast', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="often" id="food-last-often" />
            <Label htmlFor="food-last-often" className="font-normal">Often true</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="food-last-sometimes" />
            <Label htmlFor="food-last-sometimes" className="font-normal">Sometimes true</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="food-last-never" />
            <Label htmlFor="food-last-never" className="font-normal">Never true</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">5. In the past 12 months, has lack of reliable transportation kept you from medical appointments, meetings, work, or from getting things needed for daily living?</Label>
        <RadioGroup value={formData.transportationIssues} onValueChange={(v) => updateField('transportationIssues', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="transport-yes" />
            <Label htmlFor="transport-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="transport-no" />
            <Label htmlFor="transport-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">6. In the past 12 months, has the electric, gas, oil, or water company threatened to shut off services in your home?</Label>
        <RadioGroup value={formData.utilityThreat} onValueChange={(v) => updateField('utilityThreat', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="utility-yes" />
            <Label htmlFor="utility-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="utility-no" />
            <Label htmlFor="utility-no" className="font-normal">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="already" id="utility-already" />
            <Label htmlFor="utility-already" className="font-normal">Already shut off</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-muted-foreground mb-4">Because violence and abuse happens to a lot of people and affects their health, we are asking the following questions.</p>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">7. How often does anyone, including family and friends, physically hurt you?</Label>
            <RadioGroup value={formData.physicalHurt} onValueChange={(v) => updateField('physicalHurt', v)}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`physical-${opt.value}`} />
                  <Label htmlFor={`physical-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">8. How often does anyone, including family and friends, insult or talk down to you?</Label>
            <RadioGroup value={formData.insultTalkDown} onValueChange={(v) => updateField('insultTalkDown', v)}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`insult-${opt.value}`} />
                  <Label htmlFor={`insult-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">9. How often does anyone, including family and friends, threaten you with harm?</Label>
            <RadioGroup value={formData.threatenHarm} onValueChange={(v) => updateField('threatenHarm', v)}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`threaten-${opt.value}`} />
                  <Label htmlFor={`threaten-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">10. How often does anyone, including family and friends, scream or curse at you?</Label>
            <RadioGroup value={formData.screamCurse} onValueChange={(v) => updateField('screamCurse', v)}>
              {FREQUENCY_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`scream-${opt.value}`} />
                  <Label htmlFor={`scream-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">11. How hard is it for you to pay for the very basics like food, housing, medical care, and heating?</Label>
        <RadioGroup value={formData.financialStrain} onValueChange={(v) => updateField('financialStrain', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very_hard" id="financial-very-hard" />
            <Label htmlFor="financial-very-hard" className="font-normal">Very hard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="somewhat_hard" id="financial-somewhat-hard" />
            <Label htmlFor="financial-somewhat-hard" className="font-normal">Somewhat hard</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="not_hard" id="financial-not-hard" />
            <Label htmlFor="financial-not-hard" className="font-normal">Not hard at all</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">12. Do you want help finding or keeping work or a job?</Label>
        <RadioGroup value={formData.employmentHelp} onValueChange={(v) => updateField('employmentHelp', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes_interested" id="employ-yes" />
            <Label htmlFor="employ-yes" className="font-normal">Yes, help finding work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no_employed" id="employ-no-employed" />
            <Label htmlFor="employ-no-employed" className="font-normal">No, I am currently employed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no_not_interested" id="employ-no-interested" />
            <Label htmlFor="employ-no-interested" className="font-normal">No, but I am not looking for work</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">13. If for any reason you need help with day-to-day activities such as bathing, preparing meals, shopping, managing finances, etc., do you get the help you need?</Label>
        <RadioGroup value={formData.dailyActivitiesHelp} onValueChange={(v) => updateField('dailyActivitiesHelp', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no_need" id="daily-no-need" />
            <Label htmlFor="daily-no-need" className="font-normal">I don't need any help</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="get_help" id="daily-get-help" />
            <Label htmlFor="daily-get-help" className="font-normal">I get all the help I need</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="need_more" id="daily-need-more" />
            <Label htmlFor="daily-need-more" className="font-normal">I could use a little more help</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="need_lot_more" id="daily-need-lot" />
            <Label htmlFor="daily-need-lot" className="font-normal">I need a lot more help</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">14. How often do you feel lonely or isolated from those around you?</Label>
        <RadioGroup value={formData.loneliness} onValueChange={(v) => updateField('loneliness', v)}>
          {FREQUENCY_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`lonely-${opt.value}`} />
              <Label htmlFor={`lonely-${opt.value}`} className="font-normal">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">15. Do you speak a language other than English at home?</Label>
        <RadioGroup value={formData.speaksOtherLanguage} onValueChange={(v) => updateField('speaksOtherLanguage', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="lang-yes" />
            <Label htmlFor="lang-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="lang-no" />
            <Label htmlFor="lang-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">16. Do you want help with school or training? For example, starting or completing job training or getting a high school diploma, GED, or equivalency degree.</Label>
        <RadioGroup value={formData.wantsEducationHelp} onValueChange={(v) => updateField('wantsEducationHelp', v)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="edu-yes" />
            <Label htmlFor="edu-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="edu-no" />
            <Label htmlFor="edu-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label className="text-base font-semibold">17. In the last 30 days, how many days per week did you engage in moderate physical activity?</Label>
          <Select value={formData.exerciseDaysPerWeek} onValueChange={(v) => updateField('exerciseDaysPerWeek', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((day) => (
                <SelectItem key={day} value={String(day)}>{day} {day === 1 ? 'day' : 'days'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">18. On average, how many minutes of moderate exercise did you engage in per day?</Label>
          <Select value={formData.exerciseMinutesPerDay} onValueChange={(v) => updateField('exerciseMinutesPerDay', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select minutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 minutes</SelectItem>
              <SelectItem value="10">10 minutes</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="40">40 minutes</SelectItem>
              <SelectItem value="50">50 minutes</SelectItem>
              <SelectItem value="60">60+ minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-muted-foreground mb-4">The next questions relate to substance use.</p>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">19. How many times in the past 12 months have you had 5 or more drinks in a day (males) or 4 or more drinks in a day (females)?</Label>
            <RadioGroup value={formData.alcoholUse} onValueChange={(v) => updateField('alcoholUse', v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="alcohol-never" />
                <Label htmlFor="alcohol-never" className="font-normal">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once_twice" id="alcohol-once" />
                <Label htmlFor="alcohol-once" className="font-normal">Once or twice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="alcohol-monthly" />
                <Label htmlFor="alcohol-monthly" className="font-normal">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="alcohol-weekly" />
                <Label htmlFor="alcohol-weekly" className="font-normal">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="alcohol-daily" />
                <Label htmlFor="alcohol-daily" className="font-normal">Daily or almost daily</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">20. How many times in the past 12 months have you used tobacco products?</Label>
            <RadioGroup value={formData.tobaccoUse} onValueChange={(v) => updateField('tobaccoUse', v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="tobacco-never" />
                <Label htmlFor="tobacco-never" className="font-normal">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once_twice" id="tobacco-once" />
                <Label htmlFor="tobacco-once" className="font-normal">Once or twice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="tobacco-monthly" />
                <Label htmlFor="tobacco-monthly" className="font-normal">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="tobacco-weekly" />
                <Label htmlFor="tobacco-weekly" className="font-normal">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="tobacco-daily" />
                <Label htmlFor="tobacco-daily" className="font-normal">Daily or almost daily</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">21. How many times in the past 12 months have you used prescription drugs for non-medical reasons?</Label>
            <RadioGroup value={formData.prescriptionMisuse} onValueChange={(v) => updateField('prescriptionMisuse', v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="rx-never" />
                <Label htmlFor="rx-never" className="font-normal">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once_twice" id="rx-once" />
                <Label htmlFor="rx-once" className="font-normal">Once or twice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="rx-monthly" />
                <Label htmlFor="rx-monthly" className="font-normal">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="rx-weekly" />
                <Label htmlFor="rx-weekly" className="font-normal">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="rx-daily" />
                <Label htmlFor="rx-daily" className="font-normal">Daily or almost daily</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">22. How many times in the past 12 months have you used illegal drugs?</Label>
            <RadioGroup value={formData.illegalDrugUse} onValueChange={(v) => updateField('illegalDrugUse', v)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="drug-never" />
                <Label htmlFor="drug-never" className="font-normal">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="once_twice" id="drug-once" />
                <Label htmlFor="drug-once" className="font-normal">Once or twice</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="drug-monthly" />
                <Label htmlFor="drug-monthly" className="font-normal">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="drug-weekly" />
                <Label htmlFor="drug-weekly" className="font-normal">Weekly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="drug-daily" />
                <Label htmlFor="drug-daily" className="font-normal">Daily or almost daily</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-muted-foreground mb-4">Over the past 2 weeks, how often have you been bothered by the following problems?</p>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">23. Little interest or pleasure in doing things?</Label>
            <RadioGroup value={formData.littleInterest} onValueChange={(v) => updateField('littleInterest', v)}>
              {PHQ2_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`interest-${opt.value}`} />
                  <Label htmlFor={`interest-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">24. Feeling down, depressed, or hopeless?</Label>
            <RadioGroup value={formData.feelingDown} onValueChange={(v) => updateField('feelingDown', v)}>
              {PHQ2_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`down-${opt.value}`} />
                  <Label htmlFor={`down-${opt.value}`} className="font-normal">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => {
    const riskFlags = calculateRiskFlags();
    
    return (
      <div className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Member Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}</p>
            <p><span className="text-muted-foreground">DOB:</span> {formData.dob}</p>
            <p><span className="text-muted-foreground">Phone:</span> {formData.phone || 'Not provided'}</p>
            <p><span className="text-muted-foreground">Email:</span> {formData.email || 'Not provided'}</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Address</h3>
          <p className="text-sm">
            {formData.address}<br />
            {formData.city}, {formData.state} {formData.zip}
            {formData.county && <><br />{formData.county}</>}
          </p>
        </div>

        {riskFlags.length > 0 ? (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Identified Risk Flags ({riskFlags.length})</h3>
            </div>
            <ul className="space-y-1">
              {riskFlags.map((flag, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">No Risk Flags Identified</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Screening did not identify any immediate social needs.</p>
          </div>
        )}

        <p className="text-sm text-muted-foreground">
          By clicking "Enroll Member", you confirm that this information was collected directly from the member and that they consent to enrollment in the Umoja Health program.
        </p>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep} of 6</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <CardTitle className="mt-4">{STEP_TITLES[currentStep - 1]}</CardTitle>
            <CardDescription>
              {currentStep === 6
                ? 'Review the information below and submit to enroll the member.'
                : 'Complete the fields below to continue.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={currentStep === 1 ? () => navigate('/cbo') : handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>

              {currentStep < 6 ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Check className="h-4 w-4 mr-2" />
                  Enroll Member
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
