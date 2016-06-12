import React from "react";
import styles from "./header.scss";

const Header = props => {
	return(
		<header className={styles.header}>
			<p className={styles.text}>
				{props.children}
			</p>
		</header>
	);
};

Header.propTypes = {
	children: React.PropTypes.string.isRequired
};

export default Header;
