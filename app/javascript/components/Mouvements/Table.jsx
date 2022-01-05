import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
import Moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
import { CSVLink } from "react-csv";
import Checkbox_dropdown from '../DB/Checkbox_dropdown'

class Table extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: this.props.mouvements,

        liste_programmes_mvt: this.props.liste_programmes_mvt,
        grades: ["A","B","C"],
        type_mouvements: ["ajout","suppression"],

        date_croissant:false,
        date_effet_croissant: false,
        statut: '',

        grades_selected: ["A","B","C"],
        programmes_selected: this.props.liste_programmes_mvt,
        types_selected:["ajout","suppression"],
        regions_selected:[],
	    }
	    this.sortTable = this.sortTable.bind(this);

      this.deleteMouvement = this.deleteMouvement.bind(this);
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
        .then(response => this.setState({ statut: response.statut }))
        .catch(() => this.props.history.push("/"));
    }

	componentDidUpdate(prevProps) {
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
       if (this.props.liste_programmes_mvt !== prevProps.liste_programmes_mvt) {
        this.setState({liste_programmes_mvt: this.props.liste_programmes_mvt, programmes_selected: this.props.liste_programmes_mvt});
      } 
      
    };

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

    deleteMouvement = (e, mouvement) => {
      
      const url = `/api/v1/mouvements/destroy/${mouvement.id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ mouvements: response.mouvements }))
        .catch(error => console.log(error.message));
    };
  

    displayRow = () => {
    	return this.state.mouvements.map((mouvement, index) => {
    		if (mouvement.type_mouvement == "ajout"){
	        return <tr key={index}><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_j">{mouvement.type_mouvement}</span>{(mouvement.ponctuel == true) && <span className="etiquette_r">Ponctuel</span>}</td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td>{(this.state.statut == "CBR") && <td><button className="bouton_delete" onClick={e => this.deleteMouvement(e, mouvement)}><i className="fas fa-trash-alt"></i></button></td> }</tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_v">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td>{(this.state.statut == "CBR") && <td><button className="bouton_delete" onClick={e => this.deleteMouvement(e, mouvement)}><i className="fas fa-trash-alt"></i></button></td>}</tr>
	        }	        	
    	})
    };


    handleCallback = (childData) =>{
        this.setState({mouvements: childData.mouvements, grades_selected: childData.grades_selected, programmes_selected: childData.programmes_selected, types_selected: childData.types_selected})
    }
  
    render() {
    console.log(this.state.grades_selected);
    console.log(this.state.mouvements);

    const headers = ['Date','Quotité ETP','Macrograde','Type',"Service concerné ",'Programme','Date effective mouvement', 'Mouvements en gestion', 'Mouvement en base (PLF N+1)' ];
    var data_to_download = [];
    this.state.mouvements.map((mouvement, index) => {
   
      data_to_download.push([mouvement.date,mouvement.quotite,mouvement.grade,mouvement.type_mouvement,mouvement.service.nom,mouvement.programme.numero,mouvement.date_effet,mouvement.credits_gestion,mouvement.cout_etp])
            })

    return (
    <div>  
    <div className="tr"><CSVLink data={data_to_download} headers={headers} filename={"table_mouvements.csv"} className="bouton">Exporter la table <i className="fas fa-cloud-download-alt"></i></CSVLink></div>
    <div className="d24"></div>
		<div className="table" >
	    <table className="table-striped">
	      	<thead>
	        <tr>
	        	<th scope="col">Date <button onClick={() => {this.sortTable('date')}} id="date"><i className="fas fa-sort"></i></button></th>
	        	<th scope="col">Quotité ETP</th>
	        	<th scope="col">Macrograde <Checkbox_dropdown name="grade" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.grades} parentCallback = {this.handleCallback}/></th>
	        	<th scope="col">Type <Checkbox_dropdown name="type_mouvement" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.type_mouvements} parentCallback = {this.handleCallback}/> </th>
	        	<th scope="col">Service concerné</th>
	        	<th scope="col">Programme <Checkbox_dropdown name="programme" grades_selected={this.state.grades_selected} programmes_selected={this.state.programmes_selected} types_selected={this.state.types_selected} regions_selected={this.state.regions_selected} array={this.state.liste_programmes_mvt} parentCallback = {this.handleCallback}/></th>
	          <th scope="col">Date effective <button onClick={() => {this.sortTable('date_effet')}} id="valeur"><i className="fas fa-sort"></i></button></th>	 
            <th scope="col">Mouvements en gestion (LFR)</th> 
            <th scope="col">Mouvements en base (PLF N+1)</th>   
            {(this.state.statut == "CBR") && <th scope="col" className="w0"></th> }	
	        </tr>
	      	</thead>

	      	<tbody>
		      	{this.displayRow()} 
	      	</tbody>
	    </table>
		  	
		</div>
    </div>
    );
    }
}

export default Table;


