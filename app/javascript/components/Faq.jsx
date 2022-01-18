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
		  	<div className="page_container">
		  		<div className="titre_page">FAQ</div>
		  		<div className="d24"></div>
		  		<div className="texte_etiquette">Cette foire aux questions se propose de recenser et d’apporter des éléments de réponse aux interrogations des acteurs du dispositif. Pour toutes vos questions et besoins de renseignements supplémentaires, veuillez nous contacter par mail à l'adresse mail suivante : <a href="mailto:declic.budget@finances.gouv.fr" target="_blank">declic.budget@finances.gouv.fr</a></div>
		  		<div className="d24"></div>
		  		<Accordion >
				  	<Accordion.Item eventKey="0">
					    <Accordion.Header>Qu’est-ce qui est attendu du CBR dans la gestion du dispositif ?</Accordion.Header>
					    <Accordion.Body>
					      	La circulaire des ministres chargés du budget et de la transformation et de la fonction publiques fait du CBR le pivot du mécanisme opérationnel d’enregistrement, de suivi et, si nécessaire, de régulation du dispositif de redéploiement d’emplois. En amont le CBR, s’il ne doit pas interférer dans les procédures régionales d’organisation des mécanismes de redéploiement (plus ou moins contraignants) établis par le préfet de région, a un rôle d’appui et de conseil pour favoriser la réussite opérationnelle du dispositif institué par la circulaire. 
							Le CBR est par ailleurs le seul acteur habilité à enregistrer dans l’outil conçu et déployé par la direction du budget les mouvements d’emplois qui lui sont communiqués par le préfet de région. Les autres acteurs ne disposent que d’un accès en lecture à l’outil. Au-delà du respect de la circulaire des ministres, les acteurs locaux ont intérêt à ce que les ajustements d’emplois (en plus et en moins) soient correctement enregistrés par le CBR car, à défaut, le mécanisme de compensation budgétaire ne pourra pas être réalisé ou seulement imparfaitement. 
							Le CBR doit veiller par ailleurs à ce que le plafond équivalent à 3% des emplois de l’ATE soit respecté. Pour ce faire, il a toute latitude pour établir des points d’information réguliers avec le SGAR.
							Enfin, il vérifie la correcte application des taux de conversion entre catégories.
							Les PFRH demeurent quant à eux les interlocuteurs privilégiés des préfets pour la gestion des emplois.
							A l‘occasion de ses points de rendez-vous avec les RBOP délégués, le CBR peut vérifier la cohérence entre les effectifs budgétaires saisis par la DB dans l’outil à partir des notifications réalisées par les RPROG et les effectifs utilisés par les RBOP délégués.
							Il est rappelé enfin que la circulaire insiste sur la nécessité d’un dialogue de gestion entre les acteurs auquel le CBR est en droit de contribuer (par exemple en pré-CAR).


					    </Accordion.Body>
				  	</Accordion.Item>
			  		<Accordion.Item eventKey="1">
			    		<Accordion.Header>Existe-t-il un lien technique fonctionnel entre l’outil et CHORUS ou un autre SI (RH notamment) ?</Accordion.Header>
					    <Accordion.Body>
					      Non, il n’y a pas de déversement dans un autre système des mouvements saisis dans l’outil. REPERE3 est un outil de synthèse et de transparence de l’information, alimenté en début d’année par les ministères et la direction du budget et en cours de gestion par les CBR. Ses résultats sont reportés par la direction du budget dans les applications de gestion des lois de finance.
					    </Accordion.Body>
			  		</Accordion.Item>
			  		<Accordion.Item eventKey="2">
			    		<Accordion.Header>Que prend-on en considération comme assiette ? Les ETP ou la vision en cible ?</Accordion.Header>
					    <Accordion.Body>
					      La vision en organigramme (ou en cible) ne peut être retenue, dès lors que les postes pour être redéployés supposent un financement. Seuls les ETP financés en titre 2 sur le BOP concerné pour l’année en cours constituent l’assiette de redéploiement.
					    </Accordion.Body>
			  		</Accordion.Item>

			  	

			  		<Accordion.Item eventKey="4">
			    		<Accordion.Header>Le plafond des 3 % (applicable à la somme des effectifs financés une année donnée sur les BOP du périmètre ATE d’une région) pour les redéploiements tient-il compte de la quotité de travail des emplois supprimés et ajoutés ?</Accordion.Header>
					    <Accordion.Body>
					      Dans la rubrique « accueil » de l’outil REPERE3, les données du « tableau synthèse ETPT par catégorie » relatives aux emplois ajoutés et supprimés tiennent compte des dates de suppression et d'ajout des emplois et de la quotité de travail associée aux emplois ajoutés et supprimés 
					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="5">
			    		<Accordion.Header>Quel est le mécanisme de compensation budgétaire ? Impacte-t-il le niveau régional ?</Accordion.Header>
					    <Accordion.Body>
					      Le dispositif de redéploiement des emplois dans la limite de 3% s’équilibre par versement, le cas échéant, au plan national, de compensations budgétaires entre programmes. Au titre de l’année N, le financement du total des emplois nets transférés sera assuré en PLFR de fin d’année ; le PLF N+1 prendra en compte, quant à lui, le cas échéant, le coût annuel total de l’emploi s’il a vocation à être pérennisé.
							Le sujet de la compensation budgétaire consolidée relève des acteurs nationaux (RFFIM, RPROG, DB) et pas des acteurs en région.


					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="6">
			    		<Accordion.Header>A quel moment de la procédure utilise-t-on les coefficients de conversion entre catégories ?</Accordion.Header>
					    <Accordion.Body>
					      	La circulaire prévoit qu’ « une fongibilité entre emplois de catégories différentes est possible et s'effectuera sur la base d'un coefficient de conversion entre catégories défini chaque année par la direction du budget sur la base des coûts salariaux constatés ».
							Un redéploiement consistant en la suppression d'un emploi de catégorie B ou C d'un programme pour créer un emploi de catégorie A sur un autre programme est donc autorisé. La couverture en masse salariale (colonne « mouvements en gestion » et « mouvements en base ») s’opérera sur la base des coûts salariaux du programme contributeur. Les coûts moyens par ETP, par catégorie ou macro-grade du programme de départ, seront pris comme référence pour établir le montant consolidé de la compensation budgétaire versée in fine au programme d’arrivée. Lors de la création de l’emploi sur le nouveau programme support, une enveloppe de crédits à due concurrence sera ajoutée aux crédits T2 nationaux du programme.
							A ces règles de crédits s’ajoute une règle encadrant le plafond d’emploi (taux de conversion entre catégorie) :
							Les transformations d’emplois entre catégories doivent respecter les coefficients suivant, établis sur la base des ratios de coûts salariaux constatés :

							<div className="table" >
							    <table className="table-striped">
							      	<thead>
							      		<tr>
								      	<th></th>
								        <th>A</th>
								        <th>B</th>
								        <th>C</th>
								        </tr>
							        </thead>
							        <tbody>
							        <tr><td>A</td><td>1</td><td>1.4</td><td>1.7</td></tr>
							        <tr><td>A</td><td>0.7</td><td>1</td><td>1.2</td></tr>
							        <tr><td>A</td><td>0.6</td><td>0.7</td><td>1</td></tr>
							        </tbody>
							    </table>
							</div>

							Note de lecture : la lecture s’effectue en ligne : un emploi de A peut-être redéployé en 1 A ou 1,4 B ou 1,7 C.

							Le guide pratique renseigne sur le séquençage des saisies par le CBR.

					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="7">
			    		<Accordion.Header>A quoi s’applique concrètement la date limite du 1er novembre pour les redéploiements :
						à la prise d’effet prévisionnelle de la création de poste ?
						à la date de saisie dans l’outil ? 
						</Accordion.Header>
					    <Accordion.Body>
					      	La date limite du 1er novembre est celle de la date de saisie dans l’outil.

							Cette date a été fixée pour pouvoir consolider, dans le projet de loi de finances de fin de gestion (nouvelle appellation des LFR de fin d’année selon la loi organique du 28/12/2021 relative à la modernisation de la gestion des finances publiques) les mouvements de crédits et d’emplois permettant d’assurer la « couverture budgétaire » des recrutements opérés en cours d’année grâce au dispositif de redéploiement. 

							Il est fait l’hypothèse que les programmes concernés assurent « en trésorerie T2 » le financement des rémunérations servies sur les postes concernés, au cours de l’année avant la mise en place de cette compensation budgétaire (entre le 1er janvier et le 31 octobre).

							La date de saisie n’a pas été rendue bloquante dans l’outil ce qui implique que, techniquement, il est possible de saisir la création d’un redéploiement antérieur a posteriori : la vigilance des CBR est appelée sur la position stricte qu’il conviendra de retenir, avec la nécessité de ne saisir que les mouvements certains et à venir, par anticipation.  

							On retiendra donc qu’à défaut de saisie du redéploiement dans l’outil, il n’y aura pas de financement de l’emploi transféré. Cela ne signifie pas que l’agent ne sera pas rémunéré mais cela signifie que le programme ayant préfinancé la rémunération de l’emploi supplémentaire obtenu n’obtiendra pas compensation budgétaire de la charge salariale correspondante. 



					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="8">
			    		<Accordion.Header>Quelle notion de vacance doit être retenue ? 

						</Accordion.Header>
					    <Accordion.Body>
					      	La notion de vacance est une notion dynamique. Elle se mesure à un instant t et peut évoluer tout au long de l’année en fonction des décisions de gestion des administrations. Pour le suivi budgétaire, il est habituel de la mesurer au 31 décembre de l’année mais elle peut être mesurée tout au long de l’année pour des considérations de pilotage des emplois. 

							La vacance est définie dans la circulaire comme une « absence de recrutement fléché et certain – sortie de concours ou processus de mobilité, par exemple ». Un poste fléché pour l’accueil d’un agent sorti de concours ou en mobilité ne donnera pas nécessairement lieu à un « recrutement certain », surtout dans les territoires peu attractifs. 
							Destinée à fournir aux préfets des moyens d’action supplémentaires sur le plan RH, en cohérence avec les objectifs qui leur sont fixés par le Premier ministre via leurs feuilles de route, la circulaire insiste sur :
							-  la nécessité d’un dialogue de gestion stratégique et anticipé, ce qui permettra de mettre en corrélation un besoin nouveau – ponctuel ou pérenne – et d’identifier les marges de redéploiement ;
							-  la notification des effectifs par les administrations centrales vers les SD avant le début de l’exercice.

							La mise en œuvre effective des objectifs de la circulaire repose sur la sincérité des informations communiquées et le respect du calendrier, ce qui peut justifier un « rodage » des acteurs, notamment parce qu’il est attendu une harmonisation des pratiques entre administrations centrales, concernant les modalités de notification, et entre services régionaux et départementaux. Par ailleurs, ce dialogue de gestion implique l’ensemble des acteurs locaux et notamment les DATE et DDI, et non pas seulement les DR.



					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="9">
			    		<Accordion.Header>Peut-on envisager des redéploiements inférieurs à 12 mois (poste non pérenne) pour une mission particulière ?

						</Accordion.Header>
					    <Accordion.Body>
					      	La circulaire prévoit que « le préfet précise au contrôleur si le redéploiement envisagé est pérenne ou non ». Si le préfet indique « non pérenne », il coche la case indiquant que le redéploiement concerne un emploi ponctuel. Il y alors un seul mouvement en base (PLF n+1) correspondant uniquement à l'emploi supprimé.
							Un redéploiement peut obéir à un besoin ponctuel lié à la mise en œuvre des feuilles de route des préfets et de leurs missions. 
							Dès lors qu’un redéploiement répond à un besoin ponctuel, non récurrent, il n’est a priori pas reconduit sur l’exercice suivant. Il s’ensuit que l’impact en masse salariale porte sur la seule année de gestion N : le projet de loi de finances de fin de gestion devra prendre en considération le besoin de financement de cet emploi sur le programme ponctuellement porteur. Le portage de cet emploi par le nouveau programme d’accueil n’impactera pas N+1 et ne sera donc pas traité en PLF par la direction du budget, de manière consolidée au plan national.

					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="10">
			    		<Accordion.Header>Les agences régionales de santé sont-elles dans le périmètre ?

						</Accordion.Header>
					    <Accordion.Body>
					      	Le dispositif ne s’applique qu’aux administrations de l’Etat en région figurant dans le périmètre de l’administration territoriale de l’Etat. Le périmètre est régional et les suppressions / redéploiements ne peuvent porter que sur les programmes éligibles ; les programmes concernés sont décrits dans l’annexe de la circulaire et sont repris dans un menu déroulant de l’outil REPERE3. La circulaire s’applique exclusivement à ces programmes. 
							A noter que, bien qu’ils soient financés sur le programme 155, les moyens du service de l’inspection du travail ne sont pas inclus dans le champ des redéploiements.
							Les délégués du préfet sont également hors périmètre.
							Les opérateurs et organismes publics en région (ARS mais aussi CROUS, universités, …) n’entrent pas dans le champ d’application du mécanisme.


					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="11">
			    		<Accordion.Header>Le dispositif modifie-t-il les procédures de recrutement au niveau local ?

						</Accordion.Header>
					    <Accordion.Body>
					      	Les procédures de recrutement sont celles retenues par les différents ministères employeurs. Elles ne sont pas modifiées par le nouveau dispositif dit « 3% ».
							La DGAFP disposera au plan national d’un droit de requêtage dans l’outil identique à celui dont dispose la DB. La connaissance qu’elle tirera de l’exploitation de l’outil lui permettra dès lors de répondre aux éventuelles questions RH posées par les acteurs, notamment dans le cadre de son rôle d’animation des PFRH.



					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="12">
			    		<Accordion.Header>L’agent, personne physique, candidat à un poste bénéficiant d’un redéploiement, accède-t-il à l’information selon laquelle son support d’emploi est intégré dans le mécanisme de redéploiement possible ?

						</Accordion.Header>
					    <Accordion.Body>
					      	Non car cela est indifférent à sa discussion avec son futur employeur sur le contenu du poste et sur les conditions d’emploi (position statutaire, niveau de rémunération, etc…). 
							Le mécanisme de suivi des redéploiements et de compensation budgétaire n’intéresse en réalité que les acteurs du pilotage budgétaire des crédits et des emplois de titre 2 sur les programmes concernés.  
							Les fiches de postes redéployés feront l’objet d’une publication et d’appels à candidature dans les mêmes conditions que les emplois notifiés par le RPROG au RBOP. 

					    </Accordion.Body>
			  		</Accordion.Item>

			  		<Accordion.Item eventKey="13">
			    		<Accordion.Header>Comment doit être traité le temps partiel ? 
						Récupère-t-on les « rompus de temps partiel » pour constituer des ETP « pleins » ?
						</Accordion.Header>
					    <Accordion.Body>
					      	L’outil comporte une rubrique permettant de renseigner la quotité d’emploi par rapport au temps plein ; la masse salariale correspondante est automatiquement calculée par l’outil à hauteur de cette quotité.
							Toutefois, les données entrées au moment de la suppression sur le programme initialement porteur ne lient pas pour la suite. 
 							Soit l’emploi transféré est occupé car l’agent est volontaire pour le « suivre » (nouvel employeur – nouveau programme support), alors la masse salariale correspondant à sa rémunération le suit ; soit le poste est vacant au moment de son redéploiement – situation de référence pour la circulaire –, et la quotité travaillée est supposée de 100 %. 
							Le recrutement sur le nouveau programme support à une quotité travaillée différente – par hypothèse plus importante – n’est pas bloquante.


					    </Accordion.Body>
			  		</Accordion.Item>
				</Accordion>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


