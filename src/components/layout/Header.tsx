import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bell, HelpCircle, Menu, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import umojaLogo from '@/assets/umoja-food-for-health-logo.webp';

interface HeaderProps {
  onMenuClick?: () => void;
}

const roleLabels: Record<UserRole, string> = {
  member: 'Member Portal',
  cbo: 'CBO Portal',
  healthplan: 'Health Plan Portal',
  internal: 'Internal Ops',
};

const roleIcons: Record<UserRole, string> = {
  member: '👤',
  cbo: '🏢',
  healthplan: '🏥',
  internal: '⚙️',
};

export function Header({ onMenuClick }: HeaderProps) {
  const { currentRole, setCurrentRole, resetDemoData, demoMode, setDemoMode } = useApp();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    // Navigate to the appropriate portal
    switch (role) {
      case 'member':
        navigate('/member');
        break;
      case 'cbo':
        navigate('/cbo');
        break;
      case 'healthplan':
        navigate('/healthplan');
        break;
      case 'internal':
        navigate('/internal');
        break;
    }
  };

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
        {/* Demo Mode Toggle */}
        <Button
          variant={demoMode ? 'default' : 'outline'}
          size="sm"
          className="hidden sm:flex gap-2"
          onClick={() => setDemoMode(!demoMode)}
        >
          {demoMode ? 'Demo Active' : 'Start Demo'}
        </Button>

        {/* Reset Demo Data */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden sm:flex gap-2 text-muted-foreground"
          onClick={resetDemoData}
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden md:inline">Reset Data</span>
        </Button>

        {/* Role Switcher */}
        <Select value={currentRole} onValueChange={(v) => handleRoleChange(v as UserRole)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span>{roleIcons[currentRole]}</span>
                <span>{roleLabels[currentRole]}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(roleLabels) as UserRole[]).map((role) => (
              <SelectItem key={role} value={role}>
                <span className="flex items-center gap-2">
                  <span>{roleIcons[role]}</span>
                  <span>{roleLabels[role]}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
