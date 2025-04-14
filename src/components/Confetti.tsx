
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  type: 'rest' | 'warning';
}

const Confetti: React.FC<ConfettiProps> = ({ type }) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; rotation: number; scale: number; emoji: string }[]>([]);

  useEffect(() => {
    const emoji = type === 'rest' ? '🎊' : '😭';
    const particleCount = type === 'rest' ? 15 : 8;
    
    // Create particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50 - 20,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      emoji
    }));
    
    setParticles(newParticles);
    
    return () => {
      setParticles([]);
    };
  }, [type]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`, 
            rotate: particle.rotation,
            scale: particle.scale
          }}
          animate={{ 
            x: [
              `${particle.x}%`, 
              `${particle.x + (Math.random() * 20 - 10)}%`, 
              `${particle.x + (Math.random() * 40 - 20)}%`
            ],
            y: ['0%', '50%', '100%'],
            rotate: [particle.rotation, particle.rotation + 180, particle.rotation + 360],
          }}
          transition={{ 
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute text-xl sm:text-2xl"
          style={{ fontSize: `${1 + particle.scale}rem` }}
        >
          {particle.emoji}
        </motion.div>
      ))}
      
      {type === 'rest' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-3xl font-bold text-center text-schedule-purple dark:text-purple-300 whitespace-nowrap"
        >
          УРА! ОТДЫХ!
        </motion.div>
      )}
      
      {type === 'warning' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl sm:text-2xl font-bold text-center text-red-500 whitespace-nowrap"
        >
          Скоро начало пары!
        </motion.div>
      )}
    </div>
  );
};

export default Confetti;
