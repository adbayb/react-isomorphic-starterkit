import React from "react";
import { browserHistory, Router, Route, IndexRoute } from "react-router";
import App from "./components/app.jsx";
import Example from "./components/example/example.jsx";
import Welcome from "./components/welcome/welcome.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Single from "./components/single/single.jsx";
import NotFound from "./components/404/404.jsx";

export default(
	/*
	<Router history={browserHistory}>
	permet de gérer les url plus proprement (i.e sans les références du style ?_k=nt2q3u
	mais le serveur doit supporter history location.
	Or http-server ne le supporte pas, du coup react-router n'est pas appelé lors
	du refresh d'une route en dehors de la racine.
	Il faut configurer le serveur pour accepter history location (recoder un server avec express par exemple):
	*/
	<Router history={browserHistory}>
		{/*Le path ne doit pas contenir / mais seulement le nom du chemin (sauf pour pour la racine "/")
		 Auquel cas, le nom de la route sera checké au sens strict (ie "welcome/" ne sera valide que si
		 on ajoute / à l'url, alors que "welcome" sera valide lorsque l'on tappera welcome ou welcome/*/}
		<Route path="/" component={App}>
			{/*IndexRoute permet de sélectionner la route enfant qui sera affiché par défaut quand on est sur "/":*/}
			<IndexRoute component={Navbar}/>

			<Route path="/single" component={Single}>
				{/*Les composants spécifiés dans les routes enfants seront ajoutés dans
				 props.children du composant de la route parent (soit ici App.props.children)
				 C'est la raison pour laquelle dans le render de App, on a ajouté
				 {this.props.children} pour afficher les enfants*/}
				<Route path="example" component={Example}/>
				<Route path="welcome" component={Welcome}>
					{/*inutile de spécifier le component dans <Route path=":age"/>
					 puisqu'on reste dans le contexte (composant) de la route parent*/}
					<Route path=":name">
						<Route path=":age"/>
					</Route>
					{/*//ou:
					 <Route path=":name" component={Welcome} />
					 <Route path=":name/:age" component={Welcome} />
					 */}
				</Route>
			</Route>
		</Route>

		{/*No match route (route par défaut si non trouvé):*/}
		<Route path="*" component={NotFound}/>
	</Router>
);
