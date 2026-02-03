import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'food-assistance')!;

export default function FoodAssistance() {
  return <EducationPlaceholderPage module={module} />;
}
