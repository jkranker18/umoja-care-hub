import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertTriangle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function ReadingNutritionLabel() {
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
          <h1 className="text-3xl font-display font-bold">Reading a Nutrition Label</h1>
          <p className="text-lg text-muted-foreground">Learn to make healthier food choices</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-lg">
              Learning to read and understand nutrition labels can make it easier to find and choose healthy options.
            </p>
          </CardContent>
        </Card>

        {/* Start Here - Serving Size */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">Start Here: Serving Size</h2>
            <p className="text-muted-foreground">
              Check the serving size and number of servings in the package. The serving size is important to note because it influences the amount of calories and nutrients listed on the Nutrition Facts label. It's okay to consume more than one serving of certain items, but be mindful of how that will change the calorie and nutrient amounts on the Nutrition Facts label.
            </p>
          </CardContent>
        </Card>

        {/* Ingredient List */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">Ingredient List</h2>
            <p className="text-muted-foreground">
              On a product label, the ingredients are listed in order of predominance. The ingredients used in the greatest amounts are listed first, followed in descending order by those used in smaller amounts.
            </p>
          </CardContent>
        </Card>

        {/* Check Calories */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">Check Calories</h2>
            <p className="text-muted-foreground">
              Calories are a measure of how much energy is in a serving of food. Excess calories may cause weight gain, but don't stop at just the calories. Finish reading the Nutrition Facts labels to determine if the calories are empty or nutrient-dense.
            </p>
          </CardContent>
        </Card>

        {/* Example Nutrition Facts Table */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Example Nutrition Facts</h2>
            <div className="max-w-sm mx-auto border-2 border-foreground rounded-lg p-4">
              <h3 className="text-lg font-bold border-b-4 border-foreground pb-1 mb-2">Nutrition Facts</h3>
              <p className="text-sm">8 Servings Per Container</p>
              <p className="text-sm border-b border-foreground pb-2 mb-2"><strong>Serving Size</strong> 2.5 cups</p>
              
              <Table>
                <TableBody>
                  <TableRow className="border-b-4 border-foreground">
                    <TableCell className="font-bold py-1">Calories</TableCell>
                    <TableCell className="text-right font-bold text-2xl py-1">340</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1"><strong>Total Fat</strong> 23g</TableCell>
                    <TableCell className="text-right py-1">29%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1 pl-6">Saturated Fat 5.2g</TableCell>
                    <TableCell className="text-right py-1">26%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1 pl-6">Trans Fat 0g</TableCell>
                    <TableCell className="text-right py-1"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1"><strong>Sodium</strong> 330mg</TableCell>
                    <TableCell className="text-right py-1">14%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1"><strong>Total Carbohydrate</strong> 28g</TableCell>
                    <TableCell className="text-right py-1">10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1 pl-6">Dietary Fiber 4g</TableCell>
                    <TableCell className="text-right py-1">14%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1 pl-6">Total Sugars 8g</TableCell>
                    <TableCell className="text-right py-1"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1 pl-8 text-sm">Includes 2g Added Sugars</TableCell>
                    <TableCell className="text-right py-1">4%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-1"><strong>Protein</strong> 9g</TableCell>
                    <TableCell className="text-right py-1">18%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
                * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Be Mindful / Get Enough */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-lg font-semibold">Be Mindful of These</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Eating too much saturated fat, trans fat, sodium, or added sugar may increase risk of certain chronic diseases. The Dietary Guidelines recommends avoiding trans fats and limiting saturated fats to less than 10% of total daily calories.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Get Enough of These</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                The Dietary Guidelines recommends consuming 25-30 grams of fiber per day. Eating enough fiber as well as vitamin D, potassium, calcium, and iron can improve health and help reduce the risk of some diseases.
              </p>
            </CardContent>
          </Card>
        </div>

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