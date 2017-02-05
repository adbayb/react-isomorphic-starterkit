import React, { Component, PropTypes } from "react";
import styles from "./ErrorLayout.css";

export default class ErrorLayout extends Component {
	static propTypes = {
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
		statusCode: PropTypes.number,
		production: PropTypes.bool
	};
	static defaultProps = {
		production: false,
		statusCode: 404
	};
	static statusCodeMessage = {
		404: "File Not Found",
		500: "Internal Server Error"
	};

	static getStackOverflow(msg) {
		return `http://stackoverflow.com/search?q=[javascript]+${msg}`;
	}

	static getStatusCodeMessage(code) {
		if (code) {
			return `${code} ${ErrorLayout.statusCodeMessage[code.toString()]}`;
		}

		return null;
	}

	renderHelpers(msg) {
		if (msg) {
			return (
				<div>
					<h4 style={styles.subTitle}>
						Possible solutions:
					</h4>
					<ul>
						<li>
							<a style={styles.link} href={this.constructor.getStackOverflow(msg)}>
								Go to Stack Overflow
							</a>
						</li>
					</ul>
				</div>
			);
		}

		return null;
	}

	renderStatusCode(code) {
		const output = this.constructor.getStatusCodeMessage(code);

		if (output) {
			return (
				<p style={styles.error}>
					{output}
				</p>
			);
		}

		return null;
	}

	renderStack(stack) {
		if (stack) {
			return (
				<p style={styles.stack}>
					{stack}
				</p>
			);
		}

		return null;
	}

	render() {
		const { production, message, stack, statusCode } = this.props;

		if (!production) {
			return (
				<div style={styles.container}>
					{this.renderStatusCode(statusCode)}

					<div className={styles.button}>
						{this.renderStack(stack)}
						{this.renderHelpers(message)}
					</div>
				</div>
			);
		}

		return (
			<div style={styles.container}>
				{this.renderStatusCode(statusCode)}
			</div>
		);
	}
}
