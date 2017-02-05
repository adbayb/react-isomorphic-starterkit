import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "components/app/App";
import Example from "components/example/Example";
import Welcome from "components/welcome/Welcome";
import Navbar from "components/navbar/Navbar";
import Single from "components/single/Single";
import ErrorLayout from "components/errorLayout/ErrorLayout";

export default (
	<Route>
		<Route path="/" component={App}>
			<IndexRoute component={Navbar} />

			<Route path="/single" component={Single}>
				<Route path="example" component={Example} />
				<Route path="welcome" component={Welcome}>
					<Route path=":name">
						<Route path=":age" />
					</Route>
				</Route>
			</Route>

		</Route>
		<Route path="*" component={ErrorLayout} />
	</Route >
);
