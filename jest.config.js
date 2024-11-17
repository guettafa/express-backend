/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  globalTeardown: "./tests/teardown.ts",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};