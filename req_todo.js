// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
		console.log("coucou");
	var marqueur;
	var page;
	var fichier ;
	var todo ;
	// LECTURE DU JSON

	fichier = fs.readFileSync("todo_"+query.pseudo+".json");
	todo = JSON.parse(fichier);
	console.log(query.pseudo);	

	// AJOUT DU QUERY.WAZA DANS LE JSON
	todo.push(query.waza);
	
	
	// GÉNÉRATION DES MARQUEURS 
	var début;
	var fin ;
	var milieu;
	
	for (var i = 0 ; i < todo.length ; i++ ){
		if (milieu === undefined){
			milieu = "<br>"+todo[i]+"<br><form action='req_todo_supprimer'methode='GE'><input type='hidden' name='pseudo' value="+query.pseudo+"><button name='rm'value="+i+">supprimer</button></form>";
		}else {
			milieu = milieu+"<br>"+todo[i]+"<br><form action='req_todo_supprimer'methode='GE'><input type='hidden' name='pseudo' value="+query.pseudo+"><button name='rm'value="+i+">supprimer</button></form>";
		}
	}

	marqueur = {};
	marqueur.pseudo = query.pseudo;
	marqueur.todoliste=milieu;
	
	if( todo.length === 0 ){
		marqueur.todoliste=""
	}
	// MODIFICATION DU JSON

	fichier = JSON.stringify(todo);
	todo = fs.writeFileSync("todo_"+query.pseudo+".json",fichier,'utf-8');

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('todo.html', 'utf-8');

	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
