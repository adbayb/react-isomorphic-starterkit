import React from "react";
import styles from "./example.css";

class Example extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("Client side: componentDidMount()");
	}

	onClick() {
		console.log("Client side: onClick()");
	}

	render() {
		return(
			<div>
				<p className={styles.text}> Example Component: </p>
				<img src={require("./img/react.png")} className={styles.logo}/>

				<button onClick={this.onClick.bind(this)}> Click Me </button>
			</div>
		);
	}
}

export default Example;
