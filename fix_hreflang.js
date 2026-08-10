const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor';

function fixHreflangInFile(filePath, isBlog) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const pageUrl = isBlog ? `${BASE_URL}/Blogs/${fileName}` : (fileName === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${fileName}`);
    
    // Check if canonical URL exists, if not we add it (but mostly it should exist)
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"\s*\/>/i);
    const urlToUse = canonicalMatch ? canonicalMatch[1] : pageUrl;

    const hreflangTags = `
    <!-- Hreflang for International Markets -->
    <link rel="alternate" hreflang="x-default" href="${urlToUse}" />
    <link rel="alternate" hreflang="en" href="${urlToUse}" />`;

    let updated = false;

    // Remove massive empty hreflang blocks from index.html and root pages
    if (html.includes('COMPREHENSIVE HREFLANG FOR GLOBAL SEO')) {
      html = html.replace(/<!-- COMPREHENSIVE HREFLANG FOR GLOBAL SEO[\s\S]*?<!-- OPTIMIZED OPEN GRAPH -->/, '<!-- OPTIMIZED OPEN GRAPH -->');
    }

    if (html.includes('<!-- GLOBAL HREFLANG TAGS -->')) {
        // Find GLOBAL HREFLANG TAGS and replace it along with the empty spaces after it until the next comment or valid tag
        html = html.replace(/<!-- GLOBAL HREFLANG TAGS -->[\s]*?(?=<!--)/g, hreflangTags + '\n    ');
        updated = true;
    }

    if (!html.includes('hreflang="x-default"')) {
        // If still missing, inject right after canonical
        if (html.includes('<link rel="canonical"')) {
             html = html.replace(/(<link\s+rel="canonical"[^>]+>)/i, `$1\n${hreflangTags}`);
             updated = true;
        } else {
             // Inject before closing head
             html = html.replace('</head>', `${hreflangTags}\n</head>`);
             updated = true;
        }
    }
    
    // Clean up multiple duplicate empty Hreflang sections if they exist
    html = html.replace(/<!-- Hreflang for International Markets -->[\s]*?<!--/g, '<!--');

    if (updated || html.includes('COMPREHENSIVE HREFLANG FOR GLOBAL SEO')) {
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
  if (fixHreflangInFile(path.join(rootDir, file), false)) fixedCount++;
}

// Fix blog files
const blogDir = path.join(rootDir, 'Blogs');
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  for (const file of blogFiles) {
    if (fixHreflangInFile(path.join(blogDir, file), true)) fixedCount++;
  }
}

console.log(`Successfully fixed hreflang in ${fixedCount} files!`);
