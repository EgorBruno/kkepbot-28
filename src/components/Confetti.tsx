
import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji: string;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    // Create confetti pieces
    const colors = ['#FF4081', '#3D5AFE', '#00E676', '#FFEA00', '#FF3D00'];
    const emojis = ['🎊', '🎉', '🥳', '✨', '🎆', '🎇', '🎈'];
    const newConfetti = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 10 + Math.random() * 20,
      speed: 1 + Math.random() * 3,
      opacity: 0.7 + Math.random() * 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: -5 + Math.random() * 10
    }));
    
    setConfetti(newConfetti);
    
    const interval = setInterval(() => {
      setConfetti(prev => 
        prev.map(piece => {
          // Update position
          const newY = piece.y + piece.speed;
          const newRotation = (piece.rotation + piece.rotationSpeed) % 360;
          
          // Reset if out of view
          if (newY > 100) {
            return {
              ...piece,
              y: -10 - Math.random() * 10,
              x: Math.random() * 100,
              rotation: Math.random() * 360
            };
          }
          
          return {
            ...piece,
            y: newY,
            rotation: newRotation
          };
        })
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute text-xl"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            fontSize: `${piece.size}px`,
            opacity: piece.opacity,
            transform: `rotate(${piece.rotation}deg)`,
            transition: 'transform 0.1s linear',
            zIndex: 5
          }}
        >
          {piece.emoji}
        </div>
      ))}
    </div>
  );
};

export default Confetti;
