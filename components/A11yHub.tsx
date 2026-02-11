
import React from 'react';
import { AccessibilityConfig } from '../types';

interface A11yHubProps {
  config: AccessibilityConfig;
  onChange: (config: AccessibilityConfig) => void;
}

export const A11yHub: React.FC<A11yHubProps> = ({ config, onChange }) => {
  const toggle = (key: keyof AccessibilityConfig) => {
    onChange({ ...config, [key]: !config[key] });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <i className="fas fa-universal-access text-indigo-500"></i>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ambiente de Inclusão</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => toggle('simplifiedLanguage')}
          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
            config.simplifiedLanguage ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800'
          }`}
        >
          <i className="fas fa-feather text-lg"></i>
          <span className="text-[9px] font-black uppercase">Linguagem Simples</span>
          <p className="text-[8px] text-slate-500">Exclui jargões complexos</p>
        </button>

        <button 
          onClick={() => toggle('voiceGuidance')}
          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
            config.voiceGuidance ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-slate-100 dark:border-slate-800'
          }`}
        >
          <i className="fas fa-comment-dots text-lg"></i>
          <span className="text-[9px] font-black uppercase">Guia por Voz</span>
          <p className="text-[8px] text-slate-500">Narração ativa de tela</p>
        </button>

        <button 
          onClick={() => toggle('highContrast')}
          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center space-y-2 ${
            config.highContrast ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-slate-100 dark:border-slate-800'
          }`}
        >
          <i className="fas fa-eye text-lg"></i>
          <span className="text-[9px] font-black uppercase">Alto Contraste</span>
          <p className="text-[8px] text-slate-500">Legibilidade máxima</p>
        </button>
      </div>
    </div>
  );
};
