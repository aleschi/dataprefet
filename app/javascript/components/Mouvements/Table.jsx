import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
import Moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
import { CSVLink } from "react-csv";

class Table extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: this.props.mouvements,
        suppression: true,
        ajout: true,
        grade_a: true,
        grade_b: true,
        grade_c: true,
        liste_programmes_mvt: this.props.liste_programmes_mvt,
        selected: this.props.liste_programmes_mvt,
        date_croissant:true,
        date_effet_croissant: true,
	    }
	    this.sortTable = this.sortTable.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.deleteMouvement = this.deleteMouvement.bind(this);
	}
	componentDidUpdate(prevProps) {
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
       if (this.props.liste_programmes_mvt !== prevProps.liste_programmes_mvt) {
        this.setState({liste_programmes_mvt: this.props.liste_programmes_mvt});
        this.setState({selected: this.props.liste_programmes_mvt});
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
      console.log(mouvement.id);
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
	        return <tr key={index}><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_j">{mouvement.type_mouvement}</span>{(mouvement.ponctuel == true) && <span className="etiquette_r">Ponctuel</span>}</td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td><td><button className="bouton_delete" onClick={e => this.deleteMouvement(e, mouvement)}><i className="fas fa-trash-alt"></i></button></td></tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{Moment(mouvement.date).format('DD/MM/YYYY')}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_v">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{Moment(mouvement.date_effet).format('DD/MM/YYYY')}</td><td>{Math.round(mouvement.credits_gestion).toLocaleString('fr')}€</td><td>{Math.round(mouvement.cout_etp).toLocaleString('fr')}€</td><td><button className="bouton_delete" onClick={e => this.deleteMouvement(e, mouvement)}><i className="fas fa-trash-alt"></i></button></td></tr>
	        }	        	
    	})
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.checked});
        const url = "/api/v1/mouvements/search";
        var suppression = this.state.suppression;
        var  ajout = this.state.ajout;
        var  grade_a = this.state.grade_a;
        var  grade_b = this.state.grade_b;
        var  grade_c = this.state.grade_c;

        if ([event.target.name] == "suppression"){
          suppression = event.target.checked
        }
        if ([event.target.name] == "ajout"){
          ajout = event.target.checked
        }
        if ([event.target.name] == "grade_a"){
          grade_a = event.target.checked
        }
        if ([event.target.name] == "grade_b"){
          grade_b = event.target.checked
        }
        if ([event.target.name] == "grade_c"){
          grade_c = event.target.checked
        }
        
        const body = {
          suppression, ajout,grade_a,grade_b,grade_c
        };

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
      .then(response => this.setState({ mouvements: response.mouvements, }))
      .catch(error => console.log(error.message));
    };

    handleChange2(event, value) {
        const selected_new = new Array() 
        this.state.liste_programmes_mvt.forEach(el => {
          if (el == event.target.name && value == true){
            selected_new.push(el);
          }
          else if (el != event.target.name){
            selected_new.push(el);
          }
        });  
        this.setState({selected: selected_new});
        const url = "/api/v1/mouvements/search";
  
        const body = {
          selected_new
        };

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
      .then(response => this.setState({ mouvements: response.mouvements, }))
      .catch(error => console.log(error.message));
    };

    
    render() {

    const headers = ['Date','Quotité ETPT','Macrograde','Type',"Service concerné ",'Programme','Date effective mouvement', 'Mouvements en gestion', 'Mouvement en base (PLF N+1)' ];
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
	        	<th scope="col">Quotité ETPT</th>
	        	<th scope="col">Macrograde <Dropdown className="table_dropdown_box">
              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
              <Dropdown.Menu className="table_dropdown_menu">

                <div className="texte_etiquette"><Checkbox checked={this.state.grade_a} name="grade_a" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>A</div>
                <div className="texte_etiquette"><Checkbox checked={this.state.grade_b} name="grade_b" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>B</div>
                <div className="texte_etiquette"><Checkbox checked={this.state.grade_c} name="grade_c" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>C</div>
              </Dropdown.Menu>
            </Dropdown></th>
	        	<th scope="col">Type <Dropdown className="table_dropdown_box">
              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
              <Dropdown.Menu className="table_dropdown_menu">

                <div className="texte_etiquette"><Checkbox checked={this.state.suppression} name="suppression" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>Suppression</div>
                <div className="texte_etiquette"><Checkbox checked={this.state.ajout} name="ajout" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>Ajout</div>
              </Dropdown.Menu>
            </Dropdown> </th>
	        	<th scope="col">Service concerné</th>
	        	<th scope="col">Programme <Dropdown className="table_dropdown_box">
              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
              <Dropdown.Menu className="table_dropdown_menu">
                {this.state.liste_programmes_mvt.map((programme, index) => (
                  <div key={index} className="texte_etiquette"><Checkbox value={programme} checked={this.state.selected.includes(programme)} name={programme} onChange={(event, value) => this.handleChange2(event, value)} inputProps={{ 'aria-label': 'controlled' }}/>{programme}</div>
                ))}
              </Dropdown.Menu>
            </Dropdown></th>
	          <th scope="col">Date effective <button onClick={() => {this.sortTable('date_effet')}} id="valeur"><i className="fas fa-sort"></i></button></th>	 
            <th scope="col">Mouvements en gestion (LFR)</th> 
            <th scope="col">Mouvements en base (PLF N+1)</th>   
            <th scope="col"></th> 	
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


