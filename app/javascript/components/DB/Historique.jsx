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
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><p className="fr-badge fr-badge--green-emeraude">{mouvement.type_mouvement}</p> {(mouvement.ponctuel == true) && <p className="fr-badge fr-badge--green-emeraude"> Ponctuel</p>}</td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td><td>{(mouvement.mouvement_lien == null) ? <span>Nul</span> : <span>N{mouvement.mouvement_lien}</span> }</td></tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{mouvement.region.nom}</td><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><p className="fr-badge fr-badge--blue-cumulus">{mouvement.type_mouvement}</p></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td><td>N{mouvement.id}</td></tr>
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

    const headers = ['Region','Date','Quotité ETP','Macrograde','Type',"Service concerné ",'Programme','Date effective mouvement', 'Mouvements en gestion', 'Mouvement en base (PLF N+1)', 'N° ref mouvement' ];
    var data_to_download = [];
    this.state.mouvements.map((mouvement, index) => {
      if (mouvement.type_mouvement == "ajout"){
      data_to_download.push([mouvement.region.nom,mouvement.date,mouvement.quotite,mouvement.grade,mouvement.type_mouvement,mouvement.service.nom,mouvement.programme.numero,mouvement.date_effet,mouvement.credits_gestion,mouvement.cout_etp,'N'+mouvement.mouvement_lien])
      } 
      else if (mouvement.type_mouvement == "suppression"){
      data_to_download.push([mouvement.region.nom,mouvement.date,mouvement.quotite,mouvement.grade,mouvement.type_mouvement,mouvement.service.nom,mouvement.programme.numero,mouvement.date_effet,mouvement.credits_gestion,mouvement.cout_etp,'N'+mouvement.id])
      }
            })
   
    return (  
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
            <div className="fr-grid-row fr-grid-row--gutters">
                <div className="fr-col-lg-12">
                  <h1 className="fr-my-6w">Hitorique des mouvements</h1>
		 
                  <div className="fr-download"><p><CSVLink data={data_to_download} headers={headers} filename={"table_mouvements.csv"} className="fr-download__link">Télécharger le tableau <span className="fr-download__detail">CSV</span> </CSVLink></p></div>
        
        		  		<div className="fr-table fr-mb-3w fr-table--no-caption">
        				    <table>
        				      	<thead>
        				        <tr>
        				        	<th scope="col">Région <Checkbox_dropdown name="region" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.liste_regions_mvt} parentCallback = {this.handleCallback}/></th>
        				        	<th scope="col">Date <button onClick={() => {this.sortTable('date')}} id="date"><span className="fr-icon-code-view fr-fi--sm rotate90" aria-hidden="true"></span></button></th>
        				        	<th scope="col">Quotité ETP</th>
        				        	<th scope="col">Macrograde <Checkbox_dropdown name="grade" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.grades} parentCallback = {this.handleCallback}/></th>
        				        	<th scope="col">Type <Checkbox_dropdown name="type_mouvement" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.type_mouvements} parentCallback = {this.handleCallback}/></th>
        				        	<th scope="col">Service concerné</th>

        				        	<th scope="col">Programme <Checkbox_dropdown name="programme" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.liste_programmes_mvt} parentCallback = {this.handleCallback}/></th>

        				          	<th scope="col">Date effective <button onClick={() => {this.sortTable('date_effet')}} id="valeur"><span className="fr-icon-code-view fr-fi--sm rotate90" aria-hidden="true"></span></button></th>	 
        				            <th scope="col">Mouvements en gestion (LFR)</th> 
        				            <th scope="col">Mouvements en base (PLF N+1)</th> 
                            <th scope="col">N° ref mouvement</th>   	
        				        </tr>
        				      	</thead>

        				      	<tbody>
        					      	{this.displayRow()} 
        				      	</tbody>
        				    </table>  	
        				  </div>
                </div>
            </div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


