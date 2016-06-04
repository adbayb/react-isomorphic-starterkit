var webpack = require("webpack");
var shared = require("./webpack.shared.js");

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

//Il faut savoir que le bundle sous HMR est stocké in-memory (en RAM) pour accélérer les mises à jours:
var client = {
	name: "dev.client",
	target: "web",
	entry: {
		"client.bundle": [
			"webpack/hot/only-dev-server",
			"webpack-dev-server/client?http://localhost:8081", //WebpackDevServer host et port
			//"only" permet d"empêcher le rechargement lors d"erreurs de syntaxes
			//fichier d"entrée principale de notre code source (client et non client.jsx comme le dossier
			//contient index.jsx donc automatiquement loadé lorsque l"on spécifie le dossier):
			shared.APP_DIR + "/client"
		]
	},
	output: {
		filename: "[name].js",
		path: shared.CLIENT_BUILD_DIR,
		//publicPath permet de définir le domaine dans lequel les ressources requises sont prises
		//lors du bundling, webpack remplacera les require en prenant soin d'inclure le domaine source:
		publicPath: "http://localhost:8081/"
	},
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	plugins: [
		//On n'extrait pas et on ne l'inclut pas dans le html pour autoriser le hot loading sur css:
		//new ExtractTextPlugin("client.bundle.css")
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = client;
