const fs = require('fs');
const path = require('path');

function fixBrokenFavicon(filePath) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // The broken HTML looks like:
    // <link rel="icon" type="image/svg+xml" href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/favicon.svg"><text y='0.9em' font-size='90'>💻</text></svg>">
    
    const brokenRegex = /<link rel="icon" type="image\/svg\+xml" href="https:\/\/ibrarzahoorr\.github\.io\/Ibrar-Zahoor\/favicon\.svg"><text y='0\.9em' font-size='90'>[^<]*<\/text><\/svg>">/g;
    
    if (brokenRegex.test(html)) {
      html = html.replace(brokenRegex, '<link rel="icon" type="image/svg+xml" href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/favicon.svg">');
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
const rootDir = __dirname;
const rootFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));
for (const file of rootFiles) {
  if (fixBrokenFavicon(path.join(rootDir, file))) fixedCount++;
}

const blogDir = path.join(rootDir, 'Blogs');
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  for (const file of blogFiles) {
    if (fixBrokenFavicon(path.join(blogDir, file))) fixedCount++;
  }
}

console.log(`Successfully fixed broken favicon in ${fixedCount} files!`);
