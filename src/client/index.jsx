import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../shared/App";

const mount = () => {
	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		document.getElementById("app")
	);
};

if (module.hot) {
	module.hot.accept("../shared/App", () => {
		mount();
	});
}

mount();
