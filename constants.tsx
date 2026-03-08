
import React from 'react';
import { WasteBank, WasteStat, PlasticType, QuizQuestion } from './types';

export const BANDUNG_WASTE_BANKS: WasteBank[] = [
  {
    id: '1',
    name: 'Bank Sampah Induk Cabang Sadang Serang',
    address: 'Jl. Sadang Tengah No. 6',
    district: 'Coblong',
    lat: -6.8903,
    lng: 107.6251,
    contact: '0812-xxxx-xxxx'
  },
  {
    id: '2',
    name: 'Bank Sampah Resik Babakan Sari',
    address: 'Jl. Babakan Sari No. 64',
    district: 'Kiaracondong',
    lat: -6.9258,
    lng: 107.6494,
    contact: '0812-xxxx-xxxx'
  },
  {
    id: '3',
    name: 'Bank Sampah Induk Kota Bandung',
    address: 'Blk. B-C No. c27',
    district: 'Bojongloa Kidul',
    lat: -6.9458,
    lng: 107.6094,
  },
  {
    id: '4',
    name: 'UPTD Pengelolaan Sampah Kota Bandung',
    address: 'Jl. Surapati No. 126',
    district: 'Cibeunying Kaler',
    lat: -6.8980,
    lng: 107.6360,
  },
  {
    id: '5',
    name: 'Bank Sampah Ceria',
    address: 'Jl. Cisitu Indah Baru No. 6',
    district: 'Coblong',
    lat: -6.8858,
    lng: 107.6150,
  },
  {
    id: '6',
    name: 'Bank Sampah Jempol',
    address: 'Jl. Ciwastra No. 3',
    district: 'Rancasari',
    lat: -6.9447,
    lng: 107.6745,
    contact: '022-7507748'
  },
  {
    id: '7',
    name: 'Bank Sampah Astana Eyang',
    address: 'Jl. Citepus II, RT.04/RW.06',
    district: 'Cicendo',
    lat: -6.9058,
    lng: 107.5970,
  },
  {
    id: '8',
    name: 'TPST Babakan Siliwangi',
    address: 'Jl. Siliwangi',
    district: 'Coblong',
    lat: -6.8858,
    lng: 107.6094,
  }
];

export const MONTHLY_WASTE_STATS: WasteStat[] = [
  // 2024
  { year: 2024, month: 'Jan', tonnage: 1550, plasticPercentage: 16.2 },
  { year: 2024, month: 'Feb', tonnage: 1520, plasticPercentage: 16.5 },
  { year: 2024, month: 'Mar', tonnage: 1600, plasticPercentage: 17.1 },
  { year: 2024, month: 'Apr', tonnage: 1650, plasticPercentage: 17.8 },
  { year: 2024, month: 'May', tonnage: 1700, plasticPercentage: 18.2 },
  { year: 2024, month: 'Jun', tonnage: 1680, plasticPercentage: 17.5 },
  { year: 2024, month: 'Jul', tonnage: 1720, plasticPercentage: 18.0 },
  { year: 2024, month: 'Aug', tonnage: 1750, plasticPercentage: 18.5 },
  { year: 2024, month: 'Sep', tonnage: 1710, plasticPercentage: 17.8 },
  { year: 2024, month: 'Oct', tonnage: 1780, plasticPercentage: 19.1 },
  { year: 2024, month: 'Nov', tonnage: 1800, plasticPercentage: 19.5 },
  { year: 2024, month: 'Dec', tonnage: 1850, plasticPercentage: 20.2 },
  // 2025
  { year: 2025, month: 'Jan', tonnage: 1820, plasticPercentage: 19.8 },
  { year: 2025, month: 'Feb', tonnage: 1790, plasticPercentage: 19.5 },
  { year: 2025, month: 'Mar', tonnage: 1850, plasticPercentage: 20.1 },
  { year: 2025, month: 'Apr', tonnage: 1900, plasticPercentage: 20.8 },
  { year: 2025, month: 'May', tonnage: 1950, plasticPercentage: 21.2 },
  { year: 2025, month: 'Jun', tonnage: 1920, plasticPercentage: 20.5 },
  { year: 2025, month: 'Jul', tonnage: 1980, plasticPercentage: 21.0 },
  { year: 2025, month: 'Aug', tonnage: 2010, plasticPercentage: 21.5 },
  { year: 2025, month: 'Sep', tonnage: 1960, plasticPercentage: 20.8 },
  { year: 2025, month: 'Oct', tonnage: 2050, plasticPercentage: 21.8 },
  { year: 2025, month: 'Nov', tonnage: 2080, plasticPercentage: 22.1 },
  { year: 2025, month: 'Dec', tonnage: 2150, plasticPercentage: 22.5 },
  // 2026 (Projected/Current)
  { year: 2026, month: 'Jan', tonnage: 2100, plasticPercentage: 21.8 },
  { year: 2026, month: 'Feb', tonnage: 2050, plasticPercentage: 21.5 },
];

