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
 * @file Browser.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Globe, Home, X, Plus } from 'lucide-react';

const BOOKMARKS = [
    { title: "Ashraf's GitHub", url: "https://github.com/AshrafMorningstar" },
    { title: "Portfolio", url: "https://jsmfolio.netlify.app/" },
    { title: "Wikipedia", url: "https://www.wikipedia.org/" },
    { title: "Hacker News", url: "https://news.ycombinator.com/" }
];

interface Tab {
    id: number;
    title: string;
    url: string;
    loading: boolean;
    history: string[];
    historyIndex: number;
}

export const Browser: React.FC = () => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, title: 'Portfolio', url: 'https://jsmfolio.netlify.app/', loading: false, history: ['https://jsmfolio.netlify.app/'], historyIndex: 0 }
    ]);
    const [activeTabId, setActiveTabId] = useState(1);
    const [inputUrl, setInputUrl] = useState('https://jsmfolio.netlify.app/');
    
    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const updateTab = (id: number, updates: Partial<Tab>) => {
        setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    };

    const navigate = (newUrl: string) => {
        let finalUrl = newUrl;
        if (!finalUrl.startsWith('http')) {
            finalUrl = 'https://' + finalUrl;
        }

        // Special handling for GitHub to ensure user satisfaction with requirements
        if (finalUrl.includes('github.com')) {
            window.open(finalUrl, '_blank');
            // We also show a placeholder in the tab
        }

        const newHistory = activeTab.history.slice(0, activeTab.historyIndex + 1);
        newHistory.push(finalUrl);

        updateTab(activeTabId, {
            url: finalUrl,
            loading: true,
            history: newHistory,
            historyIndex: newHistory.length - 1,
            title: finalUrl.replace('https://', '').split('/')[0]
        });
        setInputUrl(finalUrl);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            navigate(inputUrl);
        }
    };

    const goBack = () => {
        if (activeTab.historyIndex > 0) {
            const newIndex = activeTab.historyIndex - 1;
            const newUrl = activeTab.history[newIndex];
            updateTab(activeTabId, { historyIndex: newIndex, url: newUrl, loading: true });
            setInputUrl(newUrl);
        }
    };

    const goForward = () => {
        if (activeTab.historyIndex < activeTab.history.length - 1) {
            const newIndex = activeTab.historyIndex + 1;
            const newUrl = activeTab.history[newIndex];
            updateTab(activeTabId, { historyIndex: newIndex, url: newUrl, loading: true });
            setInputUrl(newUrl);
        }
    };

    const addTab = () => {
        const newId = Date.now();
        const newTab: Tab = {
            id: newId,
            title: 'New Tab',
            url: 'https://www.google.com/webhp?igu=1', // Google iframe-able url
            loading: false,
            history: ['https://www.google.com/webhp?igu=1'],
            historyIndex: 0
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
        setInputUrl(newTab.url);
    };

    const closeTab = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (tabs.length === 1) return;
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id) {
            setActiveTabId(newTabs[newTabs.length - 1].id);
            setInputUrl(newTabs[newTabs.length - 1].url);
        }
    };

    const isBlocked = (url: string) => {
        return url.includes('github.com') && !url.includes('google'); 
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e24] text-gray-200">
            {/* Tabs Bar */}
            <div className="h-10 bg-[#121212] flex items-end px-2 gap-1 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => { setActiveTabId(tab.id); setInputUrl(tab.url); }}
                        className={`group relative flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-t-lg min-w-[120px] max-w-[200px] cursor-pointer border-t border-x border-transparent transition-colors ${
                            activeTabId === tab.id ? 'bg-[#2d2d35] text-white border-white/5' : 'bg-[#1a1a1e] text-gray-500 hover:bg-[#25252a]'
                        }`}
                    >
                        <Globe size={12} className={activeTabId === tab.id ? 'text-blue-400' : ''} />
                        <span className="truncate flex-1">{tab.title}</span>
                        <button 
                            onClick={(e) => closeTab(e, tab.id)}
                            className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded-full"
                        >
                            <X size={10} />
                        </button>
                    </div>
                ))}
                <button onClick={addTab} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg">
                    <Plus size={16} />
                </button>
            </div>

            {/* Toolbar */}
            <div className="h-12 bg-[#2d2d35] flex items-center px-4 gap-4 border-b border-black/20 shrink-0">
                <div className="flex gap-2 text-gray-400">
                    <button onClick={goBack} disabled={activeTab.historyIndex === 0} className="hover:text-white disabled:opacity-30">
                        <ArrowLeft size={16} />
                    </button>
                    <button onClick={goForward} disabled={activeTab.historyIndex === activeTab.history.length - 1} className="hover:text-white disabled:opacity-30">
                        <ArrowRight size={16} />
                    </button>
                    <button onClick={() => updateTab(activeTabId, { loading: true })} className="hover:text-white">
                        <RotateCw size={14} className={activeTab.loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => navigate('https://jsmfolio.netlify.app/')} className="hover:text-white">
                        <Home size={16} />
                    </button>
                </div>
                
                <div className="flex-1 bg-[#1a1a1e] h-8 rounded-full flex items-center px-4 relative group hover:bg-[#151518] transition-colors border border-white/5 focus-within:ring-2 focus-within:ring-blue-500/50">
                    <Lock size={12} className="text-green-500 mr-2" />
                    <input 
                        className="bg-transparent border-none outline-none text-xs text-gray-300 w-full font-mono"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
            </div>

            {/* Bookmarks Bar */}
            <div className="h-8 bg-[#25252a] flex items-center px-4 gap-4 border-b border-black/20 text-xs overflow-x-auto">
                {BOOKMARKS.map((bm, i) => (
                    <button 
                        key={i} 
                        onClick={() => navigate(bm.url)}
                        className="flex items-center gap-1 text-gray-400 hover:text-white whitespace-nowrap"
                    >
                        {bm.title.includes('GitHub') ? <Star size={12} className="text-yellow-500" /> : <Globe size={12} />} 
                        {bm.title}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-white relative">
                {isBlocked(activeTab.url) ? (
                    <div className="absolute inset-0 bg-[#1e1e24] flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                            <Lock size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Security Restriction</h2>
                        <p className="text-gray-400 mb-6 max-w-md">
                            This website ({activeTab.url}) cannot be embedded securely inside this window.
                        </p>
                        <button 
                            onClick={() => window.open(activeTab.url, '_blank')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 font-medium"
                        >
                            Open in New Tab
                        </button>
                    </div>
                ) : (
                    <iframe 
                        key={activeTab.id}
                        ref={iframeRef}
                        src={activeTab.url}
                        className="w-full h-full border-none bg-white"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
                        onLoad={() => updateTab(activeTabId, { loading: false })}
                        title={`Tab ${activeTab.id}`}
                    />
                )}
            </div>
        </div>
    );
};