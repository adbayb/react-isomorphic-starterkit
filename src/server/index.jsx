import React from "react";
import { renderToString } from "react-dom/server";
import { match } from "react-router";
import Routes from "containers/routes/Routes";
import Server from "./Server";

export default (location, onSuccess, onError, onRedirect) => {
	return match(
		{ routes: Routes, location },
		(error, redirectLocation, renderProps) => {
			if (error) {
				console.log(error);
				return onError(500, "Internal Server Error");
			} else if (redirectLocation) {
				return onRedirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				try {
					return onSuccess(
						renderToString(<Server renderProps={renderProps} />)
					);
				} catch (err) {
					onError(500, renderToString(<div> An error occured </div>));
				}
			} else {
				onError(404, "Not found");
			}
		}
	);
};
