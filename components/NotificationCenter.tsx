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
 * @file NotificationCenter.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { X, Bell, CheckCheck } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationCenter: React.FC = () => {
  const isOpen = useStore((state) => state.isNotificationCenterOpen);
  const notifications = useStore((state) => state.notifications);
  const markRead = useStore((state) => state.markNotificationRead);
  const clearAll = useStore((state) => state.clearNotifications);
  const close = useStore((state) => state.toggleNotificationCenter);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-sm"
                    onClick={close}
                />
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-8 bottom-0 w-80 sm:w-96 glass border-l border-white/10 z-[50] flex flex-col shadow-2xl"
                >
                    <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Bell size={16} /> Notifications
                        </h3>
                        <div className="flex gap-2">
                            {notifications.length > 0 && (
                                <button onClick={clearAll} className="text-xs text-gray-400 hover:text-white transition-colors">Clear All</button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {notifications.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                                <Bell size={48} className="mb-4" />
                                <p>No new notifications</p>
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div 
                                    key={n.id} 
                                    onClick={() => markRead(n.id)}
                                    className={`relative p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10 cursor-pointer ${!n.read ? 'border-l-4 border-l-blue-500' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-white">{n.title}</h4>
                                        <span className="text-[10px] text-gray-500">{formatTime(n.timestamp)}</span>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed">{n.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
  );
};