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
 * @file NeuroAI.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Image as ImageIcon, Sparkles, User, Bot, Loader2, ScanEye, ExternalLink, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export const NeuroAI: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'chat' | 'vision'>('chat');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hello! I am Neuro, your AI assistant. How can I help you navigate the system or analyze data today?", sender: 'ai', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Vision Cortex State
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            const aiResponses = [
                "That's an interesting perspective. I've updated my neural pathways.",
                "I can certainly help with that. Accessing system archives...",
                "The probability of that outcome is 87.4%. Would you like to run a simulation?",
                "I've analyzed the request. Here are the relevant data points.",
                "Processing... Done. I've optimized the query for better results."
            ];
            
            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 2000);
    };

    const runVisionAnalysis = () => {
        setAnalyzing(true);
        setAnalysisResult(null);

        setTimeout(() => {
            setAnalyzing(false);
            setAnalysisResult({
                desc: "Futuristic cityscape with neon lights and cybernetic structures.",
                objects: ["Skyscraper", "Flying Vehicle", "Hologram", "Pedestrian"],
                confidence: "99.8%",
                source: "Neural Net v4.2"
            });
        }, 3000);
    };

    const suggestions = ["Summarize recent emails", "System diagnostics", "Generate project ideas"];

    return (
        <div className="flex h-full bg-[#0f0f12] text-gray-200 font-sans">
            {/* Sidebar / Tabs */}
            <div className="w-16 sm:w-48 bg-[#151518] border-r border-white/5 flex flex-col p-2 gap-2">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`p-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === 'chat' ? 'bg-neuro-purple text-white' : 'text-gray-400 hover:bg-white/5'}`}
                >
                    <Bot size={20} />
                    <span className="hidden sm:block font-medium">Chat</span>
                </button>
                <button 
                    onClick={() => setActiveTab('vision')}
                    className={`p-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === 'vision' ? 'bg-neuro-purple text-white' : 'text-gray-400 hover:bg-white/5'}`}
                >
                    <ScanEye size={20} />
                    <span className="hidden sm:block font-medium">Visual Cortex</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {activeTab === 'chat' ? (
                    <>
                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'ai' ? 'bg-neuro-purple' : 'bg-gray-600'}`}>
                                        {msg.sender === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-2xl leading-relaxed text-sm ${msg.sender === 'ai' ? 'bg-white/5 rounded-tl-none border border-white/5' : 'bg-neuro-purple/20 text-white rounded-tr-none border border-neuro-purple/30'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-4">
                                     <div className="w-8 h-8 rounded-full bg-neuro-purple flex items-center justify-center shrink-0">
                                        <Loader2 size={16} className="animate-spin" />
                                     </div>
                                     <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1">
                                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                         <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                     </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#1a1a1e] border-t border-white/5">
                            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                                {suggestions.map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => setInputValue(s)}
                                        className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs text-neuro-cyan border border-white/5 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask Neuro..."
                                    className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neuro-purple/50 transition-colors"
                                />
                                <button 
                                    onClick={handleSend}
                                    className="bg-neuro-purple hover:bg-neuro-purple/80 text-white p-3 rounded-xl transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 p-8 flex flex-col items-center justify-center overflow-y-auto">
                        <div className="w-full max-w-2xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <div className="aspect-video bg-black/40 relative flex items-center justify-center border-b border-white/5">
                                {analyzing && (
                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
                                        <Loader2 size={48} className="text-neuro-cyan animate-spin mb-4" />
                                        <p className="text-neuro-cyan font-mono animate-pulse">Scanning visual data...</p>
                                    </div>
                                )}
                                {!analysisResult && !analyzing && (
                                    <div className="text-center text-gray-500">
                                        <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>Upload image or feed stream for analysis</p>
                                    </div>
                                )}
                                {analysisResult && !analyzing && (
                                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center">
                                        <ScanEye size={64} className="text-white opacity-80" />
                                     </div>
                                )}
                            </div>
                            
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">Analysis Results</h3>
                                    <button 
                                        onClick={runVisionAnalysis}
                                        className="flex items-center gap-2 px-4 py-2 bg-neuro-purple hover:bg-neuro-purple/80 rounded-lg text-sm font-bold transition-colors"
                                    >
                                        <RefreshCw size={16} /> Run Analysis
                                    </button>
                                </div>
                                
                                {analysisResult ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <p className="text-gray-300 leading-relaxed">{analysisResult.desc}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Detected Objects</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysisResult.objects.map((obj: string) => (
                                                        <span key={obj} className="px-2 py-1 bg-neuro-cyan/10 text-neuro-cyan text-xs rounded border border-neuro-cyan/20">{obj}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">Confidence Score</span>
                                                <div className="text-2xl font-mono text-green-400">{analysisResult.confidence}</div>
                                                <div className="text-xs text-gray-600 mt-1">Source: {analysisResult.source}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center text-gray-500 py-4">
                                        No analysis data available.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};