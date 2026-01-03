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
 * @file App.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { NotificationCenter } from './components/NotificationCenter';
import { NeuralInterface } from './components/NeuralInterface';
import { LockScreen } from './components/LockScreen';
import { Omnibar } from './components/Omnibar';
import { ContextMenu } from './components/ContextMenu';
import { DesktopIcons } from './components/DesktopIcons';
import { ControlCenter } from './components/ControlCenter';
import { Widgets } from './components/Widgets';
import { BootScreen } from './components/BootScreen';
import { ScreenSaver } from './components/ScreenSaver';
import { playSound } from './utils/sound';

// Apps
import { Finder } from './apps/Finder';
import { Browser } from './apps/Browser';
import { ProjectNebula } from './apps/ProjectNebula';
import { TicTacToe } from './apps/TicTacToe';
import { Settings } from './apps/Settings';
import { Terminal } from './apps/Terminal';
import { Mail } from './apps/Mail';
import { Snake } from './apps/Snake';
import { Memory } from './apps/Memory';
import { About } from './apps/About';
import { Calculator } from './apps/Calculator';
import { Paint } from './apps/Paint';
import { QuantumChess } from './apps/QuantumChess';
import { NeuroAI } from './apps/NeuroAI';
import { MatterShaper } from './apps/MatterShaper';
import { MusicPlayer } from './apps/MusicPlayer';
import { CodeEditor } from './apps/CodeEditor';
import { CalendarApp } from './apps/CalendarApp';
import { Notes } from './apps/Notes';
import { Pulse } from './apps/Pulse';
import { Atmosphere } from './apps/Atmosphere';
import { Prism } from './apps/Prism';
import { Lens } from './apps/Lens';
import { Cinema } from './apps/Cinema';
import { AudioLog } from './apps/AudioLog';
import { MarkText } from './apps/MarkText';
import { Chrono } from './apps/Chrono';
import { Sheet } from './apps/Sheet';
import { Synth } from './apps/Synth';
import { Aura } from './apps/Aura';
import { AppStore } from './apps/AppStore';
import { TaskManager } from './apps/TaskManager';
import { Minesweeper } from './apps/Minesweeper';
import { SpaceInvaders } from './apps/SpaceInvaders';
import { TaskMaster } from './apps/TaskMaster';
import { Focus } from './apps/Focus';
import { Gravity } from './apps/Gravity';

import { AppConfig, WALLPAPERS, Theme } from './types';
import { 
  FolderOpen, Globe, Gamepad2, Settings as SettingsIcon, Terminal as TerminalIcon, 
  Mail as MailIcon, PlayCircle, BrainCircuit, Info, Calculator as CalculatorIcon, 
  Palette, Crown, Bot, Wand2, Music, Code, Calendar, StickyNote, Activity, 
  CloudSun, Image, Camera, Clapperboard, Mic, FileText, Timer, Grid, Zap, Mic2,
  PackageOpen, Cpu, Bomb, Rocket, Kanban, Clock, Move3d
} from 'lucide-react';

