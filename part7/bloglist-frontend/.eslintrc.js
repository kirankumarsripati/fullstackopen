module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    'jest/globals': true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'no-console': 0,
    'semi': [
      'error',
      'never'
    ],
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    // There is no problem with Linux or Mac, but Windows giving 'LF' 'CRLF' error
    'linebreak-style': 0,
    'react/forbid-prop-types': 0,
    'no-alert': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-one-expression-per-line': 0,
  },
};
