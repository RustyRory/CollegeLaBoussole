// eslint.config.cjs
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");

/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  // Ignorer les dossiers build/node_modules
  {
    ignores: ["node_modules/**", "dist/**"],
  },

  // JS/TS de base
  {
    files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
      globals: {
        NodeJS: true,
        browser: true,
      },
    },
    rules: {
      "no-console": "warn",
    },
  },

  // Typescript
  {
    files: ["*.ts", "*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // React
  {
    files: ["*.jsx", "*.tsx"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/prop-types": "off",
    },
  },
];
