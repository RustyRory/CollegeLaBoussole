// eslint.config.mts
import { defineConfig } from "eslint/config";

export default defineConfig([
  // -------------------------------
  // Ignorer les fichiers/dossiers
  // -------------------------------
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      ".venv",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
    ],
  },

  // -------------------------------
  // JS / TS / React / Next.js
  // -------------------------------
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@next/next/recommended",
      "prettier",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // -------------------------------
  // JSON
  // -------------------------------
  {
    files: ["**/*.json"],
    language: "json/json",
    extends: ["plugin:json/recommended"],
  },

  // -------------------------------
  // Markdown
  // -------------------------------
  {
    files: ["**/*.md"],
    language: "markdown/markdown",
    extends: ["plugin:markdown/recommended"],
  },

  // -------------------------------
  // CSS
  // -------------------------------
  {
    files: ["**/*.css"],
    language: "css/css",
    extends: ["plugin:css/recommended"],
  },
]);
