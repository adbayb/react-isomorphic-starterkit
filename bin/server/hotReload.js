var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var configWebpack = require("../../config/webpack.dev");

new WebpackDevServer(webpack(configWebpack), {
	publicPath: "/",//TODO @récupérer à partir de webpackConfig
	hot: true,
	historyApiFallback: true,
	quiet: true
}).listen(8080, "localhost", function(err) {
	if(err) {
		console.log(err);
	}
	console.log("Webpack Server launched with at localhost:8080 (Hot Module Replacement [HMR] enabled)");
});
