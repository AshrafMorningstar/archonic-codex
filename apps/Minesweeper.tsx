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
 * @file Minesweeper.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Bomb, Flag, Smile, Frown, RotateCcw } from 'lucide-react';

const SIZE = 10;
const MINES = 15;

interface Cell {
    id: number;
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
}

export const Minesweeper: React.FC = () => {
    const [grid, setGrid] = useState<Cell[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        let newGrid: Cell[] = Array.from({ length: SIZE * SIZE }, (_, i) => ({
            id: i,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0
        }));

        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const idx = Math.floor(Math.random() * newGrid.length);
            if (!newGrid[idx].isMine) {
                newGrid[idx].isMine = true;
                minesPlaced++;
            }
        }

        newGrid = newGrid.map((cell, idx) => {
            if (cell.isMine) return cell;
            const neighbors = getNeighbors(idx);
            const count = neighbors.reduce((acc, nIdx) => acc + (newGrid[nIdx].isMine ? 1 : 0), 0);
            return { ...cell, neighborMines: count };
        });

        setGrid(newGrid);
        setGameOver(false);
        setWon(false);
    };

    const getNeighbors = (idx: number) => {
        const neighbors = [];
        const row = Math.floor(idx / SIZE);
        const col = idx % SIZE;
        
        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
                    const nIdx = r * SIZE + c;
                    if (nIdx !== idx) neighbors.push(nIdx);
                }
            }
        }
        return neighbors;
    };

    const reveal = (idx: number) => {
        if (gameOver || won || grid[idx].isRevealed || grid[idx].isFlagged) return;

        const newGrid = [...grid];
        if (newGrid[idx].isMine) {
            newGrid[idx].isRevealed = true;
            setGrid(newGrid);
            setGameOver(true);
            return;
        }

        const revealRecursive = (i: number) => {
            if (newGrid[i].isRevealed || newGrid[i].isFlagged) return;
            newGrid[i].isRevealed = true;
            if (newGrid[i].neighborMines === 0) {
                getNeighbors(i).forEach(n => revealRecursive(n));
            }
        };

        revealRecursive(idx);
        setGrid(newGrid);

        if (newGrid.filter(c => !c.isMine).every(c => c.isRevealed)) {
            setWon(true);
        }
    };

    const toggleFlag = (e: React.MouseEvent, idx: number) => {
        e.preventDefault();
        if (gameOver || won || grid[idx].isRevealed) return;
        const newGrid = [...grid];
        newGrid[idx].isFlagged = !newGrid[idx].isFlagged;
        setGrid(newGrid);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#1a1a20] text-white p-4">
            <div className="mb-4 flex items-center justify-between w-full max-w-[300px] bg-black/30 p-2 rounded-lg">
                <div className="font-mono text-red-500 font-bold text-xl">
                    {String(MINES - grid.filter(c => c.isFlagged).length).padStart(3, '0')}
                </div>
                <button onClick={initGame} className="p-1 hover:bg-white/10 rounded">
                    {gameOver ? <Frown className="text-red-500" /> : won ? <Smile className="text-green-500" /> : <Smile className="text-yellow-500" />}
                </button>
            </div>

            <div 
                className="grid gap-1 bg-black/50 p-2 rounded-lg border border-white/10 shadow-2xl"
                style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
            >
                {grid.map(cell => (
                    <div
                        key={cell.id}
                        onClick={() => reveal(cell.id)}
                        onContextMenu={(e) => toggleFlag(e, cell.id)}
                        className={`
                            w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer select-none rounded-sm transition-colors
                            ${cell.isRevealed 
                                ? (cell.isMine ? 'bg-red-600' : 'bg-[#2a2a30]') 
                                : 'bg-[#3f3f46] hover:bg-[#52525b] shadow-[inset_2px_2px_0_rgba(255,255,255,0.1)]'
                            }
                        `}
                    >
                        {cell.isRevealed && cell.isMine && <Bomb size={16} />}
                        {cell.isRevealed && !cell.isMine && cell.neighborMines > 0 && (
                            <span style={{ color: ['#3b82f6', '#22c55e', '#ef4444', '#a855f7'][cell.neighborMines - 1] || 'white' }}>
                                {cell.neighborMines}
                            </span>
                        )}
                        {!cell.isRevealed && cell.isFlagged && <Flag size={14} className="text-red-500" />}
                    </div>
                ))}
            </div>
            
            {gameOver && <div className="mt-4 text-red-500 font-bold animate-pulse">SYSTEM FAILURE - BOMB DETONATED</div>}
            {won && <div className="mt-4 text-green-500 font-bold animate-bounce">THREAT NEUTRALIZED</div>}
        </div>
    );
};