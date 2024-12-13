module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: "readonly",
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/strict-boolean-expressions": "off",
    // "@typescript-eslint/triple-slash-reference": "off",
    "no-void": "off",
    "react/display-name": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
};
