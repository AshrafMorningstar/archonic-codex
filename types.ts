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
 * @file types.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface AppConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  component: React.ReactNode;
  width?: number;
  height?: number;
  defaultX?: number;
  defaultY?: number;
  isFull?: boolean;
  installed?: boolean; // New: For App Store
  category?: 'System' | 'Productivity' | 'Creative' | 'Games' | 'Utilities';
}

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: () => void;
}

export enum Theme {
  QUANTUM = 'quantum',
  LIGHT = 'light',
  MIDNIGHT = 'midnight',
  COSMIC = 'cosmic',
  DESERT = 'desert',
  FOREST = 'forest',
  OCEAN = 'ocean',
  NEON = 'neon',
  CYBERPUNK = 'cyberpunk',
  RETRO = 'retro'
}

export const WALLPAPERS = {
  [Theme.QUANTUM]: '', 
  [Theme.LIGHT]: 'https://images.unsplash.com/photo-1517639493569-5666a79d7388?q=80&w=2560&auto=format&fit=crop',
  [Theme.MIDNIGHT]: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2068&auto=format&fit=crop',
  [Theme.COSMIC]: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  [Theme.DESERT]: 'https://images.unsplash.com/photo-1663431261867-2157796d1911?q=80&w=2070&auto=format&fit=crop',
  [Theme.FOREST]: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop',
  [Theme.OCEAN]: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop',
  [Theme.NEON]: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
  [Theme.CYBERPUNK]: 'https://images.unsplash.com/photo-1605218457336-92bf68955263?q=80&w=2070&auto=format&fit=crop',
  [Theme.RETRO]: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'
};

export const COLORS = {
  chronosBlue: "#0A0C27",
  neuroPurple: "#3A0CA3",
  quantumGlow: "#4CC9F0",
  neuroPink: "#FF00FF",
  darkMatter: "#050510"
};

export interface ContextMenuState {
    isOpen: boolean;
    x: number;
    y: number;
    type: 'desktop' | 'icon' | 'window';
    targetId?: string;
}

export interface WidgetConfig {
    id: string;
    type: 'clock' | 'weather' | 'battery' | 'system';
    x: number;
    y: number;
}

// File System Types
export type FileType = 'folder' | 'text' | 'image' | 'code' | 'audio';

export interface FileNode {
    id: string;
    parentId: string | null;
    name: string;
    type: FileType;
    content?: string; 
    children?: string[]; 
    createdAt: Date;
}