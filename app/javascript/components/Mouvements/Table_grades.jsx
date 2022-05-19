import React from "react";

class Table_grades extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
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
      	.then(response => this.setState({ etp_supp: response.etp_supp, etp_supp_a: response.etp_supp_a,etp_supp_b: response.etp_supp_b, etp_supp_c: response.etp_supp_c, etp_add: response.etp_add, etp_add_a: response.etp_add_a, etp_add_b: response.etp_add_b, etp_add_c: response.etp_add_c, etpt_supp: response.etpt_supp, etpt_supp_a: response.etpt_supp_a,etpt_supp_b: response.etpt_supp_b, etpt_supp_c: response.etpt_supp_c, etpt_add: response.etpt_add, etpt_add_a: response.etpt_add_a, etpt_add_b: response.etpt_add_b, etpt_add_c: response.etpt_add_c}))
      	.catch(error => console.log(error.message));
    }
	
    render() {

    return (
    	<div className="fr-grid-row fr-grid-row--gutters">
        	<div className="fr-col-lg-6">
				
				<div className="fr-table fr-mb-2w fr-table--no-caption">
				    <table>
				      	<thead>
				        <tr>
				        	<th scope="col"></th>
				        	<th scope="col">ETP Ajoutés</th>
				        	<th scope="col">ETP Supprimés</th>
				        </tr>
				      	</thead>

				      	<tbody>
					      	<tr><td>ETP A</td><td>{(Math.round(this.state.etp_add_a*10)/10).toLocaleString('fr')}</td><td>{(Math.round(this.state.etp_supp_a*10)/10).toLocaleString('fr')}</td></tr>
					      	<tr><td>ETP B</td><td>{(Math.round(this.state.etp_add_b*10)/10).toLocaleString('fr')}</td><td>{(Math.round(this.state.etp_supp_b*10)/10).toLocaleString('fr')}</td></tr>
					      	<tr><td>ETP C</td><td>{(Math.round(this.state.etp_add_c*10)/10).toLocaleString('fr')}</td><td>{(Math.round(this.state.etp_supp_c*10)/10).toLocaleString('fr')}</td></tr>
					      	<tr className="total"><td>Total ETP</td><td>{(Math.round(this.state.etp_add*10)/10).toLocaleString('fr')}</td><td>{(Math.round(this.state.etp_supp*10)/10).toLocaleString('fr')}</td></tr>
				      	</tbody>
				    </table>
			    </div>
	    	</div>
	    	<div className="fr-col-lg-6">
				<div className="fr-table fr-mb-2w fr-table--no-caption">
			    <table>
			      	<thead>
			        <tr>
			        	<th scope="col"></th>
			        	<th scope="col">ETPT Ajoutés</th>
			        	<th scope="col">ETPT Supprimés</th>
			        </tr>
			      	</thead>

			      	<tbody>
				      	<tr><td>ETPT A</td><td>{(Math.round(this.state.etpt_add_a*100)/100).toLocaleString('fr')}</td><td>{(Math.round(this.state.etpt_supp_a*100)/100).toLocaleString('fr')}</td></tr>
				      	<tr><td>ETPT B</td><td>{(Math.round(this.state.etpt_add_b*100)/100).toLocaleString('fr')}</td><td>{(Math.round(this.state.etpt_supp_b*100)/100).toLocaleString('fr')}</td></tr>
				      	<tr><td>ETPT C</td><td>{(Math.round(this.state.etpt_add_c*100)/100).toLocaleString('fr')}</td><td>{(Math.round(this.state.etpt_supp_c*100)/100).toLocaleString('fr')}</td></tr>
				      	<tr className="total"><td>Total ETPT</td><td>{(Math.round(this.state.etpt_add*100)/100).toLocaleString('fr')}</td><td>{(Math.round(this.state.etpt_supp*100)/100).toLocaleString('fr')}</td></tr>
			      	</tbody>
			    </table>
			    </div>	  	
			</div>
		</div>
    );
    }
}

export default Table_grades;


