import React from "react";

class NotFoundComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="404">
				<p>
					Oups, route not found :( [404]
				</p>
			</div>
		);
	}
}

export default NotFoundComponent;