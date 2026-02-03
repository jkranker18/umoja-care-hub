import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { icons } from 'lucide-react';
import type { EducationModule } from '@/lib/educationData';

interface EducationPlaceholderPageProps {
  module: EducationModule;
}

export function EducationPlaceholderPage({ module }: EducationPlaceholderPageProps) {
  const navigate = useNavigate();
  const IconComponent = icons[module.icon as keyof typeof icons];

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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold">{module.title}</h1>
          <p className="text-lg text-muted-foreground">{module.description}</p>
          {module.duration && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {module.duration}
            </div>
          )}
        </div>

        {/* Coming Soon Card */}
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Content Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on creating comprehensive, easy-to-understand content for this topic. 
              Check back soon!
            </p>
          </CardContent>
        </Card>

        {/* Related Topics Placeholder */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">What You'll Learn</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                Key concepts and practical tips
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                Evidence-based information
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                Actionable steps you can take today
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => navigate('/member', { state: { activeTab: 'content' } })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Education
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
