import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'portion-control')!;

export default function PortionControl() {
  return <EducationPlaceholderPage module={module} />;
}
