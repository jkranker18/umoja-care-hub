import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'better-sleep')!;

export default function BetterSleep() {
  return <EducationPlaceholderPage module={module} />;
}
