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
	// CREATION D'UN JSON
	todo = [];
	toDo = JSON.stringify(todo);
	fichier = fs.writeFileSync("todo_"+query.pseudo+".json",toDo,"utf-8");

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('todo_commencer.html', 'utf-8');

	marqueur = {};
	marqueur.pseudo = query.pseudo;
	marqueur.todoliste ="";
	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
