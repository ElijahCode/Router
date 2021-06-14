module.exports = {
  collectCoverage: true,

  coverageProvider: "v8",

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "d.ts", "tsx", "node"],
};
