"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var fichier ;
	var okay;
	
	// CRÉATION DU JSON
	var distrib = [
						[
							["chips",150],		///	[0][0]				
							["canette",100],		/// 	[0][1]				STOCK DISTRIB
							["poulet",1000],			///	[0][2]
						],
						[10000],						/// 	[1]				ARGENT CLIENT	
						[
							"x","x","x"
						],
					];
	
	okay = JSON.stringify(distrib);
	fichier = fs.writeFileSync("distrib_"+query.pseudo+".json",okay,"utf-8");

	// CREATION DES MARQUEURS
	marqueurs = {};
	marqueurs.pseudo = query.pseudo;
	marqueurs.fin = "";
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('distrib_commencer.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
