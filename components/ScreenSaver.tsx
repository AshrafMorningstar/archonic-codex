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
 * @file ScreenSaver.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const ScreenSaver: React.FC = () => {
    const isScreenSaver = useStore(state => state.isScreenSaver);
    const setScreenSaver = useStore(state => state.setScreenSaver);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let timeout: any;
        const resetTimer = () => {
            setScreenSaver(false);
            clearTimeout(timeout);
            timeout = setTimeout(() => setScreenSaver(true), 60000); // 1 min inactivity
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        window.addEventListener('click', resetTimer);
        
        resetTimer();

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('click', resetTimer);
            clearTimeout(timeout);
        };
    }, [setScreenSaver]);

    useEffect(() => {
        if (!isScreenSaver || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = Array.from({ length: 400 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        }));

        let animationId: number;

        const draw = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach(star => {
                star.z -= 2; // Speed
                if (star.z <= 0) {
                    star.z = canvas.width;
                    star.x = Math.random() * canvas.width;
                    star.y = Math.random() * canvas.height;
                }

                const x = (star.x - cx) * (canvas.width / star.z) + cx;
                const y = (star.y - cy) * (canvas.width / star.z) + cy;
                const size = (canvas.width / star.z);

                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationId);
    }, [isScreenSaver]);

    if (!isScreenSaver) return null;

    return (
        <div className="fixed inset-0 z-[10001] bg-black cursor-none">
            <canvas ref={canvasRef} className="block" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm animate-pulse">
                Press any key to wake
            </div>
        </div>
    );
};