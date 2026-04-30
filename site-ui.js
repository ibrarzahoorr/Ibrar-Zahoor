(function(){
'use strict';

/* ── CSS — exact match to affordable-shopify-developer.html design ── */
var css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* CSS variables matching the actual site design */
:root {
  --iz-bg: #0a0a0a;
  --iz-surface: #111111;
  --iz-surface2: #1a1a1a;
  --iz-border: rgba(255,255,255,0.08);
  --iz-muted: #888888;
  --iz-text: #ffffff;
  --iz-text2: #cccccc;
  --iz-brand: #0070f3;
  --iz-brand3: #7928ca;
  --iz-success: #25d366;
  --iz-gradient: linear-gradient(135deg, #0070f3, #7928ca);
  --iz-maxw: 1280px;
  --iz-radius: 12px;
}

/* ── HEADER ── */
#iz-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  z-index: 99999 !important;
  background: rgba(10,10,10,0.95) !important;
  backdrop-filter: saturate(180%) blur(20px) !important;
  -webkit-backdrop-filter: saturate(180%) blur(20px) !important;
  border-bottom: 1px solid rgba(255,255,255,0.08) !important;
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1) !important;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

#iz-header .iz-nav {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  height: 70px !important;
  padding: 0 24px !important;
  max-width: var(--iz-maxw) !important;
  margin: 0 auto !important;
}

#iz-header .iz-brand {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-decoration: none !important;
  color: var(--iz-text) !important;
  flex-shrink: 0 !important;
}

#iz-header .iz-brand-logo {
  width: 40px !important;
  height: 40px !important;
  background: var(--iz-gradient) !important;
  border-radius: 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: 800 !important;
  color: #fff !important;
  font-size: 18px !important;
  flex-shrink: 0 !important;
}

#iz-header .iz-brand-name {
  font-size: 18px !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
  color: #fff !important;
}

#iz-header .iz-nav-links {
  display: flex !important;
  align-items: center !important;
  gap: 32px !important;
  list-style: none !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

#iz-header .iz-nav-links a {
  color: #cccccc !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  font-size: 15px !important;
  transition: color 0.2s !important;
  white-space: nowrap !important;
}

#iz-header .iz-nav-links a:hover,
#iz-header .iz-nav-links a.iz-active {
  color: #0070f3 !important;
  text-decoration: none !important;
}

#iz-header .iz-btn-talk {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 10px 20px !important;
  font-weight: 600 !important;
  border-radius: 8px !important;
  font-size: 14px !important;
  transition: all 0.2s !important;
  text-decoration: none !important;
  white-space: nowrap !important;
  background: linear-gradient(135deg, #25d366, #128c7e) !important;
  color: #fff !important;
  flex-shrink: 0 !important;
}

#iz-header .iz-btn-talk:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(37,211,102,0.35) !important;
  text-decoration: none !important;
  color: #fff !important;
}

/* Mobile menu button */
#iz-menu-btn {
  display: none !important;
  background: none !important;
  border: 1px solid rgba(255,255,255,0.15) !important;
  color: #ccc !important;
  font-size: 18px !important;
  cursor: pointer !important;
  padding: 8px 11px !important;
  border-radius: 8px !important;
  transition: all 0.2s !important;
  line-height: 1 !important;
}

#iz-menu-btn:hover {
  border-color: #0070f3 !important;
  color: #fff !important;
}

/* Body offset for fixed header */
body { padding-top: 70px !important; }

@media (max-width: 768px) {
  #iz-menu-btn { display: flex !important; align-items: center !important; justify-content: center !important; }
  #iz-header .iz-nav-links {
    display: none !important;
    position: fixed !important;
    top: 70px !important;
    left: 0 !important;
    right: 0 !important;
    background: rgba(10,10,10,0.99) !important;
    flex-direction: column !important;
    padding: 12px 0 18px !important;
    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
    gap: 0 !important;
    margin: 0 !important;
    align-items: stretch !important;
  }
  #iz-header .iz-nav-links.iz-open { display: flex !important; }
  #iz-header .iz-nav-links a {
    display: block !important;
    padding: 12px 28px !important;
    font-size: 16px !important;
  }
  #iz-header .iz-nav {
    padding: 0 16px !important;
    gap: 12px !important;
  }
}

