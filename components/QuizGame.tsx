
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { audioService } from '../services/audioService';

interface QuizGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = questions[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === question.correctAnswer) {
      audioService.playSuccess();
      setScore(s => s + 1);
    } else {
      audioService.playError();
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Questão {currentIdx + 1} de {questions.length}</span>
          <div className="flex items-center">
            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
              question.level === 'Concurso Público' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
            }`}>
              <i className="fas fa-certificate mr-1"></i> {question.level}
            </span>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-xl text-emerald-600 font-black text-lg">
          {score}
        </div>
      </div>
      
      <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-snug">
        {question.text}
      </h3>
      
      <div className="space-y-3 mb-8">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => handleOptionSelect(idx)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center group ${
              isAnswered 
                ? idx === question.correctAnswer
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400'
                  : idx === selectedOption
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-400'
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
            }`}
          >
            <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-[10px] mr-4 shrink-0 ${
              isAnswered && idx === question.correctAnswer ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
            }`}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="text-sm font-semibold">{opt}</span>
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border-l-4 border-emerald-500">
            <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-2">Comentário Técnico</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-3">{question.explanation}</p>
            <div className="text-[9px] text-slate-400 font-black uppercase">Fonte: {question.source}</div>
          </div>
          <button
            onClick={nextQuestion}
            className="w-full bg-slate-900 dark:bg-emerald-600 text-white font-black py-4 rounded-xl hover:scale-105 transition-all text-xs uppercase tracking-widest shadow-lg"
          >
            {currentIdx + 1 < questions.length ? 'Próxima Questão' : 'Ver Resultado'}
          </button>
        </div>
      )}
    </div>
  );
};
