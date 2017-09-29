const path = require("path");
const merge = require("webpack-merge");

const SRC_DIR = path.resolve(__dirname, "../../src");
const DIST_DIR = path.resolve(__dirname, "../../dist");
const CLIENT_SRC_DIR = path.join(SRC_DIR, "./client");
const SERVER_SRC_DIR = path.join(SRC_DIR, "./server");
const CLIENT_BUILD_DIR = path.join(DIST_DIR, "./static");
const SERVER_BUILD_DIR = path.join(DIST_DIR, "./server");

// cf. https://webpack.js.org/ for webpack documentation:
const base = {
	module: {
		rules: [
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
			}
		]
	},
	resolve: {
		alias: {
			public: path.resolve(__dirname, "../../public")
		},
		modules: [SRC_DIR, path.join(SRC_DIR, "./shared"), "node_modules"],
		extensions: [".js", ".jsx"]
	}
};

const cssLoaders = [
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
];

const baseClient = merge(
	{
		name: "client",
		target: "web",
		entry: {
			// The key is the chunk name. The value can be a string or an array.
			// But for merging purpose, I used to give an array as value to allow webpack-merge
			// to easily merge value into the array (for hmr entries for example).
			app: [CLIENT_SRC_DIR]
		},
		output: {
			path: CLIENT_BUILD_DIR,
			publicPath: "/"
		}
	},
	base
);

const baseServer = merge(
	{
		name: "server",
		target: "node",
		externals: [
			/^[a-z\-0-9]+$/,
			{
				"react-dom/server": true // TODO check with react 16
			}
		],
		entry: {
			app: [SERVER_SRC_DIR]
		},
		output: {
			// filename: "[name].js",
			path: SERVER_BUILD_DIR,
			libraryTarget: "commonjs2",
			publicPath: "/"
		}
	},
	base
);

module.exports = {
	baseClient,
	baseServer,
	cssLoaders
};
