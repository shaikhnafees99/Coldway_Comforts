# Coldway Comforts Website — GitHub Build & Deploy Guide

This project is ready for GitHub Pages deployment using GitHub Actions.

## What is included

- `.github/workflows/deploy.yml` — automatic build and deploy workflow
- `` — complete static website folder
- `sitemap.xml` — large SEO sitemap
- `robots.txt` — crawler instructions
- `.nojekyll` is created during deployment so GitHub Pages serves the static files directly

## How to deploy

1. Create a new GitHub repository, for example: `coldway-comforts-website`.
2. Upload the full project exactly as provided in this ZIP.
3. Make sure the folder structure stays like this:

```text
.github/workflows/deploy.yml
index.html
sitemap.xml
robots.txt
```

4. Commit and push the files to the `main` branch.
5. Open your GitHub repository.
6. Go to **Settings → Pages**.
7. Under **Build and deployment**, select **GitHub Actions**.
8. Go to the **Actions** tab and run/check the workflow named **Build and Deploy Coldway Comforts Website**.
9. After the workflow completes, GitHub will show the live website URL.

## Custom domain setup

When the final domain is available, update these files before pushing live:

- `sitemap.xml`
- `robots.txt`

Replace the temporary/local URLs with the final website domain, for example:

```text
https://coldwaycomforts.com/
```

Then add your domain in **GitHub → Settings → Pages → Custom domain**.

## Important SEO note

The website has a strong local SEO page structure and a large sitemap, but first-page Google ranking cannot be guaranteed only by uploading pages. For ranking, the project should also include Google Search Console setup, sitemap submission, indexing requests, Google Business Profile optimization, local citations, backlinks, reviews, and ongoing content improvements.
