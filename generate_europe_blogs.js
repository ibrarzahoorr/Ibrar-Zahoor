const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'Blogs');
const templatePath = path.join(blogsDir, 'hire-shopify-developer-in-london-uk.html');

// Expanded dataset with more cities per country
const europeData = [
    {
        country: 'UK',
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Sheffield', 'Leicester', 'Coventry', 'Nottingham', 'Newcastle', 'Belfast', 'Cardiff']
    },
    {
        country: 'Germany',
        cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Stuttgart', 'Dusseldorf', 'Leipzig', 'Dortmund', 'Essen', 'Bremen', 'Dresden', 'Hannover', 'Nuremberg', 'Bonn']
    },
    {
        country: 'France',
        cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Lille', 'Bordeaux', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Rennes', 'Reims', 'Le Havre', 'Saint-Etienne', 'Toulon']
    },
    {
        country: 'Italy',
        cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Florence', 'Venice', 'Genoa', 'Bologna', 'Bari', 'Catania', 'Verona', 'Messina', 'Padua', 'Trieste']
    },
    {
        country: 'Spain',
        cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Cordoba', 'Valladolid', 'Vigo', 'Gijon']
    },
    {
        country: 'Netherlands',
        cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen', 'Almere', 'Breda', 'Nijmegen', 'Apeldoorn', 'Haarlem', 'Arnhem']
    },
    {
        country: 'Switzerland',
        cities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St Gallen', 'Lugano', 'Biel']
    },
    {
        country: 'Sweden',
        cities: ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Vasteras', 'Orebro', 'Linkoping', 'Helsingborg', 'Jonkoping', 'Norrkoping']
    },
    {
        country: 'Norway',
        cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Baerum', 'Kristiansand', 'Fredrikstad', 'Sandnes', 'Tromso', 'Drammen']
    },
    {
        country: 'Denmark',
        cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde']
    },
    {
        country: 'Belgium',
        cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liege', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst']
    },
    {
        country: 'Austria',
        cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Polten', 'Dornbirn']
    },
    {
        country: 'Ireland',
        cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Bray', 'Navan', 'Kilkenny']
    },
    {
        country: 'Finland',
        cities: ['Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyvaskyla', 'Lahti', 'Kuopio', 'Pori']
    },
    {
        country: 'Poland',
        cities: ['Warsaw', 'Krakow', 'Lodz', 'Wroclaw', 'Poznan', 'Gdansk', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Bialystok', 'Katowice', 'Gdynia', 'Czestochowa']
    },
    {
        country: 'Luxembourg',
        cities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange', 'Dudelange']
    }
];

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function generateAllPages() {
    try {
        console.log('Reading base template...');
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        let generatedCount = 0;

        for (const data of europeData) {
            const country = data.country;
            
            // Generate Country Page
            const countryFileName = `hire-shopify-developer-in-${slugify(country)}.html`;
            const countryFilePath = path.join(blogsDir, countryFileName);
            
            let countryContent = templateContent;
            countryContent = countryContent.replace(/in London, UK/g, `in ${country}`);
            countryContent = countryContent.replace(/London, UK/g, country);
            countryContent = countryContent.replace(/hire-shopify-developer-in-london-uk\.html/g, countryFileName);
            countryContent = countryContent.replace(/London's/g, `${country}'s`);
            countryContent = countryContent.replace(/\bLondon\b/g, country);
            countryContent = countryContent.replace(/\bUK\b/g, country);
            countryContent = countryContent.replace(/\bUnited Kingdom\b/g, country);
            
            const countryIntro = `businesses in ${country} are increasingly moving towards robust e-commerce solutions.`;
            countryContent = countryContent.replace(/businesses in London, UK are increasingly moving towards/i, countryIntro);

            fs.writeFileSync(countryFilePath, countryContent, 'utf8');
            generatedCount++;

            // Generate City Pages
            for (const city of data.cities) {
                const cityFileName = `hire-shopify-developer-in-${slugify(city)}-${slugify(country)}.html`;
                const cityFilePath = path.join(blogsDir, cityFileName);

                let cityContent = templateContent;
                cityContent = cityContent.replace(/in London, UK/g, `in ${city}, ${country}`);
                cityContent = cityContent.replace(/London, UK/g, `${city}, ${country}`);
                cityContent = cityContent.replace(/hire-shopify-developer-in-london-uk\.html/g, cityFileName);
                cityContent = cityContent.replace(/London's/g, `${city}'s`);
                cityContent = cityContent.replace(/\bLondon\b/g, city);
                cityContent = cityContent.replace(/\bUK\b/g, country);
                cityContent = cityContent.replace(/\bUnited Kingdom\b/g, country);
                
                const cityIntro = `businesses in ${city}, ${country} are increasingly moving towards robust e-commerce solutions.`;
                cityContent = cityContent.replace(/businesses in London, UK are increasingly moving towards/i, cityIntro);

                fs.writeFileSync(cityFilePath, cityContent, 'utf8');
                generatedCount++;
            }
        }

        console.log(`\nSuccess! Generated a total of ${generatedCount} pages.`);
        
    } catch (error) {
        console.error('Error generating pages:', error);
    }
}

generateAllPages();
