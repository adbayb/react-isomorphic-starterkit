import React from "react";
import styles from "./header.scss";

//Stateless component:
const Header = props => {
	return (
		<header className={styles.header}>
			<p className={styles.text}> {props.text} </p>
		</header>
	);
};

Header.propTypes = {
	text: React.PropTypes.string.isRequired
};

export default Header;
