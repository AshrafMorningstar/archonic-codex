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
 * @file TaskManager.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { WindowState } from '../types';
import { Activity, XCircle, Cpu, HardDrive } from 'lucide-react';

export const TaskManager: React.FC = () => {
    const windows = useStore(state => state.windows);
    const closeWindow = useStore(state => state.closeWindow);
    const [stats, setStats] = useState<Record<string, { cpu: number, mem: number }>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            const newStats: Record<string, { cpu: number, mem: number }> = {};
            Object.keys(windows).forEach(id => {
                newStats[id] = {
                    cpu: Math.random() * 15,
                    mem: Math.random() * 200 + 50
                };
            });
            setStats(newStats);
        }, 1000);
        return () => clearInterval(interval);
    }, [windows]);

    return (
        <div className="h-full flex flex-col bg-[#1e1e24] text-white">
            <div className="h-12 border-b border-white/10 flex items-center px-4 bg-[#252529]">
                <Activity className="text-green-500 mr-2" size={18} />
                <span className="font-bold">System Nexus</span>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-[#1a1a1e]">
                        <tr>
                            <th className="px-4 py-3">Process Name</th>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3 text-right">CPU %</th>
                            <th className="px-4 py-3 text-right">Memory</th>
                            <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {Object.values(windows).map((win: WindowState) => (
                            <tr key={win.id} className="hover:bg-white/5">
                                <td className="px-4 py-3 font-medium flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    {win.id}
                                </td>
                                <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                                    PID-{Math.floor(Math.random() * 9000 + 1000)}
                                </td>
                                <td className="px-4 py-3 text-right font-mono">
                                    {stats[win.id]?.cpu.toFixed(1)}%
                                </td>
                                <td className="px-4 py-3 text-right font-mono text-gray-400">
                                    {stats[win.id]?.mem.toFixed(0)} MB
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button 
                                        onClick={() => closeWindow(win.id)}
                                        className="text-red-400 hover:bg-red-500/10 px-2 py-1 rounded"
                                    >
                                        End Task
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="h-16 border-t border-white/10 bg-[#151518] flex items-center justify-around px-4">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1"><Cpu size={14}/> Total CPU</div>
                    <span className="font-mono text-lg">{Object.values(stats).reduce<number>((a, b) => a + b.cpu, 0).toFixed(1)}%</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1"><HardDrive size={14}/> Memory Usage</div>
                    <span className="font-mono text-lg">{(Object.values(stats).reduce<number>((a, b) => a + b.mem, 0) / 1024).toFixed(2)} GB</span>
                </div>
            </div>
        </div>
    );
};