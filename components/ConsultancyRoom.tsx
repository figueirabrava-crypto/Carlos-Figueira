
import React, { useState, useRef, useEffect } from 'react';
import { Subject, ChatMessage, AccessibilityConfig } from '../types';
import { geminiService } from '../services/geminiService';
import { geminiLiveService } from '../services/geminiLiveService';
import { audioService } from '../services/audioService';
import { CHARACTERS } from '../constants';

interface ConsultancyRoomProps {
  subject: Subject;
  a11y: AccessibilityConfig;
}

export const ConsultancyRoom: React.FC<ConsultancyRoomProps> = ({ subject, a11y }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [liveStatus, setLiveStatus] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const tutor = subject === Subject.AIA ? CHARACTERS.GAIA : CHARACTERS.SOFIA;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 0) {
      const welcome = a11y.simplifiedLanguage 
        ? `Oi! Sou a Professora ${tutor.name}. Estou aqui para te ajudar a entender tudo sobre ${subject} de um jeito fácil. O que você quer descobrir hoje?`
        : `SESSÃO DE MENTORIA ATIVA: Dra. ${tutor.name} pronta para análise. \n\nEstamos focados no módulo de ${subject}. Como posso guiar seu raciocínio jurídico-ambiental hoje?`;
      
      setMessages([{ role: 'model', text: welcome, tutor: tutor.name }]);
    }
  }, [messages, subject, a11y.simplifiedLanguage]);

  const toggleLive = async () => {
    await audioService.resume();
    if (isLive) {
      geminiLiveService.disconnect();
      setIsLive(false);
      setLiveStatus('');
    } else {
      setIsLive(true);
      await geminiLiveService.connect(subject, (text, role) => {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.role === role && last.text.includes(text)) return prev;
          return [...prev, { role, text, tutor: role === 'model' ? tutor.name : undefined }];
        });
      }, setLiveStatus);
    }
  };

  const handleSend = async (customText?: string) => {
    if (isLive) return;
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;
    
    setInput('');
    setIsLoading(true);
    geminiService.stop();
    audioService.playClick();

    const newMessages = [...messages, { role: 'user', text: textToSend } as ChatMessage];
    setMessages(newMessages);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await geminiService.analyzeConsultancy(textToSend, subject, history, a11y);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text, 
        tutor: tutor.name,
        grounding: response.grounding
      }]);

      if (a11y.voiceGuidance) {
        await geminiService.speak(response.text);
      }

    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Conexão interrompida. Por favor, tente reformular sua dúvida pedagógica.", tutor: tutor.name }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-250px)] md:h-[780px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border ${a11y.highContrast ? 'border-yellow-400 border-4' : 'border-slate-200 dark:border-slate-800'} relative`}>
      
      {/* Indicador Live */}
      {isLive && (
        <div className="absolute top-16 left-0 right-0 z-20 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 px-6 flex justify-between items-center animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
            <span>{liveStatus}</span>
          </div>
          <button onClick={toggleLive} className="bg-white/20 px-3 py-1 rounded-full text-[9px] hover:bg-white/30 transition-all">Encerrar Voz</button>
        </div>
      )}

      {/* Header da Sala */}
      <div className="px-6 py-5 bg-slate-900 flex items-center justify-between border-b border-slate-800 z-30">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`}></div>
          <span className="mono text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {isLive ? 'SESSÃO_VOZ_ATIVA' : 'AMBIENTE_DE_ENSINO_MEDIADO'}
          </span>
        </div>
        <button 
          onClick={toggleLive}
          className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${
            isLive ? 'bg-red-600 text-white scale-105' : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
          aria-label="Conversar por voz com a mentora"
        >
          <i className={`fas ${isLive ? 'fa-stop-circle' : 'fa-microphone'} mr-2`}></i>
          {isLive ? 'Parar Fala' : 'Falar com Mentora'}
        </button>
      </div>

      {/* Perfil Mentora */}
      <div className="p-6 flex items-center space-x-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-md border border-slate-200 dark:border-slate-700 transform -rotate-2">
          {tutor.avatar}
        </div>
        <div>
          <h3 className="font-black text-lg uppercase text-slate-800 dark:text-slate-100 leading-none mb-1">Dra. {tutor.name}</h3>
          <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">{tutor.specialty}</p>
        </div>
      </div>

      {/* Histórico de Mentoria */}
      <div className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar bg-slate-50/30 dark:bg-slate-950/20">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-3 duration-500`}>
            <div className={`max-w-[85%] md:max-w-[75%] p-6 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-slate-800 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none'
            } ${a11y.highContrast && m.role === 'model' ? 'border-indigo-500 border-4' : ''}`}>
              <div className={`leading-relaxed whitespace-pre-wrap font-medium ${a11y.simplifiedLanguage ? 'text-xl' : 'text-sm md:text-base'}`}>
                {m.text}
              </div>
              {m.grounding && m.grounding.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-3 tracking-widest">Base Legal & Referências:</p>
                  <div className="flex flex-wrap gap-2">
                    {m.grounding.map((chunk, idx) => chunk.web && (
                      <a key={idx} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-lg border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-100 transition-colors flex items-center">
                        <i className="fas fa-external-link-alt mr-2 text-[8px]"></i> {chunk.web.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl flex items-center space-x-4 border border-dashed border-slate-300 dark:border-slate-700">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="mono text-[10px] text-slate-500 uppercase font-black tracking-widest">Aguardando análise da mentora...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Estudo */}
      <div className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        {isLive ? (
          <div className="h-14 flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-1.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ height: `${Math.random() * 25 + 15}px`, animationDelay: `${i * 0.08}s` }}></div>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Canal de Voz Aberto</span>
          </div>
        ) : (
          <div className="flex items-center bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden focus-within:border-emerald-500 transition-all shadow-inner">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua dúvida ou peça para analisar um caso..."
              className="flex-grow bg-transparent border-none focus:ring-0 px-6 h-14 text-sm font-semibold placeholder:text-slate-400"
              aria-label="Mensagem para a mentora"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="bg-slate-900 dark:bg-emerald-600 text-white px-8 h-14 flex items-center justify-center hover:bg-black dark:hover:bg-emerald-500 transition-all disabled:opacity-20 active:scale-95"
              aria-label="Enviar"
            >
              <i className={`fas ${isLoading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
