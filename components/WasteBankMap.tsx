
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Navigation, Clock, Phone, Info, Globe, Loader2, Target, CheckCircle2, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BANDUNG_WASTE_BANKS } from '../constants';
import { WasteBank } from '../types';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const WasteBankMap: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<WasteBank | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchingRealtime, setIsSearchingRealtime] = useState(false);
  const [realtimeResults, setRealtimeResults] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const filteredBanks = useMemo(() => {
    return BANDUNG_WASTE_BANKS.filter(bank => 
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bank.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleRealtimeSearch = async () => {
    setSearchError(null);
    const trimmed = searchTerm.trim();
    
    if (trimmed.length < 3) {
      setSearchError('Kata kunci terlalu pendek (minimal 3 karakter)');
      return;
    }

    const forbiddenChars = /[<>{}|[\]\\]/;
    if (forbiddenChars.test(trimmed)) {
      setSearchError('Pencarian mengandung karakter yang tidak diizinkan');
      return;
    }
    
    setIsSearchingRealtime(true);
    setAiResponse(null);
    try {
      const result = await gemini.findWasteBanks(searchTerm, userLocation || undefined);
      setAiResponse(result.text);
      setRealtimeResults(result.chunks);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearchingRealtime(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tighter">
            Direktori <span className="text-emerald-600">Bank Sampah</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl text-sm md:text-base">
            Temukan titik penukaran sampah plastik di Bandung. Gunakan pencarian cerdas kami untuk menemukan lokasi terbaru di sekitar Anda.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 w-fit">
          <Target className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {userLocation ? 'Lokasi Aktif' : 'Mencari Lokasi...'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Search & AI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 h-fit">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari kecamatan atau nama..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none font-semibold text-slate-700 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRealtimeSearch()}
              />
              {searchError && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold text-rose-500 mt-2 ml-2"
                >
                  {searchError}
                </motion.p>
              )}
            </div>
            
            <button 
              onClick={handleRealtimeSearch}
              disabled={isSearchingRealtime || !searchTerm}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200 active:scale-95"
            >
              {isSearchingRealtime ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
              Cari Real-time dengan AI
            </button>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {aiResponse ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col"
                >
                  <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Hasil Pencarian AI</span>
                    </div>
                    <button onClick={() => setAiResponse(null)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 md:p-8 text-sm text-slate-700 leading-relaxed max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="prose prose-slate prose-sm max-w-none mb-6">
                      {aiResponse}
                    </div>
                    {realtimeResults.length > 0 && (
                      <div className="pt-6 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Sumber Google Maps</p>
                        <div className="flex flex-wrap gap-2">
                          {realtimeResults.map((chunk, idx) => (
                            chunk.web && (
                              <a 
                                key={idx} 
                                href={chunk.web.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold hover:bg-emerald-100 transition-colors"
                              >
                                <Globe className="w-3 h-3" />
                                {chunk.web.title || 'Lihat di Maps'}
                              </a>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-emerald-600 rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden h-full flex flex-col justify-center min-h-[200px]"
                >
                  <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10">
                    <Target size={120} className="md:w-[180px] md:h-[180px]" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-4 tracking-tight">Cari Lokasi Spesifik?</h3>
                    <p className="text-emerald-50 font-medium leading-relaxed max-w-md mb-6 text-sm md:text-base">
                      Gunakan fitur pencarian AI untuk menemukan bank sampah yang mungkin belum terdaftar di database lokal kami.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-emerald-600 bg-emerald-400 flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-emerald-100">Didukung oleh Gemini AI</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Waste Bank Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-[10px] md:text-xs">Unit Terverifikasi di Bandung</h3>
            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold">{filteredBanks.length} Lokasi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredBanks.map(bank => (
              <motion.div 
                layout
                key={bank.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-emerald-500 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {bank.district}
                  </div>
                </div>

                <h4 className="text-base md:text-lg font-black text-slate-900 mb-2 leading-tight min-h-[2.5rem] md:min-h-[3rem] line-clamp-2">
                  {bank.name}
                </h4>
                
                <div className="space-y-2 md:space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Navigation className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {bank.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <p className="text-[11px] md:text-xs text-slate-500 font-bold">
                      {bank.contact || 'Hubungi DLH Bandung'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.name + ' ' + bank.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow bg-slate-50 text-slate-900 py-3 rounded-xl font-bold text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-3 h-3" />
                    Buka di Maps
                  </a>
                  <button className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-slate-100 text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredBanks.length === 0 && (
              <div className="col-span-full py-16 md:py-20 text-center bg-slate-50 rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Search className="w-8 h-8 md:w-10 md:h-10 text-slate-200" />
                </div>
                <h4 className="text-lg md:text-xl font-black text-slate-400 mb-2">Tidak Ada Hasil Lokal</h4>
                <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xs mx-auto px-4">
                  Coba gunakan fitur "Cari Real-time dengan AI" untuk menemukan lokasi yang lebih luas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteBankMap;
