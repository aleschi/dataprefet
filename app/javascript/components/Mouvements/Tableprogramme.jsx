import React from "react";
import Header from "../Header";
import Footer from "../Footer";


class Tableprogramme extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: this.props.mouvements,
        	programmes: this.props.programmes,
        	region_id: this.props.region_id,
	    }
	}
	componentDidUpdate(prevProps) {
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
      if (this.props.programmes !== prevProps.programmes) {
        this.setState({programmes: this.props.programmes});
      }
      if (this.props.region_id !== prevProps.region_id) {
        this.setState({region_id: this.props.region_id});
      }
    };

    displayRow = () => {
    	return this.state.programmes.map((programme, index) => {
            var count_etp_add = 0
            var count_etp_supp = 0
            var etp_cible = 0
            var etpt_plafond = 0
            var cout_annee = 0
            var credits_gestion = 0
            programme.objectifs.map((objectif,index) =>{
            	if (objectif.region_id == this.state.region_id){
            		etp_cible = objectif.etp_cible;
            		etpt_plafond = objectif.etpt_plafond;
            	}
            })
          
            this.state.mouvements.map((mouvement,index) =>{
	            if (mouvement.programme_id == programme.id && mouvement.type_mouvement == "ajout"){
	              count_etp_add += mouvement.quotite;
	              cout_annee += mouvement.cout_etp;
	              credits_gestion += mouvement.credits_gestion;

	            }
	            else if (mouvement.programme_id == programme.id && mouvement.type_mouvement == "suppression"){
	              count_etp_supp += mouvement.quotite;
	              cout_annee += mouvement.cout_etp;
	              credits_gestion += mouvement.credits_gestion;
	            }

            })    		
	        return <tr key={index}><td>{programme.numero} - {programme.ministere.nom} {(programme.numero == '155') && <span>(2)</span>}
	        {(programme.numero == '217') && <span>(1)</span>} </td>
	        <td>{(Math.round(etp_cible*10)/10).toLocaleString('fr')} ETP </td>
	        <td>{(Math.round(etpt_plafond*10)/10).toLocaleString('fr')} ETPT</td>
	        <td>{(Math.round(count_etp_supp*10)/10).toLocaleString('fr')}</td>
	        <td>{(Math.round(count_etp_add*10)/10).toLocaleString('fr')}</td>
	        <td>{Math.round(credits_gestion).toLocaleString('fr')}€</td>
	        <td>{Math.round(cout_annee).toLocaleString('fr')}€</td></tr>
	                	
    	})
    };
	
    render() {

    return ( 
    	<div className="fr-grid-row fr-grid-row--gutters">
          	<div className="fr-col-12 fr-col-lg-12">
				<div className="fr-table fr-mb-2w fr-table--no-caption">
				    <table>
				      	<thead>
				        <tr>
				        	<th scope="col">Programme</th>
				        	<th scope="col">Effectifs cibles</th>
				        	<th scope="col">Plafond ETPT</th>
				        	<th scope="col">ETP supprimés</th>
				        	<th scope="col">ETP ajoutés</th>
				        	<th scope="col">Mouvements en gestion (LFR)</th>
			            	<th scope="col">Mouvements en base (PLF N+1)</th>
				        </tr>
				      	</thead>

				      	<tbody>
					      	{this.displayRow()} 
				      	</tbody>
				    </table>
				
				</div>
				<div className="fr-text--xs">(1) Le plafond ETPT est calculé à partir de celui notifié au périmètre de la région/zone de gouvernance au périmètre ATE c'est à dire hors DIR et DIRM. Les notifications ayant été opérées aux préfets de région en incluant les DIRM, des ajustements seront opérés à l'issue des dialogues de gestion une fois que les décisions des préfets de région sur les plafonds attribués aux DIRM seront prises. source MTE – 11/03/22</div>
				<div className="fr-text--xs">(2) net des emplois de l’inspection du travail, retirés de l’effectif total le 03/05/2022 après réception par la DB des informations correspondantes de la part du ministère chargé du travail. </div>
			</div>
			
		</div>
    );
    }
}

export default Tableprogramme;


