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
				<div className="texte_info">*Le total des effectifs inclut à ce stade ceux de l’inspection du travail, qui ne font pas partie du champ du dispositif mais dépendent des choix d’organisation des directeurs régionaux. Les effectifs de l’inspection du travail  seront retirés une fois cette information transmise.</div>
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