export const APPS_CONFIG: AppConfig[] = [
  { id: 'finder', title: 'Finder', icon: FolderOpen, component: <Finder />, defaultX: 50, defaultY: 50, installed: true, category: 'System' },
  { id: 'project-nebula', title: 'Project Nebula', icon: Rocket, component: <ProjectNebula />, width: 1000, height: 700, installed: true, category: 'Productivity' },
  { id: 'store', title: 'Nexus Store', icon: PackageOpen, component: <AppStore />, width: 900, height: 650, installed: true, category: 'System' },
  { id: 'settings', title: 'Settings', icon: SettingsIcon, component: <Settings />, width: 800, height: 600, installed: true, category: 'System' },
  { id: 'projects', title: 'Cosmos Browser', icon: Globe, component: <Browser />, width: 1000, height: 700, isFull: true, installed: true, category: 'Productivity' },
  { id: 'nexus', title: 'System Nexus', icon: Cpu, component: <TaskManager />, width: 600, height: 500, installed: true, category: 'Utilities' },
  { id: 'terminal', title: 'Chronos Terminal', icon: TerminalIcon, component: <Terminal />, width: 600, height: 400, installed: true, category: 'Utilities' },
  { id: 'mail', title: 'Mail', icon: MailIcon, component: <Mail />, width: 900, height: 600, installed: true, category: 'Productivity' },
  
  // Productivity & Tools
  { id: 'taskmaster', title: 'TaskMaster', icon: Kanban, component: <TaskMaster />, width: 900, height: 600, installed: true, category: 'Productivity' },
  { id: 'focus', title: 'FocusFlow', icon: Clock, component: <Focus />, width: 400, height: 500, installed: true, category: 'Productivity' },
  { id: 'gravity', title: 'Gravity Lab', icon: Move3d, component: <Gravity />, width: 800, height: 600, installed: false, category: 'Creative' },

  // Games
  { id: 'quantum-chess', title: 'Quantum Chess', icon: Crown, component: <QuantumChess />, width: 800, height: 700, installed: false, category: 'Games' },
  { id: 'minesweeper', title: 'Logic Bomb', icon: Bomb, component: <Minesweeper />, width: 450, height: 550, installed: false, category: 'Games' },
  { id: 'space-invaders', title: 'Void Defender', icon: Rocket, component: <SpaceInvaders />, width: 420, height: 600, installed: false, category: 'Games' },
  { id: 'game', title: 'Tic Tac Toe', icon: Gamepad2, component: <TicTacToe />, width: 400, height: 500, installed: false, category: 'Games' },
  { id: 'snake', title: 'Snake', icon: PlayCircle, component: <Snake />, width: 440, height: 520, installed: false, category: 'Games' },
  { id: 'memory', title: 'Memory', icon: BrainCircuit, component: <Memory />, width: 500, height: 600, installed: false, category: 'Games' },

  // Creative
  { id: 'paint', title: 'Paint', icon: Palette, component: <Paint />, width: 800, height: 600, installed: false, category: 'Creative' },
  { id: 'music-player', title: 'Sonic Vibe', icon: Music, component: <MusicPlayer />, width: 800, height: 500, installed: false, category: 'Creative' },
  { id: 'synth', title: 'NebulaSynth', icon: Zap, component: <Synth />, width: 800, height: 600, installed: false, category: 'Creative' },
  { id: 'cinema', title: 'Cinema', icon: Clapperboard, component: <Cinema />, width: 800, height: 500, installed: false, category: 'Creative' },
  { id: 'prism', title: 'Prism Gallery', icon: Image, component: <Prism />, width: 800, height: 600, installed: false, category: 'Creative' },
  { id: 'matter-shaper', title: 'Matter Shaper', icon: Wand2, component: <MatterShaper />, width: 1000, height: 700, installed: false, category: 'Creative' },

  // Utilities
  { id: 'calculator', title: 'Calculator', icon: CalculatorIcon, component: <Calculator />, width: 350, height: 500, installed: true, category: 'Utilities' },
  { id: 'calendar', title: 'Chronos', icon: Calendar, component: <CalendarApp />, width: 800, height: 600, installed: true, category: 'Utilities' },
  { id: 'notes', title: 'Notes', icon: StickyNote, component: <Notes />, width: 700, height: 500, installed: true, category: 'Utilities' },
  { id: 'code-editor', title: 'Code Matrix', icon: Code, component: <CodeEditor />, width: 900, height: 600, installed: false, category: 'Utilities' },
  { id: 'neuro-ai', title: 'Neuro AI', icon: Bot, component: <NeuroAI />, width: 900, height: 650, installed: false, category: 'Utilities' },
  { id: 'pulse', title: 'Pulse Monitor', icon: Activity, component: <Pulse />, width: 600, height: 450, installed: false, category: 'Utilities' },
  { id: 'atmosphere', title: 'Atmosphere', icon: CloudSun, component: <Atmosphere />, width: 700, height: 500, installed: false, category: 'Utilities' },
  { id: 'lens', title: 'Lens', icon: Camera, component: <Lens />, width: 600, height: 500, installed: false, category: 'Utilities' },
  { id: 'audiolog', title: 'AudioLog', icon: Mic, component: <AudioLog />, width: 500, height: 600, installed: false, category: 'Utilities' },
  { id: 'marktext', title: 'MarkText', icon: FileText, component: <MarkText />, width: 800, height: 600, installed: false, category: 'Utilities' },
  { id: 'chrono', title: 'Chrono', icon: Timer, component: <Chrono />, width: 400, height: 500, installed: false, category: 'Utilities' },
  { id: 'sheet', title: 'QuantumGrid', icon: Grid, component: <Sheet />, width: 900, height: 600, installed: false, category: 'Utilities' },
  { id: 'aura', title: 'Aura', icon: Mic2, component: <Aura />, width: 500, height: 600, installed: false, category: 'Utilities' },
  { id: 'about', title: 'About AshrafOS', icon: Info, component: <About />, width: 400, height: 500, installed: true, category: 'System' }
];

