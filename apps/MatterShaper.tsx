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
 * @file MatterShaper.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Wand2, Download, Image as ImageIcon, Loader2, Sparkles, Sliders } from 'lucide-react';

export const MatterShaper: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [resolution, setResolution] = useState('1024x1024');

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setGeneratedImage(null);

        // Simulate generation delay
        setTimeout(() => {
            setIsGenerating(false);
            // Placeholder image since we can't call real API
            setGeneratedImage(`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop`);
        }, 3000);
    };

    return (
        <div className="h-full flex flex-col bg-[#0f0f12] text-gray-200">
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex items-center px-6 bg-[#1a1a1e]">
                <div className="flex items-center gap-3 text-quantum-glow">
                    <Wand2 size={24} />
                    <h1 className="font-display font-bold text-xl tracking-wide">Matter Shaper</h1>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Controls Sidebar */}
                <div className="w-80 border-r border-white/5 bg-[#151518] p-6 flex flex-col gap-8 overflow-y-auto">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Prompt</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the universe you want to create..."
                            className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-quantum-glow/50 resize-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block flex items-center gap-2">
                            <Sliders size={14} /> Aspect Ratio
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['1:1', '16:9', '9:16'].map(ratio => (
                                <button 
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${aspectRatio === ratio ? 'bg-quantum-glow/20 border-quantum-glow text-quantum-glow' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Resolution</label>
                         <div className="grid grid-cols-2 gap-2">
                            {['1024x1024', '2048x2048'].map(res => (
                                <button 
                                    key={res}
                                    onClick={() => setResolution(res)}
                                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${resolution === res ? 'bg-neuro-purple/20 border-neuro-purple text-neuro-pink' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                                >
                                    {res}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isGenerating || !prompt ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-neuro-purple to-quantum-glow text-white hover:shadow-lg hover:shadow-neuro-purple/20'}`}
                        >
                            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                            {isGenerating ? 'Shaping Matter...' : 'Generate'}
                        </button>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-[#0a0a0c] flex items-center justify-center p-8 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    
                    {generatedImage ? (
                        <div className="relative group max-w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                                    <Download size={24} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            {isGenerating ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 border-4 border-quantum-glow border-t-transparent rounded-full animate-spin mb-6"></div>
                                    <p className="text-quantum-glow animate-pulse">Constructing visual reality...</p>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                                    <p>Ready to shape reality</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};