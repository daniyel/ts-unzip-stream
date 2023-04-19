module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 70],
    'scope-case': [2, 'always', 'upper-case'],
  },
};
