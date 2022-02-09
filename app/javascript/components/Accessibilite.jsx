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
		  		<div className="titre_page">Déclaration d'accessibilité</div>
		  		<div className="d24"></div>
		  		<div className="texte_etiquette">Établie le 2 février 2022.</div>
		  		<div className="d12"></div>
		  		<div className="texte_etiquette">
					La Direction du Budget s’engage à rendre son service accessible, conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Cette déclaration d’accessibilité s’applique à REPERE3 (https://www.repere3.finances.gouv.fr/).
				</div>
				<div className='d24'></div>
				<div className="titre_etiquette">État de conformité</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					REPERE3 est non conforme avec le RGAA. Le site n’a encore pas été audité.
				</div>
				<div className="d24"></div>
				<div className="titre_etiquette">Amélioration et contact</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de REPERE3 pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					E-mail : declic.budget@finances.gouv.fr
				</div>
				<div className="texte_etiquette">
					Adresse : Direction du Budget, Ministère de l'Economie, des Finances et de la Relance, 139, rue de Bercy 75572 Paris Cedex 12
				</div>
				<div className="d24"></div>
				<div className="titre_etiquette">Voie de recours</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.</div>
				<div className="d12"></div>
				<div className="texte_etiquette">	Vous pouvez :</div>

				<div className="texte_etiquette">	
					- Écrire un message au Défenseur des droits
				</div>
				<div className="texte_etiquette">
					- Contacter le délégué du Défenseur des droits dans votre région
				</div>
				<div className="texte_etiquette">
					- Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
					Défenseur des droits
					Libre réponse 71120 75342 Paris CEDEX 07
		  		</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


