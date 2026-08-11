const fs = require('fs');
const path = require('path');
const https = require('https');

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    // 1. Target Countries (ISO 3166-1 alpha-2)
    targetCountries: {
        'GB': 'UK', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy', 
        'ES': 'Spain', 'NL': 'Netherlands', 'CH': 'Switzerland', 
        'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'BE': 'Belgium', 
        'AT': 'Austria', 'IE': 'Ireland', 'FI': 'Finland', 'PL': 'Poland', 'LU': 'Luxembourg'
    },
    
    // 2. Minimum Population Filter (Requirement #2)
    MIN_POPULATION: 50000, 
    
    // 3. Max Cities per country (Optional limit for controlled batches - Requirement #9)
    MAX_CITIES_PER_COUNTRY: null, // set to a number like 50 to limit, or null for all

    // 4. Directories
    blogsDir: path.join(__dirname, 'Blogs'),
    europeDir: path.join(__dirname, 'Blogs', 'europe'),
    templatePath: path.join(__dirname, 'Blogs', 'hire-shopify-developer-in-london-uk.html'),
    
    // Dataset URL (Using OpenDataSoft GeoNames dataset for accurate population data)
    datasetUrl: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/exports/json',
    localDatasetPath: path.join(__dirname, 'cities_with_population.json')
};

// Check for dry run mode (Requirement #8)
const isDryRun = process.argv.includes('--dry-run');

// ==========================================
// HELPER FUNCTIONS
// ==========================================
function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function getDataset() {
    if (fs.existsSync(CONFIG.localDatasetPath)) {
        console.log('Loading dataset from local cache...');
        return JSON.parse(fs.readFileSync(CONFIG.localDatasetPath, 'utf8'));
    }

    console.log('Downloading dataset (Cities > 1000 population)... This might take a minute.');
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(CONFIG.localDatasetPath);
        https.get(CONFIG.datasetUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(JSON.parse(fs.readFileSync(CONFIG.localDatasetPath, 'utf8')));
            });
        }).on('error', (err) => {
            fs.unlink(CONFIG.localDatasetPath, () => {});
            reject(err);
        });
    });
}

