var webpack = require("webpack");
var shared = require("./webpack.shared.js");

var loaders = [{
	test: /\.js[x]?$/,
	include: shared.APP_DIR,
	loaders: [
		"react-hot-loader",
		"babel-loader?" + JSON.stringify({
			presets: ["es2015", "react"]
		})
	]
}, {
	test: /\.css$/,
	loader: "style-loader!css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]"
}, {
	test: /\.scss$/,
	loader: "style-loader!css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]!sass-loader"
}, {
	test: /\.(jp[e]?g|png|gif|svg)$/i,
	loader: "file-loader?name=img/[name].[ext]"
}, {
	test: /\.html$/,
	loader: "file-loader?name=[name].[ext]"
}, {
	test: /\.ico$/,
	loader: "file-loader?name=[name].[ext]"
}];

var client = {
	name: "dev.client",
	target: "web",
	entry: {
		"client.bundle": [
			"webpack/hot/only-dev-server",
			"webpack-dev-server/client?http://localhost:8081",
			shared.APP_DIR + "/client"
		]
	},
	output: {
		filename: "[name].js",
		path: shared.CLIENT_BUILD_DIR,
		publicPath: "http://localhost:8081/"
	},
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = client;
