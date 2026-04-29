import { useState, useEffect } from 'react';
import { Task } from '../utils/helpers';

export const useLocalStorage = (key, initialValue) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      const tasksData = JSON.parse(saved);
      return tasksData.map(t => new Task(t.id, t.text, t.completed, t.priority, t.createdAt));
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [key, tasks]);

  return [tasks, setTasks];
};