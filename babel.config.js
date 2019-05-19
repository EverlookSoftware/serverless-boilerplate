module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    'lodash',
    'transform-promise-to-bluebird',
    '@babel/plugin-transform-runtime',
  ],
};
