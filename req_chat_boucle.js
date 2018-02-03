"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var fichier ;
	var chat ;
	var lechat;
	
	// LECTURE DU JSON
	fichier = fs.readFileSync("chat.json","utf-8");
	chat = JSON.parse(fichier);
	
	if (query.text === "£"){
	} else {
		chat[0].push(query.pseudo);
		chat[1].push(query.text);
	}
	if ( chat[0].length > 10 ){
		chat[0].splice(0,1)
		chat[1].splice(0,1)
	}

	console.log(chat);	
	// CREATION DES MARQUEURS
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	
	for ( var i = 0 ; i < chat[0].length ; i++ ){
		if ( i === 0 ) {
			lechat = chat[0][0]+" : "+chat[1][0]+"<br>";
		} else { 
			lechat = lechat+chat[0][i]+" : "+chat[1][i]+"<br>";
		}
	}
	
	marqueurs.chat = lechat;

	fichier = JSON.stringify(chat);
	chat = fs.writeFileSync("chat.json",fichier,"utf-8");
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('chat_boucle.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
