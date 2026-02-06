import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { members, enrollments, programs, orders, contentPlans, cbos, cohortUtilizationData } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KPICard } from '@/components/shared/KPICard';
import { Users, Package, BookOpen, TrendingUp, Download, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { useApp } from '@/contexts/AppContext';

export default function HealthPlanDashboard() {
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  // Filter data based on program selection
  const filteredData = useMemo(() => {
    const filteredEnrollments = programFilter === 'all'
      ? enrollments
      : enrollments.filter(e => e.programId === programFilter);

    const memberIds = new Set(filteredEnrollments.map(e => e.memberId));

    return {
      enrollments: filteredEnrollments,
      members: programFilter === 'all' ? members : members.filter(m => memberIds.has(m.id)),
      orders: programFilter === 'all' ? orders : orders.filter(o => memberIds.has(o.memberId)),
      contentPlans: programFilter === 'all' ? contentPlans : contentPlans.filter(cp => memberIds.has(cp.memberId)),
    };
  }, [programFilter]);

  // Date range multiplier for trend adjustments (mock implementation)
  const dateRangeMultiplier = useMemo(() => {
    switch (dateRange) {
      case '7d': return 0.25;
      case '30d': return 1;
      case '90d': return 3;
      case 'ytd': return 6;
      default: return 1;
    }
  }, [dateRange]);

  // Calculate KPIs from filtered data
  const eligibleCount = filteredData.members.length;
  const enrolledCount = filteredData.enrollments.length;
  const activeCount = filteredData.enrollments.filter(e => e.status === 'active').length;
  const deliveredOrders = filteredData.orders.filter(o => o.shipmentStatus === 'delivered').length;
  const totalOrders = filteredData.orders.length;
  const onTimeRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  const completedModules = filteredData.contentPlans.reduce((acc, cp) => 
    acc + cp.modules.filter(m => m.status === 'completed').length, 0
  );
  const totalModules = filteredData.contentPlans.reduce((acc, cp) => acc + cp.modules.length, 0);
  const engagementRate = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Generate chart data based on filtered enrollments
  const enrollmentData = useMemo(() => {
    const baseData = [
      { month: 'Jan', enrolled: 0, active: 0 },
      { month: 'Feb', enrolled: 0, active: 0 },
      { month: 'Mar', enrolled: 0, active: 0 },
      { month: 'Apr', enrolled: 0, active: 0 },
      { month: 'May', enrolled: 0, active: 0 },
      { month: 'Jun', enrolled: 0, active: 0 },
    ];

    // Distribute enrollments across months for visualization
    const totalEnrolled = filteredData.enrollments.length;
    const totalActive = filteredData.enrollments.filter(e => e.status === 'active').length;

    // Create cumulative growth pattern
    const enrolledPerMonth = totalEnrolled / 6;
    const activePerMonth = totalActive / 6;

    let cumulativeEnrolled = 0;
    let cumulativeActive = 0;

    return baseData.map((item, index) => {
      cumulativeEnrolled += enrolledPerMonth * (1 + index * 0.2);
      cumulativeActive += activePerMonth * (1 + index * 0.15);
      return {
        ...item,
        enrolled: Math.round(Math.min(cumulativeEnrolled, totalEnrolled)),
        active: Math.round(Math.min(cumulativeActive, totalActive)),
      };
    });
  }, [filteredData.enrollments]);

  // Transform cohort utilization data for Recharts multi-line chart
  const utilizationChartData = useMemo(() => {
    const periods = ['Baseline', 'Month 1', 'Month 2', 'Month 3', 'Month 4'];
    return periods.map(period => {
      const dataPoint: Record<string, string | number> = { period };
      cohortUtilizationData.forEach(cohort => {
        const periodData = cohort.utilizationData.find(d => d.period === period);
        if (periodData) {
          dataPoint[cohort.cohortName] = periodData.cost;
        }
      });
      return dataPoint;
    });
  }, []);

  // Cohort colors for the utilization chart
  const cohortColors: Record<string, string> = {
    'Oct 2024': 'hsl(var(--primary))',
    'Nov 2024': 'hsl(var(--accent))',
    'Dec 2024': 'hsl(var(--success))',
    'Jan 2025': 'hsl(210 80% 55%)', // Blue for info
  };

  // Generate engagement data based on filtered content plans
  const engagementData = useMemo(() => {
    let videos = { completed: 0, assigned: 0 };
    let articles = { completed: 0, assigned: 0 };
    let classes = { completed: 0, assigned: 0 };

    filteredData.contentPlans.forEach(cp => {
      cp.modules.forEach(module => {
        const type = module.type;
        if (type === 'video') {
          videos.assigned++;
          if (module.status === 'completed') videos.completed++;
        } else if (type === 'article') {
          articles.assigned++;
          if (module.status === 'completed') articles.completed++;
        } else if (type === 'class') {
          classes.assigned++;
          if (module.status === 'completed') classes.completed++;
        }
      });
    });

    // Ensure at least some base values for visualization
    if (videos.assigned === 0) videos = { completed: 0, assigned: 0 };
    if (articles.assigned === 0) articles = { completed: 0, assigned: 0 };
    if (classes.assigned === 0) classes = { completed: 0, assigned: 0 };

    return [
      { type: 'Videos', completed: videos.completed, assigned: videos.assigned || 1 },
      { type: 'Articles', completed: articles.completed, assigned: articles.assigned || 1 },
      { type: 'Classes', completed: classes.completed, assigned: classes.assigned || 1 },
    ].filter(item => item.assigned > 1 || item.completed > 0);
  }, [filteredData.contentPlans]);

  // Filter programs for breakdown display
  const displayedPrograms = useMemo(() => {
    if (programFilter === 'all') return programs;
    return programs.filter(p => p.id === programFilter);
  }, [programFilter]);

  // Filter CBOs based on program selection
  const filteredCboStats = useMemo(() => {
    return cbos.map(cbo => {
      const cboEnrollments = filteredData.enrollments.filter(e => e.sourceId === cbo.id);
      return {
        ...cbo,
        enrollmentCount: cboEnrollments.length,
      };
    }).filter(cbo => cbo.enrollmentCount > 0 || programFilter === 'all');
  }, [filteredData.enrollments, programFilter]);

  // Get date range label
  const dateRangeLabel = useMemo(() => {
    switch (dateRange) {
      case '7d': return 'past week';
      case '30d': return 'past 30 days';
      case '90d': return 'past 90 days';
      case 'ytd': return 'year to date';
      default: return 'past 30 days';
    }
  }, [dateRange]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">HCSC Dashboard</h1>
            <p className="text-muted-foreground">
              Program performance and population health outcomes
              {programFilter !== 'all' && (
                <span className="ml-1 text-primary font-medium">
                  • {programs.find(p => p.id === programFilter)?.name}
                </span>
              )}
              {dateRange !== '30d' && (
                <span className="ml-1 text-muted-foreground">
                  • {dateRangeLabel}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="HCSC Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">HCSC Programs</SelectItem>
                {programs.map(prog => (
                  <SelectItem key={prog.id} value={prog.id}>{prog.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[130px]">
                <CalendarDays className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="ytd">Year to date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => navigate('/healthplan/reports')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <KPICard
            title="Eligible Members"
            value={eligibleCount}
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="Enrolled"
            value={enrolledCount}
            trend={enrolledCount > 0 ? "up" : undefined}
            trendValue={enrolledCount > 0 ? `+${Math.round(18 * dateRangeMultiplier)}%` : undefined}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Active"
            value={activeCount}
            subtitle={enrolledCount > 0 ? `${Math.round((activeCount / enrolledCount) * 100)}% of enrolled` : 'No enrollments'}
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="On-time Shipments"
            value={totalOrders > 0 ? `${onTimeRate}%` : 'N/A'}
            trend={totalOrders > 0 ? (onTimeRate > 90 ? 'up' : 'down') : undefined}
            trendValue={totalOrders > 0 ? (onTimeRate > 90 ? '+2%' : '-3%') : undefined}
            icon={<Package className="h-5 w-5" />}
          />
          <KPICard
            title="Engagement Rate"
            value={totalModules > 0 ? `${engagementRate}%` : 'N/A'}
            trend={totalModules > 0 ? "up" : undefined}
            trendValue={totalModules > 0 ? `+${Math.round(5 * dateRangeMultiplier)}%` : undefined}
            icon={<BookOpen className="h-5 w-5" />}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Enrollment Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Enrollment Over Time</CardTitle>
              <CardDescription>Monthly enrolled vs active members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="enrolled"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/0.3)"
                      name="Enrolled"
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="2"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success)/0.3)"
                      name="Active"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Utilization Trends by Cohort */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Utilization Trends by Cohort</CardTitle>
              <CardDescription>Average monthly cost per member (PMPM)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={utilizationChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="period" className="text-xs" />
                    <YAxis 
                      className="text-xs" 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      domain={[0, 20000]}
                    />
                    <Tooltip 
                      position={{ y: 280 }}
                      wrapperStyle={{ 
                        left: '50%', 
                        transform: 'translateX(-50%)',
                        pointerEvents: 'none'
                      }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        padding: '8px 12px'
                      }}
                      formatter={(value: number, name: string) => {
                        const cohort = cohortUtilizationData.find(c => c.cohortName === name);
                        const baseline = cohort?.utilizationData.find(d => d.period === 'Baseline')?.cost || value;
                        const reduction = ((baseline - value) / baseline * 100).toFixed(1);
                        return [
                          `$${value.toLocaleString()} (${value < baseline ? `-${reduction}%` : 'baseline'})`,
                          `${name} (T${cohort?.tier})`
                        ];
                      }}
                    />
                    <Legend 
                      formatter={(value: string) => {
                        const cohort = cohortUtilizationData.find(c => c.cohortName === value);
                        return `${value} (T${cohort?.tier}, ${cohort?.memberCount} members)`;
                      }}
                    />
                    {cohortUtilizationData.map(cohort => (
                      <Line
                        key={cohort.id}
                        type="monotone"
                        dataKey={cohort.cohortName}
                        stroke={cohortColors[cohort.cohortName]}
                        strokeWidth={2}
                        dot={{ fill: cohortColors[cohort.cohortName], strokeWidth: 2, r: 4 }}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Program Breakdown */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* By Program */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By Program</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayedPrograms.length > 0 ? (
                displayedPrograms.map(prog => {
                  const progEnrollments = filteredData.enrollments.filter(e => e.programId === prog.id);
                  const activeInProg = progEnrollments.filter(e => e.status === 'active').length;
                  const mtmCount = progEnrollments.filter(e => e.currentPhase === 'MTM').length;
                  const mtgCount = progEnrollments.filter(e => e.currentPhase === 'MTG').length;
                  const produceCount = progEnrollments.filter(e => e.currentPhase === 'Produce').length;
                  
                  return (
                    <div key={prog.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{prog.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {progEnrollments.length} enrolled
                          {prog.tier !== 3 && ` • ${mtmCount} MTM, ${mtgCount} MTG`}
                          {prog.tier === 3 && ` • ${produceCount} Produce`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{activeInProg}</p>
                        <p className="text-xs text-muted-foreground">active</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">No programs found</p>
              )}
            </CardContent>
          </Card>

          {/* By CBO Partner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By CBO Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredCboStats.length > 0 ? (
                filteredCboStats.map(cbo => (
                  <div key={cbo.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{cbo.name}</p>
                      <p className="text-xs text-muted-foreground">{cbo.partnerId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{cbo.enrollmentCount}</p>
                      <p className="text-xs text-muted-foreground">members</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No CBO partners found for this program</p>
              )}
            </CardContent>
          </Card>

          {/* Content Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {engagementData.length > 0 ? (
                engagementData.map(item => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.type}</span>
                      <span className="font-medium">{item.completed}/{item.assigned}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${(item.completed / item.assigned) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No content data for this program</p>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
