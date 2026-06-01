module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'eslint-config-prettier',
    "plugin:astro/recommended",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: "./tsconfig.json"
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": ["error", {
      allowExpressions: true
    }],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      }
    }
  ]
}