export const PLASTIC_TYPES: PlasticType[] = [
  {
    code: 1,
    name: 'PET (Polyethylene Terephthalate)',
    description: 'Biasa digunakan untuk botol air mineral, botol jus, dan wadah makanan.',
    recyclability: 'Tinggi',
    examples: ['Botol Air', 'Botol Soda', 'Wadah Selai'],
    color: '#1d4ed8'
  },
  {
    code: 2,
    name: 'HDPE (High-Density Polyethylene)',
    description: 'Plastik yang lebih kaku, digunakan untuk botol deterjen, susu, dan shampoo.',
    recyclability: 'Tinggi',
    examples: ['Botol Susu', 'Botol Deterjen', 'Mainan'],
    color: '#1e40af'
  },
  {
    code: 3,
    name: 'PVC (Polyvinyl Chloride)',
    description: 'Digunakan untuk pipa air, ubin, dan kabel listrik.',
    recyclability: 'Rendah/Sulit',
    examples: ['Pipa PVC', 'Kabel', 'Tirai Kamar Mandi'],
    color: '#9333ea'
  },
  {
    code: 4,
    name: 'LDPE (Low-Density Polyethylene)',
    description: 'Plastik fleksibel untuk kantong belanja dan pembungkus makanan.',
    recyclability: 'Sedang',
    examples: ['Kantong Kresek', 'Cling Wrap', 'Botol Remas'],
    color: '#059669'
  },
  {
    code: 5,
    name: 'PP (Polypropylene)',
    description: 'Tahan panas, digunakan untuk tutup botol, sedotan, dan wadah yogurt.',
    recyclability: 'Tinggi',
    examples: ['Tutup Botol', 'Wadah Makanan', 'Sedotan'],
    color: '#d97706'
  },
  {
    code: 6,
    name: 'PS (Polystyrene)',
    description: 'Biasa dikenal sebagai styrofoam. Digunakan untuk wadah makanan sekali pakai, gelas kopi, dan karton telur.',
    recyclability: 'Rendah',
    examples: ['Styrofoam', 'Gelas Plastik', 'Sendok Plastik'],
    color: '#dc2626'
  },
  {
    code: 7,
    name: 'OTHER (Lainnya)',
    description: 'Kategori untuk plastik jenis lain seperti polikarbonat atau campuran plastik lainnya.',
    recyclability: 'Sangat Rendah',
    examples: ['Botol Bayi', 'Galon Air', 'Casing HP'],
    color: '#4b5563'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Kode plastik nomor berapa yang paling umum digunakan untuk botol air mineral?",
    options: ["PET (1)", "HDPE (2)", "PP (5)", "PS (6)"],
    correctAnswer: 0,
    explanation: "PET (Polyethylene Terephthalate) adalah plastik nomor 1 yang paling umum digunakan untuk botol minuman sekali pakai."
  },
  {
    question: "Manakah dari jenis plastik berikut yang paling sulit didaur ulang?",
    options: ["PET (1)", "HDPE (2)", "PVC (3)", "PP (5)"],
    correctAnswer: 2,
    explanation: "PVC (Polyvinyl Chloride) mengandung klorin dan aditif lain yang membuatnya sangat sulit dan berbahaya untuk didaur ulang."
  },
  {
    question: "Styrofoam termasuk dalam kategori plastik nomor berapa?",
    options: ["LDPE (4)", "PP (5)", "PS (6)", "OTHER (7)"],
    correctAnswer: 2,
    explanation: "Styrofoam adalah nama dagang untuk Polystyrene (PS), yang memiliki kode daur ulang nomor 6."
  },
  {
    question: "Apa yang harus dilakukan sebelum menyetorkan botol plastik ke Bank Sampah?",
    options: ["Langsung dibuang", "Dicuci dan dikeringkan", "Dibakar", "Dipendam"],
    correctAnswer: 1,
    explanation: "Membersihkan dan mengeringkan sampah plastik sangat penting agar tidak mengontaminasi sampah lain dan meningkatkan nilai jualnya."
  },
  {
    question: "Jenis plastik nomor 5 (PP) biasanya digunakan untuk apa?",
    options: ["Pipa air", "Kantong kresek", "Wadah makanan tahan panas", "Kabel listrik"],
    correctAnswer: 2,
    explanation: "PP (Polypropylene) tahan terhadap panas dan sering digunakan untuk wadah makanan, tutup botol, dan sedotan."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan botol plastik untuk terurai di alam?",
    options: ["10-20 tahun", "50-100 tahun", "450-1000 tahun", "Tidak akan pernah terurai"],
    correctAnswer: 2,
    explanation: "Botol plastik membutuhkan waktu sekitar 450 hingga 1000 tahun untuk terurai sepenuhnya di lingkungan."
  },
  {
    question: "Apa kepanjangan dari HDPE?",
    options: ["High-Density Polyethylene", "Heavy-Duty Plastic Element", "High-Definition Plastic Epoxy", "Heat-Durable Polyethylene"],
    correctAnswer: 0,
    explanation: "HDPE adalah High-Density Polyethylene, plastik yang kuat dan sering digunakan untuk botol susu dan deterjen."
  }
];

