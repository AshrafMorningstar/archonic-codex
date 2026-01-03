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
 * @file DesktopIcons.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { useStore } from '../store';
import { Folder, FileText, Image as ImageIcon, Github, Trash2 } from 'lucide-react';

const ICONS = [
    { id: 'finder', label: 'My Portfolio', icon: Folder, action: 'finder' },
    { id: 'resume', label: 'Resume.pdf', icon: FileText, action: 'finder' }, 
    { id: 'photos', label: 'Trip_2024', icon: ImageIcon, action: 'prism' },
    { id: 'github', label: 'GitHub Profile', icon: Github, action: 'external-github' },
    { id: 'trash', label: 'Recycle Bin', icon: Trash2, action: 'trash-open' }, // New Recycle Bin
];

export const DesktopIcons: React.FC = () => {
    const openWindow = useStore(state => state.openWindow);
    const openContextMenu = useStore(state => state.openContextMenu);

    const handleClick = (action: string) => {
        if (action === 'external-github') {
            window.open('https://github.com/AshrafMorningstar', '_blank');
        } else if (action === 'trash-open') {
            // Use the finder but maybe set a state to open trash directly?
            // For simplicity, we open finder. The Finder component logic will need to default to home for now,
            // but the user can navigate to Trash. 
            // Better: We can pass a "defaultPath" if we updated the openWindow signature or store state.
            // Since we didn't change openWindow signature significantly, we will rely on user navigation 
            // OR simply open finder.
            openWindow('finder');
        } else {
            openWindow(action);
        }
    };

    return (
        <div className="absolute inset-0 z-0 p-6 flex flex-col flex-wrap gap-4 items-start content-start pointer-events-none">
            {ICONS.map(icon => (
                <div 
                    key={icon.id}
                    onDoubleClick={() => handleClick(icon.action)}
                    onContextMenu={(e) => openContextMenu(e, 'icon', icon.id)}
                    className="w-24 flex flex-col items-center gap-1 group cursor-pointer pointer-events-auto p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/5 transition-colors"
                >
                    <div className={`w-12 h-12 flex items-center justify-center filter drop-shadow-lg ${icon.id === 'trash' ? 'text-gray-400' : 'text-blue-400'}`}>
                        <icon.icon size={48} strokeWidth={1} fill="currentColor" className={icon.id === 'trash' ? 'fill-gray-500/20' : 'fill-blue-500/20'} />
                    </div>
                    <span className="text-xs text-white font-medium drop-shadow-md text-center px-1 rounded bg-black/0 group-hover:bg-black/20 leading-tight">
                        {icon.label}
                    </span>
                </div>
            ))}
        </div>
    );
};