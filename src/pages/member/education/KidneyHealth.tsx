import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'kidney-health')!;

export default function KidneyHealth() {
  return <EducationPlaceholderPage module={module} />;
}
