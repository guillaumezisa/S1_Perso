// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueur;
	var page;
	var fichier ;
	var nb;
	// LECTURE DU JSON
	fichier = fs.readFileSync("nb_"+query.pseudo+".json","utf-8");
	nb = JSON.parse(fichier);
	 
	console.log(nb);
	console.log(nb[0]);
	// GÉNÉRER DES MARQUEURS

	marqueur = {};
	marqueur.pseudo = query.pseudo;

	if ( query.text === String(nb[0])){
		marqueur.gg = ("<form action='req_nb_commencer' methode='GET'><input type='hidden' name='pseudo' value='"+query.pseudo+"'><button>Recommencer</button></form><br>Nice tu as trouvé !!");
	} else {
		if ( Number(query.text) > nb[0] ){
			marqueur.gg = ("Trop grand !!");
		}else {
			marqueur.gg = ("Trop petit !!");
		}
	}


	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('nb.html', 'utf-8');

	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
