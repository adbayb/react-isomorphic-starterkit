const webpack = require("webpack");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const config = require("../../config/webpack.prod.js");

const compiler = webpack(config);

compiler.apply(new ProgressPlugin((percentage, log) => {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`${Math.floor(percentage * 100)} % ${log}`);
}));

compiler.run((err, stats) => {
	if (err) {
		console.error(err.message);
	}

	console.log(stats.toString({
		colors: true
	}));
});
