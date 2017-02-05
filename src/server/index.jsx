import React from "react";
import { renderToString } from "react-dom/server";
import { match } from "react-router";
import ErrorLayout from "components/errorLayout/ErrorLayout";
import Routes from "containers/routes/Routes";
import Server from "./Server";

export default (location, onSuccess, onError, onRedirect) => {
	return match({ routes: Routes, location }, (error, redirectLocation, renderProps) => {
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
				onError(
					500,
					renderToString(
						<ErrorLayout
							stack={err.stack || err.toString()}
							name={err.name}
							message={err.message}
							statusCode={500}
						/>
					)
				);
			}
		} else {
			onError(404, "Not found");
		}
	});
};
