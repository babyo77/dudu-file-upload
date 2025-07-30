import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import tailwindcssPlugin from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const packageJson = require("./package.json");

const config = {
  input: "src/components/file-upload/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.lib.json",
      exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"],
    }),
    postcss({
      extract: "style.css",
      minimize: true,
      plugins: [
        tailwindcssPlugin({ config: "./tailwind.config.lib.js" }),
        autoprefixer(),
      ],
      config: false,
      inject: false,
    }),
    terser(),
  ],
  external: ["react", "react-dom"],
};

export default config;