/* ── BUILD CTA SECTION ── */
.iz-build-cta {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  background: linear-gradient(135deg, rgba(0,112,243,0.1), rgba(121,40,202,0.1)) !important;
  border-top: 1px solid rgba(0,112,243,0.15) !important;
  border-bottom: 1px solid rgba(121,40,202,0.12) !important;
  padding: 72px 24px !important;
  text-align: center !important;
  margin-top: 60px !important;
}

.iz-build-cta h2 {
  font-size: clamp(1.75rem,3.5vw,2.4rem) !important;
  font-weight: 800 !important;
  color: #fff !important;
  margin: 0 0 14px !important;
  letter-spacing: -0.02em !important;
}

.iz-build-cta p {
  color: #888 !important;
  font-size: 1rem !important;
  margin: 0 auto 30px !important;
  max-width: 480px !important;
  line-height: 1.65 !important;
}

.iz-cta-btns {
  display: flex !important;
  gap: 14px !important;
  justify-content: center !important;
  flex-wrap: wrap !important;
}

.iz-cta-wa {
  display: inline-flex !important;
  align-items: center !important;
  gap: 9px !important;
  padding: 13px 28px !important;
  background: linear-gradient(135deg, #25d366, #128c7e) !important;
  color: #fff !important;
  border-radius: 10px !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  text-decoration: none !important;
  transition: all 0.2s !important;
}

.iz-cta-wa:hover {
  opacity: 0.88 !important;
  transform: translateY(-2px) !important;
  text-decoration: none !important;
  color: #fff !important;
}

.iz-cta-link {
  display: inline-flex !important;
  align-items: center !important;
  gap: 9px !important;
  padding: 12px 28px !important;
  border: 2px solid rgba(0,112,243,0.4) !important;
  color: #4d9fff !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  text-decoration: none !important;
  background: transparent !important;
  transition: all 0.2s !important;
}

.iz-cta-link:hover {
  background: rgba(0,112,243,0.1) !important;
  border-color: #0070f3 !important;
  text-decoration: none !important;
}

/* ── FOOTER ── */
#iz-footer {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  background: #0a0a0a !important;
  border-top: 1px solid rgba(255,255,255,0.07) !important;
  padding: 56px 24px 28px !important;
}

.iz-footer-grid {
  max-width: 1100px !important;
  margin: 0 auto !important;
  display: grid !important;
  grid-template-columns: 1.9fr 1fr 1fr !important;
  gap: 44px !important;
  padding-bottom: 36px !important;
  border-bottom: 1px solid rgba(255,255,255,0.06) !important;
}

.iz-footer-brand-row {
  display: flex !important;
  align-items: center !important;
  gap: 11px !important;
  text-decoration: none !important;
  margin-bottom: 12px !important;
}

