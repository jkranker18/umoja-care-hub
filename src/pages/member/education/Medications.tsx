import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'medications')!;

export default function Medications() {
  return <EducationPlaceholderPage module={module} />;
}
