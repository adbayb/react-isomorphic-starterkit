import React from "react";
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import { Store, fetchAsyncData } from "../shared/helpers";
import routes from "../shared/routes.jsx";
//Inutile, on le récupère déjà dans le dossier public:
//import "../shared/favicon.ico";

function buildPage(html, data) {
	//Sérialisation des données via JSON.stringify (désérialisation se fera via JSON.parse)
	//car JSON.stringify permet de transformer sous forme de JSON n'importe quel objet javascript:
	const initialData = data ? `
		<script>
			window.INITIAL_DATA = ${JSON.stringify(data)};
		</script>
	`: '';

	if(process.env.NODE_ENV === "production")
		return `<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>React Isomorphic Starter Kit</title>
		<link rel="stylesheet" href="/client.bundle.css">
	</head>

	<body>
		<div id="app">${html}</div>

		${initialData}
		<script src="/client.bundle.js"></script>
	</body>

</html>`;
	else
		return `<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>React Isomorphic Starter Kit</title>
	</head>

	<body>
		<div id="app">${html}</div>

		${initialData}
		<script src="http://localhost:8081/client.bundle.js"></script>
	</body>

</html>`;
}

export default function(req, res) {
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if(error) {
			res.status(500).send(error.message);
		} else if(redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {
			//renderToString permet de transformer un ReactElement en string permettant ainsi de réduire le temps de chargement de la PREMIERE requête serveur.
			//ici on render en string RouterContext qui contient l'arborescence des composants de notre site (cf. routes.jsx). 
			//Lors du premier call serveur du client web (le server side ne s'applique que lors de calls client => serveur, donc seulement lors de refresh de page 
			//du client web ou lors du premier accès visiteur sur le site!), on passera par match (qui permet de mapper les urls à nos routes) via express
			//et renderToString sera appelée, le reste de la navigation se fera 
			//via l'api Link de react-router qui se chargera de récupérer les bons composants générés (en cache) précédemment sous forme de string de l'arborescence:
			const html = renderToString(<RouterContext {...renderProps} />);
			//Async data fetching (prefetch data avant de renderer la page):
			//Inutile désormais car j'ai trouvé un moyen de faire le data fetching 
			//différencié entre serveur/client au niveau d'un composant et non plus du RouterContext:
			//cf. welcome component pour plus de détails:
			/*fetchAsyncData((data) => {
				res.status(200).send(buildPage(html, data));
			}, (error) => {
				res.status(200).send(buildPage(html));
			});*/
			//Si pas de data fetching:
			//res.status(200).send(buildPage(html));

			//On checke si toutes les promesses de fetch ont été résolues (i.e. toute la data des différents composants a été collectée)
			//Si un composant a échoué lors du fetch de data externes, on build la page sans data initiale:
			//TODO: @ améliorer en checkant les promesses des composants en cours et non de toute l'arborescence RouterContext
			//avec récupération de la data depuis des stores associés aux composants:
			//Store.registerPromise(Promise.reject("sfsdfsdfsdf"));
			Promise.all(Store.getPromises()).then(() => {
				res.status(200).send(buildPage(html, Store.getStore()));
			}).catch((error) => {
				res.status(200).send(buildPage(html));
			});
		} else {
			res.status(404).send("Not found");
		}
	});
}
