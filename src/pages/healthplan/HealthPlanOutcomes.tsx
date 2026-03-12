import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/components/shared/KPICard';
import { Download, DollarSign, Users, TrendingUp, Award, ChevronDown, ChevronUp, Brain, Heart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { memberClinicalData, members, enrollments, CLINICAL_SAVINGS, MemberClinicalData } from '@/lib/mockData';

export default function HealthPlanOutcomes() {
  const [membersExpanded, setMembersExpanded] = useState(false);
  const { setCurrentRole } = useApp();

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  // Calculate clinical outcomes from member data
  const clinicalOutcomes = useMemo(() => {
    // Group by member to get baseline/current pairs
    const memberDataMap = new Map<string, { baseline?: MemberClinicalData; current?: MemberClinicalData }>();
    
    memberClinicalData.forEach(data => {
      if (!memberDataMap.has(data.memberId)) {
        memberDataMap.set(data.memberId, {});
      }
      const memberData = memberDataMap.get(data.memberId)!;
      if (data.measurementType === 'baseline') {
        memberData.baseline = data;
      } else {
        memberData.current = data;
      }
    });

    // Filter to only members with both baseline and current
    const completePairs = Array.from(memberDataMap.entries())
      .filter(([_, data]) => data.baseline && data.current)
      .map(([memberId, data]) => ({
        memberId,
        baseline: data.baseline!,
        current: data.current!,
      }));

    // Calculate A1c metrics
    const a1cData = completePairs.filter(p => p.baseline.a1c && p.current.a1c);
    const a1cReductions = a1cData.map(p => p.baseline.a1c! - p.current.a1c!);
    const totalA1cReduction = a1cReductions.reduce((sum, r) => sum + r, 0);
    const a1cSavings = Math.round(totalA1cReduction * CLINICAL_SAVINGS.A1C_PER_PERCENT);

    // Calculate BP metrics
    const bpData = completePairs.filter(p => p.baseline.systolicBP && p.current.systolicBP);
    const bpControlAchieved = bpData.filter(p => p.current.systolicBP! < 130 && p.current.diastolicBP! < 80).length;
    const bpSavings = bpControlAchieved * CLINICAL_SAVINGS.BP_CONTROL_ACHIEVED;
    const avgSystolicReduction = bpData.length > 0 
      ? bpData.reduce((sum, p) => sum + (p.baseline.systolicBP! - p.current.systolicBP!), 0) / bpData.length 
      : 0;

    // Calculate BMI metrics
    const bmiData = completePairs.filter(p => p.baseline.bmi && p.current.bmi);
    const totalBmiReduction = bmiData.reduce((sum, p) => sum + (p.baseline.bmi! - p.current.bmi!), 0);
    const bmiSavings = Math.round(totalBmiReduction * CLINICAL_SAVINGS.BMI_PER_POINT);

    // Calculate Hospital Readmission metrics
    const admissionData = completePairs.filter(p => p.baseline.hospitalAdmissions !== undefined && p.current.hospitalAdmissions !== undefined);
    const totalAdmissionsAvoided = admissionData.reduce((sum, p) => sum + (p.baseline.hospitalAdmissions! - p.current.hospitalAdmissions!), 0);
    const readmissionSavings = totalAdmissionsAvoided * CLINICAL_SAVINGS.READMISSION_AVOIDED;

    // Calculate PHQ-9 metrics
    const phq9Data = completePairs.filter(p => p.baseline.phq9 !== undefined && p.current.phq9 !== undefined);
    const totalPhq9Reduction = phq9Data.reduce((sum, p) => sum + (p.baseline.phq9! - p.current.phq9!), 0);
    const phq9Savings = Math.round(totalPhq9Reduction * CLINICAL_SAVINGS.PHQ9_PER_POINT);

    // Calculate GAD-7 metrics
    const gad7Data = completePairs.filter(p => p.baseline.gad7 !== undefined && p.current.gad7 !== undefined);
    const totalGad7Reduction = gad7Data.reduce((sum, p) => sum + (p.baseline.gad7! - p.current.gad7!), 0);
    const gad7Savings = Math.round(totalGad7Reduction * CLINICAL_SAVINGS.GAD7_PER_POINT);

    // Calculate Food Insecurity metrics
    const foodInsecurityData = completePairs.filter(p => p.baseline.foodInsecurity !== undefined && p.current.foodInsecurity !== undefined);
    const foodInsecurityResolved = foodInsecurityData.filter(p => p.current.foodInsecurity! <= 1).length;
    const foodInsecuritySavings = foodInsecurityResolved * CLINICAL_SAVINGS.FOOD_INSECURITY_RESOLVED;

    // Total value
    const totalValue = a1cSavings + bpSavings + bmiSavings + readmissionSavings + phq9Savings + gad7Savings + foodInsecuritySavings;

    // Program completion rate
    const totalEnrolled = enrollments.length;
    const completed = enrollments.filter(e => e.status === 'complete').length;
    const completionRate = totalEnrolled > 0 ? Math.round((completed / totalEnrolled) * 100) : 0;

    // Avg metrics improved per member
    const avgMetricsImproved = completePairs.length > 0 
      ? (a1cData.length + bpData.length + bmiData.length + admissionData.length + phq9Data.length + gad7Data.length + foodInsecurityData.length) / completePairs.length 
      : 0;

    // Top improving members
    const topMembers = completePairs
      .map(p => {
        const member = members.find(m => m.id === p.memberId);
        const a1cDelta = (p.baseline.a1c || 0) - (p.current.a1c || 0);
        const bpDelta = (p.baseline.systolicBP || 0) - (p.current.systolicBP || 0);
        const bmiDelta = (p.baseline.bmi || 0) - (p.current.bmi || 0);
        const admitDelta = (p.baseline.hospitalAdmissions || 0) - (p.current.hospitalAdmissions || 0);
        const phq9Delta = (p.baseline.phq9 || 0) - (p.current.phq9 || 0);
        const gad7Delta = (p.baseline.gad7 || 0) - (p.current.gad7 || 0);
        
        const totalSavings = 
          a1cDelta * CLINICAL_SAVINGS.A1C_PER_PERCENT +
          (p.current.systolicBP! < 130 && p.current.diastolicBP! < 80 ? CLINICAL_SAVINGS.BP_CONTROL_ACHIEVED : 0) +
          bmiDelta * CLINICAL_SAVINGS.BMI_PER_POINT +
          admitDelta * CLINICAL_SAVINGS.READMISSION_AVOIDED +
          phq9Delta * CLINICAL_SAVINGS.PHQ9_PER_POINT +
          gad7Delta * CLINICAL_SAVINGS.GAD7_PER_POINT +
          ((p.current.foodInsecurity || 99) <= 1 ? CLINICAL_SAVINGS.FOOD_INSECURITY_RESOLVED : 0);

        return {
          memberId: p.memberId,
          name: member?.name || 'Unknown',
          a1cBaseline: p.baseline.a1c,
          a1cCurrent: p.current.a1c,
          bpBaseline: `${p.baseline.systolicBP}/${p.baseline.diastolicBP}`,
          bpCurrent: `${p.current.systolicBP}/${p.current.diastolicBP}`,
          bmiBaseline: p.baseline.bmi,
          bmiCurrent: p.current.bmi,
          admitBaseline: p.baseline.hospitalAdmissions,
          admitCurrent: p.current.hospitalAdmissions,
          phq9Baseline: p.baseline.phq9,
          phq9Current: p.current.phq9,
          gad7Baseline: p.baseline.gad7,
          gad7Current: p.current.gad7,
          totalSavings,
        };
      })
      .sort((a, b) => b.totalSavings - a.totalSavings)
      .slice(0, 10);

    return {
      totalValue,
      membersWithData: completePairs.length,
      avgMetricsImproved: Math.round(avgMetricsImproved * 10) / 10,
      completionRate,
      metrics: {
        a1c: {
          count: a1cData.length,
          avgBaseline: a1cData.length > 0 ? Math.round(a1cData.reduce((s, p) => s + p.baseline.a1c!, 0) / a1cData.length * 10) / 10 : 0,
          avgCurrent: a1cData.length > 0 ? Math.round(a1cData.reduce((s, p) => s + p.current.a1c!, 0) / a1cData.length * 10) / 10 : 0,
          avgReduction: a1cData.length > 0 ? Math.round(totalA1cReduction / a1cData.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.A1C_PER_PERCENT,
          totalSavings: a1cSavings,
        },
        bp: {
          count: bpData.length,
          avgBaseline: bpData.length > 0 ? Math.round(bpData.reduce((s, p) => s + p.baseline.systolicBP!, 0) / bpData.length) : 0,
          avgCurrent: bpData.length > 0 ? Math.round(bpData.reduce((s, p) => s + p.current.systolicBP!, 0) / bpData.length) : 0,
          avgReduction: Math.round(avgSystolicReduction),
          savingsPerUnit: CLINICAL_SAVINGS.BP_CONTROL_ACHIEVED,
          totalSavings: bpSavings,
          controlAchieved: bpControlAchieved,
        },
        bmi: {
          count: bmiData.length,
          avgBaseline: bmiData.length > 0 ? Math.round(bmiData.reduce((s, p) => s + p.baseline.bmi!, 0) / bmiData.length * 10) / 10 : 0,
          avgCurrent: bmiData.length > 0 ? Math.round(bmiData.reduce((s, p) => s + p.current.bmi!, 0) / bmiData.length * 10) / 10 : 0,
          avgReduction: bmiData.length > 0 ? Math.round(totalBmiReduction / bmiData.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.BMI_PER_POINT,
          totalSavings: bmiSavings,
        },
        readmissions: {
          count: admissionData.length,
          avgBaseline: admissionData.length > 0 ? Math.round(admissionData.reduce((s, p) => s + p.baseline.hospitalAdmissions!, 0) / admissionData.length * 10) / 10 : 0,
          avgCurrent: admissionData.length > 0 ? Math.round(admissionData.reduce((s, p) => s + p.current.hospitalAdmissions!, 0) / admissionData.length * 10) / 10 : 0,
          avgReduction: admissionData.length > 0 ? Math.round(totalAdmissionsAvoided / admissionData.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.READMISSION_AVOIDED,
          totalSavings: readmissionSavings,
          totalAvoided: totalAdmissionsAvoided,
        },
        phq9: {
          count: phq9Data.length,
          avgBaseline: phq9Data.length > 0 ? Math.round(phq9Data.reduce((s, p) => s + p.baseline.phq9!, 0) / phq9Data.length * 10) / 10 : 0,
          avgCurrent: phq9Data.length > 0 ? Math.round(phq9Data.reduce((s, p) => s + p.current.phq9!, 0) / phq9Data.length * 10) / 10 : 0,
          avgReduction: phq9Data.length > 0 ? Math.round(totalPhq9Reduction / phq9Data.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.PHQ9_PER_POINT,
          totalSavings: phq9Savings,
        },
        gad7: {
          count: gad7Data.length,
          avgBaseline: gad7Data.length > 0 ? Math.round(gad7Data.reduce((s, p) => s + p.baseline.gad7!, 0) / gad7Data.length * 10) / 10 : 0,
          avgCurrent: gad7Data.length > 0 ? Math.round(gad7Data.reduce((s, p) => s + p.current.gad7!, 0) / gad7Data.length * 10) / 10 : 0,
          avgReduction: gad7Data.length > 0 ? Math.round(totalGad7Reduction / gad7Data.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.GAD7_PER_POINT,
          totalSavings: gad7Savings,
        },
        foodInsecurity: {
          count: foodInsecurityData.length,
          avgBaseline: foodInsecurityData.length > 0 ? Math.round(foodInsecurityData.reduce((s, p) => s + p.baseline.foodInsecurity!, 0) / foodInsecurityData.length * 10) / 10 : 0,
          avgCurrent: foodInsecurityData.length > 0 ? Math.round(foodInsecurityData.reduce((s, p) => s + p.current.foodInsecurity!, 0) / foodInsecurityData.length * 10) / 10 : 0,
          avgReduction: foodInsecurityData.length > 0 ? Math.round(foodInsecurityData.reduce((s, p) => s + (p.baseline.foodInsecurity! - p.current.foodInsecurity!), 0) / foodInsecurityData.length * 10) / 10 : 0,
          savingsPerUnit: CLINICAL_SAVINGS.FOOD_INSECURITY_RESOLVED,
          totalSavings: foodInsecuritySavings,
          resolved: foodInsecurityResolved,
        },
      },
      topMembers,
    };
  }, []);

  // Chart data for clinical trends
  const clinicalTrendData = useMemo(() => {
    return [
      { month: 'Baseline', a1c: clinicalOutcomes.metrics.a1c.avgBaseline, systolicBP: clinicalOutcomes.metrics.bp.avgBaseline },
      { month: 'Month 1', a1c: clinicalOutcomes.metrics.a1c.avgBaseline - clinicalOutcomes.metrics.a1c.avgReduction * 0.25, systolicBP: clinicalOutcomes.metrics.bp.avgBaseline - clinicalOutcomes.metrics.bp.avgReduction * 0.3 },
      { month: 'Month 2', a1c: clinicalOutcomes.metrics.a1c.avgBaseline - clinicalOutcomes.metrics.a1c.avgReduction * 0.5, systolicBP: clinicalOutcomes.metrics.bp.avgBaseline - clinicalOutcomes.metrics.bp.avgReduction * 0.55 },
      { month: 'Month 3', a1c: clinicalOutcomes.metrics.a1c.avgBaseline - clinicalOutcomes.metrics.a1c.avgReduction * 0.75, systolicBP: clinicalOutcomes.metrics.bp.avgBaseline - clinicalOutcomes.metrics.bp.avgReduction * 0.8 },
      { month: 'Current', a1c: clinicalOutcomes.metrics.a1c.avgCurrent, systolicBP: clinicalOutcomes.metrics.bp.avgCurrent },
    ];
  }, [clinicalOutcomes]);

  // Chart data for value by category
  const valueByCategory = useMemo(() => {
    return [
      { name: 'Hospital Readmissions', value: clinicalOutcomes.metrics.readmissions.totalSavings, fill: 'hsl(var(--primary))' },
      { name: 'A1c Reduction', value: clinicalOutcomes.metrics.a1c.totalSavings, fill: 'hsl(var(--success))' },
      { name: 'Blood Pressure', value: clinicalOutcomes.metrics.bp.totalSavings, fill: 'hsl(var(--warning))' },
      { name: 'BMI Reduction', value: clinicalOutcomes.metrics.bmi.totalSavings, fill: 'hsl(var(--secondary))' },
      { name: 'PHQ-9 (Depression)', value: clinicalOutcomes.metrics.phq9.totalSavings, fill: 'hsl(var(--accent))' },
      { name: 'GAD-7 (Anxiety)', value: clinicalOutcomes.metrics.gad7.totalSavings, fill: 'hsl(var(--destructive))' },
      { name: 'Food Insecurity', value: clinicalOutcomes.metrics.foodInsecurity.totalSavings, fill: 'hsl(var(--muted-foreground))' },
    ].sort((a, b) => b.value - a.value);
  }, [clinicalOutcomes]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Outcomes Report</h1>
            <p className="text-muted-foreground">
              Clinical outcomes, value realization, and program effectiveness
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Executive Summary KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Value Realized"
            value={formatCurrency(clinicalOutcomes.totalValue)}
            trend="up"
            trendValue="YTD"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KPICard
            title="Members with Clinical Data"
            value={String(clinicalOutcomes.membersWithData)}
            trend="up"
            trendValue="pre/post pairs"
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="Avg Metrics Improved"
            value={`${clinicalOutcomes.avgMetricsImproved}`}
            trend="up"
            trendValue="per member"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Program Completion"
            value={`${clinicalOutcomes.completionRate}%`}
            trend="up"
            trendValue="of enrolled"
            icon={<Award className="h-5 w-5" />}
          />
        </div>

        {/* Mental Health & Social Needs Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Mental Health & Social Needs Outcomes
            </CardTitle>
            <CardDescription>Pre/post screening scores for behavioral health and social determinants</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Screening</TableHead>
                  <TableHead className="text-right">N</TableHead>
                  <TableHead className="text-right">Avg Baseline</TableHead>
                  <TableHead className="text-right">Avg Current</TableHead>
                  <TableHead className="text-right">Avg Δ</TableHead>
                  <TableHead className="text-right">$/Unit</TableHead>
                  <TableHead className="text-right">Total Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">PHQ-9 (Depression)</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.phq9.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.phq9.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.phq9.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.phq9.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.PHQ9_PER_POINT}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.phq9.totalSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">GAD-7 (Anxiety)</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.gad7.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.gad7.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.gad7.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.gad7.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.GAD7_PER_POINT}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.gad7.totalSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Food Insecurity Screening</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.foodInsecurity.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.foodInsecurity.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.foodInsecurity.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.foodInsecurity.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.FOOD_INSECURITY_RESOLVED.toLocaleString()}*</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.foodInsecurity.totalSavings)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              * Food Insecurity savings calculated per member achieving score ≤1 (resolved): {clinicalOutcomes.metrics.foodInsecurity.resolved} members
            </p>
          </CardContent>
        </Card>

        {/* Clinical Outcomes Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>Clinical Outcomes Summary</CardTitle>
            <CardDescription>Pre/post measurements and calculated value for each clinical metric</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">N</TableHead>
                  <TableHead className="text-right">Avg Baseline</TableHead>
                  <TableHead className="text-right">Avg Current</TableHead>
                  <TableHead className="text-right">Avg Δ</TableHead>
                  <TableHead className="text-right">$/Unit</TableHead>
                  <TableHead className="text-right">Total Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">A1c (%)</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.a1c.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.a1c.avgBaseline}%</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.a1c.avgCurrent}%</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.a1c.avgReduction}%</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.A1C_PER_PERCENT}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.a1c.totalSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Systolic BP (mmHg)</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bp.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bp.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bp.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.bp.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.BP_CONTROL_ACHIEVED}*</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.bp.totalSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">BMI (kg/m²)</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bmi.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bmi.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.bmi.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.bmi.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.BMI_PER_POINT}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.bmi.totalSavings)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hospital Readmissions</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.readmissions.count}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.readmissions.avgBaseline}</TableCell>
                  <TableCell className="text-right">{clinicalOutcomes.metrics.readmissions.avgCurrent}</TableCell>
                  <TableCell className="text-right text-success">-{clinicalOutcomes.metrics.readmissions.avgReduction}</TableCell>
                  <TableCell className="text-right">${CLINICAL_SAVINGS.READMISSION_AVOIDED.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(clinicalOutcomes.metrics.readmissions.totalSavings)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              * BP savings calculated per member achieving control (&lt;130/80): {clinicalOutcomes.metrics.bp.controlAchieved} members
            </p>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Clinical Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinical Improvements Over Time</CardTitle>
              <CardDescription>A1c and Blood Pressure trends from baseline through program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clinicalTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" domain={[6, 10]} label={{ value: 'A1c %', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" domain={[110, 160]} label={{ value: 'BP mmHg', angle: 90, position: 'insideRight' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }} 
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="a1c"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      name="A1c (%)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="systolicBP"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--destructive))' }}
                      name="Systolic BP"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Value by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Value Realization by Category</CardTitle>
              <CardDescription>Total savings contribution by each clinical metric</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={valueByCategory} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" tickFormatter={(value) => formatCurrency(value)} />
                    <YAxis dataKey="name" type="category" className="text-xs" width={130} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))' 
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Savings']}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[0, 4, 4, 0]}
                    >
                      {valueByCategory.map((entry, index) => (
                        <Bar key={`bar-${index}`} dataKey="value" fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Improving Members - Collapsible */}
        <Collapsible open={membersExpanded} onOpenChange={setMembersExpanded}>
          <Card>
            <CardHeader className="cursor-pointer" onClick={() => setMembersExpanded(!membersExpanded)}>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div>
                  <CardTitle className="text-lg">Top Improving Members</CardTitle>
                  <CardDescription>Individual member improvements for drill-down analysis</CardDescription>
                </div>
                {membersExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead className="text-right">A1c (Base → Curr)</TableHead>
                      <TableHead className="text-right">BP (Base → Curr)</TableHead>
                      <TableHead className="text-right">BMI (Base → Curr)</TableHead>
                      <TableHead className="text-right">Admits (Base → Curr)</TableHead>
                      <TableHead className="text-right">PHQ-9 (Base → Curr)</TableHead>
                      <TableHead className="text-right">GAD-7 (Base → Curr)</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clinicalOutcomes.topMembers.map((member) => (
                      <TableRow key={member.memberId}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell className="text-right">
                          {member.a1cBaseline} → {member.a1cCurrent}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.bpBaseline} → {member.bpCurrent}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.bmiBaseline} → {member.bmiCurrent}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.admitBaseline} → {member.admitCurrent}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.phq9Baseline} → {member.phq9Current}
                        </TableCell>
                        <TableCell className="text-right">
                          {member.gad7Baseline} → {member.gad7Current}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-success">
                          {formatCurrency(member.totalSavings)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </DashboardLayout>
  );
}