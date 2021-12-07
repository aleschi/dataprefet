import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Table from "./Table";

class Index extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: [],
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
      	.then(response => this.setState({region: response.region, mouvements: response.mouvements }))
      	.catch(error => console.log(error.message));
    }

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">{this.state.region}</div>
		  		<div className="d24"></div>
		  		<div className="align_flex">
		  			<div className="bandeau"><span className="bandeau_titre">Effectifs cibles</span><span className="bandeau_texte"> XX ETP</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">Plafond 2021 </span><span className="bandeau_texte"> XX ETPT</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">ETP redéployés </span> <span className="bandeau_texte">{this.state.mouvements.length} ETP</span></div>
		  			<div className="bandeau"><span className="bandeau_titre">Solde 2021 </span><span className="bandeau_texte"> XX ETP</span></div>
		  		</div>
		  		<Table mouvements={this.state.mouvements}/>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index;


