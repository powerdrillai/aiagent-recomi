module.exports = {
  env: {
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "unused-imports", "simple-import-sort"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "import/extensions": "off", // Avoid missing file extension errors, TypeScript already provides a similar feature
    "react/destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    "react/require-default-props": "off", // Allow non-defined react props as undefined
    "react/jsx-props-no-spreading": "off", // _app.tsx uses spread operator and also, react-hook-form
    "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
    "@typescript-eslint/consistent-type-imports": "off", // Ensure `import type` is used when it's necessary
    "import/prefer-default-export": "off", // Named export is easier to refactor automatically
    "simple-import-sort/imports": "error", // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "error", // Export configuration for `eslint-plugin-simple-import-sort`
    "import/order": "off", // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: [
    "scripts/",
    "config/",
    "public/",
    "mock/",
    "node_modules/",
    "**/dist/**/* ",
    "coverage/",
    "es/",
    "lib/",
    "**/*.min.js",
    "**/*-min.js",
    "**/*.bundle.js",
  ],
};