.iz-footer-logo {
  width: 38px !important;
  height: 38px !important;
  background: linear-gradient(135deg, #0070f3, #7928ca) !important;
  border-radius: 9px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: 800 !important;
  font-size: 15px !important;
  color: #fff !important;
  flex-shrink: 0 !important;
}

.iz-footer-bname {
  font-weight: 700 !important;
  color: #fff !important;
  font-size: 16px !important;
}

.iz-footer-desc {
  color: #666 !important;
  font-size: 14px !important;
  line-height: 1.65 !important;
  margin: 0 0 18px !important;
}

.iz-footer-social {
  display: flex !important;
  gap: 9px !important;
}

.iz-footer-social a {
  width: 35px !important;
  height: 35px !important;
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #666 !important;
  text-decoration: none !important;
  transition: all 0.2s !important;
  font-size: 14px !important;
}

.iz-footer-social a:hover {
  color: #fff !important;
  border-color: #0070f3 !important;
  background: rgba(0,112,243,0.12) !important;
}

.iz-footer-col-head {
  color: #fff !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  margin: 0 0 14px !important;
}

.iz-footer-col-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

.iz-footer-col-list li { margin-bottom: 9px !important; }

.iz-footer-col-list a {
  color: #666 !important;
  text-decoration: none !important;
  font-size: 14px !important;
  transition: color 0.18s !important;
}

.iz-footer-col-list a:hover { color: #4d9fff !important; }

.iz-footer-bottom {
  max-width: 1100px !important;
  margin: 22px auto 0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}

.iz-footer-copy { color: #444 !important; font-size: 13px !important; }

.iz-footer-btm-links {
  display: flex !important;
  gap: 16px !important;
}

.iz-footer-btm-links a {
  color: #444 !important;
  text-decoration: none !important;
  font-size: 13px !important;
  transition: color 0.18s !important;
}

.iz-footer-btm-links a:hover { color: #0070f3 !important; }

@media (max-width: 760px) {
  .iz-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
  .iz-footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
  .iz-build-cta { padding: 48px 20px !important; }
}

/* ── WA FLOAT ── */
#iz-wa-float {
  position: fixed !important;
  bottom: 28px !important;
  right: 28px !important;
  width: 58px !important;
  height: 58px !important;
  background: linear-gradient(135deg, #25d366, #128c7e) !important;
  color: #fff !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 26px !important;
  box-shadow: 0 4px 20px rgba(37,211,102,0.45) !important;
  z-index: 99998 !important;
  text-decoration: none !important;
  transition: all 0.25s !important;
}

#iz-wa-float:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 6px 28px rgba(37,211,102,0.65) !important;
}

#iz-wa-float::before {
  content: '' !important;
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 50% !important;
  background: rgba(37,211,102,0.3) !important;
  animation: izWaPing 2.2s ease-out infinite !important;
}

@keyframes izWaPing {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.9); opacity: 0; }
}
`;

/* ── INJECT CSS ── */
var styleEl = document.getElementById('iz-site-ui-css');
if (!styleEl) {
  styleEl = document.createElement('style');
  styleEl.id = 'iz-site-ui-css';
  document.head.insertBefore(styleEl, document.head.firstChild);
}
styleEl.textContent = css;

/* ── HEADER HTML ── */
var headerHTML = '<header id="iz-header">' +
  '<nav class="iz-nav">' +
    '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/" class="iz-brand">' +
      '<div class="iz-brand-logo">IZ</div>' +
      '<span class="iz-brand-name">Ibrar Zahoor</span>' +
    '</a>' +
    '<button id="iz-menu-btn" aria-label="Menu" aria-expanded="false">&#9776;</button>' +
    '<ul class="iz-nav-links" id="iz-nav-links">' +
      '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#about">About</a></li>' +
      '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">Services</a></li>' +
      '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#projects">Portfolio</a></li>' +
      '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#contact">Contact</a></li>' +
      '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/" class="iz-active">Blog</a></li>' +
    '</ul>' +
    '<a href="https://wa.me/923010482120?text=Hi%20Ibrar!%20Let%27s%20talk." class="iz-btn-talk" target="_blank" rel="noopener">' +
      '<i class="fab fa-whatsapp"></i> Let\'s Talk' +
    '</a>' +
  '</nav>' +
'</header>';

/* ── INJECT HEADER ── */
var existingIzHeader = document.getElementById('iz-header');
if (!existingIzHeader) {
  var oldHeader = document.querySelector('header');
  if (oldHeader) {
    oldHeader.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }
}

/* ── MOBILE MENU ── */
document.addEventListener('click', function(e) {
  var btn = document.getElementById('iz-menu-btn');
  var nav = document.getElementById('iz-nav-links');
  if (!btn || !nav) return;
  if (btn === e.target || btn.contains(e.target)) {
    var isOpen = nav.classList.toggle('iz-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  } else if (!nav.contains(e.target) && nav.classList.contains('iz-open')) {
    nav.classList.remove('iz-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '&#9776;';
  }
});

/* ── AUTHOR BIO BOX (injected before footer on blog posts only) ── */
var isBlogPost = window.location.pathname.indexOf('/Blogs/') !== -1 &&
                 window.location.pathname.split('/').pop() !== 'index.html' &&
                 window.location.pathname.split('/').pop() !== '';
if (isBlogPost && !document.getElementById('iz-author-bio')) {
  var authorHTML =
    '<div id="iz-author-bio" style="' +
      'font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;' +
      'max-width:860px;margin:48px auto 0;padding:28px 32px;' +
      'background:#111111;border:1px solid rgba(255,255,255,0.08);border-radius:14px;' +
      'display:flex;gap:22px;align-items:flex-start">' +
      '<div style="width:66px;height:66px;background:linear-gradient(135deg,#0070f3,#7928ca);' +
        'border-radius:50%;display:flex;align-items:center;justify-content:center;' +
        'font-size:24px;font-weight:800;color:#fff;flex-shrink:0">IZ</div>' +
      '<div>' +
        '<p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#888;margin:0 0 4px">Written by</p>' +
        '<h3 style="margin:0 0 8px;font-size:17px;font-weight:700;color:#fff">Ibrar Zahoor</h3>' +
        '<p style="margin:0 0 12px;font-size:14px;color:#888;line-height:1.65">' +
          'Ibrar Zahoor is an expert Shopify developer based in Lahore, Pakistan with 5+ years of experience ' +
          'building custom Shopify stores, Shopify Plus solutions, and e-commerce systems for clients in the ' +
          'USA, UK, Canada, and Australia. He specializes in Liquid theme development, conversion optimization, ' +
          'and Shopify SEO.' +
        '</p>' +
        '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/" ' +
          'style="font-size:13px;font-weight:600;color:#0070f3;text-decoration:none">' +
          'View Full Profile &rarr;' +
        '</a>' +
      '</div>' +
    '</div>';
  var contentEnd = document.querySelector('.content') || document.querySelector('main') || document.querySelector('article');
  if (contentEnd) {
    contentEnd.insertAdjacentHTML('afterend', authorHTML);
  }
}

/* ── FOOTER + CTA + WA FLOAT ── */
// Remove existing footer and inline WA float
var oldFooter = document.querySelector('footer');
if (oldFooter) oldFooter.remove();

document.querySelectorAll('a[href*="wa.me"]').forEach(function(a) {
  var s = a.getAttribute('style') || '';
  if (s.indexOf('fixed') !== -1) a.remove();
});

// Remove old bounce keyframes style blocks
document.querySelectorAll('style').forEach(function(s) {
  if (s.textContent.indexOf('keyframes bounce') !== -1) s.remove();
});

var bottomHTML =
'<section class="iz-build-cta">' +
  '<h2>Let\'s Build Something Great</h2>' +
  '<p>Ready to launch or scale your Shopify store? Expert development, SEO &amp; strategy &mdash; on time, on budget.</p>' +
  '<div class="iz-cta-btns">' +
    '<a href="https://wa.me/923010482120?text=Hi%20Ibrar!%20Let%27s%20build%20something%20great." class="iz-cta-wa" target="_blank" rel="noopener">' +
      '<i class="fab fa-whatsapp"></i> Chat on WhatsApp' +
    '</a>' +
    '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#contact" class="iz-cta-link">' +
      '<i class="fas fa-envelope"></i> Send a Message' +
    '</a>' +
  '</div>' +
'</section>' +
'<footer id="iz-footer">' +
  '<div class="iz-footer-grid">' +
    '<div>' +
      '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/" class="iz-footer-brand-row" style="text-decoration:none">' +
        '<div class="iz-footer-logo">IZ</div>' +
        '<span class="iz-footer-bname">Ibrar Zahoor</span>' +
      '</a>' +
      '<p class="iz-footer-desc">Professional Shopify developer helping businesses succeed online through custom development, strategic optimization, and data-driven solutions. Based in Lahore, Pakistan &mdash; serving clients worldwide.</p>' +
      '<div class="iz-footer-social">' +
        '<a href="https://github.com/ibrarzahoorr" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>' +
        '<a href="https://www.linkedin.com/in/ibrar-zahoor/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>' +
        '<a href="https://wa.me/923010482120" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>' +
      '</div>' +
    '</div>' +
    '<div>' +
      '<p class="iz-footer-col-head">Quick Links</p>' +
      '<ul class="iz-footer-col-list">' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#about">About</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">Services</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#projects">Portfolio</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#contact">Contact</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/">Blog</a></li>' +
      '</ul>' +
    '</div>' +
    '<div>' +
      '<p class="iz-footer-col-head">Services</p>' +
      '<ul class="iz-footer-col-list">' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">Custom Themes</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">Shopify Plus</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">App Development</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">Migration</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#shopify-services">SEO &amp; Performance</a></li>' +
        '<li><a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#contact">Consultation</a></li>' +
      '</ul>' +
    '</div>' +
  '</div>' +
  '<div class="iz-footer-bottom">' +
    '<p class="iz-footer-copy">&copy; 2026 Ibrar Zahoor &mdash; Expert Shopify Developer. All rights reserved.</p>' +
    '<div class="iz-footer-btm-links">' +
      '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/">Blog</a>' +
      '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/#contact">Contact</a>' +
      '<a href="https://ibrarzahoorr.github.io/Ibrar-Zahoor/sitemap.xml">Sitemap</a>' +
    '</div>' +
  '</div>' +
'</footer>' +
'<a href="https://wa.me/923010482120?text=Hi%20Ibrar!%20I%20need%20Shopify%20help." id="iz-wa-float" target="_blank" rel="noopener" title="Chat on WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>';

document.body.insertAdjacentHTML('beforeend', bottomHTML);

/* ── AI VISIBILITY: Person + WebSite + Service Schema (injected on every page) ── */
if (!document.getElementById('iz-person-schema')) {
  var personSchema = document.createElement('script');
  personSchema.id = 'iz-person-schema';
  personSchema.type = 'application/ld+json';
  personSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/#person",
        "name": "Ibrar Zahoor",
        "alternateName": ["Ibrar Zahoorr", "ibrarzahoorr"],
        "givenName": "Ibrar",
        "familyName": "Zahoor",
        "jobTitle": "Expert Shopify Developer & Marketplace Specialist",
        "description": "Ibrar Zahoor is an Expert Shopify Developer based in Lahore, Pakistan with 5+ years of experience. He delivers custom Shopify themes, Liquid programming, React.js applications, and marketplace solutions for clients in the USA, UK, UAE, Canada, Australia, Germany, Netherlands, Saudi Arabia, Singapore, and worldwide. He currently builds zarr.com.pk — ZARR by Jazz, Pakistan's digital marketplace backed by Jazz telecom.",
        "url": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/",
        "image": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/ibrar-zahoor.jpg",
        "nationality": "Pakistani",
        "sameAs": [
          "https://github.com/ibrarzahoorr",
          "https://www.linkedin.com/in/ibrar-zahoor/",
          "https://wa.me/923010482120"
        ],
        "knowsAbout": [
          "Shopify Development", "Shopify Plus", "Custom Shopify Themes",
          "Liquid Programming", "React.js", "Marketplace Development",
          "Technical SEO", "E-commerce Optimization", "Shopify App Development",
          "Shopify Migration", "Headless Commerce", "Core Web Vitals",
          "Conversion Rate Optimization", "Shopify Storefront API",
          "Shopify Admin API", "Schema Markup"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Shopify Developer",
          "skills": "Shopify, Liquid, React.js, JavaScript, HTML5, CSS3, SEO, Marketplace Development",
          "occupationLocation": {"@type": "City", "name": "Lahore", "addressCountry": "PK"}
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lahore",
          "addressRegion": "Punjab",
          "addressCountry": "PK"
        },
        "telephone": "+923010482120",
        "email": "ibrarzahoor0@gmail.com",
        "worksFor": [
          {"@type": "Organization", "name": "ZARR Official", "url": "https://zarr.com.pk"},
          {"@type": "Organization", "name": "Hanker"}
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/#website",
        "name": "Ibrar Zahoor - Expert Shopify Developer",
        "url": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/",
        "description": "Official portfolio of Ibrar Zahoor — Expert Shopify Developer from Lahore, Pakistan. Custom themes, Liquid programming, React.js, marketplace solutions for clients worldwide.",
        "publisher": {"@id": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/#person"},
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/Blogs/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/#service",
        "name": "Ibrar Zahoor — Shopify Development Services Worldwide",
        "provider": {"@id": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/#person"},
        "serviceType": ["Shopify Development","Custom Shopify Theme","Liquid Programming","React.js Development","Marketplace Development","Shopify SEO","Shopify Plus","E-commerce Consulting","Shopify Migration","Performance Optimization"],
        "areaServed": [
          {"@type":"Country","name":"United States"},
          {"@type":"Country","name":"United Kingdom"},
          {"@type":"Country","name":"Canada"},
          {"@type":"Country","name":"Australia"},
          {"@type":"Country","name":"New Zealand"},
          {"@type":"Country","name":"United Arab Emirates"},
          {"@type":"Country","name":"Saudi Arabia"},
          {"@type":"Country","name":"Kuwait"},
          {"@type":"Country","name":"Qatar"},
          {"@type":"Country","name":"Bahrain"},
          {"@type":"Country","name":"Oman"},
          {"@type":"Country","name":"Germany"},
          {"@type":"Country","name":"France"},
          {"@type":"Country","name":"Netherlands"},
          {"@type":"Country","name":"Belgium"},
          {"@type":"Country","name":"Switzerland"},
          {"@type":"Country","name":"Austria"},
          {"@type":"Country","name":"Sweden"},
          {"@type":"Country","name":"Denmark"},
          {"@type":"Country","name":"Norway"},
          {"@type":"Country","name":"Finland"},
          {"@type":"Country","name":"Ireland"},
          {"@type":"Country","name":"Spain"},
          {"@type":"Country","name":"Italy"},
          {"@type":"Country","name":"Poland"},
          {"@type":"Country","name":"Singapore"},
          {"@type":"Country","name":"Malaysia"},
          {"@type":"Country","name":"Philippines"},
          {"@type":"Country","name":"Japan"},
          {"@type":"Country","name":"South Korea"},
          {"@type":"Country","name":"India"},
          {"@type":"Country","name":"Pakistan"},
          {"@type":"Country","name":"Bangladesh"},
          {"@type":"Country","name":"South Africa"},
          {"@type":"Country","name":"Nigeria"},
          {"@type":"Country","name":"Kenya"},
          {"@type":"Country","name":"Brazil"},
          {"@type":"Country","name":"Mexico"},
          {"@type":"Country","name":"Argentina"},
          {"@type":"Country","name":"Turkey"},
          {"@type":"Country","name":"Egypt"},
          {"@type":"Country","name":"Israel"}
        ],
        "url": "https://ibrarzahoorr.github.io/Ibrar-Zahoor/",
        "telephone": "+923010482120",
        "email": "ibrarzahoor0@gmail.com",
        "description": "Expert Shopify development services by Ibrar Zahoor — custom themes, Liquid, React.js, marketplace builds, SEO, and Shopify Plus for clients in 40+ countries worldwide."
      }
    ]
  });
  document.head.appendChild(personSchema);
}

})();
