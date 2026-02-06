import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle, Menu, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import umojaLogo from '@/assets/umoja-food-for-health-logo.webp';
import hcscLogo from '@/assets/hcsc-logo.png';
import { useApp } from '@/contexts/AppContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useEducationProgress } from '@/hooks/useEducationProgress';

interface HeaderProps {
  onMenuClick?: () => void;
  onEducationClick?: () => void;
}

export function Header({ onMenuClick, onEducationClick }: HeaderProps) {
  const navigate = useNavigate();
  const { currentRole } = useApp();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { completedCount, totalModules, progressPercent } = useEducationProgress();
  
  const allComplete = completedCount === totalModules;

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <img 
            src={currentRole === 'healthplan' ? hcscLogo : umojaLogo} 
            alt={currentRole === 'healthplan' ? 'HCSC' : 'Umoja Food For Health'} 
            className="h-8 object-contain"
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications with Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {!allComplete && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{allComplete ? 'All Modules Complete!' : 'Complete Your Progress'}</DialogTitle>
              <DialogDescription>
                {allComplete 
                  ? 'Congratulations! You\'ve completed all your education modules.'
                  : 'Continue your education modules to get the most out of your program.'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Module Progress</span>
                  <span className="font-medium">{completedCount} of {totalModules} completed</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
              {allComplete ? (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <p className="text-sm text-success">
                    Great job! You've completed all your education modules.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You're doing great! Complete your remaining modules to unlock personalized nutrition insights and maximize your health benefits.
                </p>
              )}
              <Button 
                className="w-full" 
                onClick={() => {
                  setDialogOpen(false);
                  if (onEducationClick) {
                    onEducationClick();
                  } else {
                    navigate('/member');
                  }
                }}
              >
                {allComplete ? 'View Education' : 'Continue Learning'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
