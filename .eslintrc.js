module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
      ecmaVersion: 2021,
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "warn",
      "comma-dangle": ["error", "always-multiline"],
    },
};