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
 * @file Gravity.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef, useState } from 'react';
import { Trash2, PlusCircle, Wind } from 'lucide-react';

export const Gravity: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gravity, setGravity] = useState(0.5);
    const [balls, setBalls] = useState<any[]>([]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        
        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            balls.forEach(ball => {
                ball.dy += gravity;
                ball.x += ball.dx;
                ball.y += ball.dy;
                
                // Bounce floor
                if (ball.y + ball.radius > canvas.height) {
                    ball.y = canvas.height - ball.radius;
                    ball.dy *= -0.7; // Dampening
                }
                // Bounce walls
                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.dx *= -0.7;
                    if (ball.x + ball.radius > canvas.width) ball.x = canvas.width - ball.radius;
                    if (ball.x - ball.radius < 0) ball.x = ball.radius;
                }
                
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.fill();
                ctx.closePath();
            });
            
            animationId = requestAnimationFrame(update);
        };
        
        update();
        return () => cancelAnimationFrame(animationId);
    }, [balls, gravity]);

    const addBall = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const radius = Math.random() * 20 + 10;
        const newBall = {
            x: Math.random() * (canvas.width - radius * 2) + radius,
            y: 50,
            dx: (Math.random() - 0.5) * 10,
            dy: 0,
            radius,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        };
        setBalls(prev => [...prev, newBall]);
    };

    const clear = () => setBalls([]);

    return (
        <div className="h-full bg-[#111] flex flex-col">
             <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#222]">
                 <div className="flex items-center gap-4">
                     <button onClick={addBall} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 text-white text-sm font-bold">
                         <PlusCircle size={16} /> Add Ball
                     </button>
                     <button onClick={clear} className="p-2 hover:bg-white/10 rounded text-red-400">
                         <Trash2 size={18} />
                     </button>
                 </div>
                 <div className="flex items-center gap-2 text-white">
                     <Wind size={16} />
                     <input 
                        type="range" min="0" max="2" step="0.1" 
                        value={gravity} 
                        onChange={(e) => setGravity(parseFloat(e.target.value))}
                        className="w-32"
                    />
                    <span className="text-xs font-mono w-8">{gravity}G</span>
                 </div>
             </div>
             <div className="flex-1 relative">
                 <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={600} 
                    className="w-full h-full bg-[#000]"
                    onClick={addBall}
                 />
                 <div className="absolute bottom-4 left-4 text-gray-500 text-xs pointer-events-none">
                     Click anywhere to spawn objects
                 </div>
             </div>
        </div>
    );
};