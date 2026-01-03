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
 * @file Widgets.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { CloudRain, Battery, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Widgets: React.FC = () => {
    const widgets = useStore(state => state.widgets);
    const updatePos = useStore(state => state.updateWidgetPosition);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const ClockWidget = () => (
        <div className="w-48 h-48 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center text-white shadow-2xl">
            <div className="text-5xl font-thin font-display mb-1">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            <div className="text-sm font-medium text-red-400 uppercase tracking-widest">
                {time.toLocaleDateString([], { weekday: 'long' })}
            </div>
            <div className="text-xs text-gray-400 mt-1">
                {time.toLocaleDateString([], { day: 'numeric', month: 'long' })}
            </div>
        </div>
    );

    const WeatherWidget = () => (
        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-blue-900/60 to-black/60 backdrop-blur-xl border border-white/10 flex flex-col p-6 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-4">
                <span className="font-bold">San Francisco</span>
                <CloudRain className="text-blue-400" />
            </div>
            <div className="text-5xl font-thin mb-2">72°</div>
            <div className="mt-auto text-sm text-blue-200">Partly Cloudy</div>
            <div className="text-xs text-gray-400">H:75° L:62°</div>
        </div>
    );

    const SystemWidget = () => (
        <div className="w-48 h-48 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 flex flex-col p-5 text-white shadow-2xl gap-4">
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-500/20 rounded-full text-green-400"><Battery size={20} /></div>
                 <div>
                     <div className="text-sm font-bold">Battery</div>
                     <div className="text-xs text-gray-400">100%</div>
                 </div>
             </div>
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-purple-500/20 rounded-full text-purple-400"><Cpu size={20} /></div>
                 <div>
                     <div className="text-sm font-bold">Neural CPU</div>
                     <div className="text-xs text-gray-400">12% Load</div>
                 </div>
             </div>
        </div>
    );

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {widgets.map(widget => (
                <motion.div
                    key={widget.id}
                    drag
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                        updatePos(widget.id, widget.x + info.offset.x, widget.y + info.offset.y);
                    }}
                    initial={{ x: widget.x, y: widget.y }}
                    className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
                >
                    {widget.type === 'clock' && <ClockWidget />}
                    {widget.type === 'weather' && <WeatherWidget />}
                    {widget.type === 'system' && <SystemWidget />}
                </motion.div>
            ))}
        </div>
    );
};