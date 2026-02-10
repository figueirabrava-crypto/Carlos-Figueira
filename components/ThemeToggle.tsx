
import React from 'react';
import { Theme } from '../types';
import { audioService } from '../services/audioService';

export const ThemeToggle: React.FC<{ theme: Theme; setTheme: (t: Theme) => void }> = ({ theme, setTheme }) => {
  const toggle = () => {
    audioService.playClick();
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <button
      onClick={toggle}
      className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 text-gray-800 dark:text-yellow-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg border border-gray-200 dark:border-gray-800 z-[60]"
      aria-label="Alternar modo dia e noite"
    >
      <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-xl`}></i>
    </button>
  );
};
