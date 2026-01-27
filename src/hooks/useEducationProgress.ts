import { useState, useEffect } from 'react';

const STORAGE_KEY = 'education-completed-modules';

const MODULES = [
  'general-nutrition',
  'reading-nutrition-label', 
  'budget-friendly-meals',
] as const;

export type ModuleId = typeof MODULES[number];

export function useEducationProgress() {
  const [completedModules, setCompletedModules] = useState<Set<ModuleId>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ModuleId[];
        setCompletedModules(new Set(parsed));
      } catch {
        // Invalid data, start fresh
      }
    }
  }, []);

  const markComplete = (moduleId: ModuleId) => {
    setCompletedModules(prev => {
      const next = new Set(prev);
      next.add(moduleId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const isComplete = (moduleId: ModuleId) => completedModules.has(moduleId);

  const totalModules = MODULES.length;
  const completedCount = completedModules.size;
  const progressPercent = (completedCount / totalModules) * 100;

  return {
    completedModules,
    markComplete,
    isComplete,
    totalModules,
    completedCount,
    progressPercent,
  };
}