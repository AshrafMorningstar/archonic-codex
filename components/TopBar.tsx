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
 * @file TopBar.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, BatteryCharging, Search, Command, Bell, Volume2, VolumeX, Menu, Activity, Sliders, Power } from 'lucide-react';
import { useStore } from '../store';
import { Theme } from '../types';

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isCharging, setIsCharging] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const activeWindowId = useStore((state) => state.activeWindowId);
  const theme = useStore((state) => state.theme);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);
  const notifications = useStore((state) => state.notifications);
  const toggleNotificationCenter = useStore((state) => state.toggleNotificationCenter);
  const toggleControlCenter = useStore((state) => state.toggleControlCenter);
  const openWindow = useStore((state) => state.openWindow);
  const toggleOmnibar = useStore((state) => state.toggleOmnibar);
  const lock = useStore((state) => state.lock);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Battery API
    if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
            setBatteryLevel(battery.level);
            setIsCharging(battery.charging);
            battery.addEventListener('levelchange', () => setBatteryLevel(battery.level));
            battery.addEventListener('chargingchange', () => setIsCharging(battery.charging));
        });
    }

    // Network API
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        clearInterval(timer);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="h-8 w-full glass fixed top-0 left-0 z-50 flex items-center justify-between px-2 sm:px-4 text-xs font-medium text-white/90 select-none">
      <div className="flex items-center gap-2 sm:gap-4">
        <div 
          onClick={() => openWindow('about')}
          className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded cursor-pointer transition-colors"
        >
          <Command size={14} className="fill-current" />
        </div>
        <span className="font-bold cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors hidden sm:block">
          {activeWindowId ? activeWindowId.charAt(0).toUpperCase() + activeWindowId.slice(1) : 'AshrafOS'}
        </span>
        <div className="hidden md:flex items-center gap-1">
           {['File', 'Edit', 'View', 'Window'].map(item => (
             <span key={item} className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">{item}</span>
           ))}
           <span onClick={() => openWindow('about')} className="cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors">Help</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div 
            onClick={toggleOmnibar}
            className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"
            title="Search (Cmd+K)"
        >
            <Search size={14} />
        </div>

        <div 
          onClick={lock}
          className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors text-red-400"
          title="Lock Screen"
        >
            <Power size={14} />
        </div>

        <div 
            onClick={toggleControlCenter}
            className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors"
            title="Control Center"
        >
            <Sliders size={14} />
        </div>

        <div 
          onClick={toggleNotificationCenter}
          className="cursor-pointer hover:bg-white/10 p-1 rounded transition-colors relative"
        >
          <Bell size={14} />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
            <span className="opacity-60 text-[10px] tracking-wider uppercase">{theme}</span>
        </div>
        
        {isOnline ? <Wifi size={14} className="hidden sm:block" /> : <WifiOff size={14} className="text-red-400 hidden sm:block" />}
        
        <div className="hidden sm:flex items-center gap-1 cursor-default" title={`${(batteryLevel * 100).toFixed(0)}%`}>
            {isCharging ? <BatteryCharging size={14} className="text-green-400" /> : <Battery size={14} />}
            <span className="text-[10px] opacity-70">{(batteryLevel * 100).toFixed(0)}%</span>
        </div>
        
        <div className="flex items-center gap-2 ml-2 cursor-default min-w-[120px] justify-end">
          <span className="hidden sm:inline">{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};