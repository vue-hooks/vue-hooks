module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/test-utils/**',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
};
