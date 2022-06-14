import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Form from "./Form";

class New extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	
	    }
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
      	.then(response => this.setState({region: response.region }))
      	.catch(error => console.log(error.message));
    }

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
            	<div className="fr-grid-row fr-grid-row--gutters">
                	<div className="fr-col-lg-12">
                  		<h1 className="fr-my-6w">Nouveau redéploiement sur la région {this.state.region}</h1>
		  			</div>
		  		</div>
		  				<Form />
		  			
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default New;

