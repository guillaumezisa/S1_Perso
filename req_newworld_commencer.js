// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueur;
	var page;
	var fichier ;
	var partie ;
	// CRÉATION D'UN JSON

	partie = [	
					[ query.pseudo , 100 , 5 , 10 ], // Pseudo , vie , karme , psycho
					["saucisson","eau","conserve"], // Nourriture
					["poing"], // arme
					[
						[
							["quelqu'un tape a la porte patatie patata"],
							[
								"mange la personne",
								"mange la porte",
								"mange la patate",
								"dors","ouvre la porte"
							],
						],
					],
				];
	
	console.log(partie);

	marqueur = {};
	marqueur.pseudo = query.pseudo;
	marqueur.vie = partie[0][1];
	marqueur.karma = partie[0][2];
	marqueur.psycho = partie[0][3];
	
	// ENREGISTREMENT DU JSON

	fichier = JSON.stringify(partie);
	// AFFICHAGE DE LA PAGE D'ACCUEIL
	page = fs.readFileSync('newworld_commencer.html', 'utf-8');
	page = page.supplant(marqueur);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
