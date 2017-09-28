const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { baseClient, baseServer, cssLoaders } = require("./webpack/base.js");

const client = merge({
	devtool: "eval-source-map",
	output: {
		filename: "[name].js"
	},
	entry: {
		app: [
			// cf. configuration React Hot Loader 3.X:
			// https://github.com/gaearon/react-hot-loader/issues/243#issuecomment-211957140
			"react-hot-loader/patch",
			"webpack-hot-middleware/client",
		]
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				{
					loader: "style-loader"
					// other css loaders (e.g. css-loader, postcss-loader)
					// append from base config via merge.smart)
				},
				...cssLoaders
			]
		}]
	},
	plugins: [
		// new webpack.DefinePlugin(env),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
}, baseClient);

const server = merge({
	output: {
		filename: "[name].js"
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: cssLoaders
			})
		}]
	},
	plugins: [
		// new webpack.DefinePlugin(env)
		new ExtractTextPlugin("[name].css")
	]
}, baseServer);

module.exports = {
	configClient: client,
	configServer: server
};
