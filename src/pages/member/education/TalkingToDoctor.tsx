import { EducationPlaceholderPage } from '@/components/education/EducationPlaceholderPage';
import { EDUCATION_MODULES } from '@/lib/educationData';

const module = EDUCATION_MODULES.find(m => m.id === 'talking-to-doctor')!;

export default function TalkingToDoctor() {
  return <EducationPlaceholderPage module={module} />;
}
