import { useState, useEffect } from 'react';

const DARK_MODE_KEY = 'weekly-planner-dark-mode';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev: boolean) => !prev);

  return { isDark, toggleDarkMode };
};
