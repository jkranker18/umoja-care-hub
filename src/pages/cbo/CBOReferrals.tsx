import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/shared/KPICard';
import { StatusPill } from '@/components/shared/StatusPill';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Search, Phone, Mail, ClipboardList, PhoneOff } from 'lucide-react';

type ReferralStatus = 'new' | 'contacted' | 'scheduled' | 'enrolled' | 'unable_to_reach';
type ReferralSource = 'Unite US' | 'FindHelp';

interface Referral {
  id: string;
  name: string;
  source: ReferralSource;
  referredDate: string;
  reason: string;
  phone: string;
  email: string;
  status: ReferralStatus;
}

const statusMap: Record<ReferralStatus, { pillStatus: any; label: string }> = {
  new: { pillStatus: 'pending', label: 'New' },
  contacted: { pillStatus: 'in_progress', label: 'Contacted' },
  scheduled: { pillStatus: 'scheduled', label: 'Scheduled' },
  enrolled: { pillStatus: 'complete', label: 'Enrolled' },
  unable_to_reach: { pillStatus: 'error', label: 'Unable to Reach' },
};

const initialReferrals: Referral[] = [
  { id: 'ref-001', name: 'Maria Santos', source: 'Unite US', referredDate: '2025-03-20', reason: 'Food Insecurity', phone: '(213) 555-0142', email: 'maria.s@email.com', status: 'new' },
  { id: 'ref-002', name: 'James Washington', source: 'FindHelp', referredDate: '2025-03-19', reason: 'Nutrition Support', phone: '(213) 555-0198', email: 'j.washington@email.com', status: 'new' },
  { id: 'ref-003', name: 'Anh Nguyen', source: 'Unite US', referredDate: '2025-03-18', reason: 'Food Insecurity', phone: '(323) 555-0267', email: 'anh.n@email.com', status: 'contacted' },
  { id: 'ref-004', name: 'Keisha Brown', source: 'FindHelp', referredDate: '2025-03-17', reason: 'Diabetes Management', phone: '(310) 555-0331', email: 'keisha.b@email.com', status: 'scheduled' },
  { id: 'ref-005', name: 'Roberto Alvarez', source: 'Unite US', referredDate: '2025-03-15', reason: 'Housing Instability', phone: '(213) 555-0455', email: 'r.alvarez@email.com', status: 'enrolled' },
  { id: 'ref-006', name: 'Fatima Al-Rashid', source: 'FindHelp', referredDate: '2025-03-14', reason: 'Transportation Needs', phone: '(323) 555-0512', email: 'fatima.ar@email.com', status: 'new' },
  { id: 'ref-007', name: 'David Park', source: 'Unite US', referredDate: '2025-03-12', reason: 'Food Insecurity', phone: '(310) 555-0678', email: 'd.park@email.com', status: 'unable_to_reach' },
  { id: 'ref-008', name: 'Carmen Rodriguez', source: 'FindHelp', referredDate: '2025-03-10', reason: 'Nutrition Support', phone: '(213) 555-0744', email: 'carmen.r@email.com', status: 'contacted' },
];

export default function CBOReferrals() {
  const { setCurrentRole } = useApp();
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => { setCurrentRole('cbo'); }, [setCurrentRole]);

  const updateStatus = (id: string, newStatus: ReferralStatus) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filtered = referrals.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'all' || r.source === sourceFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesSource && matchesStatus;
  });

  const newCount = referrals.filter(r => r.status === 'new').length;
  const contactedCount = referrals.filter(r => r.status === 'contacted' || r.status === 'scheduled').length;
  const enrolledCount = referrals.filter(r => r.status === 'enrolled').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Referrals</h1>
          <p className="text-muted-foreground">Inbound referrals from Unite US and FindHelp requiring outreach and AHC-HRSN screening.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard title="New Referrals" value={newCount} subtitle="Pending outreach" icon={<UserPlus className="h-5 w-5" />} />
          <KPICard title="Contacted" value={contactedCount} subtitle="In progress" icon={<Phone className="h-5 w-5" />} />
          <KPICard title="Enrolled" value={enrolledCount} subtitle="Completed screener" icon={<ClipboardList className="h-5 w-5" />} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referral Queue</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="Unite US">Unite US</SelectItem>
                  <SelectItem value="FindHelp">FindHelp</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="unable_to_reach">Unable to Reach</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Referred</TableHead>
                  <TableHead>Reason / Need</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(referral => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.name}</TableCell>
                    <TableCell>
                      <Badge variant={referral.source === 'Unite US' ? 'default' : 'secondary'} className={referral.source === 'Unite US' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}>
                        {referral.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(referral.referredDate).toLocaleDateString()}</TableCell>
                    <TableCell>{referral.reason}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground"><Phone className="h-3 w-3" />{referral.phone}</span>
                        <span className="flex items-center gap-1 text-muted-foreground"><Mail className="h-3 w-3" />{referral.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusPill status={statusMap[referral.status].pillStatus} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {(referral.status === 'new' || referral.status === 'contacted' || referral.status === 'scheduled') && (
                          <Button size="sm" onClick={() => navigate('/cbo/add-member')}>
                            Start Screener
                          </Button>
                        )}
                        {referral.status === 'new' && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(referral.id, 'contacted')}>
                              Mark Contacted
                            </Button>
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateStatus(referral.id, 'unable_to_reach')}>
                              <PhoneOff className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No referrals match your filters.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
