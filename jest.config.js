/** @jest-environment node */
module.exports = {
  projects: [
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/**/*.(test|spec).js?(x)'],
    },
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/**/*.(test|spec).js'],
    },
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/dist/', '/build/', '/coverage/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  verbose: true,
};
