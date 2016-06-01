var webpack = require("webpack");
var clientWebpack = require("./webpack.shared.js").client;

//Configuration Webpack pour générer un bundle qui sera utilisé par le serveur définit
//dans /bin/server/serverSideRendering.js:

//webpackConfig.client.plugins.push(new webpack.HotModuleReplacementPlugin());
//webpackConfig.client.module.loaders[0].loaders.push("react-hot");

/*
var loaders = [{
	test: /\.js[x]?$/,
	include: clientWebpack.entry,
	loaders: [
		"react-hot",
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

var devWebpack = Object.assign({},
	clientWebpack, {
		name: "dev-webpack",
		entry: [
			"webpack-dev-server/client?http://localhost:8081", //WebpackDevServer host et port
			"webpack/hot/only-dev-server", //"only" permet d"empêcher le rechargement lors d"erreurs de syntaxes
			//fichier d"entrée principale de notre code source (client et non client.jsx comme le dossier
			//contient index.jsx donc automatiquement loadé lorsque l"on spécifie le dossier):
			clientWebpack.entry
		],
		module: {
			loaders: loaders
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
			//new ExtractTextPlugin("client.bundle.css")
		]
	}
);*/
var path = require("path");
var APP_DIR = path.resolve(__dirname, "..", "src");

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
	include: APP_DIR,
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

console.log(__dirname);

var devWebpack = {
	name: "client-webpack",
	//Par défaut, Webpack set l'environnement cible à "web":
	target: "web",
	/*entry: {
		APP_DIR + "/client"
	},*/
	entry: [
		"webpack/hot/only-dev-server",
		"webpack-dev-server/client?http://localhost:8081", //WebpackDevServer host et port
		//"only" permet d"empêcher le rechargement lors d"erreurs de syntaxes
		//fichier d"entrée principale de notre code source (client et non client.jsx comme le dossier
		//contient index.jsx donc automatiquement loadé lorsque l"on spécifie le dossier):
		APP_DIR + "/client"
	],
	output: {
		filename: "client.bundle.js",
		path: __dirname,
		publicPath: "http://localhost:8081/"
	},
	module: {
		loaders: loaders
	},
	resolve: {
		extensions: ["", ".js", ".jsx"]
	},
	plugins: [
		//new ExtractTextPlugin("client.bundle.css")
		new webpack.HotModuleReplacementPlugin()
	]
};







var WebpackDevServer = require("webpack-dev-server");

new WebpackDevServer(webpack(devWebpack), {
	hot: true,
	historyApiFallback: true
}).listen(8081, "localhost", function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Webpack Server launched with at localhost:8081 (Hot Module Replacement [HMR] enabled)");
});

/*var serverWebpack = require("./webpack.shared.js").server;
webpack(serverWebpack).watch({}, function(err, stats) {
	if (err) return console.error(err.message);
	console.log(stats.toString(statOptions));
});*/

//module.exports = devWebpack;
