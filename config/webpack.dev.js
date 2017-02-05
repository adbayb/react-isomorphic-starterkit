const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
	CLIENT_APP_DIR,
	SERVER_APP_DIR,
	CLIENT_BUILD_DIR,
	SERVER_BUILD_DIR,
	resolve,
	env,
	getRules,
	plugins
} = require("./webpack.shared.js");

const client = {
	name: "dev.client",
	target: "web",
	devtool: "eval-source-map",
	entry: {
		app: [
			// cf. configuration React Hot Loader 3.X:
			// https://github.com/gaearon/react-hot-loader/issues/243#issuecomment-211957140
			"react-hot-loader/patch",
			"webpack-hot-middleware/client",
			`${CLIENT_APP_DIR}`
		]
	},
	output: {
		filename: "[name].js",
		path: CLIENT_BUILD_DIR,
		publicPath: "/hmr/"
	},
	module: {
		rules: getRules(true)
	},
	resolve,
	plugins: [
		...plugins,
		new webpack.DefinePlugin(env),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

const server = {
	name: "dev.server",
	target: "node",
	externals: [
		/^[a-z\-0-9]+$/, {
			"react-dom/server": true
		}
	],
	entry: {
		app: `${SERVER_APP_DIR}`
	},
	output: {
		filename: "[name].js",
		path: SERVER_BUILD_DIR,
		libraryTarget: "commonjs2",
		publicPath: "/hmr/"
	},
	module: {
		rules: getRules()
	},
	resolve,
	plugins: [
		...plugins,
		new webpack.DefinePlugin(env),
		new ExtractTextPlugin("[name].css")
	]
};

module.exports = {
	configClient: client,
	configServer: server
};
