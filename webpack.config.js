const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const production = process.env.NODE_ENV === 'production';
let mode = 'development';
let target = 'web';

const plugins = [
  new CopyPlugin({
    patterns: [{ from: 'src/images', to: 'images' }]
  }),
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new MiniCssExtractPlugin({
    filename: production ? '[name].[contenthash].css' : '[name].css'
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      collapseWhitespace: production
    }
  }),
  new Dotenv()
];

if (production) {
  mode = 'production';
  target = 'browserslist';
}

module.exports = {
  mode: mode,

  entry: './src/index.js',

  output: {
    filename: production ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
            // options: { publicPath: '' },
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: 'images',
              emitFile: true
            }
          }
        ]
      },
      // {
      // 	test: /\.(png|jpe?g|gif|svg)$/i,
      // 	type: 'asset',
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
  },

  plugins: plugins,

  target: target,

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    hot: true,
    open: true,
    compress: true,
    port: 3000
  }
};
