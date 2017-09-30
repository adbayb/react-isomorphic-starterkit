import path from "path";
import { readFile as fsReadFile } from "fs";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
// @note: hmr doesn't allow using clean-webpack-plugin inside config.client
import config from "../../config/webpack/config.client";
import App from "../shared/App";

const readFile = path =>
	new Promise((resolve, reject) => {
		fsReadFile(path, "utf8", (err, data) => {
			if (err) {
				reject(err);
			}

			resolve(data);
		});
	});

// TODO dev/prod
const server = express();
const PUBLIC_DIR = path.resolve(__dirname, "../../dist/public");

server.use(
	// compress({ threshold: 0 }),
	express.static(PUBLIC_DIR)
	// express.static(path.resolve(__dirname, "../../public"))
);

const clientCompiler = webpack(config);

server.use(
	webpackDevMiddleware(clientCompiler, {
		noInfo: true,
		stats: {
			colors: true
		}
	}),
	webpackHotMiddleware(clientCompiler)
);

server.use(async (req, res) => {
	const context = {};
	const body = renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	);

	console.log("Context : ", context);
	console.log("req.url : ", req.url);

	if (context.url) {
		console.log("Redirect");
		res.writeHead(302, {
			Location: context.url
		});
	} else {
		// status code 200
		const html = await readFile(path.join(PUBLIC_DIR, "./index.html"));
		res.status(200).send(html.replace("<!--BODY-->", body));
	}
});

const listener = server.listen(8080, () => {
	const host = listener.address().address;

	console.log("Server launched at http://%s:%s", host, 8080);
});
