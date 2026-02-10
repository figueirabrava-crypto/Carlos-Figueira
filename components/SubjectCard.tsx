
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
      className="group bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 text-left relative overflow-hidden h-full flex flex-col active:scale-95"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full transition-all duration-700 group-hover:scale-150 ${color} opacity-10`}></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-6 transition-transform`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Facilitadora</span>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{facilitator.name}</span>
            <span className="text-xl">{facilitator.avatar}</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3 leading-tight">
        {title}
      </h3>
      
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-8 flex-grow leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center text-purple-600 dark:text-purple-400 font-black uppercase tracking-widest text-[10px] group-hover:translate-x-2 transition-transform">
        <span>Acessar Disciplina</span>
        <i className="fas fa-arrow-right-long ml-3"></i>
      </div>
    </button>
  );
};
