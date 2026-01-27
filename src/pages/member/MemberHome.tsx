import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { programs, enrollments, orders, contentPlans, assessments } from '@/lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard } from '@/components/shared/KPICard';
import { StatusPill } from '@/components/shared/StatusPill';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, ClipboardList, MessageSquare, Heart, Utensils, BookOpen, AlertTriangle } from 'lucide-react';
import { format, addWeeks, subWeeks } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function MemberHome() {
  const { members } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock: using first member as current user
  const member = members[0];
  const enrollment = enrollments.find(e => e.memberId === member?.id && e.status === 'active');
  const program = programs.find(p => p.id === enrollment?.programId);
  const memberOrders = orders.filter(o => o.memberId === member?.id);
  const contentPlan = contentPlans.find(cp => cp.memberId === member?.id);
  const assessment = assessments.find(a => a.memberId === member?.id);

  const completedModules = contentPlan?.modules.filter(m => m.status === 'completed').length || 0;
  const totalModules = contentPlan?.modules.length || 0;

  // Calculate next shipment date (2 weeks from today)
  const nextShipmentDate = addWeeks(new Date(), 2);

  // Demo allergens and chronic conditions
  const allergens = ['Eggs', 'Soy', 'Shellfish'];
  const chronicConditions = ['Hypertension'];

  // Issue reporting modal state
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [issueType, setIssueType] = useState<string>('');
  const [issueDetails, setIssueDetails] = useState('');

  // Demo orders - 12 total: 3 delivered, 1 in transit, 8 upcoming
  const demoOrders = [
    // 3 Delivered orders
    {
      id: 'ORD-001',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'delivered' as const,
      trackingNumber: 'TRK-8834521',
      estimatedDelivery: format(subWeeks(new Date(), 3), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-002',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'delivered' as const,
      trackingNumber: 'TRK-8834522',
      estimatedDelivery: format(subWeeks(new Date(), 2), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-003',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'delivered' as const,
      trackingNumber: 'TRK-8834523',
      estimatedDelivery: format(subWeeks(new Date(), 1), 'MMM d, yyyy'),
    },
    // 1 In transit
    {
      id: 'ORD-004',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'in_transit' as const,
      trackingNumber: 'TRK-8834524',
      estimatedDelivery: format(new Date(), 'MMM d, yyyy'),
    },
    // 8 Upcoming orders
    {
      id: 'ORD-005',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834525',
      estimatedDelivery: format(addWeeks(new Date(), 1), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-006',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834526',
      estimatedDelivery: format(addWeeks(new Date(), 2), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-007',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834527',
      estimatedDelivery: format(addWeeks(new Date(), 3), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-008',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834528',
      estimatedDelivery: format(addWeeks(new Date(), 4), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-009',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834529',
      estimatedDelivery: format(addWeeks(new Date(), 5), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-010',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834530',
      estimatedDelivery: format(addWeeks(new Date(), 6), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-011',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834531',
      estimatedDelivery: format(addWeeks(new Date(), 7), 'MMM d, yyyy'),
    },
    {
      id: 'ORD-012',
      memberId: member?.id,
      mealPlan: 'Cardiac Friendly',
      mealsCount: 14,
      shipmentStatus: 'processing' as const,
      trackingNumber: 'TRK-8834532',
      estimatedDelivery: format(addWeeks(new Date(), 8), 'MMM d, yyyy'),
    },
  ];

  // Get 3 most recent orders for overview display
  const displayOrders = demoOrders.slice(0, 3);

  const handleReportIssue = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIssueType('');
    setIssueDetails('');
    setIssueModalOpen(true);
  };

  const handleSubmitIssue = () => {
    // In a real app, this would submit to backend
    console.log('Issue reported:', { orderId: selectedOrderId, issueType, issueDetails });
    setIssueModalOpen(false);
    setSelectedOrderId(null);
    setIssueType('');
    setIssueDetails('');
  };

  const handleEducationClick = () => setActiveTab('content');

  return (
    <DashboardLayout onEducationClick={handleEducationClick}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Welcome back, {member?.firstName}!</h1>
            <p className="text-muted-foreground">
              Here's your program status and upcoming activities.
            </p>
          </div>
          <Button onClick={() => navigate('/member/tasks')}>
            <ClipboardList className="h-4 w-4 mr-2" />
            View My Tasks
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Enrollment Status"
            value={enrollment?.status === 'active' ? 'Active' : 'Pending'}
            subtitle={program?.name}
            icon={<Heart className="h-5 w-5" />}
          />
          <KPICard
            title="Next Shipment"
            value={format(nextShipmentDate, 'MMM d')}
            subtitle="Estimated delivery"
            icon={<Package className="h-5 w-5" />}
          />
          <KPICard
            title="Benefit Level"
            value="12 weeks"
            subtitle="Weekly | 14 meals/week"
            icon={<Utensils className="h-5 w-5" />}
          />
          <KPICard
            title="Content Progress"
            value={`${completedModules}/${totalModules}`}
            subtitle="Modules completed"
            icon={<BookOpen className="h-5 w-5" />}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plan">My Program</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="content">Education</TabsTrigger>
          </TabsList>

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
                <CardContent className="space-y-3 pt-0">
                  <div>
                    <h3 className="font-semibold">{program?.name}</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Enrolled</span>
                      <p className="font-medium">{enrollment?.enrollmentDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Frequency</span>
                      <p className="font-medium">Weekly</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Duration</span>
                      <p className="font-medium">12 weeks</p>
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
                    <h3 className="font-semibold mb-2">Cardiac Friendly Meal Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Heart-healthy meals low in sodium and saturated fat, designed to support cardiovascular health. 
                      Each delivery includes 14 meals with balanced macronutrients.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground">Weekly Meals</h4>
                      <p className="text-2xl font-bold">14</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm text-muted-foreground">Deliveries Remaining</h4>
                      <p className="text-2xl font-bold">8</p>
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
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{order.mealPlan}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.mealsCount} meals • Order #{order.id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {order.shipmentStatus === 'delivered' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReportIssue(order.id)}
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                          >
                            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
                            Report Issue
                          </Button>
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
                    <span className="font-medium">{completedModules} of {totalModules} complete</span>
                  </div>
                  <Progress value={(completedModules / totalModules) * 100} />
                </div>
                <div className="space-y-3">
                  {contentPlan?.modules.map(module => (
                    <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          module.status === 'completed' ? 'bg-success/10' : 'bg-muted'
                        }`}>
                          <BookOpen className={`h-5 w-5 ${
                            module.status === 'completed' ? 'text-success' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{module.type}</p>
                        </div>
                      </div>
                      <StatusPill status={module.status} />
                    </div>
                  ))}
                </div>
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
            <Button>
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
    </DashboardLayout>
  );
}
