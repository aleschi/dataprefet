import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const grades = [
	  { value: 'A', label: 'A', name:"grade" },
	  { value: 'B', label: 'B', name:"grade" },
	  { value: 'C', label: 'C', name:"grade" },
	];
const type_mouvement = [
	  { value: 'ajout', label: "Ajout d'un ETP", name: "type_mouvement" },
	  { value: 'suppression', label: "Suppression d'un ETP", name: "type_mouvement"  },
	];
const quotites = [
	  { value: '1', label: '100%', name:"quotite" },
	  { value: '0.90', label: '90%', name:"quotite" },
	  { value: '0.80', label: '80%', name:"quotite" },
	  { value: '0.70', label: '70%', name:"quotite" },
	  { value: '0.60', label: '60%', name:"quotite" },
	  { value: '0.50', label: '50%', name:"quotite" },
	  { value: '0.40', label: '40%', name:"quotite" },
	  { value: '0.30', label: '30%', name:"quotite" },
	  { value: '0.20', label: '20%', name:"quotite" },
	  { value: '0.10', label: '10%', name:"quotite" },
	];


class Form extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      date_effet: null,
	      type_mouvement: null,
	      grade: null,
	      quotite: null,
	      programme_id: null,
	      service_id: null,
	      programmes: [],
	      services: [],
	      isValid: false,
	      
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSubmit = this.onSubmit.bind(this);
	    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
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
      	.then(response => this.setState({ programmes: response.programmes }))
      	.catch(error => console.log(error.message));
    }

  	stripHtmlEntities(str) {
	    return String(str)
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;");
  	}

  	onChange(event) {
    	this.setState({ date_effet: event });
  	}


  	onSubmit(event) {
    	event.preventDefault();
    	const url = "/api/v1/mouvements/create";
    	const { date_effet, type_mouvement, grade, quotite, programme_id, service_id} = this.state;

	    const body = {
	       date_effet, type_mouvement, grade, quotite, programme_id, service_id,
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
	      .then(response => useNavigate("/"))
	      .catch(error => console.log(error.message));
  	}

  	handleChange = name => value => {
	    this.setState({ [name]: value,}, function() {
	    	if (this.state.type_mouvement !== null && this.state.grade !== null && this.state.quotite !== null && this.state.programme_id !== null && this.state.service_id !== null && this.state.date_effet !== null){
	    	this.setState({ isValid: true});
	    	console.log(this.state.isValid);
	    	};
	    });

	    

	    if ([name] == 'programme_id'){
	    	const url = "/api/v1/mouvements/get_services";
	    	const programme_id = value;
	    	const body = { programme_id};

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
		      .then(response => this.setState({ services: response.services }))
		      .catch(error => console.log(error.message));
	    };   	
  	};
  	
    render() {

    const programmes_liste = this.state.programmes.map(programme => ({
	  label: programme.numero,
	  value: programme.id,
	  name: "programme_id"
	}));

	const services_liste = this.state.services.map(service => ({
	  label: service.nom,
	  value: service.id,
	  name: "service_id"
	}));
    
    return (  
		<div className="form_box">
			<form onSubmit={this.onSubmit}>
				<div className="texte_etiquette">Type de mouvement</div>
				
				<div className="form">   
	                <Select
	                	id="type_mouvement"
				        value={this.state.type_mouvement}
				        onChange={this.handleChange('type_mouvement')}
				        options={type_mouvement}
				        placeholder="- Sélectionner -"
				        components={{ IndicatorSeparator: () => null }}
				      />
	            </div>
	            <div className="d24"></div>

	            <div className="align_flex">
					<div className="w3">
		                <div className="texte_etiquette">Macrograde</div>
		                
		                <div className="form">
		                	<Select
						        value={this.state.grade}
						        onChange={this.handleChange('grade')}
						        options={grades}
						        placeholder="- Sélectionner -"
						        components={{ IndicatorSeparator: () => null }}
						      />
			            </div>
		            </div>
		            <div className="w3 pcenter">
		                <div className="texte_etiquette">Quotité ETPT</div>
		                
		                <div className="form">
		                	<Select
						        value={this.state.quotite}
						        onChange={this.handleChange('quotite')}
						        options={quotites}
						        placeholder="- Sélectionner -"
						        components={{ IndicatorSeparator: () => null }}
						      />
			                
		                </div>
		            </div>
		            <div className="w3">
		            	<div className="texte_etiquette">Date du changement</div>
		            	<DatePicker placeholderText="JJ/MM/YYYY" selected={this.state.date_effet} locale="fr" onChange= {this.onChange} dateFormat="dd/MM/yyyy" />
		            </div>
	            </div>

	            <div className="d24"></div>
	            <div className="texte_etiquette">Programme</div>
	          
	            <div className="form">
	                <Select
				        value={this.state.programme_id}
				        options={programmes_liste}
				        onChange={this.handleChange('programme_id')}
				        placeholder="- Sélectionner -"
				        components={{ IndicatorSeparator: () => null }}
				      />
				      				      
	            </div>

	            <div className="d24"></div>

	            <div className="texte_etiquette">Service d'affectation</div>
	            <div className="form">
	            	<Select
				        value={this.state.service_id}
				        onChange={this.handleChange('service_id')}
				        options={services_liste}
				        placeholder="- Sélectionner -"
				        components={{ IndicatorSeparator: () => null }}
				      />
	            </div>

	            <div className="d24"></div>

	            <div className="text-center">{ this.state.isValid ? <button type="submit" className="bouton">Valider</button> : <button className="bouton_inactif">Valider</button>} </div>

	            <div className="d24"></div>
			</form>
		</div>
    );
    }
}

export default Form;


