import React from "react";

class SingleComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container single">
				{this.props.children}
			</div>
		);
	}
}

export default SingleComponent;