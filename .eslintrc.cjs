module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    'eslint:all',
    "preact",
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn', {allowConstantExport: true},
    ],
    "no-restricted-imports": [ // https://mui.com/material-ui/guides/minimizing-bundle-size/
      "error", {
        "patterns": ["@mui/*/*/*"]
      }
    ],
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'id-length': 'off',
    'line-comment-position': 'off',
    'func-style': 'off',
    'capitalized-comments': 'off',
    'prefer-template': 'off',
    'no-ternary': 'off',
    'no-inline-comments': 'off',
    'no-undefined': 'off',
    'init-declarations': 'off',
    'no-useless-constructor': 'off',
    'max-classes-per-file': 'off',
    'prefer-destructuring': 'off',
    'prefer-named-capture-group': 'off',
    'multiline-comment-style': 'off',
    'max-params': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 'warn',
    'no-plusplus': 'off',
    'max-lines-per-function': [
      'error', {
        max: 100,
      },
    ],
    'max-statements': [
      'error', {
        max: 20,
      }
    ],
    'no-console': 'warn',
  }
}
