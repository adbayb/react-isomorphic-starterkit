const webpack = require("webpack");
const merge = require("webpack-merge");
const { baseClient, cssLoaders } = require("./base.js");

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
				"react-hot-loader/patch",
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
			// new webpack.DefinePlugin(env),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		]
	},
	baseClient
);
