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
 * @file Synth.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Zap } from 'lucide-react';

const NOTES = [
    { note: 'C', freq: 261.63, key: 'a' },
    { note: 'C#', freq: 277.18, key: 'w', black: true },
    { note: 'D', freq: 293.66, key: 's' },
    { note: 'D#', freq: 311.13, key: 'e', black: true },
    { note: 'E', freq: 329.63, key: 'd' },
    { note: 'F', freq: 349.23, key: 'f' },
    { note: 'F#', freq: 369.99, key: 't', black: true },
    { note: 'G', freq: 392.00, key: 'g' },
    { note: 'G#', freq: 415.30, key: 'y', black: true },
    { note: 'A', freq: 440.00, key: 'h' },
    { note: 'A#', freq: 466.16, key: 'u', black: true },
    { note: 'B', freq: 493.88, key: 'j' },
    { note: 'C2', freq: 523.25, key: 'k' },
];

export const Synth: React.FC = () => {
    const audioCtx = useRef<AudioContext | null>(null);
    const [oscillatorType, setOscillatorType] = useState<OscillatorType>('sawtooth');
    const [activeNotes, setActiveNotes] = useState<string[]>([]);

    useEffect(() => {
        audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        return () => { audioCtx.current?.close(); };
    }, []);

    const playNote = (freq: number, noteName: string) => {
        if (!audioCtx.current) return;
        if (activeNotes.includes(noteName)) return;

        setActiveNotes(prev => [...prev, noteName]);

        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();

        osc.type = oscillatorType;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.2, audioCtx.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        osc.start();
        osc.stop(audioCtx.current.currentTime + 1.5);

        setTimeout(() => {
            setActiveNotes(prev => prev.filter(n => n !== noteName));
        }, 200);
    };

    return (
        <div className="h-full bg-[#121214] flex flex-col items-center justify-center p-8">
            <div className="mb-8 flex items-center justify-between w-full max-w-2xl bg-[#1e1e24] p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-neuro-pink">
                    <Zap size={24} />
                    <span className="font-display font-bold text-xl">NebulaSynth</span>
                </div>
                <div className="flex gap-2">
                    {['sine', 'square', 'sawtooth', 'triangle'].map(type => (
                        <button
                            key={type}
                            onClick={() => setOscillatorType(type as OscillatorType)}
                            className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${oscillatorType === type ? 'bg-neuro-pink text-white' : 'bg-white/5 text-gray-400'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative flex justify-center">
                <div className="flex">
                    {NOTES.map((n, i) => (
                        !n.black && (
                            <button
                                key={n.note}
                                onMouseDown={() => playNote(n.freq, n.note)}
                                className={`
                                    w-16 h-64 border border-gray-900 rounded-b-lg active:bg-gray-200 transition-colors
                                    ${activeNotes.includes(n.note) ? 'bg-neuro-cyan shadow-[0_0_20px_rgba(0,245,255,0.5)]' : 'bg-white'}
                                `}
                            >
                                <span className="absolute bottom-4 left-0 right-0 text-center text-gray-400 font-bold">{n.key}</span>
                            </button>
                        )
                    ))}
                </div>
                <div className="absolute top-0 left-0 flex pointer-events-none w-full pl-10">
                     {NOTES.map((n, i) => (
                        n.black && (
                            <button
                                key={n.note}
                                onMouseDown={() => playNote(n.freq, n.note)}
                                className={`
                                    pointer-events-auto
                                    w-10 h-40 bg-black border border-gray-800 rounded-b-lg absolute z-10 active:bg-gray-800 transition-transform active:scale-y-95
                                    ${activeNotes.includes(n.note) ? 'bg-neuro-purple shadow-[0_0_20px_rgba(58,12,163,0.8)]' : 'bg-black'}
                                `}
                                style={{ left: `${(i - 1) * 4 + 3.5}rem` }}
                            />
                        )
                    ))}
                </div>
            </div>
            
            <p className="mt-8 text-gray-500 text-sm">Use mouse to play. AudioContext enabled.</p>
        </div>
    );
};