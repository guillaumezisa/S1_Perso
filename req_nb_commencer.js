// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
		console.log("coucou");
	var marqueur;
	var page;
	var fichier ;
	var nb;
	var NB ;
	// CREATION D'UN JSON

	nb = Math.floor(Math.random()*10+1);
	NB = [nb];

	fichier = JSON.stringify(NB);
	NB = fs.writeFileSync("nb_"+query.pseudo+".json", fichier , "utf-8");
	
	// CREATION DES MARQUEURS
	
	marqueur = {};
	marqueur.pseudo = query.pseudo;
	marqueur.gg ="";
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('nb.html', 'utf-8');
	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
