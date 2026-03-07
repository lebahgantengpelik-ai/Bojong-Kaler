
import React from 'react';
import { motion } from 'motion/react';
import { Recycle, Trash2, Droplets, Wind, Info, Package, Container } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay = 0, x = "0%", y = "0%", size = 24, opacity = 0.1, color = "currentColor" }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: opacity, 
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      opacity: { duration: 1 },
      scale: { duration: 1 },
      y: { duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 7 + Math.random() * 5, repeat: Infinity, ease: "easeInOut", delay }
    }}
    className="absolute pointer-events-none z-0"
    style={{ left: x, top: y, color }}
  >
    <Icon size={size} />
  </motion.div>
);

const PlasticAccents: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left */}
      <FloatingIcon icon={Recycle} x="5%" y="10%" size={48} opacity={0.05} color="#10b981" delay={0} />
      <FloatingIcon icon={Package} x="12%" y="25%" size={32} opacity={0.03} color="#3b82f6" delay={1} />
      
      {/* Top Right */}
      <FloatingIcon icon={Container} x="85%" y="15%" size={56} opacity={0.04} color="#10b981" delay={2} />
      <FloatingIcon icon={Droplets} x="75%" y="5%" size={24} opacity={0.06} color="#3b82f6" delay={0.5} />
      
      {/* Middle Left */}
      <FloatingIcon icon={Trash2} x="8%" y="50%" size={40} opacity={0.03} color="#ef4444" delay={3} />
      <FloatingIcon icon={Recycle} x="15%" y="65%" size={28} opacity={0.04} color="#10b981" delay={1.5} />
      
      {/* Middle Right */}
      <FloatingIcon icon={Wind} x="90%" y="45%" size={36} opacity={0.03} color="#fbbf24" delay={4} />
      <FloatingIcon icon={Package} x="82%" y="70%" size={44} opacity={0.04} color="#3b82f6" delay={2.5} />
      
      {/* Bottom Left */}
      <FloatingIcon icon={Droplets} x="10%" y="85%" size={32} opacity={0.05} color="#3b82f6" delay={1.2} />
      <FloatingIcon icon={Container} x="20%" y="92%" size={24} opacity={0.03} color="#10b981" delay={3.5} />
      
      {/* Bottom Right */}
      <FloatingIcon icon={Recycle} x="88%" y="88%" size={52} opacity={0.05} color="#10b981" delay={0.8} />
      <FloatingIcon icon={Trash2} x="78%" y="95%" size={30} opacity={0.04} color="#ef4444" delay={2.2} />

      {/* Subtle Plastic Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/criss-cross.png')]"></div>
    </div>
  );
};

export default PlasticAccents;
