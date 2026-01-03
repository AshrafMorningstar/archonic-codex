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
 * @file CalendarApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Plus } from 'lucide-react';

export const CalendarApp: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for days before start
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-transparent border-r border-b border-white/5" />);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
            days.push(
                <div key={i} className={`h-24 p-2 border-r border-b border-white/5 hover:bg-white/5 transition-colors group relative ${isToday ? 'bg-blue-900/20' : ''}`}>
                    <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${isToday ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' : 'text-gray-300'}`}>
                        {i}
                    </span>
                    {i === 15 && (
                        <div className="mt-2 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30 truncate">
                            Project Launch
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="h-full flex flex-col bg-[#1a1a1e] text-gray-200">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#202024]">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                    <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1">
                        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={20} /></button>
                        <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-sm font-medium hover:bg-white/10 rounded">Today</button>
                        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded"><ChevronRight size={20} /></button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <button className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-600/20">
                        <Plus size={20} />
                     </button>
                     <div className="flex items-center gap-2 text-gray-400">
                        <CalIcon size={18} />
                        <Clock size={18} />
                     </div>
                </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-white/10 bg-[#1e1e22]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-7 auto-rows-fr">
                {renderCalendar()}
            </div>
        </div>
    );
};