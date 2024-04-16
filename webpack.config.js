const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-v3-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');


const path = require('path');

module.exports = function(env, argv) {

  return {
    entry: ['./src/assets/scripts/main.js', './src/assets/styles/_main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    performance: {
      hints: false
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    optimization: {
        minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: true
        }),
        new OptimizeCSSAssetsPlugin({})//Compiles Sass to CSS and minifies.
        ]
    },
    stats: {
      hash: false,
      version: false,
      timings: false,
      children: false,
      chunks: false,
      modules: false,
      source: false,
      publicPath: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader, options: {
                            }
                        },
                        {
                            loader: 'css-loader', options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        },
                        {
                            loader: 'postcss-loader', options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        },
                        {
                            loader: 'sass-loader',  options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: "[name].css"
          //chunkFilename: "[id].css"
      }),
      new BrowserSyncPlugin({
          files: ['./*.html', './*.htm'],
          //browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          server: { baseDir: ['./'] }
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/assets/images'), to: path.resolve(__dirname, 'dist/images') },
        ],
      }),
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
      })
    ]
  };

};//Config end
