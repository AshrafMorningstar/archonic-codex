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
 * @file Pulse.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef, useState } from 'react';
import { Activity, Cpu, Wifi, HardDrive } from 'lucide-react';

const Chart: React.FC<{ color: string, data: number[] }> = ({ color, data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        const step = w / (data.length - 1);
        
        data.forEach((val, i) => {
            const x = i * step;
            const y = h - (val / 100) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        
        ctx.stroke();

        // Fill
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.fillStyle = `${color}20`;
        ctx.fill();

    }, [data, color]);

    return <canvas ref={canvasRef} width={300} height={100} className="w-full h-24 rounded-lg bg-black/20" />;
}

export const Pulse: React.FC = () => {
    const [cpuData, setCpuData] = useState(Array(50).fill(0));
    const [memData, setMemData] = useState(Array(50).fill(0));
    const [netData, setNetData] = useState(Array(50).fill(0));

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuData(prev => [...prev.slice(1), Math.random() * 60 + 20]);
            setMemData(prev => [...prev.slice(1), Math.random() * 30 + 40]);
            setNetData(prev => [...prev.slice(1), Math.random() * 80 + 10]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full bg-[#0c0c10] text-gray-200 p-6 overflow-y-auto">
            <h1 className="text-2xl font-display font-bold mb-6 text-quantum-glow flex items-center gap-2">
                <Activity /> System Pulse
            </h1>

            <div className="space-y-6">
                <div className="bg-[#1a1a1e] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-neuro-purple"><Cpu size={16}/> Neural CPU</span>
                        <span className="font-mono text-xs">{cpuData[cpuData.length-1].toFixed(1)}%</span>
                    </div>
                    <Chart color="#3A0CA3" data={cpuData} />
                </div>

                <div className="bg-[#1a1a1e] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-neuro-pink"><HardDrive size={16}/> Memory Matrix</span>
                        <span className="font-mono text-xs">{memData[memData.length-1].toFixed(1)}%</span>
                    </div>
                    <Chart color="#FF00FF" data={memData} />
                </div>

                <div className="bg-[#1a1a1e] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between mb-2">
                        <span className="flex items-center gap-2 text-sm font-bold text-quantum-glow"><Wifi size={16}/> Quantum Network</span>
                        <span className="font-mono text-xs">{netData[netData.length-1].toFixed(1)} Mb/s</span>
                    </div>
                    <Chart color="#4CC9F0" data={netData} />
                </div>
            </div>
        </div>
    );
};