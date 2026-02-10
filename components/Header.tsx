
import React from 'react';
import { audioService } from '../services/audioService';

export const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const handleBack = () => {
    audioService.playClick();
    onBack?.();
  };

  return (
    <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-900 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {onBack && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-2xl transition-all text-purple-600 dark:text-purple-400 shadow-sm"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => !onBack && window.location.reload()}>
            <div className="relative w-14 h-14 flex items-center justify-center border-[3px] border-purple-600 dark:border-purple-500 rounded-full shadow-inner bg-white dark:bg-gray-800">
              <span className="font-black text-2xl text-black dark:text-white tracking-tighter">zé</span>
              <span className="absolute -bottom-1 -right-1 bg-purple-600 text-white border-2 border-white dark:border-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-[10px] font-black">R</span>
            </div>
            <div>
              <h1 className="font-black text-2xl text-gray-900 dark:text-white tracking-tighter leading-none">BioInterativo</h1>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-black uppercase tracking-widest mt-1">IFAL Maceió • Licenciatura</p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col items-end">
          <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-black mb-1">Idealizadores</p>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs">
              <i className="fas fa-users-rays"></i>
            </div>
            <p className="text-base font-black text-gray-800 dark:text-gray-200">Figueirabrava & BioInterativo AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};
