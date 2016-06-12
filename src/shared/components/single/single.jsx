import React from "react";

const Single = props => {
	return(
		<div className="container">
			{props.children}
		</div>
	);
};

Single.propTypes = {
	children: React.PropTypes.element.isRequired
};

export default Single;
