import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, members as initialMembers, enrollments as initialEnrollments, Member, Enrollment } from '@/lib/mockData';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  enrollments: Enrollment[];
  setEnrollments: React.Dispatch<React.SetStateAction<Enrollment[]>>;
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  selectedProgramId: string | null;
  setSelectedProgramId: (id: string | null) => void;
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
  currentDemoStep: number;
  setCurrentDemoStep: (step: number) => void;
  activeDemoMemberId: string;
  setActiveDemoMemberId: (id: string) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('member');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [currentDemoStep, setCurrentDemoStep] = useState(1);
  const [activeDemoMemberId, setActiveDemoMemberId] = useState('mem-001');

  const resetDemoData = () => {
    setMembers([...initialMembers]);
    setEnrollments([...initialEnrollments]);
    setSelectedMemberId(null);
    setSelectedProgramId(null);
    setCurrentDemoStep(1);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        members,
        setMembers,
        enrollments,
        setEnrollments,
        selectedMemberId,
        setSelectedMemberId,
        selectedProgramId,
        setSelectedProgramId,
        demoMode,
        setDemoMode,
        currentDemoStep,
        setCurrentDemoStep,
        activeDemoMemberId,
        setActiveDemoMemberId,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
