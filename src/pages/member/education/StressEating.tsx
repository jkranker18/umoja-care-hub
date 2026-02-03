import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'stress-eating')!;

export default function StressEating() {
  return <EducationPlaceholderPage module={module} />;
}
