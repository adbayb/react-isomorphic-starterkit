const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = require("./env.js");
const postcss = require("./postcss.config.js");

// cf. https://webpack.js.org/ for webpack2 documentation:
// https://webpack.js.org/guides/migrating/
const commonRules = [{
	test: /\.js[x]?$/,
	include: path.resolve(__dirname, "../src"),
	use: ["babel-loader"]
}, {
	test: /\.(jp[e]?g|png|gif|svg)$/i,
	use: {
		loader: "file-loader",
		options: {
			name: "img/[name].[hash].[ext]"
		}
	}
}, {
	test: /\.(html|ico)$/i,
	use: {
		loader: "file-loader",
		options: {
			name: "[name].[hash].[ext]"
		}
	}
}, {
	test: /\.(eot|ttf|woff|woff2|otf)$/,
	use: {
		loader: "file-loader",
		options: {
			name: "fonts/[name].[hash].[ext]"
		}
	}
}];

const hmrRules = [
	...commonRules,
	{
		test: /\.css$/,
		use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader",
			options: {
				modules: true,
				minimize: true,
				importLoaders: 1,
				localIdentName: "[name]__[local]___[hash:base64:5]"
			}
		}, {
			loader: "postcss-loader"
		}]
	},
	{
		test: /\.scss$/,
		use: [{
			loader: "style-loader"
		}, {
			loader: "css-loader",
			options: {
				modules: true,
				minimize: true,
				importLoaders: 1,
				localIdentName: "[name]__[local]___[hash:base64:5]"
			}
		}, {
			loader: "postcss-loader"
		}, {
			loader: "sass-loader"
		}]
	}
];

const rules = [
	...commonRules,
	{
		test: /\.css$/,
		// importLoaders to apply css loaders also for imported css (via @import statement):
		// CSS Modules already managed by css-loader (via modules query):
		// no needs for postcss-modules:
		loader: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: [{
				loader: "css-loader",
				query: {
					modules: true,
					minimize: true,
					importLoaders: 1,
					localIdentName: "[name]__[local]___[hash:base64:5]"
				}
			}, {
				loader: "postcss-loader"
			}]
		})
	},
	{
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: [{
				loader: "css-loader",
				query: {
					modules: true,
					minimize: true,
					importLoaders: 1,
					localIdentName: "[name]__[local]___[hash:base64:5]"
				}
			}, {
				loader: "postcss-loader"
			}, {
				loader: "sass-loader"
			}]
		})
	}
];

const resolve = {
	alias: {
		public: path.resolve(__dirname, "../public")
	},
	modules: [
		path.resolve(__dirname, "../src"),
		path.resolve(__dirname, "../src/shared"),
		"node_modules"
	],
	extensions: [".js", ".jsx"]
};

const getRules = (isHMR) => {
	if (isHMR) {
		return hmrRules;
	}

	return rules;
};

const vendor = [
	"react",
	"react-dom",
	"react-router"
];

const plugins = [
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss
		}
	})
];

module.exports = {
	env,
	getRules,
	resolve,
	vendor,
	plugins,
	SERVER_APP_DIR: path.resolve(__dirname, "../src/server"),
	CLIENT_APP_DIR: path.resolve(__dirname, "../src/client"),
	SERVER_BUILD_DIR: path.resolve(__dirname, "../dist/server"),
	CLIENT_BUILD_DIR: path.resolve(__dirname, "../dist/static"),
	WEBPACK_BUILD_DIR: path.resolve(__dirname, "../dist/webpack")
};
