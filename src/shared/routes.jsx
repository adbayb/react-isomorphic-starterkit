import React from "react";
import { browserHistory, Router, Route, IndexRoute } from "react-router";
import App from "./components/app.jsx";
import Example from "./components/example/example.jsx";
import Welcome from "./components/welcome/welcome.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Single from "./components/single/single.jsx";
import NotFound from "./components/404/404.jsx";

export default(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Navbar}/>

			<Route path="/single" component={Single}>
				<Route path="example" component={Example}/>
				<Route path="welcome" component={Welcome}>
					<Route path=":name">
						<Route path=":age"/>
					</Route>
				</Route>
			</Route>
		</Route>

		<Route path="*" component={NotFound}/>
	</Router>
);
