
import React from 'react';
import { audioService } from '../services/audioService';
import { SUBJECTS_DATA } from '../constants';
import { Subject } from '../types';

interface SubjectCardProps {
  title: Subject;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, icon, color, onClick }) => {
  const facilitator = SUBJECTS_DATA[title].facilitator;

  const handleClick = () => {
    audioService.playClick();
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="group bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 text-left flex flex-col active:scale-95"
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white text-xl shadow-lg group-hover:rotate-6 transition-transform`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-700">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{facilitator.name}</span>
           <span className="text-xl">{facilitator.avatar}</span>
        </div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase leading-tight">
        {title}
      </h3>
      
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-8 flex-grow leading-relaxed font-medium">
        {description}
      </p>
      
      <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] text-[9px]">
        <span>Iniciar Terminal</span>
        <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
      </div>
    </button>
  );
};
