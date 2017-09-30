import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("app")
);

// Immutable routes to avoid hmr warning:
// ```Warning: [react-router] You cannot change <Router routes>; it will be ignored```
// const routes = Routes;

// function mount() {
// 	// We don't need to have 2 versions of mount (dev + prod) since
// 	// When in production, AppContainer is automatically disabled,
// 	// and simply returns its children (cf. https://github.com/gaearon/react-hot-loader/tree/next-docs/docs):
// 	render(<Client routes={routes} />, document.getElementById("root"));
// }

// mount();

// if (module.hot) {
// 	module.hot.accept("containers/routes/Routes", () => {
// 		mount();
// 	});
// }
