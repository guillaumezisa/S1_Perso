// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueur;
	var page;
	var fichier ;
	var partie ;
	
	// creation d'un JSON

	
	marqueur = {};
	marqueur.pseudo = query.pseudo;
	marqueur.nourriture = partie[1];
	marqueur.equipement = partie[2];

	// AFFICHAGE DE LA PAGE D'ACCUEIL
	page = fs.readFileSync('newworld_commencer.html', 'utf-8');
	page = page.supplant(marqueur);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
