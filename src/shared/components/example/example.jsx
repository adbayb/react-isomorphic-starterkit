import React from "react";
import styles from "./example.css";

class ExampleComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("I'm mounted");
	}

	onClick() {
		console.log("Ayoub");
	}

	render() {
		return (
			<div>
				<p className={styles.text}> I"m the example Component and I"m lazy </p>
				<img src={require("./img/react.png")} className={styles.logo}/>

				<button onClick={this.onClick.bind(this)}> Click Me </button>
			</div>
		);
	}
}

export default ExampleComponent;
