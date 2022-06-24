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
	    	statut: this.props.statut,
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

    componentDidUpdate(prevProps) {
      if (this.props.statut !== prevProps.statut) {
        this.setState({statut: this.props.statut});
      }
    }

    render() {
    
    return (  
 
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
        		<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
          				<h1 className="fr-my-6w">{ (this.state.statut == "CBR") ? <span>CBR </span> : <span>Préfet </span> } {this.state.region}</h1>
		  			</div>
		  		</div>
		  		<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-6 fr-col-lg-3">
		  				<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.etp_cible*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> Effectifs cibles</p>
						</div>
					</div>
					<div className="fr-col-6 fr-col-lg-3">
						<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.etpt_plafond*10)/10).toLocaleString('fr')} ETPT</p>
						    <p className="fr-callout__text"> Plafond 2022</p>
						</div>
					</div>
					<div className="fr-col-6 fr-col-lg-3">
						<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.etp_supp*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> ETP redéployés* </p>
						</div>
					</div>
					<div className="fr-col-6 fr-col-lg-3">
						<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.solde_etp*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> Solde 2022</p>
						</div>
					</div>  	
				</div>
				<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
						<div className="fr-text--xs">*Les ETP redéployés correspondent aux ETP supprimés.</div>
					</div>
				</div>

				<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
						<h2 className="fr-my-2w">Synthèse des effectifs par programme </h2>
					</div>
				</div>

				<Tableprogramme region_id={this.state.region_id} mouvements={this.state.mouvements} programmes={this.state.programmes}/>

				<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
						<h2 className="fr-my-2w">Synthèse des mouvements par catégorie </h2>
					</div>
				</div>
				
				<Table_grades />
				  	
		  	</div>
		  	<Footer /> 
		</div>

    );
    }
}

export default Vueprogramme;


