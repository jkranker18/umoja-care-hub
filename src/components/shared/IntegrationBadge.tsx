import { cn } from '@/lib/utils';

type IntegrationType = 'Healthie' | 'NetSuite' | 'Salesforce' | 'Nudge';

interface IntegrationBadgeProps {
  type: IntegrationType;
  showLabel?: boolean;
  className?: string;
}

const integrationConfig: Record<IntegrationType, { label: string; className: string; icon: string }> = {
  Healthie: {
    label: 'Healthie',
    className: 'integration-badge-healthie',
    icon: '📋',
  },
  NetSuite: {
    label: 'NetSuite',
    className: 'integration-badge-netsuite',
    icon: '⚙️',
  },
  Salesforce: {
    label: 'Salesforce',
    className: 'integration-badge-salesforce',
    icon: '☁️',
  },
  Nudge: {
    label: 'Nudge',
    className: 'integration-badge-nudge',
    icon: '📚',
  },
};

export function IntegrationBadge({ type, showLabel = true, className }: IntegrationBadgeProps) {
  const config = integrationConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
        config.className,
        className
      )}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
