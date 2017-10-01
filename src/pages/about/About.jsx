import React, { Component } from "react";
import Title from "components/title/Title";
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
				<Title>About page</Title>
				<img src={require("./img/react.png")} />
				<button onClick={this.onClick}> Click Me </button>
			</div>
		);
	}
}

export default About;
