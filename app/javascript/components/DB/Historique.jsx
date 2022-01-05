import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import Checkbox_dropdown from './Checkbox_dropdown'
import { CSVLink } from "react-csv";
class Index extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	mouvements: [],
	    	liste_programmes_mvt: [],
	    	liste_regions_mvt: [],
	    	grades: ["A","B","C"],
	    	type_mouvements: ["ajout","suppression"],

	    	date_croissant:false,
        date_effet_croissant: false,

        grades_selected: ["A","B","C"],
        programmes_selected: [],
        types_selected:["ajout","suppression"],
        regions_selected:[],
	    }
	    this.sortTable = this.sortTable.bind(this);
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
      	.then(response => this.setState({mouvements: response.mouvements, liste_programmes_mvt: response.liste_programmes_mvt, programmes_selected: response.liste_programmes_mvt, liste_regions_mvt: response.liste_regions_mvt, regions_selected: response.liste_regions_mvt }))
      	.catch(error => console.log(error.message));
    }

    displayRow = () => {
    	return this.state.mouvements.map((mouvement, index) => {

    		if (mouvement.type_mouvement == "ajout"){
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_j">{mouvement.type_mouvement}</span>{(mouvement.ponctuel == true) && <span className="etiquette_r">Ponctuel</span>}</td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td></tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_v">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td></tr>
	        }	        	
    	})
    };

    
    handleCallback = (childData) =>{
        this.setState({mouvements: childData.mouvements, grades_selected: childData.grades_selected, programmes_selected: childData.programmes_selected, types_selected: childData.types_selected, regions_selected: childData.regions_selected})
    }

    sortTable = (params) => {
   
      const mouvements = this.state.mouvements;
      const date_croissant = this.state.date_croissant;
      const date_effet_croissant = this.state.date_effet_croissant;
        const body = {
          mouvements, date_croissant, date_effet_croissant
        };
        const url = "/api/v1/mouvements/sort_table?search=" + params;
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ mouvements: response.mouvements, date_croissant: response.date_croissant, date_effet_croissant: response.date_effet_croissant}))
      .catch(error => console.log(error.message));
    };

    render() {

    const headers = ['Region','Date','Quotité ETP','Macrograde','Type',"Service concerné ",'Programme','Date effective mouvement', 'Mouvements en gestion', 'Mouvement en base (PLF N+1)' ];
    var data_to_download = [];
    this.state.mouvements.map((mouvement, index) => {
   
      data_to_download.push([mouvement.region.nom,mouvement.date,mouvement.quotite,mouvement.grade,mouvement.type_mouvement,mouvement.service.nom,mouvement.programme.numero,mouvement.date_effet,mouvement.credits_gestion,mouvement.cout_etp])
            })
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Hitorique des mouvements</div>
		  		<div className="d24"></div>
          <div className="tr"><CSVLink data={data_to_download} headers={headers} filename={"table_mouvements.csv"} className="bouton">Exporter la table <i className="fas fa-cloud-download-alt"></i></CSVLink></div>
          <div className="d24"></div>
		  		<div className="table" >
				    <table className="table-striped">
				      	<thead>
				        <tr>
				        	<th scope="col">Région <Checkbox_dropdown name="region" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.liste_regions_mvt} parentCallback = {this.handleCallback}/></th>
				        	<th scope="col">Date <button onClick={() => {this.sortTable('date')}} id="date"><i className="fas fa-sort"></i></button></th>
				        	<th scope="col">Quotité ETP</th>
				        	<th scope="col">Macrograde <Checkbox_dropdown name="grade" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.grades} parentCallback = {this.handleCallback}/></th>
				        	<th scope="col">Type <Checkbox_dropdown name="type_mouvement" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.type_mouvements} parentCallback = {this.handleCallback}/></th>
				        	<th scope="col">Service concerné</th>

				        	<th scope="col">Programme <Checkbox_dropdown name="programme" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.liste_programmes_mvt} parentCallback = {this.handleCallback}/></th>

				          	<th scope="col">Date effective <button onClick={() => {this.sortTable('date_effet')}} id="valeur"><i className="fas fa-sort"></i></button></th>	 
				            <th scope="col">Mouvements en gestion (LFR)</th> 
				            <th scope="col">Mouvements en base (PLF N+1)</th>   	
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


