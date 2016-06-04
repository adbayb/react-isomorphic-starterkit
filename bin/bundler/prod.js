var webpack = require("webpack");
var ProgressPlugin = require("webpack/lib/ProgressPlugin");
var config = require("../../config/webpack.prod.js");

var compiler = webpack(config);
//Tout plugin Webpack a comme point d'entrée apply. La fonction apply de webpack permet donc d'appeler
//le point d'entrée du plugin en paramètre et de l'appliquer à la compilation en cours.
//Ici plugin permettant d'afficher un pourcentage de progression:
compiler.apply(new ProgressPlugin(function(percentage, log) {
	//console.log(Math.floor(percentage * 100) + "% ", log);
	//process.stdout.write permet d'écrire directement sur la console nativement sans console.log
	//Le fin de caractère \r permet déplacer la future ligne sur la première colonne écrasant donc l'ancienne ligne
	//cela permet de logguer sur une ligne:
	//process.stdout.write(Math.floor(percentage * 100) + "% " + log + "\r");
	//Mais la ligne précédente réécrit sur la ligne sans effacer les précédents caractères, cette solution permet d'y remedier:
	process.stdout.clearLine();//Nettoyage du buffer console
	process.stdout.cursorTo(0);//Reset du curseur à la première colonne
	process.stdout.write(Math.floor(percentage * 100) + "% " + log);//Ecriture dans le flux de sortie (console)
}));
//On lance le processus de bundling via l'api webpack run:
//L'équivalent en ligne de commande: webpack -p --progress --colors --config ./config/webpack.prod.js
compiler.run(function(err, stats) {
	if(err)
		return console.error(err.message);

	console.log(stats.toString({
		colors: true
	}));
});
