import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs"; // Add this line

export default defineConfig({
  plugins: [react(), commonjs()],
  // ... other Vite configuration
});