export const PLASTIC_FUN_FACTS = [
  "Setiap menit, satu juta botol plastik dibeli di seluruh dunia.",
  "Plastik membutuhkan waktu hingga 1.000 tahun untuk terurai di tempat pembuangan sampah.",
  "Lebih dari 8 juta ton plastik berakhir di lautan setiap tahunnya.",
  "Jika tren saat ini berlanjut, pada tahun 2050 akan ada lebih banyak plastik daripada ikan di lautan (berdasarkan berat).",
  "Hanya sekitar 9% dari seluruh plastik yang pernah dibuat telah didaur ulang.",
  "Mendaur ulang satu botol plastik dapat menghemat energi yang cukup untuk menyalakan bola lampu 60 watt selama enam jam.",
  "Rata-rata orang mengonsumsi sekitar 5 gram plastik setiap minggu melalui air dan makanan—setara dengan berat sebuah kartu kredit.",
  "Kantong plastik pertama kali diperkenalkan di supermarket pada tahun 1977.",
  "Botol plastik pertama kali dipasarkan secara komersial pada tahun 1947, tetapi tetap sangat mahal sampai awal 1960-an.",
  "Indonesia adalah penyumbang sampah plastik ke laut terbesar kedua di dunia setelah China.",
  "Produksi plastik global telah meningkat dari 1,5 juta ton pada tahun 1950 menjadi lebih dari 350 juta ton saat ini.",
  "Sekitar 40% dari plastik yang diproduksi setiap tahun adalah plastik sekali pakai yang digunakan untuk kemasan.",
  "Penyu sering salah mengira kantong plastik sebagai ubur-ubur, yang merupakan makanan utama mereka.",
  "Burung laut sering mati karena perutnya penuh dengan potongan plastik yang tidak bisa dicerna.",
  "Mikroplastik telah ditemukan di tempat-tempat paling terpencil di bumi, dari puncak Gunung Everest hingga dasar Palung Mariana."
];