const App: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const openWindow = useStore((state) => state.openWindow);
  const addNotification = useStore((state) => state.addNotification);
  const isLocked = useStore((state) => state.isLocked);
  const openContextMenu = useStore((state) => state.openContextMenu);
  const toggleOmnibar = useStore((state) => state.toggleOmnibar);
  const brightness = useStore((state) => state.brightness);
  const nightShift = useStore((state) => state.nightShift);
  const isBooting = useStore((state) => state.isBooting);
  const installedApps = useStore((state) => state.installedApps);
  const windows = useStore((state) => state.windows);
  
  // Filter apps for dock: Must be installed OR currently open
  const DOCK_APPS = APPS_CONFIG.filter(app => 
      installedApps.includes(app.id) || windows[app.id]
  ).slice(0, 20); // Cap at 20 for dock space

  useEffect(() => {
    document.body.className = theme === Theme.LIGHT ? 'light-theme' : 'dark-theme';
    if (theme === Theme.LIGHT) {
        document.body.style.backgroundColor = '#F0F4F8';
    } else if (theme === Theme.QUANTUM) {
        document.body.style.backgroundColor = '#0A0C27';
    } else if (theme === Theme.CYBERPUNK) {
        document.body.style.backgroundColor = '#0b0c15';
    } else {
        document.body.style.backgroundColor = '#050510';
    }
  }, [theme]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if (e.metaKey && e.key === 'k') {
            e.preventDefault();
            toggleOmnibar();
        }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
        window.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Post-Unlock Notification
  useEffect(() => {
    if (!isBooting && !isLocked) {
        playSound('open');
        setTimeout(() => {
             const hasOpenWindows = document.querySelectorAll('.glass').length > 0;
             if (!hasOpenWindows) openWindow('finder');
        }, 500);
        setTimeout(() => {
            addNotification({
                title: 'System Online',
                message: 'Neural Interface Active. Welcome back, Ashraf Morningstar.',
            });
        }, 1500);
    }
  }, [isBooting, isLocked]);

  if (isBooting) {
      return <BootScreen />;
  }

  return (
    <div 
      className={`h-screen w-screen overflow-hidden relative bg-cover bg-center transition-all duration-700 ease-in-out ${
          theme === Theme.LIGHT ? 'bg-[#F0F4F8]' : 'bg-chronos-dark'
      }`}
      style={{ backgroundImage: (theme !== Theme.QUANTUM && theme !== Theme.LIGHT && theme !== Theme.CYBERPUNK) ? `url(${WALLPAPERS[theme]})` : undefined }}
      onContextMenu={(e) => openContextMenu(e, 'desktop')}
    >
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] bg-black transition-opacity duration-300"
        style={{ opacity: 1 - (brightness / 100) }}
      />
      {nightShift && (
         <div className="fixed inset-0 pointer-events-none z-[9997] bg-orange-500/20 mix-blend-overlay" />
      )}

      <ScreenSaver />
      <LockScreen />
      
      {(theme === Theme.QUANTUM || theme === Theme.LIGHT || theme === Theme.CYBERPUNK) && <NeuralInterface />}
      <div className={`absolute inset-0 pointer-events-none ${theme === Theme.LIGHT ? 'bg-white/10' : 'bg-black/10'}`} />

      <TopBar />
      <NotificationCenter />
      <ControlCenter />
      <Omnibar apps={APPS_CONFIG} />
      <ContextMenu />
      <DesktopIcons />
      <Widgets />

      {/* Desktop Grid Area */}
      <div className="relative z-0 h-full w-full pt-12 pb-24 px-4 overflow-hidden pointer-events-none">
         {/* Desktop icons are handled by DesktopIcons component via absolute positioning */}
      </div>

      {APPS_CONFIG.map((app) => (
        <Window key={app.id} app={app} />
      ))}

      <Dock apps={DOCK_APPS} />
    </div>
  );
};

export default App;