
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { audioService } from '../services/audioService';

interface NarratorProps {
  text: string;
}

export const Narrator: React.FC<NarratorProps> = ({ text }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');

  const handleSpeak = async () => {
    await audioService.resume();
    
    if (status !== 'idle') {
      await geminiService.stop();
      setStatus('idle');
      return;
    }
    
    setStatus('loading');
    audioService.playClick();
    try {
      await geminiService.speak(text);
      setStatus('playing');
      
      setTimeout(() => {
        setStatus(current => current === 'playing' ? 'idle' : current);
      }, 10000); 
    } catch (e) {
      setStatus('idle');
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={`fixed bottom-6 left-6 p-4 rounded-full shadow-2xl transition-all flex items-center justify-center z-[100] ${
        status === 'playing' 
          ? 'bg-emerald-600 scale-110' 
          : 'bg-slate-900 hover:bg-black'
      } text-white border-2 border-white/20`}
      aria-label="Assistente de voz para acessibilidade"
      title="Ativar guia de voz"
    >
      <i className={`fas ${status === 'playing' ? 'fa-stop' : 'fa-headset'} text-xl`}></i>
      {status === 'idle' && (
        <div className="absolute left-14 bg-slate-900 text-white text-[9px] px-3 py-1.5 rounded-lg font-black whitespace-nowrap opacity-0 md:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
          GUIA DE ACESSIBILIDADE
        </div>
      )}
    </button>
  );
};
