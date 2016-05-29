import React from "react";

//Stateless component:
const SingleComponent = props => {
	return(
		<div className="container">
			{props.children}
		</div>
	);
};

SingleComponent.propTypes = {
	children: React.PropTypes.element.isRequired
};

export default SingleComponent;
