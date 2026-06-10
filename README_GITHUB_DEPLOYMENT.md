# Coldway Comforts GitHub Pages Deployment

This package is ready for GitHub Pages. Upload the contents of this ZIP directly into the repository root, not inside an extra folder.

## Important
The website must contain these folders/files at repo root:
- index.html
- 404.html
- assets/style.css
- assets/script.js
- assets/coldway-comforts-logo.png
- service/
- area/
- local/
- sitemap.xml
- robots.txt
- .github/workflows/deploy.yml

## Steps
1. Extract the ZIP.
2. Upload all extracted files and folders to your GitHub repository root.
3. Go to Settings > Pages.
4. Select GitHub Actions as the build/deploy source.
5. Commit and push.

This version uses relative asset paths, so CSS, logo, JavaScript and inner pages will load properly on both username.github.io and project GitHub Pages URLs.
