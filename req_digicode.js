// REQ DIGICODE
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueurs;
	var page;
	var digicode;
	var fichier ;

	// LECTURE DU JSON 
	fichier = fs.readFileSync("digicode_"+query.pseudo+".json","utf-8");
	digicode = JSON.parse ( fichier );
	
	if (digicode.length < 5 ){
		if ( query.code ){
			digicode.push(query.code);	
		}
	}
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL
	
	page = fs.readFileSync('digicode.html', 'utf-8');
	
	// CREATION DES MARQUEURS

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo ;
	marqueurs.code = "" ;
	
	// VERIFICATION DU CODE 

	if ( digicode.length === 4 ){
		if ( digicode[0] === "7" && digicode[1] === "7" && digicode[2] === "7" && digicode[3] === "7" ){
			marqueurs.code = "DÉVÉROUILLER";
		} else {
			marqueurs.code = " MAUVAIS CODE";
			digicode = [];
		}
	}

	// ENREGISTREMENT DU JSON

	fichier = JSON.stringify(digicode);
	digicode = fs.writeFileSync("digicode_"+query.pseudo+".json",fichier,"utf-8");
	
	// ENVOIE DE LA PAGE 

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
