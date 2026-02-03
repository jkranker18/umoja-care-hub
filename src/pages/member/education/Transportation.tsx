import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'transportation')!;

export default function Transportation() {
  return <EducationPlaceholderPage module={module} />;
}
