import React from "react";
import Header from "./Header";
import Footer from "./Footer";



class Donnees extends React.Component {
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
		  	<main role="main" className="fr-container fr-py-16v">
				<div className="fr-grid-row">
					<div className="fr-col-12 fr-col-md-8">
						  	<h1>Données Personnelles et Gestion des Cookies </h1>
						  	<section className="fr-py-6v">
						  		<h2 className="fr-h5">Données personnelles</h2>
								<p className="fr-mt-4v fr-mb-0">
									Ce site ne prélève aucune donnée à caractère personnel et ne fait intervenir aucun cookies. 
								</p>
							</section>
							
						</div>
					</div>
				</main>
		  	<Footer /> 
		</div>
    );
    }
}

export default Donnees;


