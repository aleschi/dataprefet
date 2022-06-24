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
	    	statut: '',
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

    return (
     
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
        		<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
          				<h1 className="fr-my-6w">{this.state.region}</h1>
		  			</div>
				</div>

				<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-3">
          				<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.etp_3*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> 3% ETP cibles</p>
						</div>
          			</div>

          			<div className="fr-col-12 fr-col-lg-3">
          				<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.etp_supp*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> ETP redéployés</p>
						</div>
          			</div>

          			<div className="fr-col-12 fr-col-lg-3">
          				<div className="fr-callout ">
						    <p className="fr-callout__title">{(Math.round(this.state.solde_etp*10)/10).toLocaleString('fr')} ETP</p>
						    <p className="fr-callout__text"> Solde 2022</p>
						</div>
          			</div>

          		</div>

				<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-12 fr-col-lg-12">
          				<h2 className="fr-my-2w">Historique des redéploiements</h2>
						<Table mouvements={this.state.mouvements} liste_programmes_mvt={this.state.liste_programmes_mvt}/>
					</div>
				</div>
		  	</div>
		  	<Footer /> 
		</div>

    );
    }
}

export default Index;


