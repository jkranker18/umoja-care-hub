import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/shared/KPICard';
import { Download, TrendingDown, TrendingUp, Heart, Activity, DollarSign, ThumbsUp } from 'lucide-react';
import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export default function HealthPlanOutcomes() {
  const { setCurrentRole } = useApp();

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  // Mock clinical outcomes data
  const bloodPressureData = [
    { month: 'Baseline', systolic: 148, diastolic: 92 },
    { month: 'Month 1', systolic: 142, diastolic: 88 },
    { month: 'Month 2', systolic: 138, diastolic: 85 },
    { month: 'Month 3', systolic: 134, diastolic: 82 },
    { month: 'Month 4', systolic: 130, diastolic: 80 },
    { month: 'Month 5', systolic: 128, diastolic: 78 },
    { month: 'Month 6', systolic: 126, diastolic: 76 },
  ];

  const programCompletionData = [
    { name: 'Completed', value: 68, color: 'hsl(var(--success))' },
    { name: 'In Progress', value: 24, color: 'hsl(var(--primary))' },
    { name: 'Dropped', value: 8, color: 'hsl(var(--destructive))' },
  ];

  const costSavingsData = [
    { month: 'Jan', savings: 12000 },
    { month: 'Feb', savings: 18000 },
    { month: 'Mar', savings: 25000 },
    { month: 'Apr', savings: 32000 },
    { month: 'May', savings: 41000 },
    { month: 'Jun', savings: 52000 },
  ];

  const satisfactionData = [
    { category: 'Very Satisfied', count: 42 },
    { category: 'Satisfied', count: 31 },
    { category: 'Neutral', count: 15 },
    { category: 'Dissatisfied', count: 8 },
    { category: 'Very Dissatisfied', count: 4 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Outcomes Report</h1>
            <p className="text-muted-foreground">
              Clinical outcomes, cost savings, and program effectiveness
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Clinical KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Avg BP Reduction"
            value="-22 mmHg"
            trend="down"
            trendValue="systolic"
            icon={<Heart className="h-5 w-5" />}
          />
          <KPICard
            title="Program Completion"
            value="68%"
            trend="up"
            trendValue="+12%"
            icon={<Activity className="h-5 w-5" />}
          />
          <KPICard
            title="Cost Savings (YTD)"
            value="$180K"
            trend="up"
            trendValue="+45%"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KPICard
            title="Member Satisfaction"
            value="4.2/5"
            trend="up"
            trendValue="+0.3"
            icon={<ThumbsUp className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Blood Pressure Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blood Pressure Improvement</CardTitle>
              <CardDescription>Average systolic/diastolic over program duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" domain={[60, 160]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--destructive))' }}
                      name="Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Program Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Program Completion Status</CardTitle>
              <CardDescription>Member distribution by program status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={programCompletionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {programCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cost Savings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cumulative Cost Savings</CardTitle>
              <CardDescription>Monthly estimated savings from reduced ER visits and hospitalizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}K`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Savings']}
                    />
                    <Bar 
                      dataKey="savings" 
                      fill="hsl(var(--success))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Member Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Member Satisfaction Survey</CardTitle>
              <CardDescription>Distribution of satisfaction scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={satisfactionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="category" type="category" className="text-xs" width={120} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--primary))" 
                      radius={[0, 4, 4, 0]} 
                      name="Members"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">ER Visits Avoided</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-success" />
                42% reduction vs baseline
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hospital Readmissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-success" />
                65% reduction vs baseline
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Medication Adherence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                +18% improvement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
