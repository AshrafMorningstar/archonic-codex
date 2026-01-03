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
 * @file ControlCenter.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { Wifi, Bluetooth, Zap, Moon, Sun, Volume2, Monitor, Airplay, Music } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export const ControlCenter: React.FC = () => {
    const isOpen = useStore(state => state.isControlCenterOpen);
    const close = useStore(state => state.toggleControlCenter);
    const { 
        wifi, bluetooth, airdrop, dnd, nightShift, brightness, volume,
        toggleSystemState, setBrightness, setVolume 
    } = useStore();

    const Toggle = ({ active, onClick, icon: Icon, label }: any) => (
        <div className="flex flex-col gap-2">
             <button 
                onClick={onClick}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    active ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
            >
                <Icon size={20} />
            </button>
            <span className="text-[10px] font-medium text-center text-gray-300">{label}</span>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[40] bg-transparent"
                        onClick={close}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
                        className="fixed top-12 right-4 w-80 bg-[#1e1e24]/90 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-4 z-[50] flex flex-col gap-4"
                    >
                        {/* Connectivity Grid */}
                        <div className="grid grid-cols-4 gap-2 p-2 bg-black/20 rounded-xl border border-white/5">
                            <Toggle active={wifi} onClick={() => toggleSystemState('wifi')} icon={Wifi} label="Wi-Fi" />
                            <Toggle active={bluetooth} onClick={() => toggleSystemState('bluetooth')} icon={Bluetooth} label="Bluetooth" />
                            <Toggle active={airdrop} onClick={() => toggleSystemState('airdrop')} icon={Airplay} label="Airdrop" />
                            <Toggle active={dnd} onClick={() => toggleSystemState('dnd')} icon={Moon} label="DND" />
                        </div>

                        {/* Sliders */}
                        <div className="flex flex-col gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium text-gray-400">
                                    <span className="flex items-center gap-1"><Monitor size={12}/> Display</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="20" max="100" 
                                    value={brightness} 
                                    onChange={(e) => setBrightness(Number(e.target.value))}
                                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-medium text-gray-400">
                                    <span className="flex items-center gap-1"><Volume2 size={12}/> Sound</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" max="100" 
                                    value={volume} 
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-white"
                                />
                            </div>
                        </div>

                        {/* Extra Toggles */}
                        <div className="grid grid-cols-2 gap-3">
                             <button 
                                onClick={() => toggleSystemState('nightShift')}
                                className={`h-16 rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-colors ${
                                    nightShift ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                             >
                                <Sun size={20} />
                                <span className="font-medium text-sm">Night Shift</span>
                             </button>
                             <div className="h-16 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center gap-3">
                                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                     <Music size={20} className="text-white" />
                                 </div>
                                 <div className="flex flex-col">
                                     <span className="text-xs font-bold text-gray-200">Playing</span>
                                     <span className="text-[10px] text-gray-400">Cyber Drift</span>
                                 </div>
                             </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};