module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  rules: {
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'react/prop-types': [1],
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'react/react-in-jsx-scope': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-duplicates': 1,
    'no-undef': 1,
  },
};
