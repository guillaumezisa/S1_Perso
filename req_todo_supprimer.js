// REQ TO DO
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueur;
	var page;
	var todo ;
	var fichier ;
	var toDo;
	// LECTURE DU JSON 
	
	fichier = fs.readFileSync("todo_"+query.pseudo+".json","utf-8");
	todo = JSON.parse(fichier);
	
	// SUPPRESSION

	todo.splice( query.rm , 1 );

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
	if( milieu === undefined ){
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
