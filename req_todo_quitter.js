// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSynC('modele_accueil_membre.html', 'utf-8');

	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	
	fs.unlink("todo_"+query.pseudo+".json","utf-8");
};


module.exports = trait;
