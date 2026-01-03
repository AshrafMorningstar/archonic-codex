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
 * @file Paint.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pencil, Download, Trash2, Undo } from 'lucide-react';

export const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set resolution for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#1e1e24' : color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24]">
      {/* Toolbar */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#27272a]">
        <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
                <button 
                    onClick={() => setTool('pencil')}
                    className={`p-2 rounded-md transition-colors ${tool === 'pencil' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <Pencil size={18} />
                </button>
                <button 
                    onClick={() => setTool('eraser')}
                    className={`p-2 rounded-md transition-colors ${tool === 'eraser' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    <Eraser size={18} />
                </button>
            </div>
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            
            <div className="flex items-center gap-2">
                <input 
                    type="color" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                />
                <input 
                    type="range" 
                    min="1" 
                    max="20" 
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-24 accent-blue-500"
                />
            </div>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={clearCanvas}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Clear"
            >
                <Trash2 size={18} />
            </button>
            <button 
                onClick={downloadCanvas}
                className="p-2 text-gray-400 hover:text-green-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Save"
            >
                <Download size={18} />
            </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden relative cursor-crosshair">
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full"
        />
      </div>
    </div>
  );
};