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
		    <a>Mentions légales</a>
		    <span>|</span>
		    <a>Données personnelles</a>
		    <span>|</span>
		    <a>Accessibilité</a>
		    <span>|</span>
		    <a className="tu" href="mailto:declic.budget@finances.gouv.fr" target="_blank">Nous contacter : declic.budget@finances.gouv.fr</a>
	  	</div>
  	</div>
);

export default Footer;


