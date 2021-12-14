import React from "react";

class New_recap extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	type_mouvement:this.props.type_mouvement,
	    	mouvements: [],
	    	etp_supp: 0,
	    	etp_supp_a: 0,
	    	etp_supp_b: 0,
	    	etp_supp_c: 0,
	    	etp_add: 0,
	    	etp_add_a: 0,
	    	etp_add_b: 0,
	    	etp_add_c: 0,
	    	etpt_supp: 0,
	    	etpt_supp_a: 0,
	    	etpt_supp_b: 0,
	    	etpt_supp_c: 0,
	    	etpt_add: 0,
	    	etpt_add_a: 0,
	    	etpt_add_b: 0,
	    	etpt_add_c: 0,
	    	solde_etp: 0,
	    	etp_cible: 0,
	    	mouvement_last_supp: [],
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
      	.then(response => this.setState({ mouvements: response.mouvements, etp_supp: response.etp_supp, etp_supp_a: response.etp_supp_a,etp_supp_b: response.etp_supp_b, etp_supp_c: response.etp_supp_c, etp_add: response.etp_add, etp_add_a: response.etp_add_a, etp_add_b: response.etp_add_b, etp_add_c: response.etp_add_c, etpt_supp: response.etpt_supp, etpt_supp_a: response.etpt_supp_a,etpt_supp_b: response.etpt_supp_b, etpt_supp_c: response.etpt_supp_c, etpt_add: response.etpt_add, etpt_add_a: response.etpt_add_a, etpt_add_b: response.etpt_add_b, etpt_add_c: response.etpt_add_c, solde_etp: response.solde_etp, etp_cible: response.etp_cible, mouvement_last_supp: response.mouvement_last_supp}))
      	.catch(error => console.log(error.message));
    }

	componentDidUpdate(prevProps) {
      if (this.props.type_mouvement !== prevProps.type_mouvement) {
        this.setState({type_mouvement: this.props.type_mouvement});
      }
    };

    render() {

    return (  
		<div>
			{ (this.state.type_mouvement == null) && 
			<div className="box_form_recap">
				
				<div className="titre_box_form_recap">Solde restant pour suppression</div>
				<div className="chiffre_box_form_recap cbleu">{this.state.solde_etp} ETP ({Math.round(this.state.solde_etp/this.state.etp_cible * 100 * 10) / 10 }%)</div>
			</div>
			}
			{ (this.state.type_mouvement !== null && this.state.type_mouvement['value'] == "suppression") &&
			<div className="box_form_recap">
				<div className="titre_box_form_recap">Solde</div>
				<div className="chiffre_box_form_recap crose">{this.state.solde_etp} ETP ({Math.round(this.state.solde_etp/this.state.etp_cible * 100 * 100) / 100 }%)</div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">Impact mouvement</div>
				<div className="chiffre_box_form_recap cvert">1 ETP ({Math.round(1/this.state.etp_cible * 100 *100 ) / 100 }%) </div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">Solde après suppression</div>
				<div className="chiffre_box_form_recap cbleu">{this.state.solde_etp-1} ETP ({Math.round((this.state.solde_etp-1)/this.state.etp_cible * 100 * 100) / 100 }%)</div>
			</div>
			}
			{ (this.state.type_mouvement !== null && this.state.type_mouvement['value'] == "ajout") &&
			<div className="box_form_recap">
				
				<div className="titre_box_form_recap">Dernière suppression effectuée</div>

				<div><span className="info_etp">1 ETP {this.state.mouvement_last_supp.grade} - {this.state.mouvement_last_supp.quotite*100} % - P {this.state.mouvement_last_supp.programme.numero} - (fait le {this.state.mouvement_last_supp.date})</span></div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">ETP déjà ajoutés suite à cette suppression ({this.state.mouvements.filter(mouvement => mouvement.mouvement_lien == this.state.mouvement_last_supp.id).length})</div>

				{this.state.mouvements.filter(mouvement => mouvement.mouvement_lien == this.state.mouvement_last_supp.id).length > 0 && 
					this.state.mouvements.filter(mouvement => mouvement.mouvement_lien == this.state.mouvement_last_supp.id).map((mouvement,index) => (
						<div key={index}><span className="info_etp">1 ETP {mouvement.grade} - {mouvement.quotite*100} % - P {mouvement.programme.numero}- (fait le {mouvement.date})</span></div>
					))
				}
				
			</div>
			}
		</div>
    );
    }
}

export default New_recap;


