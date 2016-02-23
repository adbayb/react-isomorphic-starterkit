import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router';
import ExampleComponent from './components/example/example.jsx';
import HeaderComponent from './components/header/header.jsx';
import WelcomeComponent from './components/welcome/welcome.jsx';

let styles = {
	color: 'white',
	backgroundColor: 'red'
};

class App extends React.Component {
	render() {
		console.log(this.props.children);
		return (
			<div>
				<h1 style={styles}> React template with Webpack, react-router and react-hot-loader </h1>
				<ul>
					<li><Link to="/example">Link to Example component</Link></li>
					<li><Link to="/header">Link to Header component</Link></li>
					<li><Link to="/welcome/Ayoub/23">Link to Welcome component</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
}

/*let routes = (
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
	</Router>
);*/
render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			{/*Les composants spécifiés dans les routes enfants seront ajoutés dans
			props.children du composant de la route parent (soit ici App.props.children)
			C'est la raison pour laquelle dans le render de App, on a ajouté
			{this.props.children} pour afficher les enfants*/}
			<Route path="example" component={ExampleComponent} />
			<Route path="header" component={HeaderComponent} />
			<Route path="welcome/">
				{/*inutile de spécifier le component dans <Route path=":age"/>
				puisqu'on reste dans le contexte (composant) de la route parent*/}
				<Route path=":name/" component={WelcomeComponent}>
					<Route path=":age"/>
				</Route>
				{/*//ou:
				 <Route path=":name" component={WelcomeComponent} />
				 <Route path=":name/:age" component={WelcomeComponent} />
				*/}
			</Route>
		</Route>

		{/*No match route (route par défaut si non trouvé):*/}
		<Route path="*" component={ExampleComponent}/>
	</Router>
), document.getElementById('app'));

//render par défaut sans react-router:
//render(<App/>, document.getElementById('app'));
