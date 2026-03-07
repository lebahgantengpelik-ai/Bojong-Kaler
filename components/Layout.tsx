
import React, { useState } from 'react';
import { Tab } from '../types';
import PlasticAccents from './PlasticAccents';
import { 
  Leaf, 
  BookOpen, 
  PieChart, 
  MapPinned, 
  Gamepad2, 
  MessageSquareText,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: Tab.EDUCATION, label: 'Edukasi', icon: BookOpen },
    { id: Tab.DATA, label: 'Statistik', icon: PieChart },
    { id: Tab.MAPS, label: 'Bank Sampah', icon: MapPinned },
    { id: Tab.GAME, label: 'Minigame', icon: Gamepad2 },
  ];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 relative">
      <PlasticAccents />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => handleTabChange(Tab.EDUCATION)}>
              <div className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-emerald-600 leading-none">WeduPlas</h1>
                <div className="relative -top-2 md:-top-3 -ml-0.5">
                  <Leaf className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 fill-emerald-500 rotate-[15deg]" />
                </div>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100' 
                      : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              <div className="h-6 w-px bg-slate-200 mx-4"></div>
              
              <button 
                onClick={() => handleTabChange(Tab.ASSISTANT)}
                className={`flex items-center space-x-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md ${
                  activeTab === Tab.ASSISTANT
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200'
                }`}
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Tanya Kang Resik</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      activeTab === item.id
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <div className="pt-4">
                  <button
                    onClick={() => handleTabChange(Tab.ASSISTANT)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-4 rounded-2xl font-bold transition-all shadow-lg ${
                      activeTab === Tab.ASSISTANT
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <MessageSquareText className="w-5 h-5" />
                    <span>Tanya Kang Resik</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => setActiveTab(Tab.EDUCATION)}>
                <h2 className="text-2xl font-bold tracking-tighter text-emerald-600 leading-none">WeduPlas</h2>
                <div className="relative -top-2.5 -ml-0.5">
                  <Leaf className="w-4 h-4 text-emerald-500 fill-emerald-500 rotate-[15deg]" />
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Inisiatif digital untuk mendukung gerakan "Kang Pisman" di Kota Bandung. 
                Mari kita jadikan Bandung kota yang bersih, sehat, dan bebas sampah plastik.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Pranala Luar</h3>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-emerald-600">DLH Kota Bandung</a></li>
                <li><a href="#" className="hover:text-emerald-600">Gerakan Kang Pisman</a></li>
                <li><a href="#" className="hover:text-emerald-600">Open Data Bandung</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Tentang Weduplas</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Platform edukasi sampah plastik digital pertama di Bandung yang mengintegrasikan data real-time dan kecerdasan buatan untuk masa depan yang lebih hijau.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-medium">
              &copy; {new Date().getFullYear()} Weduplas Bandung Action. 
              Dibuat dengan <Heart className="w-3 h-3 text-red-400 inline mx-1" /> untuk masa depan Bandung.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Nav Removed in favor of Hamburger */}
    </div>
  );
};

export default Layout;
