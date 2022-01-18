import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)
import Select from 'react-select';

import New_recap from "./New_recap";
import Checkbox from '@mui/material/Checkbox';

const grades = [
	  { value: 'A', label: 'A', name:"grade" },
	  { value: 'B', label: 'B', name:"grade" },
	  { value: 'C', label: 'C', name:"grade" },
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
	      mouvement_id: null,
	      service_id: null,
	      programmes: [],
	      services: [],
	      isValid: false,
	      ponctuel: false,
	      mouvements: [],
	    };

	    this.onChange = this.onChange.bind(this);
	    this.onSubmit = this.onSubmit.bind(this);
	    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	    this.handleCheck = this.handleCheck.bind(this);
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
      	.then(response => this.setState({ programmes: response.programmes, mouvements: response.mouvements, }))
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
    	
    	const { date_effet, type_mouvement, grade, quotite, programme_id, service_id, ponctuel, mouvement_id} = this.state;

	    const body = {
	       date_effet, type_mouvement, grade, quotite, programme_id, service_id,ponctuel,mouvement_id
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
	      .then(response => {window.location.href = "/historique" ;})
	      .catch(error => console.log(error.message));
  	}

  	handleChange = name => value => {
	    this.setState({ [name]: value,}, function() {
	    	if (this.state.type_mouvement !== null && this.state.type_mouvement['value'] == "ajout"){
		    	if (this.state.grade !== null && this.state.quotite !== null && this.state.programme_id !== null && this.state.service_id !== null && this.state.date_effet !== null && this.state.mouvement_id !== null){
		    	this.setState({ isValid: true});
		    	}
		    	else {
		    	this.setState({ isValid: false});
		    	}
	    	}
	    	else if (this.state.type_mouvement !== null && this.state.type_mouvement['value'] == "suppression"){
		    	if (this.state.grade !== null && this.state.quotite !== null && this.state.programme_id !== null && this.state.service_id !== null && this.state.date_effet !== null){
		    	this.setState({ isValid: true});
		    	}
		    	else {
		    	this.setState({ isValid: false});
		    	}
	    	}
	    	else {
	    		this.setState({ isValid: false});
	    	}
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

  	handleCheck(event) {
		this.setState({[event.target.name]: event.target.checked});
  	}
  	
    render() {
   
    const programmes_liste = this.state.programmes.map(programme => ({
	  label: programme.numero + ' - ' + programme.ministere.nom ,
	  value: programme.id,
	  name: "programme_id"
	}));

	const services_liste = this.state.services.map(service => ({
	  label: service.nom,
	  value: service.id,
	  name: "service_id"
	}));

	const mouvements_liste = this.state.mouvements.filter(mouvement => mouvement.type_mouvement == "suppression").map(mouvement => ({
	  label: 'ETP ' + mouvement.grade + ' - ' + mouvement.quotite*100 + '% - Programme ' + mouvement.programme.numero + ' (fait le ' + mouvement.date + ')'  ,
	  value: mouvement.id,
	  name: "mouvement_id"
	}));

	if (this.state.mouvements.filter(mouvement => mouvement.type_mouvement == "suppression").length > 0) {
	var type_mouvement = [
	{ value: 'suppression', label: "Suppression d'un ETP", name: "type_mouvement"  },
	{ value: 'ajout', label: "Ajout d'un ETP", name: "type_mouvement" },	  
	];
	} else {
	var type_mouvement = [
	{ value: 'suppression', label: "Suppression d'un ETP", name: "type_mouvement"  },	  
	];
	}


    return (  
    	<div className="align_flex w100s">
	    	<div className="w50 w100s">
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
			            {(this.state.type_mouvement !== null && this.state.type_mouvement['value'] == "ajout") &&
			            <div>
				            <div className="texte_etiquette">Si le redéploiement concerne un emploi ponctuel, veuillez cocher la case : <Checkbox checked={this.state.ponctuel} name="ponctuel" onChange={this.handleCheck} inputProps={{ 'aria-label': 'controlled' }}/></div>
				            <div className="texte_info">(un poste ponctuel est un poste qui répond à une politique prioritaire ministérielle nécessitant des recrutements spécifiques et exceptionnels en cours d’année)</div>
				            <div className="d24"></div>
				            <div className="texte_etiquette">Ajout suite à la suppression : </div>
				            <div className="form">
				                	<Select
								        value={this.state.mouvement_id}
								        onChange={this.handleChange('mouvement_id')}
								        options={mouvements_liste}
								        placeholder="- Sélectionner -"
								        components={{ IndicatorSeparator: () => null }}
								      />
					        </div>
				            <div className="d24"></div>
			            </div>
			            }
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
				                <div className="texte_etiquette">Quotité ETP</div>
				                
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
				            	<div className="texte_etiquette">Date effective</div>
				            	<DatePicker placeholderText="JJ/MM/YYYY" selected={this.state.date_effet} locale="fr" onChange= {this.onChange} dateFormat="dd/MM/yyyy" minDate={new Date(2022,0,1)} maxDate={new Date(2022,11,31)}/>
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

			            <div className="text-center">{ this.state.isValid ? <button type="submit" className="bouton">Valider</button> : <span className="bouton_inactif">Valider</span>} </div>

			            <div className="d24"></div>
					</form>
				</div>
			</div>
			<div className="w50 w100s">
				<New_recap type_mouvement={this.state.type_mouvement} mouvement_id={this.state.mouvement_id} quotite={this.state.quotite}/>
			</div>
		</div>
    );
    }
}

export default Form;


