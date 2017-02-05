import React from "react";
import { browserHistory, Router } from "react-router";

export default ({ routes }) => (
	<Router routes={routes} history={browserHistory} />
);
