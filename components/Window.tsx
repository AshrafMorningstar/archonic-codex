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
 * @file Window.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2, Minimize2 } from 'lucide-react';
import { useStore } from '../store';
import { AppConfig } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowProps {
  app: AppConfig;
}

export const Window: React.FC<WindowProps> = ({ app }) => {
  const windowState = useStore((state) => state.windows[app.id]);
  const focusWindow = useStore((state) => state.focusWindow);
  const closeWindow = useStore((state) => state.closeWindow);
  const minimizeWindow = useStore((state) => state.minimizeWindow);
  const maximizeWindow = useStore((state) => state.maximizeWindow);
  const updateWindowPosition = useStore((state) => state.updateWindowPosition);
  const updateWindowSize = useStore((state) => state.updateWindowSize);

  const activeWindowId = useStore((state) => state.activeWindowId);
  const isActive = activeWindowId === app.id;

  const titleBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [snapPreview, setSnapPreview] = useState<'left' | 'right' | 'full' | null>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      updateWindowPosition(app.id, { x: newX, y: newY });

      // Snapping Logic
      if (e.clientX < 20) setSnapPreview('left');
      else if (e.clientX > window.innerWidth - 20) setSnapPreview('right');
      else if (e.clientY < 20) setSnapPreview('full');
      else setSnapPreview(null);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      
      // Apply Snap
      if (e.clientX < 20) {
          updateWindowPosition(app.id, { x: 0, y: 0 });
          updateWindowSize(app.id, { width: window.innerWidth / 2, height: window.innerHeight - 80 }); // Minus dock/topbar
      } else if (e.clientX > window.innerWidth - 20) {
          updateWindowPosition(app.id, { x: window.innerWidth / 2, y: 0 });
          updateWindowSize(app.id, { width: window.innerWidth / 2, height: window.innerHeight - 80 });
      } else if (e.clientY < 20) {
          maximizeWindow(app.id);
      }
      setSnapPreview(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, app.id, updateWindowPosition, updateWindowSize, maximizeWindow]);

  const handleMouseDown = (e: React.MouseEvent) => {
    focusWindow(app.id);
    if (windowState?.isMaximized) return;
    
    if (titleBarRef.current && titleBarRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if(target.closest('button')) return;

        setIsDragging(true);
        setDragOffset({
            x: e.clientX - windowState.position.x,
            y: e.clientY - windowState.position.y,
        });
    }
  };

  if (!windowState) return null;

  return (
    <AnimatePresence>
      {windowState.isOpen && !windowState.isMinimized && (
        <>
            {/* Snap Preview Overlay */}
            {isDragging && snapPreview && (
                <div 
                    className={`fixed z-[9998] bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-xl pointer-events-none transition-all duration-200`}
                    style={{
                        top: snapPreview === 'full' ? 40 : 40,
                        left: snapPreview === 'right' ? '50%' : 0,
                        width: snapPreview === 'full' ? '100%' : '50%',
                        height: 'calc(100% - 100px)', // adjust for dock
                        margin: 8
                    }}
                />
            )}

            <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ 
                opacity: 0, 
                scale: 0.95, 
                filter: 'blur(12px)',
                transition: { duration: 0.2, ease: "easeInOut" } 
            }}
            className={`flex flex-col rounded-xl overflow-hidden shadow-2xl transition-shadow duration-200 border border-white/10 ${
                isActive ? 'shadow-black/60 ring-1 ring-white/20' : 'shadow-black/30'
            } glass`}
            style={{
                zIndex: windowState.zIndex,
                position: 'absolute',
                width: windowState.isMaximized ? '100vw' : windowState.size.width,
                height: windowState.isMaximized ? 'calc(100vh - 2rem)' : windowState.size.height,
                top: windowState.isMaximized ? '2rem' : windowState.position.y,
                left: windowState.isMaximized ? 0 : windowState.position.x,
            }}
            onMouseDown={handleMouseDown}
            >
            {/* Title Bar */}
            <div
                ref={titleBarRef}
                className={`h-10 flex items-center justify-between px-4 select-none cursor-default border-b border-white/5 ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'bg-transparent'}`}
                onDoubleClick={() => maximizeWindow(app.id)}
            >
                <div className="flex items-center gap-2 group z-20">
                <button
                    onClick={(e) => { e.stopPropagation(); closeWindow(app.id); }}
                    className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center text-black/0 group-hover:text-black/50 hover:bg-[#ff5f57cc] transition-colors"
                >
                    <X size={8} strokeWidth={3} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); minimizeWindow(app.id); }}
                    className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center text-black/0 group-hover:text-black/50 hover:bg-[#febc2ecc] transition-colors"
                >
                    <Minus size={8} strokeWidth={3} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); maximizeWindow(app.id); }}
                    className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center text-black/0 group-hover:text-black/50 hover:bg-[#28c840cc] transition-colors"
                >
                    {windowState.isMaximized ? <Minimize2 size={8} strokeWidth={3} /> : <Maximize2 size={8} strokeWidth={3} />}
                </button>
                </div>
                
                <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none">
                    <div className="flex items-center gap-2 opacity-90">
                        <app.icon size={14} className="text-blue-400" />
                        <span className="font-semibold text-sm tracking-wide text-gray-200">{app.title}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative bg-[#0f0f12]/90 backdrop-blur-md">
                {app.component}
            </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};