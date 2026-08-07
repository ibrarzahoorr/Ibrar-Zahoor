const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'Blogs');
const templateFile = path.join(blogsDir, 'shopify-seo-expert.html'); 
const templateContent = fs.readFileSync(templateFile, 'utf8');

const blogs = [
    {
        filename: 'shopify-developer-for-b2b-ecommerce-2026.html',
        title: 'Shopify Developer for B2B eCommerce [2026] | Hire Expert',
        desc: 'Need a Shopify Developer for your B2B eCommerce store? Hire Ibrar Zahoor for custom catalogs, wholesale pricing, and advanced B2B logic.'
    },
    {
        filename: 'hire-shopify-expert-for-custom-apps-2026.html',
        title: 'Hire Shopify Expert for Custom Apps [2026]',
        desc: 'Looking for a Shopify Expert to build a custom app? Get high-quality, scalable Shopify app development services at affordable rates.'
    },
    {
        filename: 'shopify-plus-migration-expert-guide-2026.html',
        title: 'Shopify Plus Migration Expert Guide [2026]',
        desc: 'Migrating to Shopify Plus? Follow this expert guide for a seamless transition. Hire a Certified Shopify Plus developer for zero downtime.'
    },
    {
        filename: 'woocommerce-vs-shopify-migration-cost-2026.html',
        title: 'WooCommerce vs Shopify Migration Cost [2026] | Expert Breakdown',
        desc: 'Discover the real cost of migrating from WooCommerce to Shopify in 2026. Hire a top-rated migration expert to handle your store transition safely.'
    },
    {
        filename: 'shopify-developer-for-beauty-brands-2026.html',
        title: 'Shopify Developer for Beauty Brands [2026] | Custom Themes',
        desc: 'Expert Shopify developer specializing in beauty and cosmetics brands. Get a premium, high-converting custom theme that showcases your products.'
    },
    {
        filename: 'shopify-developer-for-electronics-store-2026.html',
        title: 'Shopify Developer for Electronics Store [2026]',
        desc: 'Build a blazing-fast Shopify electronics store. Hire an expert for advanced filtering, custom product pages, and technical SEO optimization.'
    },
    {
        filename: 'hire-freelance-shopify-developer-fiverr-alternative.html',
        title: 'Hire Freelance Shopify Developer | Best Fiverr Alternative [2026]',
        desc: 'Skip the low-quality work on freelance platforms. Hire a proven, certified freelance Shopify developer directly for premium quality.'
    },
    {
        filename: 'shopify-theme-customization-expert-2026.html',
        title: 'Shopify Theme Customization Expert [2026] | Hire Now',
        desc: 'Need advanced Shopify theme customization? Hire a Liquid programming expert to tailor your store exactly to your brand needs.'
    },
    {
        filename: 'shopify-api-integration-specialist-2026.html',
        title: 'Shopify API Integration Specialist [2026] | Custom Solutions',
        desc: 'Connect your ERP, CRM, or custom software with Shopify. Hire a top Shopify API Integration Specialist for seamless data syncing.'
    },
    {
        filename: 'shopify-developer-in-toronto-canada-2026.html',
        title: 'Hire Expert Shopify Developer for Toronto, Canada [2026]',
        desc: 'Top-rated Shopify developer serving clients in Toronto, Canada. Build your dream e-commerce store with a certified Shopify Plus expert.'
    },
    {
        filename: 'shopify-developer-in-london-uk-2026.html',
        title: 'Hire Expert Shopify Developer for London, UK [2026]',
        desc: 'Leading Shopify development services for businesses in London, UK. Custom themes, app integrations, and Plus enterprise builds.'
    },
    {
        filename: 'hire-shopify-developer-in-sydney-australia-2026.html',
        title: 'Hire Shopify Developer for Sydney, Australia [2026]',
        desc: 'Looking for a reliable Shopify developer for your Australian business? Get premium development services at affordable global rates.'
    },
    {
        filename: 'shopify-store-setup-expert-from-scratch-2026.html',
        title: 'Shopify Store Setup Expert [2026] | Build from Scratch',
        desc: 'Hire a Shopify expert to set up your store from scratch. Professional design, product upload, payment gateway setup, and SEO optimization.'
    },
    {
        filename: 'shopify-checkout-extensibility-developer-2026.html',
        title: 'Shopify Checkout Extensibility Developer [2026]',
        desc: 'Upgrade your Shopify Plus store with Checkout Extensibility. Hire a specialized developer to customize your checkout for higher conversions.'
    },
    {
        filename: 'fix-shopify-liquid-errors-fast-2026.html',
        title: 'Fix Shopify Liquid Errors Fast [2026] | Hire Expert',
        desc: 'Is your store broken? Hire a Liquid expert to fix Shopify errors, layout issues, and bugs quickly. 100% satisfaction guaranteed.'
    },
    {
        filename: 'shopify-conversion-rate-optimization-expert-2026.html',
        title: 'Shopify Conversion Rate Optimization Expert [2026]',
        desc: 'Boost your sales without increasing ad spend. Hire a Shopify CRO expert to optimize your store layout, speed, and user experience.'
    },
    {
        filename: 'shopify-developer-for-furniture-store-2026.html',
        title: 'Shopify Developer for Furniture Stores [2026]',
        desc: 'Expert Shopify development for furniture and home decor brands. Implement 3D models, AR, and custom swatches for high-ticket sales.'
    },
    {
        filename: 'shopify-wholesale-channel-setup-expert-2026.html',
        title: 'Shopify Wholesale Channel Setup Expert [2026]',
        desc: 'Set up a dedicated wholesale channel on Shopify. Hire an expert to handle volume pricing, custom catalogs, and B2B workflows.'
    },
    {
        filename: 'best-shopify-developer-portfolio-examples-2026.html',
        title: 'Best Shopify Developer Portfolio Examples [2026]',
        desc: 'Explore the best Shopify developer portfolio examples for 2026. See real-world success stories, custom themes, and high-converting designs.'
    },
    {
        filename: 'shopify-maintenance-and-support-services-2026.html',
        title: 'Shopify Maintenance and Support Services [2026]',
        desc: 'Keep your Shopify store running smoothly with monthly maintenance and support services. Bug fixes, updates, and speed optimization.'
    }
];

let createdCount = 0;

blogs.forEach(blog => {
    let newContent = templateContent;
    
    // Replace title
    newContent = newContent.replace(/<title>.*?<\/title>/gi, `<title>${blog.title}</title>`);
    
    // Replace description
    newContent = newContent.replace(/<meta name="description" content=".*?">/gi, `<meta name="description" content="${blog.desc}">`);
    
    // Attempt to replace H1 if there's one
    newContent = newContent.replace(/<h1[^>]*>.*?<\/h1>/i, `<h1 style="color:#fff;font-size:2.5rem;font-weight:700;line-height:1.2;margin-bottom:20px">${blog.title}</h1>`);

    const newFilePath = path.join(blogsDir, blog.filename);
    fs.writeFileSync(newFilePath, newContent, 'utf8');
    createdCount++;
});

console.log(`Successfully generated ${createdCount} additional blog files in Batch 2!`);
