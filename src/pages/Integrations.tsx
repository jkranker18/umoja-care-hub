import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { integrations } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/shared/StatusPill';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Layers, RefreshCw, Eye, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Integrations() {
  const samplePayloads = {
    Healthie: {
      event: 'assessment.completed',
      member_id: 'mem-001',
      assessment_type: 'Initial Intake Assessment',
      diet_score: 65,
      sdoh_needs: ['Food Access', 'Transportation'],
      timestamp: '2024-03-20T14:32:00Z',
    },
    NetSuite: {
      event: 'rules.decision',
      member_id: 'mem-001',
      enrollment_id: 'enr-001',
      eligibility_result: 'approved',
      benefit_level: '12 weeks',
      frequency: 'weekly',
      next_shipment: '2024-04-01',
      rule_version: 'v2.3',
    },
    Salesforce: {
      event: 'campaign.touch',
      campaign_id: 'camp-001',
      member_id: 'mem-001',
      channel: 'email',
      action: 'opened',
      timestamp: '2024-03-19T10:15:00Z',
    },
    Nudge: {
      event: 'content.completed',
      member_id: 'mem-001',
      module_id: 'mod-1-1',
      module_title: 'Understanding Your Condition',
      engagement_score: 85,
      completion_time_minutes: 12,
      timestamp: '2024-03-18T16:45:00Z',
    },
  };

  const integrationDetails = {
    Healthie: {
      icon: '📋',
      color: 'bg-healthie/10 text-healthie',
      capabilities: ['Form Ingestion', 'Assessment Sync', 'Consent Management', 'Care Plan Updates'],
      sourceOf: ['Member Intake Data', 'Assessment Scores', 'Consent Records'],
    },
    NetSuite: {
      icon: '⚙️',
      color: 'bg-netsuite/10 text-netsuite',
      capabilities: ['Rules Engine', 'Eligibility Decisions', 'Order Creation', 'Fulfillment Tracking'],
      sourceOf: ['Eligibility Status', 'Benefit Levels', 'Orders & Shipments'],
    },
    Salesforce: {
      icon: '☁️',
      color: 'bg-salesforce/10 text-salesforce',
      capabilities: ['Campaign Management', 'Contact Tracking', 'Service Cases', 'Communication Logs'],
      sourceOf: ['Campaign Touches', 'Service Cases', 'Member Communications'],
    },
    Nudge: {
      icon: '📚',
      color: 'bg-nudge/10 text-nudge',
      capabilities: ['Content Assignment', 'Progress Tracking', 'Engagement Analytics', 'Prescription Plans'],
      sourceOf: ['Content Plans', 'Module Completion', 'Engagement Scores'],
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold">Integration Layer</h1>
          </div>
          <p className="text-muted-foreground">
            Unified data flows across specialized systems, each serving as source of truth for their domain.
          </p>
        </div>

        {/* Architecture Diagram */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Integration Architecture</CardTitle>
            <CardDescription>How data flows between systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative p-8 bg-muted/30 rounded-lg">
              {/* Central Platform */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full flex items-center justify-center z-10">
                <div className="text-center text-primary-foreground">
                  <div className="font-bold">Umoja</div>
                  <div className="text-xs">Platform</div>
                </div>
              </div>

              {/* Integration Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {integrations.map((integration) => {
                  const details = integrationDetails[integration.type];
                  return (
                    <div
                      key={integration.id}
                      className="p-4 bg-card border rounded-lg text-center relative"
                    >
                      <div className={`w-12 h-12 rounded-full ${details.color} flex items-center justify-center mx-auto mb-3`}>
                        <span className="text-2xl">{details.icon}</span>
                      </div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{integration.description}</p>
                      <StatusPill status={integration.status} />
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {integrations.map((integration) => {
            const details = integrationDetails[integration.type];
            const payload = samplePayloads[integration.type];

            return (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${details.color} flex items-center justify-center`}>
                        <span className="text-xl">{details.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                    <StatusPill status={integration.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Last Sync:</span>
                      <p className="font-medium">{integration.lastSync}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Records Processed:</span>
                      <p className="font-medium">{integration.recordsProcessed.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div>
                    <span className="text-sm text-muted-foreground">Capabilities:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {details.capabilities.map(cap => (
                        <span key={cap} className="px-2 py-0.5 bg-muted rounded text-xs">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Source of Truth */}
                  <div>
                    <span className="text-sm text-muted-foreground">Source of Truth for:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {details.sourceOf.map(item => (
                        <span key={item} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Sample Payload
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{integration.name} Sample Payload</DialogTitle>
                        </DialogHeader>
                        <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-xs">
                          {JSON.stringify(payload, null, 2)}
                        </pre>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data Flow Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Source of Truth Reference</CardTitle>
            <CardDescription>Which system owns what data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📋</span>
                  <span className="font-semibold">Healthie</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Intake forms</li>
                  <li>• Assessments</li>
                  <li>• Consent records</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚙️</span>
                  <span className="font-semibold">NetSuite</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Eligibility rules</li>
                  <li>• Benefit decisions</li>
                  <li>• Orders & fulfillment</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">☁️</span>
                  <span className="font-semibold">Salesforce</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Campaign touches</li>
                  <li>• Service cases</li>
                  <li>• Communications</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📚</span>
                  <span className="font-semibold">Nudge</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Content plans</li>
                  <li>• Education modules</li>
                  <li>• Engagement data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
