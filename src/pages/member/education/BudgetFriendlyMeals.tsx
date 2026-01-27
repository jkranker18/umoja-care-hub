import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BudgetFriendlyMeals() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/member')} className="mb-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Education
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold">Budget-Friendly Meals Made Easy</h1>
          <p className="text-lg text-muted-foreground">Create satisfying meals without overspending</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-lg">
              You don't need fancy ingredients or expensive recipes to make satisfying meals. With a few key tips and a flexible mindset, you can build tasty, balanced meals that fit your budget. This guide shows you how to mix and match what you have to create meals without stress or overspending.
            </p>
          </CardContent>
        </Card>

        {/* Start with What You Have */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Start with What You Have</h2>
            <p className="text-muted-foreground mb-4">
              Before heading to the store, check your pantry, fridge, and freezer. You may already have the building blocks of a meal!
            </p>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span className="font-medium">Look for:</span>
              </div>
              <ul className="space-y-1 text-muted-foreground ml-7">
                <li>• Cooked or uncooked grains (rice, pasta, oats, etc.)</li>
                <li>• Canned or frozen vegetables</li>
                <li>• Protein sources (eggs, beans, canned meats, leftovers)</li>
                <li>• Seasonings, sauces, or broth</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Mix & Match Meals */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Keep It Flexible: Mix & Match Meals</h2>
            <p className="text-muted-foreground mb-4">
              Think of meals as combinations, not recipes. Use what's available to put together simple, affordable dishes.
            </p>
            
            <div className="p-4 bg-muted/50 rounded-lg mb-4">
              <h3 className="font-semibold mb-3">Meal Formula to Try:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-background rounded-lg">
                  <p className="font-medium text-primary">Base</p>
                  <p className="text-sm text-muted-foreground">A grain, pasta, bread, or starchy veggie (rice, oats, potatoes, tortillas)</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <p className="font-medium text-primary">Add-ins</p>
                  <p className="text-sm text-muted-foreground">A protein and some vegetables</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg">
                  <p className="font-medium text-primary">Flavor</p>
                  <p className="text-sm text-muted-foreground">Spices, sauces, or fats like oil or cheese</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Example Combos:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Rice + canned black beans + frozen corn + salsa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Pasta + frozen spinach + scrambled eggs + garlic powder
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                  Oats + peanut butter + banana + cinnamon
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Make Ingredients Work */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Make One Ingredient Work for Several Meals</h2>
            <p className="text-muted-foreground mb-4">
              Buy ingredients that can stretch across multiple dishes.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• A bag of rice can become stir-fry, burrito bowls, or rice soup.</li>
              <li>• A can of beans can be used in tacos, pasta, or a veggie hash.</li>
              <li>• Leftover roasted veggies can go into salads, wraps, or omelets.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Think Beyond Meat */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">Think Beyond Meat</h2>
            <p className="text-muted-foreground mb-4">
              Meat is often the most expensive part of the meal. Try using more affordable proteins:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="font-medium">Canned beans or lentils</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="font-medium">Eggs or tofu</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="font-medium">Canned tuna or sardines</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="font-medium">Peanut butter</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Swap meat with plant-based proteins a few times a week to cut costs without losing nutrition.
            </p>
          </CardContent>
        </Card>

        {/* Bonus Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Bonus Tips for Meal Building on a Budget</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong>Cook once, eat twice.</strong> Make larger portions and enjoy leftovers for lunch.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong>Use sauces and spices</strong> to change up basic ingredients.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground"><strong>Repurpose leftovers.</strong> Turn last night's chili into a baked potato topping or taco filling.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Inspiration Chart */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Your Meal Idea Inspiration Chart</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meal Type</TableHead>
                  <TableHead>Budget-Friendly Idea</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Bowl Meal</TableCell>
                  <TableCell>Rice + beans + frozen veggies + salsa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pasta Dish</TableCell>
                  <TableCell>Pasta + canned tomatoes + garlic + cheese</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Breakfast-for-Dinner</TableCell>
                  <TableCell>Oats or eggs + toast + fruit or veggies</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Stir-Fry</TableCell>
                  <TableCell>Leftover meat + frozen veggies + soy sauce</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Soup</TableCell>
                  <TableCell>Broth + rice + canned beans + spices</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mark Complete Button */}
        <div className="flex justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/member')}>
            <CheckCircle className="h-5 w-5 mr-2" />
            Mark as Complete
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}