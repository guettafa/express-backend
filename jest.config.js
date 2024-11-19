/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  collectCoverage: true,
  coverageDirectory: "./tests/coverage/",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  globalTeardown: "./tests/teardown.ts",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

jest.setTimeout(30000)