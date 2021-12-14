import React from "react";
import Header from "../Header";
import Footer from "../Footer";


class Index_couts extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	programmes:[],
	    }
	}
	componentDidMount() {
    	const url = "/api/v1/couts/index";
    	fetch(url)
      	.then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      	})
      	.then(response => this.setState({ programmes: response.programmes}))
      	.catch(error => console.log(error.message));
    }

    displayRow = () => {
    	return this.state.programmes.map((programme, index) => {
			
			return <div key={index} className="tables_cout">
				<div className="titre_etiquette">Programme {programme.numero}</div>
				<div className="texte_etiquette">{programme.ministere.nom}</div>
				<div className="table">
			    <table className="table-striped">
			      	<thead>
			        <tr>
			        	<th scope="col">Macrograde</th>
			        	<th scope="col">Cout ETP annuel</th>
			        </tr>
			      	</thead>

			      	<tbody>
			      		{programme.couts.map((cout, index) => {
				      	 return <tr key={index}><td>{cout.categorie}</td><td>{cout.cout.toLocaleString('fr')}€</td></tr>
				      	})}
			      	</tbody>
			    </table>
			    </div>
			    <div className="d12"></div>
	    	</div>  			                	
    	})
    };

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Répartition des coûts ETP annuels par programme</div>
		  		<div className="d24"></div>
		  		<div className="d24"></div>
		  		<div>
		  			{this.displayRow()} 
		  		</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index_couts;


