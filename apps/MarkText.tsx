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
 * @file MarkText.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { FileText, Eye, Columns } from 'lucide-react';

export const MarkText: React.FC = () => {
    const [markdown, setMarkdown] = useState('# Hello World\n\nWrite your markdown here...\n\n- List item 1\n- List item 2\n\n**Bold Text**');
    const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');

    const renderMarkdown = (text: string) => {
        // Very basic markdown parser simulation
        return text
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
            .replace(/\n/gim, '<br />');
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e24] text-white">
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#27272a]">
                <div className="flex items-center gap-2 font-bold text-gray-300">
                    <FileText size={18} className="text-blue-400" />
                    Untitled.md
                </div>
                <div className="flex bg-black/20 rounded-lg p-1">
                    <button onClick={() => setMode('edit')} className={`p-1.5 rounded ${mode === 'edit' ? 'bg-blue-600' : 'hover:bg-white/5'}`}><FileText size={16}/></button>
                    <button onClick={() => setMode('split')} className={`p-1.5 rounded ${mode === 'split' ? 'bg-blue-600' : 'hover:bg-white/5'}`}><Columns size={16}/></button>
                    <button onClick={() => setMode('preview')} className={`p-1.5 rounded ${mode === 'preview' ? 'bg-blue-600' : 'hover:bg-white/5'}`}><Eye size={16}/></button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {(mode === 'edit' || mode === 'split') && (
                    <div className={`flex-1 border-r border-white/5 bg-[#1e1e1e]`}>
                        <textarea 
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="w-full h-full bg-transparent resize-none p-6 outline-none font-mono text-sm text-gray-300 leading-relaxed"
                            spellCheck={false}
                        />
                    </div>
                )}
                {(mode === 'preview' || mode === 'split') && (
                    <div className="flex-1 bg-[#1e1e24] p-8 overflow-y-auto prose prose-invert prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }} />
                    </div>
                )}
            </div>
        </div>
    );
};