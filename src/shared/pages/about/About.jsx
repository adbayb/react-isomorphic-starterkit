import React, { Component } from "react";
import styles from "./About.css";

class About extends Component {
	componentDidMount() {
		console.log("Client side: componentDidMount()");
	}

	onClick = () => {
		console.log("Client side: onClick()");
	};

	render() {
		return (
			<div className={styles.about}>
				<img src={require("./img/react.png")} />
				<button onClick={this.onClick}> Click Me </button>
			</div>
		);
	}
}

export default About;
