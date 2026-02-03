import { useState, useEffect, useCallback } from 'react';

export interface ActivityEntry {
  id: string;
  date: string;
  activityType: string;
  duration: number; // minutes
  steps?: number;
  notes?: string;
  timestamp: string;
}

const STORAGE_KEY = 'umoja-activity-log';

export function useActivityTracker() {
  const [activities, setActivities] = useState<ActivityEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  const addActivity = useCallback((activity: Omit<ActivityEntry, 'id' | 'timestamp'>) => {
    const newActivity: ActivityEntry = {
      ...activity,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [newActivity, ...prev]);
    return newActivity;
  }, []);

  const getActivitiesByDate = useCallback((date: string) => {
    return activities.filter(a => a.date === date);
  }, [activities]);

  const deleteActivity = useCallback((id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  }, []);

  const getTotalMinutesByDate = useCallback((date: string) => {
    return activities
      .filter(a => a.date === date)
      .reduce((sum, a) => sum + a.duration, 0);
  }, [activities]);

  const getTotalStepsByDate = useCallback((date: string) => {
    return activities
      .filter(a => a.date === date)
      .reduce((sum, a) => sum + (a.steps || 0), 0);
  }, [activities]);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  return {
    activities,
    addActivity,
    getActivitiesByDate,
    deleteActivity,
    getTotalMinutesByDate,
    getTotalStepsByDate,
    clearActivities,
  };
}
