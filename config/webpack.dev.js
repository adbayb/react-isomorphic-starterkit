var webpack = require("webpack");
var config = require("./webpack.shared.js");
//var serverWebpackConfig = require("./webpack.shared.js").server;

//Configuration Webpack pour générer un bundle qui sera utilisé par le serveur définit
//dans /bin/server/serverSideRendering.js:

//webpackConfig.client.plugins.push(new webpack.HotModuleReplacementPlugin());
//webpackConfig.client.module.loaders[0].loaders.push("react-hot");

//La configuration Webpack côté serveur ne gérera que l'arbre de dépendance javascript
//Les arbres de dépendances des ressources (css, html, images...) seront gérés par la configuration client
//pour éviter une double gestion des ressources côté serveur et client.
//Cependant, Webpack se base sur l'arbre des requires pour injecter les liens dans le code javascript
//vers les bonnes ressources required. Il faut donc quand même gérer les ressources côté serveur.
//En output, on aura deux dossiers (client et serveur), le fichier js côté serveur se chargera
//via Express de loader les assets depuis le dossier client.
//Le template html serveur se charge de loader les ressources clients bundlées.
var loaders = [{
	test: /\.js[x]?$/,
	include: config.APP_DIR,
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

exports.client = Object.assign({}, config.client, {
	name: "dev-client",
	entry: [
		"webpack/hot/only-dev-server",
		"webpack-dev-server/client?http://localhost:8081", //WebpackDevServer host et port
		//"only" permet d"empêcher le rechargement lors d"erreurs de syntaxes
		//fichier d"entrée principale de notre code source (client et non client.jsx comme le dossier
		//contient index.jsx donc automatiquement loadé lorsque l"on spécifie le dossier):
		config.client.entry
	],
	output: Object.assign({}, config.client.output, {
		publicPath: "http://localhost:8081/"
	}),
	module: {
		loaders: loaders
	},
	plugins: [
		//On n'extrait pas et on ne l'inclut pas dans le html pour autoriser le hot loading sur css:
		//new ExtractTextPlugin("client.bundle.css")
		new webpack.HotModuleReplacementPlugin()
	]
});

var serverConfig = config.server;
serverConfig.name = "dev-server";
serverConfig.output.publicPath = "http://localhost:8081/";

exports.server = serverConfig;
