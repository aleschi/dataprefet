import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
import Moment from 'moment';

class Table extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	regions: this.props.regions,
	    }
	}
	componentDidUpdate(prevProps) {
      if (this.props.regions !== prevProps.regions) {
        this.setState({regions: this.props.regions});
      }
      
    };


    displayRow = () => {
    	return this.state.regions.map((region, index) => {
          var count_etp_add = 0
          var count_etpt_add = 0
          var count_etp_supp = 0
          var count_etpt_supp = 0
          var etp_cible = 0
          var etpt_plafond = 0
    		  region.objectifs.map((objectif) => {
            etp_cible += objectif.etp_cible;
            etpt_plafond += objectif.etpt_plafond;
          })
          region.mouvements.map((mouvement) => {
            if (mouvement.type_mouvement == "ajout"){
              count_etp_add += 1;
              count_etpt_add += mouvement.quotite;
            }
            else {
              count_etp_supp +=1;
              count_etpt_supp += mouvement.quotite;
            }
          })
	        return <tr key={index}><td>{region.nom}</td><td>{etp_cible}</td><td>{etpt_plafond}</td><td>{Math.round(0.03*etp_cible)}</td><td>{Math.round(0.03*etp_cible)-count_etp_supp} ({Math.round((3-count_etp_supp/etp_cible*100)*100)/100}%)</td><td>{count_etp_supp}</td><td>{count_etp_add}</td><td>{count_etpt_supp}</td><td>{count_etpt_add}</td></tr>
	            	
    	})
    };
	
    render() {
    return (  
		<div className="table" >
	    <table className="table-striped">
	      	<thead>
	        <tr>
	        	<th scope="col">Région</th>        	
	        	<th scope="col">Effectifs cibles</th>
	        	<th scope="col">Plafond ETPT</th>
            <th scope="col">Redéploiement autorisé (3%)</th>
            <th scope="col">Redéploiement restant</th>
	        	<th scope="col">ETP supprimés</th>
	        	<th scope="col">ETP ajoutés</th>
	          <th scope="col">ETPT supprimés</th>
            <th scope="col">ETPT ajoutés</th>	     	
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

export default Table;


