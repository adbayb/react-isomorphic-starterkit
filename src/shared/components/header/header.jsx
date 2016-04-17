import React from "react";
import styles from "./header.scss";

class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				<p className={styles.header}> I'm the Header and I'm cool :) </p>
			</header>
		);
	}
}

export default HeaderComponent;
