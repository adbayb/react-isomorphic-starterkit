var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var configClient = require("../../config/webpack.dev.client.js");
var configServer = require("../../config/webpack.dev.server.js");

var options = {
	chunk: false,
	chunkModules: false,
	modules: false,
	source: false,
	chunkOrigins: false
};

//Gestion du bundle client + Hot Module Replacement via config.client:
new WebpackDevServer(webpack(configClient), {
	hot: true,
	historyApiFallback: true,
	stats: options
}).listen(8081, "localhost", function(err) {
	if(err)
		console.log(err);

	console.log("Webpack Server launched with at localhost:8081 (Hot Module Replacement [HMR] enabled)");
});

/*
Pour éviter les erreurs du type:
client.bundle.js:11219 Warning: React attempted to reuse markup in a container but the checksum was invalid.
This generally means that you are using server rendering and the markup generated on the server was not what
the client was expecting. React injected new markup to compensate which works but you have lost many of the
benefits of server rendering. Instead, figure out why the markup being generated is different on the client
or server:
(client) 8 --> to React world2333 ! [You are <!--
(server) 8 --> to React world ! [You are <!-- /re

On doit donc redémarrer le serveur afin d'être ISO avec le bundle client sur le contenu des composants.
Pour cela on utilise le principe de watcher sous webpack (afin de re-bundler (output ici = server.bundle.js)
automatiquement à chaque mise à jour des fichiers de l'arbre spécifié à partir d'entry de config.server).
Ensuite, on utilise le démon nodemon pour redémarrer notre serveur node à chaque mise à jour du /dist/server.bundle.js:
*/
webpack(configServer).watch({}, function(err, stats) {
	if(err)
		return console.error(err.message);

	console.log(stats.toString(options));
});
