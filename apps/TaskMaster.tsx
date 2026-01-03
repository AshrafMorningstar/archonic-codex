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
 * @file TaskMaster.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Plus, MoreHorizontal, X } from 'lucide-react';

interface Task {
    id: string;
    content: string;
}

interface Column {
    id: string;
    title: string;
    tasks: Task[];
    color: string;
}

export const TaskMaster: React.FC = () => {
    const [columns, setColumns] = useState<Column[]>([
        { id: 'todo', title: 'To Do', tasks: [{ id: '1', content: 'Design System' }, { id: '2', content: 'User Research' }], color: 'bg-red-500' },
        { id: 'progress', title: 'In Progress', tasks: [{ id: '3', content: 'Frontend API' }], color: 'bg-yellow-500' },
        { id: 'done', title: 'Done', tasks: [{ id: '4', content: 'Project Setup' }], color: 'bg-green-500' }
    ]);

    const addTask = (colId: string) => {
        const text = prompt("Enter task:");
        if (!text) return;
        
        setColumns(cols => cols.map(col => {
            if (col.id === colId) {
                return { ...col, tasks: [...col.tasks, { id: Date.now().toString(), content: text }] };
            }
            return col;
        }));
    };

    const deleteTask = (colId: string, taskId: string) => {
        setColumns(cols => cols.map(col => {
            if (col.id === colId) {
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            return col;
        }));
    };

    const moveTask = (fromColId: string, toColId: string, taskId: string) => {
        if (fromColId === toColId) return;
        
        let taskToMove: Task | undefined;
        
        // Find and remove
        const newCols = columns.map(col => {
            if (col.id === fromColId) {
                taskToMove = col.tasks.find(t => t.id === taskId);
                return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
            }
            return col;
        });
        
        // Add to new
        if (taskToMove) {
             setColumns(newCols.map(col => {
                 if (col.id === toColId) {
                     return { ...col, tasks: [...col.tasks, taskToMove!] };
                 }
                 return col;
             }));
        }
    };

    return (
        <div className="h-full bg-[#0a0a0c] text-white flex flex-col">
            <div className="h-14 border-b border-white/10 flex items-center px-6 bg-[#151518]">
                <h1 className="font-bold text-xl flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-xs">TM</span>
                    TaskMaster
                </h1>
            </div>
            
            <div className="flex-1 overflow-x-auto p-6 flex gap-6">
                {columns.map(col => (
                    <div key={col.id} className="w-72 shrink-0 flex flex-col bg-[#1a1a1e] rounded-xl border border-white/5 max-h-full">
                        <div className="p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2 font-bold">
                                <div className={`w-3 h-3 rounded-full ${col.color}`} />
                                {col.title}
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                            </div>
                            <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-3 space-y-3">
                            {col.tasks.map(task => (
                                <div key={task.id} className="bg-[#25252a] p-3 rounded-lg border border-white/5 shadow-sm group hover:border-blue-500/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-sm">{task.content}</p>
                                        <button onClick={() => deleteTask(col.id, task.id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400"><X size={14} /></button>
                                    </div>
                                    <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        {columns.filter(c => c.id !== col.id).map(target => (
                                            <button 
                                                key={target.id}
                                                onClick={() => moveTask(col.id, target.id, task.id)}
                                                className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-white/10 text-gray-400"
                                            >
                                                Move to {target.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-3">
                            <button 
                                onClick={() => addTask(col.id)}
                                className="w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:bg-white/5 rounded-lg transition-colors text-sm font-medium"
                            >
                                <Plus size={16} /> Add Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};