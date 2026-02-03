import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle2, Droplets, AlertTriangle, Beaker } from 'lucide-react';
import { useEducationProgress } from '@/hooks/useEducationProgress';

export default function HydrationGIHealth() {
  const navigate = useNavigate();
  const { markComplete, isComplete } = useEducationProgress();
  const isCompleted = isComplete('hydration-gi-health');

  const handleMarkComplete = () => {
    markComplete('hydration-gi-health');
    navigate('/member', { state: { activeTab: 'content' } });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/member', { state: { activeTab: 'content' } })}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hydration & GI Health</h1>
              <p className="text-muted-foreground">5 min read</p>
            </div>
          </div>
        </div>

        {/* Fluid Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Fluid Balance & Dehydration Risks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Staying hydrated keeps cells healthy and helps your kidneys flush out toxins. 
              Dehydration can cause low blood sodium (hyponatremia), fatigue, and confusion.
            </p>
            
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Signs of Dehydration</p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                  <li>• Dark urine</li>
                  <li>• Dry mouth</li>
                  <li>• Dizziness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Diarrhea and Constipation */}
        <Card>
          <CardHeader>
            <CardTitle>Managing Digestive Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium">Diarrhea Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Sip clear fluids (water, broth) often</li>
                <li>• Eat bananas, rice, applesauce, toast (BRAT diet)</li>
                <li>• Avoid caffeine and high-fat foods</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Constipation Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Increase fiber gradually (whole grains, fruits, vegetables)</li>
                <li>• Drink at least 8 cups of fluid daily</li>
                <li>• Add prunes or prune juice to your diet</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Hydration Log */}
        <Card>
          <CardHeader>
            <CardTitle>Hydration Log Template</CardTitle>
            <p className="text-sm text-muted-foreground">Aim for 64–80 oz of fluids per day, unless otherwise directed</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Morning (oz)</TableHead>
                  <TableHead>Afternoon (oz)</TableHead>
                  <TableHead>Evening (oz)</TableHead>
                  <TableHead>Total (oz)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {['Day 1', 'Day 2', 'Day 3'].map((day) => (
                  <TableRow key={day}>
                    <TableCell className="font-medium">{day}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">—</TableCell>
                    <TableCell className="text-muted-foreground text-sm">—</TableCell>
                    <TableCell className="text-muted-foreground text-sm">—</TableCell>
                    <TableCell className="text-muted-foreground text-sm">—</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Electrolyte Recipes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5" />
              Electrolyte Solution Recipes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Simple DIY Sports Drink</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• 4 cups water</li>
                <li>• 2 tablespoons sugar</li>
                <li>• ¼ teaspoon salt</li>
                <li>• Optional: ½ cup orange juice for flavor</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Coconut Water Refresher</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• 1 cup coconut water</li>
                <li>• 1 cup plain water</li>
                <li>• Pinch of salt</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Fiber Timing Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Fiber Timing Chart</CardTitle>
            <p className="text-sm text-muted-foreground">Spread fiber throughout the day for best results</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time of Day</TableHead>
                  <TableHead>High-Fiber Food</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Breakfast</TableCell>
                  <TableCell>Oatmeal</TableCell>
                  <TableCell>½ cup cooked</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lunch</TableCell>
                  <TableCell>Chickpea salad</TableCell>
                  <TableCell>½ cup</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Snack</TableCell>
                  <TableCell>Apple with skin</TableCell>
                  <TableCell>1 medium</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dinner</TableCell>
                  <TableCell>Steamed broccoli</TableCell>
                  <TableCell>1 cup</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mark Complete Button */}
        <div className="flex justify-center pb-8">
          {isCompleted ? (
            <Button size="lg" variant="outline" disabled>
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
              Completed
            </Button>
          ) : (
            <Button onClick={handleMarkComplete} size="lg">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
