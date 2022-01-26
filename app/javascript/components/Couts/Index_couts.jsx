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
			
			return <tr key={index}>
				      	<td>{programme.numero} - {programme.ministere.nom} </td>
				      	{programme.couts.map((cout, index) => {
				      	return <td key={index}>{cout.cout.toLocaleString('fr')}€</td>
						})}
				    </tr>
				      	
			      	 			                	
    	})
    };

    render() {
    
    return (  
		<div>
		  	<Header /> 
		  	<div className="page_container">
		  		<div className="titre_page">Répartition des coûts ETP annuels</div>
		  		<div className="d24"></div>
		  		<div>
		  			<div  className="table">
			    	<table className="table-striped">
			      	<thead>
			        <tr>
			        	<th scope="col">Programme</th>
			        	<th scope="col">Macrograde A</th>
			        	<th scope="col">Macrograde B</th>
			        	<th scope="col">Macrograde C</th>
			        </tr>
			      	</thead>

			      	<tbody>
		  				{this.displayRow()} 
		  			</tbody>
			    	</table>
	    			</div> 
	    			<div className='texte_info'>Source Base Pay </div>
		  		</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Index_couts;


