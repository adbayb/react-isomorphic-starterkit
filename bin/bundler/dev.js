const webpack = require("webpack");
const { configServer } = require("../../config/webpack.dev.js");

const compiler = webpack(configServer);

compiler.run((err, stats) => {
	const { hash, startTime, endTime } = stats;

	if (err) {
		console.error(err.message);
	}

	console.log(`webpack server built ${hash} in ${endTime - startTime} ms`);
});
