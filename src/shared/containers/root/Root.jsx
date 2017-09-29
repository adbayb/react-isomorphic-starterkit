import React from "react";
import { Link } from "react-router";
import Header from "components/header/Header";
import Footer from "components/footer/Footer";
// Import css from public folder to allow webpack post processing:
import "public/styles/core.css";

let styles = {
	link: {
		display: "block",
		position: "absolute",
		top: "35vh",
		left: "1.5em",
		color: "black",
		backgroundColor: "lightgrey",
		fontSize: "1.5em",
		textDecoration: "none",
		border: "1px solid black"
	},
	footer: {
		color: "white",
		fontSize: "2vmin",
		fontWeight: "bold",
		textAlign: "center"
	}
};

// Decorator test:
const decorator = (target, key, descriptor) => {
	const timer = "debug time:";
	console.time(timer);
	descriptor.value();
	console.timeEnd(timer);
	// console.log(target, key, descriptor);
};

class App extends React.Component {
	@decorator
	test() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Async/Await working");
			});
		});
	}

	async testAsync() {
		console.log(await this.test());
	}

	render() {
		this.testAsync();

		return (
			<div>
				<Header>Isomorphic React Starter Kit v3.0</Header>

				{this.props.children}
				<Link to="/" style={styles.link}>
					Go back
				</Link>

				<Footer>
					<p style={styles.footer}>Feel free to use it and share it</p>
					<p style={styles.footer}>Ayoub ADIB</p>
					<p style={styles.footer}>
						Twitter: <a href="https://twitter.com/adbayb">adbayb</a>
					</p>
					<p style={styles.footer}>
						Github:{" "}
						<a href="https://github.com/adbayb">https://github.com/adbayb</a>
					</p>
				</Footer>
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.element.isRequired
};

export default App;
