
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLASTIC_TYPES } from '../constants';
import { PlasticType } from '../types';
import { CheckCircle2, Recycle, Trash2, Droplets, Wind, ArrowRight, Info, Package, Container, Skull, Waves, CloudRain, TreeDeciduous } from 'lucide-react';

const PlasticCard: React.FC<{ type: PlasticType; index: number }> = ({ type, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative h-[400px] w-full perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Subtle Plastic Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
          
          <motion.div 
            animate={{ 
              rotate: [12, 22, 12],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-32 h-32 translate-x-1/3 -translate-y-1/3 opacity-10"
            style={{ color: type.color }}
          >
            <Recycle size={120} />
          </motion.div>

          <div className="flex items-center justify-between mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-inner relative z-10" 
              style={{ backgroundColor: `${type.color}15`, color: type.color }}
            >
              {type.code}
            </motion.div>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
              type.recyclability.includes('Tinggi') ? 'bg-green-50 text-green-700 border-green-100' : 
              type.recyclability.includes('Sedang') ? 'bg-amber-50 text-amber-700 border-amber-100' : 
              'bg-red-50 text-red-700 border-red-100'
            }`}>
              Daur Ulang: {type.recyclability}
            </div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">{type.name}</h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">{type.description}</p>
          </div>

          <div className="flex items-center text-emerald-600 font-bold text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
            <span>Klik untuk detail</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between rotate-y-180"
        >
          {/* Subtle Plastic Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-white/10 rounded-xl"
              >
                <Info size={20} className="text-emerald-400" />
              </motion.div>
              <h4 className="font-black uppercase tracking-widest text-xs text-emerald-400">Contoh Produk</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {type.examples.map((ex, idx) => (
                <motion.span 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  key={idx} 
                  className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/10 cursor-default"
                >
                  {ex}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-slate-400 text-xs leading-relaxed">
              Pastikan untuk membersihkan sisa makanan/minuman sebelum membuang plastik jenis ini ke Bank Sampah.
            </p>
          </div>

          <div className="flex items-center text-emerald-400 font-bold text-xs uppercase tracking-widest gap-2">
            <ArrowRight size={14} className="rotate-180" />
            <span>Kembali</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Education: React.FC = () => {
  const procedures = [
    {
      title: "Bersihkan (Clean)",
      desc: "Cuci sisa makanan atau minuman yang menempel pada plastik. Sisa organik dapat merusak kualitas daur ulang.",
      icon: <Droplets className="text-blue-400" />,
      color: "bg-blue-500/10"
    },
    {
      title: "Keringkan (Dry)",
      desc: "Pastikan plastik dalam keadaan kering sebelum disimpan untuk mencegah pertumbuhan jamur dan bau tidak sedap.",
      icon: <Wind className="text-amber-400" />,
      color: "bg-amber-500/10"
    },
    {
      title: "Pisahkan (Segregate)",
      desc: "Kelompokkan plastik berdasarkan kodenya (1-7). Tutup botol dan label sebaiknya dilepas karena seringkali beda jenis.",
      icon: <Recycle className="text-emerald-400" />,
      color: "bg-emerald-500/10"
    },
    {
      title: "Ringkaskan (Compact)",
      desc: "Remas botol atau lipat plastik untuk menghemat ruang penyimpanan dan memudahkan transportasi ke Bank Sampah.",
      icon: <Trash2 className="text-red-400" />,
      color: "bg-red-500/10"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative">
      {/* Hero Section */}
      <section className="mb-16 md:mb-24 relative overflow-hidden py-8 md:py-12">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 translate-x-1/2 translate-y-1/2"></div>
        
        {/* Floating Accents in Hero */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-10 right-10 text-emerald-200 opacity-40 hidden lg:block"
        >
          <Container size={80} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-10 left-10 text-blue-200 opacity-40 hidden lg:block"
        >
          <Package size={60} />
        </motion.div>

        <div className="text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0],
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-4"
          >
            Edukasi Publik Kota Bandung
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
          >
            Kenali Plastikmu,<br/>
            <span className="text-emerald-600">Sayangi Bandungmu.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed"
          >
            Langkah kecil dimulai dari mengenal jenis plastik yang kita gunakan setiap hari. 
            Klik kartu di bawah untuk mempelajari lebih lanjut.
          </motion.p>
        </div>
      </section>

      {/* Grid of Plastic Types */}
      <div className="mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center tracking-tight">
            <Recycle className="text-emerald-500 mr-3 md:mr-4 w-6 h-6 md:w-8 md:h-8" />
            7 Kode Plastik
          </h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Klik kartu untuk detail</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PLASTIC_TYPES.map((type, index) => (
            <PlasticCard key={type.code} type={type} index={index} />
          ))}
        </div>
      </div>

      {/* Pollution Section */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Dampak Pencemaran</h3>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Sampah plastik yang tidak terkelola dengan baik dapat merusak ekosistem dan kesehatan manusia dalam jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Pencemaran Tanah",
              desc: "Plastik membutuhkan ratusan tahun untuk terurai. Selama proses ini, zat kimia berbahaya meresap ke dalam tanah, membunuh mikroorganisme penting dan merusak kesuburan tanah.",
              icon: <TreeDeciduous className="text-emerald-500" />,
              color: "bg-emerald-50"
            },
            {
              title: "Pencemaran Air",
              desc: "Mikroplastik masuk ke sungai dan laut, dikonsumsi oleh biota laut, dan akhirnya masuk ke rantai makanan manusia. Ini juga menyumbat saluran air yang menyebabkan banjir di Bandung.",
              icon: <Waves className="text-blue-500" />,
              color: "bg-blue-50"
            },
            {
              title: "Pencemaran Udara",
              desc: "Pembakaran sampah plastik secara terbuka melepaskan gas beracun seperti dioksin dan furan yang bersifat karsinogenik dan merusak lapisan ozon.",
              icon: <CloudRain className="text-slate-500" />,
              color: "bg-slate-50"
            },
            {
              title: "Dampak Kesehatan",
              desc: "Paparan zat kimia dari plastik dapat menyebabkan gangguan hormon, masalah reproduksi, hingga kanker. Mikroplastik bahkan telah ditemukan dalam aliran darah manusia.",
              icon: <Skull className="text-red-500" />,
              color: "bg-red-50"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[40px] ${item.color} border border-slate-100 flex flex-col md:flex-row gap-6 items-start`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                {React.cloneElement(item.icon, { size: 32 })}
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800 mb-2 tracking-tight">{item.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Procedures Section */}
      <section className="mb-20 md:mb-32">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Tata Cara Pengolahan</h3>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm md:text-base">
            Ikuti standar pengolahan sampah plastik domestik sebelum disetorkan ke Bank Sampah Unit (BSU) di wilayah Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {procedures.map((proc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center group"
            >
              <motion.div 
                animate={{ 
                  y: [0, -4, 0],
                }}
                transition={{ 
                  duration: 3 + idx, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className={`w-20 h-20 ${proc.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                {React.cloneElement(proc.icon as React.ReactElement, { size: 32 })}
              </motion.div>
              <h4 className="text-xl font-black text-slate-800 mb-4 tracking-tight">{proc.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {proc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Kang Pisman Call to Action */}
      <section className="bg-slate-900 rounded-[40px] md:rounded-[60px] p-6 md:p-20 text-white overflow-hidden relative">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Bandung_City_Logo.svg" alt="Bandung Logo" className="w-64 md:w-96 grayscale invert" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 w-full">
            <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-10 leading-tight tracking-tighter">
              Gerakan <span className="text-emerald-400 italic">Kang Pisman</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-slate-300 text-base md:text-lg leading-relaxed mb-10 md:mb-12">
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-400 font-black text-xl">K</div>
                <div>
                  <p className="text-white font-black uppercase tracking-widest text-xs mb-1">Kurangi</p>
                  <p className="text-slate-400">Hindari pemakaian plastik sekali pakai (kantong kresek, sedotan).</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-400 font-black text-xl">P</div>
                <div>
                  <p className="text-white font-black uppercase tracking-widest text-xs mb-1">Pisahkan</p>
                  <p className="text-slate-400">Pilah sampah dari rumah (Organik, Plastik, Residu).</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-emerald-500/20 w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-400 font-black text-xl">M</div>
                <div>
                  <p className="text-white font-black uppercase tracking-widest text-xs mb-1">Manfaatkan</p>
                  <p className="text-slate-400">Tabung sampah plastik Anda di Bank Sampah terdekat.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px]">
                <p className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tighter">1.500+</p>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Ton Sampah/Hari</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-[24px] md:rounded-[32px]">
                <p className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tighter">150+</p>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">Bank Sampah Unit</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 rounded-[32px] md:rounded-[48px] blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000" 
                alt="Waste Management" 
                className="rounded-[32px] md:rounded-[48px] shadow-2xl relative z-10 w-full h-[300px] md:h-[500px] object-cover" 
              />
              <div className="absolute -bottom-6 md:-bottom-8 -left-4 md:-left-8 bg-emerald-600 p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl z-20 max-w-[240px] md:max-w-[280px]">
                <p className="text-white font-black text-lg md:text-xl italic leading-tight">"Wargi Bandung Juara, Bandung Bersih!"</p>
                <div className="mt-3 md:mt-4 flex items-center gap-2 text-emerald-200 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 size={14} />
                  <span>Terverifikasi DLH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
