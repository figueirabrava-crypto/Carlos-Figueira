
import React, { useState, useMemo, useEffect } from 'react';
import { Subject, Theme } from './types';
import { SUBJECTS_DATA, CHARACTERS, INTEGRATED_CASES, DAILY_LIFE_BIOLOGY } from './constants';
import { Header } from './components/Header';
import { SubjectCard } from './components/SubjectCard';
import { QuizGame } from './components/QuizGame';
import { Narrator } from './components/Narrator';
import { ThemeToggle } from './components/ThemeToggle';
import { CharacterBox } from './components/CharacterBox';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [view, setView] = useState<'syllabus' | 'game' | 'flash-game' | 'cases'>('syllabus');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const subjectData = useMemo(() => {
    return selectedSubject ? SUBJECTS_DATA[selectedSubject] : null;
  }, [selectedSubject]);

  const narrationText = useMemo(() => {
    if (view === 'cases') return "Este é o seu Dossiê de Campo Profissional. Aqui analisamos fatos reais que moldaram as leis ambientais e os marcos éticos que você deve seguir como biólogo licenciando do IFAL.";
    if (view === 'flash-game') return "Iniciando o Desafio Bio-Flash! Pense rápido: AIA ou Bioética? Este game integra as duas matérias para testar sua prontidão técnica.";
    if (!selectedSubject) return "Bem-vindo ao Painel BioInterativo IFAL Maceió. Estude os dossiês de casos reais ou vá direto para os simuladores técnicos no menu de acesso rápido abaixo.";
    return `Módulo de ${selectedSubject}. Analise a ementa profissional e as curiosidades que aproximam a ciência do nosso dia a dia.`;
  }, [selectedSubject, view]);

  const handleStart = async () => {
    await audioService.resume();
    audioService.playClick();
    setHasStarted(true);
  };

  const handleBack = () => {
    audioService.playClick();
    if (view !== 'syllabus' || selectedSubject !== null) {
      if (view === 'game' || view === 'flash-game' || view === 'cases') {
        setView('syllabus');
        setQuizScore(null);
        if (view === 'cases' || view === 'flash-game') setSelectedSubject(null);
      } else {
        setSelectedSubject(null);
      }
    }
  };

  const jumpToQuiz = (s: Subject) => {
    audioService.playClick();
    setSelectedSubject(s);
    setView('game');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-indigo-900 to-black flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 shadow-2xl animate-in zoom-in duration-700 border-4 border-emerald-500/20">
          <div className="relative w-28 h-28 mx-auto mb-10 flex items-center justify-center border-4 border-emerald-600 rounded-full bg-white dark:bg-gray-800 shadow-2xl transform hover:rotate-12 transition-transform">
            <span className="font-black text-5xl text-black dark:text-white tracking-tighter">zé</span>
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white border-2 border-white dark:border-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-black">R</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">BioInterativo</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-12 font-bold uppercase text-[10px] tracking-[0.2em] leading-relaxed">
            IFAL Maceió • Biologia Profissional<br/>
            <span className="text-emerald-600">AIA & Bioética em Foco</span>
          </p>
          <button onClick={handleStart} className="w-full bg-emerald-600 text-white font-black py-6 rounded-[2rem] hover:bg-emerald-700 transition-all shadow-xl text-lg uppercase tracking-widest active:scale-95">ACESSAR AMBIENTE</button>
          <p className="mt-10 text-[9px] text-gray-400 uppercase tracking-widest font-black">Idealizador: Figueirabrava</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Header onBack={(selectedSubject || view !== 'syllabus') ? handleBack : undefined} />
      
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-end mt-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {(!selectedSubject && view === 'syllabus') ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Seção de Acesso Direto (Simuladores e Dossiês) */}
            <div className="mb-16 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-purple-600 to-indigo-600">Bio-Dashboard</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                <button onClick={() => setView('cases')} className="group bg-indigo-600 text-white p-10 rounded-[3rem] shadow-xl hover:scale-105 transition-all text-left relative overflow-hidden">
                  <i className="fas fa-file-shield absolute -right-6 -bottom-6 text-8xl opacity-20 group-hover:rotate-12 transition-transform"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-80">Prática Profissional</span>
                  <h3 className="text-2xl font-black leading-tight">DOSSIÊ DE<br/>CASOS REAIS</h3>
                </button>
                <button onClick={() => jumpToQuiz(Subject.AIA)} className="group bg-emerald-500 text-white p-10 rounded-[3rem] shadow-xl hover:scale-105 transition-all text-left relative overflow-hidden">
                  <i className="fas fa-microscope absolute -right-6 -bottom-6 text-8xl opacity-20 group-hover:rotate-12 transition-transform"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-80">Simulado Técnico</span>
                  <h3 className="text-2xl font-black leading-tight">SIMULADOR<br/>AIA</h3>
                </button>
                <button onClick={() => jumpToQuiz(Subject.BIOETHICS)} className="group bg-indigo-500 text-white p-10 rounded-[3rem] shadow-xl hover:scale-105 transition-all text-left relative overflow-hidden">
                  <i className="fas fa-scale-balanced absolute -right-6 -bottom-6 text-8xl opacity-20 group-hover:rotate-12 transition-transform"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-80">Legal & Ético</span>
                  <h3 className="text-2xl font-black leading-tight">SIMULADOR<br/>BIOÉTICA</h3>
                </button>
                <button onClick={() => setView('flash-game')} className="group bg-purple-600 text-white p-10 rounded-[3rem] shadow-xl hover:scale-105 transition-all text-left relative overflow-hidden">
                  <i className="fas fa-bolt absolute -right-6 -bottom-6 text-8xl opacity-20 group-hover:rotate-12 transition-transform"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-2 opacity-80">Game Integrado</span>
                  <h3 className="text-2xl font-black leading-tight">DESAFIO<br/>BIO-FLASH</h3>
                </button>
              </div>

              {/* Seção Cotidiano do Biólogo - APRIMORADA */}
              <div className="mb-20">
                 <div className="flex items-center justify-between mb-8 px-4">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center">
                       <i className="fas fa-dna mr-3 text-emerald-500"></i>
                       Biologia no Cotidiano
                    </h4>
                    <span className="h-px flex-grow bg-gray-200 dark:bg-gray-800 mx-6"></span>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {DAILY_LIFE_BIOLOGY.map((item, i) => (
                     <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 text-left hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group">
                        <div className="flex items-center space-x-4 mb-5">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <i className={`fas ${item.icon} text-xl`}></i>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.discipline}</span>
                        </div>
                        <h5 className="font-black text-lg mb-3 leading-tight">{item.title}</h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{item.content}</p>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
            
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 px-4">Trilhas Principais de Estudo Acadêmico</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              <SubjectCard title={Subject.AIA} description={SUBJECTS_DATA[Subject.AIA].description} icon="fa-leaf" color="bg-emerald-500" onClick={() => setSelectedSubject(Subject.AIA)} />
              <SubjectCard title={Subject.BIOETHICS} description={SUBJECTS_DATA[Subject.BIOETHICS].description} icon="fa-scale-balanced" color="bg-indigo-500" onClick={() => setSelectedSubject(Subject.BIOETHICS)} />
            </div>

            <div className="bg-white dark:bg-gray-900 p-12 rounded-[4rem] shadow-2xl border border-gray-100 dark:border-gray-800">
               <h4 className="text-3xl font-black text-center mb-10 uppercase tracking-tighter italic">Corpo Docente Virtual</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <CharacterBox facilitator={CHARACTERS.GAIA} />
                 <CharacterBox facilitator={CHARACTERS.SOFIA} />
               </div>
            </div>
          </div>
        ) : view === 'cases' ? (
           <div className="animate-in fade-in duration-500 space-y-10">
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl">
                   <h2 className="text-6xl font-black mb-6 uppercase tracking-tighter leading-none">Dossiê de<br/>Casos Reais</h2>
                   <p className="text-xl font-bold opacity-90 leading-relaxed italic">"O aprendizado deve estar próximo da realidade." — Análise rigorosa de fatos históricos e contemporâneos da biologia profissional.</p>
                </div>
                <i className="fas fa-stamp absolute top-0 right-0 text-white/5 text-[20rem] -mr-16 -mt-16 rotate-12"></i>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[...INTEGRATED_CASES, ...SUBJECTS_DATA[Subject.AIA].cases, ...SUBJECTS_DATA[Subject.BIOETHICS].cases].map((c, i) => (
                  <div key={i} className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] shadow-xl border border-gray-100 dark:border-gray-800 group hover:border-indigo-400 transition-all hover:shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                       <span className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${c.subject === 'Integrado' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
                         {c.subject}
                       </span>
                       <div className="text-indigo-100 group-hover:text-indigo-500 transition-colors">
                         <i className="fas fa-bookmark text-3xl"></i>
                       </div>
                    </div>
                    <h3 className="text-4xl font-black mb-8 leading-tight tracking-tighter">{c.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 font-medium text-xl leading-relaxed">{c.description}</p>
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-10 rounded-[2.5rem] mb-10 border-l-[12px] border-indigo-600">
                       <h4 className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 mb-4 tracking-widest flex items-center">
                         <i className="fas fa-gavel mr-3"></i> Resfecho e Lições Acadêmicas
                       </h4>
                       <p className="text-lg font-bold text-indigo-950 dark:text-indigo-50 leading-relaxed">{c.outcome}</p>
                    </div>
                    <div className="flex items-center text-[11px] font-black text-gray-400 uppercase italic tracking-widest">
                      <i className="fas fa-file-lines mr-3"></i>
                      Base de Dados: {c.source}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        ) : selectedSubject ? (
          <div className="animate-in fade-in duration-500">
            {view === 'syllabus' ? (
              <>
                <div className="mb-12"><CharacterBox facilitator={subjectData!.facilitator} /></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                   <h2 className="text-5xl font-black tracking-tighter leading-none">{selectedSubject}</h2>
                   <button onClick={() => setView('game')} className="bg-purple-600 text-white px-10 py-4 rounded-[1.5rem] font-black text-sm hover:bg-purple-700 shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">INICIAR SIMULADO</button>
                </div>
                <div className="grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-12">
                    {subjectData?.syllabus.map((section, idx) => (
                      <section key={idx} className="bg-white dark:bg-gray-900 p-12 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
                        <h3 className="text-3xl font-black mb-6 tracking-tight">{section.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 text-xl leading-relaxed font-medium">{section.content}</p>
                        <div className="flex flex-wrap gap-3 mb-8">
                           {section.keyPoints.map((p, i) => <span key={i} className="bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-xl text-[11px] font-black border border-purple-100 dark:border-purple-800">{p}</span>)}
                        </div>
                        <div className="pt-6 border-t border-gray-50 dark:border-gray-800 text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                          <i className="fas fa-microscope mr-3 text-purple-400"></i> Referência Científica: {section.scientificRef}
                        </div>
                      </section>
                    ))}
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-500 px-4 flex items-center">
                      <i className="fas fa-bolt-lightning mr-3"></i> Fatos do Cotidiano
                    </h4>
                    {subjectData?.curiosities.map((cur, i) => (
                      <div key={i} className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 border-t-8 border-t-purple-500 group hover:shadow-xl transition-shadow">
                        <i className={`fas ${cur.icon} text-purple-600 mb-6 text-3xl group-hover:scale-125 transition-transform`}></i>
                        <h5 className="font-black text-lg mb-4 leading-tight">{cur.title}</h5>
                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{cur.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : view === 'game' ? (
              <QuizGame questions={subjectData?.quiz || []} onComplete={setQuizScore} />
            ) : null}
          </div>
        ) : null}
      </main>

      <footer className="mt-32 border-t border-gray-100 dark:border-gray-900 py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-6 opacity-50">
                <div className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center font-black text-gray-500 text-sm">zé</div>
                <span className="font-black text-gray-400 uppercase tracking-[0.4em] text-[10px]">IFAL MACEIÓ • 2024</span>
            </div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] hover:text-emerald-500 transition-colors cursor-default">Idealizador: Figueirabrava</p>
        </div>
      </footer>

      <Narrator text={narrationText} />
    </div>
  );
};

export default App;
