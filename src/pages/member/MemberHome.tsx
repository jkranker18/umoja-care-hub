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
import { Package, ClipboardList, MessageSquare, Heart, Utensils, BookOpen } from 'lucide-react';
import { format, addWeeks } from 'date-fns';
import { useNavigate } from 'react-router-dom';

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

  // Get orders by status for display
  const deliveredOrder = memberOrders.find(o => o.shipmentStatus === 'delivered');
  const inTransitOrder = memberOrders.find(o => o.shipmentStatus === 'in_transit');
  const pendingOrder = memberOrders.find(o => o.shipmentStatus === 'processing' || o.shipmentStatus === 'shipped');
  
  const displayOrders = [deliveredOrder, inTransitOrder, pendingOrder].filter(Boolean);

  return (
    <DashboardLayout>
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
            <TabsTrigger value="plan">My Plan</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="content">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Current Program */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Current Program</CardTitle>
                    <StatusPill status={enrollment?.status || 'pending'} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{program?.name}</h3>
                    <p className="text-sm text-muted-foreground">{program?.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Enrolled:</span>
                      <p className="font-medium">{enrollment?.enrollmentDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <p className="font-medium">Weekly</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">12 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Latest Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment ? (
                    <>
                      <div>
                        <span className="text-sm text-muted-foreground">Type:</span>
                        <p className="font-medium">{assessment.type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Allergens:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {allergens.map(allergen => (
                            <Badge key={allergen} variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                              {allergen}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Tailored For:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {chronicConditions.map(condition => (
                            <Badge key={condition} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {assessment.sdohNeeds.length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">SDOH Needs Identified:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {assessment.sdohNeeds.map(need => (
                              <span key={need} className="px-2 py-1 bg-muted rounded text-xs">{need}</span>
                            ))}
                          </div>
                        </div>
                      )}
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
                <CardTitle>My Meal Plan</CardTitle>
                <CardDescription>Your personalized nutrition plan based on your health goals.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2">Diabetes-Friendly Meal Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Low glycemic index meals designed to help manage blood sugar levels. 
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
                <CardDescription>Track all your meal shipments.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {memberOrders.map(order => (
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
                      <div className="text-right">
                        <StatusPill status={order.shipmentStatus} />
                        <p className="text-xs text-muted-foreground mt-1">
                          Est. {order.estimatedDelivery}
                        </p>
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
    </DashboardLayout>
  );
}
