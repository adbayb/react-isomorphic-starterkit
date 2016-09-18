import React from "react";
import { Store, fetchAsyncData } from "../../helpers";

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			asyncData: props.asyncData
		};
	}

	componentDidMount() {
		if(typeof window !== "undefined") {
			//Si le composant est monté pour la première fois, on ne doit pas fetcher
			//les données puisqu'elles ont déjà été fetchées par le serveur via window.INITIAL_DATA:
			if(!Welcome.firstLoad) {
				fetchAsyncData((data) => {
					console.log("Client side: Fetching Data");
					this.setState({asyncData: data});
				}, (error) => {
					this.setState({asyncData: error});
				});
			} else {
				console.log("Client side: No needs for Fetching Data");
				Welcome.firstLoad = false;
			}
		}
	}

	renderAsyncData() {
		let { asyncData } = this.state;
		
		if(asyncData) 
			return asyncData.map((value, index) => {
				return (
					<p key={index}> {value.url} </p>
				);
			});

		return null;
	}

	render() {
		let { params } = this.props;
		
		return(
			<div>
				<p> Welcome {params.name} to React world ! [You are {params.age} years old] </p>
				{ this.renderAsyncData() }
			</div>
		);
	}
}


Welcome.firstLoad = true;
Welcome.propTypes = {
	params: React.PropTypes.object,
	asyncData: React.PropTypes.array.isRequired
};

if(typeof window === 'undefined') {
	//Côté serveur: 
	//On appelle un membre statique (defaultProps), ce dernier
	//sera appliqué au lancement du serveur et persistera en mémoire jusqu'à la fermeture du serveur
	//L'utilisation d'un membre statique permet d'être sûr de disposer de nos données initiales  
	//lorsqu'un client fera une requête sur notre serveur.
	//Cependant, le risque est que la méthode fetch n'ait pas terminé sa requête côté serveur et 
	//que le client fait une requête sur le serveur: dans ce cas le defaultProp ne sera pas initialisé et 
	//on aura un rendu string sans les données initiales. Pour éviter cela, on peut faire le fetchAsyncData,
	//au niveau de src/server/index.js et seulement en cas de succès on retourne le rendu html avec la data initiale
	//en cas d'échec on retourne le rendu html sans la data:
	const promise = fetchAsyncData((data) => {
		Welcome.defaultProps = {asyncData: data};
		Store.createStore(data);
	});
	Store.registerPromise(promise);
} else {
	Welcome.defaultProps = {asyncData: window.INITIAL_DATA}
}

export default Welcome;
