"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var fichier ;
	var distrib
	var argent ;
	var fin = false ;
	var rendre;
	// LECTURE DU JSON
		
	fichier =fs.readFileSync("distrib_"+query.pseudo+".json","utf-8");
	distrib = JSON.parse(fichier);
	
	// TEST POUR LA VALEUR DE RENDRE

	// rendre = Number(distrib[2][2])-50;

	// VERIFIC  ATION DES INFORMATIONS ENTRER

	if ( distrib[2][2] !== "x" && distrib[2][1] !== "x" && distrib[2][0] !== "x" ){
		if ( Number(distrib[2][2]) === 150 || Number(distrib[2][2]) > 150  && distrib[2][0] === "1" && distrib[2][1] === "a" || distrib[2][1] === "b" ||distrib[2][1] === "c" ){	
			console.log("1");
			if ( Number(distrib[2][2]) === 150){
				console.log("2");
				fin = "chips";
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			} else if (  Number(distrib[2][2]) > 150 ){
				console.log("3");
				fin = "chips";
				rendre = Number(distrib[2][2])-150;
				distrib[1] = distrib[1]+rendre ;
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			}
		} else if ( Number(distrib[2][2]) === 100 || Number(distrib[2][2]) > 100  && distrib[2][0] === "2" || distrib[2][0] === "3" && distrib[2][1] === "a" || distrib[2][1] === "b" ||distrib[2][1] === "c" ){
			if ( Number(distrib[2][2]) === 100){
				fin = "canette";
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			} else if ( Number(distrib[2][2]) > 100 ){
				fin = "canette";
				rendre = Number(distrib[2][2])-100;
				distrib[1] = distrib[1]+rendre ;
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			}
		} else if ( Number(distrib[2][2]) === 1000 || Number(distrib[2][2]) > 1000  && distrib[2][0] === "4" && distrib[2][1] === "a" || distrib[2][1] === "b" ||distrib[2][1] === "c" ){
			if ( Number(distrib[2][2]) === 1000){
				fin = "poulet"
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			} else if ( Number(distrib[2][2]) > 1000 ){
				fin = "poulet"
				rendre = Number(distrib[2][2])-1000;
				distrib[1] = distrib[1]+rendre ;
				distrib[2][0] = "x";
				distrib[2][1] = "x";
				distrib[2][2] = "x";
			}
		}
	}
	// SI LE JOUEUR A CLIQUER DES SOUS
	if ( query.argent){
		console.log("argent");
		if ( distrib[2][2] === "x") {
			if ( query.argent === "0" ){
				distrib[2][2] = "20" ;
				distrib[1] = distrib[1]-20;
			}else if ( query.argent === "1" ){
				distrib[2][2] = "50" ;
				distrib[1] = distrib[1]-50;
			}else if ( query.argent === "2" ){
				distrib[2][2] = "100" ;
				distrib[1] = distrib[1]-100;
			}else if ( query.argent === "3" ){
				distrib[2][2] = "200" ;
				distrib[1] = distrib[1]-200;
			}
		} else {
			if ( query.argent === "0" ){
				distrib[2][2] = String(Number(distrib[2][2])+20) ;
				distrib[1] = distrib[1]-20 ;
			}else if ( query.argent === "1" ){
				distrib[2][2] = String(Number(distrib[2][2])+50) ;
				distrib[1] = distrib[1]-50 ;
			}else if ( query.argent === "2" ){
				distrib[2][2] = String(Number(distrib[2][2])+100) ;
				distrib[1] = distrib[1]-100 ;
			}else if ( query.argent === "3" ){
				distrib[2][2] = String(Number(distrib[2][2])+200) ;
				distrib[1] = distrib[1]-200 ;
			}
		}	
	// SI LE JOUEUR A CLIQUER UN BOUTON
	} else if ( query.button ){
		if( distrib[2][0] === "x" && query.button === "1" || query.button === "2" || query.button === "3" || query.button === "4" ){
			distrib[2][0] = query.button;
			
		} else if( distrib[2][1] === "x" && query.button === "a" || query.button === "b" || query.button === "c" || query.button === "d" ){
			distrib[2][1] = query.button;
		}
	}

	// CREATION DES MARQUEURS
	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	marqueurs.argent = " | Porte monnaie : "+distrib[1]+" € |";
	marqueurs.fin = "";
	marqueurs.rejouer = "<form action='req_distrib_commencer' methode='GET'><input type='hidden' name='pseudo' value='"+query.pseudo+"'><button>Reinitialiser</button></form><form action='req_distrib' methode='GET'><input type='hidden' name='pseudo' value='"+query.pseudo+"'><button>Valider</button></form> ";
	if ( fin === "chips" ){
		marqueurs.fin = "Vous avez recut un paquet de chip ";		
	} else if ( fin === "canette"){
		marqueurs.fin = "Vous avez recut une canette ";		
	} else if ( fin === "poulet"){
		marqueurs.fin = "Vous avez recut une poulet ";		
	}

	fichier = JSON.stringify(distrib);
	distrib = fs.writeFileSync("distrib_"+query.pseudo+".json",fichier,'utf-8');
	
	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('distrib.html', 'utf-8');
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
