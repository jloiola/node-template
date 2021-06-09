module.exports = {
  name: "integration",
  displayName: "integration",
  rootDir: "./../../",
  moduleFileExtensions: ["js"],
  testMatch: ["<rootDir>/__tests__/integration/*.(test|spec).(js)"],
  collectCoverageFrom: ["src/**/*.js"],
  moduleDirectories: ["src", "node_modules"],
};
