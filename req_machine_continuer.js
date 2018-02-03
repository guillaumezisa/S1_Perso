// GENERER LA MACHINE A SOUS AVEC 500 PIECE

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var fichier ;
	var partie ;

	// LECTURE DU JSON
	
	fichier = fs.readFileSync("machine_"+query.pseudo+".json",partie,"utf-8");
	partie = JSON.parse(fichier);

	// GÉNÉRATION D'UN TOUR ALÉATOIRE

	console.log(partie);
	
	
	// CRÉATION DES MARQUEURS
	
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('machine_commencer.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
