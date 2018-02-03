// REQ DIGICODE COMMENCER
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var digicode;
	var fichier ;
	
	// CRÉATION D'UN JSON

	digicode = []
	fichier = JSON.stringify(digicode);
	fs.writeFileSync("digicode_"+query.pseudo+".json",fichier,"utf-8");
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL
	
	page = fs.readFileSync('digicode_commencer.html', 'utf-8');
	
	// CRÉATION DES MARQUEURS

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.code = "";
	marqueurs.pseudo = query.pseudo ;

	// ENVOIE DE LA PAGE

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
