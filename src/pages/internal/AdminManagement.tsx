import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { cboUsers, healthPlanUsers, cbos, healthPlans } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusPill } from '@/components/shared/StatusPill';
import { UserPlus, Building2, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  organizationType: 'cbo' | 'healthplan';
  organizationId: string;
  organizationName: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

// Combine CBO and Health Plan users into a unified admin list
const portalAdmins: AdminUser[] = [
  ...cboUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    organizationType: 'cbo' as const,
    organizationId: u.cboId,
    organizationName: cbos.find(c => c.id === u.cboId)?.name || '',
    role: u.role,
    status: u.status,
    lastLogin: u.lastLogin,
  })),
  ...healthPlanUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    organizationType: 'healthplan' as const,
    organizationId: u.healthPlanId,
    organizationName: healthPlans.find(h => h.id === u.healthPlanId)?.name || '',
    role: u.role,
    status: u.status,
    lastLogin: u.lastLogin,
  })),
];

export default function AdminManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    organizationType: '' as 'cbo' | 'healthplan' | '',
    organizationId: '',
    name: '',
    email: '',
    role: '',
  });

  const cboAdmins = portalAdmins.filter(a => a.organizationType === 'cbo');
  const healthPlanAdmins = portalAdmins.filter(a => a.organizationType === 'healthplan');

  const organizations = formData.organizationType === 'cbo' 
    ? cbos 
    : formData.organizationType === 'healthplan' 
      ? healthPlans 
      : [];

  const roleOptions = formData.organizationType === 'cbo'
    ? ['admin', 'staff', 'viewer']
    : ['admin', 'analyst', 'viewer'];

  const handleSubmit = () => {
    if (!formData.organizationType || !formData.organizationId || !formData.name || !formData.email || !formData.role) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(`Administrator "${formData.name}" added successfully`);
    setDialogOpen(false);
    setFormData({
      organizationType: '',
      organizationId: '',
      name: '',
      email: '',
      role: '',
    });
  };

  const renderAdminTable = (admins: AdminUser[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Login</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map(admin => (
          <TableRow key={admin.id}>
            <TableCell className="font-medium">{admin.name}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{admin.organizationName}</TableCell>
            <TableCell>
              <span className="px-2 py-1 bg-muted rounded text-xs font-medium capitalize">
                {admin.role}
              </span>
            </TableCell>
            <TableCell>
              <StatusPill status={admin.status} />
            </TableCell>
            <TableCell className="text-muted-foreground">{admin.lastLogin || '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Admin Management</h1>
            <p className="text-muted-foreground">
              Manage administrator access for CBOs and Health Plans
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Administrator</DialogTitle>
                <DialogDescription>
                  Create a new administrator account for a CBO or Health Plan.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value: 'cbo' | 'healthplan') => 
                      setFormData({ ...formData, organizationType: value, organizationId: '', role: '' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbo">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          CBO
                        </div>
                      </SelectItem>
                      <SelectItem value="healthplan">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Health Plan
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select
                    value={formData.organizationId}
                    onValueChange={(value) => setFormData({ ...formData, organizationId: value })}
                    disabled={!formData.organizationType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations.map(org => (
                        <SelectItem key={org.id} value={org.id}>
                          {org.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@organization.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                    disabled={!formData.organizationType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(role => (
                        <SelectItem key={role} value={role} className="capitalize">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Add Admin</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="cbo" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cbo" className="gap-2">
              <Building2 className="h-4 w-4" />
              CBO Admins ({cboAdmins.length})
            </TabsTrigger>
            <TabsTrigger value="healthplan" className="gap-2">
              <Shield className="h-4 w-4" />
              Health Plan Admins ({healthPlanAdmins.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cbo">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CBO Administrators</CardTitle>
                <CardDescription>
                  Users with access to Community-Based Organization portals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderAdminTable(cboAdmins)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="healthplan">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Plan Administrators</CardTitle>
                <CardDescription>
                  Users with access to Health Plan portals
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderAdminTable(healthPlanAdmins)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
