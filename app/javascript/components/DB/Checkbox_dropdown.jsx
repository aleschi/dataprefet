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

        grades_selected: this.props.grades_selected,
        programmes_selected: this.props.programmes_selected,
        types_selected: this.props.types_selected,
        regions_selected: this.props.regions_selected,

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
      if (this.props.grades_selected !== prevProps.grades_selected) {
        this.setState({grades_selected: this.props.grades_selected});
      }
      if (this.props.programmes_selected !== prevProps.programmes_selected) {
        this.setState({programmes_selected: this.props.programmes_selected});
      }
      if (this.props.types_selected !== prevProps.types_selected) {
        this.setState({types_selected: this.props.types_selected});
      }
      if (this.props.regions_selected !== prevProps.regions_selected) {
        this.setState({regions_selected: this.props.regions_selected});
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

        const grades_selected = this.state.grades_selected;
        const programmes_selected = this.state.programmes_selected;
        const types_selected = this.state.types_selected;
        const regions_selected = this.state.regions_selected;

        const body = {
          selected_new, name, grades_selected,programmes_selected,types_selected,regions_selected
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
      .then(response => {this.props.parentCallback({mouvements: response.mouvements,grades_selected: response.grades_selected, programmes_selected: response.programmes_selected,types_selected: response.types_selected, regions_selected: response.regions_selected})})
      .catch(error => console.log(error.message));
    };

    render() {
   
    return (  
		
				        	<Dropdown className="table_dropdown_box pa">
				              <Dropdown.Toggle  className="table_dropdown_button"></Dropdown.Toggle>
				              <Dropdown.Menu className="table_dropdown_menu">
				                {this.state.array.map((arr, index) => (
				                  <div key={index}><Checkbox value={arr} checked={this.state.selected.includes(arr)} name={arr} onChange={(event, value) => this.handleChange(event, value)} inputProps={{ 'aria-label': 'controlled' }}/>{arr}</div>
				                ))}
				              </Dropdown.Menu>
				            </Dropdown>
				           
    );
    }
}

export default Checkbox_dropdown;


