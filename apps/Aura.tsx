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
 * @file Aura.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Bot } from 'lucide-react';
import { useStore } from '../store';

export const Aura: React.FC = () => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('Hello. I am Aura. Click the mic to speak.');
    const openWindow = useStore(state => state.openWindow);
    const toggleTheme = useStore(state => state.setTheme);

    const recognition = React.useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            recognition.current = new (window as any).webkitSpeechRecognition();
            recognition.current.continuous = false;
            recognition.current.interimResults = false;

            recognition.current.onstart = () => setListening(true);
            recognition.current.onend = () => setListening(false);
            
            recognition.current.onresult = (event: any) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                processCommand(text);
            };
        }
    }, []);

    const processCommand = (cmd: string) => {
        const lower = cmd.toLowerCase();
        
        if (lower.includes('open')) {
            if (lower.includes('calculator')) { openWindow('calculator'); setResponse('Opening Calculator.'); }
            else if (lower.includes('notes')) { openWindow('notes'); setResponse('Opening Notes.'); }
            else if (lower.includes('finder')) { openWindow('finder'); setResponse('Opening Finder.'); }
            else setResponse(`I'm not sure which app you mean by "${cmd}".`);
        } else if (lower.includes('theme')) {
             setResponse('Changing theme settings...');
             openWindow('settings');
        } else if (lower.includes('hello')) {
            setResponse('Greetings, traveler.');
        } else {
            setResponse(`I heard "${cmd}", but I don't know that command yet.`);
        }
    };

    const toggleMic = () => {
        if (listening) recognition.current?.stop();
        else recognition.current?.start();
    };

    if (!('webkitSpeechRecognition' in window)) {
        return <div className="p-8 text-center text-red-400">Voice API not supported in this browser.</div>;
    }

    return (
        <div className="h-full bg-black/90 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
            
            <div className="relative z-10 mb-8">
                 <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${listening ? 'bg-neuro-purple shadow-[0_0_50px_rgba(147,51,234,0.6)] animate-pulse' : 'bg-gray-800'}`}>
                    <Bot size={64} className="text-white" />
                 </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 relative z-10">
                {listening ? 'Listening...' : 'Aura Assistant'}
            </h2>
            
            <p className="text-gray-400 mb-8 h-6 relative z-10">
                {transcript || "..."}
            </p>

            <div className="bg-white/10 p-4 rounded-xl mb-8 max-w-sm border border-white/10 relative z-10">
                <p className="text-neuro-cyan">{response}</p>
            </div>

            <button 
                onClick={toggleMic}
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-colors ${listening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-500'}`}
            >
                {listening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
        </div>
    );
};