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
 * @file fsStore.ts
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FileNode, FileType } from './types';

interface FileSystemState {
    files: Record<string, FileNode>;
    rootId: string;
    trashId: string;
    
    // Actions
    createFile: (parentId: string, name: string, type: FileType, content?: string) => string;
    createFolder: (parentId: string, name: string) => string;
    deleteNode: (id: string) => void; // Moves to trash
    restoreNode: (id: string) => void; // Restores from trash
    permanentDelete: (id: string) => void; // Actually deletes
    emptyTrash: () => void;
    moveNode: (id: string, newParentId: string) => void;
    renameNode: (id: string, newName: string) => void;
    updateFileContent: (id: string, content: string) => void;
    getContents: (folderId: string) => FileNode[];
    getPath: (id: string) => string;
}

const INITIAL_ROOT_ID = 'root';
const INITIAL_TRASH_ID = 'trash';

const INITIAL_FILES: Record<string, FileNode> = {
    'root': { id: 'root', parentId: null, name: 'Root', type: 'folder', children: ['home', 'trash'], createdAt: new Date() },
    'trash': { id: 'trash', parentId: 'root', name: 'Trash', type: 'folder', children: [], createdAt: new Date() },
    'home': { id: 'home', parentId: 'root', name: 'home', type: 'folder', children: ['user'], createdAt: new Date() },
    'user': { id: 'user', parentId: 'home', name: 'guest', type: 'folder', children: ['docs', 'pics', 'code', 'welcome'], createdAt: new Date() },
    'docs': { id: 'docs', parentId: 'user', name: 'Documents', type: 'folder', children: [], createdAt: new Date() },
    'pics': { id: 'pics', parentId: 'user', name: 'Pictures', type: 'folder', children: [], createdAt: new Date() },
    'code': { id: 'code', parentId: 'user', name: 'Projects', type: 'folder', children: ['project1'], createdAt: new Date() },
    'project1': { id: 'project1', parentId: 'code', name: 'main.tsx', type: 'code', content: "console.log('Hello World');", createdAt: new Date() },
    'welcome': { id: 'welcome', parentId: 'user', name: 'README.md', type: 'text', content: "# Welcome to AshrafOS\n\nThis is a fully persistent file system.\nTry using the Terminal!", createdAt: new Date() },
};

