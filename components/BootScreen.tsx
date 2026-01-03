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
 * @file BootScreen.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { motion } from 'framer-motion';

export const BootScreen: React.FC = () => {
    const setBooting = useStore(state => state.setBooting);
    const [lines, setLines] = useState<string[]>([]);
    const [showLogo, setShowLogo] = useState(false);

    const bootSequence = [
        "Initializing ARCHONIC BIOS v5.0.0...",
        "Validating Quantum Signatures...",
        "Loading Neural Engine... 100%",
        "Mounting Archonic File System...",
        "Establishing Secure Uplink...",
        "Decrypting User Identity...",
        "Starting Window Manager...",
        "System Ready."
    ];

    useEffect(() => {
        let delay = 0;
        bootSequence.forEach((line, index) => {
            delay += Math.random() * 200 + 100;
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (index === bootSequence.length - 1) {
                    setTimeout(() => setShowLogo(true), 800);
                }
            }, delay);
        });
    }, []);

    useEffect(() => {
        if (showLogo) {
            setTimeout(() => {
                setBooting(false);
            }, 3500);
        }
    }, [showLogo, setBooting]);

    return (
        <div className="fixed inset-0 z-[10000] bg-[#050510] text-white font-mono flex flex-col items-center justify-center p-8 cursor-none overflow-hidden">
            {!showLogo ? (
                <div className="w-full max-w-2xl relative z-10 font-mono text-xs sm:text-sm">
                    {lines.map((line, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-cyan-500 mb-1 tracking-wide shadow-cyan-500/50 flex"
                        >
                            <span className="opacity-50 mr-2">{`[${new Date().toLocaleTimeString()}]`}</span>
                            {`> ${line}`}
                        </motion.div>
                    ))}
                    <div className="text-cyan-500 animate-pulse mt-2">_</div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center relative z-20"
                >
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-8 relative group"
                    >
                        <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-30 rounded-full animate-pulse"></div>
                        <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[#0A0C27] to-[#1e1e24] border border-white/10 flex items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.2)] relative z-10 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                            <span className="text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 drop-shadow-2xl">A</span>
                            
                            {/* Shiny effect */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-[0.15em] text-white mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            ARCHONIC
                        </h1>
                        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-[0.15em] text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            CODEX
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100px" }}
                        transition={{ delay: 1.2, duration: 1.5 }}
                        className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8"
                    />

                    <motion.p 
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 0.8, letterSpacing: '0.3em' }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="text-sm font-mono text-cyan-300 uppercase glow-text"
                    >
                        by Ashraf Morningstar
                    </motion.p>
                </motion.div>
            )}
            
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] animate-pulse"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
        </div>
    );
};