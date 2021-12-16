import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Table from "./Table";

class Index extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: [],
	    	etp_cible:0,
	    	solde_etp: 0,
	    	etpt_plafond: 0,
	    	etp_3:0,
	    	etp_supp: 0,
	    	liste_programmes_mvt: [],
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
      	.then(response => this.setState({region: response.region, mouvements: response.mouvements, etp_cible: response.etp_cible, etpt_plafond: response.etpt_plafond, solde_etp: response.solde_etp, etp_3: response.etp_3, etp_supp: response.etp_supp, liste_programmes_mvt: response.liste_programmes_mvt, }))
      	.catch(error => console.log(error.message));
    }

    render() {
    console.log(this.state.liste_programmes_mvt);
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">{this.state.region}</div>
		  		<div className="d24"></div>
		  		<div className="align_flex">
		  			<div className="bandeau"><span className="bandeau_titre">Effectifs cibles</span><span className="bandeau_texte"> {this.state.etp_cible} ETP</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">Plafond 2021 </span><span className="bandeau_texte"> {this.state.etpt_plafond} ETPT</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">3% ETP cibles</span> <span className="bandeau_texte">{this.state.etp_3} ETP</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">ETP redéployés </span> <span className="bandeau_texte">{this.state.etp_supp} ETP</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">Solde 2021 </span><span className="bandeau_texte"> {this.state.solde_etp} ETP</span></div>
		  		</div>
		  		<Table mouvements={this.state.mouvements} liste_programmes_mvt={this.state.liste_programmes_mvt}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


