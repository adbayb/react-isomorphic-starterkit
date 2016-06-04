import React from "react";
import styles from "./example.css";

class Example extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//Les fonctions de cycle de vie d'un composant telles que componentDidMount()
		//et les évènements dom ne peuvent pas être gérés par côté serveur. D'où l'intérêt d'inclure
		//notre bundle javascript côté client pour gérer les intéractions utilisateurs !
		//On voit ici clairement l'avantage d'une application isomorphique: une première page statique est généré
		//par le serveur (autorisant l'affichage de contenu même pour un utilisateur ne disposant pas de javascript)
		//et les intéractions DOM (comme onClick()...) et sur le cycle de vie du composant sont gérées côté client:
		console.log("I'm mounted");
	}

	onClick() {
		console.log("Ayoub");
	}

	render() {
		return (
			<div>
				<p className={styles.text}> I'm the example Component and I"m lazy </p>
				<img src={require("./img/react.png")} className={styles.logo}/>

				<button onClick={this.onClick.bind(this)}> Click Me </button>
			</div>
		);
	}
}

export default Example;
