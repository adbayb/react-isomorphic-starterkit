const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
	WEBPACK_BUILD_DIR,
	CLIENT_SRC_DIR,
	SERVER_SRC_DIR,
	SERVER_BUILD_DIR,
	CLIENT_BUILD_DIR,
	getRules,
	resolve,
	env,
	vendor
} = require("./webpack.shared.js");
const AssetsPlugin = require("assets-webpack-plugin");

const commonPlugins = [
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.DefinePlugin(
		Object.assign(
			{},
			env,
			{
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}
		)
	)
];

const baseClient = {
	name: "prod.client",
	target: "web",
	entry: {
		app: `${CLIENT_SRC_DIR}`,
		vendor
	},
	output: {
		filename: "[name].[hash].js",
		path: CLIENT_BUILD_DIR,
		publicPath: "/"
	},
	module: {
		rules: getRules()
	},
	resolve,
	plugins: [
		...commonPlugins,
		new ExtractTextPlugin("[name].[hash].css"),
		new AssetsPlugin({
			path: WEBPACK_BUILD_DIR,
			filename: "manifest.json",
			prettyPrint: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		})
	]
};

const baseServer = {
	name: "prod.server",
	target: "node",
	externals: [
		/^[a-z\-0-9]+$/, {
			"react-dom/server": true
		}
	],
	entry: {
		app: `${SERVER_SRC_DIR}`
	},
	output: {
		filename: "[name].js",
		path: SERVER_BUILD_DIR,
		libraryTarget: "commonjs2",
		publicPath: "/"
	},
	module: {
		rules: getRules()
	},
	resolve,
	plugins: [
		...commonPlugins,
		new ExtractTextPlugin("[name].css")
	]
};

module.exports = [baseClient, baseServer];
