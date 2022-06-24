import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Form from "./Form";

class New extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	statut: '',
	    }
	}
	componentDidMount() {
		const url2 = "/check_user_status";
      	fetch(url2)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ statut: response.statut }))
        .catch(() => this.props.history.push("/"));

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
    {(this.state.statut == "CBR") && 
		<div>
		  	<Header /> 
		  	<div className="fr-container">    
            	<div className="fr-grid-row fr-grid-row--gutters">
                	<div className="fr-col-12 fr-col-lg-12">
                  		<h1 className="fr-my-6w">Nouveau redéploiement sur la région {this.state.region}</h1>
		  			</div>
		  		</div>
		  				<Form />
		  			
		  	</div>
		  	<Footer /> 
		</div>
	}
	</div>
    );
    }
}

export default New;

