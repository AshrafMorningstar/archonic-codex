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
 * @file Dock.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState } from 'react';
import { useStore } from '../store';
import { AppConfig, Theme } from '../types';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';

interface DockProps {
  apps: AppConfig[];
}

export const Dock: React.FC<DockProps> = ({ apps }) => {
  const openWindow = useStore((state) => state.openWindow);
  const windows = useStore((state) => state.windows);
  const activeWindowId = useStore((state) => state.activeWindowId);
  const theme = useStore((state) => state.theme);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  const dockSpring = useSpring({
    from: { y: 150, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: { tension: 280, friction: 20 }
  });

  const handleAppHover = (appId: string) => {
    setHoveredApp(appId);
    
    // Animate other icons shrinking slightly
    apps.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element && app.id !== appId) {
        gsap.to(element, {
          scale: 0.9,
          opacity: 0.8,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    // Animate hovered icon jumping up
    const hoveredElement = document.getElementById(`dock-icon-${appId}`);
    if (hoveredElement) {
      gsap.to(hoveredElement, {
        scale: 1.4,
        y: -15,
        duration: 0.3,
        ease: 'back.out(2)'
      });
    }
  };
  
  const handleAppLeave = () => {
    setHoveredApp(null);
    
    // Reset all icons
    apps.forEach(app => {
      const element = document.getElementById(`dock-icon-${app.id}`);
      if (element) {
        gsap.to(element, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
  };

  const handleAppClick = (appId: string, isFull?: boolean) => {
      openWindow(appId, { size: isFull ? {width: 1000, height: 700} : undefined });
      
      // Quantum Ripple
      const ripple = document.createElement('div');
      ripple.className = 'fixed w-10 h-10 rounded-full bg-quantum-glow/50 pointer-events-none z-[10000]';
      const icon = document.getElementById(`dock-icon-${appId}`);
      if (icon) {
          const rect = icon.getBoundingClientRect();
          ripple.style.left = `${rect.left + rect.width/2}px`;
          ripple.style.top = `${rect.top + rect.height/2}px`;
          ripple.style.transform = 'translate(-50%, -50%)';
          document.body.appendChild(ripple);
          
          gsap.to(ripple, {
              scale: 5,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.out',
              onComplete: () => ripple.remove()
          });
      }
  };

  return (
    <animated.div 
        style={dockSpring}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]"
    >
      <div className="relative group/dock">
        {/* Nebula Dock Background */}
        <div className={`absolute inset-0 rounded-2xl backdrop-blur-xl border transform -skew-x-2 transition-all duration-300 ${
            theme === Theme.LIGHT 
            ? 'bg-white/80 border-gray-200 shadow-xl' 
            : 'bg-[rgba(10,12,39,0.85)] border-neuro-purple/30 shadow-[0_0_50px_rgba(58,12,163,0.3)]'
        }`} />
        
        {/* Quantum Energy Flow */}
        <div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 ${
            theme === Theme.LIGHT ? 'opacity-0' : 'bg-gradient-to-r from-neuro-purple/20 via-transparent to-quantum-glow/20 opacity-100'
        }`} />

        <div className="relative flex items-center justify-center gap-4 px-6 py-3">
            {apps.map((app) => {
            const isOpen = windows[app.id]?.isOpen;
            const isActive = activeWindowId === app.id;
            const isHovered = hoveredApp === app.id;

            return (
                <div 
                    key={app.id} 
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => handleAppHover(app.id)}
                    onMouseLeave={handleAppLeave}
                >
                <button
                    id={`dock-icon-${app.id}`}
                    onClick={() => handleAppClick(app.id, app.isFull)}
                    className={`
                        relative w-12 h-12 rounded-xl flex items-center justify-center 
                        transition-all duration-300 border focus:outline-none
                        ${isActive 
                            ? (theme === Theme.LIGHT ? 'bg-blue-100 border-blue-300' : 'bg-neuro-purple/30 border-neuro-purple/50') 
                            : 'bg-transparent border-transparent'
                        }
                    `}
                >
                    <app.icon 
                        size={24} 
                        className={`transition-colors duration-300 ${
                            isActive 
                            ? (theme === Theme.LIGHT ? 'text-blue-600' : 'text-quantum-glow') 
                            : (theme === Theme.LIGHT ? 'text-gray-600' : 'text-gray-300')
                        }`} 
                        strokeWidth={1.5}
                    />
                     {/* Hover Glow */}
                    {isHovered && (
                        <div className={`absolute inset-0 rounded-xl blur-md pointer-events-none ${
                            theme === Theme.LIGHT ? 'bg-blue-400/20' : 'bg-quantum-glow/30'
                        }`} />
                    )}
                </button>
                
                {/* Dot indicator */}
                <div className={`mt-1.5 w-1 h-1 rounded-full transition-all duration-300 ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                } ${
                    theme === Theme.LIGHT ? 'bg-blue-500' : 'bg-quantum-glow'
                }`} />
                
                {/* App Name Tooltip */}
                {isHovered && (
                  <div className={`absolute -top-12 px-3 py-1.5 rounded-lg border backdrop-blur-md z-20 ${
                      theme === Theme.LIGHT 
                      ? 'bg-white/90 border-gray-200 text-gray-800' 
                      : 'bg-[#050510]/90 border-neuro-purple/30 text-quantum-glow'
                  }`}>
                     <span className="text-xs font-display whitespace-nowrap">{app.title}</span>
                     <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b ${
                         theme === Theme.LIGHT 
                         ? 'bg-white/90 border-gray-200' 
                         : 'bg-[#050510]/90 border-neuro-purple/30'
                     }`} />
                  </div>
                )}
                </div>
            );
            })}
        </div>
      </div>
    </animated.div>
  );
};