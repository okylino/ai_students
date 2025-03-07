module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: 'tsconfig.app.json',
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:promise/recommended',
    'plugin:compat/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:diff/staged',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'import', 'react', 'promise', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'import/order': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', 'jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports.
          ['^\\u0000'],
          // 2. Node.js builtins prefixed with `node:`.
          ['^node:'],
          // 3. Packages (third-party modules).
          ['^@?\\w'],
          // 4. Absolute imports, including `@fishing_cat` and `@/` style imports.
          ['^@fishing_cat', '^@/'],
          // 5. Relative imports.
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'promise/catch-or-return': 'off',
    'promise/always-return': ['error', { ignoreLastCallback: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*src/redux/slices/*.{js,ts}'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
    {
      files: ['*src/enums/*.ts', '*src/api/services/*.ts', '*src/utils/*.ts', '*src/**/*.style.ts'],
      rules: { 'import/prefer-default-export': 'off' },
    },
  ],
};
