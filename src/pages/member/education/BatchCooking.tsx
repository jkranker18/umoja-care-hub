import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'batch-cooking')!;

export default function BatchCooking() {
  return <EducationPlaceholderPage module={module} />;
}
