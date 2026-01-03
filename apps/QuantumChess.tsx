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
 * @file QuantumChess.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Chess } from 'chess.js';
import { 
  Crown, 
  Target, 
  GitBranch,
  Zap,
  Split,
  Merge
} from 'lucide-react';

type QuantumPiece = {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'w' | 'b';
  position: string;
  superposition: string[]; 
  collapsed: boolean;
  probability: number;
};

export const QuantumChess: React.FC = () => {
  const [chess] = useState(new Chess());
  const [quantumPieces, setQuantumPieces] = useState<QuantumPiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [superpositionMode, setSuperpositionMode] = useState(false);
  
  useEffect(() => {
    const initialPieces: QuantumPiece[] = [];
    
    chess.board().forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        if (piece) {
          const position = String.fromCharCode(97 + colIndex) + (8 - rowIndex);
          
          initialPieces.push({
            type: piece.type as any,
            color: piece.color,
            position,
            superposition: [position],
            collapsed: true,
            probability: 1
          });
        }
      });
    });
    
    setQuantumPieces(initialPieces);
  }, [chess]);
  
  const handlePieceClick = (pieceId: string) => {
    if (superpositionMode) {
      const piece = quantumPieces.find(p => 
        `${p.type}-${p.color}-${p.position}` === pieceId
      );
      
      if (piece) {
        const newSuperposition = [
          piece.position,
          getRandomPosition(),
          getRandomPosition()
        ];
        
        setQuantumPieces(prev => prev.map(p => 
          p === piece ? {
            ...p,
            superposition: newSuperposition,
            collapsed: false,
            probability: 1 / newSuperposition.length
          } : p
        ));
      }
    } else {
      setSelectedPiece(pieceId);
      const element = document.getElementById(`piece-${pieceId}`);
      if (element) {
        gsap.to(element, {
          scale: 1.2,
          boxShadow: '0 0 30px rgba(76, 201, 240, 0.8)',
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    }
  };
  
  const handleMove = (toPosition: string) => {
    if (!selectedPiece) return;
    
    setQuantumPieces(prev => prev.map(piece => ({
      ...piece,
      superposition: [toPosition],
      collapsed: true,
      probability: 1
    })));
    
    const element = document.getElementById(`piece-${selectedPiece}`);
    
    if (element) {
      const toX = (toPosition.charCodeAt(0) - 97) * 60;
      const toY = (8 - parseInt(toPosition[1])) * 60;
      
      gsap.to(element, {
        x: toX,
        y: toY,
        duration: 0.5,
        ease: 'power3.out',
        onComplete: () => {
          createTeleportEffect(toPosition);
        }
      });
    }
    
    setSelectedPiece(null);
  };
  
  const createTeleportEffect = (position: string) => {
    const x = (position.charCodeAt(0) - 97) * 60 + 30;
    const y = (8 - parseInt(position[1])) * 60 + 30;
    
    const effect = document.createElement('div');
    effect.className = 'absolute w-12 h-12 rounded-full border-2 border-quantum-glow';
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.transform = 'translate(-50%, -50%)';
    
    document.getElementById('quantum-chess-board')?.appendChild(effect);
    
    gsap.to(effect, {
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => effect.remove()
    });
  };
  
  const getRandomPosition = () => {
    const col = String.fromCharCode(97 + Math.floor(Math.random() * 8));
    const row = Math.floor(Math.random() * 8) + 1;
    return `${col}${row}`;
  };
  
  const renderBoard = () => {
    const squares = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isDark = (row + col) % 2 === 1;
        const position = String.fromCharCode(97 + col) + (8 - row);
        
        squares.push(
          <div
            key={position}
            className={`
              w-[60px] h-[60px] flex items-center justify-center
              ${isDark ? 'bg-chronos-blue/50' : 'bg-chronos-space/30'}
              border border-neuro-purple/20
              hover:bg-neuro-purple/10 transition-colors duration-300
              cursor-pointer
            `}
            onClick={() => handleMove(position)}
          >
          </div>
        );
      }
    }
    
    return squares;
  };
  
  const renderQuantumPieces = () => {
    return quantumPieces.map((piece) => {
      const [col, row] = [piece.position.charCodeAt(0) - 97, 8 - parseInt(piece.position[1])];
      
      return (
        <div
          key={`${piece.type}-${piece.color}-${piece.position}`}
          id={`piece-${piece.type}-${piece.color}-${piece.position}`}
          className={`
            absolute w-12 h-12 flex items-center justify-center
            rounded-lg cursor-pointer transition-all duration-300
            ${piece.color === 'w' ? 'bg-white/90' : 'bg-chronos-dark/90'}
            border-2 ${piece.color === 'w' ? 'border-neuro-cyan' : 'border-neuro-purple'}
            shadow-lg hover:shadow-neuro
          `}
          style={{
            left: col * 60 + 6,
            top: row * 60 + 6,
          }}
          onClick={(e) => { e.stopPropagation(); handlePieceClick(`${piece.type}-${piece.color}-${piece.position}`); }}
        >
          <div className="relative">
            {piece.type === 'king' && <Crown size={24} className={piece.color === 'w' ? 'text-chronos-dark' : 'text-white'} />}
            {piece.type === 'queen' && <Crown size={24} className={piece.color === 'w' ? 'text-chronos-dark' : 'text-white'} />}
            {piece.type === 'rook' && <GitBranch size={24} className={piece.color === 'w' ? 'text-chronos-dark' : 'text-white'} />}
            {piece.type === 'bishop' && <Target size={24} className={piece.color === 'w' ? 'text-chronos-dark' : 'text-white'} />}
            {piece.type === 'knight' && <Zap size={24} className={piece.color === 'w' ? 'text-chronos-dark' : 'text-white'} />}
            {piece.type === 'pawn' && <div className="w-4 h-4 rounded-full bg-current text-current" style={{ color: piece.color === 'w' ? '#0A0C27' : '#FFFFFF' }} />}
            
            {!piece.collapsed && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-neuro-purple 
                rounded-full flex items-center justify-center">
                <Split className="w-2 h-2 text-white" />
              </div>
            )}
          </div>
          
          {!piece.collapsed && piece.superposition.length > 1 && (
            <div className="absolute -inset-2 border border-dashed 
              border-neuro-purple/50 rounded-lg animate-pulse" />
          )}
        </div>
      );
    });
  };

  return (
    <div className="h-full bg-chronos-dark text-white p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-2xl font-display text-quantum-glow">Quantum Chess</h2>
                <p className="text-xs text-neuro-purple">Superposition enabled</p>
            </div>
            <button
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${superpositionMode ? 'bg-neuro-purple text-white' : 'bg-white/10 text-quantum-glow'}`}
                onClick={() => setSuperpositionMode(!superpositionMode)}
            >
                {superpositionMode ? 'Collapse State' : 'Superposition'}
            </button>
        </div>

        <div className="flex justify-center mb-4">
             <div 
              id="quantum-chess-board"
              className="relative border-2 border-neuro-purple/30 rounded-lg overflow-hidden"
              style={{ width: '480px', height: '480px' }}
            >
                <div className="grid grid-cols-8 grid-rows-8">
                    {renderBoard()}
                </div>
                {renderQuantumPieces()}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="text-quantum-glow font-bold mb-2">Quantum State</h3>
                <div className="text-xs space-y-1 text-gray-400">
                    <p>Coherence: 98.4%</p>
                    <p>Entanglement: Active</p>
                </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h3 className="text-neuro-pink font-bold mb-2">Probability</h3>
                <div className="text-xs space-y-1 text-gray-400">
                    <p>White Win: 48%</p>
                    <p>Black Win: 42%</p>
                    <p>Paradox: 10%</p>
                </div>
            </div>
        </div>
    </div>
  );
};