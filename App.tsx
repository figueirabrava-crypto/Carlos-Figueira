
import React, { useState, useMemo, useEffect } from 'react';
import { Subject, Theme, AccessibilityConfig } from './types';
import { SUBJECTS_DATA, INTEGRATED_CASES } from './constants';
import { Header } from './components/Header';
import { SubjectCard } from './components/SubjectCard';
import { QuizGame } from './components/QuizGame';
import { Narrator } from './components/Narrator';
import { ThemeToggle } from './components/ThemeToggle';
import { ConsultancyRoom } from './components/ConsultancyRoom';
import { A11yHub } from './components/A11yHub';
import { ConceptMap } from './components/ConceptMap';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [view, setView] = useState<'syllabus' | 'game' | 'consultancy'>('consultancy');
  const [theme, setTheme] = useState<Theme>('light');
  
  const [a11y, setA11y] = useState<AccessibilityConfig>({
    simplifiedLanguage: false,
    highContrast: false,
    voiceGuidance: true
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    
    if (a11y.highContrast) {
      root.classList.add('contrast-high');
    } else {
      root.classList.remove('contrast-high');
    }
  }, [theme, a11y.highContrast]);

  const subjectData = useMemo(() => {
    return selectedSubject ? SUBJECTS_DATA[selectedSubject] : null;
  }, [selectedSubject]);

  const handleStart = async () => {
    await audioService.resume();
    audioService.playClick();
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative border border-slate-800 text-center">
          <div className="w-20 h-20 mx-auto mb-10 flex items-center justify-center border-4 border-emerald-500 rounded-2xl bg-black">
            <span className="font-black text-4xl text-white tracking-tighter">zé</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">Bio-Command</h1>
          <p className="text-slate-500 mb-12 font-bold uppercase text-[8px] tracking-[0.4em]">Plataforma de Ensino Inclusivo</p>
          <button onClick={handleStart} className="w-full bg-emerald-600 text-white font-black py-5 rounded-xl hover:bg-emerald-500 transition-all shadow-xl text-xs uppercase tracking-widest">Acessar Laboratório</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 md:pb-0">
      <Header onBack={selectedSubject ? () => setSelectedSubject(null) : undefined} />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10 max-w-6xl">
        {!selectedSubject ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-2">Terminais de Estudo</h2>
                <p className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">IFAL Maceió • Ciência e Acessibilidade</p>
              </div>
              <div className="flex space-x-4">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>

            <A11yHub config={a11y} onChange={setA11y} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SubjectCard title={Subject.AIA} description={SUBJECTS_DATA[Subject.AIA].description} icon="fa-leaf" color="bg-emerald-600" onClick={() => { setSelectedSubject(Subject.AIA); setView('consultancy'); }} />
              <SubjectCard title={Subject.BIOETHICS} description={SUBJECTS_DATA[Subject.BIOETHICS].description} icon="fa-scale-balanced" color="bg-indigo-600" onClick={() => { setSelectedSubject(Subject.BIOETHICS); setView('consultancy'); }} />
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
               <div className="flex items-center space-x-3 mb-8">
                 <i className="fas fa-chalkboard-teacher text-indigo-500"></i>
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Casos de Estudo Integrados</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INTEGRATED_CASES.map(c => (
                    <div key={c.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-300 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-base">{c.title}</h4>
                        <span className="text-[7px] bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 px-2 py-1 rounded font-black uppercase tracking-tighter">{c.subject}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{c.description}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Tabs de Navegação */}
            <div className="sticky top-24 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md py-2">
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <button onClick={() => setView('consultancy')} className={`flex-grow py-3 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${view === 'consultancy' ? 'bg-slate-900 dark:bg-emerald-600 text-white' : 'text-slate-400'}`}>Mentoria</button>
                <button onClick={() => setView('syllabus')} className={`flex-grow py-3 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${view === 'syllabus' ? 'bg-slate-900 dark:bg-emerald-600 text-white' : 'text-slate-400'}`}>Estudo</button>
                <button onClick={() => setView('game')} className={`flex-grow py-3 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${view === 'game' ? 'bg-slate-900 dark:bg-emerald-600 text-white' : 'text-slate-400'}`}>Avaliação</button>
              </div>
            </div>

            {view === 'consultancy' ? (
              <ConsultancyRoom subject={selectedSubject} a11y={a11y} />
            ) : view === 'syllabus' ? (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {subjectData?.syllabus.map((section, idx) => (
                    <section key={idx} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                      <h3 className="text-2xl font-black mb-6 tracking-tight uppercase border-b-2 border-emerald-500 pb-4 inline-block">{section.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 font-medium">{section.content}</p>
                      
                      {section.conceptMap && (
                        <div className="mb-8">
                          <ConceptMap nodes={section.conceptMap} />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-emerald-600">Pilares do Conceito:</p>
                          <div className="flex flex-wrap gap-2">
                            {section.keyPoints.map((p, i) => <span key={i} className="bg-slate-50 dark:bg-slate-800 text-slate-500 px-3 py-1.5 rounded-lg text-[9px] font-bold border border-slate-200 dark:border-slate-700">{p}</span>)}
                          </div>
                        </div>
                        {section.legalFramework && (
                          <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase text-amber-600">Referencial Normativo:</p>
                            <div className="flex flex-wrap gap-2">
                              {section.legalFramework.map((l, i) => <span key={i} className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg text-[9px] font-black border border-amber-100 dark:border-amber-800">{l}</span>)}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
                <div className="space-y-8">
                  <div className="bg-indigo-600 text-white p-8 rounded-[2rem] shadow-xl">
                    <h5 className="font-black text-lg mb-4 tracking-tight uppercase">Dica Pedagógica</h5>
                    <p className="text-xs text-indigo-100 leading-relaxed font-medium">Use o modo "Guia por Voz" se preferir ouvir as leis enquanto faz suas anotações. A Dra. Sofia pode ler as resoluções do CFBio para você.</p>
                  </div>
                  {subjectData?.curiosities.map((cur, i) => (
                    <div key={i} className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                      <i className={`fas ${cur.icon} absolute -right-4 -bottom-4 text-6xl opacity-5`}></i>
                      <h5 className="font-black text-lg mb-4 tracking-tight">{cur.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{cur.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <QuizGame questions={subjectData?.quiz || []} onComplete={() => setView('consultancy')} />
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-900 py-16 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400 mb-4">IFAL Maceió • Biologia • Ensino para Todos</p>
        <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Acessibilidade Ativa • Bio-Command v6.0</p>
      </footer>

      <Narrator text="Painel de Ensino Bio-Command Ativo. Utilize o menu de acessibilidade para personalizar sua experiência de aprendizado." />
    </div>
  );
};

export default App;
