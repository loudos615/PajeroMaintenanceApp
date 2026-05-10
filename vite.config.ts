import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: "autoUpdate",
      manifest: false,
      includeAssets: [
        "manifest.webmanifest",
        "icons/icon-192.png",
        "icons/icon-512.png",
        "icons/apple-touch-icon.png"
      ],
      workbox: {
        globPatterns: ["**/*.{js,css,html,json,png,svg,ico,wasm}"],
        navigateFallback: "index.html",
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.endsWith("/maintenance_items.json") || url.pathname.endsWith("/maintenance_items_v10.json"),
            handler: "CacheFirst",
            options: {
              cacheName: "pajero-maintenance-seed",
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 365 * 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: /^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com)\/.*(tesseract|traineddata|worker|wasm)/i,
            handler: "CacheFirst",
            options: {
              cacheName: "pajero-ocr-assets",
              expiration: {
                maxEntries: 24,
                maxAgeSeconds: 365 * 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
