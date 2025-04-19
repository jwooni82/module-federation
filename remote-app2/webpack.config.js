const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3002,
    historyApiFallback: true,
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
    new ModuleFederationPlugin({
      name: 'remoteApp2',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/RemoteApp',
        './BigComponent': './src/BigComponent',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-redux': { singleton: true, eager: true, requiredVersion: '^9.1.0' },
        redux: { singleton: true, eager: true, requiredVersion: '^5.0.1' },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: '^6.20.0' },
        antd: { singleton: true, eager: true, requiredVersion: '^5.0.0' },
        'styled-components': { singleton: true, eager: true, requiredVersion: '^6.0.0' }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};