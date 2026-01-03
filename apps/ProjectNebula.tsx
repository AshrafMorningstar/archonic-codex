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
 * @file ProjectNebula.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Eye, X, Newspaper, ExternalLink, Zap } from 'lucide-react';

// Mock Data
const PROJECTS = [
    { id: 1, title: "Quantum Ledger", description: "A decentralized immutable ledger based on quantum entanglement states.", tags: ["React", "Quantum", "Solidity"], image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000" },
    { id: 2, title: "Neural Net V2", description: "Self-evolving neural network visualizing thoughts in real-time.", tags: ["AI", "Python", "WebGL"], image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000" },
    { id: 3, title: "Cyber Deck OS", description: "Cyberpunk aesthetic operating system for web environments.", tags: ["TypeScript", "Vite", "Tailwind"], image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000" },
    { id: 4, title: "Void Defender", description: "Retro-style space shooter with modern particle physics.", tags: ["Canvas", "GameDev", "Physics"], image: "https://images.unsplash.com/photo-1614728853970-32a2f4d60a57?q=80&w=1000" },
    { id: 5, title: "HoloStream", description: "Volumetric video streaming protocol for AR devices.", tags: ["WebRTC", "Three.js", "Cloud"], image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=1000" },
    { id: 6, title: "Echo Base", description: "Secure communication terminal for distributed teams.", tags: ["Encryption", "Socket.io", "Electron"], image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000" },
];

export const ProjectNebula: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<string[]>([]);
    const [quickView, setQuickView] = useState<typeof PROJECTS[0] | null>(null);

    useEffect(() => {
        // Quantum Loading Simulation
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const fetchNews = () => {
        const headlines = [
            "Quantum Supremacy Achieved in Local Cluster",
            "New Entanglement Protocol Reduces Latency by 400%",
            "Schrödinger's Cat Found Alive and Dead Simultaneously",
            "Qubit Stability Reaches All-Time High at Room Temp"
        ];
        setNews([]); // Reset
        // Simulate streaming fetch
        headlines.forEach((h, i) => {
            setTimeout(() => setNews(prev => [...prev, h]), (i + 1) * 500);
        });
    };

    return (
        <div className="h-full bg-[#050510] text-gray-200 flex flex-col overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            
            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/5 flex items-center justify-between bg-[#0a0c1a]/80 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                        <Rocket size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Project Nebula</h1>
                        <p className="text-xs text-gray-400 font-mono">Quantum Portfolio Interface</p>
                    </div>
                </div>
                <button 
                    onClick={fetchNews}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all hover:scale-105 active:scale-95 text-sm font-medium text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                >
                    <Newspaper size={16} />
                    Fetch Latest News
                </button>
            </div>

            {/* News Ticker Area */}
            <AnimatePresence>
                {news.length > 0 && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-cyan-900/10 border-b border-cyan-500/20 backdrop-blur-sm relative z-10"
                    >
                        <div className="p-3 flex gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
                            {news.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_5px_rgba(34,211,238,0.2)]"
                                >
                                    <Zap size={12} /> {item}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Grid */}
            <div className="flex-1 overflow-y-auto p-8 relative z-10">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[280px] bg-[#15151a]/50 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                                {/* Quantum Particles Entanglement Effect */}
                                {Array.from({ length: 8 }).map((_, j) => (
                                    <motion.div
                                        key={j}
                                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 2, 0],
                                            x: [0, (Math.random() - 0.5) * 100],
                                            y: [0, (Math.random() - 0.5) * 100],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: j * 0.1,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <div className="absolute bottom-4 left-4 w-3/4 h-4 bg-white/5 rounded animate-pulse" />
                                <div className="absolute bottom-10 left-4 w-1/2 h-6 bg-white/10 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                        {PROJECTS.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100 
                                }}
                                whileHover={{ 
                                    scale: 1.03, 
                                    y: -5,
                                    boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.3)",
                                    zIndex: 10
                                }}
                                className="group relative bg-[#15151a] rounded-xl overflow-hidden border border-white/5 flex flex-col h-full hover:border-purple-500/30 transition-colors"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#15151a] via-transparent to-transparent opacity-90" />
                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                        <h3 className="text-xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">{project.title}</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-gray-200 border border-white/10">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">{project.description}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <button 
                                            onClick={() => setQuickView(project)}
                                            className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-xs font-bold text-purple-400 flex items-center gap-1 hover:bg-purple-500/20 transition-colors border border-purple-500/20"
                                        >
                                            <Eye size={14} /> Quick View
                                        </button>
                                        <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-gray-300 transition-colors border border-white/5 hover:border-white/20">
                                            <ExternalLink size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickView && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setQuickView(null)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-[#1a1a20] border border-purple-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(124,58,237,0.2)]"
                        >
                            <button 
                                onClick={() => setQuickView(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            
                            <h2 className="text-2xl font-bold text-white mb-2">{quickView.title}</h2>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono border border-purple-500/30 flex items-center gap-1">
                                    <Zap size={10} /> {quickView.tags[0]}
                                </div>
                            </div>
                            
                            <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/10">
                                <img src={quickView.image} className="w-full h-full object-cover" />
                            </div>

                            <p className="text-gray-300 leading-relaxed text-sm">{quickView.description}</p>
                            
                            <div className="mt-6 flex justify-end">
                                <button onClick={() => setQuickView(null)} className="text-sm text-gray-400 hover:text-white transition-colors">Close</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};