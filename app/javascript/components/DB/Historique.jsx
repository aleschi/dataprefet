import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Moment from 'moment';
import Checkbox from '@mui/material/Checkbox';

class Index extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	mouvements: [],
	    }
	}
	componentDidMount() {
    	const url = "/api/v1/mouvements/mouvements_globaux";
    	fetch(url)
      	.then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      	})
      	.then(response => this.setState({mouvements: response.mouvements }))
      	.catch(error => console.log(error.message));
    }

    displayRow = () => {
    	return this.state.mouvements.map((mouvement, index) => {

        var date1 = new Date(mouvement.date_effet);
        var date2 = new Date('2021/12/31');
        var diffTime = Math.abs(date2 - date1);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    		if (mouvement.type_mouvement == "ajout"){
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_j">{mouvement.type_mouvement}</span>{(mouvement.ponctuel == true) && <span className="etiquette_r">Ponctuel</span>}</td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td></td><td></td></tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_v">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.cout_etp*diffDays/365).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td></tr>
	        }	        	
    	})
    };

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Hitorique des mouvements</div>
		  		<div className="d24"></div>
		  		<div className="table" >
				    <table className="table-striped">
				      	<thead>
				        <tr>
				        	<th scope="col">Région</th>
				        	<th scope="col">Date </th>
				        	<th scope="col">Quotité ETPT</th>
				        	<th scope="col">Macrograde </th>
				        	<th scope="col">Type </th>
				        	<th scope="col">Service concerné</th>
				        	<th scope="col">Programme </th>
				          	<th scope="col">Date mise en place </th>	 
				            <th scope="col">Mouvements crédits</th> 
				            <th scope="col">Cout EAP</th>   	
				        </tr>
				      	</thead>

				      	<tbody>
					      	{this.displayRow()} 
				      	</tbody>
				    </table>  	
				</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


