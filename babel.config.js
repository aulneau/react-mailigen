module.exports = {
  presets: [["@babel/env", { loose: true }], "@babel/react"],
  plugins: [["@babel/plugin-proposal-class-properties", { loose: true }], 'module:fast-async']
};
