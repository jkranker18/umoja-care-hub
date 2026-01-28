import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { members, enrollments, rulesDecisions, orders, serviceCases, programs, billingRecords } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { KPICard } from '@/components/shared/KPICard';
import { StatusPill } from '@/components/shared/StatusPill';
import { IntegrationBadge } from '@/components/shared/IntegrationBadge';
import { SourceOfTruth } from '@/components/shared/SourceOfTruth';
import { ProgramPipelineDashboard } from '@/components/internal/ProgramPipelineDashboard';
import { 
  AlertTriangle, 
  Package, 
  Shield, 
  FileWarning, 
  Play, 
  Pause, 
  RefreshCw, 
  MessageSquare,
  CheckCircle,
  Clock,
  LayoutGrid,
  Users,
  ClipboardCheck,
  CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function InternalOpsDashboard() {
  const navigate = useNavigate();
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Calculate exception counts
  const eligibilityExceptions = rulesDecisions.filter(r => r.exceptions.length > 0 || r.eligibilityResult === 'pending_review');
  const deliveryExceptions = orders.filter(o => o.shipmentStatus === 'exception');
  const highRiskMembers = members.filter(m => m.riskFlags.length >= 2);
  const missingConsents = members.filter(m => !m.consentGiven);
  const openCases = serviceCases.filter(c => c.status === 'open' || c.status === 'in_progress');

  const handleAction = (action: string, id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setProcessingId(null);
      toast.success(`Action "${action}" completed successfully`);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">Ops Cockpit</h1>
          <p className="text-muted-foreground">
            Monitor exceptions and manage operational workflows
          </p>
        </div>

        {/* Pipeline Dashboard */}
        <ProgramPipelineDashboard />

        {/* Queue Tabs */}
        <Tabs defaultValue="eligibility" className="space-y-4">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="w-full min-w-max">
              <TabsTrigger value="eligibility" className="gap-2">
                <Shield className="h-4 w-4" />
                Eligibility ({eligibilityExceptions.length})
              </TabsTrigger>
              <TabsTrigger value="delivery" className="gap-2">
                <Package className="h-4 w-4" />
                Delivery ({deliveryExceptions.length})
              </TabsTrigger>
              <TabsTrigger value="highrisk" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                High Risk ({highRiskMembers.length})
              </TabsTrigger>
              <TabsTrigger value="consents" className="gap-2">
                <FileWarning className="h-4 w-4" />
                Consents ({missingConsents.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Eligibility Exceptions */}

          {/* Eligibility Exceptions */}
          <TabsContent value="eligibility">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Eligibility Exceptions Queue</CardTitle>
                    <CardDescription>Members requiring manual eligibility review</CardDescription>
                  </div>
                  <IntegrationBadge type="NetSuite" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Rule Result</TableHead>
                      <TableHead>Exceptions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eligibilityExceptions.slice(0, 10).map(decision => {
                      const member = members.find(m => m.id === decision.memberId);
                      const enrollment = enrollments.find(e => e.id === decision.enrollmentId);
                      const program = programs.find(p => p.id === enrollment?.programId);
                      
                      return (
                        <TableRow key={decision.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{member?.name}</p>
                              <p className="text-sm text-muted-foreground">{member?.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>{program?.name || 'N/A'}</TableCell>
                          <TableCell>
                            <StatusPill status={decision.eligibilityResult} />
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {decision.exceptions.map((exc, i) => (
                                <span key={i} className="px-2 py-0.5 bg-warning/10 text-warning rounded text-xs">
                                  {exc}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Re-run eligibility', decision.id)}
                                disabled={processingId === decision.id}
                              >
                                {processingId === decision.id ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Approve', decision.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <SourceOfTruth source="NetSuite" description="Rules Engine & Eligibility" className="mt-4" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Exceptions */}
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Delivery Exceptions Queue</CardTitle>
                    <CardDescription>Shipments with delivery issues</CardDescription>
                  </div>
                  <IntegrationBadge type="NetSuite" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveryExceptions.map(order => {
                      const member = members.find(m => m.id === order.memberId);
                      
                      return (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">{order.id}</TableCell>
                          <TableCell>{member?.name}</TableCell>
                          <TableCell className="font-mono text-sm">{order.trackingNumber}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {order.deliveryExceptions?.map((exc, i) => (
                                <span key={i} className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs">
                                  {exc}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Reschedule', order.id)}
                              >
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Open case', order.id)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <SourceOfTruth source="NetSuite" description="Order Fulfillment" className="mt-4" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* High Risk Members */}
          <TabsContent value="highrisk">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High-Risk Members</CardTitle>
                <CardDescription>Members with multiple risk flags requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Risk Flags</TableHead>
                      <TableHead>Enrollment Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {highRiskMembers.slice(0, 10).map(member => {
                      const enrollment = enrollments.find(e => e.memberId === member.id);
                      
                      return (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.city}, {member.state}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{member.phone}</p>
                              <p className="text-muted-foreground">{member.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {member.riskFlags.map(flag => (
                                <span key={flag} className="px-2 py-0.5 bg-destructive/10 text-destructive rounded text-xs">
                                  {flag}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusPill status={enrollment?.status || 'pending'} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Pause benefit', member.id)}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAction('Open case', member.id)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Missing Consents */}
          <TabsContent value="consents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Missing Consents</CardTitle>
                    <CardDescription>Members who haven't provided consent</CardDescription>
                  </div>
                  <IntegrationBadge type="Healthie" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {missingConsents.slice(0, 10).map(member => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.preferredLanguage}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{member.phone}</p>
                            <p className="text-muted-foreground">{member.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{member.createdAt}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAction('Send reminder', member.id)}
                            >
                              Send Reminder
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <SourceOfTruth source="Healthie" description="Consent Management" className="mt-4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => navigate('/internal/rules')}>
            <Shield className="h-4 w-4 mr-2" />
            Rules Engine
          </Button>
          <Button variant="outline" onClick={() => navigate('/internal/campaigns')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Campaigns
          </Button>
          <Button variant="outline" onClick={() => navigate('/internal/integrations')}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Integration Status
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
