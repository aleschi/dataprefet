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
	    	etp_cible:0,
	    	solde_etp: 0,
	    	etpt_plafond: 0,
	    	etp_3:0,
	    	etp_supp: 0,
	    	region_id: 0,
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
      	.then(response => this.setState({region: response.region,region_id: response.region_id, mouvements: response.mouvements, programmes: response.programmes, etp_cible: response.etp_cible, etpt_plafond: response.etpt_plafond, solde_etp: response.solde_etp, etp_3: response.etp_3, etp_supp: response.etp_supp }))
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
		  			<div className="bandeau_div"><div className="bandeau_titre">Effectifs cibles</div><div className="bandeau_b"> {this.state.etp_cible} ETP</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Plafond 2021 </div><div className="bandeau_b"> {this.state.etpt_plafond} ETPT</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">ETP redéployés </div> <div className="bandeau_b">{this.state.etp_supp} ETP</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Solde 2021 </div><div className="bandeau_b"> {this.state.solde_etp} ETP</div></div>
		  		</div>
		  		<Tableprogramme region_id={this.state.region_id} mouvements={this.state.mouvements} programmes={this.state.programmes}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Vueprogramme;


