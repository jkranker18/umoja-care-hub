import { TimelineEvent } from '@/lib/mockData';
import { IntegrationBadge } from './IntegrationBadge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className={cn('space-y-4', className)}>
      {sortedEvents.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
            {index < sortedEvents.length - 1 && (
              <div className="w-0.5 h-full bg-border flex-1 mt-1" />
            )}
          </div>

          {/* Event content */}
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{event.eventType}</span>
              <IntegrationBadge type={event.source as any} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            <time className="text-xs text-muted-foreground mt-1 block">
              {format(new Date(event.timestamp), 'MMM d, yyyy h:mm a')}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}
