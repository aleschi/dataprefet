import React from "react";
import Header from "../Header";
import Footer from "../Footer";


class Tableprogramme extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	region:null,
	    	mouvements: this.props.mouvements,
        programmes: this.props.programmes,
	    }
	}
	componentDidUpdate(prevProps) {
      if (this.props.mouvements !== prevProps.mouvements) {
        this.setState({mouvements: this.props.mouvements});
      }
    };

    displayRow = () => {
    	return this.state.programmes.map((programme, index) => {    		
	        return <tr key={index}><td>{programme.numero} - {programme.ministere.nom}</td><td>XX ETP </td><td>xx</td><td>xx</td><td>xx€</td></tr>
	                	
    	})
    };
	
    render() {
    
    return (  
		<div className="table" >
	    <table className="table-striped">
	      	<thead>
	        <tr>
	        	<th scope="col">Programme</th>
	        	<th scope="col">Effectifs cibles</th>
	        	<th scope="col">ETP supprimés</th>
	        	<th scope="col">ETP ajoutés</th>
	        	<th scope="col">Mouvements crédits prévisionnels</th>
	        </tr>
	      	</thead>

	      	<tbody>
		      	{this.displayRow()} 
	      	</tbody>
	    </table>
		  	
		</div>
    );
    }
}

export default Tableprogramme;


