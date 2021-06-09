module.exports = {
  name: "unit",
  displayName: "unit",
  rootDir: "./../../",
  moduleFileExtensions: ["js"],
  testMatch: ["<rootDir>/__tests__/unit/**/*.(test|spec).js"],
  collectCoverageFrom: ["src/**/*.js"],
  moduleDirectories: ["src", "node_modules"],
};
