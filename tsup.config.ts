import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Output both CommonJS and ES Module formats
  dts: true, // Generate type definitions
  splitting: false,
  sourcemap: true,
  clean: true, // Clean output directory before each build
  external: ["react", "react-dom", "framer-motion"],
});
