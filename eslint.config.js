import globals from "globals";
import pluginTypeScriptEslint from "@typescript-eslint/eslint-plugin";
const tsParser = await import("@typescript-eslint/parser");
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    name: "typescript-eslint-config",
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    ignores: ["dist", ".eslintrc.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parser: tsParser.default,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
      "@typescript-eslint": pluginTypeScriptEslint,
    },
    rules: {
      // MUI bundle size optimization
      "@typescript-eslint/no-restricted-imports": [ // https://mui.com/material-ui/guides/minimizing-bundle-size/
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],
      "no-magic-numbers": "off",
      "one-var": "off",
      "sort-imports": "off",
      "sort-keys": "off",
      "id-length": "off",
      "line-comment-position": "off",
      "func-style": "off",
      "capitalized-comments": "off",
      "prefer-template": "off",
      "no-ternary": "off",
      "no-inline-comments": "off",
      "no-undefined": "off",
      "init-declarations": "off",
      "no-useless-constructor": "off",
      "max-classes-per-file": "off",
      "prefer-destructuring": "off",
      "prefer-named-capture-group": "off",
      "multiline-comment-style": "off",
      "no-empty-function": "off",
      "no-console": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
