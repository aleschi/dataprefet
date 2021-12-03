import React from "react";
import logoUrl from '../../assets/images/logo_ministere2.svg';

const Footer = () => (
	<div className="footer">
		<div className="footer_top">
		    <div className="footer_logo">
		    	<img src={logoUrl} alt="DB" />
		    </div>
		    <div className="footer_text">
		      
		    <div className="footer_links"><a href="https://budget.gouv.fr" target="_blank">budget.gouv.fr</a> <a href="https://gouvernement.fr" target="_blank">gouvernement.fr</a> <a href="https://economie.gouv.fr" target="_blank">economie.gouv.fr</a> <a href="https://data.gouv.fr" target="_blank">data.gouv.fr</a></div>
		    </div>
	    </div>
	    <div className="footer_bottom"> 
		    <a href="#">Mentions légales</a>
		    <span>|</span>
		    <a href="#">Données personnelles</a>
		    <span>|</span>
		    <a href="#">Accessibilité</a>
		    <span>|</span>
	  	</div>
  	</div>
);

export default Footer;


