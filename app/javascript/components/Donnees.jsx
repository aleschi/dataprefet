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
		  		<div className="titre_page">Données Personnelles</div>
		  		<div className="d24"></div>
				<div className="titre_etiquette">Cookies et respect de votre vie privée</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Ce site ne prélève aucune donnée à caractère personnel et ne fait intervenir aucuns cookies. 
				</div>
				<div className="d12"></div>
				<div className="texte_etiquette">
					Nous sommes ainsi en conformité avec la réglementation « Cookies » de la CNIL et exemptés d’autorisation préalable. C’est pour cela que vous n’avez pas eu besoin de cliquer sur un bloc pour accepter le dépôt de cookies ! 

				</div>
				
				
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


