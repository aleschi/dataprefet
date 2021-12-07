import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Tableprogramme from "./Tableprogramme";

class Vueprogramme extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: [],
	    	programmes: [],
	    }
	}
	componentDidMount() {
    	const url = "/api/v1/mouvements/index";
    	fetch(url)
      	.then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      	})
      	.then(response => this.setState({region: response.region, mouvements: response.mouvements, programmes: response.programme }))
      	.catch(error => console.log(error.message));
    }

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">{this.state.region}</div>
		  		<div className="d24"></div>
		  		<div className="box_bandeau align_flex">
		  			<div className="bandeau_div"><div className="bandeau_titre">Effectifs cibles</div><div className="bandeau_b"> XX ETP</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Plafond 2021 </div><div className="bandeau_b"> XX ETPT</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">ETP redéployés </div> <div className="bandeau_b">{this.state.mouvements.length} ETP</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Solde 2021 </div><div className="bandeau_b"> XX ETP</div></div>
		  		</div>
		  		<Tableprogramme mouvements={this.state.mouvements} programmes={this.state.programmes}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Vueprogramme;


