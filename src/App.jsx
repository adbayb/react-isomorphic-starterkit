import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import About from "./pages/about/About";

import "public/css/core.css";

// __BROWSER__ and __NODE__ env globale variables useful
// for specific platform features (or to implement feature flag...)
// For example, to inject polyfill fonctions for browser environment
// if (__BROWSER__) {
// 	require("./utils/polyfill.js");
// }
console.log("ENVIRONMENT VARS", "__DEV__ = ", __DEV__);
console.log("ENVIRONMENT VARS", "__BROWSER__ = ", __BROWSER__);
console.log("ENVIRONMENT VARS", "__NODE__ = ", __NODE__);

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
