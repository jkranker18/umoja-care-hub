import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/lib/mockData';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import laFoodBankLogo from '@/assets/la-food-bank-logo.png';
import umojaLogoLight from '@/assets/umoja-logo-light.png';
import hcscLogo from '@/assets/hcsc-logo.png';
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
  CalendarCheck,
  Activity,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

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
  tabId?: string;
}

const demoMembers = [
  { id: 'mem-001', name: 'John T.', tier: 1, label: 'Tier 1 — High Risk' },
  { id: 'mem-suzie', name: 'Suzie M.', tier: 2, label: 'Tier 2 — Medium Risk' },
  { id: 'mem-olivia', name: 'Olivia W.', tier: 3, label: 'Tier 3 — Preventive' },
];

const memberNav: NavItem[] = [
  { label: 'Home', path: '/member', icon: Home, tabId: 'overview' },
  { label: 'My Program', path: '/member', icon: ClipboardList, tabId: 'plan' },
  { label: 'My Orders', path: '/member', icon: Package, tabId: 'orders' },
  { label: 'Education', path: '/member', icon: FileText, tabId: 'content' },
  { label: 'My Care Team', path: '/member', icon: CalendarCheck, tabId: 'coach' },
  { label: 'Trackers', path: '/member', icon: Activity, tabId: 'trackers' },
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
  { label: 'Assessment Library', path: '/healthplan/assessments', icon: ClipboardList },
  { label: 'Profile', path: '/healthplan/profile', icon: Building2 },
];

const internalNav: NavItem[] = [
  { label: 'Home', path: '/internal', icon: Home },
  { label: 'Admins', path: '/internal/admins', icon: Users },
];

const navByRole: Record<UserRole, NavItem[]> = {
  member: memberNav,
  cbo: cboNav,
  healthplan: healthplanNav,
  internal: internalNav,
};

export function Sidebar({ isOpen, onClose, onMemberTabChange, activeMemberTab }: SidebarProps) {
  const { currentRole, activeDemoMemberId, setActiveDemoMemberId } = useApp();
  const location = useLocation();
  const navItems = navByRole[currentRole];
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const activeDemoMember = demoMembers.find(m => m.id === activeDemoMemberId) || demoMembers[0];

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
          'fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto flex flex-col',
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
        <div className={cn(
          "hidden lg:flex items-center gap-3 p-4 border-b border-sidebar-border",
          (currentRole === 'member' || currentRole === 'internal') && "bg-white rounded-md mx-3 mt-3 mb-1 border-none"
        )}>
          {currentRole === 'cbo' ? (
            <img 
              src={laFoodBankLogo} 
              alt="LA Regional Food Bank" 
              className="h-12 object-contain"
            />
          ) : currentRole === 'healthplan' ? (
            <img 
              src={umojaLogoLight} 
              alt="Umoja Food For Health" 
              className="h-10 object-contain"
            />
          ) : (
            <img 
              src={hcscLogo} 
              alt="HCSC" 
              className="h-10 object-contain"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1">
          {navItems.map((item) => {
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

        {/* Member Switcher - only for member role */}
        {currentRole === 'member' && (
          <div className="p-3 border-t border-sidebar-border">
            <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
              <PopoverTrigger asChild>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors text-left">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {activeDemoMember.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activeDemoMember.name}</p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">{activeDemoMember.label}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-sidebar-foreground/60 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="top" align="start" className="w-56 p-1">
                <p className="text-xs font-medium text-muted-foreground px-3 py-2">Switch Demo Member</p>
                {demoMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveDemoMemberId(m.id);
                      setSwitcherOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm hover:bg-muted transition-colors',
                      m.id === activeDemoMemberId && 'bg-muted font-medium'
                    )}
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                    </div>
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        )}
      </aside>
    </>
  );
}
