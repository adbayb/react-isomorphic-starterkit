import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/about/About";

class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/about" component={About} />
				<Route
					component={() => {
						return <div>Not found</div>;
					}}
				/>
			</Switch>
		);
	}
}

export default App;
