import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'preventive-care')!;

export default function PreventiveCare() {
  return <EducationPlaceholderPage module={module} />;
}
