import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'meal-planning')!;

export default function MealPlanning() {
  return <EducationPlaceholderPage module={module} />;
}
