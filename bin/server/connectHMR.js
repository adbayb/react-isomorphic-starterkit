const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const { configClient, configServer } = require("../../config/webpack.dev.js");

module.exports = server => {
	const clientCompiler = webpack(configClient);
	const serverCompiler = webpack(configServer);

	// Setup HMR server side by cleaning cache instead of restarting server
	// to refresh cache and avoid having isomorphic different markup between client and server
	// when reload from server:
	serverCompiler.watch({}, err => {
		if (err) {
			console.error(err.message);
		}

		Object.keys(require.cache).forEach(id => {
			if (/\/app\//.test(id)) {
				delete require.cache[id];
			}
		});

		console.log("[HMR] Cleaned bundle caches from server");
	});

	// Setup HMR for client side:
	server.use(
		webpackDevMiddleware(clientCompiler, {
			publicPath: configClient.output.publicPath,
			noInfo: true,
			stats: {
				colors: true
			}
		}),
		webpackHotMiddleware(clientCompiler)
	);
};
