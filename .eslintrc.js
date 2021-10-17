module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  extends: ['eslint-config-tencent', 'eslint-config-tencent/ts'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'import/no-dynamic-require': 'off',
    '@typescript-eslint/semi': 'error',
    'eol-last': ['error', 'always'],
  },
};
