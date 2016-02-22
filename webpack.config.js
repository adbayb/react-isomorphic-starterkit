var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//path permet de résoudre les chemins relatifs en absolus via __dirname et path.resolve notamment:
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var config = {
	//Fichier d'entrée où toutes les dépendances et ressources à inclure 
	//seront cherchées récursivement:
	entry: APP_DIR + '/app.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'all.bundle.js'
	},
	module: {
		//Pour plus de détails sur comment fonctionne la
		//configuration webpack: https://webpack.github.io/docs/configuration.html
		loaders: [
			{
				//exclude est inutile si include est spécifié (sauf si on veut
				//exclure un dossier contenu dans un dossier inclu)
				test: /\.js[x]?$/,
				//exclude: /node_modules/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				//CSS Loader:
				// On extrait tous les contenus des css via ExtractTextPlugin.extract:
				// On aurait très bien pu spécifier la contrainte include sur APP_DIR
				//mais inutile dans le cas où on a du CSS situé en dehors de APP_DIR et que l'on veut inclure:
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				//Image loader:
				//Le plugin file permet de chercher toutes les images et de les inclure dans output.path?name
				//Pour plus de détails: https://github.com/webpack/file-loader/blob/master/README.md
				test: /\.(jp[e]?g|png|gif|svg)$/i,
				loader:'file-loader?name=img/[name].[ext]'
				//loader:'file-loader?name=[path]/[name].[ext]'
			},
		]
	},
	// Le plugin ExtractTextPlugin permet d'assembler tous les css précédemment extrait dans un seul fichier css:
	plugins: [
		new ExtractTextPlugin('all.bundle.css')
	]
};

module.exports = config;
