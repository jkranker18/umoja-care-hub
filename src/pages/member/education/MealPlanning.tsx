import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle2, Calendar, Apple, Drumstick, Wheat, Droplets } from 'lucide-react';
import { useEducationProgress } from '@/hooks/useEducationProgress';

export default function MealPlanning() {
  const navigate = useNavigate();
  const { markComplete, isComplete } = useEducationProgress();
  const isCompleted = isComplete('meal-planning');

  const handleMarkComplete = () => {
    markComplete('meal-planning');
    navigate('/member', { state: { activeTab: 'content' } });
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Meal Planning & Portion Control</h1>
              <p className="text-muted-foreground">6 min read</p>
            </div>
          </div>
        </div>

        {/* Plate Model */}
        <Card>
          <CardHeader>
            <CardTitle>The Plate Model</CardTitle>
            <p className="text-sm text-muted-foreground">Use this guide to build balanced meals</p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                <Apple className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Half Plate</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Colorful fruits and vegetables</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-900">
                <Drumstick className="h-6 w-6 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-200">Quarter Plate</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Lean protein (chicken, fish, beans, tofu)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
                <Wheat className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800 dark:text-amber-200">Quarter Plate</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">Whole grains (brown rice, oats, whole wheat pasta)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
                <Droplets className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Small Side</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Healthy fat (olive oil, avocado, nuts)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Meal Planning Worksheet */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Meal-Planning Worksheet</CardTitle>
            <p className="text-sm text-muted-foreground">Plan your meals and snacks to make cooking easier</p>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Day</TableHead>
                  <TableHead>Breakfast</TableHead>
                  <TableHead>Lunch</TableHead>
                  <TableHead>Dinner</TableHead>
                  <TableHead>Snacks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.map((day) => (
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
            <p className="text-xs text-muted-foreground mt-3">
              Tip: Print this worksheet or use a notepad to plan your week ahead!
            </p>
          </CardContent>
        </Card>

        {/* Grocery Shopping List */}
        <Card>
          <CardHeader>
            <CardTitle>Grocery Shopping List</CardTitle>
            <p className="text-sm text-muted-foreground">Group items by category to save time at the store</p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-green-700 dark:text-green-400">Fruits & Vegetables</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Apples, bananas, berries</li>
                  <li>• Carrots, spinach, bell peppers</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-orange-700 dark:text-orange-400">Proteins</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Chicken breast, canned tuna</li>
                  <li>• Eggs, beans, tofu</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-amber-700 dark:text-amber-400">Grains</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Brown rice, whole wheat bread</li>
                  <li>• Oats, whole grain pasta</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-blue-700 dark:text-blue-400">Dairy (or Alternatives)</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Milk, yogurt, cheese</li>
                  <li>• Unsweetened soy or almond milk</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-purple-700 dark:text-purple-400">Healthy Fats</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Olive oil, avocado</li>
                  <li>• Nuts, seeds</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-pink-700 dark:text-pink-400">Snacks & Extras</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hummus, whole grain crackers</li>
                  <li>• Low-sugar granola bars, popcorn</li>
                </ul>
              </div>
            </div>
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
