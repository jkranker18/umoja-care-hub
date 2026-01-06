import { IntegrationBadge } from './IntegrationBadge';
import { cn } from '@/lib/utils';

type SourceType = 'Healthie' | 'NetSuite' | 'Salesforce' | 'Nudge';

interface SourceOfTruthProps {
  source: SourceType;
  description: string;
  lastSync?: string;
  className?: string;
}

export function SourceOfTruth({ source, description, lastSync, className }: SourceOfTruthProps) {
  return (
    <div className={cn('flex items-center gap-2 text-xs text-muted-foreground', className)}>
      <span className="flex items-center gap-1">
        <span className="text-muted-foreground">Source:</span>
        <IntegrationBadge type={source} showLabel />
      </span>
      <span className="text-muted-foreground/50">•</span>
      <span>{description}</span>
      {lastSync && (
        <>
          <span className="text-muted-foreground/50">•</span>
          <span>Synced: {lastSync}</span>
        </>
      )}
    </div>
  );
}
