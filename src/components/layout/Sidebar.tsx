import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/lib/mockData';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import laFoodBankLogo from '@/assets/la-food-bank-logo.png';
import umojaLogoLight from '@/assets/umoja-logo-light.png';
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
  AlertTriangle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberTabChange?: (tab: string) => void;
  activeMemberTab?: string;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  tabId?: string; // For member nav items that map to tabs
}

const memberNav: NavItem[] = [
  { label: 'Home', path: '/member', icon: Home, tabId: 'overview' },
  { label: 'My Program', path: '/member', icon: ClipboardList, tabId: 'plan' },
  { label: 'My Orders', path: '/member', icon: Package, tabId: 'orders' },
  { label: 'Education', path: '/member', icon: FileText, tabId: 'content' },
  { label: 'Profile', path: '/member/profile', icon: User },
];

const cboNav: NavItem[] = [
  { label: 'Home', path: '/cbo', icon: Home },
  { label: 'Organization', path: '/cbo/organization', icon: Building2 },
];

const healthplanNav: NavItem[] = [
  { label: 'Home', path: '/healthplan', icon: Home },
  { label: 'Outcomes Report', path: '/healthplan/outcomes', icon: BarChart3 },
  { label: 'Member Drill Down', path: '/healthplan/members', icon: Users },
  { label: 'Profile', path: '/healthplan/profile', icon: Building2 },
];

const internalNav: NavItem[] = [
  { label: 'Ops Cockpit', path: '/internal', icon: LayoutDashboard },
  { label: 'Admin Management', path: '/internal/admins', icon: Users },
  { label: 'Service Cases', path: '/internal/cases', icon: AlertTriangle },
];

const navByRole: Record<UserRole, NavItem[]> = {
  member: memberNav,
  cbo: cboNav,
  healthplan: healthplanNav,
  internal: internalNav,
};

export function Sidebar({ isOpen, onClose, onMemberTabChange, activeMemberTab }: SidebarProps) {
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
          ) : currentRole === 'healthplan' ? (
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-sidebar-foreground">Blue Cross</span>
              <span className="text-xs text-sidebar-foreground/70">of California</span>
            </div>
          ) : (
            <img 
              src={umojaLogoLight} 
              alt="Umoja Food For Health" 
              className="h-10 object-contain"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            // For member role with tabs, check if this tab is active
            const isMemberTabItem = currentRole === 'member' && item.tabId;
            const isActive = isMemberTabItem 
              ? activeMemberTab === item.tabId
              : location.pathname === item.path;
            
            const handleClick = () => {
              if (isMemberTabItem && onMemberTabChange) {
                onMemberTabChange(item.tabId!);
              }
              onClose();
            };

            return (
              <NavLink
                key={item.tabId || item.path}
                to={item.path}
                onClick={handleClick}
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

      </aside>
    </>
  );
}
