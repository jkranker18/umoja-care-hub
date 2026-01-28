import { cn } from '@/lib/utils';

type StatusType = 'active' | 'inactive' | 'pending' | 'paused' | 'complete' | 'error' | 'approved' | 'denied' | 'pending_review' |
  'open' | 'in_progress' | 'resolved' | 'closed' | 'draft' | 'published' | 'connected' | 'syncing' | 'disconnected' |
  'processing' | 'shipped' | 'in_transit' | 'delivered' | 'exception' | 'assigned' | 'completed';

interface StatusPillProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: { label: 'Active', className: 'status-active' },
  inactive: { label: 'Inactive', className: 'status-paused' },
  pending: { label: 'Pending', className: 'status-pending' },
  paused: { label: 'Paused', className: 'status-paused' },
  complete: { label: 'Complete', className: 'status-complete' },
  completed: { label: 'Completed', className: 'status-complete' },
  error: { label: 'Error', className: 'status-error' },
  approved: { label: 'Approved', className: 'status-active' },
  denied: { label: 'Denied', className: 'status-error' },
  pending_review: { label: 'Pending Review', className: 'status-pending' },
  open: { label: 'Open', className: 'status-pending' },
  in_progress: { label: 'In Progress', className: 'status-active' },
  resolved: { label: 'Resolved', className: 'status-complete' },
  closed: { label: 'Closed', className: 'status-paused' },
  draft: { label: 'Draft', className: 'status-paused' },
  published: { label: 'Published', className: 'status-active' },
  connected: { label: 'Connected', className: 'status-active' },
  syncing: { label: 'Syncing', className: 'status-pending' },
  disconnected: { label: 'Disconnected', className: 'status-error' },
  processing: { label: 'Processing', className: 'status-pending' },
  shipped: { label: 'Shipped', className: 'status-active' },
  in_transit: { label: 'In Transit', className: 'status-active' },
  delivered: { label: 'Delivered', className: 'status-complete' },
  exception: { label: 'Exception', className: 'status-error' },
  assigned: { label: 'Assigned', className: 'status-pending' },
};

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status] || { label: status, className: 'status-paused' };

  return (
    <span className={cn('status-pill', config.className, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
