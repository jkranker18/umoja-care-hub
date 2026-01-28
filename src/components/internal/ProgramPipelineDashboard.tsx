import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { IntegrationBadge } from '@/components/shared/IntegrationBadge';
import { programs, enrollments, rulesDecisions, orders, billingRecords } from '@/lib/mockData';
import { Users, ClipboardCheck, Package, CreditCard, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PillarData {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  source: 'Healthie' | 'NetSuite';
  statuses: { label: string; count: number; color: string }[];
  total: number;
}

export function ProgramPipelineDashboard() {
  const [selectedProgram, setSelectedProgram] = useState<string>('all');

  const pipelineData = useMemo(() => {
    // Filter by program
    const programEnrollments = selectedProgram === 'all'
      ? enrollments
      : enrollments.filter(e => e.programId === selectedProgram);
    
    const enrollmentIds = new Set(programEnrollments.map(e => e.id));
    const memberIds = new Set(programEnrollments.map(e => e.memberId));

    // Enrollment pillar
    const enrollmentStats = {
      pending: programEnrollments.filter(e => e.status === 'pending').length,
      active: programEnrollments.filter(e => e.status === 'active').length,
      paused: programEnrollments.filter(e => e.status === 'paused').length,
      complete: programEnrollments.filter(e => e.status === 'complete').length,
    };

    // Eligibility pillar
    const filteredDecisions = rulesDecisions.filter(r => enrollmentIds.has(r.enrollmentId));
    const eligibilityStats = {
      pending_review: filteredDecisions.filter(r => r.eligibilityResult === 'pending_review').length,
      approved: filteredDecisions.filter(r => r.eligibilityResult === 'approved').length,
      denied: filteredDecisions.filter(r => r.eligibilityResult === 'denied').length,
    };

    // Fulfillment pillar
    const filteredOrders = orders.filter(o => enrollmentIds.has(o.enrollmentId));
    const fulfillmentStats = {
      processing: filteredOrders.filter(o => o.shipmentStatus === 'processing').length,
      shipped: filteredOrders.filter(o => o.shipmentStatus === 'shipped').length,
      in_transit: filteredOrders.filter(o => o.shipmentStatus === 'in_transit').length,
      delivered: filteredOrders.filter(o => o.shipmentStatus === 'delivered').length,
      exception: filteredOrders.filter(o => o.shipmentStatus === 'exception').length,
    };

    // Billing pillar
    const filteredBilling = billingRecords.filter(b => enrollmentIds.has(b.enrollmentId));
    const billingStats = {
      pending: filteredBilling.filter(b => b.status === 'pending').length,
      submitted: filteredBilling.filter(b => b.status === 'submitted').length,
      paid: filteredBilling.filter(b => b.status === 'paid').length,
      rejected: filteredBilling.filter(b => b.status === 'rejected').length,
    };

    const pillars: PillarData[] = [
      {
        title: 'Enrollment',
        icon: <Users className="h-5 w-5" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-l-blue-500',
        source: 'Healthie',
        statuses: [
          { label: 'Pending', count: enrollmentStats.pending, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Active', count: enrollmentStats.active, color: 'bg-green-100 text-green-700' },
          { label: 'Paused', count: enrollmentStats.paused, color: 'bg-orange-100 text-orange-700' },
          { label: 'Complete', count: enrollmentStats.complete, color: 'bg-blue-100 text-blue-700' },
        ],
        total: programEnrollments.length,
      },
      {
        title: 'Eligibility & Auth',
        icon: <ClipboardCheck className="h-5 w-5" />,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-l-purple-500',
        source: 'NetSuite',
        statuses: [
          { label: 'Pending Review', count: eligibilityStats.pending_review, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Approved', count: eligibilityStats.approved, color: 'bg-green-100 text-green-700' },
          { label: 'Denied', count: eligibilityStats.denied, color: 'bg-red-100 text-red-700' },
        ],
        total: filteredDecisions.length,
      },
      {
        title: 'Fulfillment',
        icon: <Package className="h-5 w-5" />,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-l-orange-500',
        source: 'NetSuite',
        statuses: [
          { label: 'Processing', count: fulfillmentStats.processing, color: 'bg-gray-100 text-gray-700' },
          { label: 'Shipped', count: fulfillmentStats.shipped, color: 'bg-blue-100 text-blue-700' },
          { label: 'In Transit', count: fulfillmentStats.in_transit, color: 'bg-indigo-100 text-indigo-700' },
          { label: 'Delivered', count: fulfillmentStats.delivered, color: 'bg-green-100 text-green-700' },
          { label: 'Exception', count: fulfillmentStats.exception, color: 'bg-red-100 text-red-700' },
        ],
        total: filteredOrders.length,
      },
      {
        title: 'Billing',
        icon: <CreditCard className="h-5 w-5" />,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-l-green-500',
        source: 'NetSuite',
        statuses: [
          { label: 'Pending', count: billingStats.pending, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Submitted', count: billingStats.submitted, color: 'bg-blue-100 text-blue-700' },
          { label: 'Paid', count: billingStats.paid, color: 'bg-green-100 text-green-700' },
          { label: 'Rejected', count: billingStats.rejected, color: 'bg-red-100 text-red-700' },
        ],
        total: filteredBilling.length,
      },
    ];

    return {
      pillars,
      totalMembers: memberIds.size,
    };
  }, [selectedProgram]);

  return (
    <div className="space-y-6">
      {/* Header with Program Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Program Pipeline</h2>
          <p className="text-sm text-muted-foreground">
            Member counts across operational pillars
          </p>
        </div>
        <Select value={selectedProgram} onValueChange={setSelectedProgram}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select program" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programs.map(program => (
              <SelectItem key={program.id} value={program.id}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pipeline Flow Indicator */}
      <div className="flex flex-wrap items-center justify-center gap-2 py-3 px-4 bg-muted/50 rounded-lg text-center">
        <span className="text-sm font-medium text-muted-foreground">Enrolled</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Authorized</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Fulfilled</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Billed</span>
      </div>

      {/* Four Pillar Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {pipelineData.pillars.map(pillar => (
          <Card key={pillar.title} className={cn('border-l-4', pillar.borderColor)}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('p-2 rounded-lg', pillar.bgColor, pillar.color)}>
                    {pillar.icon}
                  </div>
                  <CardTitle className="text-base">{pillar.title}</CardTitle>
                </div>
                <IntegrationBadge type={pillar.source} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Total Count */}
              <div className="text-center py-2 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold">{pillar.total}</p>
                <p className="text-xs text-muted-foreground">Total in phase</p>
              </div>

              {/* Status Breakdown */}
              <div className="space-y-2">
                {pillar.statuses.map(status => {
                  const percentage = pillar.total > 0 
                    ? Math.round((status.count / pillar.total) * 100) 
                    : 0;
                  
                  return (
                    <div key={status.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className={cn('px-2 py-0.5 rounded text-xs font-medium', status.color)}>
                          {status.label}
                        </span>
                        <span className="font-medium">{status.count}</span>
                      </div>
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-2xl font-bold">{pipelineData.totalMembers}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-green-600">
                {pipelineData.pillars[1].statuses.find(s => s.label === 'Approved')?.count || 0}
              </p>
              <p className="text-sm text-muted-foreground">Authorized</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-blue-600">
                {pipelineData.pillars[2].statuses.find(s => s.label === 'Delivered')?.count || 0}
              </p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-2xl font-bold text-emerald-600">
                {pipelineData.pillars[3].statuses.find(s => s.label === 'Paid')?.count || 0}
              </p>
              <p className="text-sm text-muted-foreground">Billed & Paid</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
