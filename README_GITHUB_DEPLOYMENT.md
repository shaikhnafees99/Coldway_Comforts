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

## Custom domain
Use `www.coldwaycomforts.com` as the GitHub Pages custom domain to match the site's canonical URLs and `CNAME` file. In GitHub repository settings, open Settings > Pages and set the custom domain to:

```text
www.coldwaycomforts.com
```

At BigRock, remove any existing `127.0.0.1` A records for `coldwaycomforts.com` or `www.coldwaycomforts.com`, then add these DNS records:

```text
@      A      185.199.108.153
@      A      185.199.109.153
@      A      185.199.110.153
@      A      185.199.111.153
www    CNAME  shaikhnafees99.github.io
```

After DNS propagation, `coldwaycomforts.com` should redirect to `www.coldwaycomforts.com`.
