module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'simple-import-sort', '@getify/proper-ternary'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  overrides: [],
  rules: {
    curly: ['error', 'all'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'import/no-default-export': ['off'],
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'max-params': ['error', 3],
    'no-console': 'warn',
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-duplicate-imports': ['error', { includeExports: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': ['error', { allow: ['_id', '_SELF', '_BLANK'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
    'keyword-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          from: { before: true, after: true },
          else: { before: true, after: true },
          catch: { before: true, after: true },
          as: { before: true, after: true },
          finally: { before: true, after: true },
        },
      },
    ],
    'simple-import-sort/exports': ['error'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            // Side effect imports.
            '^\\u0000',
            '^@?\\w',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.*', '**/*.spec.*'] }],
    'no-unneeded-ternary': ['error'],
    '@getify/proper-ternary/where': [
      'error',
      {
        statement: false,
        return: false,
      },
    ],
    eqeqeq: 'error',
    'max-lines': [1, 180],
  },
  ignorePatterns: ['jest.config.js', 'scripts/lint-branch-name.js'],
};
