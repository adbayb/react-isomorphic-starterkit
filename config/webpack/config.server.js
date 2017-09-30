const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { baseServer, cssLoaders } = require("./base.js");

module.exports = merge(
	{
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: cssLoaders
					})
				}
			]
		},
		plugins: [new ExtractTextPlugin("[name].css")]
	},
	baseServer
);
