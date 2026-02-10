
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { audioService } from '../services/audioService';

interface NarratorProps {
  text: string;
}

export const Narrator: React.FC<NarratorProps> = ({ text }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');

  const handleSpeak = async () => {
    // Primeiro gesto do usuário: Resumir áudio imediatamente
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
      
      // Resetar status após um tempo razoável ou detecção de fim de áudio (se disponível)
      // Em uma implementação real, poderíamos usar eventos do AudioContext
      setTimeout(() => {
        setStatus(current => current === 'playing' ? 'idle' : current);
      }, 15000); 
    } catch (e) {
      console.error("Narrator error:", e);
      setStatus('idle');
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={`fixed bottom-6 right-6 p-5 rounded-full shadow-2xl transition-all flex items-center justify-center z-[100] ${
        status === 'playing' 
          ? 'bg-purple-600 scale-110 shadow-purple-500/50' 
          : status === 'loading'
            ? 'bg-purple-400 animate-pulse'
            : 'bg-purple-600 hover:bg-purple-700 hover:scale-110 active:scale-95'
      } text-white`}
      aria-label={status === 'playing' ? "Parar narração" : "Ouvir explicação da facilitadora"}
    >
      {status === 'playing' ? (
        <div className="flex items-center space-x-1.5 h-6">
          <div className="w-1.5 h-full bg-white animate-bounce"></div>
          <div className="w-1.5 h-3 bg-white animate-bounce delay-75"></div>
          <div className="w-1.5 h-5 bg-white animate-bounce delay-150"></div>
          <div className="w-1.5 h-2 bg-white animate-bounce delay-300"></div>
        </div>
      ) : status === 'loading' ? (
        <i className="fas fa-spinner fa-spin text-xl"></i>
      ) : (
        <i className="fas fa-comment-dots text-2xl"></i>
      )}
      
      {status === 'idle' && (
        <div className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-[10px] px-3 py-1.5 rounded-xl font-black whitespace-nowrap opacity-0 md:opacity-100 transition-opacity pointer-events-none shadow-xl">
          OUVIR EXPLICAÇÃO
        </div>
      )}
    </button>
  );
};
