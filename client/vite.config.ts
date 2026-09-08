import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Money Manager",
        short_name: "MMA",
        description: "Track your money",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/dashboard",
        icons: [
          {
            src: "./pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
    }),
  ],
  server: {
    host: true,
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8080", // your backend server
    //     changeOrigin: true,
    //     secure: false,
    //     // optional: strip /api prefix before forwarding
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
