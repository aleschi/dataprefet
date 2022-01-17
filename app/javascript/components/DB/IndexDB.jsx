import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Table from "./Table";

class Index extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	regions:[],
	    	nom: '',
	    	mouvements: [],
	    	objectifs: [],
	    }
	}
	componentDidMount() {
    	const url = "/api/v1/mouvements/mouvements_globaux";
    	fetch(url)
      	.then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      	})
      	.then(response => this.setState({ nom: response.nom, regions: response.regions, mouvements: response.mouvements, objectifs: response.objectifs}))
      	.catch(error => console.log(error.message));
    }

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">{this.state.nom}</div>
		  		{(this.state.nom == "Ministère du travail, de l'emploi et de l'insertion") && 
				<div className="texte_info">*Le total des effectifs inclut ceux de l’inspection du travail, qui seront retirés une fois l’information transmise.</div>
		  		}
		  		{(this.state.nom == "Ministère de l'agriculture et de l'alimentation") && 
				<div className="texte_info">*La ventilation envoyée ne prend pas en compte :  les moyens d'ajustement notifiés (les vacataires PAC) : 670 /
			 les atypiques/surnombres qui correspondent à des missions nationales exercées en région ou à une compensation liée à des caractéristiques des agents (mandat syndical, adaptation progressive au poste, etc.). Elles ne relèvent donc pas du périmètre de la circulaire MFTP/DB du 22 décembre 2021 :  138
			/ les effectifs des COM : 24
			/ les CLM/certaines formations longue durée : afin de ne pas pénaliser les services, le P215 garde, au niveau central, une enveloppe d'ETPT qui permet de remplacer les agents des services déconcentrés absents pour un temps long tout en restant sur le plafond d'emplois de la structure.</div>
		  		}
		  		<div className="d24"></div>
		  		<Table regions={this.state.regions} mouvements={this.state.mouvements} objectifs={this.state.objectifs} nom={this.state.nom}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


