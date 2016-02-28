import React from "react";
import {renderToString} from "react-dom/server";
import {match, RouterContext} from "react-router";
import routes from "./routes.jsx";
import zlib from "zlib";

function renderHTML(componentHTML) {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Boilerplate React.JS (starter kit with webpack)</title>
	<link rel="stylesheet" href="/all.bundle.css">
</head>
<body>
	${componentHTML}
</body>
</html>
	`;
}

//TODO: gzip sur chaque requête pour compresser et optimiser les réponses:
function write(string, type, res) {
	zlib.gzip(string, (err, result) => {
		res.writeHead(200, {
			'Content-Length': result.length,
			'Content-Type': type,
			'Content-Encoding': 'gzip'
		})
		res.write(result)
		res.end()
	});
}

//Définition de la fonction middleware qui sera utilisé par express à chaque requête client/serveur:
//Elle permet de gérer les redirections en réponse via react-router
//Pour plus de détails: cf. https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md :
export default function(req, res) {
	console.log(req.url);
	if(req.url.indexOf('.ico') !== -1)
	//write('haha', 'text/plain', res)
		console.log('Targeted');
	else
		match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
			if(error) {
				res.status(500).send(error.message)
			} else if(redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			} else if(renderProps) {
				res.status(200).send(renderHTML(renderToString(<RouterContext {...renderProps} />)))
			} else {
				res.status(404).send('Not found')
			}
		});
};

