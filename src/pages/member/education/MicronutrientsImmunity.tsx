import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle2, Sparkles, Apple, Pill } from 'lucide-react';
import { useEducationProgress } from '@/hooks/useEducationProgress';

export default function MicronutrientsImmunity() {
  const navigate = useNavigate();
  const { markComplete, isComplete } = useEducationProgress();
  const isCompleted = isComplete('micronutrients-immunity');

  const handleMarkComplete = () => {
    markComplete('micronutrients-immunity');
    navigate('/member', { state: { activeTab: 'content' } });
  };

  const nutrients = [
    {
      nutrient: 'Vitamin A',
      role: 'Maintains skin and eye health',
      sources: 'Sweet potatoes, carrots, spinach',
    },
    {
      nutrient: 'Vitamin C',
      role: 'Boosts immunity and collagen',
      sources: 'Citrus fruits, bell peppers, strawberries',
    },
    {
      nutrient: 'Vitamin E',
      role: 'Protects cells from damage',
      sources: 'Almonds, sunflower seeds, spinach',
    },
    {
      nutrient: 'Zinc',
      role: 'Helps wound healing and immunity',
      sources: 'Oysters, beef, pumpkin seeds',
    },
    {
      nutrient: 'Selenium',
      role: 'Protects cells and supports glands',
      sources: 'Brazil nuts, tuna, whole grains',
    },
  ];

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
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Micronutrients for Immunity</h1>
              <p className="text-muted-foreground">4 min read</p>
            </div>
          </div>
        </div>

        {/* Why Micronutrients Matter */}
        <Card>
          <CardHeader>
            <CardTitle>Why Micronutrients Matter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vitamins and minerals support your immune system and help your body heal faster. 
              Getting the right nutrients from food is key to staying healthy during treatment and recovery.
            </p>
          </CardContent>
        </Card>

        {/* Key Nutrients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Key Antioxidant Vitamins & Trace Minerals</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nutrient</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Food Sources</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutrients.map((item) => (
                  <TableRow key={item.nutrient}>
                    <TableCell className="font-medium">{item.nutrient}</TableCell>
                    <TableCell className="text-muted-foreground">{item.role}</TableCell>
                    <TableCell className="text-muted-foreground">{item.sources}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Food vs Supplements */}
        <Card>
          <CardHeader>
            <CardTitle>Food Sources vs. Supplements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
              <Apple className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">Food First</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Nutrients are better absorbed from whole foods. Try to get your vitamins and minerals from a varied diet.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <Pill className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">Supplements</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Use only if your doctor or dietitian recommends them. Some supplements can interact with medications.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
              <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Balance</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Too much of a single vitamin or mineral can be harmful. More is not always better.
                </p>
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
