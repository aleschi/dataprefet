import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';
import Moment from 'moment';
import Checkbox from '@mui/material/Checkbox';

class Checkbox_dropdown extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	array: this.props.array,
	    	name: this.props.name,
	    	selected: this.props.array,

	    }
	    this.handleChange = this.handleChange.bind(this);
	}

	componentDidUpdate(prevProps) {
      if (this.props.array !== prevProps.array) {
        this.setState({array: this.props.array});
        this.setState({selected: this.props.array});
      }
      if (this.props.name !== prevProps.name) {
        this.setState({name: this.props.name});
      }

      
    };

    handleChange(event, value) {
        const selected_new = new Array() 
        this.state.array.forEach(el => {
          if (el == event.target.name && value == true){
            selected_new.push(el);
          }
          else if (el != event.target.name && this.state.selected.includes(el)){
            selected_new.push(el);
          }
        });  
        this.setState({selected: selected_new});
        const url = "/api/v1/mouvements/search";
        const name = this.state.name;
  
        const body = {
          selected_new, name
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
      .then(response => this.props.parentCallback(response.mouvements))
      .catch(error => console.log(error.message));
    };

    render() {
    
    return (  
		
				        	<Dropdown className="table_dropdown_box">
				              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
				              <Dropdown.Menu className="table_dropdown_menu">
				                {this.state.array.map((arr, index) => (
				                  <div key={index} className="texte_etiquette"><Checkbox value={arr} checked={this.state.selected.includes(arr)} name={arr} onChange={(event, value) => this.handleChange(event, value)} inputProps={{ 'aria-label': 'controlled' }}/>{arr}</div>
				                ))}
				              </Dropdown.Menu>
				            </Dropdown>
				           
    );
    }
}

export default Checkbox_dropdown;


