import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { icons } from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import type { ContentCategoryInfo, EducationModule, ModuleId } from '@/lib/educationData';

interface CategoryAccordionProps {
  category: ContentCategoryInfo;
  modules: EducationModule[];
  completedModules: Set<ModuleId>;
  defaultOpen?: boolean;
}

export function CategoryAccordion({ 
  category, 
  modules, 
  completedModules,
  defaultOpen = false 
}: CategoryAccordionProps) {
  const IconComponent = icons[category.icon as keyof typeof icons];
  const completedCount = modules.filter(m => completedModules.has(m.id)).length;
  const progressPercent = modules.length > 0 ? (completedCount / modules.length) * 100 : 0;

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
                  {completedCount}/{modules.length} complete
                </span>
              </div>
              <Progress value={progressPercent} className="h-1.5 mt-2 max-w-xs" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-4">
          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
          <div className="space-y-2">
            {modules.map(module => (
              <ModuleCard
                key={module.id}
                module={module}
                isComplete={completedModules.has(module.id)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
