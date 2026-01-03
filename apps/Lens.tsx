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
 * @file Lens.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Download } from 'lucide-react';

export const Lens: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setError('');
        } catch (err) {
            setError('Camera access denied or unavailable.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const capture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        
        const context = canvasRef.current.getContext('2d');
        if (!context) return;

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setCapturedImage(dataUrl);
    };

    const download = () => {
        if (!capturedImage) return;
        const link = document.createElement('a');
        link.href = capturedImage;
        link.download = 'lens-capture.png';
        link.click();
    };

    return (
        <div className="h-full bg-black flex flex-col relative overflow-hidden">
            {error ? (
                <div className="flex-1 flex items-center justify-center text-red-500 p-8 text-center">
                    {error}
                </div>
            ) : (
                <div className="flex-1 relative bg-gray-900">
                    {!capturedImage && (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover transform scale-x-[-1]" 
                        />
                    )}
                    {capturedImage && (
                        <img 
                            src={capturedImage} 
                            className="w-full h-full object-cover" 
                        />
                    )}
                </div>
            )}

            <div className="h-24 bg-black/80 backdrop-blur-md flex items-center justify-center gap-8 z-20">
                {capturedImage ? (
                    <>
                        <button 
                            onClick={() => setCapturedImage(null)} 
                            className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                        >
                            <RefreshCw size={24} />
                        </button>
                        <button 
                            onClick={download} 
                            className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500"
                        >
                            <Download size={24} />
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={capture}
                        className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                        <div className="w-12 h-12 bg-white rounded-full"></div>
                    </button>
                )}
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};