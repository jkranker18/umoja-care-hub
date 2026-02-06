import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusPill } from '@/components/shared/StatusPill';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Mail, Phone, MapPin, Users, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { healthPlans, healthPlanUsers } from '@/lib/mockData';
import { SupportDialog } from '@/components/shared/SupportDialog';

const HEALTH_PLAN_SUPPORT_OPTIONS = [
  { value: 'member_data', label: 'Member Data Inquiry' },
  { value: 'outcomes_reporting', label: 'Outcomes Reporting' },
  { value: 'contract_billing', label: 'Contract / Billing' },
  { value: 'portal_access', label: 'Portal Access' },
  { value: 'technical_support', label: 'Technical Support' },
  { value: 'other', label: 'Other' },
];

export default function HealthPlanProfile() {
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const { setCurrentRole } = useApp();

  useEffect(() => {
    setCurrentRole('healthplan');
  }, [setCurrentRole]);

  const healthPlan = healthPlans[0];
  const users = healthPlanUsers.filter(u => u.healthPlanId === healthPlan.id);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'analyst': return 'secondary';
      case 'viewer': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">Organization Profile</h1>
          <p className="text-muted-foreground">
            Manage your organization details and authorized users
          </p>
        </div>

        {/* Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {healthPlan.name}
            </CardTitle>
            <CardDescription>Plan ID: {healthPlan.planId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Primary Contact</p>
                    <p className="text-sm text-muted-foreground">{healthPlan.contactName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{healthPlan.contactEmail}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{healthPlan.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{healthPlan.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm">
                <span className="font-medium">{healthPlan.memberCount}</span>
                <span className="text-muted-foreground"> members enrolled in programs</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Authorized Users */}
        <Card>
          <CardHeader>
            <CardTitle>Authorized Users</CardTitle>
            <CardDescription>
              Staff members with access to the HCSC portal
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusPill status={user.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Support Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-semibold">Need Help?</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is here to assist you.
              </p>
            </div>
            <Button onClick={() => setSupportModalOpen(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>

        <SupportDialog
          open={supportModalOpen}
          onOpenChange={setSupportModalOpen}
          subjectOptions={HEALTH_PLAN_SUPPORT_OPTIONS}
          portalContext="Health Plan"
        />
      </div>
    </DashboardLayout>
  );
}
