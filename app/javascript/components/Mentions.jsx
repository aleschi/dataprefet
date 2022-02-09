import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Accordion } from "react-bootstrap";

class Faq extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	      isLoggedIn: false,
	      statut: '',
	     };
	    
	}
	componentDidMount() {
      const url = "/check_user_status";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ isLoggedIn: response.isLoggedIn, statut: response.statut }))
        .catch(() => this.props.history.push("/"));
  	}



    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Mentions légales</div>
		  		<div className="d24"></div>
		  		<div className="texte_etiquette">Mises à jour le 2 février 2022.</div>

				<div className='d24'></div>
				<div className="titre_etiquette">Éditeur</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Ministère de l'Économie, des finances et de la relance - Direction du Budget
				</div>
				<div className="texte_etiquette">
					Directrice de la publication : Mme Mélanie Joder - Directrice du Budget

				</div>
				<div className="d24"></div>
				<div className="titre_etiquette">Conception et gestion du site</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Alexandra Leschi et Lou Vettier – Direction du Budget (Bureau 2BMS)</div>

				<div className="d24"></div>
				<div className="titre_etiquette">Hébergement </div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Google Cloud Platform - Google France
				</div>
				<div className="texte_etiquette">
					Fournisseur de Cloud public (CSP) Google dans le cadre du marché UGAP C3
				</div>
				<div className="texte_etiquette">
					8, rue de Londres, 75009 Paris France
					01 42 68 53 00
				</div>

				<div className="d24"></div>
				<div className="titre_etiquette">Code source du site</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Le code source du site est disponible sur Github.</div>


				<div className="d24"></div>
				<div className="titre_etiquette">Gestion des cookies</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Ce portail n’utilise aucun cookie nécessitant un consentement des usagers. C’est pourquoi vous n’avez pas à accepter leur utilisation avant de poursuivre votre navigation.</div>
				
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


