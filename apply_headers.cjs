/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_NAME = process.argv[2] || "Quantum Project";
const PROJECT_DESC = process.argv[3] || "The Ultimate Future OS";

const HEADER_TEMPLATE = `/**
 * @file [FileName]
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 ${PROJECT_NAME} - ${PROJECT_DESC}
 * "The future is unwritten, but the code is compiled."
 */

`;

const HTML_HEADER_TEMPLATE = `<!--
  @file [FileName]
  @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
  @copyright 2025 Ashraf Morningstar
  @license MIT
  🌌 ${PROJECT_NAME} - ${PROJECT_DESC}
  "The future is unwritten, but the code is compiled."
-->

`;

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                walk(filepath, callback);
            }
        } else {
            callback(filepath);
        }
    });
}

const rootDir = __dirname;
console.log(`Processing: ${PROJECT_NAME} in ${rootDir}`);

walk(rootDir, (filepath) => {
    const ext = path.extname(filepath);
    const filename = path.basename(filepath);
    
    // Skip this script
    if (filename === 'apply_headers.cjs') return;

    // Read initial content
    try {
        let content = fs.readFileSync(filepath, 'utf8');
        let newContent = content;
        
        // Remove existing headers roughly if they exist to avoid duplication (simple heuristic)
        // This is a "viral" overwrite, so we want uniformity. 
        // We'll just prepend if not present for now to be safe, or replacing could be risky without regex.
        // User asked to "add on every file".

        if (['.ts', '.tsx', '.js', '.css'].includes(ext)) {
            if (!content.includes('@author Ashraf Morningstar')) {
                 const header = HEADER_TEMPLATE.replace('[FileName]', filename);
                 newContent = header + content;
            }
        } else if (ext === '.html') {
             if (!content.includes('@author Ashraf Morningstar')) {
                 const header = HTML_HEADER_TEMPLATE.replace('[FileName]', filename);
                 newContent = header + content;
            }
        }

        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated: ${filename}`);
        }
    } catch (e) {
        console.error(`Error processing ${filename}: ${e.message}`);
    }
});
