module.exports = {
  root: true,
  env: { browser: true, es2020: true, Node: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
