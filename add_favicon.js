const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor';
const FAVICON_TAG = `<link rel="icon" type="image/svg+xml" href="${BASE_URL}/favicon.svg">`;

function replaceFaviconInFile(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the existing inline SVG favicon or any previous favicon link
    const faviconRegex = /<link\s+rel="icon"\s+href="data:image[^>]+>/gi;
    const standardFaviconRegex = /<link\s+rel="icon"\s+href="[^"]+"\s*\/?>/gi;
    
    let updated = false;
    
    if (faviconRegex.test(html)) {
      html = html.replace(faviconRegex, FAVICON_TAG);
      updated = true;
    } else if (standardFaviconRegex.test(html) && !html.includes('favicon.svg')) {
      html = html.replace(standardFaviconRegex, FAVICON_TAG);
      updated = true;
    } else if (!html.includes('rel="icon"')) {
      html = html.replace('</head>', `    ${FAVICON_TAG}\n</head>`);
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, html, 'utf8');
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error in ${filePath}:`, err.message);
    return false;
  }
}

let fixedCount = 0;

// Fix root files
const rootDir = __dirname;
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
for (const file of rootFiles) {
  if (replaceFaviconInFile(path.join(rootDir, file))) fixedCount++;
}

// Fix blog files
const blogDir = path.join(rootDir, 'Blogs');
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  for (const file of blogFiles) {
    if (replaceFaviconInFile(path.join(blogDir, file))) fixedCount++;
  }
}

console.log(`Successfully updated favicon in ${fixedCount} files!`);
