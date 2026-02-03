import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'quick-recipes')!;

export default function QuickRecipes() {
  return <EducationPlaceholderPage module={module} />;
}
