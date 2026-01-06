import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  className,
}: KPICardProps) {
  return (
    <div className={cn('kpi-card', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-2">
          {trend === 'up' && (
            <span className="flex items-center text-success text-sm font-medium">
              <TrendingUp className="h-4 w-4 mr-1" />
              {trendValue}
            </span>
          )}
          {trend === 'down' && (
            <span className="flex items-center text-destructive text-sm font-medium">
              <TrendingDown className="h-4 w-4 mr-1" />
              {trendValue}
            </span>
          )}
          {trend === 'neutral' && (
            <span className="flex items-center text-muted-foreground text-sm font-medium">
              <Minus className="h-4 w-4 mr-1" />
              {trendValue}
            </span>
          )}
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
