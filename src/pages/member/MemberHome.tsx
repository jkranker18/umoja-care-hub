import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { programs, enrollments, orders, contentPlans, assessments, getPhaseInfo } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/shared/KPICard';
import { StatusPill } from '@/components/shared/StatusPill';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, ClipboardList, MessageSquare, Heart, Utensils, BookOpen, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import { IntegrationBadge } from '@/components/shared/IntegrationBadge';
import { format, addWeeks, subWeeks } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEducationProgress, ModuleId } from '@/hooks/useEducationProgress';
import { useSupportCases } from '@/hooks/useSupportCases';
import { HealthieChatWrapper } from '@/components/healthie/HealthieChatWrapper';
import { HealthieChat } from '@/components/healthie/HealthieChat';

export default function MemberHome() {
  const { members } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { completedCount, totalModules: eduTotalModules, progressPercent, isComplete } = useEducationProgress();
  const { addCase } = useSupportCases();
  // Handle navigation state for active tab
  const initialTab = (location.state as any)?.activeTab || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Update tab when navigating back with state
  useEffect(() => {
    if ((location.state as any)?.activeTab) {
      setActiveTab((location.state as any).activeTab);
    }
  }, [location.state]);
  
  // Mock: using first member as current user
  const member = members[0];
  const enrollment = enrollments.find(e => e.memberId === member?.id && e.status === 'active');
  const program = programs.find(p => p.id === enrollment?.programId);
  const memberOrders = orders.filter(o => o.memberId === member?.id);
  const contentPlan = contentPlans.find(cp => cp.memberId === member?.id);
  const assessment = assessments.find(a => a.memberId === member?.id);

  // Calculate the dynamic next shipment based on actual order data
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day for comparison

  // Demo allergens and chronic conditions
  const allergens = ['Eggs', 'Soy', 'Shellfish'];
  const chronicConditions = ['Hypertension'];

  // Issue reporting modal state
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [issueType, setIssueType] = useState<string>('');
  const [issueDetails, setIssueDetails] = useState('');

  // Contact Support modal state
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportSubject, setSupportSubject] = useState<string>('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportCaseNumber, setSupportCaseNumber] = useState('');
  const [reportedOrders, setReportedOrders] = useState<Set<string>>(new Set());

  // Get phase info for the current member
  const phaseInfo = program ? getPhaseInfo(program, enrollment?.currentWeek || 1) : null;

  // Demo orders - 12 total: 3 delivered, 1 in transit, 8 upcoming (fixed dates for consistent demo)
  // Helper function to get the meal plan label based on week number
  const getMealPlanLabelForWeek = (weekNumber: number): string => {
    if (!program) return 'Medically Tailored Meals';
    if (program.tier === 3) return 'Produce Box (15 lbs)';
    
    // For Tier 1: MTM weeks 1-8, MTG weeks 9-12
    // For Tier 2: MTM weeks 1-4, MTG weeks 5-12
    const mtmWeeks = program.mtmWeeks;
    
    if (weekNumber <= mtmWeeks) {
      return 'Medically Tailored Meals (MTM)';
    } else {
      return 'Medically Tailored Groceries (MTG)';
    }
  };

  const orderDates = [
    'Jan 6, 2025', 'Jan 13, 2025', 'Jan 20, 2025', 'Jan 27, 2025',
    'Feb 3, 2025', 'Feb 10, 2025', 'Feb 17, 2025', 'Feb 24, 2025',
    'Mar 3, 2025', 'Mar 10, 2025', 'Mar 17, 2025', 'Mar 24, 2025'
  ];

  const demoOrders = Array.from({ length: 12 }, (_, index) => {
    const weekNumber = index + 1;
    const isDelivered = weekNumber <= 3;
    const isInTransit = weekNumber === 4;
    
    return {
      id: `ORD-${String(weekNumber).padStart(3, '0')}`,
      memberId: member?.id,
      weekNumber,
      mealPlan: getMealPlanLabelForWeek(weekNumber),
      mealsCount: program?.tier === 3 ? 0 : 14,
      shipmentStatus: isDelivered ? 'delivered' as const : isInTransit ? 'in_transit' as const : 'processing' as const,
      trackingNumber: `TRK-883452${weekNumber}`,
      estimatedDelivery: orderDates[index],
    };
  });

  // Find the next shipment: prioritize in-transit that hasn't passed, then processing
  const nextShipment = demoOrders.find(order => {
    if (order.shipmentStatus === 'in_transit') {
      const deliveryDate = new Date(order.estimatedDelivery);
      deliveryDate.setHours(0, 0, 0, 0);
      return deliveryDate >= today;
    }
    return false;
  }) || demoOrders.find(order => order.shipmentStatus === 'processing');

  const nextShipmentDate = nextShipment ? new Date(nextShipment.estimatedDelivery) : addWeeks(new Date(), 2);
  const nextShipmentStatus = nextShipment?.shipmentStatus === 'in_transit' ? 'In Transit' : 'Scheduled';

  // Get representative orders for overview: last delivered, in transit, next to ship
  const lastDelivered = demoOrders.filter(o => o.shipmentStatus === 'delivered').slice(-1)[0];
  const inTransit = demoOrders.find(o => o.shipmentStatus === 'in_transit');
  const nextToShip = demoOrders.find(o => o.shipmentStatus === 'processing');
  const displayOrders = [lastDelivered, inTransit, nextToShip].filter(Boolean);

  const handleReportIssue = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIssueType('');
    setIssueDetails('');
    setIssueModalOpen(true);
  };

  const handleSubmitIssue = () => {
    if (selectedOrderId) {
      setReportedOrders(prev => new Set(prev).add(selectedOrderId));
    }
    setIssueModalOpen(false);
    setSelectedOrderId(null);
    setIssueType('');
    setIssueDetails('');
  };

  const handleOpenSupportModal = () => {
    setSupportSubject('');
    setSupportMessage('');
    setSupportSubmitting(false);
    setSupportSubmitted(false);
    setSupportCaseNumber('');
    setSupportModalOpen(true);
  };

  const handleSupportSubmit = () => {
    setSupportSubmitting(true);
    // Simulate Salesforce API call
    setTimeout(() => {
      const caseNum = `SF-${Math.floor(100000 + Math.random() * 900000)}`;
      // Save case to shared state
      addCase({
        caseNumber: caseNum,
        subject: supportSubject,
        message: supportMessage,
      });
      setSupportCaseNumber(caseNum);
      setSupportSubmitting(false);
      setSupportSubmitted(true);
    }, 2000);
  };

  const handleSupportModalClose = (open: boolean) => {
    if (!open) {
      setSupportModalOpen(false);
      // Reset state after close animation
      setTimeout(() => {
        setSupportSubject('');
        setSupportMessage('');
        setSupportSubmitting(false);
        setSupportSubmitted(false);
        setSupportCaseNumber('');
      }, 200);
    }
  };

  const handleEducationClick = () => setActiveTab('content');

  return (
    <DashboardLayout 
      onEducationClick={handleEducationClick}
      onMemberTabChange={setActiveTab}
      activeMemberTab={activeTab}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-display font-bold">Welcome back, {member?.firstName}!</h1>
          <p className="text-muted-foreground">
            Here's your program status and upcoming activities.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Program Tier"
            value={program?.tier ? `Tier ${program.tier}` : 'Pending'}
            subtitle={program?.riskLevel ? `${program.riskLevel.charAt(0).toUpperCase() + program.riskLevel.slice(1)} Risk` : ''}
            icon={<Heart className="h-5 w-5" />}
          />
          <KPICard
            title="Next Shipment"
            value={format(nextShipmentDate, 'MMM d')}
            subtitle={nextShipmentStatus}
            icon={<Package className="h-5 w-5" />}
          />
          <KPICard
            title="Current Phase"
            value={phaseInfo?.phase === 'MTM' ? 'Meals' : phaseInfo?.phase === 'MTG' ? 'Groceries' : phaseInfo?.phase || 'Meals'}
            subtitle={phaseInfo ? `Week ${phaseInfo.phaseWeek} of ${phaseInfo.phaseTotal} • ${program?.tier === 3 ? '15 lbs produce' : '14 meals/week'}` : ''}
            icon={<Utensils className="h-5 w-5" />}
          />
          <KPICard
            title="Content Progress"
            value={`${completedCount}/${eduTotalModules}`}
            subtitle="Modules completed"
            icon={<BookOpen className="h-5 w-5" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="w-full min-w-max">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="plan">My Program</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="content">Education</TabsTrigger>
              <TabsTrigger value="coach">Health Coach</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Current Program */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Current Program</CardTitle>
                    <StatusPill status={enrollment?.status || 'pending'} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div>
                    <h3 className="font-semibold">{program?.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{program?.description}</p>
                  </div>
                  
                  {/* Phase Progress */}
                  {program && phaseInfo && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Phase Progress</span>
                        <span className="font-medium">Week {enrollment?.currentWeek} of 12</span>
                      </div>
                      {program.tier !== 3 ? (
                        <div className="flex gap-1">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className={enrollment?.currentPhase === 'MTM' ? 'font-medium text-primary' : 'text-muted-foreground'}>
                                MTM (Weeks 1-{program.mtmWeeks})
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all" 
                                style={{ 
                                  width: `${Math.min(100, ((enrollment?.currentWeek || 1) / program.mtmWeeks) * 100)}%` 
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className={enrollment?.currentPhase === 'MTG' ? 'font-medium text-primary' : 'text-muted-foreground'}>
                                MTG (Weeks {program.mtmWeeks + 1}-12)
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all" 
                                style={{ 
                                  width: `${Math.max(0, (((enrollment?.currentWeek || 1) - program.mtmWeeks) / program.mtgWeeks) * 100)}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-primary">Produce Box (Bi-weekly)</span>
                            <span className="text-muted-foreground">Distribution {phaseInfo.phaseWeek} of 6</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all" 
                              style={{ width: `${(phaseInfo.phaseWeek / 6) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Enrolled</span>
                      <p className="font-medium">{enrollment?.enrollmentDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Frequency</span>
                      <p className="font-medium">{program?.tier === 3 ? 'Bi-weekly' : 'Weekly'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Duration</span>
                      <p className="font-medium">{program?.duration || '12 weeks'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Assessment */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Latest Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {assessment ? (
                    <>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-muted-foreground text-xs">Type</span>
                          <p className="font-medium text-sm">{assessment.type}</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div>
                          <span className="text-muted-foreground text-xs">Allergens</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {allergens.map(allergen => (
                              <Badge key={allergen} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                                {allergen}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">Tailored For</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {chronicConditions.map(condition => (
                              <Badge key={condition} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No assessments completed yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('orders')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {displayOrders.length > 0 ? (
                  <div className="space-y-3">
                    {displayOrders.map(order => order && (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{order.mealPlan}</p>
                            <p className="text-xs text-muted-foreground">{order.mealsCount} meals • {order.trackingNumber}</p>
                          </div>
                        </div>
                        <StatusPill status={order.shipmentStatus} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">No orders yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            <Card>
              <CardHeader>
                <CardTitle>My Program</CardTitle>
                <CardDescription>Your personalized nutrition plan based on your health goals.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2">{phaseInfo?.phaseName || 'Medically Tailored Meals'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {program?.tier === 3 
                        ? 'Fresh produce boxes delivered bi-weekly to support diet quality improvement and inflammation reduction through increased plant-based intake. Each box contains 15 lbs of fresh fruits and vegetables.'
                        : phaseInfo?.phase === 'MTM'
                          ? 'Fully prepared, heat-and-eat meals designed for your specific health conditions. Each delivery includes 14 medically tailored meals with balanced macronutrients.'
                          : 'Transition to cooking with medically tailored groceries. Each delivery includes ingredients and recipes for 14 meals, helping you build sustainable healthy eating habits.'
                      }
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground">
                        {program?.tier === 3 ? 'Produce Weight' : 'Weekly Meals'}
                      </h4>
                      <p className="text-2xl font-bold">{program?.tier === 3 ? '15 lbs' : '14'}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground">Deliveries Remaining</h4>
                      <p className="text-2xl font-bold">{12 - (enrollment?.currentWeek || 1)}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground">Next Delivery</h4>
                      <p className="text-2xl font-bold">{format(nextShipmentDate, 'MMM d')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track all your meal shipments. {demoOrders.length} total orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demoOrders.map(order => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            <span className="text-muted-foreground">Week {order.weekNumber}</span> • {order.mealPlan}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {program?.tier === 3 ? '15 lbs produce' : `${order.mealsCount} meals`} • Order #{order.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        {order.shipmentStatus === 'delivered' && (
                          reportedOrders.has(order.id) ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled
                              className="text-muted-foreground border-muted"
                            >
                              Issue Reported
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleReportIssue(order.id)}
                              className="text-muted-foreground border-muted hover:bg-muted/50"
                            >
                              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                              Report Issue
                            </Button>
                          )
                        )}
                        <div className="text-right">
                          <StatusPill status={order.shipmentStatus} />
                          <p className="text-xs text-muted-foreground mt-1">
                            {order.shipmentStatus === 'delivered' ? 'Delivered' : 'Est.'} {order.estimatedDelivery}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Education Plan</CardTitle>
                <CardDescription>Your personalized learning modules.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">{completedCount} of {eduTotalModules} complete</span>
                  </div>
                  <Progress value={progressPercent} />
                </div>
                <div className="space-y-3">
                  <div 
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate('/member/education/general-nutrition')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete('general-nutrition') ? 'bg-success/10' : 'bg-muted'}`}>
                        <BookOpen className={`h-5 w-5 ${isComplete('general-nutrition') ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-medium">General Nutrition</p>
                        <p className="text-sm text-muted-foreground">What Your Body Needs to Stay Healthy</p>
                      </div>
                    </div>
                    <StatusPill status={isComplete('general-nutrition') ? 'completed' : 'pending'} />
                  </div>
                  
                  <div 
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate('/member/education/reading-nutrition-label')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete('reading-nutrition-label') ? 'bg-success/10' : 'bg-muted'}`}>
                        <BookOpen className={`h-5 w-5 ${isComplete('reading-nutrition-label') ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Reading a Nutrition Label</p>
                        <p className="text-sm text-muted-foreground">Learn to make healthier food choices</p>
                      </div>
                    </div>
                    <StatusPill status={isComplete('reading-nutrition-label') ? 'completed' : 'pending'} />
                  </div>
                  
                  <div 
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate('/member/education/budget-friendly-meals')}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isComplete('budget-friendly-meals') ? 'bg-success/10' : 'bg-muted'}`}>
                        <BookOpen className={`h-5 w-5 ${isComplete('budget-friendly-meals') ? 'text-success' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="font-medium">Budget-Friendly Meals Made Easy</p>
                        <p className="text-sm text-muted-foreground">Create satisfying meals without overspending</p>
                      </div>
                    </div>
                    <StatusPill status={isComplete('budget-friendly-meals') ? 'completed' : 'pending'} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coach" className="space-y-6">
            {/* Booking Section */}
            <Card>
              <CardHeader>
                <CardTitle>Health Coach</CardTitle>
                <CardDescription>
                  Book a session with one of our certified health coaches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full min-h-[600px] rounded-lg overflow-hidden border">
                  <iframe 
                    src="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=11976136&provider_ids=%5B11976136%5D&appt_type_ids=%5B466786,466787,466788%5D" 
                    style={{ width: '100%', height: '600px', border: 'none' }}
                    title="Book Health Coach Appointment"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Booking provided by{' '}
                  <a 
                    href="https://gethealthie.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Healthie
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Chat Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message Your Coach
                </CardTitle>
                <CardDescription>
                  Chat directly with your health coach between sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HealthieChatWrapper 
                  apiKey={import.meta.env.VITE_HEALTHIE_API_KEY || ''}
                  userId={member?.healthieUserId}
                >
                  <HealthieChat />
                </HealthieChatWrapper>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Messaging powered by{' '}
                  <a 
                    href="https://gethealthie.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Healthie
                  </a>
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Support Button */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-semibold">Need Help?</h3>
              <p className="text-sm text-muted-foreground">Our support team is here to assist you.</p>
            </div>
            <Button onClick={handleOpenSupportModal}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Report Issue Modal */}
      <Dialog open={issueModalOpen} onOpenChange={setIssueModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Let us know what went wrong with order #{selectedOrderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of issue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="wrong_item">Wrong item</SelectItem>
                  <SelectItem value="not_received">Item not received</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue-details">Additional Details</Label>
              <Textarea
                id="issue-details"
                placeholder="Please describe the issue in more detail..."
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIssueModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitIssue} disabled={!issueType}>
              Submit Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Support Modal */}
      <Dialog open={supportModalOpen} onOpenChange={handleSupportModalClose}>
        <DialogContent className="sm:max-w-md">
          {!supportSubmitting && !supportSubmitted && (
            <>
              <DialogHeader>
                <DialogTitle>Contact Support</DialogTitle>
                <DialogDescription>
                  Submit a support request and we'll get back to you shortly.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="support-subject">Subject</Label>
                  <Select value={supportSubject} onValueChange={setSupportSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order_issue">Order Issue</SelectItem>
                      <SelectItem value="delivery_question">Delivery Question</SelectItem>
                      <SelectItem value="dietary_preferences">Dietary Preferences</SelectItem>
                      <SelectItem value="program_questions">Program Questions</SelectItem>
                      <SelectItem value="technical_support">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea
                    id="support-message"
                    placeholder="Please describe how we can help you..."
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSupportModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSupportSubmit} 
                  disabled={!supportSubject || !supportMessage.trim()}
                >
                  Submit Request
                </Button>
              </DialogFooter>
            </>
          )}

          {supportSubmitting && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <div className="text-center">
                <p className="font-semibold text-lg">Submitting your request...</p>
                <p className="text-sm text-muted-foreground">We're connecting you with our support team</p>
              </div>
            </div>
          )}

          {supportSubmitted && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-lg">Case Created Successfully</p>
                <p className="text-2xl font-bold text-primary">{supportCaseNumber}</p>
                
              </div>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                We've received your request and will respond within 24 hours.
              </p>
              <Button onClick={() => setSupportModalOpen(false)} className="mt-4">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
