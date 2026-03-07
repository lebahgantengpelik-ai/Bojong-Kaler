
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLASTIC_TYPES } from '../constants';
import { Trophy, Timer, RefreshCcw, CheckCircle2, XCircle, Play, Info, Gamepad2, HelpCircle, ArrowLeft } from 'lucide-react';
import QuizGame from './QuizGame';

interface GameItem {
  id: number;
  name: string;
  code: number;
  icon: string;
}

const GAME_ITEMS: GameItem[] = [
  { id: 1, name: 'Botol Air Mineral', code: 1, icon: '🧴' },
  { id: 2, name: 'Botol Soda', code: 1, icon: '🥤' },
  { id: 3, name: 'Botol Susu', code: 2, icon: '🥛' },
  { id: 4, name: 'Botol Deterjen', code: 2, icon: '🧼' },
  { id: 5, name: 'Pipa Air', code: 3, icon: '🚿' },
  { id: 6, name: 'Kabel Listrik', code: 3, icon: '🔌' },
  { id: 7, name: 'Kantong Belanja', code: 4, icon: '🛍️' },
  { id: 8, name: 'Plastik Wrap', code: 4, icon: '🌯' },
  { id: 9, name: 'Tutup Botol', code: 5, icon: '🔘' },
  { id: 10, name: 'Wadah Yogurt', code: 5, icon: '🍦' },
  { id: 11, name: 'Styrofoam', code: 6, icon: '📦' },
  { id: 12, name: 'Gelas Plastik', code: 6, icon: '🥤' },
  { id: 13, name: 'Botol Bayi', code: 7, icon: '🍼' },
  { id: 14, name: 'Galon Air', code: 7, icon: '💧' },
  { id: 15, name: 'Casing HP', code: 7, icon: '📱' },
];

const SorterGame: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [highScore, setHighScore] = useState(0);

  const getRandomItem = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * GAME_ITEMS.length);
    return GAME_ITEMS[randomIndex];
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    setCurrentItem(getRandomItem());
    setFeedback(null);
  };

  const handleChoice = (code: number) => {
    if (!currentItem || feedback) return;

    if (code === currentItem.code) {
      setScore(s => s + 10);
      setFeedback('correct');
    } else {
      setScore(s => Math.max(0, s - 5));
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      setCurrentItem(getRandomItem());
    }, 800);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('end');
      if (score > highScore) setHighScore(score);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score, highScore]);

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
            <RefreshCcw className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Plastik Sorter</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Minigame Edukasi</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Skor</p>
            <p className="text-2xl font-black text-emerald-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Waktu</p>
            <p className={`text-2xl font-black ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </p>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                <Play size={48} className="text-emerald-600 ml-2" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Siap Bermain?</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-12 font-medium">
                Uji pengetahuanmu tentang 7 kode plastik internasional. Pilih kode yang tepat untuk setiap benda yang muncul!
              </p>
              <button 
                onClick={startGame}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
              >
                Mulai Game
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && currentItem && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative mb-12">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-48 h-48 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center shadow-inner"
                >
                  <span className="text-8xl mb-4">{currentItem.icon}</span>
                  <p className="text-xl font-black text-slate-800 tracking-tight">{currentItem.name}</p>
                </motion.div>

                {/* Feedback Overlay */}
                <AnimatePresence>
                  {feedback && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.5 }}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      {feedback === 'correct' ? (
                        <div className="bg-emerald-500 text-white p-6 rounded-full shadow-2xl">
                          <CheckCircle2 size={64} />
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white p-6 rounded-full shadow-2xl">
                          <XCircle size={64} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-7 gap-4 w-full">
                {PLASTIC_TYPES.map((type) => (
                  <motion.button
                    key={type.code}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleChoice(type.code)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg transition-all group-hover:shadow-xl"
                      style={{ backgroundColor: type.color, color: 'white' }}
                    >
                      {type.code}
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{type.name.split(' ')[0]}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'end' && (
            <motion.div 
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-amber-100 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                <Trophy size={48} className="text-amber-600" />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Waktu Habis!</h3>
              <p className="text-slate-500 mb-8 font-medium">Skor Akhir Kamu:</p>
              
              <div className="text-7xl font-black text-emerald-600 mb-12 tracking-tighter">
                {score}
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl mb-12 flex items-center justify-center gap-8">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Skor Tertinggi</p>
                  <p className="text-2xl font-black text-slate-800">{highScore}</p>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Akurasi</p>
                  <p className="text-2xl font-black text-slate-800">{Math.round((score / 10) / (score / 10 + 2) * 100) || 0}%</p>
                </div>
              </div>

              <button 
                onClick={startGame}
                className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
              >
                <RefreshCcw size={24} />
                Main Lagi
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center gap-4">
        <Info className="text-slate-400 flex-shrink-0" size={20} />
        <p className="text-slate-500 text-xs font-medium">
          Tip: Ingatlah bahwa plastik nomor 1, 2, dan 5 adalah yang paling mudah didaur ulang di Bank Sampah Bandung.
        </p>
      </div>
    </div>
  );
};

const WasteGame: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'hub' | 'sorter' | 'quiz'>('hub');

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {activeGame === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Arena Edukasi</h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto">
                Pilih tantanganmu dan buktikan seberapa peduli kamu terhadap lingkungan Kota Bandung!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.button
                whileHover={{ y: -10 }}
                onClick={() => setActiveGame('sorter')}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl text-left group transition-all hover:shadow-2xl hover:border-emerald-200"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <RefreshCcw size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Plastik Sorter</h3>
                <p className="text-slate-500 font-medium mb-6">
                  Pisahkan berbagai jenis sampah plastik ke dalam kategori kode daur ulang yang tepat.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs">
                  Main Sekarang <ArrowLeft className="rotate-180" size={16} />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ y: -10 }}
                onClick={() => setActiveGame('quiz')}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl text-left group transition-all hover:shadow-2xl hover:border-blue-200"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <HelpCircle size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Kuis Pintar Plastik</h3>
                <p className="text-slate-500 font-medium mb-6">
                  Uji pengetahuanmu tentang fakta-fakta sampah plastik dan cara pengelolaannya.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-xs">
                  Main Sekarang <ArrowLeft className="rotate-180" size={16} />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeGame === 'sorter' && (
          <motion.div
            key="sorter"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button 
              onClick={() => setActiveGame('hub')}
              className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} /> Kembali ke Menu
            </button>
            <SorterGame />
          </motion.div>
        )}

        {activeGame === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button 
              onClick={() => setActiveGame('hub')}
              className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} /> Kembali ke Menu
            </button>
            <QuizGame />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WasteGame;
