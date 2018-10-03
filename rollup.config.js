import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import { uglify } from "rollup-plugin-uglify";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import pkg from "./package.json";

const input = "./src/index.js";

const external = id => !id.startsWith(".") && !id.startsWith("/");

const name = "ReactMailigen";

const globals = { react: "React" };

const getBabelOptions = ({ useESModules }) => ({
  runtimeHelpers: true,
  plugins: [
    ["@babel/plugin-transform-runtime", { useESModules }],
    "module:fast-async"
  ]
});

export default [
  {
    input,
    output: {
      file: "dist/react-mailigen.umd.js",
      format: "umd",
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      commonjs({
        include: "node_modules/**"
      }),
      babel(getBabelOptions({ useESModules: true })),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
      json(),
      sizeSnapshot()
    ]
  },

  {
    input,
    output: {
      file: "dist/react-mailigen.min.js",
      format: "umd",
      name,
      globals
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      commonjs({
        include: "node_modules/**"
      }),
      babel(getBabelOptions({ useESModules: true })),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      json(),
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  {
    input,
    output: { file: pkg.main, format: "cjs" },
    external,
    plugins: [babel(getBabelOptions({ useESModules: false })), sizeSnapshot()]
  },

  {
    input,
    output: { file: pkg.module, format: "es" },
    external,
    plugins: [babel(getBabelOptions({ useESModules: true })), sizeSnapshot()]
  }
];
