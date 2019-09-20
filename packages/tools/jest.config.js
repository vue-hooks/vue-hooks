module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'packages/*/src/**/*.ts',
    '!packages/test-utils/**',
    '!**/lib/**',
    '!**/node_modules/**',
  ],
};
