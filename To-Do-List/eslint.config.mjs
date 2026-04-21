import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // 👈 Matches your <script type="module">
      globals: {
        ...globals.browser, // 👈 Tells ESLint about window, document, localStorage, etc.
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
      "prefer-const": "warn",
    },
  },
];