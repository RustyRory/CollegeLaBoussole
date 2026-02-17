// eslint.config.mts
import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "package-lock.json",
      "pnpm-lock.yaml",
      "yarn.lock",
      "node_modules",
      ".venv",
    ],
  },

  // Bloc JS/TS/React
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
    },
    plugins: {
      js,
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Bloc JSON
  {
    files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },

  // Markdown
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"],
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
