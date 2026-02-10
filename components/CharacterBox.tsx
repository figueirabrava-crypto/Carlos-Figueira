
import React from 'react';
import { Facilitator } from '../types';

export const CharacterBox: React.FC<{ facilitator: Facilitator }> = ({ facilitator }) => {
  // Mapeamento explícito para evitar que o Tailwind remova as classes dinâmicas
  const colorStyles = facilitator.color === 'emerald' 
    ? {
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-100 dark:border-emerald-800',
        text: 'text-emerald-600 dark:text-emerald-400',
        avatarBorder: 'border-emerald-400'
      }
    : {
        bg: 'bg-indigo-50 dark:bg-indigo-900/10',
        border: 'border-indigo-100 dark:border-indigo-800',
        text: 'text-indigo-600 dark:text-indigo-400',
        avatarBorder: 'border-indigo-400'
      };

  return (
    <div className={`${colorStyles.bg} ${colorStyles.border} border p-5 md:p-6 rounded-[2rem] flex items-center space-x-4 md:space-x-6 animate-in slide-in-from-left duration-700 shadow-sm`}>
      <div className={`text-4xl md:text-5xl bg-white dark:bg-gray-800 p-3 rounded-full shadow-md border-2 md:border-4 ${colorStyles.avatarBorder} flex-shrink-0 flex items-center justify-center w-16 h-16 md:w-20 md:h-20`}>
        {facilitator.avatar}
      </div>
      <div className="min-w-0">
        <h4 className="text-lg md:text-xl font-black text-gray-900 dark:text-white truncate">{facilitator.name}</h4>
        <p className={`text-[10px] md:text-xs font-bold ${colorStyles.text} mb-0.5 uppercase tracking-[0.2em]`}>{facilitator.role}</p>
        <p className="text-[11px] md:text-xs text-gray-500 dark:text-gray-400 italic line-clamp-2 leading-tight">"{facilitator.bio}"</p>
      </div>
    </div>
  );
};
