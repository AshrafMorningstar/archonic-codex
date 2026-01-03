/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file NeuralInterface.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';
import { Theme } from '../types';

interface NeuralParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  energy: number;
  connections: string[];
}

export const NeuralInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<NeuralParticle[]>([]);
  const neuralActivity = useStore((state) => state.neuralActivity);
  const increaseActivity = useStore((state) => state.increaseNeuralActivity);
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    // Create quantum particles
    particles.current = Array.from({ length: 150 }, (_, i) => ({
      id: `neuron-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      energy: Math.random(),
      connections: []
    }));
    
    // Create neural connections
    particles.current.forEach((particle, i) => {
      const connections = particles.current
        .filter((_, j) => j !== i && Math.random() > 0.95) 
        .map(p => p.id);
      particle.connections = connections;
    });
    
    let animationFrameId: number;

    // Animation loop
    const animate = () => {
      // Clear with trail effect for quantum motion
      ctx.fillStyle = theme === Theme.LIGHT ? 'rgba(240, 244, 248, 0.2)' : 'rgba(10, 12, 39, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const lineColor = theme === Theme.LIGHT ? 'rgba(99, 102, 241,' : 'rgba(76, 201, 240,';
      const particleColor = theme === Theme.LIGHT ? '99, 102, 241' : '76, 201, 240';

      // Draw connections
      ctx.lineWidth = 0.5;
      
      particles.current.forEach(particle => {
        particle.connections.forEach(connId => {
          const target = particles.current.find(p => p.id === connId);
          if (target) {
            const dx = particle.x - target.x;
            const dy = particle.y - target.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 250) {
                ctx.strokeStyle = `${lineColor} ${(1 - dist/250) * 0.3 * neuralActivity})`;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
            }
          }
        });
      });
      
      // Draw particles
      particles.current.forEach(particle => {
        // Quantum drift with time dilation (slower movement)
        particle.x += (Math.random() - 0.5) * 0.3;
        particle.y += (Math.random() - 0.5) * 0.3;
        
        // Wrap around universe
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with quantum glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `rgba(${particleColor}, ${particle.energy})`);
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Neural reaction to pointer
    const handleActivity = (e: MouseEvent) => {
      increaseActivity();
      
      particles.current.forEach(particle => {
        const dx = particle.x - e.clientX;
        const dy = particle.y - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion/Attraction quantum effect
        if (distance < 300) {
          particle.energy = Math.min(1, particle.energy + 0.05);
          gsap.to(particle, {
            x: particle.x + (dx / distance) * 10,
            y: particle.y + (dy / distance) * 10,
            duration: 1.5,
            ease: 'power2.out'
          });
        }
      });
    };
    
    window.addEventListener('mousemove', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [neuralActivity, increaseActivity, theme]);
  
  if (theme !== Theme.QUANTUM && theme !== Theme.LIGHT) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${theme === Theme.LIGHT ? 'bg-[#F0F4F8]' : 'bg-chronos-blue'}`}
    />
  );
};