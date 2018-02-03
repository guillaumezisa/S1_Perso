// GENERER LA MACHINE A SOUS AVEC 500 PIECE

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var fichier ;
	var partie ;
	var alea ;
	// LECTURE DU JSON
	
	fichier = fs.readFileSync("machine_"+query.pseudo+".json","utf-8");
	partie = JSON.parse(fichier);

	// GÉNÉRATION D'UN JEU ALEATOIRE
	
	alea = Math.floor(Math.random()*6+1);
	partie[0][0] = alea ;
	alea = Math.floor(Math.random()*6+1);
	partie[1][0] = alea ;
	alea = Math.floor(Math.random()*6+1);
	partie[2][0] = alea ;
	
	partie[3][0] = Number(partie[3][0])-25;
	
	console.log(partie);
	
	// CRÉATION DES MARQUEURS
	
	marqueurs = {};
	
	marqueurs.waza = "<center><h1> | "+partie[0][0]+" | "+partie[1][0]+" | "+partie[2][0]+" | <br> | "+partie[3][0]+" | </center></h1>" 
	marqueurs.pseudo = query.pseudo;

	// ENREGISTREMENT DU JSON 

	fichier = JSON.stringify(partie);
	partie = fs.writeFileSync("machine_"+query.pseudo+".json",fichier,"utf-8");

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('machine_jouer.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
