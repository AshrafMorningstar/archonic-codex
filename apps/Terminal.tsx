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
 * @file Terminal.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { useFileSystem } from '../fsStore';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['AshrafOS Kernel v4.2.0', 'Connected to Quantum VFS', 'Type "help" for commands.']);
  const [input, setInput] = useState('');
  const [currentPathId, setCurrentPathId] = useState('user');
  
  const endRef = useRef<HTMLDivElement>(null);
  
  const { files, getContents, getPath, createFolder, createFile, deleteNode } = useFileSystem();
  const openWindow = useStore((state) => state.openWindow);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const currentPathStr = getPath(currentPathId);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const target = args[1];

    let response = '';

    switch (command) {
      case 'help':
        response = 'Commands: ls, cd <dir>, mkdir <name>, touch <name>, rm <name>, pwd, open <app>, clear';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'pwd':
        response = currentPathStr;
        break;
      case 'ls':
        const contents = getContents(currentPathId);
        response = contents.map(f => f.name + (f.type === 'folder' ? '/' : '')).join('  ');
        if (response === '') response = '(empty)';
        break;
      case 'mkdir':
        if (target) {
            createFolder(currentPathId, target);
            response = `Created directory: ${target}`;
        } else response = 'Usage: mkdir <name>';
        break;
      case 'touch':
        if (target) {
            createFile(currentPathId, target, 'text', '');
            response = `Created file: ${target}`;
        } else response = 'Usage: touch <name>';
        break;
      case 'rm':
        if (target) {
            const item = getContents(currentPathId).find(f => f.name === target);
            if (item) {
                deleteNode(item.id);
                response = `Deleted: ${target}`;
            } else response = `File not found: ${target}`;
        } else response = 'Usage: rm <name>';
        break;
      case 'cd':
        if (!target || target === '~') {
            setCurrentPathId('user');
        } else if (target === '..') {
            const parent = files[currentPathId].parentId;
            if (parent) setCurrentPathId(parent);
        } else {
            const item = getContents(currentPathId).find(f => f.name === target && f.type === 'folder');
            if (item) setCurrentPathId(item.id);
            else response = `Directory not found: ${target}`;
        }
        break;
      case 'open':
         if(target) openWindow(target); // Fallback to window opening for apps
         else response = 'Usage: open <appid>';
         break;
      case '':
        break;
      default:
        response = `Command not found: ${command}`;
    }

    if (cmd) {
        setHistory(prev => [...prev, `guest@ashraf-os:${currentPathStr}$ ${cmd}`, response].filter(Boolean));
    } else {
        setHistory(prev => [...prev, `guest@ashraf-os:${currentPathStr}$ `]);
    }
    setInput('');
  };

  return (
    <div className="h-full bg-[#1a1b26] text-[#a9b1d6] font-mono p-4 overflow-y-auto text-sm relative" onClick={() => document.getElementById('term-in')?.focus()}>
        {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
        ))}
        <div className="flex items-center gap-2">
            <span className="text-[#7aa2f7]">guest@ashraf-os:{currentPathStr}$</span>
            <input
                id="term-in"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
                className="bg-transparent outline-none flex-1 text-[#c0caf5]"
                autoFocus
                autoComplete="off"
            />
        </div>
        <div ref={endRef} />
    </div>
  );
};