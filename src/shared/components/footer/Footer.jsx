import React from "react";
import styles from "./Footer.scss";

const Footer = (props) => {
	return (
		<footer className={styles.footer}>
			{props.children}
		</footer>
	);
};

Footer.propTypes = {
	children: React.PropTypes.node.isRequired
};

export default Footer;
