import { join } from "node:path";
import { defineConfig } from "vite";

const root = process.cwd();
const srcDir = join(root, "src");

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: "import {h, Fragment} from 'reactfree-jsx';"
  },
  resolve: {
    alias: {
      "$src": srcDir,
      "$client": join(srcDir, "client"),
      "$components": join(srcDir, "client", "components")
    }
  }
});