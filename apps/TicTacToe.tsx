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
 * @file TicTacToe.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O';
type Cell = Player | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = (squares: Cell[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Draw';
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#1a1a20] text-white p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tic Tac Toe</h2>
        <div className="h-6 text-sm font-medium text-gray-400">
          {winner ? (
            <span className={winner === 'Draw' ? 'text-yellow-400' : 'text-green-400'}>
              {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
            </span>
          ) : (
            <span>Player {isXNext ? 'X' : 'O'}'s Turn</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 bg-white/5 p-3 rounded-2xl border border-white/10 shadow-2xl">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-4xl font-bold flex items-center justify-center transition-all duration-200 ${
              cell 
                ? 'bg-white/10 shadow-inner' 
                : 'bg-white/5 hover:bg-white/10 hover:scale-105'
            } ${
                cell === 'X' ? 'text-blue-400' : 'text-purple-400'
            }`}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
      >
        <RotateCcw size={16} />
        New Game
      </button>
    </div>
  );
};
