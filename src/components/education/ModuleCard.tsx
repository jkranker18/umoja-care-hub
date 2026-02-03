import { useNavigate } from 'react-router-dom';
import { StatusPill } from '@/components/shared/StatusPill';
import { Clock } from 'lucide-react';
import { icons } from 'lucide-react';
import type { EducationModule } from '@/lib/educationData';

interface ModuleCardProps {
  module: EducationModule;
  isComplete: boolean;
  variant?: 'default' | 'featured';
}

export function ModuleCard({ module, isComplete, variant = 'default' }: ModuleCardProps) {
  const navigate = useNavigate();
  
  // Get the icon component dynamically
  const IconComponent = icons[module.icon as keyof typeof icons];
  
  const handleClick = () => {
    navigate(`/member/education/${module.id}`);
  };

  if (variant === 'featured') {
    return (
      <div 
        className="p-4 border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
        onClick={handleClick}
      >
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${isComplete ? 'bg-success/10' : 'bg-primary/10'}`}>
            {IconComponent && <IconComponent className={`h-6 w-6 ${isComplete ? 'text-success' : 'text-primary'}`} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate group-hover:text-primary transition-colors mb-1">{module.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
            {module.duration && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {module.duration}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isComplete ? 'bg-success/10' : 'bg-muted'}`}>
          {IconComponent && <IconComponent className={`h-5 w-5 ${isComplete ? 'text-success' : 'text-muted-foreground'}`} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{module.title}</p>
          <p className="text-sm text-muted-foreground truncate">{module.description}</p>
        </div>
      </div>
      <StatusPill status={isComplete ? 'completed' : 'pending'} />
    </div>
  );
}
