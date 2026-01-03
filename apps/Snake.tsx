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
 * @file Snake.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 20;
const SPEED = 100;

export const Snake: React.FC = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, 1]); // [row, col]
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = setInterval(() => {
      setSnake((prev) => {
        const newHead = [prev[0][0] + direction[0], prev[0][1] + direction[1]];

        // Check collisions
        if (
          newHead[0] < 0 ||
          newHead[0] >= 20 || // Using fixed 20x20 grid logic
          newHead[1] < 0 ||
          newHead[1] >= 20 ||
          prev.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        
        // Check Food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 10);
          setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, isPlaying]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction[0] !== 1) setDirection([-1, 0]); break;
        case 'ArrowDown': if (direction[0] !== -1) setDirection([1, 0]); break;
        case 'ArrowLeft': if (direction[1] !== 1) setDirection([0, -1]); break;
        case 'ArrowRight': if (direction[1] !== -1) setDirection([0, 1]); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  const resetGame = () => {
    setSnake([[5, 5]]);
    setFood([10, 10]);
    setDirection([0, 1]);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#2e3440] text-white p-4" tabIndex={0} ref={boardRef}>
      <div className="mb-4 flex items-center justify-between w-full max-w-[400px]">
        <h2 className="text-xl font-bold font-display text-green-400">Snake</h2>
        <div className="text-lg font-mono">Score: {score}</div>
      </div>

      <div className="relative bg-[#1a1b26] p-1 rounded-lg shadow-2xl border border-white/10" style={{ width: 'min(400px, 80vw)', height: 'min(400px, 80vw)' }}>
        {gameOver && (
          <div className="absolute inset-0 z-10 bg-black/80 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-red-500 mb-4">Game Over</h3>
            <p className="mb-6 text-gray-400">Final Score: {score}</p>
            <button onClick={resetGame} className="flex items-center gap-2 px-6 py-2 bg-green-600 rounded-full font-bold hover:bg-green-500 transition-colors">
              <RotateCcw size={18} /> Try Again
            </button>
          </div>
        )}
        
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 z-10 bg-black/60 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm">
             <button onClick={resetGame} className="flex items-center gap-2 px-8 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors shadow-lg hover:scale-105 active:scale-95 duration-200">
              <Play size={20} /> Start Game
            </button>
          </div>
        )}

        <div className="grid grid-cols-20 grid-rows-20 w-full h-full gap-px bg-[#2e3440]/30" style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(20, 1fr)' }}>
            {Array.from({ length: 400 }).map((_, i) => {
                const x = Math.floor(i / 20);
                const y = i % 20;
                const isSnake = snake.some(s => s[0] === x && s[1] === y);
                const isFood = food[0] === x && food[1] === y;
                
                return (
                    <div 
                        key={i} 
                        className={`w-full h-full rounded-sm ${
                            isSnake ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 
                            isFood ? 'bg-red-500 animate-pulse rounded-full' : 'bg-transparent'
                        }`}
                    />
                )
            })}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">Use Arrow Keys to Move</div>
    </div>
  );
};