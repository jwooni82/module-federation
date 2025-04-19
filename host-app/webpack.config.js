const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
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
      name: 'hostApp',
      filename: 'hostEntry.js',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
        remoteApp2: 'remoteApp2@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        './store': './src/store',
        './store/context': './src/store/context',
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: true,
    }),
  ],
};