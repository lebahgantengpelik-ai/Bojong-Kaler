
import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Lightbulb, 
  Share2, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PLASTIC_FUN_FACTS } from '../constants';

const FunFact: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Pick a random fact on initial load
    const randomIndex = Math.floor(Math.random() * PLASTIC_FUN_FACTS.length);
    setCurrentFactIndex(randomIndex);
  }, []);

  const refreshFact = () => {
    setIsRefreshing(true);
    
    // Simulate a small delay for the animation feel
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * PLASTIC_FUN_FACTS.length);
      } while (nextIndex === currentFactIndex && PLASTIC_FUN_FACTS.length > 1);
      
      setCurrentFactIndex(nextIndex);
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center p-4 md:p-8 bg-slate-50">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest mb-4"
          >
            <Lightbulb size={14} />
            <span>Tahukah Kamu?</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-none">
            Fakta Sampah Plastik
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-lg mx-auto">
            Wawasan menarik tentang dampak plastik terhadap bumi kita. Mari belajar dan bertindak!
          </p>
        </div>

        <div className="relative">
          {/* Card Container */}
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl shadow-emerald-200/50 border border-emerald-50 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentFactIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 min-h-[120px] flex items-center justify-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight text-center italic">
                  "{PLASTIC_FUN_FACTS[currentFactIndex]}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={refreshFact}
                disabled={isRefreshing}
                className="group flex items-center space-x-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95 disabled:opacity-70"
              >
                <RefreshCw size={20} className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                <span>Fakta Baru</span>
              </button>
              
              <button className="flex items-center space-x-3 px-8 py-4 bg-white text-slate-600 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                <Share2 size={20} />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          {/* Stats/Info Grid below card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Apa yang bisa dilakukan?</h4>
                <p className="text-sm text-slate-500 mt-1">Gunakan botol minum sendiri dan kurangi penggunaan kantong plastik sekali pakai.</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Dampak Buruk</h4>
                <p className="text-sm text-slate-500 mt-1">Plastik yang tidak terkelola dengan baik merusak ekosistem laut dan kesehatan manusia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFact;
