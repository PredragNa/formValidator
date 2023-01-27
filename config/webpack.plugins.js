/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const isProduction = env.production;

  // HTML generation
  const generateHTMLPlugins = () => glob.sync('./src/**/*.ejs', { ignore: ['./src/partials/**/*.ejs'] }).map((dir) => {
    const filename = path.basename(dir).split('.')[0];
    const filePath = dir.split('.').reduce(
      (a, c, i, array) => (i === 0 || array.length - 1 === i ? a : [...a, c]),
      [],
    );

    return new HTMLWebpackPlugin({
      filename: `${filename}.html`,
      template: path.join(__dirname, `..${filePath}.ejs`),
      minify: false,
      viewport: 'width=device-width,initial-scale=1',
    });
  });

  // Extract CSS style into separate file
  const css = new MiniCssExtractPlugin({
    filename: isProduction ? 'assets/css/app.css' : 'app.[contenthash].css',
  });

  // Eslint
  const eslint = new ESLintPlugin();

  // Stylelint
  const styleLint = new StylelintWebpackPlugin();

  // Define global config variables
  const globalConfig = new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: !!isProduction,
  });

  // Moment lolcale
  const momentLocale = new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /us|se/);

  // Bundle analyzer
  const analyzer = isProduction ? null : new BundleAnalyzerPlugin();

  return [
    globalConfig,
    ...(generateHTMLPlugins()),
    css,
    eslint,
    styleLint,
    momentLocale,
    analyzer,
  ].filter(Boolean);
};
