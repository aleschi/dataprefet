import React from "react";
import Header from "./Header";
import Footer from "./Footer";


class Mentions extends React.Component {
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
          				<h1>Mentions légales</h1>
		  		
				  		<section className="fr-py-6v">
				  			<p className="fr-mt-4v fr-mb-0">Mises à jour le 2 février 2022.</p>
				  		</section>

				
						<section className="fr-py-6v">
						<h2 className="fr-h5">Éditeur</h2>
						<p className="fr-mt-4v fr-mb-0">
							Ministère de l'Économie, des finances et de la relance - Direction du Budget
						</p>
						<p className="fr-mt-4v fr-mb-0">Directrice de la publication : Mme Mélanie Joder - Directrice du Budget</p>
						</section>
						<section className="fr-py-6v">
						<h2 className="fr-h5">Conception et gestion du site</h2>
						<p className="fr-mt-4v fr-mb-0">Direction du Budget</p>

						</section>
						<section className="fr-py-6v">
						<h2 className="fr-h5">Hébergement </h2>
						<p className="fr-mt-4v fr-mb-0">Google Cloud Platform - Google France</p>
						<p className="fr-mt-4v fr-mb-0">Fournisseur de Cloud public (CSP) Google dans le cadre du marché UGAP C3</p>
						<p className="fr-mt-4v fr-mb-0">
							8, rue de Londres, 75009 Paris France
							01 42 68 53 00
						</p>

						</section>
						<section className="fr-py-6v">
						<h2 className="fr-h5">Code source du site</h2>
						<p className="fr-mt-4v fr-mb-0">Le code source du site est disponible sur Github.</p>
						</section>
					</div>
				</div>
				
		  	</main>
		  	<Footer /> 
		</div>
    );
    }
}

export default Mentions;


