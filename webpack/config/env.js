module.exports = {
	__PORT__: typeof process.env.PORT === "undefined" ? 8080 : process.env.PORT,
	__DEV__:
		typeof process.env.NODE_ENV === "undefined" ||
		process.env.NODE_ENV !== "production"
};
