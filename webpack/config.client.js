const webpack = require("webpack");
const merge = require("webpack-merge");
const { baseClient, baseDev, cssLoaders } = require("./config.base.js");

// TODO: prod config
// DEV config below:
module.exports = merge(
	{
		devtool: "eval-source-map",
		output: {
			filename: "[name].js"
		},
		entry: {
			app: [
				// cf. configuration React Hot Loader 3.X:
				// https://github.com/gaearon/react-hot-loader/issues/243#issuecomment-211957140
				// "react-hot-loader/patch",
				"webpack-hot-middleware/client"
			]
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						{
							loader: "style-loader"
							// other css loaders (e.g. css-loader, postcss-loader)
							// append from base config via merge.smart)
						},
						...cssLoaders
					]
				}
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]
	},
	baseClient,
	baseDev
);
