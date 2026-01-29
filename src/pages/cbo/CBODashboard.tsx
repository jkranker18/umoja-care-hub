import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { members, enrollments, cbos, programs } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { KPICard } from '@/components/shared/KPICard';
import { StatusPill } from '@/components/shared/StatusPill';
import { Users, UserPlus, Building2, TrendingUp, Search, Filter, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function CBODashboard() {
  const navigate = useNavigate();
  const { setCurrentRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCurrentRole('cbo');
  }, [setCurrentRole]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  // Mock: using first CBO as current org
  const currentCBO = cbos[0];

  // Get enrollments for this CBO
  const cboEnrollments = enrollments.filter(e => e.sourceId === currentCBO.id);
  const cboMembers = members.filter(m => cboEnrollments.some(e => e.memberId === m.id));

  // Apply filters
  const filteredMembers = cboMembers.filter(member => {
    const enrollment = cboEnrollments.find(e => e.memberId === member.id);
    
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enrollment?.status === statusFilter;
    const matchesProgram = programFilter === 'all' || enrollment?.programId === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Calculate stats
  const activeCount = cboEnrollments.filter(e => e.status === 'active').length;
  const pendingCount = cboEnrollments.filter(e => e.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">CBO Dashboard</h1>
            <p className="text-muted-foreground">
              Manage members enrolled through {currentCBO.name}
            </p>
          </div>
          <Button onClick={() => navigate('/cbo/add-member')}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Member
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total Members"
            value={cboMembers.length}
            subtitle="Enrolled through your organization"
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="Active Enrollments"
            value={activeCount}
            trend="up"
            trendValue="+12%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Pending Review"
            value={pendingCount}
            subtitle="Awaiting eligibility"
            icon={<Building2 className="h-5 w-5" />}
          />
          <KPICard
            title="Partner ID"
            value={currentCBO.partnerId}
            subtitle={currentCBO.name}
            icon={<Building2 className="h-5 w-5" />}
          />
        </div>

        {/* Members Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <CardTitle>Member Roster</CardTitle>
                <CardDescription>
                  Members you've enrolled and their current status
                </CardDescription>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={programFilter} onValueChange={setProgramFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    {programs.map(prog => (
                      <SelectItem key={prog.id} value={prog.id}>{prog.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Shipment</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map(member => {
                  const enrollment = cboEnrollments.find(e => e.memberId === member.id);
                  const program = programs.find(p => p.id === enrollment?.programId);

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{program?.name || 'N/A'}</p>
                          {enrollment?.currentPhase && (
                            <p className="text-xs text-muted-foreground">
                              {enrollment.currentPhase} • Week {enrollment.currentWeek}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{enrollment?.enrollmentDate}</TableCell>
                      <TableCell>
                        <StatusPill status={enrollment?.status || 'pending'} />
                      </TableCell>
                      <TableCell>{enrollment?.nextShipmentDate || '-'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No members found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-semibold">Your Referral Link</h3>
              <p className="text-sm text-muted-foreground font-mono">
                https://umoja.health/enroll?partner={currentCBO.partnerId}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(`https://umoja.health/enroll?partner=${currentCBO.partnerId}`)}>
              Copy Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
