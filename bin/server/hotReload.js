var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("../../config/webpack.dev.js");

var options = {
	chunk: false,
	chunkModules: false,
	modules: false,
	source: false,
	chunkOrigins: false
};

//cf. https://webpack.github.io/docs/node.js-api.html
var serverCompiler = webpack(config.server);
/*serverCompiler.run(function(err, stats) {
	if(err)
		return console.error(err.message);

	console.log(stats.toString(options));
});*/
//Plusieurs tâches peuvent être lancées de façon concourrantes grâce à l'asynchronité

/*
Pour éviter les erreurs du type:
client.bundle.js:11219 Warning: React attempted to reuse markup in a container but the checksum was invalid. This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting. React injected new markup to compensate which works but you have lost many of the benefits of server rendering. Instead, figure out why the markup being generated is different on the client or server:
(client) 8 --> to React world2333 ! [You are <!--
(server) 8 --> to React world ! [You are <!-- /re

Utiliser nodemon pour redémarrer le serveur à chaque mise à jour du server.bundle.js:
*/

serverCompiler.watch({}, function(err, stats) {
	if(err)
		return console.error(err.message);

	console.log(stats.toString(options));
});

//Client bundling process + server:
new WebpackDevServer(webpack(config.client), {
	hot: true,
	historyApiFallback: true,
	stats: options
}).listen(8081, "localhost", function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Webpack Server launched with at localhost:8081 (Hot Module Replacement [HMR] enabled)");
});
