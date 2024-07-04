/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      assets: path.resolve("src/assets/"),
      components: path.resolve("src/components/"),
      context: path.resolve("src/context/"),
      hooks: path.resolve("src/hooks/"),
      pages: path.resolve("src/pages/"),
      routes: path.resolve("src/routes/"),
      layouts: path.resolve("src/layout/"),
    },
  },
});
