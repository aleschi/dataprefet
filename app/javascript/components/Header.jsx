import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
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
    <header role="banner" className="fr-header">
		    <div className="fr-header__body">
		        <div className="fr-container">
		            <div className="fr-header__body-row">
		                <div className="fr-header__brand fr-enlarge-link">
		                    <div className="fr-header__brand-top">
		                        <div className="fr-header__logo">
		                            <p className="fr-logo">
		                                Ministère
                                		<br/>de l'économie,<br/>des finances<br/>et de la souveraineté<br/> industrielle et numérique
		                            </p>
		                        </div>
		                        <div className="fr-header__navbar">
		                            <button className="fr-btn--menu fr-btn fr-link" data-fr-opened="false" aria-controls="modal-833" aria-haspopup="menu" title="Menu" id="fr-btn-menu-mobile">
		                                Menu
		                            </button>
		                        </div>
		                    </div>
		                    <div className="fr-header__service">
		                        <a href="https://www.repere3.finances.gouv.fr" title="Accueil - Repere3 | Direction du Budget">
		                            <p className="fr-header__service-title">REPERE3</p>
		                        </a>
		                        <p className="fr-header__service-tagline">REdéploiement entre Programmes des Emplois en REgion - 3%</p>
		                    </div>
		                </div>
		           
		                <div className="fr-header__tools">
		                    <div className="fr-header__tools-links">
		                        <ul className="fr-links-group">	                        	
		                            
		                            <li className="fr-shortcuts__item">
		                                <a className="fr-link fr-fi-logout-box-r-line" data-method="delete" href="/logout">Se déconnecter</a>
		                            </li>
		                            
		                        </ul>
		                    </div>
		                </div>
		                
		            </div>
		        </div>
		    </div>
		    <div className="fr-header__menu fr-modal" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
		        <div className="fr-container">
		            <button className="fr-btn--close fr-link" aria-controls="modal-833">Fermer</button>
		            <div className="fr-header__menu-links ">

		            </div>
		            <nav className="fr-nav" id="navigation-832" role="navigation" aria-label="Menu principal">
		                <ul className="fr-nav__list">
		                    <li className="fr-nav__item">
		                        <NavLink  to='/' className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')} target="_self" >Accueil</NavLink>
		                    </li>
		                    { (this.state.statut=="admin" || this.state.statut=="ministere") &&
		                    <li className="fr-nav__item">
		                        <NavLink  to="/mouvements-globaux" className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')} target="_self">Historique des redéploiements</NavLink>
		                    </li>
		                    }
		                    { (this.state.statut=="CBR" || this.state.statut=="prefet") &&
		                    <li className="fr-nav__item">
		                        <NavLink  to="/historique" className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')} target="_self">Historique des redéploiements</NavLink>
		                    </li>
		                    }
		                    { (this.state.statut=="CBR") &&
		                    <li className="fr-nav__item">
		                        <NavLink  to="/mouvements" className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')} target="_self">Créer un redéploiement</NavLink>
		                    </li>
		                    }

		                    <li className="fr-nav__item">
		                        <NavLink  to="/couts-etp" className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')} target="_self">Tableau coûts ETP annuels</NavLink>
		                    </li>

		                    <li className="fr-nav__item">
		                        <NavLink  to="/faq"  target="_self" className={(navData) => (navData.isActive ? "fr-nav__link" : 'fr-nav__link')}>FAQ</NavLink>
		                    </li>
		                </ul>
		            </nav>
		        </div>
		    </div>
		</header>

		
    );
    }
}

export default Header;


