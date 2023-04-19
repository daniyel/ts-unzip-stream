const config = {
  preset: 'ts-jest',
  verbose: true,
  roots: ['./src'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/utils'],
  coverageReporters: ['json', 'lcov', 'html'],
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests__/utils'],
};

module.exports = config;
