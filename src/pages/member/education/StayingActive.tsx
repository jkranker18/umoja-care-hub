import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'staying-active')!;

export default function StayingActive() {
  return <EducationPlaceholderPage module={module} />;
}
