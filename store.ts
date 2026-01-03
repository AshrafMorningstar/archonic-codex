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
 * @file store.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import React from 'react';
import { WindowState, Theme, Notification, ContextMenuState, WidgetConfig } from './types';
import { playSound } from './utils/sound';

interface SystemState {
  windows: Record<string, WindowState>;
  notifications: Notification[];
  activeWindowId: string | null;
  maxZIndex: number;
  theme: Theme;
  soundEnabled: boolean;
  
  // UI States
  isNotificationCenterOpen: boolean;
  isOmnibarOpen: boolean;
  isControlCenterOpen: boolean;
  isLocked: boolean;
  isBooting: boolean;
  isScreenSaver: boolean;
  contextMenu: ContextMenuState;
  
  // System Toggles
  brightness: number;
  volume: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  dnd: boolean; 
  nightShift: boolean;
  performanceMode: boolean; // New

  // Data
  neuralActivity: number;
  installedApps: string[]; // List of installed App IDs
  widgets: WidgetConfig[];
  
  // Actions
  setBooting: (state: boolean) => void;
  setScreenSaver: (state: boolean) => void;
  installApp: (appId: string) => void;
  uninstallApp: (appId: string) => void;
  
  openWindow: (id: string, defaults?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  setTheme: (theme: Theme) => void;
  toggleSound: () => void;
  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
  toggleSystemState: (key: 'wifi' | 'bluetooth' | 'airdrop' | 'dnd' | 'nightShift' | 'performanceMode') => void;
  
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  toggleNotificationCenter: () => void;
  toggleControlCenter: () => void;
  toggleOmnibar: () => void;
  setOmnibarOpen: (isOpen: boolean) => void;
  increaseNeuralActivity: () => void;
  unlock: () => void;
  lock: () => void;
  openContextMenu: (e: React.MouseEvent, type: ContextMenuState['type'], targetId?: string) => void;
  closeContextMenu: () => void;
  
  updateWidgetPosition: (id: string, x: number, y: number) => void;
  toggleWidget: (type: WidgetConfig['type']) => void;
  reboot: () => void;
}

export const useStore = create<SystemState>()(
  persist(
    (set, get) => ({
      windows: {},
      notifications: [],
      activeWindowId: null,
      maxZIndex: 100,
      theme: Theme.QUANTUM,
      soundEnabled: true,
      
      isNotificationCenterOpen: false,
      isOmnibarOpen: false,
      isControlCenterOpen: false,
      isLocked: true,
      isBooting: true,
      isScreenSaver: false,
      contextMenu: { isOpen: false, x: 0, y: 0, type: 'desktop' },
      
      brightness: 100,
      volume: 80,
      wifi: true,
      bluetooth: true,
      airdrop: false,
      dnd: false,
      nightShift: false,
      performanceMode: false,

      neuralActivity: 0.5,
      // Updated default apps to include new features
      installedApps: ['finder', 'project-nebula', 'settings', 'projects', 'store', 'nexus', 'terminal', 'mail', 'taskmaster', 'focus'], 
      widgets: [
          { id: 'w-clock', type: 'clock', x: window.innerWidth - 300, y: 50 },
      ],

      setBooting: (state) => set({ isBooting: state }),
      setScreenSaver: (state) => set({ isScreenSaver: state }),
      
      installApp: (appId) => set(state => ({ installedApps: [...state.installedApps, appId] })),
      uninstallApp: (appId) => set(state => {
          // Close window if open
          const newWindows = { ...state.windows };
          delete newWindows[appId];
          return {
              installedApps: state.installedApps.filter(id => id !== appId),
              windows: newWindows
          };
      }),

      openWindow: (id, defaults) => {
        const state = get();
        const existing = state.windows[id];
        const newZ = state.maxZIndex + 1;
        
        if (state.soundEnabled) playSound('open');

        if (existing) {
          set({
            windows: { 
              ...state.windows, 
              [id]: { ...existing, isMinimized: false, zIndex: newZ } 
            },
            activeWindowId: id,
            maxZIndex: newZ,
            isOmnibarOpen: false,
          });
          return;
        }

        const isMobile = window.innerWidth < 768;
        const defaultWidth = isMobile ? window.innerWidth : (defaults?.size?.width || 800);
        const defaultHeight = isMobile ? window.innerHeight - 80 : (defaults?.size?.height || 600);
        
        const width = Math.min(defaultWidth, window.innerWidth);
        const height = Math.min(defaultHeight, window.innerHeight - 50);
        
        const x = isMobile ? 0 : Math.max(0, (window.innerWidth - width) / 2 + (Math.random() * 40 - 20));
        const y = isMobile ? 0 : Math.max(0, (window.innerHeight - height) / 2 + (Math.random() * 40 - 20));

        set({
          windows: {
            ...state.windows,
            [id]: {
              id,
              isOpen: true,
              isMinimized: false,
              isMaximized: isMobile,
              zIndex: newZ,
              position: { x, y },
              size: { width, height },
              ...defaults,
            },
          },
          activeWindowId: id,
          maxZIndex: newZ,
          isOmnibarOpen: false,
        });
      },

      closeWindow: (id) => {
        const state = get();
        if (state.soundEnabled) playSound('close');
        const newWindows = { ...state.windows };
        delete newWindows[id];
        set({ windows: newWindows, activeWindowId: null });
      },

      minimizeWindow: (id) =>
        set((state) => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } },
          activeWindowId: null,
        })),

