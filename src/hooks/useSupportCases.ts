import { useState, useEffect, useCallback } from 'react';

export interface SupportCase {
  caseNumber: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

const STORAGE_KEY = 'umoja-support-cases';

export function useSupportCases() {
  const [cases, setCases] = useState<SupportCase[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  }, [cases]);

  const addCase = useCallback((caseData: Omit<SupportCase, 'status' | 'createdAt'>) => {
    const newCase: SupportCase = {
      ...caseData,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setCases(prev => [newCase, ...prev]);
    return newCase;
  }, []);

  const clearCases = useCallback(() => {
    setCases([]);
  }, []);

  return {
    cases,
    addCase,
    clearCases,
    caseCount: cases.length,
  };
}
