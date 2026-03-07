
import React, { useState, useRef, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { 
  Send, 
  Bot, 
  User, 
  Trash2, 
  Loader2, 
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo! Saya Kang Resik, asisten virtual lingkungan Anda. Ada yang bisa saya bantu terkait pengelolaan sampah plastik di Bandung hari ini?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef(new GeminiService());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiRef.current.getChatResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Maaf, Kang Resik sedang sibuk. Bisa coba lagi nanti?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Halo! Chat telah dibersihkan. Ada lagi yang ingin ditanyakan?',
        timestamp: new Date(),
      }
    ]);
  };

  return (
    <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] bg-slate-50 flex flex-col items-center py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl w-full flex flex-col bg-white rounded-[24px] md:rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden h-full">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Kang Resik</h2>
              <div className="flex items-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                Asisten Lingkungan Bandung
              </div>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Bersihkan Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <span className={`text-[10px] mt-2 block opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <Loader2 size={18} className="animate-spin text-emerald-600" />
                <span className="text-sm font-medium text-slate-500 italic">Kang Resik sedang mengetik...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative flex items-center gap-3">
            <div className="flex-grow relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya Kang Resik tentang sampah plastik..."
                className="w-full pl-6 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-400"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">
                <Sparkles size={18} />
              </div>
            </div>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:shadow-none"
            >
              <Send size={24} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-2 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
            <Info size={12} />
            <span>Gunakan Bahasa Indonesia untuk hasil terbaik</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
