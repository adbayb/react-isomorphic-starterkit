import React from "react";
import { Route } from "react-router";
import Root from "containers/root/Root";
import Example from "containers/pages/example/Example";

export default (
	<Route>
		<Route path="/" component={Root}>
			{/* <IndexRoute component={Navbar} /> */}
			<Route path="/example" component={Example}/>
		</Route>
		<Route path="*" component={<div>Not found</div>} />
	</Route >
);
