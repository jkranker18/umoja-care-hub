import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'insurance-basics')!;

export default function InsuranceBasics() {
  return <EducationPlaceholderPage module={module} />;
}
