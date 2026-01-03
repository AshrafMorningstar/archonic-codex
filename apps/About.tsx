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
 * @file About.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="h-full bg-[#1e1e24] text-gray-200 flex flex-col items-center p-8 overflow-y-auto">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center mb-6 text-white text-3xl font-display font-bold">
        A
      </div>
      
      <h1 className="text-3xl font-display font-bold text-white mb-2">AshrafOS</h1>
      <p className="text-gray-500 mb-8 font-mono">Version 2.0.4 (Pro)</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8">
         <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Cpu size={18} />
                <span className="font-bold text-sm">Processor</span>
            </div>
            <p className="text-xs text-gray-400">Neural Engine X1</p>
         </div>
         <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-green-400">
                <CheckCircle2 size={18} />
                <span className="font-bold text-sm">Status</span>
            </div>
            <p className="text-xs text-gray-400">System Nominal</p>
         </div>
         <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-purple-400">
                <Zap size={18} />
                <span className="font-bold text-sm">Memory</span>
            </div>
            <p className="text-xs text-gray-400">64 GB Unified</p>
         </div>
         <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-2 text-yellow-400">
                <ShieldCheck size={18} />
                <span className="font-bold text-sm">Security</span>
            </div>
            <p className="text-xs text-gray-400">Encrypted</p>
         </div>
      </div>
      
      <div className="text-center text-xs text-gray-600 max-w-md leading-relaxed">
        <p>Designed and Developed by Ashraf Morningstar.</p>
        <p>&copy; 2024 Archonic Codex. All rights reserved.</p>
      </div>
    </div>
  );
};