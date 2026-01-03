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
 * @file sound.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

// Simple Web Audio API synthesizer for UI sounds
const audioCtx = typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const playSound = (type: 'hover' | 'click' | 'open' | 'close' | 'notification' | 'error') => {
  if (audioCtx?.state === 'suspended') audioCtx.resume();
  
  switch (type) {
    case 'hover':
      // Very subtle high frequency tick
      // playTone(800, 'sine', 0.05, 0.02); // Disabled for sanity, too annoying
      break;
    case 'click':
      playTone(600, 'sine', 0.1, 0.1);
      break;
    case 'open':
      playTone(400, 'sine', 0.2, 0.1);
      setTimeout(() => playTone(600, 'sine', 0.3, 0.1), 100);
      break;
    case 'close':
      playTone(600, 'sine', 0.2, 0.05);
      setTimeout(() => playTone(300, 'sine', 0.3, 0.05), 100);
      break;
    case 'notification':
      playTone(880, 'sine', 0.1, 0.1);
      setTimeout(() => playTone(1100, 'sine', 0.4, 0.1), 150);
      break;
    case 'error':
      playTone(150, 'sawtooth', 0.3, 0.2);
      break;
  }
};