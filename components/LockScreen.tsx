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
 * @file LockScreen.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Fingerprint, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export const LockScreen: React.FC = () => {
    const isLocked = useStore(state => state.isLocked);
    const unlock = useStore(state => state.unlock);
    const [time, setTime] = useState(new Date());
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        unlock();
    };

    return (
        <AnimatePresence>
            {isLocked && (
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center text-white bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531685250784-75699ddc9f91?q=80&w=2069&auto=format&fit=crop)' }}
                >
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative z-10 flex flex-col items-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-8xl font-thin tracking-tighter mb-2 font-display"
                        >
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </motion.div>
                        <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.2 }}
                             className="text-xl font-medium opacity-80"
                        >
                            {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                        </motion.div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <motion.div
                             initial={{ scale: 0.8, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             transition={{ delay: 0.4 }}
                             className="w-24 h-24 rounded-full bg-gradient-to-br from-neuro-purple to-quantum-glow p-1 shadow-2xl"
                        >
                             <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                                <img src="https://github.com/AshrafMorningstar.png" alt="Ashraf Morningstar" className="w-full h-full object-cover" />
                             </div>
                        </motion.div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-1">Ashraf Morningstar</h2>
                            <p className="text-sm opacity-60">Enter password to unlock</p>
                        </div>

                        {!showPassword ? (
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowPassword(true)}
                                className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/10 transition-colors"
                            >
                                <Fingerprint size={20} />
                                <span>Touch ID or Click to Unlock</span>
                            </motion.button>
                        ) : (
                            <motion.form 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onSubmit={handleSubmit}
                                className="flex items-center gap-2"
                            >
                                <input 
                                    type="password" 
                                    autoFocus
                                    placeholder="Password"
                                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-center text-white placeholder-white/30 outline-none focus:border-white/50 w-48 transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </motion.form>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};