import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'diabetes-nutrition')!;

export default function DiabetesNutrition() {
  return <EducationPlaceholderPage module={module} />;
}
