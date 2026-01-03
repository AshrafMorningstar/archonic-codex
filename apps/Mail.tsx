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
 * @file Mail.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Mail as MailIcon, Star, Trash, Send, Search, Edit3, Inbox, Archive, X } from 'lucide-react';

const INITIAL_EMAILS = [
  { id: 1, from: "GitHub", subject: "[GitHub] Security alert for your repository", time: "10:23 AM", body: "We noticed a new login to your account..." },
  { id: 2, from: "Vercel", subject: "Deployment Successful", time: "Yesterday", body: "ashraf-os has been successfully deployed to production." },
  { id: 3, from: "Dribbble", subject: "Top designs of the week", time: "Yesterday", body: "Check out the latest trending designs..." },
  { id: 4, from: "Product Hunt", subject: "AshrafOS is trending!", time: "2 days ago", body: "Congratulations! Your product is #1 today." }
];

export const Mail: React.FC = () => {
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', message: '' });

  const handleSend = () => {
    // In a real app, this would send an email
    setIsComposing(false);
    setComposeData({ to: '', subject: '', message: '' });
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      setEmails(prev => prev.filter(email => email.id !== id));
      if (selectedEmail === id) setSelectedEmail(null);
  }

  return (
    <div className="flex h-full bg-[#1e1e24] text-gray-200 relative">
      {/* Sidebar */}
      <div className="w-16 sm:w-60 bg-[#151518] border-r border-white/5 flex flex-col">
        <div className="p-4 flex items-center justify-center sm:justify-start gap-3 border-b border-white/5">
            <button 
                onClick={() => setIsComposing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium w-full justify-center transition-colors"
            >
                <Edit3 size={16} />
                <span className="hidden sm:block">Compose</span>
            </button>
        </div>
        <div className="p-2 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg cursor-pointer">
                <Inbox size={18} />
                <span className="hidden sm:block font-medium">Inbox</span>
                <span className="hidden sm:block ml-auto text-xs opacity-70">{emails.length}</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer">
                <Send size={18} />
                <span className="hidden sm:block font-medium">Sent</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer">
                <Archive size={18} />
                <span className="hidden sm:block font-medium">Archive</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer">
                <Trash size={18} />
                <span className="hidden sm:block font-medium">Trash</span>
            </div>
        </div>
      </div>

      {/* Email List */}
      <div className={`${selectedEmail ? 'hidden md:block' : 'block'} w-full md:w-80 border-r border-white/5 bg-[#1a1a1e] overflow-y-auto`}>
        <div className="p-4 border-b border-white/5 sticky top-0 bg-[#1a1a1e] z-10">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Search" className="w-full bg-[#0f0f12] rounded-lg pl-9 pr-4 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500/50" />
            </div>
        </div>
        {emails.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">No emails found</div>
        ) : (
            emails.map(email => (
                <div 
                    key={email.id}
                    onClick={() => setSelectedEmail(email.id)}
                    className={`group p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${selectedEmail === email.id ? 'bg-blue-600/10 border-l-2 border-l-blue-500' : ''}`}
                >
                    <div className="flex justify-between items-start mb-1">
                        <span className={`font-bold text-sm ${selectedEmail === email.id ? 'text-blue-400' : 'text-white'}`}>{email.from}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{email.time}</span>
                            <button 
                                onClick={(e) => handleDelete(e, email.id)}
                                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity"
                            >
                                <Trash size={12} />
                            </button>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-gray-300 mb-1 truncate">{email.subject}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{email.body}</div>
                </div>
            ))
        )}
      </div>

      {/* Reading Pane */}
      <div className={`${selectedEmail ? 'block' : 'hidden md:block'} flex-1 bg-[#1e1e24] flex flex-col`}>
        {selectedEmail ? (
            <>
                <div className="p-6 border-b border-white/5 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">{emails.find(e => e.id === selectedEmail)?.subject}</h2>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                                {emails.find(e => e.id === selectedEmail)?.from[0]}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">{emails.find(e => e.id === selectedEmail)?.from}</div>
                                <div className="text-xs text-gray-500">To: Me</div>
                            </div>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">{emails.find(e => e.id === selectedEmail)?.time}</span>
                </div>
                <div className="p-6 text-gray-300 leading-relaxed text-sm">
                    {emails.find(e => e.id === selectedEmail)?.body}
                    <br /><br />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <MailIcon size={48} className="mb-4 opacity-50" />
                <p>Select an email to read</p>
            </div>
        )}
      </div>

      {/* Compose Modal */}
      {isComposing && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1a1a1e] w-full max-w-lg rounded-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                <div className="p-3 bg-[#27272a] border-b border-white/5 flex justify-between items-center">
                    <span className="font-bold text-sm">New Message</span>
                    <button onClick={() => setIsComposing(false)} className="hover:text-red-400"><X size={16} /></button>
                </div>
                <div className="p-4 space-y-3">
                    <input 
                        type="text" 
                        placeholder="To:" 
                        className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" 
                        value={composeData.to}
                        onChange={e => setComposeData({...composeData, to: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Subject:" 
                        className="w-full bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" 
                        value={composeData.subject}
                        onChange={e => setComposeData({...composeData, subject: e.target.value})}
                    />
                    <textarea 
                        placeholder="Message..." 
                        className="w-full h-40 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 resize-none" 
                        value={composeData.message}
                        onChange={e => setComposeData({...composeData, message: e.target.value})}
                    />
                </div>
                <div className="p-3 border-t border-white/5 flex justify-end">
                    <button 
                        onClick={handleSend}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};