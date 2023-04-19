module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  arrowParens: 'always',
  overrides: [
    {
      files: ['*.yml'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
