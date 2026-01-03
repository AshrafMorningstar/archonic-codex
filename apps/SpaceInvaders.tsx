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
 * @file SpaceInvaders.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export const SpaceInvaders: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const player = { x: canvas.width / 2, y: canvas.height - 30, w: 30, h: 20, speed: 5 };
        const bullets: any[] = [];
        const enemies: any[] = [];
        const enemyRows = 4;
        const enemyCols = 8;
        let enemyDir = 1;
        
        // Init enemies
        for(let r=0; r<enemyRows; r++) {
            for(let c=0; c<enemyCols; c++) {
                enemies.push({ x: 50 + c * 40, y: 30 + r * 30, w: 20, h: 20, alive: true });
            }
        }

        let leftPressed = false;
        let rightPressed = false;
        let spacePressed = false;
        let lastShot = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') leftPressed = true;
            if (e.key === 'ArrowRight') rightPressed = true;
            if (e.key === ' ') spacePressed = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') leftPressed = false;
            if (e.key === 'ArrowRight') rightPressed = false;
            if (e.key === ' ') spacePressed = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        let animationId: number;

        const update = () => {
            // Player Move
            if (leftPressed && player.x > 0) player.x -= player.speed;
            if (rightPressed && player.x < canvas.width - player.w) player.x += player.speed;

            // Shoot
            if (spacePressed && Date.now() - lastShot > 300) {
                bullets.push({ x: player.x + player.w/2 - 2, y: player.y, w: 4, h: 10 });
                lastShot = Date.now();
            }

            // Bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].y -= 7;
                if (bullets[i].y < 0) bullets.splice(i, 1);
            }

            // Enemies Move
            let touchEdge = false;
            enemies.forEach(e => {
                if (!e.alive) return;
                e.x += 2 * enemyDir;
                if (e.x <= 0 || e.x + e.w >= canvas.width) touchEdge = true;
            });

            if (touchEdge) {
                enemyDir *= -1;
                enemies.forEach(e => e.y += 20);
            }

            // Collision
            bullets.forEach((b, bi) => {
                enemies.forEach((e, ei) => {
                    if (e.alive && b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
                        e.alive = false;
                        bullets.splice(bi, 1);
                        setScore(s => s + 100);
                    }
                });
            });

            // Check Game Over
            if (enemies.some(e => e.alive && e.y + e.h >= player.y)) {
                setGameState('gameover');
                return;
            }
            if (enemies.every(e => !e.alive)) {
                setGameState('won');
                return;
            }

            // Draw
            ctx.fillStyle = '#0f0f12';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Player
            ctx.fillStyle = '#4CC9F0';
            ctx.fillRect(player.x, player.y, player.w, player.h);

            // Draw Enemies
            ctx.fillStyle = '#FF00FF';
            enemies.forEach(e => {
                if (e.alive) ctx.fillRect(e.x, e.y, e.w, e.h);
            });

            // Draw Bullets
            ctx.fillStyle = '#FFFF00';
            bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

            animationId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, [gameState]);

    return (
        <div className="h-full bg-black flex flex-col items-center justify-center relative">
            <canvas ref={canvasRef} width={400} height={500} className="border border-white/20 bg-[#0f0f12]" />
            
            {gameState !== 'playing' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="text-center">
                        <h2 className="text-3xl font-display font-bold text-quantum-glow mb-4">
                            {gameState === 'start' ? 'VOID DEFENDER' : gameState === 'won' ? 'VICTORY' : 'GAME OVER'}
                        </h2>
                        {gameState !== 'start' && <p className="mb-6 text-white">Score: {score}</p>}
                        <button 
                            onClick={() => { setGameState('playing'); setScore(0); }}
                            className="bg-neuro-purple hover:bg-neuro-purple/80 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-transform hover:scale-105"
                        >
                            {gameState === 'start' ? <Play size={20} /> : <RotateCcw size={20} />}
                            {gameState === 'start' ? 'Start Mission' : 'Retry'}
                        </button>
                    </div>
                </div>
            )}
            <div className="absolute top-4 right-4 font-mono text-white text-xl">{score}</div>
        </div>
    );
};