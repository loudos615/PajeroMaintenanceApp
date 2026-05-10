# Pajero Maintenance

Offline-first Progressive Web App for one vehicle:

- Mitsubishi Pajero III / Montero / Shogun Gen 3
- Year: 2001
- Model code: V78W
- Engine: 4M41 3.2 Di-D
- Transmission: automatic V5A51
- VIN: stored in app settings

This is a private local tracker, not a generic vehicle maintenance service. It has no backend, login, analytics, cloud storage, or remote database. Service records, odometer readings, profile settings, imports, and exports stay in the browser's IndexedDB on the device.

## Data

The active seed maintenance database is stored at:

```text
src/data/maintenance_items_v17_parts_checklist.json
```

The app uses this local JSON for vehicle identity data, recommended intervals, official interval references, parts, fluids, capacities, replacement checklists, and practical service notes.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

To verify the production build:

```bash
npm run build
npm run preview
```

## Offline And OCR Notes

The app shell and local maintenance database are cached by the service worker after the first successful load. Manual odometer entry and saved service history work offline once the app has loaded.

Odometer OCR uses Tesseract.js in the browser. The app caches common Tesseract worker/core/language asset URLs when they are fetched, but the first OCR run may still need network access depending on how Tesseract resolves its assets in the installed package and browser. After those assets are fetched and cached, OCR is intended to keep working without another network request. Manual odometer entry always remains available.

## Deploy To GitHub Pages

1. Push this project to GitHub.
2. In the repository settings, enable GitHub Pages with GitHub Actions as the source.
3. Push to `main` or `master`, or run the `Deploy to GitHub Pages` workflow manually.
4. The workflow installs dependencies with `npm ci`, builds with `npm run build`, and deploys `dist`.

`vite.config.ts` sets the base path from `GITHUB_REPOSITORY`, so the built app works under a repository path like `/PajeroMaintenanceApp/`.

## Install On iPhone

1. Open the deployed GitHub Pages URL in Safari.
2. Wait for the app to load once while online.
3. Tap Share.
4. Tap Add to Home Screen.
5. Open Pajero Maintenance from the home screen.

Camera OCR requires HTTPS, camera permission, and Safari support for `getUserMedia`. If camera access fails, use the photo fallback or manual odometer entry.
