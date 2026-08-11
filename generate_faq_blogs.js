const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'faq_blogs_data.json'), 'utf8'));
const template = fs.readFileSync(path.join(__dirname, 'Blogs', 'what-is-shopify-and-how-does-it-work.html'), 'utf8');

for (const blog of data) {
    const slug = blog.slug;
    const title = blog.title;
    const description = blog.description;
    
    let html = template;
    
    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    
    // Replace Description
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
    
    // Replace Canonical
    html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/${slug}.html" />`);
    
    // Generate FAQ Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": blog.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a
        }
      }))
    };
    
    // Inject Schema into <head>
    const schemaScript = `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n</head>`;
    html = html.replace('</head>', schemaScript);
    
    // Generate Main Content
    let mainContent = `
    <main style="padding: 120px 20px; max-width: 900px; margin: 0 auto; color: var(--text);">
        <h1 style="margin-bottom: 20px; color: var(--text); font-size: 42px;">${blog.h1}</h1>
        <p style="font-size: 18px; margin-bottom: 40px; color: var(--text-2); line-height: 1.8;">${description}</p>
        
        <div class="faq-container">
    `;
    
    for (let i = 0; i < blog.questions.length; i++) {
        const q = blog.questions[i];
        mainContent += `
            <div style="background: var(--surface-2); padding: 25px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border);">
                <h3 style="margin-bottom: 12px; color: var(--text); font-size: 22px;">Q${i+1}: ${q.q}</h3>
                <p style="color: var(--text-2); line-height: 1.7; font-size: 16px;">${q.a}</p>
            </div>
        `;
    }
    
    mainContent += `
        </div>
        
        <div style="background: linear-gradient(135deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1)); padding: 40px; border-radius: 20px; border: 1px solid var(--border); text-align: center; margin-top: 60px;">
            <h3 style="margin-bottom: 15px; color: var(--text); font-size: 24px;">Need Professional Shopify Help?</h3>
            <p style="margin-bottom: 25px; color: var(--text-2); font-size: 16px;">If you have more questions or need expert development assistance, feel free to reach out.</p>
            <a href="https://wa.me/923010482120" style="display: inline-flex; align-items: center; gap: 8px; background: var(--brand); color: white; padding: 14px 28px; text-decoration: none; border-radius: 100px; font-weight: 600; transition: transform 0.3s ease;">
                <i class="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
        </div>
    </main>
    `;
    
    html = html.replace(/<main[\s\S]*?<\/main>/, mainContent);
    
    fs.writeFileSync(path.join(__dirname, 'Blogs', `${slug}.html`), html, 'utf8');
    console.log(`Generated FAQ blog: ${slug}.html`);
}
console.log("All FAQ blogs generated successfully.");
