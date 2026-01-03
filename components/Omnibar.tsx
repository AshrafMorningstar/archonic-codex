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
 * @file Omnibar.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, Command, ArrowRight, AppWindow } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export const Omnibar: React.FC<{ apps: any[] }> = ({ apps }) => {
    const isOpen = useStore(state => state.isOmnibarOpen);
    const close = useStore(state => state.setOmnibarOpen);
    const openWindow = useStore(state => state.openWindow);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredApps = apps.filter(app => 
        app.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') close(false);
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1));
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
        if (e.key === 'Enter') {
            if (filteredApps[selectedIndex]) {
                openWindow(filteredApps[selectedIndex].id);
                close(false);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
                        onClick={() => close(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[10000]"
                    >
                        <div className="bg-[#1e1e24]/90 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                            <div className="flex items-center px-4 py-4 border-b border-white/5">
                                <Search className="text-gray-400 mr-3" size={20} />
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    className="bg-transparent border-none outline-none text-xl text-white flex-1 placeholder-gray-500"
                                    placeholder="Search apps..."
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">ESC</span>
                            </div>
                            
                            <div className="max-h-[300px] overflow-y-auto p-2">
                                {filteredApps.map((app, idx) => (
                                    <div 
                                        key={app.id}
                                        onClick={() => { openWindow(app.id); close(false); }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                                            idx === selectedIndex ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-white/5'
                                        }`}
                                    >
                                        <app.icon size={20} />
                                        <span className="flex-1 font-medium">{app.title}</span>
                                        {idx === selectedIndex && <ArrowRight size={16} className="opacity-50" />}
                                    </div>
                                ))}
                                {filteredApps.length === 0 && (
                                    <div className="p-4 text-center text-gray-500">No results found</div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};