
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../constants';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../types';

const QuizGame: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Function to shuffle and pick questions
  const getRandomQuestions = () => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Pick 5 random questions
  };

  // Initialize questions on mount
  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  const handleAnswer = (index: number) => {
    if (isAnswered || questions.length === 0) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setQuestions(getRandomQuestions());
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (questions.length === 0) return null;

  const question = questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <HelpCircle size={24} />
                  </div>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                    Pertanyaan {currentQuestion + 1} / {questions.length}
                  </span>
                </div>
                <div className="bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold">
                  Skor: {score}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 leading-tight">
                {question.question}
              </h3>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctAnswer;
                  const isSelected = index === selectedOption;
                  
                  let buttonClass = "w-full p-6 rounded-3xl text-left font-bold transition-all flex items-center justify-between border-2 ";
                  
                  if (!isAnswered) {
                    buttonClass += "border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700";
                  } else {
                    if (isCorrect) {
                      buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    } else if (isSelected) {
                      buttonClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      buttonClass += "border-slate-50 bg-slate-50 text-slate-400 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="text-emerald-500" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-8"
                >
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Penjelasan:</p>
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                  
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                  >
                    {currentQuestion + 1 === questions.length ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}
                    <ArrowRight size={24} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-[32px] flex items-center justify-center mx-auto mb-8">
              <Trophy size={48} className="text-amber-600" />
            </div>
            
            <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Kuis Selesai!</h3>
            <p className="text-slate-500 mb-8 font-medium">Kamu menjawab benar:</p>
            
            <div className="text-7xl font-black text-emerald-600 mb-4 tracking-tighter">
              {score} / {questions.length}
            </div>

            <p className="text-slate-400 font-bold uppercase tracking-widest mb-12">
              {score === questions.length ? 'Luar Biasa! Kamu Ahli Plastik!' : 
               score >= questions.length / 2 ? 'Bagus! Pengetahuanmu Cukup Baik.' : 
               'Ayo Belajar Lagi di Menu Edukasi!'}
            </p>

            <button 
              onClick={resetGame}
              className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
            >
              <RefreshCcw size={24} />
              Coba Lagi
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizGame;
