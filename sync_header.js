const fs = require('fs');
const path = require('path');

const BASE_DIR = 'c:/Users/ibrar/Downloads/Ibrar Zahoor/Ibrar-Zahoor';
const INDEX_FILE = path.join(BASE_DIR, 'index.html');
const BASE_URL = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor/';

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function run() {
    console.log('Reading index.html...');
    const indexContent = fs.readFileSync(INDEX_FILE, 'utf8');

    // Extract header and mobile menu from index.html
    const headerMatch = indexContent.match(/<header id="header">[\s\S]*?<\/header>/i);
    const mobileMenuMatch = indexContent.match(/<div class="mobile-menu" id="mobileMenu">[\s\S]*?<div class="mobile-menu-nav">[\s\S]*?<\/div>\s*<\/div>/i);

    if (!headerMatch || !mobileMenuMatch) {
        console.error('Could not find header or mobile menu in index.html!');
        return;
    }

    let headerStr = headerMatch[0];
    let mobileMenuStr = mobileMenuMatch[0];

    console.log('Updating links in header to use absolute URLs...');
    
    // Helper to replace links
    const replaceLinks = (str) => {
        // Replace anchor links
        str = str.replace(/href="#([^"]*)"/g, `href="${BASE_URL}#$1"`);
        // Replace relative html links
        str = str.replace(/href="([a-zA-Z0-9-]+\.html)"/g, `href="${BASE_URL}$1"`);
        // Replace Blogs/ link
        str = str.replace(/href="Blogs\/"/g, `href="${BASE_URL}Blogs/"`);
        
        // Add Tips link
        if (str.includes('<li><a')) {
            str = str.replace(/<li><a href="[^"]*Blogs\/"[^>]*>Blog<\/a><\/li>/, `<li><a href="${BASE_URL}Blogs/" target="_blank" rel="noopener">Blog</a></li>\n                <li><a href="${BASE_URL}Tips/" target="_blank" rel="noopener">Tips</a></li>`);
        }
        if (str.includes('<div class="mobile-menu-nav">')) {
            str = str.replace(/<a href="[^"]*Blogs\/"[^>]*>Blog<\/a>/, `<a href="${BASE_URL}Blogs/" target="_blank" rel="noopener">Blog</a>\n            <a href="${BASE_URL}Tips/" target="_blank" rel="noopener">Tips</a>`);
        }
        return str;
    };

    headerStr = replaceLinks(headerStr);
    mobileMenuStr = replaceLinks(mobileMenuStr);

    const allFiles = getFiles(BASE_DIR);
    console.log(`Found ${allFiles.length} HTML files. Updating...`);

    let updatedCount = 0;

    for (const file of allFiles) {
        if (file === INDEX_FILE) continue; // Skip index.html for now
        
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Replace the FIRST <header> tag found in the file
        const firstHeaderRegex = /<header[^>]*>[\s\S]*?<\/header>/i;
        const fileHeaderMatch = content.match(firstHeaderRegex);

        if (fileHeaderMatch) {
            content = content.replace(fileHeaderMatch[0], headerStr + '\n\n    ' + mobileMenuStr);
            modified = true;
        }

        if (modified) {
            // Also, some files might already have the old mobile menu, remove it to avoid duplicates
            // We just inserted the new mobileMenuStr right after the new headerStr
            // Let's remove any EXISTING mobile menu blocks that are NOT the one we just inserted
            // Actually, to be safe, let's just do a clean replace.
            
            // Wait, if we just inserted it, and there was an old one further down, we need to remove the old one.
            // Let's search for old mobile menus and remove them.
            const oldMobileMenuRegex = /<div class="mobile-menu"[^>]*>[\s\S]*?<div class="mobile-menu-nav">[\s\S]*?<\/div>\s*<\/div>/gi;
            
            // We inserted `mobileMenuStr`. Let's remove all mobile menus, then replace the header again!
            // Better approach:
            let freshContent = fs.readFileSync(file, 'utf8');
            // Remove old mobile menus completely
            freshContent = freshContent.replace(oldMobileMenuRegex, '');
            
            // Replace first header with Header + Mobile Menu
            const match = freshContent.match(firstHeaderRegex);
            if (match) {
                freshContent = freshContent.replace(match[0], headerStr + '\n\n    ' + mobileMenuStr);
                fs.writeFileSync(file, freshContent, 'utf8');
                updatedCount++;
            }
        }
    }

    // Finally, update index.html itself (just the links inside header and mobile menu)
    let indexData = fs.readFileSync(INDEX_FILE, 'utf8');
    indexData = indexData.replace(headerMatch[0], headerStr);
    indexData = indexData.replace(mobileMenuMatch[0], mobileMenuStr);
    fs.writeFileSync(INDEX_FILE, indexData, 'utf8');
    updatedCount++;

    console.log(`Successfully updated header in ${updatedCount} files.`);
}

run();
