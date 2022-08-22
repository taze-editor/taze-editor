import fs from "fs";
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import includePaths from "rollup-plugin-includepaths";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const PACKAGE_ROOT_PATH = process.cwd();

const INPUT_FILE_PATH = path.join(PACKAGE_ROOT_PATH, "src/index.ts");

const INPUT_FILE = fs.existsSync(INPUT_FILE_PATH)
  ? INPUT_FILE_PATH
  : path.join(PACKAGE_ROOT_PATH, "src/index.tsx");

const PKG_JSON = require(path.join(PACKAGE_ROOT_PATH, "package.json"));

const babelConfig = require("./babel.config");

const isUmd = false;

const includePathOptions = {
  include: {},
  paths: [path.join(PACKAGE_ROOT_PATH, "src")],
  external: [],
  extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
};

export default [
  {
    input: INPUT_FILE,
    external: [
      ...Object.keys(PKG_JSON.dependencies || {}),
      ...Object.keys(PKG_JSON.peerDependencies || {})
    ],
    output: [
      {
        file: PKG_JSON.main,
        name: PKG_JSON.name,
        format: "cjs",
        sourcemap: true
      },
      {
        file: PKG_JSON.module,
        name: PKG_JSON.name,
        format: "es",
        sourcemap: true
      }
    ],
    plugins: [
      external(),
      includePaths(includePathOptions),
      resolve({
        browser: true
        // modulesOnly: true,
      }),
      commonjs(),
      json(),
      builtins(),
      babel({
        presets: [
          ...babelConfig.presets,
          [
            "@babel/preset-env",
            {
              modules: false,
              targets: {
                node: "current"
              }
            }
          ]
        ],
        plugins: [
          ...babelConfig.plugins,
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
          "babel-plugin-dynamic-import-node",
          ["inline-json-import", {}]
        ],
        extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
        exclude: /node_modules/,
        runtimeHelpers: true
      }),
      globals(),
      // Only minify the output in production, since it is very slow. And only
      // for UMD builds, since modules will be bundled by the consumer.
      isUmd && terser()
    ],
    watch: {
      include: "src/**"
    }
  }
];
