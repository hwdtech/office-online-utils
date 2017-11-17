module.exports = {
  plugins: ['node', 'prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  env: {
    node: true,
    jest: true
  },
  rules: {
    "node/exports-style": ['error', 'module.exports'],
    'prettier/prettier': 'error'
  }
};
