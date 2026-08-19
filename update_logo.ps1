$searchDir = "c:\Users\ibrar\Downloads\Ibrar Zahoor\Ibrar-Zahoor"
$htmlFiles = Get-ChildItem -Path $searchDir -Filter "*.html" -Recurse

$cssOld = ".brand-logo{width:40px;height:40px;border-radius:10px;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:18px;transition:transform .3s;flex-shrink:0}"
$cssNew = ".brand-logo{padding:0 12px;height:40px;border-radius:10px;align-items:center;justify-content:center;font-weight:800;color:#fff;font-size:16px;transition:transform .3s;flex-shrink:0;letter-spacing:1px;white-space:nowrap}"

$logoOld = '<div class="brand-logo">IZ</div>'
$logoNew = '<div class="brand-logo">IBRAR ZAHOOR</div>'

$faviconOld1 = 'favicon.png'
$faviconNew1 = 'favicon.svg'
$faviconOld2 = 'type="image/png"'
$faviconNew2 = 'type="image/svg+xml"'

$count = 0

foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $newContent = $content.Replace($cssOld, $cssNew).Replace($logoOld, $logoNew).Replace($faviconOld1, $faviconNew1).Replace($faviconOld2, $faviconNew2)
    
    if ($content -cne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        $count++
    }
}

Write-Host "Updated $count HTML files."
