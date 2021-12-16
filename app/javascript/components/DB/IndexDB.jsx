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
		  		<div className="d24"></div>
		  		<Table regions={this.state.regions} mouvements={this.state.mouvements} objectifs={this.state.objectifs}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


