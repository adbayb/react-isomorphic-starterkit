import path from "path";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import renderHtml from "./views/index.html.js";
import App from "../shared/App";

// TODO dev/prod
// TODO hmr
const server = express();

server.use(
	// compress({ threshold: 0 }),
	express.static(path.resolve(__dirname, "../../dist/assets")),
	express.static(path.resolve(__dirname, "../../public"))
);

server.use((req, res) => {
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
		res.end();
	} else {
		// status code 200
		const html = renderHtml({
			body,
			scripts: `<script type="text/javascript" src="app.js"></script>`
		});
		res.status(200).send(html);
	}
});

const listener = server.listen(8080, () => {
	const host = listener.address().address;

	console.log("Server launched at http://%s:%s", host, 8080);
});
