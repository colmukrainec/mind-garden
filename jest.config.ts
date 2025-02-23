export default {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }], // Transforms TypeScript files
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{.spec.ts,.spec.tsx}", "!src/**/*.d.ts"],
  coverageReporters: ["json", "lcov", "text", "clover"],
}