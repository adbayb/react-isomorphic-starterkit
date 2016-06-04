var webpack = require("webpack");
var config = require("../../config/webpack.dev.server.js");

//Options affichage logs console Webpack:
var options = {
	chunk: false,
	chunkModules: false,
	modules: false,
	source: false,
	chunkOrigins: false
};

//cf. https://webpack.github.io/docs/node.js-api.html
var compiler = webpack(config);
compiler.run(function(err, stats) {
	if(err)
		return console.error(err.message);

	console.log(stats.toString(options));
});
