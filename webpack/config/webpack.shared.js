const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const env = require("./env.js");
const postcssConfig = require("./postcss.js");

const SRC_DIR = path.resolve(__dirname, "../src");
const DIST_DIR = path.resolve(__dirname, "../dist");

// cf. https://webpack.js.org/ for webpack2 documentation:
// https://webpack.js.org/guides/migrating/
const rules = [
	{
		test: /\.js[x]?$/,
		include: SRC_DIR,
		use: ["babel-loader"]
	},
	{
		test: /\.(jp[e]?g|png|gif|svg)$/i,
		use: {
			loader: "file-loader",
			options: {
				name: "img/[name].[hash].[ext]"
			}
		}
	},
	{
		test: /\.(html|ico)$/i,
		use: {
			loader: "file-loader",
			options: {
				name: "[name].[hash].[ext]"
			}
		}
	},
	{
		test: /\.(eot|ttf|woff|woff2|otf)$/,
		use: {
			loader: "file-loader",
			options: {
				name: "fonts/[name].[hash].[ext]"
			}
		}
	},
	{
		test: /\.css$/,
		use: [
			{
				loader: "css-loader",
				options: {
					modules: true,
					minimize: true,
					importLoaders: 1,
					localIdentName: "[name]__[local]___[hash:base64:5]"
				}
			},
			{
				loader: "postcss-loader",
				options: {
					plugins: [
						// postcss-cssnext already includes postcss-nested:
						// same for autoprefixer
						// see. http://cssnext.io/features/
						require("postcss-cssnext")({
							// autoprefixer browsers env:
							browsers: ["> 1%", "last 2 versions"]
						})
					]
				}
			}
		]
	}
];

const cssRules = ({ withFakeStyle, withFile }) => {
	const loaders = [
		{
			loader: "css-loader",
			options: {
				modules: true,
				minimize: true,
				importLoaders: 1,
				localIdentName: "[name]__[local]___[hash:base64:5]"
			}
		},
		{
			loader: "postcss-loader",
			options: postcssConfig
		}
	];

	if (withFakeStyle) {
		return {
			test: /\.css$/,
			use: loaders
		};
	}

	if (withFile) {
		return {
			test: /\.css$/,
			// importLoaders to apply css loaders also for imported css (via @import statement):
			// CSS Modules already managed by css-loader (via modules query):
			// no needs for postcss-modules:
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: loaders
			})
		};
	}

	return {
		test: /\.css$/,
		use: [
			{
				loader: "style-loader"
			},
			...loaders
		]
	};
};

const resolve = {
	alias: {
		public: path.resolve(__dirname, "../public")
	},
	modules: [SRC_DIR, path.join(SRC_DIR, "./shared"), "node_modules"],
	extensions: [".js", ".jsx"]
};

const vendor = ["react", "react-dom", "react-router"];

module.exports = {
	env,
	resolve,
	vendor,
	rules,
	SERVER_SRC_DIR: path.join(SRC_DIR, "./server"),
	CLIENT_SRC_DIR: path.join(SRC_DIR, "./client"),
	SERVER_BUILD_DIR: path.join(DIST_DIR, "./server"),
	CLIENT_BUILD_DIR: path.resolve(DIST_DIR, "./static"),
	WEBPACK_BUILD_DIR: path.resolve(DIST_DIR, "./webpack")
};
