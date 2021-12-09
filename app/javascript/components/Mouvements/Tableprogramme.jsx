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
            programme.objectifs.map((objectif,index) =>{
            	if (objectif.region_id == this.state.region_id){
            		etp_cible = objectif.etp_cible;
            		etpt_plafond = objectif.etpt_plafond;
            	}
            })
          
            this.state.mouvements.map((mouvement,index) =>{
	            if (mouvement.programme_id == programme.id && mouvement.type_mouvement == "ajout"){
	              count_etp_add += 1;
	            }
	            else if (mouvement.programme_id == programme.id && mouvement.type_mouvement == "suppression"){
	              count_etp_supp += 1;
	            }
            })    		
	        return <tr key={index}><td>{programme.numero} - {programme.ministere.nom}</td><td>{etp_cible} ETP </td><td>{etpt_plafond} ETPT</td><td>{count_etp_supp}</td><td>{count_etp_add}</td><td>xx€</td><td>xx€</td></tr>
	                	
    	})
    };
	
    render() {

    return (  
		<div className="table" >
	    <table className="table-striped">
	      	<thead>
	        <tr>
	        	<th scope="col">Programme</th>
	        	<th scope="col">Effectifs cibles</th>
	        	<th scope="col">Plafond ETPT</th>
	        	<th scope="col">ETP supprimés</th>
	        	<th scope="col">ETP ajoutés</th>
	        	<th scope="col">Mouvements crédits</th>
            <th scope="col">Coût EAP</th>
	        </tr>
	      	</thead>

	      	<tbody>
		      	{this.displayRow()} 
	      	</tbody>
	    </table>
		  	
		</div>
    );
    }
}

export default Tableprogramme;


