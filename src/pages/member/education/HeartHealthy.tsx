import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'heart-healthy')!;

export default function HeartHealthy() {
  return <EducationPlaceholderPage module={module} />;
}
