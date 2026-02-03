import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, Leaf, Wind, Smartphone, BookOpen, Users, Phone } from 'lucide-react';
import { useEducationProgress } from '@/hooks/useEducationProgress';

export default function MindfulEating() {
  const navigate = useNavigate();
  const { markComplete, isComplete } = useEducationProgress();
  const isCompleted = isComplete('mindful-eating');

  const handleMarkComplete = () => {
    markComplete('mindful-eating');
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
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Mindful Eating</h1>
              <p className="text-muted-foreground">5 min read</p>
            </div>
          </div>
        </div>

        {/* Why Try Mindful Eating */}
        <Card>
          <CardHeader>
            <CardTitle>Why Try Mindful Eating?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Mindful eating helps you enjoy food more and notice when you feel hungry or full. 
              By slowing down and paying attention, you can build a healthier relationship with food.
            </p>
          </CardContent>
        </Card>

        {/* Steps to Practice */}
        <Card>
          <CardHeader>
            <CardTitle>10 Steps to Practice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">1</span>
                <div>
                  <p className="font-medium">Find a Quiet Spot</p>
                  <p className="text-sm text-muted-foreground">Sit at a table or in a chair. Turn off screens and noise.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">2</span>
                <div>
                  <p className="font-medium">Look at Your Food</p>
                  <p className="text-sm text-muted-foreground">Notice the colors, shapes, and textures.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">3</span>
                <div>
                  <p className="font-medium">Smell Your Food</p>
                  <p className="text-sm text-muted-foreground">Take a slow, deep sniff. What do you notice?</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">4</span>
                <div>
                  <p className="font-medium">Take Small Bites</p>
                  <p className="text-sm text-muted-foreground">Cut or scoop small pieces.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">5</span>
                <div>
                  <p className="font-medium">Chew Slowly</p>
                  <p className="text-sm text-muted-foreground">Chew each bite at least 10 times.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">6</span>
                <div>
                  <p className="font-medium">Put Down Your Fork</p>
                  <p className="text-sm text-muted-foreground">Rest your fork or spoon between bites.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">7</span>
                <div>
                  <p className="font-medium">Taste and Notice</p>
                  <p className="text-sm text-muted-foreground">Pay attention to flavors—sweet, salty, sour, or spicy.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">8</span>
                <div>
                  <p className="font-medium">Check Your Hunger</p>
                  <p className="text-sm text-muted-foreground">Pause halfway through the meal.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">9</span>
                <div>
                  <p className="font-medium">Ask Yourself</p>
                  <p className="text-sm text-muted-foreground">"Am I still hungry?"</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">10</span>
                <div>
                  <p className="font-medium">Stop When Full</p>
                  <p className="text-sm text-muted-foreground">If you feel satisfied, finish chewing and stop eating.</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Tips for Success */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for Success</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Eat without multitasking (no TV or phone)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Start with one meal a day</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Practice for 5–10 minutes each time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>Be kind to yourself—this takes time</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Stress-Management Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Stress-Management Resources</CardTitle>
            <p className="text-sm text-muted-foreground">
              Stress can make it hard to eat well. These tools help you relax.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Deep Breathing */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Deep-Breathing Exercise</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Sit comfortably and close your eyes</li>
                <li>• Breathe in through your nose for 4 seconds</li>
                <li>• Hold your breath for 2 seconds</li>
                <li>• Breathe out through your mouth for 6 seconds</li>
                <li>• Repeat 3–5 times</li>
              </ul>
            </div>

            {/* Guided Imagery Apps */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Guided Imagery Apps</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• <span className="font-medium">Calm</span> – free and paid versions</li>
                <li>• <span className="font-medium">Insight Timer</span> – many free meditations</li>
                <li>• <span className="font-medium">Smiling Mind</span> – simple, kid-friendly style</li>
              </ul>
            </div>

            {/* Journaling */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Journaling</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Set a timer for 5 minutes</li>
                <li>• Write down your thoughts or worries</li>
                <li>• No need for perfect words—just write</li>
                <li>• Notice how you feel after writing</li>
              </ul>
            </div>

            {/* Support Groups */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Support Groups</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Ask your clinic about local support groups</li>
                <li>• Online forums: American Cancer Society, CancerCare</li>
                <li>• Meeting others can help you feel less alone</li>
              </ul>
            </div>

            {/* Helplines */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Helplines</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Cancer Support Helpline: Call your care team for the number</li>
                <li>• National Suicide Prevention Lifeline: <span className="font-medium">988</span></li>
                <li>• Keep a list of phone numbers by your phone</li>
              </ul>
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
