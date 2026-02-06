import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building2, 
  Hospital, 
  Settings, 
  RefreshCw,
  Layers,
  Brain,
  Puzzle,
  ArrowRight,
  Zap,
} from 'lucide-react';
import umojaLogo from '@/assets/umoja-food-for-health-logo.webp';

export default function Landing() {
  const navigate = useNavigate();
  const { setCurrentRole, resetDemoData, setDemoMode } = useApp();

  const enterPortal = (role: 'member' | 'cbo' | 'healthplan' | 'internal') => {
    setCurrentRole(role);
    switch (role) {
      case 'member':
        navigate('/member');
        break;
      case 'cbo':
        navigate('/cbo');
        break;
      case 'healthplan':
        navigate('/healthplan');
        break;
      case 'internal':
        navigate('/internal');
        break;
    }
  };

  const startDemo = () => {
    setDemoMode(true);
    resetDemoData();
    enterPortal('member');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img 
            src={umojaLogo} 
            alt="Umoja Food For Health" 
            className="h-10 object-contain"
          />
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={resetDemoData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Demo Data
            </Button>
            <Button size="sm" onClick={startDemo}>
              Start Guided Demo
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Platform POC
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            A reusable operating layer for{' '}
            <span className="text-gradient">nutrition-driven population health</span> programs.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Demonstrating how one unified platform serves multiple stakeholders—members, 
            community partners, health plans, and operations teams—with shared data and 
            integrated workflows.
          </p>

          {/* Portal Entry Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => enterPortal('member')}
            >
              <Users className="h-6 w-6 text-primary" />
              <span className="font-semibold">Enter as Member</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => enterPortal('cbo')}
            >
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">Enter as CBO</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => enterPortal('healthplan')}
            >
              <Hospital className="h-6 w-6 text-primary" />
              <span className="font-semibold">Enter as Health Plan</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => enterPortal('internal')}
            >
              <Settings className="h-6 w-6 text-primary" />
              <span className="font-semibold">Enter as Internal Ops</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Layers */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Three-Layer Platform Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A modular architecture that separates concerns while enabling seamless integration 
              across all stakeholders and programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Layer 1 */}
            <Card className="layer-card-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-layer-1/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-layer-1" />
                </div>
                <CardTitle className="text-lg">Layer 1: Core Infrastructure</CardTitle>
                <CardDescription>Foundation services powering all programs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-1" />
                    Member data management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-1" />
                    Rules & eligibility engine
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-1" />
                    Order & fulfillment orchestration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-1" />
                    Integration connectors
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Layer 2 */}
            <Card className="layer-card-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-layer-2/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-layer-2" />
                </div>
                <CardTitle className="text-lg">Layer 2: Clinical & Behavioral Intelligence</CardTitle>
                <CardDescription>Smart interventions & care pathways</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-2" />
                    Health assessments
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-2" />
                    SDOH risk stratification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-2" />
                    Personalized content plans
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-2" />
                    Engagement optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Layer 3 */}
            <Card className="layer-card-3">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-layer-3/10 flex items-center justify-center mb-4">
                  <Puzzle className="h-6 w-6 text-layer-3" />
                </div>
                <CardTitle className="text-lg">Layer 3: Program & Partner Extensions</CardTitle>
                <CardDescription>Flexible program configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-3" />
                    Custom program rules
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-3" />
                    Partner portals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-3" />
                    White-label experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-layer-3" />
                    Outcomes reporting
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Integration Layer</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Unified data flows across specialized systems, each serving as source of truth 
              for their domain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-healthie/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold mb-1">Healthie</h3>
              <p className="text-xs text-muted-foreground">Intake & Assessments</p>
              <div className="mt-3">
                <span className="status-pill status-active">Connected</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-netsuite/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="font-semibold mb-1">NetSuite</h3>
              <p className="text-xs text-muted-foreground">Rules & Fulfillment</p>
              <div className="mt-3">
                <span className="status-pill status-active">Connected</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-salesforce/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="font-semibold mb-1">Salesforce</h3>
              <p className="text-xs text-muted-foreground">CRM & Service</p>
              <div className="mt-3">
                <span className="status-pill status-pending">Syncing</span>
              </div>
            </Card>

            <Card className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-nudge/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold mb-1">Nudj</h3>
              <p className="text-xs text-muted-foreground">Content & Education</p>
              <div className="mt-3">
                <span className="status-pill status-active">Connected</span>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => navigate('/integrations')}>
              View Integration Details
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Umoja Health Platform POC • Demonstration Only • Mock Data</p>
        </div>
      </footer>
    </div>
  );
}
