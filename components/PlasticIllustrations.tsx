
import React from 'react';
import { motion } from 'motion/react';

interface IllustrationProps {
  color: string;
  className?: string;
}

export const PETIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M40 20C40 17.7909 41.7909 16 44 16H56C58.2091 16 60 17.7909 60 20V25H40V20Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      d="M35 25H65V35C65 35 62 38 62 45V75C62 80.5228 57.5228 85 52 85H48C42.4772 85 38 80.5228 38 75V45C38 38 35 35 35 35V25Z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <rect x="42" y="45" width="16" height="2" rx="1" fill={color} opacity="0.3" />
    <rect x="42" y="50" width="16" height="2" rx="1" fill={color} opacity="0.3" />
    <rect x="42" y="55" width="16" height="2" rx="1" fill={color} opacity="0.3" />
  </svg>
);

export const HDPEIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M35 25H55V20C55 17.7909 56.7909 16 59 16H65C67.2091 16 69 17.7909 69 20V25H70C72.7614 25 75 27.2386 75 30V80C75 82.7614 72.7614 85 70 85H30C27.2386 85 25 82.7614 25 80V35C25 32.2386 27.2386 30 30 30H35V25Z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      d="M35 35V45C35 47.2091 36.7909 49 39 49H46C48.2091 49 50 47.2091 50 45V35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PVCIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.rect
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      x="20" y="40" width="60" height="20" rx="4"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
      d="M70 40V25C70 22.7909 71.7909 21 74 21H80"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
      d="M30 60V75C30 77.2091 28.2091 79 26 79H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const LDPEIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M30 30C30 25 35 20 40 20H60C65 20 70 25 70 30V40H30V30Z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
      d="M30 40L25 80C25 82.7614 27.2386 85 30 85H70C72.7614 85 75 82.7614 75 80L70 40H30Z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1, delay: 1 }}
      d="M40 50C45 55 55 55 60 50"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PPIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.rect
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      x="25" y="40" width="50" height="35" rx="4"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.rect
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
      x="20" y="35" width="60" height="8" rx="2"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
      d="M70 35L80 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PSIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M35 30H65L60 80C60 82.7614 57.7614 85 55 85H45C42.2386 85 40 82.7614 40 80L35 30Z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.ellipse
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
      cx="50" cy="30" rx="15" ry="5"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
      d="M30 40H70"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4 4"
    />
  </svg>
);

export const OTHERIllustration: React.FC<IllustrationProps> = ({ color, className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      d="M30 40C30 35 35 30 40 30H60C65 30 70 35 70 40V80C70 82.7614 67.7614 85 65 85H35C32.2386 85 30 82.7614 30 80V40Z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeWidth="2"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
      d="M45 30V20C45 17.7909 46.7909 16 49 16H51C53.2091 16 55 17.7909 55 20V30"
      stroke={color}
      strokeWidth="2"
    />
    <motion.circle
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 1, delay: 1 }}
      cx="50" cy="55" r="10"
      fill={color}
    />
  </svg>
);

export const ItemIllustration: React.FC<{ type: string; color: string; className?: string }> = ({ type, color, className }) => {
  const commonProps = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1, ease: "easeInOut" },
    stroke: color,
    strokeWidth: "2.5",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case 'bottle':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M42 20H58V25H42V20Z" />
          <motion.path {...commonProps} d="M38 25H62V35C62 40 60 42 60 48V80C60 83 58 85 55 85H45C42 85 40 83 40 80V48C40 42 38 40 38 35V25Z" />
        </svg>
      );
    case 'jug':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M35 25H55V20C55 18 57 16 59 16H65C67 16 69 18 69 20V25H70C73 25 75 27 75 30V80C75 83 73 85 70 85H30C27 85 25 83 25 80V35C25 32 27 30 30 30H35V25Z" />
          <motion.path {...commonProps} d="M35 35V45C35 47 37 49 39 49H46C48 49 50 47 50 45V35" />
        </svg>
      );
    case 'bag':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M30 30C30 25 35 20 40 20H60C65 20 70 25 70 30V40H30V30Z" />
          <motion.path {...commonProps} d="M30 40L25 80C25 83 27 85 30 85H70C73 85 75 83 75 80L70 40H30Z" />
        </svg>
      );
    case 'box':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.rect {...commonProps} x="25" y="40" width="50" height="35" rx="4" />
          <motion.rect {...commonProps} x="20" y="35" width="60" height="8" rx="2" />
        </svg>
      );
    case 'tube':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M40 85V25C40 22 42 20 45 20H55C58 20 60 22 60 25V85" />
          <motion.path {...commonProps} d="M40 75H60" />
        </svg>
      );
    case 'cup':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M35 30H65L60 80C60 83 58 85 55 85H45C42 85 40 83 40 80L35 30Z" />
          <motion.ellipse {...commonProps} cx="50" cy="30" rx="15" ry="5" />
        </svg>
      );
    case 'pipe':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.rect {...commonProps} x="20" y="40" width="60" height="20" rx="4" />
          <motion.path {...commonProps} d="M70 40V25C70 23 72 21 74 21H80" />
        </svg>
      );
    case 'wrap':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.path {...commonProps} d="M20 30C20 30 35 25 50 30C65 35 80 30 80 30V70C80 70 65 75 50 70C35 65 20 70 20 70V30Z" />
        </svg>
      );
    case 'toy':
      return (
        <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
          <motion.circle {...commonProps} cx="50" cy="40" r="15" />
          <motion.rect {...commonProps} x="35" y="55" width="30" height="25" rx="5" />
          <motion.circle {...commonProps} cx="40" cy="80" r="5" />
          <motion.circle {...commonProps} cx="60" cy="80" r="5" />
        </svg>
      );
    default:
      return null;
  }
};

export const PlasticIllustration: React.FC<{ code: number; color: string; className?: string }> = ({ code, color, className }) => {
  switch (code) {
    case 1: return <PETIllustration color={color} className={className} />;
    case 2: return <HDPEIllustration color={color} className={className} />;
    case 3: return <PVCIllustration color={color} className={className} />;
    case 4: return <LDPEIllustration color={color} className={className} />;
    case 5: return <PPIllustration color={color} className={className} />;
    case 6: return <PSIllustration color={color} className={className} />;
    case 7: return <OTHERIllustration color={color} className={className} />;
    default: return null;
  }
};
