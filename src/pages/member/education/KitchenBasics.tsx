import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'kitchen-basics')!;

export default function KitchenBasics() {
  return <EducationPlaceholderPage module={module} />;
}
