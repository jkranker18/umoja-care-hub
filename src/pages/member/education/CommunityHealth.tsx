import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'community-health')!;

export default function CommunityHealth() {
  return <EducationPlaceholderPage module={module} />;
}
