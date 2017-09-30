import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.css";

const Title = props => {
	return <h1 className={styles.title}>{props.children}</h1>;
};

Title.propTypes = {
	children: PropTypes.node.isRequired
};

export default Title;
