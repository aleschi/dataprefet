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
      	.then(response => this.setState({ mouvements: response.mouvements, etp_supp: response.etp_supp, etp_supp_a: response.etp_supp_a,etp_supp_b: response.etp_supp_b, etp_supp_c: response.etp_supp_c, etp_add: response.etp_add, etp_add_a: response.etp_add_a, etp_add_b: response.etp_add_b, etp_add_c: response.etp_add_c, etpt_supp: response.etpt_supp, etpt_supp_a: response.etpt_supp_a,etpt_supp_b: response.etpt_supp_b, etpt_supp_c: response.etpt_supp_c, etpt_add: response.etpt_add, etpt_add_a: response.etpt_add_a, etpt_add_b: response.etpt_add_b, etpt_add_c: response.etpt_add_c, solde_etp: response.solde_etp, etp_cible: response.etp_cible}))
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
				<div className="titre_box_form_recap">ETP/ETPT supprimés</div>
				<div className="chiffre_box_form_recap crose">{this.state.etp_supp}/{this.state.etpt_supp}</div>
				<div><span className="info_etp">{this.state.etp_supp_a}ETP/{this.state.etpt_supp_a}ETPT A</span><span className="info_etp">{this.state.etp_supp_b}ETP/{this.state.etpt_supp_b}ETPT B</span><span className="info_etp">{this.state.etp_supp_c}ETP/{this.state.etpt_supp_c}ETPT C</span></div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">ETP/ETPT ajoutés</div>
				<div className="chiffre_box_form_recap cvert">{this.state.etp_add}/{this.state.etpt_add}</div>
				<div><span className="info_etp">{this.state.etp_add_a}ETP/{this.state.etpt_add_a}ETPT A</span><span className="info_etp">{this.state.etp_add_b}ETP/{this.state.etpt_add_b}ETPT B</span><span className="info_etp">{this.state.etp_add_c}ETP/{this.state.etpt_add_c}ETPT C</span></div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">Solde restant pour suppression</div>
				<div className="chiffre_box_form_recap cbleu">{this.state.solde_etp} ETP ({Math.round(this.state.solde_etp/this.state.etp_cible * 100 * 100) / 100 }%)</div>
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
				<div className="titre_box_form_recap">ETP/ETPT supprimés</div>
				<div className="chiffre_box_form_recap crose">{this.state.etp_supp}/{this.state.etpt_supp}</div>
				<div><span className="info_etp">{this.state.etp_supp_a}ETP/{this.state.etpt_supp_a}ETPT A</span><span className="info_etp">{this.state.etp_supp_b}ETP/{this.state.etpt_supp_b}ETPT B</span><span className="info_etp">{this.state.etp_supp_c}ETP/{this.state.etpt_supp_c}ETPT C</span></div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">ETP/ETPT ajoutés</div>
				<div className="chiffre_box_form_recap cvert">{this.state.etp_add}/{this.state.etpt_add}</div>
				<div><span className="info_etp">{this.state.etp_add_a}ETP/{this.state.etpt_add_a}ETPT A</span><span className="info_etp">{this.state.etp_add_b}ETP/{this.state.etpt_add_b}ETPT B</span><span className="info_etp">{this.state.etp_add_c}ETP/{this.state.etpt_add_c}ETPT C</span></div>
				<div className="d12"></div>
				<div className="titre_box_form_recap">ETP/ETPT pouvant être ajoutés</div>
				<div className="chiffre_box_form_recap cbleu">{this.state.etp_supp - this.state.etp_add}/{this.state.etpt_supp - this.state.etpt_add}</div>
				<div><span className="info_etp">{this.state.etp_supp_a - this.state.etp_add_a}ETP/{this.state.etpt_supp_a - this.state.etpt_add_a}ETPT A</span><span className="info_etp">{this.state.etp_supp_b - this.state.etp_add_b}ETP/{this.state.etpt_supp_b - this.state.etpt_add_b}ETPT B</span><span className="info_etp">{this.state.etp_supp_c - this.state.etp_add_c}ETP/{this.state.etpt_supp_c - this.state.etpt_add_c}ETPT B</span></div>
			</div>
			}
		</div>
    );
    }
}

export default New_recap;


