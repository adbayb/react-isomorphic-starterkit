var webpack = require("webpack");
var clientWebpack = require("./webpack.shared.js").client;

//Configuration Webpack pour générer un bundle qui sera utilisé par le serveur définit
//dans /bin/server/serverSideRendering.js:

//webpackConfig.client.plugins.push(new webpack.HotModuleReplacementPlugin());
//webpackConfig.client.module.loaders[0].loaders.push("react-hot");

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
);

var WebpackDevServer = require("webpack-dev-server");

var statOptions = {
	colors: true,
	hash: false,
	timings: false,
	chunks: false,
	chunkModules: false,
	modules: false,
	children: true,
	version: true,
	cached: false,
	cachedAssets: false,
	reasons: false,
	source: false,
	errorDetails: false
};

new WebpackDevServer(webpack(devWebpack), {
	hot: true,
	historyApiFallback: true,
	stats: statOptions
}).listen(8081, "localhost", function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Webpack Server launched with at localhost:8081 (Hot Module Replacement [HMR] enabled)");
});

var serverWebpack = require("./webpack.shared.js").server;
webpack(serverWebpack).watch({}, function(err, stats) {
	if (err) return console.error(err.message);
	console.log(stats.toString(statOptions));
});

//module.exports = devWebpack;
