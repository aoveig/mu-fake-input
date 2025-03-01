import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "MuFakeInput",
      fileName: "mu-fake-input"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
