module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  globals: {},
  plugins: ["unicorn", "jest", "prettier", "jsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:jsdoc/recommended",
    "plugin:jest/all",
    "plugin:prettier/recommended",
    "plugin:unicorn/recommended",
  ],
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 2019,
  },
  ignorePatterns: ["docs/", "dist/"],
  settings: {},
  rules: {
    "jsdoc/require-jsdoc": [
      1,
      {
        require: {
          FunctionExpression: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    "no-var": ["error"],
    "linebreak-style": ["error", "unix"],
    "unicorn/prevent-abbreviations": ["off"],
  },
};
