import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Accordion } from "react-bootstrap";

class Faq extends React.Component {
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
			  			<h1>Déclaration d'accessibilité</h1>
			  			<section className="fr-py-6v">
				  			<p className="fr-mt-4v fr-mb-0">Établie le 2 février 2022.</p>
				  			<p className="fr-mt-4v fr-mb-0">
							Le Ministère de l'Economie, des Finances et de la Relance et la DGAFP s’engagent à rendre leur service accessible, conformément à l’article 47 de la loi n° 2005-102 du 11 février 2005.</p>
							<p className="fr-mt-4v fr-mb-0">Cette déclaration d’accessibilité s’applique à REPERE3 (https://www.repere3.finances.gouv.fr/).</p>
						</section>
				
						<section className="fr-py-6v">
							<h2 className="fr-h5">État de conformité</h2>
							<p className="fr-mt-4v fr-mb-0">REPERE3 est partiellement conforme avec le RGAA. </p>
						</section>
						<section className="fr-py-6v">
							<h2 className="fr-h5">Résultats des tests</h2>
							<p className="fr-mt-4v fr-mb-0">L’audit de conformité réalisé en auto-évaluation révèle que 80% des critères sont respectés. </p>
						</section>
						<section className="fr-py-6v">
							<h2 className="fr-h5">Amélioration et contact</h2>
					
							<p className="fr-mt-4v fr-mb-0">
							Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de REPERE3 pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.</p>

							<p className="fr-mt-4v fr-mb-0">E-mail : declic.budget@finances.gouv.fr</p>
							<p className="fr-mt-4v fr-mb-0">Adresse : 139 rue de Bercy, 75012 PARIS</p>
						</section>
						<section className="fr-py-6v">
						<h2 className="fr-h5">Voie de recours</h2>

						<p className="fr-mt-4v fr-mb-0">
							Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.</p>

						<p className="fr-mt-4v fr-mb-0">	Vous pouvez :</p>

						<p className="fr-mt-4v fr-mb-0">	
							- <a target="_blank" rel="noopener" href="https://formulaire.defenseurdesdroits.fr/" title="Écrire un message au Défenseur des droits - nouvelle fenêtre">Écrire un message au Défenseur des droits</a>
						</p>
						<p className="fr-mt-4v fr-mb-0">
							- <a target="_blank" rel="noopener" href="https://www.defenseurdesdroits.fr/saisir/delegues" title="Contacter le délégué du Défenseur des droits dans votre région - nouvelle fenêtre">Contacter le délégué du Défenseur des droits dans votre région</a>
						</p>
						<p className="fr-mt-4v fr-mb-0">
							- Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
							Défenseur des droits
							Libre réponse 71120 75342 Paris CEDEX 07
				  		</p>
				  		<p className="fr-mt-4v fr-mb-0">Cette déclaration d’accessibilité a été créée le 16 mars 2022 grâce au <a target="_blank" rel="noopener" href="https://betagouv.github.io/a11y-generateur-declaration/#create" title="Accéder au générateur de Déclaration d’Accessibilité de BetaGouv - nouvelle fenêtre"> Générateur de Déclaration d’Accessibilité de BetaGouv</a>.</p>
				  		</section>
				  	</div>
		  		</div>
		  	</main>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


