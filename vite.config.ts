import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Adjust base for GitHub Pages deployment
  base: "/login",  // Set the base path to the repository name

  build: {
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1 MB
  },

  server: {
    open: true,
    port: 3000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
