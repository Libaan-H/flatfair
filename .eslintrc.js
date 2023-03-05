module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest'
  },
  rules: {}
}