export const useFileSystem = create<FileSystemState>()(
    persist(
        (set, get) => ({
            files: INITIAL_FILES,
            rootId: INITIAL_ROOT_ID,
            trashId: INITIAL_TRASH_ID,

            createFile: (parentId, name, type, content = '') => {
                const id = Math.random().toString(36).substr(2, 9);
                const newNode: FileNode = {
                    id,
                    parentId,
                    name,
                    type,
                    content,
                    createdAt: new Date()
                };

                set(state => {
                    const parent = state.files[parentId];
                    if (!parent || parent.type !== 'folder') return state;

                    return {
                        files: {
                            ...state.files,
                            [id]: newNode,
                            [parentId]: {
                                ...parent,
                                children: [...(parent.children || []), id]
                            }
                        }
                    };
                });
                return id;
            },

            createFolder: (parentId, name) => {
                const id = Math.random().toString(36).substr(2, 9);
                const newNode: FileNode = {
                    id,
                    parentId,
                    name,
                    type: 'folder',
                    children: [],
                    createdAt: new Date()
                };

                set(state => {
                    const parent = state.files[parentId];
                    if (!parent || parent.type !== 'folder') return state;

                    return {
                        files: {
                            ...state.files,
                            [id]: newNode,
                            [parentId]: {
                                ...parent,
                                children: [...(parent.children || []), id]
                            }
                        }
                    };
                });
                return id;
            },

            deleteNode: (id) => {
                set(state => {
                    const node = state.files[id];
                    if (!node || !node.parentId) return state; 
                    if (id === 'root' || id === 'trash' || id === 'home' || id === 'user') return state; // Protected

                    // If already in trash, delete permanently
                    if (node.parentId === 'trash') {
                        const trash = state.files['trash'];
                        const newFiles = { ...state.files };
                        delete newFiles[id];
                        return {
                            files: {
                                ...newFiles,
                                'trash': {
                                    ...trash,
                                    children: trash.children?.filter(childId => childId !== id)
                                }
                            }
                        };
                    }

                    // Move to Trash
                    const oldParent = state.files[node.parentId];
                    const trash = state.files['trash'];
                    
                    return {
                        files: {
                            ...state.files,
                            [node.parentId]: {
                                ...oldParent,
                                children: oldParent.children?.filter(childId => childId !== id)
                            },
                            'trash': {
                                ...trash,
                                children: [...(trash.children || []), id]
                            },
                            [id]: {
                                ...node,
                                parentId: 'trash'
                            }
                        }
                    };
                });
            },

            restoreNode: (id) => {
                 set(state => {
                    const node = state.files[id];
                    if (!node || node.parentId !== 'trash') return state;

                    // Restore to user home by default if original parent lost, or hardcode to 'docs' for safety
                    const targetParentId = 'docs'; 
                    const targetParent = state.files[targetParentId];
                    const trash = state.files['trash'];

                    // Ensure target parent exists, fallback to 'user' if 'docs' missing
                    const finalParentId = targetParent ? targetParentId : 'user';
                    const finalParent = state.files[finalParentId];

                    return {
                        files: {
                            ...state.files,
                            'trash': {
                                ...trash,
                                children: trash.children?.filter(cid => cid !== id)
                            },
                            [finalParentId]: {
                                ...finalParent,
                                children: [...(finalParent.children || []), id]
                            },
                            [id]: {
                                ...node,
                                parentId: finalParentId
                            }
                        }
                    };
                 });
            },

            permanentDelete: (id) => {
                 set(state => {
                    const node = state.files[id];
                    if (!node || !node.parentId) return state;

                    const parent = state.files[node.parentId];
                    const newFiles = { ...state.files };
                    delete newFiles[id];

                    return {
                        files: {
                            ...newFiles,
                            [parent.id]: {
                                ...parent,
                                children: parent.children?.filter(childId => childId !== id)
                            }
                        }
                    };
                });
            },

            emptyTrash: () => {
                set(state => {
                    const trash = state.files['trash'];
                    if (!trash.children) return state;
                    
                    const newFiles = { ...state.files };
                    trash.children.forEach(childId => {
                        delete newFiles[childId];
                    });

                    return {
                        files: {
                            ...newFiles,
                            'trash': {
                                ...trash,
                                children: []
                            }
                        }
                    };
                });
            },

            moveNode: (id, newParentId) => {
                set(state => {
                     const node = state.files[id];
                     const oldParent = state.files[node.parentId!];
                     const newParent = state.files[newParentId];
                     
                     if(!node || !oldParent || !newParent) return state;

                     return {
                         files: {
                             ...state.files,
                             [oldParent.id]: { ...oldParent, children: oldParent.children?.filter(c => c !== id) },
                             [newParent.id]: { ...newParent, children: [...(newParent.children || []), id] },
                             [id]: { ...node, parentId: newParentId }
                         }
                     }
                });
            },

            renameNode: (id, newName) => {
                set(state => ({
                    files: {
                        ...state.files,
                        [id]: { ...state.files[id], name: newName }
                    }
                }));
            },

            updateFileContent: (id, content) => {
                set(state => ({
                    files: {
                        ...state.files,
                        [id]: { ...state.files[id], content }
                    }
                }));
            },

            getContents: (folderId) => {
                const state = get();
                const folder = state.files[folderId];
                if (!folder || !folder.children) return [];
                return folder.children.map(id => state.files[id]).filter(Boolean);
            },

            getPath: (id) => {
                const state = get();
                let current = state.files[id];
                let path = '';
                
                while (current && current.parentId) {
                    path = '/' + current.name + path;
                    current = state.files[current.parentId];
                }
                return path || '/';
            }
        }),
        {
            name: 'eigenfolio-filesystem',
        }
    )
);