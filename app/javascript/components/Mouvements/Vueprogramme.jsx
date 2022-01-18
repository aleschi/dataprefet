import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Tableprogramme from "./Tableprogramme";
import Table_grades from "./Table_grades"

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
	    	etpt_supp:0,
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
      	.then(response => this.setState({region: response.region,region_id: response.region_id, mouvements: response.mouvements, programmes: response.programmes, etp_cible: response.etp_cible, etpt_plafond: response.etpt_plafond, solde_etp: response.solde_etp, etp_3: response.etp_3, etp_supp: response.etp_supp, etpt_supp: response.etpt_supp }))
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
		  			<div className="bandeau_div"><div className="bandeau_titre">Effectifs cibles</div><div className="bandeau_b"> {(Math.round(this.state.etp_cible*10)/10).toLocaleString('fr')} ETP </div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Plafond 2022 </div><div className="bandeau_b"> {(Math.round(this.state.etpt_plafond*10)/10).toLocaleString('fr')} ETPT</div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">ETP redéployés<span className="texte_info">*</span> </div> <div className="bandeau_b">{(Math.round(this.state.etp_supp*10)/10).toLocaleString('fr')} ETP </div></div>
		  			<div className="bandeau_div"><div className="bandeau_titre">Solde 2022 </div><div className="bandeau_b"> {(Math.round(this.state.solde_etp*10)/10).toLocaleString('fr')} ETP</div></div>
		  		</div>
		  		<div className="d12"></div>
		  		<div className="texte_info">*Les ETP redéployés correspondent aux ETP supprimés.</div>
		  		<Tableprogramme region_id={this.state.region_id} mouvements={this.state.mouvements} programmes={this.state.programmes}/>
		  		<div className="d24"></div>
		  		<Table_grades />
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Vueprogramme;


