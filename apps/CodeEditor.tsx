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
 * @file CodeEditor.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Play, Save, Settings, FileCode, GitBranch } from 'lucide-react';

export const CodeEditor: React.FC = () => {
    const [code, setCode] = useState(`// Welcome to Code Matrix
// Start building your quantum algorithms here...

function initializeQuantumState() {
    const qbits = new Float32Array(1024);
    qbits.fill(0);
    console.log("System initialized");
    return qbits;
}

// Execute logic
const state = initializeQuantumState();
`);
    const [lineCount, setLineCount] = useState(12);

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        setLineCount(e.target.value.split('\n').length);
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
            {/* Toolbar */}
            <div className="h-10 bg-[#252526] flex items-center px-4 justify-between border-b border-[#3e3e42] shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#cccccc] cursor-pointer hover:text-white">
                        <FileCode size={16} className="text-blue-400" />
                        <span>script.js</span>
                    </div>
                    <div className="h-4 w-px bg-[#3e3e42]" />
                    <button className="flex items-center gap-1 text-xs text-green-400 hover:bg-white/5 px-2 py-1 rounded">
                        <Play size={12} /> Run
                    </button>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <GitBranch size={14} />
                    <span className="text-xs">main</span>
                    <Settings size={14} className="hover:text-white cursor-pointer" />
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="w-12 bg-[#1e1e1e] border-r border-[#3e3e42] flex flex-col items-end pr-2 pt-4 text-[#858585] select-none text-xs leading-6">
                    {Array.from({ length: Math.max(lineCount, 25) }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="flex-1 relative">
                    <textarea 
                        value={code}
                        onChange={handleCodeChange}
                        className="w-full h-full bg-transparent resize-none outline-none p-4 leading-6 text-[#d4d4d4] font-mono selection:bg-blue-500/30"
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
                <div className="flex items-center gap-4">
                    <span>Ready</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Ln {code.split('\n').length}, Col 1</span>
                    <span>UTF-8</span>
                    <span>JavaScript</span>
                </div>
            </div>
        </div>
    );
};