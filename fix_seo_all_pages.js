/**
 * FIX SEO ALL PAGES
 * ==================
 * Run: node fix_seo_all_pages.js
 */

const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'Blogs');
const BASE_URL = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor';
const AUTHOR_NAME = 'Ibrar Zahoor';
const SITE_NAME = 'Ibrar Zahoor - Shopify Developer';
const PUBLISHED_DATE = '2026-01-01';
const MODIFIED_DATE = '2026-08-08';

let fixedCount = 0;
let errorCount = 0;

function fixBlogPage(filePath, fileName) {
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    const pageUrl = `${BASE_URL}/Blogs/${fileName}`;
    
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const actualTitle = titleMatch ? titleMatch[1].trim() : fileName.replace('.html', '').replace(/-/g, ' ');
    
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) ||
                      html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
    const actualDesc = descMatch ? descMatch[1].trim() : `${actualTitle} - Expert Shopify developer Ibrar Zahoor.`;

    // Fix og:type to "article" for blog pages
    html = html.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/gi,
      '<meta property="og:type" content="article" />'
    );
    
    // Fix og:title to match actual page title
    if (html.includes('property="og:title"')) {
      html = html.replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/gi,
        `<meta property="og:title" content="${actualTitle}" />`
      );
    }
    
    // Fix og:description
    if (html.includes('property="og:description"')) {
      html = html.replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/gi,
        `<meta property="og:description" content="${actualDesc}" />`
      );
    }

    // Fix og:url
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/gi,
      `<meta property="og:url" content="${pageUrl}" />`
    );
    
    // Fix Twitter title
    if (html.includes('name="twitter:title"')) {
      html = html.replace(
        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/gi,
        `<meta name="twitter:title" content="${actualTitle}" />`
      );
    }
    
    // Fix Twitter description
    if (html.includes('name="twitter:description"')) {
      html = html.replace(
        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/gi,
        `<meta name="twitter:description" content="${actualDesc}" />`
      );
    }

    // Add article published_time if missing
    if (!html.includes('article:published_time')) {
      const ogTypeMatch = html.match(/<meta\s+property="og:type"[^>]*>/i);
      if (ogTypeMatch) {
        html = html.replace(
          ogTypeMatch[0],
          ogTypeMatch[0] + `\n    <meta property="article:published_time" content="${PUBLISHED_DATE}T00:00:00+05:00" />\n    <meta property="article:modified_time" content="${MODIFIED_DATE}T00:00:00+05:00" />\n    <meta property="article:author" content="${AUTHOR_NAME}" />`
        );
      }
    }

    // Add Article JSON-LD Schema if missing
    if (!html.includes('"@type": "Article"') && !html.includes('"@type":"Article"')) {
      const safeTitle = actualTitle.replace(/"/g, '\\"').replace(/\n/g, ' ');
      const safeDesc = actualDesc.replace(/"/g, '\\"').replace(/\n/g, ' ');
      const articleSchema = `
    <!-- Article Schema for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${safeTitle}",
      "description": "${safeDesc}",
      "url": "${pageUrl}",
      "datePublished": "${PUBLISHED_DATE}T00:00:00+05:00",
      "dateModified": "${MODIFIED_DATE}T00:00:00+05:00",
      "author": {
        "@type": "Person",
        "name": "${AUTHOR_NAME}",
        "url": "${BASE_URL}/",
        "sameAs": ["https://github.com/ibrarzahoorr","https://www.linkedin.com/in/ibrarzahoorr/"]
      },
      "publisher": {
        "@type": "Person",
        "name": "${AUTHOR_NAME}",
        "url": "${BASE_URL}/"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${pageUrl}"
      },
      "image": "${BASE_URL}/ibrar-zahoor-shopify-developer.jpg",
      "inLanguage": "en-US"
    }
    </script>`;
      html = html.replace('</head>', articleSchema + '\n</head>');
    }

    // Add og:site_name if missing
    if (!html.includes('og:site_name')) {
      html = html.replace(
        '<meta property="og:locale"',
        `<meta property="og:site_name" content="${SITE_NAME}" />\n    <meta property="og:locale"`
      );
    }

    // Add Twitter creator if missing
    if (!html.includes('twitter:creator') && html.includes('twitter:card')) {
      html = html.replace(
        /<meta\s+name="twitter:card"[^>]*>/i,
        (match) => match + '\n    <meta name="twitter:creator" content="@ibrarzahoor" />'
      );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    fixedCount++;
    
    if (fixedCount % 50 === 0) {
      console.log(`✅ ${fixedCount} pages fixed...`);
    }
  } catch (err) {
    console.error(`❌ Error: ${fileName} - ${err.message}`);
    errorCount++;
  }
}

// Fix all blog pages
console.log('🚀 SEO fix shuru ho raha hai sab blog pages ke liye...\n');
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.html'));
console.log(`📄 Blogs folder mein ${files.length} HTML files mili\n`);

files.forEach(fileName => {
  const filePath = path.join(BLOG_DIR, fileName);
  fixBlogPage(filePath, fileName);
});

console.log(`\n✅ BLOGS DONE! Fixed: ${fixedCount} pages`);

// Fix root pages too
console.log('\n🚀 Root HTML pages fix kar raha hoon...\n');
const rootFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

rootFiles.forEach(fileName => {
  try {
    const filePath = path.join(__dirname, fileName);
    let html = fs.readFileSync(filePath, 'utf8');
    const pageUrl = fileName === 'index.html' ? `${BASE_URL}/` : `${BASE_URL}/${fileName}`;
    
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const actualTitle = titleMatch ? titleMatch[1].trim() : fileName.replace('.html', '').replace(/-/g, ' ');
    
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    const actualDesc = descMatch ? descMatch[1].trim() : `${actualTitle} - Expert Shopify developer.`;

    if (html.includes('property="og:title"')) {
      html = html.replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/gi,
        `<meta property="og:title" content="${actualTitle}" />`
      );
    }
    
    if (html.includes('property="og:description"')) {
      html = html.replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/gi,
        `<meta property="og:description" content="${actualDesc}" />`
      );
    }

    if (html.includes('name="twitter:title"')) {
      html = html.replace(
        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/gi,
        `<meta name="twitter:title" content="${actualTitle}" />`
      );
    }
    
    if (html.includes('name="twitter:description"')) {
      html = html.replace(
        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/gi,
        `<meta name="twitter:description" content="${actualDesc}" />`
      );
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Root fixed: ${fileName}`);
  } catch (err) {
    console.error(`❌ Root error ${fileName}:`, err.message);
  }
});

console.log('\n🎉 SAB KUCH FIX HO GAYA!');
console.log(`📊 Blog pages fixed: ${fixedCount}`);
console.log(`📄 Root pages: ${rootFiles.length}`);
console.log('🔑 Ab git commit aur push karo GitHub pe!');
