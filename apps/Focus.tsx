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
 * @file Focus.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

export const Focus: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play alarm sound if we had one
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode: 'focus' | 'break') => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = 100 - (timeLeft / (mode === 'focus' ? 25 * 60 : 5 * 60)) * 100;

    return (
        <div className={`h-full flex flex-col items-center justify-center transition-colors duration-500 ${mode === 'focus' ? 'bg-[#1a1a2e]' : 'bg-[#1e3a2a]'} text-white`}>
            <div className="flex gap-4 mb-8 bg-black/20 p-2 rounded-full backdrop-blur-sm">
                <button 
                    onClick={() => switchMode('focus')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'focus' ? 'bg-indigo-600 shadow-lg' : 'hover:bg-white/10'}`}
                >
                    <Brain size={18} /> Focus
                </button>
                <button 
                    onClick={() => switchMode('break')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${mode === 'break' ? 'bg-emerald-600 shadow-lg' : 'hover:bg-white/10'}`}
                >
                    <Coffee size={18} /> Break
                </button>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                    <circle 
                        cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        className={mode === 'focus' ? 'text-indigo-500' : 'text-emerald-500'}
                        strokeDasharray={2 * Math.PI * 120}
                        strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="text-6xl font-mono font-bold tracking-wider relative z-10">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex items-center gap-6">
                 <button 
                    onClick={toggleTimer}
                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                 >
                     {isActive ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                 </button>
                 <button 
                    onClick={resetTimer}
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                 >
                     <RotateCcw size={20} />
                 </button>
            </div>
        </div>
    );
};