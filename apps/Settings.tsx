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
 * @file Settings.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { useStore } from '../store';
import { Theme, WALLPAPERS } from '../types';
import { Monitor, Volume2, Moon, Focus, Lock, Sparkles, Sun, Keyboard, Upload } from 'lucide-react';

export const Settings: React.FC = () => {
  const currentTheme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('Wallpaper');

  const MENU_ITEMS = [
      { id: 'Wallpaper', icon: Monitor },
      { id: 'Sound', icon: Volume2 },
      { id: 'Shortcuts', icon: Keyboard },
      { id: 'Display', icon: Moon },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setCustomWallpaper(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'Wallpaper':
              return (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Wallpaper & Theme</h2>
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        {/* Quantum Theme Special Card */}
                        <div 
                            onClick={() => setTheme(Theme.QUANTUM)}
                            className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                currentTheme === Theme.QUANTUM ? 'border-quantum-glow ring-4 ring-quantum-glow/20' : 'border-transparent hover:border-neuro-purple/50'
                            }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-chronos-blue via-neuro-purple to-chronos-dark flex items-center justify-center">
                                <Sparkles className="text-quantum-glow animate-pulse" size={32} />
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-quantum-glow border border-quantum-glow/30">
                                Quantum Core
                            </div>
                        </div>

                         {/* Light Theme Special Card */}
                         <div 
                            onClick={() => setTheme(Theme.LIGHT)}
                            className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                currentTheme === Theme.LIGHT ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent hover:border-gray-300'
                            }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
                                <Sun className="text-yellow-500" size={32} />
                            </div>
                            <div className="absolute bottom-3 left-3 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black border border-gray-200">
                                Light Mode
                            </div>
                        </div>

                        {/* Custom Wallpaper Upload */}
                        <div className="group relative aspect-video rounded-xl overflow-hidden border-2 border-dashed border-gray-600 hover:border-gray-400 flex flex-col items-center justify-center cursor-pointer">
                            {customWallpaper ? (
                                <img src={customWallpaper} className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <Upload size={24} className="mb-2 text-gray-400" />
                                    <span className="text-xs text-gray-500">Upload Custom</span>
                                </>
                            )}
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*" />
                        </div>

                        {(Object.values(Theme) as Theme[])
                            .filter(t => t !== Theme.QUANTUM && t !== Theme.LIGHT)
                            .map((themeName) => (
                            <div 
                                key={themeName}
                                onClick={() => setTheme(themeName)}
                                className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                    currentTheme === themeName ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent hover:border-white/30'
                                }`}
                            >
                                <img 
                                    src={WALLPAPERS[themeName]} 
                                    alt={themeName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                                    {themeName}
                                </div>
                            </div>
                        ))}
                    </div>
                  </>
              );
          case 'Sound':
              return (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Sound</h2>
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex flex-col">
                                <span className={`font-medium ${currentTheme === Theme.LIGHT ? 'text-black' : 'text-white'}`}>System Sounds</span>
                                <span className="text-xs text-gray-400">Play sounds for UI interactions</span>
                            </div>
                            <div 
                                onClick={toggleSound}
                                className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${soundEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${soundEnabled ? 'left-7' : 'left-1'}`} />
                            </div>
                        </div>
                    </div>
                  </>
              );
          case 'Shortcuts':
              return (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Keybindings</h2>
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        {[
                            { action: 'Open Finder', key: 'Cmd + F' },
                            { action: 'Spotlight Search', key: 'Cmd + Space' },
                            { action: 'Close Window', key: 'Cmd + W' },
                            { action: 'Switch App', key: 'Cmd + Tab' }
                        ].map((shortcut, i) => (
                            <div key={i} className="p-4 flex items-center justify-between border-b border-white/5 last:border-0">
                                <span className={`${currentTheme === Theme.LIGHT ? 'text-gray-800' : 'text-gray-300'}`}>{shortcut.action}</span>
                                <div className="px-3 py-1 bg-white/10 rounded-md text-xs font-mono font-bold text-gray-400 border border-white/10">
                                    {shortcut.key}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-500">Keybindings are currently view-only in this demo.</p>
                  </>
              );
          default:
              return (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <Lock size={48} className="mb-4 opacity-50" />
                      <p>Settings for {activeTab} are restricted in Current Session.</p>
                  </div>
              );
      }
  }

  return (
    <div className={`flex h-full ${currentTheme === Theme.LIGHT ? 'bg-gray-50 text-gray-900' : 'bg-[#1e1e24] text-gray-200'}`}>
       {/* Sidebar */}
       <div className={`w-48 border-r p-4 space-y-2 hidden sm:block ${
           currentTheme === Theme.LIGHT ? 'bg-gray-100 border-gray-200' : 'bg-[#1a1a1e] border-white/5'
       }`}>
           {MENU_ITEMS.map(item => (
               <div 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        activeTab === item.id 
                            ? 'bg-blue-600 text-white' 
                            : (currentTheme === Theme.LIGHT ? 'text-gray-600 hover:bg-white' : 'text-gray-400 hover:text-white hover:bg-white/5')
                    }`}
                >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.id}</span>
               </div>
           ))}
       </div>

       {/* Content */}
       <div className="flex-1 p-8 overflow-y-auto">
            {renderContent()}
       </div>
    </div>
  );
};