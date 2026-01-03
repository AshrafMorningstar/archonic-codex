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
 * @file Prism.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Archonic Codex - The Universal Knowledge Engine
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000",
    "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=1000",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000",
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1000"
];

export const Prism: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="h-full bg-[#121212] overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {IMAGES.map((src, i) => (
                    <motion.div 
                        key={i}
                        layoutId={`img-${i}`}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                        onClick={() => setSelectedImage(src)}
                    >
                        <img src={src} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white drop-shadow-lg" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
                            <X size={24} />
                        </button>
                        <motion.img 
                            src={selectedImage} 
                            className="max-w-full max-h-full rounded-lg shadow-2xl"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};