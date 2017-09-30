const path = require("path");
// const merge = require("webpack-merge");

const SRC_DIR = path.resolve(__dirname, "../../src");
// const DIST_DIR = path.resolve(__dirname, "../../dist");
// const CLIENT_SRC_DIR = path.join(SRC_DIR, "./client");
// const SERVER_SRC_DIR = path.join(SRC_DIR, "./server");
// const CLIENT_BUILD_DIR = path.join(DIST_DIR, "./static");
// const SERVER_BUILD_DIR = path.join(DIST_DIR, "./server");

// cf. https://webpack.js.org/ for webpack documentation:
module.exports = {
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				include: SRC_DIR,
				use: ["babel-loader"]
			},
			{
				test: /\.(jp[e]?g|png|gif|svg|html|ico|eot|ttf|woff|woff2|otf)$/i,
				use: {
					loader: "file-loader",
					options: {
						name: "assets/[name].[hash].[ext]"
					}
				}
			}
		]
	},
	resolve: {
		alias: {
			public: path.resolve(__dirname, "../../public"),
			containers: path.resolve(__dirname, "../../src/shared/containers"),
			components: path.resolve(__dirname, "../../src/shared/components"),
			utils: path.resolve(__dirname, "../../src/shared/utils"),
			constants: path.resolve(__dirname, "../../src/shared/constants"),
			views: path.resolve(__dirname, "../../src/shared/views"),
			client: path.resolve(__dirname, "../../src/client"),
			server: path.resolve(__dirname, "../../src/server")
		},
		// modules: [SRC_DIR, path.join(SRC_DIR, "./shared"), "node_modules"],
		extensions: [".js", ".jsx"]
	}
};
