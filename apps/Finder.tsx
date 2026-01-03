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
 * @file Finder.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { 
    Folder, FileText, Code, User, ChevronRight, HardDrive, 
    ArrowLeft, ArrowUp, FileImage, Music, Trash2, RefreshCcw
} from 'lucide-react';
import { useFileSystem } from '../fsStore';
import { useStore } from '../store';

const FileIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'folder': return <Folder className="text-blue-400" size={48} />;
        case 'image': return <FileImage className="text-purple-400" size={48} />;
        case 'code': return <Code className="text-green-400" size={48} />;
        case 'audio': return <Music className="text-red-400" size={48} />;
        default: return <FileText className="text-gray-400" size={48} />;
    }
}

export const Finder: React.FC = () => {
  const { files, getContents, getPath, createFolder, deleteNode, restoreNode, emptyTrash } = useFileSystem();
  const [currentId, setCurrentId] = useState('user'); // Start at user home
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openWindow = useStore(state => state.openWindow);

  const currentFolder = files[currentId];
  const contents = getContents(currentId);
  const path = getPath(currentId);
  const isTrash = currentId === 'trash';

  const handleNavigate = (id: string, type: string) => {
      if (type === 'folder') {
          setCurrentId(id);
          setSelectedId(null);
      } else {
          // Open file
          if (type === 'code' || type === 'text') openWindow('code-editor');
          if (type === 'image') openWindow('prism');
      }
  };

  const handleUp = () => {
      if (currentFolder.parentId && currentFolder.parentId !== 'root') {
          setCurrentId(currentFolder.parentId);
      } else if (currentFolder.parentId === 'root' && currentId !== 'trash') {
          // Prevent going to actual root, stay in user/trash
      }
  };

  const handleNewFolder = () => {
      if (isTrash) return;
      createFolder(currentId, `New Folder ${contents.length + 1}`);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      deleteNode(id);
  };

  const handleRestore = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      restoreNode(id);
  }

  return (
    <div className="flex h-full text-gray-300 font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-[#1e1e24]/80 backdrop-blur-xl border-r border-white/5 flex flex-col pt-4 pb-4 overflow-y-auto">
        <div className="px-4 mb-4 flex items-center gap-2 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="mb-6">
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Favorites</h3>
          <div className="space-y-0.5 px-2">
            <div onClick={() => setCurrentId('user')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer ${currentId === 'user' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                <User size={16} /> Home
            </div>
            <div onClick={() => setCurrentId('docs')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer ${currentId === 'docs' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                <FileText size={16} /> Documents
            </div>
            <div onClick={() => setCurrentId('code')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer ${currentId === 'code' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                <Code size={16} /> Projects
            </div>
             <div onClick={() => setCurrentId('pics')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer ${currentId === 'pics' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                <FileImage size={16} /> Pictures
            </div>
            <div className="h-px bg-white/5 my-2 mx-3"></div>
            <div onClick={() => setCurrentId('trash')} className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer ${currentId === 'trash' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}>
                <Trash2 size={16} /> Trash
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0f0f12]/40">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 gap-2">
                    <button onClick={handleUp} disabled={!currentFolder.parentId || currentFolder.id === 'user' || currentFolder.id === 'trash'} className="hover:text-white disabled:opacity-30">
                         <ArrowLeft size={18} />
                    </button>
                    <button onClick={handleUp} disabled={!currentFolder.parentId || currentFolder.id === 'user' || currentFolder.id === 'trash'} className="hover:text-white disabled:opacity-30">
                         <ArrowUp size={18} />
                    </button>
                </div>
                <span className="font-semibold text-white tracking-wide text-sm font-mono">{isTrash ? 'Recycle Bin' : path}</span>
            </div>
            <div className="flex items-center gap-2">
                {isTrash ? (
                    <button onClick={emptyTrash} className="text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded flex items-center gap-1">
                        <Trash2 size={12} /> Empty Bin
                    </button>
                ) : (
                    <button onClick={handleNewFolder} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded">
                        + Folder
                    </button>
                )}
            </div>
        </div>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-4" onClick={() => setSelectedId(null)}>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                {contents.map(node => (
                    <div 
                        key={node.id}
                        onDoubleClick={() => handleNavigate(node.id, node.type)}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(node.id); }}
                        className={`relative group flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedId === node.id ? 'bg-blue-600/30' : 'hover:bg-white/5'}`}
                    >
                        <FileIcon type={node.type} />
                        <span className="text-xs text-center break-all">{node.name}</span>
                        
                        {/* Actions Overlay */}
                        {selectedId === node.id && (
                             <div className="absolute top-0 right-0 flex gap-1 p-1">
                                {isTrash ? (
                                    <button onClick={(e) => handleRestore(e, node.id)} className="p-1 bg-green-500 rounded-full hover:scale-110" title="Restore">
                                        <RefreshCcw size={10} className="text-white"/>
                                    </button>
                                ) : null}
                                <button onClick={(e) => handleDelete(e, node.id)} className="p-1 bg-red-500 rounded-full hover:scale-110" title={isTrash ? "Delete Permanently" : "Move to Trash"}>
                                    <Trash2 size={10} className="text-white"/>
                                </button>
                             </div>
                        )}
                    </div>
                ))}
                {contents.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center text-gray-500 mt-20">
                        <Folder size={48} className="mb-2 opacity-20" />
                        <p>{isTrash ? 'Trash is empty' : 'Folder is empty'}</p>
                    </div>
                )}
            </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 border-t border-white/5 flex items-center px-4 text-xs text-gray-500 bg-[#1e1e24]/50 justify-between">
            <span>{contents.length} items</span>
            <span>{currentFolder.id}</span>
        </div>
      </div>
    </div>
  );
};