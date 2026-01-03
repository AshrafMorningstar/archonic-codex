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
 * @file AudioLog.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Trash2, AlertCircle } from 'lucide-react';

export const AudioLog: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState<{id: number, url: string, date: string}[]>([]);
    const [permission, setPermission] = useState<boolean | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtx = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const source = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationId = useRef<number>();

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setPermission(true);
            
            // Visualizer setup
            if (!audioCtx.current) audioCtx.current = new AudioContext();
            analyser.current = audioCtx.current.createAnalyser();
            source.current = audioCtx.current.createMediaStreamSource(stream);
            source.current.connect(analyser.current);
            visualize();

            mediaRecorder.current = new MediaRecorder(stream);
            chunks.current = [];
            
            mediaRecorder.current.ondataavailable = (e) => {
                chunks.current.push(e.data);
            };
            
            mediaRecorder.current.onstop = () => {
                const blob = new Blob(chunks.current, { type: 'audio/ogg; codecs=opus' });
                const url = URL.createObjectURL(blob);
                setRecordings(prev => [...prev, {
                    id: Date.now(),
                    url,
                    date: new Date().toLocaleTimeString()
                }]);
                cancelAnimationFrame(animationId.current!);
                // Stop visualizer
                const canvas = canvasRef.current;
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx?.clearRect(0, 0, canvas.width, canvas.height);
                }
            };

            mediaRecorder.current.start();
            setIsRecording(true);

        } catch (err) {
            setPermission(false);
            console.error(err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            mediaRecorder.current.stream.getTracks().forEach(t => t.stop());
            setIsRecording(false);
        }
    };

    const visualize = () => {
        if (!analyser.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        analyser.current.fftSize = 256;
        const bufferLength = analyser.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationId.current = requestAnimationFrame(draw);
            analyser.current!.getByteFrequencyData(dataArray);

            ctx.fillStyle = '#1e1e24';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    };

    return (
        <div className="h-full bg-[#1e1e24] flex flex-col text-white">
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                {permission === false && (
                    <div className="text-red-400 flex items-center gap-2 mb-4">
                        <AlertCircle /> Microphone access denied
                    </div>
                )}
                
                <canvas ref={canvasRef} width={400} height={150} className="w-full h-40 bg-black/20 rounded-xl mb-8 border border-white/5" />
                
                <div className="text-4xl font-mono mb-8 tabular-nums tracking-widest text-red-500">
                    {isRecording ? "RECORDING" : "READY"}
                </div>

                {!isRecording ? (
                    <button 
                        onClick={startRecording}
                        className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 border-4 border-[#1e1e24] shadow-[0_0_0_4px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all hover:scale-105"
                    >
                        <Mic size={32} />
                    </button>
                ) : (
                    <button 
                        onClick={stopRecording}
                        className="w-20 h-20 rounded-full bg-gray-800 hover:bg-gray-700 border-4 border-[#1e1e24] shadow-[0_0_0_4px_rgba(75,85,99,0.5)] flex items-center justify-center transition-all"
                    >
                        <Square size={32} fill="currentColor" />
                    </button>
                )}
            </div>

            <div className="h-1/3 bg-[#151518] border-t border-white/5 overflow-y-auto">
                {recordings.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-600 text-sm">No recordings</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {recordings.map(rec => (
                            <div key={rec.id} className="p-4 flex items-center justify-between hover:bg-white/5">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm">Recording {rec.id}</span>
                                    <span className="text-xs text-gray-500">{rec.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <audio src={rec.url} controls className="h-8 w-48 opacity-70 hover:opacity-100 transition-opacity" />
                                    <button 
                                        onClick={() => setRecordings(prev => prev.filter(r => r.id !== rec.id))}
                                        className="text-gray-500 hover:text-red-400"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};