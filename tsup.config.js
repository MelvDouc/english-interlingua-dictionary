// @ts-check

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server/index.ts"],
  outDir: "dist/server",
  bundle: true,
  format: "esm",
  minify: true,
  treeshake: true
});