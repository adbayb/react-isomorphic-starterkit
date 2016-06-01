//var webpack = require("webpack");
var webpackConfig = require("./webpack.shared.js");

module.exports = [webpackConfig.client, webpackConfig.server];
