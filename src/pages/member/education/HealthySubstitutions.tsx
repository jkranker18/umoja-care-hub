import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'healthy-substitutions')!;

export default function HealthySubstitutions() {
  return <EducationPlaceholderPage module={module} />;
}