function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Generate country-level sitemap (Requirement #6)
function updateCountrySitemap(countrySlug, urls) {
    if (isDryRun) return;
    
    const sitemapPath = path.join(__dirname, `sitemap-europe-${countrySlug}.xml`);
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const url of urls) {
        xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
    xml += `</urlset>`;
    
    fs.writeFileSync(sitemapPath, xml, 'utf8');
}

// ==========================================
// MAIN GENERATOR
// ==========================================
async function main() {
    try {
        console.log(`\n=== EUROPEAN SEO GENERATOR ===`);
        console.log(`Mode: ${isDryRun ? 'DRY RUN (No files will be created)' : 'EXECUTION'}`);
        console.log(`Minimum Population: ${CONFIG.MIN_POPULATION}\n`);

        const allCities = await getDataset();
        console.log(`Total cities in worldwide dataset: ${allCities.length}`);

        // Filter and map dataset
        let targetCities = [];
        let excludedByPopulation = 0;
        let excludedByCountry = 0;

        const citiesByCountry = {};

        for (const cityData of allCities) {
            // dataset properties usually map to: name, cou_name_en, population, country_code
            const countryCode = cityData.country_code;
            const pop = cityData.population || 0;

            if (!CONFIG.targetCountries[countryCode]) {
                excludedByCountry++;
                continue;
            }

            if (pop < CONFIG.MIN_POPULATION) {
                excludedByPopulation++;
                continue;
            }

            targetCities.push(cityData);
            
            if (!citiesByCountry[countryCode]) {
                citiesByCountry[countryCode] = [];
            }
            citiesByCountry[countryCode].push(cityData);
        }

        // Apply MAX_CITIES_PER_COUNTRY constraint if set
        if (CONFIG.MAX_CITIES_PER_COUNTRY) {
            targetCities = [];
            for (const code of Object.keys(citiesByCountry)) {
                // Sort by population descending
                citiesByCountry[code].sort((a, b) => (b.population || 0) - (a.population || 0));
                citiesByCountry[code] = citiesByCountry[code].slice(0, CONFIG.MAX_CITIES_PER_COUNTRY);
                targetCities.push(...citiesByCountry[code]);
            }
        }

        console.log(`\n--- FILTER RESULTS ---`);
        console.log(`Cities excluded (Not target country): ${excludedByCountry}`);
        console.log(`Cities excluded (Population < ${CONFIG.MIN_POPULATION}): ${excludedByPopulation}`);
        console.log(`Cities queued for generation: ${targetCities.length}`);
        
        console.log(`\n--- BREAKDOWN BY COUNTRY ---`);
        for (const code of Object.keys(citiesByCountry)) {
            console.log(`${CONFIG.targetCountries[code]}: ${citiesByCountry[code].length} cities`);
        }

        if (isDryRun) {
            console.log(`\n[DRY RUN COMPLETE] Estimated pages to create: ${targetCities.length}`);
            console.log(`[DRY RUN COMPLETE] Estimated regional sitemaps to create: ${Object.keys(citiesByCountry).length}`);
            return; // Exit early for dry run
        }

        // --- EXECUTION PHASE ---
        const templateContent = fs.readFileSync(CONFIG.templatePath, 'utf8');
        let generatedCount = 0;
        let skippedCount = 0; // Resumability (Requirement #7)
        const baseUrl = 'https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/europe';

        ensureDirSync(CONFIG.europeDir);

        for (const countryCode of Object.keys(citiesByCountry)) {
            const countryFull = CONFIG.targetCountries[countryCode];
            const countrySlug = slugify(countryFull);
            const countryDir = path.join(CONFIG.europeDir, countrySlug);
            
            ensureDirSync(countryDir);

            // Generate Country Index Page
            const countryIndexPath = path.join(countryDir, 'index.html');
            if (!fs.existsSync(countryIndexPath)) {
                let countryContent = templateContent;
                countryContent = countryContent.replace(/in London, UK/g, `in ${countryFull}`);
                countryContent = countryContent.replace(/London, UK/g, countryFull);
                countryContent = countryContent.replace(/London's/g, `${countryFull}'s`);
                countryContent = countryContent.replace(/\bLondon\b/g, countryFull);
                countryContent = countryContent.replace(/\bUK\b/g, countryFull);
                countryContent = countryContent.replace(/\bUnited Kingdom\b/g, countryFull);
                fs.writeFileSync(countryIndexPath, countryContent, 'utf8');
                generatedCount++;
            }

            const sitemapUrls = [`${baseUrl}/${countrySlug}/index.html`];

            // Generate City Pages
            for (const cityData of citiesByCountry[countryCode]) {
                const city = cityData.name;
                const citySlug = slugify(city);
                if (!citySlug) continue;

                const cityDir = path.join(countryDir, citySlug);
                const cityIndexPath = path.join(cityDir, 'index.html');
                const pageUrl = `${baseUrl}/${countrySlug}/${citySlug}/index.html`;
                
                sitemapUrls.push(pageUrl);

                // Resumability: Skip if exists
                if (fs.existsSync(cityIndexPath)) {
                    skippedCount++;
                    continue;
                }

                ensureDirSync(cityDir);

                let cityContent = templateContent;
                // Basic replacement logic (To be enhanced with unique SEO logic - Requirement #4)
                cityContent = cityContent.replace(/in London, UK/g, `in ${city}, ${countryFull}`);
                cityContent = cityContent.replace(/London, UK/g, `${city}, ${countryFull}`);
                cityContent = cityContent.replace(/London's/g, `${city}'s`);
                cityContent = cityContent.replace(/\bLondon\b/g, city);
                cityContent = cityContent.replace(/\bUK\b/g, countryFull);
                cityContent = cityContent.replace(/\bUnited Kingdom\b/g, countryFull);
                
                // Requirement #4: Unique SEO Content Injection
                const uniqueIntro = `E-commerce is thriving in ${city}, with a population of over ${cityData.population.toLocaleString()}. Businesses in ${city}, ${countryFull} require robust Shopify Plus solutions to scale effectively in the competitive local market.`;
                cityContent = cityContent.replace(/businesses in London, UK are increasingly moving towards/i, uniqueIntro);

                // Update Canonical URLs and asset paths for the nested structure (Requirement #5)
                cityContent = cityContent.replace(/href="https:\/\/ibrarzahoorr.github.io\/Ibrar-Zahoor\/Blogs\/hire-shopify-developer-in-london-uk.html"/g, `href="${pageUrl}"`);
                
                fs.writeFileSync(cityIndexPath, cityContent, 'utf8');
                generatedCount++;

                if (generatedCount % 500 === 0) {
                    console.log(`Progress: Generated ${generatedCount} new pages...`);
                }
            }

            // Update regional sitemap (Requirement #6) - Disabled, we use one main sitemap now
            // updateCountrySitemap(countrySlug, sitemapUrls);
            // console.log(`Updated regional sitemap for ${countryFull}`);
        }

        console.log(`\n=== GENERATION COMPLETE ===`);
        console.log(`Newly Generated: ${generatedCount}`);
        console.log(`Skipped (Already Existed): ${skippedCount}`);
        console.log(`Total Pages Processed: ${generatedCount + skippedCount}`);

    } catch (err) {
        console.error('Fatal Error:', err);
    }
}

main();
