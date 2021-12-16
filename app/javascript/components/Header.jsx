import React from "react";
import logoUrl from '../../assets/images/logo_ministere2.svg';
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'react-bootstrap';

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
		<div>
		  	<div className="logo_header">
		    	<img src={logoUrl} alt="DB" />
		  	</div>
		  	<div className="nav_header_box">
			  	<div className="nav_header">
			  		
			  		<div className="nav_link"><NavLink className={({ isActive }) => (isActive ? 'nav_link nav_link_active' : 'nav_link')} to='/'>Accueil</NavLink></div> 
			  		{ (this.state.statut=="admin" || this.state.statut=="ministere") &&
			  		<div className="nav_link"><NavLink className={({ isActive }) => (isActive ? 'nav_link nav_link_active' : 'nav_link')} to='/mouvements-globaux'>Historique des mouvements</NavLink></div> }

			  		{ (this.state.statut=="CBR" || this.state.statut=="prefet") &&
			  		<div className="nav_link"><NavLink className={({ isActive }) => (isActive ? 'nav_link nav_link_active' : 'nav_link')} to='/historique'>Historique des déploiements</NavLink></div> }


			  		{ (this.state.statut=="CBR") &&
			  		<div className="nav_link"><NavLink className={({ isActive }) => (isActive ? 'nav_link nav_link_active' : 'nav_link')} to='/mouvements'>Créer un redéploiement</NavLink></div> }

			  		
			  		<div className="nav_link"><NavLink className={({ isActive }) => (isActive ? 'nav_link nav_link_active' : 'nav_link')} to='/couts-etp'>Tableau coûts ETP annuels</NavLink></div> 

			  		
			  		
			  		
			  		<Dropdown className="user_dropdown">
			  			<Dropdown.Toggle  className="user_dropdown_button"><i className="fas fa-user-circle"></i></Dropdown.Toggle>
			  			<Dropdown.Menu className="">
			  				{this.state.isAdmin ? <div className="nav_link"><Link to='/'>Ajouter un document</Link></div> : null }
			  				<div className="nav_link"><a rel="nofollow" data-method="delete" href="/logout" >Se déconnecter</a></div> 
			  			</Dropdown.Menu>
			  		</Dropdown>

			  	</div>
		  	</div>
	    </div>
    );
    }
}

export default Header;


