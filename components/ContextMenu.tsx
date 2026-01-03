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
 * @file ContextMenu.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { RefreshCw, Layout, Image, Settings, Trash2, Maximize2, Minimize2, X } from 'lucide-react';

export const ContextMenu: React.FC = () => {
    const contextMenu = useStore(state => state.contextMenu);
    const closeMenu = useStore(state => state.closeContextMenu);
    const openWindow = useStore(state => state.openWindow);
    const closeWindow = useStore(state => state.closeWindow);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [closeMenu]);

    if (!contextMenu.isOpen) return null;

    const MenuLine = ({ icon: Icon, label, onClick, danger }: any) => (
        <div 
            onClick={() => { onClick?.(); closeMenu(); }}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                danger ? 'text-red-400 hover:bg-red-500/20' : 'text-gray-200 hover:bg-blue-600'
            }`}
        >
            <Icon size={14} />
            <span>{label}</span>
        </div>
    );

    return (
        <div 
            ref={menuRef}
            className="fixed z-[10000] min-w-[180px] bg-[#1a1a1e]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl p-1.5 flex flex-col gap-0.5"
            style={{ top: contextMenu.y, left: contextMenu.x }}
        >
            {contextMenu.type === 'desktop' && (
                <>
                    <MenuLine icon={RefreshCw} label="Refresh" onClick={() => window.location.reload()} />
                    <MenuLine icon={Layout} label="Sort Icons" />
                    <div className="h-px bg-white/10 my-1" />
                    <MenuLine icon={Image} label="Change Wallpaper" onClick={() => openWindow('settings')} />
                    <MenuLine icon={Settings} label="Settings" onClick={() => openWindow('settings')} />
                </>
            )}
            
            {contextMenu.type === 'window' && contextMenu.targetId && (
                <>
                    <MenuLine icon={Maximize2} label="Maximize" />
                    <MenuLine icon={Minimize2} label="Minimize" />
                    <div className="h-px bg-white/10 my-1" />
                    <MenuLine icon={X} label="Close" danger onClick={() => closeWindow(contextMenu.targetId!)} />
                </>
            )}

            {contextMenu.type === 'icon' && (
                 <>
                    <MenuLine icon={Maximize2} label="Open" />
                    <div className="h-px bg-white/10 my-1" />
                    <MenuLine icon={Trash2} label="Move to Trash" danger />
                </>
            )}
        </div>
    );
};