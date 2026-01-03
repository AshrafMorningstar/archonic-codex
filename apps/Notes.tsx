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
 * @file Notes.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, FileText, Check } from 'lucide-react';

interface Note {
    id: number;
    title: string;
    content: string;
}

export const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNote, setActiveNote] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('ashrafos-notes');
        if (savedNotes) {
            try {
                const parsed = JSON.parse(savedNotes);
                setNotes(parsed);
                if (parsed.length > 0) setActiveNote(parsed[0].id);
            } catch (e) {
                console.error("Failed to load notes", e);
            }
        } else {
            // Default notes
            const defaults = [
                { id: 1, title: 'Project Ideas', content: '1. AI Nexus\n2. Quantum Grid\n3. Neural Interface' },
                { id: 2, title: 'Shopping List', content: '- Coffee\n- RAM\n- GPU Coolant' }
            ];
            setNotes(defaults);
            setActiveNote(1);
        }
    }, []);

    // Save to local storage whenever notes change
    useEffect(() => {
        if (notes.length > 0) {
            localStorage.setItem('ashrafos-notes', JSON.stringify(notes));
        }
    }, [notes]);

    const activeNoteData = notes.find(n => n.id === activeNote);

    const updateNote = (field: string, value: string) => {
        setNotes(prev => prev.map(n => n.id === activeNote ? { ...n, [field]: value } : n));
        setSaved(false);
        // Debounce save indicator
        setTimeout(() => setSaved(true), 1000);
    };

    const addNote = () => {
        const newNote = { id: Date.now(), title: 'New Note', content: '' };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
    };

    const deleteNote = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
        if (activeNote === id) {
            setActiveNote(newNotes.length > 0 ? newNotes[0].id : null);
        }
    };

    return (
        <div className="h-full flex bg-[#1c1c1e] text-gray-200">
            {/* Sidebar */}
            <div className="w-64 bg-[#252528] border-r border-white/5 flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="font-bold text-lg">Notes</span>
                    <button onClick={addNote} className="text-yellow-500 hover:text-yellow-400 p-1 hover:bg-white/10 rounded"><Plus size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {notes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => setActiveNote(note.id)}
                            className={`group p-3 rounded-lg cursor-pointer transition-colors relative ${activeNote === note.id ? 'bg-yellow-500/20 text-yellow-500' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            <div className="font-bold text-sm truncate pr-6">{note.title || 'Untitled'}</div>
                            <div className="text-xs opacity-60 truncate">{note.content || 'No content'}</div>
                            <button 
                                onClick={(e) => deleteNote(e, note.id)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {activeNoteData ? (
                    <>
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                {saved ? <Check size={12} className="text-green-500" /> : <Save size={12} className="text-gray-500" />}
                                {saved ? 'Saved' : 'Saving...'}
                            </span>
                            <div className="text-xs text-gray-600 font-mono">
                                {new Date(activeNoteData.id).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto">
                            <input 
                                type="text" 
                                value={activeNoteData.title}
                                onChange={(e) => updateNote('title', e.target.value)}
                                className="w-full bg-transparent text-3xl font-bold text-white mb-6 outline-none placeholder-gray-600 border-b border-transparent focus:border-white/10 pb-2 transition-colors"
                                placeholder="Title"
                            />
                            <textarea 
                                value={activeNoteData.content}
                                onChange={(e) => updateNote('content', e.target.value)}
                                className="w-full h-[calc(100%-6rem)] bg-transparent text-lg text-gray-300 outline-none resize-none placeholder-gray-600 leading-relaxed font-sans"
                                placeholder="Start typing..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p>Select a note or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};