import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'managing-hypertension')!;

export default function ManagingHypertension() {
  return <EducationPlaceholderPage module={module} />;
}