      maximizeWindow: (id) =>
        set((state) => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized } },
        })),

      focusWindow: (id) =>
        set((state) => {
          if (state.activeWindowId === id) return {};
          const newZ = state.maxZIndex + 1;
          return {
            windows: { ...state.windows, [id]: { ...state.windows[id], zIndex: newZ, isMinimized: false } },
            activeWindowId: id,
            maxZIndex: newZ,
          };
        }),

      updateWindowPosition: (id, pos) =>
        set((state) => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], position: pos } },
        })),

      updateWindowSize: (id, size) =>
        set((state) => ({
          windows: { ...state.windows, [id]: { ...state.windows[id], size } },
        })),

      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setVolume: (v) => set({ volume: v }),
      setBrightness: (v) => set({ brightness: v }),
      toggleSystemState: (key) => set((state) => ({ [key]: !state[key] })),
      
      addNotification: (n) => {
        const state = get();
        if (state.dnd) return; 
        if (state.soundEnabled) playSound('notification');
        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
          ...n
        };
        set({ notifications: [newNotification, ...state.notifications] });
      },

      markNotificationRead: (id) => 
        set((state) => ({
          notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        })),

      clearNotifications: () => set({ notifications: [] }),
      
      toggleNotificationCenter: () => set((state) => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen, isControlCenterOpen: false })),
      toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen, isNotificationCenterOpen: false })),

      toggleOmnibar: () => set((state) => ({ isOmnibarOpen: !state.isOmnibarOpen })),
      setOmnibarOpen: (isOpen) => set({ isOmnibarOpen: isOpen }),

      increaseNeuralActivity: () => set((state) => ({ neuralActivity: Math.min(1, state.neuralActivity + 0.1) })),
      
      unlock: () => set({ isLocked: false, isScreenSaver: false }),
      lock: () => set({ isLocked: true }),

      openContextMenu: (e, type, targetId) => {
          e.preventDefault();
          set({ contextMenu: { isOpen: true, x: e.clientX, y: e.clientY, type, targetId } });
      },
      closeContextMenu: () => set({ contextMenu: { ...get().contextMenu, isOpen: false } }),

      updateWidgetPosition: (id, x, y) => set(state => ({
          widgets: state.widgets.map(w => w.id === id ? { ...w, x, y } : w)
      })),
      toggleWidget: (type) => set(state => {
          const exists = state.widgets.find(w => w.type === type);
          if (exists) {
              return { widgets: state.widgets.filter(w => w.type !== type) };
          } else {
              return { widgets: [...state.widgets, { id: `w-${type}-${Date.now()}`, type, x: 200, y: 100 }] };
          }
      }),
      reboot: () => {
          set({ isBooting: true, windows: {}, activeWindowId: null });
          setTimeout(() => {
              window.location.reload();
          }, 500);
      }
    }),
    {
      name: 'eigenfolio-storage',
      partialize: (state) => ({ 
          theme: state.theme, 
          soundEnabled: state.soundEnabled, 
          brightness: state.brightness, 
          volume: state.volume, 
          widgets: state.widgets,
          installedApps: state.installedApps,
          performanceMode: state.performanceMode
      }),
    }
  )
);