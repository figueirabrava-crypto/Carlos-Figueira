
import React from 'react';
import { audioService } from '../services/audioService';

export const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const handleBack = () => {
    audioService.playClick();
    onBack?.();
  };

  return (
    <header className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 sticky top-0 z-[60] h-20 md:h-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6">
          {onBack && (
            <button 
              onClick={handleBack}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 rounded-xl transition-all text-emerald-600 dark:text-emerald-400 shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => !onBack && window.location.reload()}>
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border-4 border-emerald-500 rounded-xl bg-slate-900 shadow-lg shrink-0">
              <span className="font-black text-lg md:text-xl text-white tracking-tighter">zé</span>
            </div>
            <div>
              <h1 className="font-black text-base md:text-xl text-slate-900 dark:text-white tracking-tighter leading-none uppercase">Bio-Command</h1>
              <p className="text-[8px] md:text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em] mt-1">Terminal de Apoio • IFAL</p>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-[8px] text-slate-400 uppercase tracking-[0.3em] font-black mb-1">Status do Servidor</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="mono text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Online_AES_256</p>
          </div>
        </div>
      </div>
    </header>
  );
};
