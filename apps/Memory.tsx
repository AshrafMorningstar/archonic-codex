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
 * @file Memory.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';

const EMOJIS = ['🚀', '🪐', '💻', '🎨', '🎮', '🎧', '📷', '💡'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const Memory: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flipped.length === 2) return;
    if (cards.find(c => c.id === id)?.isMatched) return;
    if (flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    
    setCards(cards.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isMatched: true } : c
          ));
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const isWon = cards.length > 0 && cards.every(c => c.isMatched);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#18181b] p-4">
      <div className="mb-6 flex justify-between w-full max-w-md items-center">
         <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Memory Match</h2>
         <div className="px-3 py-1 bg-white/10 rounded-full text-sm font-mono text-gray-300">Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full max-w-md aspect-square">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`relative w-full h-full rounded-xl text-3xl flex items-center justify-center transition-all duration-300 perspective-1000 ${
              card.isFlipped || card.isMatched 
                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 rotate-y-180' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
             <div className="absolute inset-0 flex items-center justify-center backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                {card.emoji}
             </div>
             <div className={`absolute inset-0 flex items-center justify-center backface-hidden ${card.isFlipped || card.isMatched ? 'opacity-0' : 'opacity-100'}`} style={{ backfaceVisibility: 'hidden' }}>
                <Gamepad2 size={24} className="text-gray-600 opacity-50" />
             </div>
          </button>
        ))}
      </div>

      {isWon && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <h2 className="text-4xl font-bold text-white mb-2">You Won!</h2>
            <p className="text-gray-400 mb-6">Completed in {moves} moves</p>
            <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full font-bold transition-colors"
            >
                <RotateCcw size={18} /> Play Again
            </button>
        </div>
      )}
    </div>
  );
};