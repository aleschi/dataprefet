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
		  	<div className="fr-container">    
        		<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-lg-12">
          				<h1 className="fr-my-6w">{this.state.nom}</h1>
		  			
		  				<h2 className="fr-mb-3w">Synthèse des effectifs par région</h2>
		  				<Table regions={this.state.regions} mouvements={this.state.mouvements} objectifs={this.state.objectifs} nom={this.state.nom}/>
		  			</div>
		  		</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


