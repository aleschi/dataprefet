import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
import Moment from 'moment';

class Table extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	regions: this.props.regions,
        mouvements : this.props.mouvements,
        objectifs: this.props.objectifs,
        statut: '',
	    }
	}
  componentDidMount() {
      const url = "/check_user_status";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ isLoggedIn: response.isLoggedIn, statut: response.statut }))
        .catch(() => this.props.history.push("/"));
    }
	componentDidUpdate(prevProps) {
      if (this.props.regions !== prevProps.regions) {
        this.setState({regions: this.props.regions});
      }
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
      if (this.props.objectifs !== prevProps.objectifs) {
        this.setState({objectifs: this.props.objectifs});
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
          var cout_annee = 0
          var credits_gestion = 0
    		  this.state.objectifs.filter(objectif => objectif.region_id == region.id).map((objectif) => {
            etp_cible += objectif.etp_cible;
            etpt_plafond += objectif.etpt_plafond;
          })
          this.state.mouvements.filter(mouvement => mouvement.region_id == region.id).map((mouvement) => {
            if (mouvement.type_mouvement == "ajout"){
              count_etp_add += 1;
              count_etpt_add += mouvement.quotite;
              cout_annee += mouvement.cout_etp;
              credits_gestion += mouvement.credits_gestion;
            }
            else {
              count_etp_supp +=1;
              count_etpt_supp += mouvement.quotite;
              cout_annee += mouvement.cout_etp;
              credits_gestion += mouvement.credits_gestion;
            }
          })
	        return <tr key={index}><td>{region.nom}</td><td>{etp_cible}</td><td>{etpt_plafond}</td>{(this.state.statut == "admin") && <td>{Math.round(0.03*etp_cible)}</td>}{(this.state.statut == "admin") &&<td>{Math.round(0.03*etp_cible)-count_etp_supp} ({Math.round((3-count_etp_supp/etp_cible*100)*100)/100}%)</td>}<td>{count_etp_supp}</td><td>{count_etp_add}</td><td>{count_etpt_supp}</td><td>{count_etpt_add}</td><td>{Math.round(credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(cout_annee).toLocaleString('fr')}€</td></tr>
	            	
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
            {(this.state.statut == "admin") &&
            <th scope="col">Redéploiement autorisé (3%)</th>
            }
            {(this.state.statut == "admin") &&
            <th scope="col">Redéploiement restant</th>
            }
	        	<th scope="col">ETP supprimés</th>
	        	<th scope="col">ETP ajoutés</th>
	          <th scope="col">ETPT supprimés</th>
            <th scope="col">ETPT ajoutés</th>	
            <th scope="col">Mouvement en gestion (LFR)</th>   
            <th scope="col">Mouvement en base (PLF N+1)</th>       	
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


