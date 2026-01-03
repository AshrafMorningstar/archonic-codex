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
 * @file MusicPlayer.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc, ListMusic, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SONGS = [
    { id: 1, title: "Quantum Drift", artist: "Neuro Beats", duration: "3:42", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Cybernetic Dreams", artist: "Synthwave Systems", duration: "4:15", cover: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Neon Synapse", artist: "Digital Soul", duration: "2:58", cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Deep Space", artist: "Stellar Void", duration: "5:20", cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" },
];

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(80);
    const visualizerRef = useRef<HTMLDivElement>(null);

    const currentSong = SONGS[currentSongIndex];

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 0.5));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const playPause = () => setIsPlaying(!isPlaying);
    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
        setProgress(0);
        setIsPlaying(true);
    };
    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
        setProgress(0);
        setIsPlaying(true);
    };

    return (
        <div className="h-full bg-[#09090b] flex flex-col text-white">
            <div className="flex-1 flex overflow-hidden">
                {/* Visualizer / Cover Area */}
                <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-black/80 z-0" />
                    
                    {/* Simulated Visualizer Bars */}
                    <div className="absolute inset-0 flex items-end justify-center gap-1 opacity-30 pointer-events-none pb-20 px-8">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.div 
                                key={i}
                                animate={{ 
                                    height: isPlaying ? [20, Math.random() * 200 + 20, 20] : 20,
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                    ease: "easeInOut"
                                }}
                                className="flex-1 bg-indigo-500 rounded-t-sm"
                                style={{ maxHeight: '60%' }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 w-64 h-64 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.4)] border border-white/10">
                        <motion.img 
                            src={currentSong.cover} 
                            alt="Cover" 
                            className="w-full h-full object-cover"
                            animate={{ scale: isPlaying ? 1.05 : 1 }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </div>

                    <div className="relative z-10 mt-8 text-center">
                        <h2 className="text-2xl font-bold mb-1">{currentSong.title}</h2>
                        <p className="text-gray-400">{currentSong.artist}</p>
                    </div>
                </div>

                {/* Playlist Sidebar */}
                <div className="w-80 bg-[#121214] border-l border-white/5 flex flex-col">
                    <div className="p-4 border-b border-white/5 font-bold flex items-center gap-2 text-indigo-400">
                        <ListMusic size={18} /> Playlist
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {SONGS.map((song, idx) => (
                            <div 
                                key={song.id}
                                onClick={() => { setCurrentSongIndex(idx); setIsPlaying(true); }}
                                className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors ${currentSongIndex === idx ? 'bg-white/10 border-l-2 border-indigo-500' : ''}`}
                            >
                                <span className="text-xs text-gray-500 w-4">{idx + 1}</span>
                                <img src={song.cover} className="w-10 h-10 rounded object-cover" />
                                <div className="flex-1">
                                    <div className={`text-sm font-medium ${currentSongIndex === idx ? 'text-indigo-400' : 'text-gray-200'}`}>{song.title}</div>
                                    <div className="text-xs text-gray-500">{song.artist}</div>
                                </div>
                                <span className="text-xs text-gray-600">{song.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="h-24 bg-[#18181b] border-t border-white/5 px-6 flex items-center gap-6 z-20">
                <div className="flex items-center gap-4 w-1/4">
                    <img src={currentSong.cover} className="w-14 h-14 rounded-lg shadow-lg" />
                    <div className="hidden sm:block">
                        <div className="font-bold text-sm">{currentSong.title}</div>
                        <div className="text-xs text-gray-400">{currentSong.artist}</div>
                    </div>
                    <button className="text-gray-400 hover:text-indigo-400"><Heart size={18} /></button>
                </div>

                <div className="flex-1 flex flex-col items-center max-w-xl">
                    <div className="flex items-center gap-6 mb-2">
                         <button className="text-gray-400 hover:text-white" onClick={prevSong}><SkipBack size={20} /></button>
                         <button 
                            className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95"
                            onClick={playPause}
                         >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                         </button>
                         <button className="text-gray-400 hover:text-white" onClick={nextSong}><SkipForward size={20} /></button>
                    </div>
                    <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
                        <span>0:{(progress * 3.42 / 100).toFixed(0).padStart(2, '0')}</span>
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-y-0 left-0 bg-indigo-500" style={{ width: `${progress}%` }} />
                        </div>
                        <span>{currentSong.duration}</span>
                    </div>
                </div>

                <div className="w-1/4 flex justify-end items-center gap-3">
                    <Volume2 size={18} className="text-gray-400" />
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume} 
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
};