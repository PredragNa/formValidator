const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = (env) => {
  const isProduction = env.production;

  return {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        // Force all modules to use the same jquery version.
        jquery: path.join(__dirname, '../node_modules/jquery/src/jquery'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    context: path.join(__dirname, '../src'),
    entry: {
      main: [path.resolve(__dirname, '../src/javascript/index.ts'), path.resolve(__dirname, '../src/stylesheets/app.scss')],
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: isProduction ? 'assets/js/[name].js' : '[name].[contenthash].js',
      publicPath: '/',
      assetModuleFilename: isProduction ? '[path][name][ext]' : '[path][name].[contenthash][ext]',
    },
    module: {
      rules: loaders(env),
    },
    plugins: plugins(env),
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      historyApiFallback: true,
      static: {
        directory: isProduction
          ? path.join(__dirname, '../dist') : path.join(__dirname, '../src'),
        watch: true,
      },
      port: 3000,
      host: 'localhost',
      open: true,
      compress: true,
      hot: true,
    },
    devtool: isProduction ? 'source-map' : 'source-map',
  };
};
