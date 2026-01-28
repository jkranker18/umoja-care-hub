import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { members, enrollments, programs, orders, contentPlans, cbos } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KPICard } from '@/components/shared/KPICard';
import { Users, Package, BookOpen, TrendingUp, Download, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from '@/contexts/AppContext';

export default function HealthPlanDashboard() {
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  // Calculate KPIs
  const eligibleCount = members.length;
  const enrolledCount = enrollments.length;
  const activeCount = enrollments.filter(e => e.status === 'active').length;
  const deliveredOrders = orders.filter(o => o.shipmentStatus === 'delivered').length;
  const totalOrders = orders.length;
  const onTimeRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  const completedModules = contentPlans.reduce((acc, cp) => 
    acc + cp.modules.filter(m => m.status === 'completed').length, 0
  );
  const totalModules = contentPlans.reduce((acc, cp) => acc + cp.modules.length, 0);
  const engagementRate = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Mock chart data
  const enrollmentData = [
    { month: 'Jan', enrolled: 12, active: 10 },
    { month: 'Feb', enrolled: 28, active: 22 },
    { month: 'Mar', enrolled: 50, active: 38 },
    { month: 'Apr', enrolled: 65, active: 52 },
    { month: 'May', enrolled: 80, active: 68 },
    { month: 'Jun', enrolled: 95, active: 82 },
  ];

  const shipmentData = [
    { week: 'W1', delivered: 45, exception: 2 },
    { week: 'W2', delivered: 52, exception: 3 },
    { week: 'W3', delivered: 48, exception: 1 },
    { week: 'W4', delivered: 55, exception: 4 },
  ];

  const engagementData = [
    { type: 'Videos', completed: 78, assigned: 100 },
    { type: 'Articles', completed: 45, assigned: 80 },
    { type: 'Classes', completed: 32, assigned: 60 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Blue Cross Dashboard</h1>
            <p className="text-muted-foreground">
              Program performance and population health outcomes
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
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
            trend="up"
            trendValue="+18%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Active"
            value={activeCount}
            subtitle={`${Math.round((activeCount / enrolledCount) * 100)}% of enrolled`}
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="On-time Shipments"
            value={`${onTimeRate}%`}
            trend={onTimeRate > 90 ? 'up' : 'down'}
            trendValue={onTimeRate > 90 ? '+2%' : '-3%'}
            icon={<Package className="h-5 w-5" />}
          />
          <KPICard
            title="Engagement Rate"
            value={`${engagementRate}%`}
            trend="up"
            trendValue="+5%"
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

          {/* Shipment Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shipment Performance</CardTitle>
              <CardDescription>Weekly delivery success vs exceptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shipmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Bar dataKey="delivered" fill="hsl(var(--success))" name="Delivered" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="exception" fill="hsl(var(--destructive))" name="Exceptions" radius={[4, 4, 0, 0]} />
                  </BarChart>
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
              {programs.map(prog => {
                const progEnrollments = enrollments.filter(e => e.programId === prog.id);
                const activeInProg = progEnrollments.filter(e => e.status === 'active').length;
                return (
                  <div key={prog.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{prog.name}</p>
                      <p className="text-xs text-muted-foreground">{progEnrollments.length} enrolled</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{activeInProg}</p>
                      <p className="text-xs text-muted-foreground">active</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* By CBO Partner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">By CBO Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cbos.map(cbo => {
                const cboEnrollments = enrollments.filter(e => e.sourceId === cbo.id);
                return (
                  <div key={cbo.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{cbo.name}</p>
                      <p className="text-xs text-muted-foreground">{cbo.partnerId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{cboEnrollments.length}</p>
                      <p className="text-xs text-muted-foreground">members</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Content Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {engagementData.map(item => (
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
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
