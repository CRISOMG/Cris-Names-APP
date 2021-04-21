const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { HotModuleReplacementPlugin } = require('webpack');
// const { DllPlugin, DllReferencePlugin } = require('webpack');
const { DllPlugin } = require('webpack');
const { EnvironmentPlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

const alias = {
  '@': path.resolve(__dirname, 'src'),
  '@styles': path.resolve(__dirname, 'src/styles/'),
  '@store': path.resolve(__dirname, 'src/store/'),
};

const dllConfig = {
  name: 'dll-config',
  mode: 'production',
  entry: {
    vendor: ['react', 'react-router-dom', 'redux', 'redux-thunk', 'react-redux', 'prop-types', 'react-dom', 'styled-components'],
  },
  output: {
    path: path.resolve(__dirname, 'public/dll'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: '[name]_library',
  },
  plugins: [
    new DllPlugin({
      name: '[name]_library',
      context: __dirname,
      path: path.resolve(__dirname, 'public/dll/manifest.json'),
    }),
  ],
};

const buildConfig = {
  name: 'build-config',
  mode: 'production',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public', 'src'),
    filename: '[name].[hash].js',
    publicPath: '/src/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    // new DllReferencePlugin({
    //   context: __dirname,
    //   manifest: path.resolve(__dirname, 'public/dll/manifest.json'),
    // }),
    new EnvironmentPlugin(['API_URL']),
    new HtmlWebpackPlugin({
      template: './template.html',
      filename: '../index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
};

const devConfig = {
  name: 'dev-config',
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    publicPath: '/',
  },
  devServer: {
    // hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'template.dev.html',
    }),
    new MiniCssExtractPlugin(),
    // new HotModuleReplacementPlugin(),
  ],
};

module.exports = [dllConfig, buildConfig, devConfig];
