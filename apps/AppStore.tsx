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
 * @file AppStore.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { useStore } from '../store';
import { Search, Download, Check, PackageOpen, Star } from 'lucide-react';
import { APPS_CONFIG } from '../App'; 

export const AppStore: React.FC = () => {
    const installedApps = useStore(state => state.installedApps);
    const installApp = useStore(state => state.installApp);
    const uninstallApp = useStore(state => state.uninstallApp);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    // Filter available apps from the main config
    const availableApps = APPS_CONFIG.filter(app => app.id !== 'store' && app.id !== 'settings');

    const filtered = availableApps.filter(app => {
        const matchesSearch = app.title.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || app.category === filter;
        return matchesSearch && matchesFilter;
    });

    const handleInstall = (id: string) => {
        if (installedApps.includes(id)) {
            uninstallApp(id);
        } else {
            installApp(id);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#121214] text-white">
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#1a1a1e]">
                <div className="flex items-center gap-2">
                    <PackageOpen className="text-blue-500" />
                    <span className="font-bold text-xl">Nexus Store</span>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Discover apps..." 
                        className="bg-black/30 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 p-4 space-y-1">
                    {['All', 'Productivity', 'Creative', 'Games', 'Utilities'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${filter === cat ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map(app => {
                            const isInstalled = installedApps.includes(app.id);
                            return (
                                <div key={app.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex gap-4 hover:bg-white/10 transition-colors">
                                    <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center text-gray-300">
                                        <app.icon size={32} />
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="font-bold">{app.title}</h3>
                                        <span className="text-xs text-gray-500 mb-auto">{app.category || 'Utility'}</span>
                                        <button 
                                            onClick={() => handleInstall(app.id)}
                                            className={`mt-2 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                                                isInstalled 
                                                ? 'bg-gray-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400' 
                                                : 'bg-blue-600 text-white hover:bg-blue-500'
                                            }`}
                                        >
                                            {isInstalled ? <Check size={14} /> : <Download size={14} />}
                                            {isInstalled ? 'Installed' : 'Get'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};