const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

//Set production flag
const isProduction = (process.env.NODE_ENV === 'production');

const config = {
	entry: ['./src/assets/scripts/main.js', './src/assets/styles/_main.scss'],
	output: {
		path: path.resolve(__dirname, 'dist/scripts'),
		filename: 'main.js'
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
			    use: ExtractTextPlugin.extract({
				    use: [
					    {
							loader: 'css-loader', options: {
								sourceMap: !isProduction,
								minimize: isProduction
			                } //Compiles Sass to CSS minifies and removes maps in production
					    },
					    {
							loader: 'postcss-loader', options: {
			                	sourceMap: !isProduction
			                }
						},
					    {
				    		loader: 'sass-loader',  options: {
		                		sourceMap: !isProduction
		                	} //Compiles Sass to CSS
					    }
					]
				})
			}
		]
	},
	devtool: 'inline-source-map',
	plugins: [	
	 	new CleanWebpackPlugin(['dist/scripts', 'dist/styles']),
	 	new ExtractTextPlugin('../styles/main.css'),
	 	new BrowserSyncPlugin({
	 		files: ['./*.html', './*.htm'],
	      	//browse to http://localhost:3000/ during development
		    host: 'localhost',
		    port: 3000,
		    server: { baseDir: ['./'] }
	    }),
		new CopyWebpackPlugin([{
		      from: path.resolve(__dirname, 'src/assets/images'),
		      to: path.resolve(__dirname, 'dist/images')
		    }]),	    
	    new ImageminPlugin({
      		disable: process.env.NODE_ENV !== 'production', // Disable during development
      		test: /\.(jpe?g|png|gif|svg)$/i,
      		cacheFolder: path.resolve(__dirname, '.cache'),
      		//For more about image settings: https://github.com/Klathmon/imagemin-webpack-plugin
      		pngquant: { quality: '90', speed: 4},
        	jpegtran: { progressive: true },
        	gifsicle: { optimizationLevel: 1 },
			svgo: {}
    	}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
};//Config end

//Minimize JS only in Production
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
        	comments: false
        })
    );
}

module.exports = config;