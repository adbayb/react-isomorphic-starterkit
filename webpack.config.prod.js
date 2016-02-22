var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var webpackProdConfig = {
	entry: [
		APP_DIR + '/app.jsx'
	],
	output: {
		filename: 'all.bundle.js',
		path: BUILD_DIR,
		publicPath: '/public/'
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.(jp[e]?g|png|gif|svg)$/i,
				loader: 'file-loader?name=img/[name].[ext]'
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('all.bundle.css')
	]
};

module.exports = webpackProdConfig;
