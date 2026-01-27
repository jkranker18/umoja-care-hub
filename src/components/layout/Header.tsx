import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import umojaLogo from '@/assets/umoja-food-for-health-logo.webp';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();

  // Mock content progress data
  const completedModules = 2;
  const totalModules = 6;
  const progressPercent = (completedModules / totalModules) * 100;

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
            src={umojaLogo} 
            alt="Umoja Food For Health" 
            className="h-8 object-contain"
          />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications with Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Your Progress</DialogTitle>
              <DialogDescription>
                Continue your education modules to get the most out of your program.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Module Progress</span>
                  <span className="font-medium">{completedModules} of {totalModules} completed</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                You're doing great! Complete your remaining modules to unlock personalized nutrition insights and maximize your health benefits.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/member')}
              >
                Continue Learning
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
