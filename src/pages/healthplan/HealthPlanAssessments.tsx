import { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { icons } from 'lucide-react';

import {
  ASSESSMENT_CATEGORIES,
  ASSESSMENT_MODULES,
  getAssessmentsByCategory,
  type AssessmentCategoryInfo,
  type AssessmentModule,
} from '@/lib/assessmentData';

function AssessmentCard({ assessment }: { assessment: AssessmentModule }) {
  const navigate = useNavigate();
  const IconComponent = icons[assessment.icon as keyof typeof icons];
  const sectionCount = assessment.sections.length;
  const questionCount = assessment.sections.reduce((sum, s) => sum + s.questions.length, 0);

  return (
    <div
      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => navigate(`/healthplan/assessments/${assessment.id}`)}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{assessment.title}</p>
          <p className="text-sm text-muted-foreground truncate">{assessment.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <Badge variant="secondary" className="text-xs">
          {sectionCount} sections · {questionCount} questions
        </Badge>
        {assessment.sourceLabel && (
          <Badge variant="outline" className="text-xs">{assessment.sourceLabel}</Badge>
        )}
      </div>
    </div>
  );
}

function AssessmentCategoryAccordion({
  category,
  assessments,
  defaultOpen,
}: {
  category: AssessmentCategoryInfo;
  assessments: AssessmentModule[];
  defaultOpen?: boolean;
}) {
  const IconComponent = icons[category.icon as keyof typeof icons];

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? category.id : undefined}>
      <AccordionItem value={category.id} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline py-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-3">
                <span className="font-medium">{category.title}</span>
                <span className="text-sm text-muted-foreground">
                  {assessments.length} {assessments.length === 1 ? 'assessment' : 'assessments'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4">
          <div className="space-y-2">
            {assessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function HealthPlanAssessments() {
  const { setCurrentRole } = useApp();

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Assessment Library</h1>
          <p className="text-muted-foreground">
            Standardized assessments used across all program tiers for intake, follow-up, and outcomes tracking.
          </p>
        </div>

        <div className="space-y-4">
          {ASSESSMENT_CATEGORIES.map((category, index) => {
            const assessments = getAssessmentsByCategory(category.id);
            return (
              <AssessmentCategoryAccordion
                key={category.id}
                category={category}
                assessments={assessments}
                defaultOpen={index === 0}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
