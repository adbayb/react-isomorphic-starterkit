var express = require("express");
var compress = require("compression");
var favicon = require('serve-favicon');
var morgan = require('morgan');
var path = require("path");
var serverSideRendering = require("../../dist/server/server.bundle.js");

var server = express();

server.use(compress({ threshold: 0 }));

//HTTP logger middleware:
server.use(morgan('combined'));

//Définition des dossiers publics avec assets accessibles (sous express, on peut définir plusieurs dossiers en public):
//Dossier public pour les ressources statiques non gérées par webpack:
server.use(express.static(path.resolve(__dirname, "..", "..", "public")));
//Dossier dist pour les ressources compilées et/ou déplacées par webpack 
//(on ne prend pas le dossier server mais seulement client car on a besoin du client.bundle.js dans le html
//il doit donc être accessible par le navigateur (le serveur de son côté peut accéder aux ressources 
//privées donc inutile de mettre dist/server en public)):
server.use(express.static(path.resolve(__dirname, "..", "..", "dist", "client")));

//Middleware favicon pour optimiser la gestion du favicon (optionnel mais intéressant 
//dans le sens où cela permet de cacher les requêtes favicon.ico du logguer):
server.use(favicon(path.resolve(__dirname, "..", "..", "public", "favicon.ico")));

//Toutes les requêtes sont prises en charge par serverSideRendering (par react-router):
//server.use(path, middleware): si path n'est pas spécifié comme ici, le middleware sera appliqué sur toutes les requêtes
//<=> server.get("*", middleware):
server.use(function(req, res) {
	serverSideRendering.default(req, res);
});

var PORT = process.env.PORT || 8080;
server.listen(PORT, function() {
	var HOST = this.address().address;
	//var port = this.address().port;
	console.log("Server launched at http://%s:%s", HOST, PORT);
});
