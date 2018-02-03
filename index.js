//=========================================================================
// Site WEB demo PI
// Auteur : P. Thiré
// Version : 09/10/2015
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_accueil_membre_boucle = require("./req_accueil_membre_boucle.js");
var req_distrib = require("./req_distrib.js");
var req_distrib_commencer = require("./req_distrib_commencer.js");
var req_distrib_fin = require("./req_distrib_fin.js");
var req_machine_abandonner = require("./req_machine_abandonner");
var req_machine_commencer = require("./req_machine_commencer");
var req_machine_continuer = require("./req_machine_continuer");
var req_machine_jouer = require("./req_machine_jouer");
var req_machine_resultat = require("./req_machine_resultat");
var req_todo = require("./req_todo.js");
var req_todo_commencer = require("./req_todo_commencer.js");
var req_todo_quitter = require("./req_todo_quitter.js");
var req_todo_supprimer = require("./req_todo_supprimer.js");
var req_nb_commencer = require("./req_nb_commencer.js");
var req_nb = require("./req_nb.js");
var req_chat = require("./req_chat.js");
var req_chat_boucle = require("./req_chat_boucle.js");
var req_newworld_commencer = require("./req_newworld_commencer.js");
var req_digicode = require("./req_digicode.js");
var req_digicode_commencer = require("./req_digicode_commencer.js");
var req_jeux = require("./req_jeux.js");
var req_cross_commencer = require("./req_cross_commencer.js");
var req_cross = require("./req_cross.js");
var req_programme = require("./req_programme.js");
var req_perso = require("./req_perso.js");
var req_contact = require("./req_contact.js");
var req_retour = require("./req_retour.js");
var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");
//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var ressource;
	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_accueil_membre_boucle':
				req_accueil_membre_boucle(req, res, query);
				break;
			case '/req_distrib':
				req_distrib(req, res, query);
				break;
			case '/req_distrib_commencer':
				req_distrib_commencer(req, res, query);
				break;
			case '/req_distrib_fin':
				req_distrib_fin(req, res, query);
				break;
			case '/req_todo':
				req_todo(req, res, query);
				break;
			case '/req_todo_commencer':
				req_todo_commencer(req, res, query);
				break;
			case '/req_todo_quitter':
				req_todo_quitter(req, res, query);
				break;
			case '/req_todo_supprimer':
				req_todo_supprimer(req, res, query);
				break;
			case '/req_machine_abandonner':
				req_machine_abandonner(req, res, query);
				break;
			case '/req_machine_commencer':
				req_machine_commencer(req, res, query);
				break;
			case '/req_machine_continuer':
				req_machine_continuer(req, res, query);
				break;
			case '/req_machine_jouer':
				req_machine_jouer(req, res, query);
				break;
			case '/req_cross_commencer':
				req_cross_commencer(req, res, query);
				break;
			case '/req_cross':
				req_cross(req, res, query);
				break;
			case '/req_machine_resultat':
				req_machine_resultat(req, res, query);
				break;
			case '/req_chat':
				req_chat(req, res, query);
				break;
			case '/req_chat_boucle':
				req_chat_boucle(req, res, query);
				break;
			case '/req_newworld_commencer':
				req_newworld_commencer(req, res, query);
				break;
			case '/req_digicode':
				req_digicode(req, res, query);
				break;
			case '/req_digicode_commencer':
				req_digicode_commencer(req, res, query);
				break;
			case '/req_jeux':
				req_jeux(req, res, query);
				break;
			case '/req_contact':
				req_contact(req, res, query);
				break;
			case '/req_programme':
				req_programme(req, res, query);
				break;
			case '/req_perso':
				req_perso(req, res, query);
				break;
			case '/req_nb':
				req_nb(req, res, query);
				break;
			case '/req_nb_commencer':
				req_nb_commencer(req, res, query);
				break;
			case '/req_retour':
				req_retour(req, res, query);
				break;
			
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
