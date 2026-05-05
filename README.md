# Globelink Thailand Website

Modern bilingual React/Vite website for Globelink Thailand.

## Local preview

```bash
npm install
npm run dev
```

Open the local URL Vite prints in your terminal.

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Upload this folder to GitHub.
2. Go to Vercel > Add New Project.
3. Import the GitHub repository.
4. Use these settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click Deploy.

## Updating assets

Replace these files in `/public`:

- `globelink-logo.png`
- `world-map-with-labels.svg`

Keep the same filenames and the code will use the new files automatically.

## Updating page background images

In `src/App.tsx`, edit the `PAGE_IMAGES` object. You can use external image URLs or local paths like `/images/home.jpg`.

For production stability, local files in `/public/images` are recommended.
