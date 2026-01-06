import { useApp } from '@/contexts/AppContext';
import { demoSteps } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, ChevronLeft, X, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function DemoPanel() {
  const { currentDemoStep, setCurrentDemoStep, setCurrentRole, setDemoMode } = useApp();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentStep = demoSteps.find((s) => s.step === currentDemoStep);

  const goToStep = (step: number) => {
    const targetStep = demoSteps.find((s) => s.step === step);
    if (targetStep) {
      setCurrentDemoStep(step);
      setCurrentRole(targetStep.portal);
      navigate(targetStep.path);
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsCollapsed(false)}
          className="rounded-full shadow-lg"
        >
          <Play className="h-4 w-4 mr-2" />
          Demo Guide
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-xl z-50 border-2 border-primary/20">
      <div className="p-4 border-b bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">Guided Demo</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsCollapsed(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setDemoMode(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {demoSteps.map((step) => (
            <button
              key={step.step}
              onClick={() => goToStep(step.step)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                step.step === currentDemoStep
                  ? 'bg-primary w-6'
                  : step.step < currentDemoStep
                  ? 'bg-primary/50'
                  : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Current step */}
        {currentStep && (
          <div className="text-center mb-4">
            <div className="text-xs text-muted-foreground mb-1">
              Step {currentStep.step} of {demoSteps.length}
            </div>
            <h4 className="font-semibold">{currentStep.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {currentStep.description}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={currentDemoStep === 1}
            onClick={() => goToStep(currentDemoStep - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            disabled={currentDemoStep === demoSteps.length}
            onClick={() => goToStep(currentDemoStep + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
