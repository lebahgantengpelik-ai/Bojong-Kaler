
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, Cell, PieChart, Pie 
} from 'recharts';
import { MONTHLY_WASTE_STATS } from '../constants';
import { Calendar, TrendingUp, Info, Target, Package, Container } from 'lucide-react';
import { motion } from 'motion/react';

const DataDashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  const years = [2024, 2025, 2026];
  
  const filteredData = MONTHLY_WASTE_STATS.filter(stat => stat.year === selectedYear);

  const pieData = [
    { name: 'Plastik', value: 25, color: '#3b82f6' },
    { name: 'Organik', value: 45, color: '#10b981' },
    { name: 'Kertas', value: 15, color: '#f59e0b' },
    { name: 'Lainnya', value: 15, color: '#94a3b8' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
      {/* Background Accents */}
      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 text-emerald-100 opacity-30 -z-10"
      >
        <Container size={120} />
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Statistik Sampah Bandung</h2>
          <p className="text-gray-600 italic">Data aktual & proyeksi pengelolaan sampah periode 2024 - 2026</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full md:w-auto overflow-x-auto no-scrollbar">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                selectedYear === year 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Trend Tonnage */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-700">Volume Sampah Masuk TPA (Ton)</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Calendar size={14} />
              Tahun {selectedYear}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`${value} Ton`, 'Volume']}
                />
                <Bar dataKey="tonnage" name="Volume (Ton)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plastic Percentage Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-700">Rasio Kontaminasi Plastik (%)</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <TrendingUp size={14} />
              Trend {selectedYear}
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={[0, 'auto']}
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   formatter={(value: number) => [`${value}%`, 'Persentase Plastik']}
                />
                <Line 
                  type="monotone" 
                  dataKey="plasticPercentage" 
                  name="Persentase Plastik"
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
            <h3 className="text-lg font-bold mb-6 text-gray-700">Komposisi Sampah</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
         </div>

         <div className="md:col-span-2 space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 -rotate-12 translate-x-4 translate-y-4">
                <Package size={80} />
              </div>
              <div className="bg-blue-100 p-3 rounded-xl h-fit text-blue-600 relative z-10">
                <Info size={24} />
              </div>
              <div className="relative z-10">
                <h4 className="text-blue-800 font-bold text-lg mb-2">Fakta Plastik Bandung</h4>
                <p className="text-blue-700 leading-relaxed">
                  Rata-rata warga Bandung menghasilkan 0.7kg sampah per hari. Sebanyak 17-20% diantaranya adalah sampah plastik yang sebagian besar berakhir di TPA Sarimukti atau sungai Citarum jika tidak dikelola dengan benar.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 rotate-12 translate-x-4 translate-y-4">
                <Container size={80} />
              </div>
              <div className="bg-amber-100 p-3 rounded-xl h-fit text-amber-600 relative z-10">
                <Target size={24} />
              </div>
              <div className="relative z-10">
                <h4 className="text-amber-800 font-bold text-lg mb-2">Target Zero Waste</h4>
                <p className="text-amber-700 leading-relaxed">
                  Melalui Gerakan Kang Pisman, Pemkot Bandung menargetkan pengurangan sampah hingga 20% langsung dari level rumah tangga melalui pemilahan dan penyetoran ke Bank Sampah terdekat.
                </p>
              </div>
            </div>
         </div>
      </div>

      {/* Data Sources */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-slate-100"
      >
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Info size={16} />
          Sumber Data & Referensi
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-1">SIPSN KLHK</p>
            <p className="text-sm text-slate-600 font-medium">Sistem Informasi Pengelolaan Sampah Nasional - Kementerian Lingkungan Hidup dan Kehutanan RI.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-1">DLH Kota Bandung</p>
            <p className="text-sm text-slate-600 font-medium">Dinas Lingkungan Hidup Kota Bandung - Laporan Tahunan Pengelolaan Persampahan.</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-1">Kang Pisman</p>
            <p className="text-sm text-slate-600 font-medium">Gerakan Kurangi, Pisahkan, dan Manfaatkan Sampah - Inisiatif Pemerintah Kota Bandung.</p>
          </div>
        </div>
        <p className="mt-6 text-[10px] text-slate-400 italic leading-relaxed">
          *Data yang ditampilkan merupakan kombinasi data historis SIPSN (2022-2023) dan proyeksi pertumbuhan volume sampah berdasarkan tren urbanisasi Kota Bandung. Persentase plastik didasarkan pada rata-rata komposisi sampah perkotaan di Indonesia.
        </p>
      </motion.div>
    </div>
  );
};

export default DataDashboard;
