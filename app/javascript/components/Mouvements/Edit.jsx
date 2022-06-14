

import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Form2 from "./Form2";

class Edit extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	      isLoggedIn: false,
	      statut: '',
	     };
	    
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
        .then(response => this.setState({ isLoggedIn: response.isLoggedIn, statut: response.statut }))
        .catch(() => this.props.history.push("/"));
  	}

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
            	<div className="fr-grid-row fr-grid-row--gutters">
                	<div className="fr-col-lg-12">
                  		<h1 className="fr-my-6w">Modifier un mouvement</h1>
		  			</div>
		  		</div>
		  		{ (this.state.statut=="admin") &&
		  				<Form2 />
		  		}
		  			
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Edit;


