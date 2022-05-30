import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
<footer className="fr-footer" role="contentinfo" id="footer">
	    <div className="fr-container">
	        <div className="fr-footer__body">
	            <div className="fr-footer__brand fr-enlarge-link">
	              
	                    <p className="fr-logo" title="république française">
	                        Ministère<br/>de l'économie<br/>des finances<br/>et de la relance
	                    </p>
	              
	            </div>
	            <div className="fr-footer__content">
	               	<p className="fr-footer__content-desc">Besoin d'aide ? contactez-nous à l'adresse mail <a href="mailto:declic.budget@finances.gouv.fr" target="_blank">declic.budget@finances.gouv.fr</a></p>
	                <ul className="fr-footer__content-list">
	                    <li className="fr-footer__content-item">
	                        <a className="fr-footer__content-link" href="https://legifrance.gouv.fr">legifrance.gouv.fr</a>
	                    </li>
	                    <li className="fr-footer__content-item">
	                        <a className="fr-footer__content-link" href="https://gouvernement.fr">gouvernement.fr</a>
	                    </li>
	                    <li className="fr-footer__content-item">
	                        <a className="fr-footer__content-link" href="https://service-public.fr">service-public.fr</a>
	                    </li>
	                    <li className="fr-footer__content-item">
	                        <a className="fr-footer__content-link" href="https://data.gouv.fr">data.gouv.fr</a>
	                    </li>
	                </ul>
	            </div>
	        </div>
	        <div className="fr-footer__bottom">
	            <ul className="fr-footer__bottom-list">
	                <li className="fr-footer__bottom-item">
	                    <Link className="fr-footer__bottom-link" to='/accessibilite'>Accessibilité: partiellement conforme</Link>
	                </li>
	                <li className="fr-footer__bottom-item">
	                    <Link className="fr-footer__bottom-link" to='/mentions-legales'>Mentions légales</Link>
	                </li>
	                <li className="fr-footer__bottom-item">
	                    <Link className="fr-footer__bottom-link" to='/donnees-personnelles'>Données personnelles & Gestion des cookies</Link>
	                </li>
	                <li className="fr-footer__bottom-item">
	                  <button className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left" aria-controls="fr-theme-modal" data-fr-opened="false">Paramètres d'affichage</button>
	                </li>

	            </ul>
	            <div className="fr-footer__bottom-copy">
	                <p>Sauf mention contraire, tous les contenus de ce site sont sous <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">licence etalab-2.0</a>
	                </p>
	            </div>
	        </div>
	    </div>
	</footer>

);

export default Footer;


