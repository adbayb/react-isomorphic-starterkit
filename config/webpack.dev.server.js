var config = require("./webpack.shared.js");

var serverConfig = config.server;
serverConfig.name = "dev-server";
serverConfig.output.publicPath = "http://localhost:8081/";

module.exports = serverConfig;
