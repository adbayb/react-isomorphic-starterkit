import React from "react";
import styles from "./header.scss";

class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<header className={styles.header}>
				<p className={styles.text}> I'm the Header and I'm cool :) </p>
			</header>
		);
	}
}

export default HeaderComponent;
