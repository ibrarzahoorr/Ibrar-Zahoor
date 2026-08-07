const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'Blogs');
const templateFile = path.join(blogsDir, 'shopify-seo-expert.html'); 
const templateContent = fs.readFileSync(templateFile, 'utf8');

const blogs = [
    {
        filename: 'shopify-developer-hourly-rate-2026.html',
        title: 'Shopify Developer Hourly Rate [2026] | Hire Ibrar Zahoor',
        desc: 'Wondering about the Shopify Developer hourly rate in 2026? Hire a Certified Expert from Pakistan at affordable rates. Free quote!',
    },
    {
        filename: 'cost-to-build-custom-shopify-theme-pakistan.html',
        title: 'Cost to Build Custom Shopify Theme [2026] | Expert Guide',
        desc: 'Find out the exact cost to build a custom Shopify theme. Hire a top Pakistani developer for premium, fast, and high-converting themes.',
    },
    {
        filename: 'shopify-plus-pricing-calculator-2026.html',
        title: 'Shopify Plus Pricing Calculator [2026] | Enterprise Cost',
        desc: 'Calculate your Shopify Plus pricing for 2026. Is the enterprise upgrade worth it? Get expert advice and development services.',
    },
    {
        filename: 'affordable-shopify-developer-for-small-business.html',
        title: 'Affordable Shopify Developer for Small Business [2026]',
        desc: 'Looking for an affordable Shopify developer for your small business? Get a high-converting store starting at just $420. Contact now!',
    },
    {
        filename: 'shopify-b2b-wholesale-store-setup-guide.html',
        title: 'Shopify B2B & Wholesale Store Setup Guide [2026]',
        desc: 'Step-by-step Shopify B2B and Wholesale setup guide. Hire an expert to configure your B2B catalogs, net payment terms, and custom pricing.',
    },
    {
        filename: 'shopify-plus-b2b-features-explained.html',
        title: 'Shopify Plus B2B Features Explained [2026] | Expert Review',
        desc: 'Discover the powerful B2B features of Shopify Plus in 2026. Checkout Extensibility, company profiles, and custom B2B logic explained.',
    },
    {
        filename: 'hire-shopify-b2b-developer-expert.html',
        title: 'Hire Shopify B2B Developer [2026] | Wholesale Expert',
        desc: 'Hire an expert Shopify B2B Developer to build your wholesale portal. Custom features, complex integrations, and premium Plus builds.',
    },
    {
        filename: 'how-to-fix-shopify-core-web-vitals.html',
        title: 'How to Fix Shopify Core Web Vitals [2026] | Speed Expert',
        desc: 'Failing Core Web Vitals? Learn how to fix LCP, CLS, and INP on your Shopify store. Hire a speed optimization expert today.',
    },
    {
        filename: 'shopify-liquid-code-optimization-tips.html',
        title: 'Shopify Liquid Code Optimization Tips [2026] | Dev Guide',
        desc: 'Optimize your Shopify Liquid code for blazing fast speeds. Top tips from an expert Shopify developer to reduce load times.',
    },
    {
        filename: 'best-image-optimization-apps-shopify-2026.html',
        title: 'Best Image Optimization Apps for Shopify [2026]',
        desc: 'Speed up your store with the best image optimization apps for Shopify in 2026. Expert recommendations for 90+ PageSpeed.',
    },
    {
        filename: 'shopify-headless-commerce-nextjs-guide.html',
        title: 'Shopify Headless Commerce with Next.js [2026] | Complete Guide',
        desc: 'Go headless with Shopify and Next.js. Build lightning-fast, highly scalable enterprise stores. Hire a Headless Commerce expert.',
    },
    {
        filename: 'hire-shopify-headless-developer-pakistan.html',
        title: 'Hire Headless Shopify Developer [Next.js] | Top Expert',
        desc: 'Looking for a Headless Shopify developer? Hire a top expert in Next.js, React, and Hydrogen to build a blazing-fast custom storefront.',
    },
    {
        filename: 'shopify-hydrogen-vs-nextjs-2026.html',
        title: 'Shopify Hydrogen vs Next.js [2026] | Which is Better?',
        desc: 'Compare Shopify Hydrogen and Next.js for headless commerce. Which framework should you choose in 2026? Expert analysis.',
    },
    {
        filename: 'shopify-expert-developer-in-california.html',
        title: 'Hire Shopify Expert Developer in California [2026]',
        desc: 'Top-rated Shopify Expert serving California. Build high-converting, lightning-fast stores with a Certified Plus Developer.',
    },
    {
        filename: 'shopify-developer-agency-in-texas.html',
        title: 'Top Shopify Developer Agency Alternative in Texas [2026]',
        desc: 'Skip the expensive Texas agencies. Hire an expert freelance Shopify developer for premium quality at a fraction of the cost.',
    },
    {
        filename: 'hire-shopify-developer-in-melbourne.html',
        title: 'Hire Shopify Developer in Melbourne [2026] | Top Expert',
        desc: 'Looking for a Shopify developer in Melbourne? Get premium custom themes and Plus development from an internationally trusted expert.',
    },
    {
        filename: 'best-shopify-theme-for-clothing-brand.html',
        title: 'Best Custom Shopify Theme for Clothing Brand [2026]',
        desc: 'Build the ultimate Shopify store for your clothing brand. Premium fashion themes, fast speeds, and high-converting designs.',
    },
    {
        filename: 'shopify-developer-for-jewelry-store.html',
        title: 'Hire Shopify Developer for Jewelry Store [2026]',
        desc: 'Expert Shopify development for high-end jewelry stores. Showcase your luxury products with a premium, lightning-fast custom theme.',
    },
    {
        filename: 'shopify-migration-from-magento-2-guide.html',
        title: 'Magento 2 to Shopify Migration Guide [2026] | Expert Services',
        desc: 'Planning a Magento 2 to Shopify Plus migration? Ensure zero data loss and preserve your SEO with our expert migration services.',
    },
    {
        filename: 'shopify-custom-app-development-cost.html',
        title: 'Shopify Custom App Development Cost [2026] | Ultimate Guide',
        desc: 'How much does a custom Shopify app cost in 2026? Get a complete breakdown and hire a top-rated Shopify app developer.',
    }
];

let createdCount = 0;

blogs.forEach(blog => {
    let newContent = templateContent;
    
    // Replace title
    newContent = newContent.replace(/<title>.*?<\/title>/gi, `<title>${blog.title}</title>`);
    
    // Replace description
    newContent = newContent.replace(/<meta name="description" content=".*?">/gi, `<meta name="description" content="${blog.desc}">`);
    
    // Attempt to replace H1 if there's one with class "hero-title" or similar
    newContent = newContent.replace(/<h1[^>]*>.*?<\/h1>/i, `<h1 style="color:#fff;font-size:2.5rem;font-weight:700;line-height:1.2;margin-bottom:20px">${blog.title}</h1>`);

    const newFilePath = path.join(blogsDir, blog.filename);
    fs.writeFileSync(newFilePath, newContent, 'utf8');
    createdCount++;
});

console.log(`Successfully generated ${createdCount} new blog files!`);
