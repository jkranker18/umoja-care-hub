import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'mindful-eating')!;

export default function MindfulEating() {
  return <EducationPlaceholderPage module={module} />;
}
