module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': 'vuetify',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'never'],
    'vuetify/no-legacy-grid': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [{
    'files': '*',
    'excludedFiles': '*.*.sql'
  }]
}
