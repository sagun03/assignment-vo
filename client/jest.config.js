const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/tailwind.config.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true, // Enable coverage
  collectCoverageFrom: [
    "**/*.{ts,tsx}",  // Include all TypeScript files
    "!**/node_modules/**", // Exclude node_modules
    "!**/.next/**", // Exclude Next.js build output
    "!**/coverage/**", // Exclude coverage reports
    "!jest.config.js", // Exclude Jest config
    "!jest.setup.ts", // Exclude Jest setup
    "!**/components/ui/**", // Exclude UI components
    "!**/app/**", // Exclude UI components
    "!**/hooks/**", // Exclude UI components
    "!**.ts", // Exclude Tailwind config
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};

module.exports = createJestConfig(customJestConfig);
