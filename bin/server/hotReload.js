var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../../config/webpack.dev");

new WebpackDevServer(webpack(webpackConfig), {
	publicPath: webpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true
}).listen(8080, "localhost", function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Webpack Server launched at localhost:8080 (hot reload enabled)");
});
