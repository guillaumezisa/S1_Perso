"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var fichier ;
	var chat
	
	// CREATION DES MARQUEURS
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.chat = "Pour rejoindre le chat cliquer sur rejoindre";
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('chat.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
