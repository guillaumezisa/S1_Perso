// GENERER LA MACHINE A SOUS AVEC 500 PIECE

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var fichier ;
	var partie ;

	// CRÉATION DU JSON
	
	partie = [
					["W"],
					["W"],
					["W"],
				 	[500],
				 ]
	
	fichier = JSON.stringify(partie);
	partie = fs.writeFileSync("machine_"+query.pseudo+".json",fichier,"utf-8");

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
