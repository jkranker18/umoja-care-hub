import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEducationProgress } from '@/hooks/useEducationProgress';

export default function GeneralNutrition() {
  const navigate = useNavigate();
  const { markComplete, isComplete } = useEducationProgress();
  const isCompleted = isComplete('general-nutrition');

  const handleMarkComplete = () => {
    markComplete('general-nutrition');
    navigate('/member', { state: { activeTab: 'content' } });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/member', { state: { activeTab: 'content' } })} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Education
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold">General Nutrition</h1>
          <p className="text-lg text-muted-foreground">What Your Body Needs to Stay Healthy</p>
        </div>

        {/* What Is Nutrition */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">What Is Nutrition?</h2>
            <p className="text-muted-foreground">
              Nutrition is how our bodies get the fuel and nutrients they need to grow, stay strong, and feel good. We get these nutrients from the food we eat every day.
            </p>
          </CardContent>
        </Card>

        {/* Macronutrients */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center border-b-4 border-primary/60 pb-2">Macronutrients: The Big Stuff</h2>
            <p className="text-muted-foreground mb-6">Macronutrients are vital for energy and body function:</p>
            
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">1. Carbohydrates</h3>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• <strong>Role:</strong> Energy source.</li>
                  <li>• <strong>Sources:</strong> Bread, rice, pasta, fruits, vegetables.</li>
                  <li>• <strong>Tip:</strong> Choose whole grains and fresh fruits for lasting energy and fiber.</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">2. Proteins</h3>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• <strong>Role:</strong> Muscle building, tissue repair, immune support.</li>
                  <li>• <strong>Sources:</strong> Meat, eggs, beans, nuts, dairy.</li>
                  <li>• <strong>Tip:</strong> Include diverse protein sources like beans or tofu.</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">3. Fats</h3>
                <ul className="space-y-1 text-muted-foreground ml-4">
                  <li>• <strong>Role:</strong> Energy storage and vitamin absorption.</li>
                  <li>• <strong>Sources:</strong> Nuts, seeds, oils, avocados, fish.</li>
                  <li>• <strong>Tip:</strong> Select healthy fats from nuts, seeds, and avocados.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Micronutrients */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center border-b-4 border-primary/60 pb-2">Micronutrients: The Small Stuff That Matters</h2>
            <p className="text-muted-foreground mb-6">Micronutrients are vitamins and minerals. We only need a little, but they are super important!</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Vitamins</h3>
                <p className="text-muted-foreground mb-2">Help your body grow, heal, and stay healthy.</p>
                <p className="text-sm font-medium mb-1">Examples:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• <strong>Vitamin C:</strong> Helps your body heal (found in oranges and strawberries).</li>
                  <li>• <strong>Vitamin D:</strong> Helps your bones (found in sunlight and milk).</li>
                </ul>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Minerals</h3>
                <p className="text-muted-foreground mb-2">Keep your bones strong and your heart healthy.</p>
                <p className="text-sm font-medium mb-1">Examples:</p>
                <ul className="space-y-1 text-muted-foreground text-sm ml-4">
                  <li>• <strong>Calcium:</strong> Builds strong bones (found in milk and leafy greens).</li>
                  <li>• <strong>Iron:</strong> Helps your blood carry oxygen (found in meat and beans).</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Don't Forget Water */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Don't Forget Water!</h2>
            <p className="text-muted-foreground">
              Water helps your body stay cool, move nutrients, and get rid of waste.
            </p>
          </CardContent>
        </Card>

        {/* Healthy Eating Tips */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Healthy Eating Tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">Eat a variety of foods from all food groups—aim for a colorful plate! Different colors often mean different nutrients that help your body stay strong and healthy.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">Opt for water instead of sugary drinks.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">Choosing processed foods less often can support your overall health.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Mark Complete Button */}
        <div className="flex justify-center pt-4">
          {isCompleted ? (
            <Button size="lg" variant="outline" disabled>
              <CheckCircle className="h-5 w-5 mr-2 text-primary" />
              Completed
            </Button>
          ) : (
            <Button size="lg" onClick={handleMarkComplete}>
              <CheckCircle className="h-5 w-5 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}