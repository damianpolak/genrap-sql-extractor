module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  plugins: ['@typescript-eslint', 'prettier'],
};
