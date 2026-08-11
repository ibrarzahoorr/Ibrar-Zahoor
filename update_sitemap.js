const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, 'sitemap.xml');
const blogsDir = path.join(__dirname, 'Blogs');
const baseUrl = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs';

function getFilesRecursively(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getFilesRecursively(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

async function updateSitemap() {
    try {
        let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
        const files = getFilesRecursively(blogsDir);

        let addedCount = 0;
        const currentDate = new Date().toISOString().split('T')[0];

        const urlsetCloseTag = '</urlset>';
        let newUrls = '';

        for (const file of files) {
            let relativePath = file.substring(blogsDir.length).replace(/\\/g, '/');
            const url = `${baseUrl}${relativePath}`;
            
            if (!sitemapContent.includes(url)) {
                newUrls += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
                addedCount++;
            }
        }

        if (addedCount > 0) {
            sitemapContent = sitemapContent.replace(urlsetCloseTag, `${newUrls}\n${urlsetCloseTag}`);
            fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
            console.log(`Successfully added ${addedCount} new URLs to sitemap.xml!`);
        } else {
            console.log('No new URLs found to add to sitemap.xml.');
        }

    } catch (error) {
        console.error('Error updating sitemap:', error);
    }
}

updateSitemap();
