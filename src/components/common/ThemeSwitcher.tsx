'use client';

import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('integr8');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'integr8';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'integr8' ? 'integr8dark' : 'integr8';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) return null;

  const isDark = theme === 'integr8dark';

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <Icon name="SunIcon" className="h-5 w-5" />
      ) : (
        <Icon name="MoonIcon" className="h-5 w-5" />
      )}
    </button>
  );
}
