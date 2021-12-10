import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';

import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

class Table extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: this.props.mouvements,
        suppression: true,
        ajout: true,
	    }
	    this.sortTable = this.sortTable.bind(this);
      this.handleChange = this.handleChange.bind(this);
	}
	componentDidUpdate(prevProps) {
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
    };

    sortTable = (params) => {
   
      const mouvements = this.state.mouvements;
        const body = {
          mouvements
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
      .then(response => this.setState({ mouvements: response.mouvements}))
      .catch(error => console.log(error.message));
    };

    displayRow = () => {
    	return this.state.mouvements.map((mouvement, index) => {
    		if (mouvement.type_mouvement == "ajout"){
	        return <tr key={index}><td>{mouvement.date}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_j">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{mouvement.date_effet}</td></tr>
	        }
	        else if (mouvement.type_mouvement == "suppression"){
	        return <tr key={index}><td>{mouvement.date}</td><td>{mouvement.quotite}</td><td>{mouvement.grade}</td><td><span className="etiquette_v">{mouvement.type_mouvement}</span></td><td>{mouvement.service.nom}</td><td>{mouvement.programme.numero}</td><td>{mouvement.date_effet}</td></tr>
	        }	        	
    	})
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.checked});
        const url = "/api/v1/mouvements/search";
        var suppression = this.state.suppression;
        var  ajout = this.state.ajout;
        if ([event.target.name] == "suppression"){
          suppression = event.target.checked
        }
        if ([event.target.name] == "ajout"){
          ajout = event.target.checked
        }
        
        const body = {
          suppression, ajout
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
    
    return (  
		<div className="table" >
	    <table className="table-striped">
	      	<thead>
	        <tr>
	        	<th scope="col">Date <button onClick={() => {this.sortTable('date')}} id="date"><i className="fas fa-sort"></i></button></th>
	        	<th scope="col">Quotité ETPT</th>
	        	<th scope="col">Macrograde</th>
	        	<th scope="col">Type <Dropdown className="table_dropdown_box">
              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
              <Dropdown.Menu className="table_dropdown_menu">

                <div className="texte_etiquette"><Checkbox checked={this.state.suppression} name="suppression" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>Suppression</div>
                <div className="texte_etiquette"><Checkbox checked={this.state.ajout} name="ajout" onChange={this.handleChange} inputProps={{ 'aria-label': 'controlled' }}/>Ajout</div>
              </Dropdown.Menu>
            </Dropdown> </th>
	        	<th scope="col">Service concerné</th>
	        	<th scope="col">Programme</th>
	          <th scope="col">Date mise en place <button onClick={() => {this.sortTable('date_effet')}} id="valeur"><i className="fas fa-sort"></i></button></th>	     	
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


