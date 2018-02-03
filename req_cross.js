// REQ CROSS
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var marqueur;
	var page;
	var fichier ;
	var cross ;
	var hor ;
	var ver ;
	var coo;

	// LECTURE DU JSON
	fichier = fs.readFileSync("cross_"+query.pseudo+".json","utf-8");
	cross = JSON.parse(fichier);
	
	hor = query.couleur[0];
	ver = query.couleur[1];

	for (var x = 0 ; x < 2 ; x++ ){
		for ( var y = 0 ; y < 2 ; y++ ){
			if( cross[x][y] === cross[hor][ver]){
				for (var xi = -1 ; xi < 1 ; xi++ ){
					for ( var yi = -1 ; yi < 1 ; yi++ ){
						if ( xi > 2 || xi < 0 || yi>2 ||yi<0){
						} else {
							cross[x][y] = 2;
							cross[xi][yi] = 2;
						}
					}
				}				
			}
		}
	}
	console.log(cross);
	// CRÉATION DES MARQUEURS
	
	marqueur = {};
	for (var x = 0 ; x < 3 ; x++ ){
		for (var y = 0 ; y < 3 ; y++ ){
			coo = String(x)+String(y);
			if ( cross[x][y] === 1 ){
				if ( query.couleur === "00" ){
					marqueur.pion00 = "rouge.png";
				} else if (query.couleur[x][y] === "01" ){
						marqueur.pion01 = "rouge.png";
				} else if (query.couleur[x][y] === "02" ){
						marqueur.pion02 = "rouge.png";
				} else if (query.couleur[x][y] === "10" ){
						marqueur.pion10 = "rouge.png";
				} else if (query.couleur[x][y] === "11" ){
						marqueur.pion11 = "rouge.png";
				} else if (query.couleur[x][y] === "12" ){
						marqueur.pion12 = "rouge.png";
				} else if (query.couleur[x][y] === "20" ){
						marqueur.pion01 = "rouge.png";
				} else if (query.couleur[x][y] === "12" ){
						marqueur.pion12 = "rouge.png";
				} else if (query.couleur[x][y] === "20" ){
						marqueur.pion01 = "rouge.png";
				} else if (query.couleur[x][y] === "21" ){
						marqueur.pion12 = "rouge.png";
				} else if (query.couleur[x][y] === "22" ){
						marqueur.pion01 = "rouge.png";
				}
			}else if ( cross[x][y] === 2 ){
				if ( query.couleur === "00" ){
						marqueur.pion00 = "bleu.png";
				} else if (query.couleur[x][y] === "01" ){
						marqueur.pion01 = "bleu.png";
				} else if (query.couleur[x][y] === "02" ){
						marqueur.pion02 = "bleu.png";
				} else if (query.couleur[x][y] === "10" ){
						marqueur.pion10 = "bleu.png";
				} else if (query.couleur[x][y] === "11" ){
						marqueur.pion11 = "bleu.png";
				} else if (query.couleur[x][y] === "12" ){
						marqueur.pion12 = "bleu.png";
				} else if (query.couleur[x][y] === "20" ){
						marqueur.pion01 = "bleu.png";
				} else if (query.couleur[x][y] === "12" ){
						marqueur.pion12 = "bleu.png";
				} else if (query.couleur[x][y] === "20" ){
						marqueur.pion01 = "bleu.png";
				} else if (query.couleur[x][y] === "21" ){
						marqueur.pion12 = "bleu.png";
				} else if (query.couleur[x][y] === "22" ){
						marqueur.pion01 = "bleu.png";
				}
			}
		}
	}
	marqueur.pseudo = query.pseudo;

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('cross.html', 'utf-8');

	page = page.supplant(marqueur);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

module.exports = trait;
