const express = require('express');
const path = require('path');

const server = express();
//on check les variables d'environnement système si un port
//est définit par défaut via process.env, auquel cas on définit par défault
//le port à 8080:
const port = process.env.PORT || 8080;

//On définit le répertoire contenant les fichiers statiques (images, css ...)
//pour que ces derniers soient résolues par /ressource.ext au lieu de /public/ressource.ext:
server.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
//Tous les requêtes passées au client web seront traitées par index.html
//donc par le javascript bundlé dans index.html et donc par react-router
//afin d'éviter les 404 en dehors de /:
server.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
});

//TODO: utiliser an http api pour logguer les GET, POST...:
server.listen(port, function() {
	var host = this.address().address;
	console.log('Server launched at http://%s:%s', host, port);
});
