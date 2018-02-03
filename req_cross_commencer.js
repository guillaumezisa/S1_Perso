// REQ CROSS
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueur;
	var page;
	var fichier ;
	var cross ;
	var hor ;
	var ver ;
	var liste ;
	// CRÉATION D'UN FICHIER JSON
	cross = 	[
					[1,1,1],
					[1,1,1],
					[1,1,1],
				];

	// CRÉATION DES MARQUEURS
	
	marqueur = {};
	for ( var x = 0 ; x < 3 ; x++ ){
		for ( var y = 0 ; y < 3 ; y++ ){
			if ( cross[x][y] === 1 ){
				marqueur.pion = "bleu.png";
			} else {
				marqueur.pion = "rouge.png";
			}
		}
	}
		marqueur.pseudo = query.pseudo;

	// ENREGISTREMENT DU JSON
	
	fichier = JSON.stringify(cross);
	cross = fs.writeFileSync("cross_"+query.pseudo+".json",fichier,"utf-8");

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('cross.html', 'utf-8');

	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
