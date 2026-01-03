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
 * @file Sheet.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Grid, Save } from 'lucide-react';

export const Sheet: React.FC = () => {
    const ROWS = 20;
    const COLS = 10;
    const [data, setData] = useState<Record<string, string>>({});

    const getCellId = (r: number, c: number) => `${String.fromCharCode(65 + c)}${r + 1}`;

    const handleChange = (r: number, c: number, value: string) => {
        setData(prev => ({ ...prev, [getCellId(r, c)]: value }));
    };

    return (
        <div className="h-full flex flex-col bg-white text-black">
            <div className="h-10 border-b flex items-center px-4 gap-4 bg-gray-50">
                <div className="flex items-center gap-2 text-green-600 font-bold">
                    <Grid size={18} /> QuantumGrid
                </div>
                <button className="flex items-center gap-1 text-xs bg-white border px-2 py-1 rounded hover:bg-gray-100">
                    <Save size={12} /> Save
                </button>
            </div>
            
            <div className="flex-1 overflow-auto">
                <div className="inline-block min-w-full">
                    {/* Header Row */}
                    <div className="flex border-b bg-gray-100 sticky top-0 z-10">
                        <div className="w-10 flex-shrink-0 border-r bg-gray-200"></div>
                        {Array.from({ length: COLS }).map((_, c) => (
                            <div key={c} className="w-24 flex-shrink-0 border-r text-center text-xs font-bold py-1 text-gray-600">
                                {String.fromCharCode(65 + c)}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {Array.from({ length: ROWS }).map((_, r) => (
                        <div key={r} className="flex border-b">
                            <div className="w-10 flex-shrink-0 border-r bg-gray-100 text-center text-xs py-1 text-gray-500 font-mono">
                                {r + 1}
                            </div>
                            {Array.from({ length: COLS }).map((_, c) => {
                                const id = getCellId(r, c);
                                return (
                                    <div key={c} className="w-24 flex-shrink-0 border-r relative">
                                        <input 
                                            className="w-full h-full px-1 text-sm outline-none border-2 border-transparent focus:border-blue-500 focus:z-10 absolute inset-0"
                                            value={data[id] || ''}
                                            onChange={(e) => handleChange(r, c, e.target.value)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};