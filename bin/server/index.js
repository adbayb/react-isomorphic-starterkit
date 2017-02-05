const express = require("express");
const compress = require("compression");
const path = require("path");
const connectHMR = require("./hmr.js");
const { onSuccess, onRedirect, onError } = require("./lifecycle.js");
const { __DEV__, __PORT__ } = require("../../config/env.js");
const { configClient } = require("../../config/webpack.dev.js");
const appScript = require("../../dist/server/app.js");

const server = express();
const port = __PORT__;

server.use(
	compress({ threshold: 0 }),
	express.static(path.resolve(__dirname, "../../dist/static")),
	express.static(path.resolve(__dirname, "../../public"))
);

if (__DEV__) {
	connectHMR(server);
}

server.use((req, res) => {
	let app = appScript;
	if (__DEV__) {
		// delete node module require cache after webpack bundle cache cleaning
		// (Node modules are cached after the first time they are loaded)
		delete require.cache[require.resolve("../../dist/server/app.js")];
		// We reload the fresh module:
		app = require("../../dist/server/app.js");
	}

	app.default(
		req.url,
		onSuccess(res, !__DEV__, {
			hmrPublicPath: configClient.output.publicPath
		}),
		onError(res),
		onRedirect(res)
	);
});


const listener = server.listen(port, () => {
	const host = listener.address().address;

	console.log("Server launched at http://%s:%s", host, port);
});
