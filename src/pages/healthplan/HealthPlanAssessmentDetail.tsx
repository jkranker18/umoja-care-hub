import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { icons } from 'lucide-react';
import { getAssessmentById, type AssessmentQuestion } from '@/lib/assessmentData';

function QuestionDisplay({ question, index }: { question: AssessmentQuestion; index: number }) {
  return (
    <div className="py-3 border-b last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="text-xs font-medium text-muted-foreground mt-0.5 shrink-0 w-5">
          {index + 1}.
        </span>
        <div className="flex-1 space-y-1.5">
          <p className="text-sm font-medium">{question.label}</p>
          {question.scaleLabel && (
            <p className="text-xs text-muted-foreground italic">{question.scaleLabel}</p>
          )}
          {question.type === 'multi-select' && question.options && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {question.options.map((opt) => (
                <Badge key={opt} variant="outline" className="text-xs font-normal">
                  {opt}
                </Badge>
              ))}
            </div>
          )}
          {question.type === 'yes-no' && (
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-normal">Yes</Badge>
              <Badge variant="outline" className="text-xs font-normal">No</Badge>
            </div>
          )}
          {question.conditionalNote && (
            <div className="flex items-start gap-2 mt-2 p-2 bg-primary/5 rounded-md text-xs text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
              <span>{question.conditionalNote}</span>
            </div>
          )}
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">
          {question.type === 'textarea' ? 'Free text' : question.type === 'rating' ? 'Scale' : question.type === 'multi-select' ? 'Multi-select' : question.type === 'yes-no' ? 'Yes/No' : question.type === 'number' ? 'Number' : 'Text'}
        </Badge>
      </div>
    </div>
  );
}

export default function HealthPlanAssessmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  const assessment = id ? getAssessmentById(id) : undefined;
  const IconComponent = assessment ? icons[assessment.icon as keyof typeof icons] : null;
  const totalQuestions = assessment?.sections.reduce((sum, s) => sum + s.questions.length, 0) ?? 0;

  if (!assessment) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Assessment not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/healthplan/assessments')}>
            Back to Assessment Library
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate('/healthplan/assessments')} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assessment Library
        </Button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">{assessment.title}</h1>
              <p className="text-muted-foreground">{assessment.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{assessment.sections.length} sections</Badge>
            <Badge variant="secondary">{totalQuestions} questions</Badge>
            {assessment.sourceLabel && (
              <Badge variant="outline">{assessment.sourceLabel}</Badge>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {assessment.sections.map((section, sIdx) => (
            <Card key={sIdx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {section.questions.map((q, qIdx) => (
                    <QuestionDisplay key={qIdx} question={q} index={qIdx} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => navigate('/healthplan/assessments')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Assessment Library
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
