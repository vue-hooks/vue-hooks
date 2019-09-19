const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:jest/recommended',
    'airbnb-base',
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/prefer-default-export': 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: {
    files: ['packages/test-utils/**/*.ts', '**/*.test.ts'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
};
