const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3000,
  },
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'hostApp',
      filename: 'hostEntry.js',
      exposes: {
        './store': './src/store/index.js',
        './actions': './src/store/counter/actions.js',
      },
      // remotes: {
      //   remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      // },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-redux': { singleton: true, eager: true, requiredVersion: '^9.1.0' },
        redux: { singleton: true, eager: true, requiredVersion: '^5.0.1' },
        'redux-saga': { singleton: true, eager: true, requiredVersion: '^1.3.0' }
      },
    }),
  ],
};