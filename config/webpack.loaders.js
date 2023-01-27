/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = (env) => {
  const isProduction = env.production;

  // Javascript loaders
  const js = {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  };

  // Typescript
  const typescript = {
    test: /\.tsx?$/,
    exclude: [/node_modules\/(?!(@platform-videoZ)\/).*/],
    use: [
      {
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
          compilerOptions: {
            target: 'ES2019',
          },
        },
      },
    ],
  };

  // HTML
  const html = {
    test: /\.ejs$/i,
    use: [{
      loader: 'html-loader',
      options: {
        minimize: false,
      },
    }, {
      loader: 'template-ejs-loader',
      options: {
        root: path.join(__dirname, '../src/'),
      },
    }],
  };

  // Images
  const images = {
    test: /\.(gif|png|jpe?g|svg)$/i,
    type: 'asset/resource',
    exclude: [/content/, /favicon/, /contacts/],
    generator: {
      filename: isProduction ? 'assets/[path][name][ext]' : 'img/[name].[contenthash][ext]',
    },
  };

  return [
    typescript,
    js,
    html,
    images,
  ].filter(Boolean);
};
