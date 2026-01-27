import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { DemoPanel } from '@/components/demo/DemoPanel';
import { useApp } from '@/contexts/AppContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onEducationClick?: () => void;
  onMemberTabChange?: (tab: string) => void;
  activeMemberTab?: string;
}

export function DashboardLayout({ children, onEducationClick, onMemberTabChange, activeMemberTab }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { demoMode } = useApp();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onMemberTabChange={onMemberTabChange}
          activeMemberTab={activeMemberTab}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} onEducationClick={onEducationClick} />
          
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Demo Panel */}
      {demoMode && <DemoPanel />}
    </div>
  );
}
