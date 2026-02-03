import { useState, useEffect, useCallback } from 'react';

export interface FoodEntry {
  id: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  description: string;
  timestamp: string;
}

const STORAGE_KEY = 'umoja-food-diary';

export function useFoodDiary() {
  const [entries, setEntries] = useState<FoodEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry: Omit<FoodEntry, 'id' | 'timestamp'>) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: `food-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setEntries(prev => [newEntry, ...prev]);
    return newEntry;
  }, []);

  const getEntriesByDate = useCallback((date: string) => {
    return entries.filter(e => e.date === date);
  }, [entries]);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const clearEntries = useCallback(() => {
    setEntries([]);
  }, []);

  return {
    entries,
    addEntry,
    getEntriesByDate,
    deleteEntry,
    clearEntries,
  };
}
