import os
import glob

def process_files():
    search_dir = r"c:\Users\ibrar\Downloads\Ibrar Zahoor\Ibrar-Zahoor"
    html_files = glob.glob(os.path.join(search_dir, "**", "*.html"), recursive=True)
    
    css_old = ".brand-logo{width:40px;height:40px;border-radius:10px;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:18px;transition:transform .3s;flex-shrink:0}"
    css_new = ".brand-logo{padding:0 12px;height:40px;border-radius:10px;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:16px;transition:transform .3s;flex-shrink:0;letter-spacing:1px;white-space:nowrap}"
    
    logo_old = '<div class="brand-logo">IZ</div>'
    logo_new = '<div class="brand-logo">IBRAR ZAHOOR</div>'
    
    favicon_old1 = 'favicon.png'
    favicon_new1 = 'favicon.svg'
    favicon_old2 = 'type="image/png"'
    favicon_new2 = 'type="image/svg+xml"'

    count = 0
    for file_path in html_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = content
        
        # Replace CSS
        new_content = new_content.replace(css_old, css_new)
        
        # Replace Logo
        new_content = new_content.replace(logo_old, logo_new)
        
        # Replace Favicon
        new_content = new_content.replace(favicon_old1, favicon_new1)
        new_content = new_content.replace(favicon_old2, favicon_new2)
        
        if content != new_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            count += 1
            
    print(f"Updated {count} HTML files.")

if __name__ == "__main__":
    process_files()
