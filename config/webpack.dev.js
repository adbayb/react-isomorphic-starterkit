var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var CLIENT_BUILD_DIR = path.resolve(__dirname, "..", "dist", "client");
var SERVER_BUILD_DIR = path.resolve(__dirname, "..", "dist", "server");
var APP_DIR = path.resolve(__dirname, "..", "src");

var loaders = [{
	test: /\.js[x]?$/,
	include: APP_DIR,
	loader: "babel-loader",
	query: {
		presets: ["es2015", "react"]
	}
}, {
	test: /\.css$/,
	loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]")
}, {
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]!sass-loader")
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

//Configuration Webpack pour générer un bundle qui sera utilisé par le serveur définit
//dans /bin/server/serverSideRendering.js:
var webpackConfig = [{
	name: "client-webpack",
	entry: [
		"webpack-dev-server/client?http://localhost:8080", //WebpackDevServer host et port
		"webpack/hot/only-dev-server", //"only" permet d"empêcher le rechargement lors d"erreurs de syntaxes
		//fichier d"entrée principale de notre code source (client et non client.jsx comme le dossier
		//contient index.jsx donc automatiquement loadé lorsque l"on spécifie le dossier):
		APP_DIR + "/client"
	],
	output: {
		filename: "client.bundle.js",
		path: CLIENT_BUILD_DIR,
		publicPath: "/"
	},
	module: {
		loaders: [{
			test: /\.js[x]?$/,
			include: APP_DIR,
			loaders: [
				"react-hot",
				"babel-loader?" + JSON.stringify({
					presets: ["es2015", "react"]
				})
			]
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]")
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[path]-[name]_[local]-[hash:base64:5]!sass-loader")
		}, {
			test: /\.(jp[e]?g|png|gif|svg)$/i,
			loader: "file-loader?name=img/[name].[ext]"
		}, {
			test: /\.html$/,
			loader: "file-loader?name=[name].[ext]"
		}, {
			test: /\.ico$/,
			loader: "file-loader?name=[name].[ext]"
		}]
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("client.bundle.css")
	]
}, {
	name: "server-webpack",
	entry: {
		"server.bundle": APP_DIR + "/server"
	},
	target: "node",
	externals: [
		/^[a-z\-0-9]+$/,
		{
			"react-dom/server": true
		}
	],
	output: {
		filename: "[name].js",
		path: SERVER_BUILD_DIR,
		publicPath: "/",
		libraryTarget: "commonjs2"
	},
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	plugins: [
		new ExtractTextPlugin("[name].css")
	]
}];

module.exports = webpackConfig;
