"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var fichier ;
	var distrib

	// LECTURE DU JSON
		
	fichier =fs.readFileSync("distrib_"+query.pseudo+".json","utf-8");
	distrib = JSON.parse(fichier);

	

	// CREATION DES MARQUEURS
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;

	if ( distrib[2][0][0] === "0"){
		marqueurs.fin = "une canette";
	} else if ( distrib[2][0][0] === "1"){
		marqueurs.fin = "un kinder"
	} else if ( distrib[2][0][0] === "2"){
		marqueurs.fin = "des chips";
	}

	fichier = JSON.stringify(distrib);
	distrib = fs.writeFileSync("distrib_"+query.pseudo+".json",fichier,"utf-8");
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('distrib_fin.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
