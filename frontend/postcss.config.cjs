module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env', { browsers: ['last 2 versions', '> 5%'] }),
    require('cssnano'),
  ],
};
