/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
	host:true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // your backend server
        changeOrigin: true,
        secure: false,
        // optional: strip /api prefix before forwarding
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
