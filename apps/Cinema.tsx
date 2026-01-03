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
 * @file Cinema.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

export const Cinema: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [muted, setMuted] = useState(false);

    // Using a sample video from a public source
    const VIDEO_SRC = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        const updateProgress = () => {
            setProgress((vid.currentTime / vid.duration) * 100);
        };
        
        vid.addEventListener('timeupdate', updateProgress);
        return () => vid.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (playing) videoRef.current.pause();
            else videoRef.current.play();
            setPlaying(!playing);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
            setProgress(val);
        }
    };

    return (
        <div className="h-full bg-black flex flex-col group">
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                <video 
                    ref={videoRef}
                    src={VIDEO_SRC}
                    className="w-full h-full object-contain"
                    onClick={togglePlay}
                />
                
                {!playing && (
                    <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                             <Play size={40} className="ml-2 text-white" fill="white" />
                        </div>
                    </button>
                )}
            </div>

            <div className="h-16 bg-gradient-to-t from-black to-transparent px-4 flex flex-col justify-end pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <input 
                    type="range" 
                    min="0" max="100" 
                    value={progress || 0} 
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-red-500 mb-3"
                />
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="hover:text-red-400">
                            {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                        </button>
                        <button onClick={() => { if(videoRef.current) videoRef.current.currentTime = 0; }} className="hover:text-red-400">
                            <RotateCcw size={18} />
                        </button>
                        <div className="flex items-center gap-2">
                             <button onClick={toggleMute} className="hover:text-gray-300">
                                 {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                             </button>
                        </div>
                        <span className="text-xs font-mono text-gray-400">Big Buck Bunny</span>
                    </div>
                    <button className="hover:text-white text-gray-300">
                        <Maximize size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};