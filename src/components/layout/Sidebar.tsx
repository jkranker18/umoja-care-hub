import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/lib/mockData';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import laFoodBankLogo from '@/assets/la-food-bank-logo.png';
import {
  Home,
  User,
  Package,
  ClipboardList,
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  FileText,
  Settings,
  Zap,
  Shield,
  MessageSquare,
  Layers,
  GitBranch,
  Database,
  AlertTriangle,
  PlusCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const memberNav: NavItem[] = [
  { label: 'Home', path: '/member', icon: Home },
  { label: 'My Plan', path: '/member/plan', icon: ClipboardList },
  { label: 'My Orders', path: '/member/orders', icon: Package },
  { label: 'My Tasks', path: '/member/tasks', icon: FileText },
  { label: 'Profile', path: '/member/profile', icon: User },
];

const cboNav: NavItem[] = [
  { label: 'Dashboard', path: '/cbo', icon: LayoutDashboard },
  { label: 'Member Roster', path: '/cbo/members', icon: Users },
  { label: 'Add Member', path: '/cbo/add-member', icon: PlusCircle },
  { label: 'Organization', path: '/cbo/organization', icon: Building2 },
];

const healthplanNav: NavItem[] = [
  { label: 'Overview', path: '/healthplan', icon: LayoutDashboard },
  { label: 'Outcomes', path: '/healthplan/outcomes', icon: BarChart3 },
  { label: 'Members', path: '/healthplan/members', icon: Users },
  { label: 'Reports', path: '/healthplan/reports', icon: FileText },
];

const internalNav: NavItem[] = [
  { label: 'Ops Cockpit', path: '/internal', icon: LayoutDashboard },
  { label: 'Workflows', path: '/internal/workflows', icon: GitBranch },
  { label: 'Rules Engine', path: '/internal/rules', icon: Shield },
  { label: 'Campaigns', path: '/internal/campaigns', icon: MessageSquare },
  { label: 'Service Cases', path: '/internal/cases', icon: AlertTriangle },
  { label: 'Integrations', path: '/internal/integrations', icon: Zap },
  { label: 'Data Explorer', path: '/internal/data', icon: Database },
];

const navByRole: Record<UserRole, NavItem[]> = {
  member: memberNav,
  cbo: cboNav,
  healthplan: healthplanNav,
  internal: internalNav,
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { currentRole } = useApp();
  const location = useLocation();
  const navItems = navByRole[currentRole];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="font-display font-semibold">Navigation</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo area for desktop */}
        <div className="hidden lg:flex items-center gap-3 p-4 border-b border-sidebar-border">
          {currentRole === 'cbo' ? (
            <img 
              src={laFoodBankLogo} 
              alt="LA Regional Food Bank" 
              className="h-12 object-contain"
            />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-lg">U</span>
              </div>
              <div>
                <div className="font-display font-semibold text-sidebar-foreground">Umoja Health</div>
                <div className="text-xs text-sidebar-foreground/60">Platform POC</div>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'nav-item',
                  isActive ? 'nav-item-active' : 'nav-item-inactive'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Integration Layer Link */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border">
          <NavLink
            to="/integrations"
            onClick={onClose}
            className={cn(
              'nav-item',
              location.pathname === '/integrations' ? 'nav-item-active' : 'nav-item-inactive'
            )}
          >
            <Layers className="h-5 w-5" />
            <span>Integration Layer</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
