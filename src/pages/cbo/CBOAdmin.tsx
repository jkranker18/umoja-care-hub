import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { StatusPill } from '@/components/shared/StatusPill';
import { UserPlus, Shield, CheckCircle2, Circle, ExternalLink, Users, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { toast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Registered Dietitian';
  status: 'Active' | 'Pending' | 'Training';
  securityTraining: boolean;
  hipaaTraining: boolean;
  lastLogin: string;
}

const initialAdmins: AdminUser[] = [
  {
    id: 'admin-1',
    name: 'Maria Garcia',
    email: 'maria.garcia@lafoodbank.org',
    role: 'Admin',
    status: 'Active',
    securityTraining: true,
    hipaaTraining: true,
    lastLogin: '2025-03-20',
  },
  {
    id: 'admin-2',
    name: 'Jason Kranker',
    email: 'jason.kranker@lafoodbank.org',
    role: 'Registered Dietitian',
    status: 'Active',
    securityTraining: true,
    hipaaTraining: true,
    lastLogin: '2025-03-22',
  },
  {
    id: 'admin-3',
    name: 'Sarah Chen',
    email: 'sarah.chen@lafoodbank.org',
    role: 'Admin',
    status: 'Active',
    securityTraining: true,
    hipaaTraining: true,
    lastLogin: '2025-03-18',
  },
  {
    id: 'admin-4',
    name: 'David Thompson',
    email: 'david.thompson@lafoodbank.org',
    role: 'Registered Dietitian',
    status: 'Pending',
    securityTraining: false,
    hipaaTraining: false,
    lastLogin: '-',
  },
];

const rdPortalData = [
  {
    priorityScore: 85,
    contact: 'John TestSmith',
    program: 'FFH Tier 1',
    enrollmentStatus: 'Appointment Complete',
    attemptCount: 3,
    daysUntilAuth: 12,
    daysSinceEnrollment: 45,
    assignedRD: 'Jason K.',
    outcomeStatus: 'In Progress',
    enrollmentId: 'ENR-48691',
  },
  {
    priorityScore: 42,
    contact: 'Tester HCSC Update Flow',
    program: 'FFH Tier 2',
    enrollmentStatus: 'Termed',
    attemptCount: 1,
    daysUntilAuth: 0,
    daysSinceEnrollment: 90,
    assignedRD: 'Jason K.',
    outcomeStatus: 'Closed',
    enrollmentId: 'ENR-50127',
  },
];

export default function CBOAdmin() {
  const { setCurrentRole } = useApp();
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [rdPortalOpen, setRdPortalOpen] = useState(false);
  const [trainingUserId, setTrainingUserId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Registered Dietitian'>('Admin');

  useEffect(() => {
    setCurrentRole('cbo');
  }, [setCurrentRole]);

  const handleSendInvite = () => {
    if (!inviteEmail) return;
    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}`,
      name: inviteEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      securityTraining: false,
      hipaaTraining: false,
      lastLogin: '-',
    };
    setAdmins(prev => [...prev, newAdmin]);
    setInviteEmail('');
    setInviteRole('Admin');
    setInviteOpen(false);
    toast({ title: 'Invite Sent', description: `Invitation sent to ${inviteEmail}` });
  };

  const handleCompleteSetup = (userId: string) => {
    setAdmins(prev => prev.map(a => a.id === userId ? { ...a, status: 'Training' } : a));
    setTrainingUserId(userId);
  };

  const handleCompleteTraining = (userId: string, training: 'securityTraining' | 'hipaaTraining') => {
    setAdmins(prev => {
      const updated = prev.map(a => {
        if (a.id !== userId) return a;
        const updatedUser = { ...a, [training]: true };
        if (updatedUser.securityTraining && updatedUser.hipaaTraining) {
          updatedUser.status = 'Active';
          updatedUser.lastLogin = new Date().toISOString().split('T')[0];
        }
        return updatedUser;
      });
      return updated;
    });
  };

  const trainingUser = admins.find(a => a.id === trainingUserId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Management</h1>
            <p className="text-muted-foreground">
              Manage staff access and training for LA Regional Food Bank
            </p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite New Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New Admin</DialogTitle>
                <DialogDescription>
                  Send an invitation email to add a new team member.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email Address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="name@lafoodbank.org"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as 'Admin' | 'Registered Dietitian')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Registered Dietitian">Registered Dietitian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                <Button onClick={handleSendInvite}>Send Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Training Panel */}
        {trainingUser && trainingUser.status === 'Training' && (
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Required Training — {trainingUser.name}
              </CardTitle>
              <CardDescription>
                Complete both trainings below to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                <div className="flex items-center gap-3">
                  {trainingUser.securityTraining ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Complete Security Awareness Training</p>
                    <p className="text-sm text-muted-foreground">This is done annually here in Drata</p>
                  </div>
                </div>
                {!trainingUser.securityTraining && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompleteTraining(trainingUser.id, 'securityTraining')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-background">
                <div className="flex items-center gap-3">
                  {trainingUser.hipaaTraining ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Complete HIPAA Training</p>
                    <p className="text-sm text-muted-foreground">This is done annually here in Drata</p>
                  </div>
                </div>
                {!trainingUser.hipaaTraining && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompleteTraining(trainingUser.id, 'hipaaTraining')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>

              {trainingUser.securityTraining && trainingUser.hipaaTraining && (
                <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800">All trainings complete!</p>
                  <p className="text-sm text-green-600">Account is now active.</p>
                  <Button className="mt-3" size="sm" onClick={() => setTrainingUserId(null)}>
                    Return to Admin List
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Admin Roster */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Staff Roster
            </CardTitle>
            <CardDescription>
              Authorized users who can access the CBO dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Training</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map(admin => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant={admin.role === 'Registered Dietitian' ? 'default' : 'secondary'}>
                        {admin.role === 'Registered Dietitian' ? 'RD' : 'Admin'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1" title="Security Awareness">
                          {admin.securityTraining ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-xs">SA</span>
                        </div>
                        <div className="flex items-center gap-1" title="HIPAA">
                          {admin.hipaaTraining ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-xs">HIPAA</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusPill status={admin.status === 'Active' ? 'active' : admin.status === 'Training' ? 'paused' : 'pending'} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{admin.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {admin.status === 'Pending' && (
                          <Button variant="outline" size="sm" onClick={() => handleCompleteSetup(admin.id)}>
                            Complete Setup
                          </Button>
                        )}
                        {admin.status === 'Training' && (
                          <Button variant="outline" size="sm" onClick={() => setTrainingUserId(admin.id)}>
                            Continue Training
                          </Button>
                        )}
                        {admin.role === 'Registered Dietitian' && admin.status === 'Active' && (
                          <Button variant="ghost" size="sm" onClick={() => setRdPortalOpen(true)}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            RD Portal
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RD Portal Dialog */}
        <Dialog open={rdPortalOpen} onOpenChange={setRdPortalOpen}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-lg">RD Portal — Program Enrollments — Jason's Queue</DialogTitle>
              <DialogDescription>
                Salesforce program enrollment queue
              </DialogDescription>
            </DialogHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority Score</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>FFH Program</TableHead>
                    <TableHead>Enrollment Status</TableHead>
                    <TableHead>Attempt Count</TableHead>
                    <TableHead>Days Until Auth</TableHead>
                    <TableHead>Days Since Enrollment</TableHead>
                    <TableHead>Assigned RD</TableHead>
                    <TableHead>Outcome Status</TableHead>
                    <TableHead>Program Enrollment ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rdPortalData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge variant={row.priorityScore >= 70 ? 'destructive' : 'secondary'}>
                          {row.priorityScore}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{row.contact}</TableCell>
                      <TableCell>{row.program}</TableCell>
                      <TableCell>
                        <StatusPill status={row.enrollmentStatus === 'Appointment Complete' ? 'active' : 'complete'} />
                      </TableCell>
                      <TableCell className="text-center">{row.attemptCount}</TableCell>
                      <TableCell className="text-center">{row.daysUntilAuth}</TableCell>
                      <TableCell className="text-center">{row.daysSinceEnrollment}</TableCell>
                      <TableCell>{row.assignedRD}</TableCell>
                      <TableCell>
                        <Badge variant={row.outcomeStatus === 'In Progress' ? 'default' : 'secondary'}>
                          {row.outcomeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{row.enrollmentId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
