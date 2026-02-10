
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { audioService } from '../services/audioService';

interface QuizGameProps {
  questions: Question[];
  onComplete: (score: number) => void;
  isGameMode?: boolean;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete, isGameMode }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = questions[currentIdx];

  useEffect(() => {
    if (isGameMode && !isAnswered && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleOptionSelect(-1); // Erro por tempo
    }
  }, [timeLeft, isGameMode, isAnswered]);

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
    audioService.playClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      onComplete(score + (selectedOption === question.correctAnswer ? 1 : 0));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-purple-50 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="mb-10 flex justify-between items-center">
        <div className="space-y-1 flex-grow">
           <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
             {isGameMode ? '🎮 DESAFIO CONTRA O RELÓGIO' : '🔬 SIMULAÇÃO CIENTÍFICA'}
           </span>
           <div className="flex space-x-2 mt-2">
             {questions.map((_, i) => (
               <div key={i} className={`h-2 flex-grow rounded-full transition-all ${i === currentIdx ? 'bg-purple-600' : i < currentIdx ? 'bg-purple-200 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-800'}`}></div>
             ))}
           </div>
        </div>
        
        {isGameMode && !isAnswered && (
          <div className={`ml-6 w-16 h-16 rounded-full border-4 flex items-center justify-center font-black text-xl transition-colors ${timeLeft < 10 ? 'border-red-500 text-red-500 animate-pulse' : 'border-purple-600 text-purple-600'}`}>
            {timeLeft}
          </div>
        )}

        <div className="ml-6 bg-purple-50 dark:bg-purple-900/30 px-6 py-3 rounded-2xl text-purple-600 font-black text-xl">
           {score}
        </div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white mb-10 leading-tight">
        {question.text}
      </h3>
      
      <div className="grid gap-4 mb-10">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => handleOptionSelect(idx)}
            className={`w-full p-6 text-left rounded-[1.5rem] border-2 transition-all flex items-center justify-between group ${
              isAnswered 
                ? idx === question.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400'
                  : idx === selectedOption
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-60'
                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/10'
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${isAnswered && idx === question.correctAnswer ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-bold">{opt}</span>
            </div>
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="animate-in fade-in duration-500">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border-l-8 border-indigo-500 mb-10">
            <h4 className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase mb-2">Justificativa Acadêmica</h4>
            <p className="text-indigo-700 dark:text-indigo-200 mb-4 font-medium text-sm leading-relaxed">{question.explanation}</p>
            <div className="text-[9px] text-indigo-400 font-black uppercase tracking-tighter">
              <i className="fas fa-microscope mr-2"></i>
              Fonte: {question.source}
            </div>
          </div>
          <button
            onClick={nextQuestion}
            className="w-full bg-gray-900 dark:bg-purple-600 text-white font-black py-6 rounded-3xl hover:bg-black dark:hover:bg-purple-700 transition-all shadow-xl active:scale-95"
          >
            {currentIdx + 1 < questions.length ? 'PRÓXIMA QUESTÃO' : 'FINALIZAR'}
          </button>
        </div>
      )}
    </div>
  );
};
