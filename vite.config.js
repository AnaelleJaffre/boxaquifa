import { defineConfig } from "vite";

export default defineConfig({
  base: "/boxaquifa/",
  build: {
    chunkSizeWarningLimit: 3000
  }
});