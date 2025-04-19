const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    port: 3002,
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
      name: 'remoteApp2',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteCounter': './src/RemoteCounter',
        './BigComponent': './src/BigComponent',
        './RemoteApp': './src/RemoteApp'
      },
      remotes: {
        hostApp: 'hostApp@http://localhost:3000/hostEntry.js',
      },
      //eager: false (기본값)	해당 모듈을 런타임에서 필요할 때 로딩 (지연 로딩, lazy loading)
      //eager: true	해당 모듈을 즉시 로딩 → remoteEntry.js에 바로 포함됨
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        antd: { singleton: true, eager: true, requiredVersion: '^5.0.0' },
        'styled-components': { singleton: true, eager: true, requiredVersion: '^6.0.0' },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: '^6.20.0' }
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8890,
      openAnalyzer: true,
    }),
  ],
};