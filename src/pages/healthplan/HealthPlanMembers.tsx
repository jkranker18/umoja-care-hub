import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusPill } from '@/components/shared/StatusPill';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { members, enrollments, programs } from '@/lib/mockData';

type RiskLevel = 'high' | 'medium' | 'low';

interface EnrichedMember {
  id: string;
  name: string;
  dob: string;
  county: string;
  program: string;
  status: string;
  riskLevel: RiskLevel;
  riskFlags: string[];
  enrollmentDate: string;
}

export default function HealthPlanMembers() {
  const { setCurrentRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  // Enrich members with enrollment data
  const enrichedMembers: EnrichedMember[] = members.map(member => {
    const enrollment = enrollments.find(e => e.memberId === member.id);
    const program = programs.find(p => p.id === enrollment?.programId);
    
    // Calculate risk level based on risk flags
    const riskLevel: RiskLevel = member.riskFlags.length >= 2 ? 'high' : 
                                  member.riskFlags.length === 1 ? 'medium' : 'low';
    
    return {
      id: member.id,
      name: member.name,
      dob: member.dob,
      county: member.county,
      program: program?.name || 'Not Enrolled',
      status: enrollment?.status || 'not_enrolled',
      riskLevel,
      riskFlags: member.riskFlags,
      enrollmentDate: enrollment?.enrollmentDate || '',
    };
  });

  // Apply filters
  const filteredMembers = enrichedMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || member.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getRiskBadgeVariant = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Member Drill Down</h1>
            <p className="text-muted-foreground">
              Search and analyze individual member data
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or member ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-full md:w-[180px]">
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
              <Select value={riskFilter} onValueChange={(v) => { setRiskFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {paginatedMembers.length} of {filteredMembers.length} members</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
              High: {enrichedMembers.filter(m => m.riskLevel === 'high').length}
            </span>
            <span className="flex items-center gap-1">
              <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full" />
              Medium: {enrichedMembers.filter(m => m.riskLevel === 'medium').length}
            </span>
            <span className="flex items-center gap-1">
              <Badge variant="outline" className="h-2 w-2 p-0 rounded-full" />
              Low: {enrichedMembers.filter(m => m.riskLevel === 'low').length}
            </span>
          </div>
        </div>

        {/* Members Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Risk Flags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMembers.map(member => (
                  <TableRow key={member.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{member.id}</TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.county}</TableCell>
                    <TableCell className="text-sm">{member.program}</TableCell>
                    <TableCell>
                      <StatusPill status={member.status as any} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(member.riskLevel)}>
                        {member.riskLevel.charAt(0).toUpperCase() + member.riskLevel.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {member.riskFlags.slice(0, 2).map((flag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                        {member.riskFlags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.riskFlags.length - 2}
                          </Badge>
                        )}
                        {member.riskFlags.length === 0 && (
                          <span className="text-muted-foreground text-xs">None</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
