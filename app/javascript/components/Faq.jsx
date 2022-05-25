import React from "react";
import Header from "./Header";
import Footer from "./Footer";

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
		  	<div className="fr-container">    
        		<div className="fr-grid-row fr-grid-row--gutters">
          			<div className="fr-col-lg-12">
          				<h1 className="fr-my-6w">Questions Fréquentes </h1>
		  		
		  		<div className="fr-mb-2w">Cette foire aux questions se propose de recenser et d’apporter des éléments de réponse aux interrogations des acteurs du dispositif. Pour toutes vos questions et besoins de renseignements supplémentaires, veuillez nous contacter par mail à l'adresse mail suivante : <a href="mailto:declic.budget@finances.gouv.fr" target="_blank">declic.budget@finances.gouv.fr</a></div>
		  		
		  		{ (this.state.statut=="CBR" || this.state.statut=="admin") &&
		  		<div className="fr-mb-2w fr-downloads-group fr-downloads-group--bordered">
		  			<ul><li>
		  			<div className="fr-download"><p><a className="fr-download__link" href="/Memo.pdf" download>Télécharger le mémo outil pour CBR <span className="fr-download__detail">PDF – 119 ko</span></a></p></div>
		  			</li>
		  			<li>
		  			<div className="fr-download"><p><a className="fr-download__link" href="/Formulaire.xlsx" download>Télécharger le formulaire de liaison destiné au SGARE <span className="fr-download__detail">XLSX – 21 ko</span></a></p></div>
		  			</li></ul>
		  		</div>
		  		}

		  		<h2 className="fr-my-2w">Liste des questions</h2>
		  		<div className="fr-accordions-group fr-mb-3w">

		  			<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-114">D’où sont issues les données d’effectifs présentées sur les pages de l’outil REPERE3 ? (effectifs cibles, plafonds 2022, ETP redéployés, solde 2022)</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-114">
					    
					      	Ces données sont renseignées en début d’année par la direction du budget dans son rôle d’administrateur de l’outil REPERE3 (https://www.repere3.finances.gouv.fr). Les données sont fournies par le secrétariat général de chaque ministère en cohérence avec les notifications de plafond d’emploi et de crédits de masse salariale (titre 2) réalisées par les administrations centrales responsables de programme (RPROG) aux responsables de budgets opérationnels de programme (BOP) en région. Le secrétariat général de chaque ministère est responsable de la conformité entre les chiffres transmis à la direction du budget et ceux notifiés aux RBOP.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-115">Quel est le périmètre de l’administration territoriale de l’Etat (ATE) ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-115">
					    
					      	L’ATE au sens budgétaire du terme est constituée des seuls programmes 354, 217, 206, 215, 134, 155 et 124.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-116">Que signifient les différentes notions ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-116">
					    
					      	<div><b>•	Effectifs cibles </b>: cet effectif est mesuré en équivalents temps plein (ETP) et traduit la vision budgétaire en support d’emplois.</div>
							<div><b>•	Plafonds 2022 </b>: cet effectif est mesuré en équivalents temps plein travaillés (ETPT) et donne une vision plus opérationnelle rapportée au temps (mois) de l’effectif dont peut disposer le RBOP régional (préfet de région) sur l’ensemble du champ constitué par les programmes inclus dans l’administration territoriale de l’Etat (ATE).</div>
							<div><b>•	ETP redéployés </b>: cette notion mesure en ETP l’impact des redéploiements opérés en région par application du dispositif décrit dans la circulaire conjointe MTFP-MCP du 22/12/2021. La donnée est de zéro en début d’exercice et progresse jusqu’à un maximum constitué par le produit de l’effectif-cible (ETP) et de 3% (solde 2022).</div>
							<div><b>•	Solde 2022 </b>: cette donnée mesure en ETP la capacité maximale de redéploiement d’emplois sur une région donnée (produit de l’effectif-cible et de 3%). </div>
							<div><b>•	N° ref mouvement</b>: ce numéro permet d'identifier les ajouts liés à une suppression. Chaque ajout a ainsi le même numéro de référence que la suppression à laquelle il est lié. Un numéro égal à "Nul" s'explique dans le cas où le mouvement de suppression a été supprimé par le CBR mais que les ajouts liés ont été conservés (il est dans ce cas conseillé de supprimer également les ajouts liés).</div>
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-117">Existe-t-il un lien technique fonctionnel entre l’outil et CHORUS ou un autre SI (RH notamment) ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-117">
					    
					      	Non, il n’y a pas de déversement dans un autre système des mouvements saisis dans l’outil. REPERE3 est un outil de synthèse et de transparence de l’information, alimenté en début d’année par les ministères et la direction du budget et en cours de gestion par les CBR. Ses résultats sont reportés par la direction du budget dans les applications de gestion des lois de finance.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-118">Que prend-on en considération comme assiette ? Les ETP ou la vision en cible ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-118">
					    
					      	La vision en organigramme (ou en cible) ne peut être retenue, dès lors que les postes pour être redéployés supposent un financement. Seuls les ETP financés en titre 2 sur le BOP concerné pour l’année en cours constituent l’assiette de redéploiement.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-119">Le plafond des 3 % (applicable à la somme des effectifs financés une année donnée sur les BOP du périmètre ATE d’une région) pour les redéploiements tient-il compte de la quotité de travail des emplois supprimés et ajoutés ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-119">
					    
					      	Dans la rubrique « accueil » de l’outil REPERE3, les données du « tableau synthèse ETPT par catégorie » relatives aux emplois ajoutés et supprimés tiennent compte des dates de suppression et d'ajout des emplois et de la quotité de travail associée aux emplois ajoutés et supprimés.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-120">Quel est le mécanisme de compensation budgétaire ? Impacte-t-il le niveau régional ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-120">
					    
					      	Le dispositif de redéploiement des emplois dans la limite de 3% s’équilibre par versement, le cas échéant, au plan national, de compensations budgétaires entre programmes. Au titre de l’année N, le financement du total des emplois nets transférés sera assuré en PLFR de fin d’année ; le PLF N+1 prendra en compte, quant à lui, le cas échéant, le coût annuel total de l’emploi s’il a vocation à être pérennisé. Le sujet de la compensation budgétaire consolidée relève des acteurs nationaux (RFFIM, RPROG, DB) et pas des acteurs en région.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-121">A quel moment de la procédure utilise-t-on les coefficients de conversion entre catégories ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-121">
					    
					      	La circulaire prévoit qu’« une fongibilité entre emplois de catégories différentes est possible et s'effectuera sur la base d'un coefficient de conversion entre catégories défini chaque année par la direction du budget sur la base des coûts salariaux constatés ». Un redéploiement consistant en la suppression d'un emploi de catégorie B ou C d'un programme pour créer un emploi de catégorie A sur un autre programme est donc autorisé. 
							La couverture en masse salariale (colonne « <span className="tu">mouvements en gestion</span> » et « <span className="tu">mouvements en base </span>») s’opérera sur la base des coûts salariaux du programme contributeur. 
							Les coûts moyens par ETP, par catégorie ou macro-grade du programme de départ, seront pris comme référence pour établir le montant consolidé de la compensation budgétaire versée in fine au programme d’arrivée. 
							Lors de la création de l’emploi sur le nouveau programme support, une enveloppe de crédits à due concurrence sera ajoutée aux crédits T2 nationaux du programme. 
							A ces règles s’appliquant aux crédits s’ajoute une règle encadrant le <span className="tu">plafond d’emploi</span> (taux de conversion entre catégorie).

							<div className="fr-table fr-mb-2w fr-table--no-caption">
							    <table>
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

							<span className="tu">Note de lecture</span> : la lecture s’effectue en ligne : un emploi de A peut-être redéployé en 1 A ou 1,4 B ou 1,7 C.

							
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-122">A quoi s’applique concrètement la date limite du 1er novembre pour les redéploiements :
						à la prise d’effet prévisionnelle de la création de poste ?
						à la date de saisie dans l’outil </button>
				        </h3>
        				<div className="fr-collapse" id="accordion-122">
					    
					      	La date limite du 1er novembre est celle de la date de saisie dans l’outil. 
							Cette date a été fixée pour pouvoir consolider, dans le projet de loi de finances de fin de gestion (nouvelle appellation des LFR de fin d’année selon la loi organique du 28/12/2021 relative à la modernisation de la gestion des finances publiques), les mouvements de crédits et d’emplois permettant d’assurer la « couverture budgétaire » des recrutements opérés en cours d’année grâce au dispositif de redéploiement. 
							Il est fait l’hypothèse que les programmes concernés assurent « en trésorerie T2 » le financement des rémunérations servies sur les postes concernés, au cours de l’année avant la mise en place de cette compensation budgétaire (entre le 1er janvier et le 31 octobre).
							A défaut de saisie du redéploiement dans l’outil, il n’y aura pas de financement de l’emploi transféré. Cela ne signifie pas que l’agent ne sera pas rémunéré mais cela signifie que le programme ayant préfinancé la rémunération de l’emploi supplémentaire obtenu n’obtiendra pas compensation budgétaire de la charge salariale correspondante.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-123">Quelle notion de vacance doit être retenue ? 
						à la date de saisie dans l’outil </button>
				        </h3>
        				<div className="fr-collapse" id="accordion-123">
					    
					      	<div>La notion de vacance est une notion dynamique. Elle se mesure à un instant t et peut évoluer tout au long de l’année en fonction des décisions de gestion des administrations. Pour le suivi budgétaire, il est habituel de la mesurer au 31 décembre de l’année mais elle peut être mesurée tout au long de l’année pour des considérations de pilotage des emplois. </div>

							<div>La vacance est définie dans la circulaire comme une « absence de recrutement fléché et certain – sortie de concours ou processus de mobilité, par exemple ». Un poste fléché pour l’accueil d’un agent recruté par concours ou en mobilité ne donnera pas nécessairement lieu à un « recrutement certain », surtout dans les territoires peu attractifs. </div>
							<div>
							Destinée à fournir aux Préfets des moyens d’action supplémentaires sur le plan RH, en cohérence avec les objectifs qui leur sont fixés par le Premier ministre via leurs feuilles de route, la circulaire insiste sur :</div>
							<div>-  la nécessité d’un dialogue de gestion stratégique et anticipé, ce qui permettra de mettre en corrélation un besoin nouveau – ponctuel ou pérenne – et d’identifier les marges de redéploiement ;</div>
							<div>-  la notification des effectifs par les administrations centrales vers les SD avant le début de l’exercice.</div>

							<div>La mise en œuvre effective des objectifs de la circulaire repose sur la sincérité des informations communiquées et le respect du calendrier, ce qui peut justifier un « rodage » des acteurs, notamment parce qu’il est attendu une harmonisation des pratiques entre administrations centrales, concernant les modalités de notification, et entre services régionaux et départementaux. Par ailleurs, ce dialogue de gestion implique l’ensemble des acteurs locaux et notamment les DATE et DDI, et non pas seulement les DR.</div>

					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-124">Peut-on envisager des redéploiements inférieurs à 12 mois (poste non pérenne) pour une mission particulière ? </button>
				        </h3>
        				<div className="fr-collapse" id="accordion-124">
					    
					      	<div>La circulaire prévoit que « le préfet précise au contrôleur si le redéploiement envisagé est pérenne ou non ». Si le préfet indique « non pérenne », il coche la case indiquant que le redéploiement concerne un emploi ponctuel. Il y alors un seul mouvement en gestion (LFR) correspondant uniquement à l'emploi supprimé.</div>
							<div>Un redéploiement peut obéir à un besoin ponctuel lié à la mise en œuvre des feuilles de route des préfets et de leurs missions. Dès lors qu’un redéploiement répond à un besoin ponctuel, non récurrent, il n’est a priori pas reconduit sur l’exercice suivant. Il s’ensuit que l’impact en masse salariale porte sur la seule année de gestion N : le projet de loi de finances de fin de gestion devra prendre en considération le besoin de financement de cet emploi sur le programme ponctuellement porteur. Le portage de cet emploi par le nouveau programme d’accueil n’impactera pas N+1 et ne sera donc pas traité en PLF par la direction du budget, de manière consolidée au plan national.</div>
							<div>A cette précision relative à la pérennité du redéploiement, s’ajoute celle des durées respectives de financement par les programmes « cédant » et « cessionnaire » au titre de l’année de gestion. Lors de la saisie du transfert d’effectif dans l’outil, la durée de financement d’un emploi respectivement par le programme cédant et par le programme cessionnaire sont prises en compte pro rata temporis.</div>

					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-125">Les opérateurs de l’Etat tels que les agences régionales de santé sont-ils inclus dans le périmètre du dispositif de redéploiement ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-125">
					    
					      	<div>Le dispositif ne s’applique qu’aux administrations de l’Etat en région figurant dans le périmètre de l’administration territoriale de l’Etat. Le périmètre est régional et les suppressions et redéploiements ne peuvent porter que sur les programmes éligibles. 
							Les programmes concernés sont décrits dans l’annexe de la circulaire et sont repris dans un menu déroulant de l’outil REPERE3. La circulaire s’applique exclusivement à ces programmes. </div>
							<div>
							A noter que, bien qu’ils soient financés sur le programme 155, les moyens du service de <span className="tu">l’inspection du travail</span> ne sont pas inclus dans le champ des redéploiements. Les <span className="tu">délégués du préfet</span> sont également hors périmètre. </div>
							<div>Enfin, les <span className="tu">opérateurs et organismes publics</span> en région (ARS mais aussi CROUS, universités, …) n’entrent pas dans le champ d’application du mécanisme.</div>
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-126">Le dispositif modifie-t-il les procédures de recrutement au niveau local ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-126">
					    
					      	Les procédures de recrutement sont celles retenues par les différents ministères employeurs. Elles ne sont pas modifiées par le nouveau dispositif dit « 3% ».La DGAFP disposera au plan national d’un droit de « requêtage » dans l’outil identique à celui dont dispose la direction du budget. La connaissance qu’elle tirera de l’exploitation de l’outil lui permettra dès lors de répondre aux éventuelles questions RH posées par les acteurs, notamment dans le cadre de son rôle d’animation des PFRH.
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-127">L’agent, personne physique, candidat à un poste bénéficiant d’un redéploiement, accède-t-il à l’information selon laquelle son support d’emploi est intégré dans le mécanisme de redéploiement possible ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-127">
					    
					      	<div>Non car cela est indifférent à sa discussion avec son futur employeur sur le contenu du poste et sur les conditions d’emploi (position statutaire, niveau de rémunération, etc…). Le mécanisme de suivi des redéploiements et de compensation budgétaire n’intéresse en réalité que les acteurs du pilotage budgétaire des crédits et des emplois de titre 2 sur les programmes concernés. </div>
					      	<div>
							Les fiches de postes redéployés feront l’objet d’une publication et d’appels à candidature dans les mêmes conditions que les emplois notifiés par le RPROG au RBOP. </div>
					    </div>
				  	</section>

				  	<section className="fr-accordion">
				        <h3 className="fr-accordion__title">
				            <button className="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-128">Comment doit être traité le temps partiel ? 
						Récupère-t-on les « rompus de temps partiel » pour constituer des ETP « pleins » ?</button>
				        </h3>
        				<div className="fr-collapse" id="accordion-128">
					    
					      	L’outil comporte une rubrique permettant de renseigner la quotité d’emploi par rapport au temps plein ; la masse salariale correspondante est automatiquement calculée par l’outil à hauteur de cette quotité. Toutefois, les données entrées au moment de la suppression sur le programme initialement porteur ne lient pas pour la suite. Soit l’emploi transféré est occupé car l’agent est volontaire pour le « suivre » (nouvel employeur – nouveau programme support), alors la masse salariale correspondant à sa rémunération le suit ; soit le poste est vacant au moment de son redéploiement – situation de référence pour la circulaire –, et la quotité travaillée est supposée de 100 %. Le recrutement sur le nouveau programme support à une quotité travaillée différente – par hypothèse plus importante – n’est pas bloquante.
					    </div>
				  	</section>
				</div>

					</div>
				</div>
		  	</div>
		  	<Footer /> 
		</div>
    );
    }
}

export default Faq;


