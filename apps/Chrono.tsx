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
 * @file Chrono.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export const Chrono: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const requestRef = useRef<number>();
    const startTimeRef = useRef<number>(0);

    const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp - time;
        setTime(timestamp - startTimeRef.current);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current!);
            startTimeRef.current = 0;
        }
        return () => cancelAnimationFrame(requestRef.current!);
    }, [isRunning]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const handleLap = () => {
        setLaps([time, ...laps]);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        startTimeRef.current = 0;
    };

    return (
        <div className="h-full bg-[#0f0f12] text-white flex flex-col p-6">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-7xl font-mono font-thin tabular-nums tracking-wider text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    {formatTime(time)}
                </div>
            </div>
            
            <div className="flex items-center justify-center gap-8 mb-8">
                <button 
                    onClick={handleReset}
                    className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                    <RotateCcw size={24} />
                </button>
                <button 
                    onClick={() => setIsRunning(!isRunning)}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
                <button 
                    onClick={handleLap}
                    disabled={!isRunning}
                    className="w-16 h-16 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                    <Flag size={24} />
                </button>
            </div>

            <div className="h-48 bg-[#1a1a1e] rounded-xl border border-white/5 overflow-y-auto p-2">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b border-white/5">
                            <th className="py-2 text-left px-4">Lap</th>
                            <th className="py-2 text-right px-4">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {laps.map((lap, i) => (
                            <tr key={i} className="hover:bg-white/5 font-mono">
                                <td className="py-2 px-4 text-blue-400">Lap {laps.length - i}</td>
                                <td className="py-2 px-4 text-right">{formatTime(lap)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};