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
	// CRÉATION DES MARQUEURS
	
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;

	if ( partie[0][0] === partie[1][0] && partie[1][0] === partie[2][0] ) {
		if ( partie[0][0] === 1){
				partie[3][0] = Number(partie[3][0])+100
				marqueurs.resultat = "Vous avez gagner 100$";
		} else if ( partie[0][0] === 2){
				partie[3][0] = Number(partie[3][0])+200
				marqueurs.resultat = "Vous avez gagner 200$";
		} else if ( partie[0][0] === 3){
				partie[3][0] = Number(partie[3][0])+350
				marqueurs.resultat = "Vous avez gagner 350$";
		} else if ( partie[0][0] === 4){
				partie[3][0] = Number(partie[3][0])+500
				marqueurs.resultat = "Vous avez gagner 500$";
		} else if ( partie[0][0] === 5){
				partie[3][0] = Number(partie[3][0])+750
				marqueurs.resultat = "Vous avez gagner 750$";
		} else if ( partie[0][0] === 6){
				partie[3][0] = Number(partie[3][0])+1000
				marqueurs.resultat = "Vous avez gagner 1000$";
		} else if ( partie[0][0] === 7){
				partie[3][0] = Number(partie[3][0])+12000
				marqueurs.resultat = "JACKPOT !! Vous avez gagner 12000$";
		}
	} else {
		marqueurs.resultat = "Vous avez perdu :B";
	}
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('machine_resultat.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
