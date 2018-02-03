// GENERER LA MACHINE A SOUS AVEC 500 PIECE

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var fichier ;
	var partie ;

	// CRÉATION DES MARQUEURS
	
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync("modele_accueil_membre.html","utf-8");
	page = fs.unlink('machine_'+query.pseudo+'.json');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
