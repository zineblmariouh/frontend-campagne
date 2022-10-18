
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

import { GestionEquipeDetailAdminComponent } from './view/gestion-equipe-detail-admin/gestion-equipe-detail-admin.component';


import { KeyWordDisciplineScientifiqueErcAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/key-word-discipline-scientifique-erc-admin.component';


import { GradeAdminComponent } from './view/grade-admin/grade-admin.component';


import { DoctorantAdminComponent } from './view/doctorant-admin/doctorant-admin.component';


import { ResponsabiliteEncadrementDoctorantAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/responsabilite-encadrement-doctorant-admin.component';


import { LangueAdminComponent } from './view/langue-admin/langue-admin.component';


import { OutilPedagogiquePubliqueCibleAdminComponent } from './view/outil-pedagogique-publique-cible-admin/outil-pedagogique-publique-cible-admin.component';


import { RoleProjetAdminComponent } from './view/role-projet-admin/role-projet-admin.component';


import { DisciplineScientifiqueAdminComponent } from './view/discipline-scientifique-admin/discipline-scientifique-admin.component';


import { StatusContratEtConventionAdminComponent } from './view/status-contrat-et-convention-admin/status-contrat-et-convention-admin.component';


import { DisciplineScientifiqueErcParentAdminComponent } from './view/discipline-scientifique-erc-parent-admin/discipline-scientifique-erc-parent-admin.component';


import { ResponsabiliteDirectionEncadrementEtudiantAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/responsabilite-direction-encadrement-etudiant-admin.component';


import { ResponsabilitePedagogiqueAdminComponent } from './view/responsabilite-pedagogique-admin/responsabilite-pedagogique-admin.component';


import { CaracterisationAdminComponent } from './view/caracterisation-admin/caracterisation-admin.component';


import { ConseilEtComiteScientifiqueAdminComponent } from './view/conseil-et-comite-scientifique-admin/conseil-et-comite-scientifique-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin.component';


import { DepartementScientifiqueAdminComponent } from './view/departement-scientifique-admin/departement-scientifique-admin.component';


import { TypeEtudeEnseignementAdminComponent } from './view/type-etude-enseignement-admin/type-etude-enseignement-admin.component';


import { SavoirEtInnovationAdminComponent } from './view/savoir-et-innovation-admin/savoir-et-innovation-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/developpement-de-savoir-et-innovation-scientifique-admin.component';


import { StructureIrdAdminComponent } from './view/structure-ird-admin/structure-ird-admin.component';


import { EnseignementZoneGeographiqueAdminComponent } from './view/enseignement-zone-geographique-admin/enseignement-zone-geographique-admin.component';


import { DisciplineScientifiqueErcAssociationAdminComponent } from './view/discipline-scientifique-erc-association-admin/discipline-scientifique-erc-association-admin.component';


import { IdentifiantAuteurExpertAdminComponent } from './view/identifiant-auteur-expert-admin/identifiant-auteur-expert-admin.component';


import { CommunauteSavoirEncadrementDoctorantAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/communaute-savoir-encadrement-doctorant-admin.component';


import { ZoneActiviteInteractionRechercheAdminComponent } from './view/zone-activite-interaction-recherche-admin/zone-activite-interaction-recherche-admin.component';


import { TypeOutilAdminComponent } from './view/type-outil-admin/type-outil-admin.component';


import { DisciplineScientifiqueConseilsScientifiqueAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/discipline-scientifique-conseils-scientifique-admin.component';


import { VieInstitutionnelleAdminComponent } from './view/vie-institutionnelle-admin/vie-institutionnelle-admin.component';


import { CommunauteSavoirEncadrementEtudiantAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/communaute-savoir-encadrement-etudiant-admin.component';


import { ConseilsScientifiqueAdminComponent } from './view/conseils-scientifique-admin/conseils-scientifique-admin.component';


import { InstrumentsEtDispositifsIrdAdminComponent } from './view/instruments-et-dispositifs-ird-admin/instruments-et-dispositifs-ird-admin.component';


import { EtatReclamationAdminComponent } from './view/etat-reclamation-admin/etat-reclamation-admin.component';


import { TemplateOuvertureAdminComponent } from './view/template-ouverture-admin/template-ouverture-admin.component';


import { NotificationAdminComponent } from './view/notification-admin/notification-admin.component';


import { VieInstitutionnelleDetailEtablissementAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/vie-institutionnelle-detail-etablissement-admin.component';


import { OutilPedagogiqueInstrumentIrdAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/outil-pedagogique-instrument-ird-admin.component';


import { OutilPedagogiqueAdminComponent } from './view/outil-pedagogique-admin/outil-pedagogique-admin.component';


import { TypeOutilPedagogiqueAdminComponent } from './view/type-outil-pedagogique-admin/type-outil-pedagogique-admin.component';


import { NatureExpertiseAdminComponent } from './view/nature-expertise-admin/nature-expertise-admin.component';


import { ObjetFormationGeneriqueAdminComponent } from './view/objet-formation-generique-admin/objet-formation-generique-admin.component';


import { DisciplineScientifiqueChercheurAdminComponent } from './view/discipline-scientifique-chercheur-admin/discipline-scientifique-chercheur-admin.component';


import { OutilPedagogiquePaysDiffusionAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/outil-pedagogique-pays-diffusion-admin.component';


import { RencontreMediaDisciplineScientifiqueAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/rencontre-media-discipline-scientifique-admin.component';


import { CommunauteSavoirEvenementColloqueScientifiqueAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/communaute-savoir-evenement-colloque-scientifique-admin.component';


import { PubliqueCibleAdminComponent } from './view/publique-cible-admin/publique-cible-admin.component';


import { VieInstitutionnelleDetailAdminComponent } from './view/vie-institutionnelle-detail-admin/vie-institutionnelle-detail-admin.component';


import { EtablissementProjetAdminComponent } from './view/etablissement-projet-admin/etablissement-projet-admin.component';


import { StatusProjetAdminComponent } from './view/status-projet-admin/status-projet-admin.component';


import { NiveauResponsabilitePedagogiqueAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/niveau-responsabilite-pedagogique-admin.component';


import { ZoneGeographiqueConseilsScientifiqueAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/zone-geographique-conseils-scientifique-admin.component';


import { EtablissementConsultanceScientifiquePonctuelleAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/etablissement-consultance-scientifique-ponctuelle-admin.component';


import { PubliqueProfessionelAdminComponent } from './view/publique-professionel-admin/publique-professionel-admin.component';


import { CampagneRelanceChercheurAdminComponent } from './view/campagne-relance-chercheur-admin/campagne-relance-chercheur-admin.component';


import { TypeEnseignementAdminComponent } from './view/type-enseignement-admin/type-enseignement-admin.component';


import { ContratEtConventionIrdAdminComponent } from './view/contrat-et-convention-ird-admin/contrat-et-convention-ird-admin.component';


import { ProjetActiviteRechercheDetailPaysAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/projet-activite-recherche-detail-pays-admin.component';


import { RencontreGrandPubliqueJeunePubliquePeriodeAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/rencontre-grand-publique-jeune-publique-periode-admin.component';


import { PaysFormationContinueAdminComponent } from './view/pays-formation-continue-admin/pays-formation-continue-admin.component';


import { VieInstitutionnelleDetailInstrumentIrdAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/vie-institutionnelle-detail-instrument-ird-admin.component';


import { EvenementColloqueScienntifiqueEnjeuxIrdAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/evenement-colloque-scienntifique-enjeux-ird-admin.component';


import { NationaliteAdminComponent } from './view/nationalite-admin/nationalite-admin.component';


import { CultureScientifiqueAdminComponent } from './view/culture-scientifique-admin/culture-scientifique-admin.component';


import { EnseignementAdminComponent } from './view/enseignement-admin/enseignement-admin.component';


import { PaysZoneGeographiqueAdminComponent } from './view/pays-zone-geographique-admin/pays-zone-geographique-admin.component';


import { EncadrementEtudiantAdminComponent } from './view/encadrement-etudiant-admin/encadrement-etudiant-admin.component';


import { EnjeuxIrdAdminComponent } from './view/enjeux-ird-admin/enjeux-ird-admin.component';


import { EnjeuxIrdComiteEtCommissionEvaluationAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/enjeux-ird-comite-et-commission-evaluation-admin.component';


import { TypeExpertiseEvaluationComiteEtCommissionEvaluationAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/type-expertise-evaluation-comite-et-commission-evaluation-admin.component';


import { RencontreMediaAdminComponent } from './view/rencontre-media-admin/rencontre-media-admin.component';


import { TypeExpertAdminComponent } from './view/type-expert-admin/type-expert-admin.component';


import { ReclamationAdminComponent } from './view/reclamation-admin/reclamation-admin.component';


import { EncadrementEtudiantEnjeuxIrdAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/encadrement-etudiant-enjeux-ird-admin.component';


import { ProjetActiviteRechercheDetailEtablissementLanceurAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/projet-activite-recherche-detail-etablissement-lanceur-admin.component';


import { CampagneRappelAdminComponent } from './view/campagne-rappel-admin/campagne-rappel-admin.component';


import { DisciplineScientifiqueEvenementColloqueScientifiqueAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/discipline-scientifique-evenement-colloque-scientifique-admin.component';


import { KeyWordAdminComponent } from './view/key-word-admin/key-word-admin.component';


import { OutilPedagogiqueDisciplineScientifiqueAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/outil-pedagogique-discipline-scientifique-admin.component';


import { PaysAdminComponent } from './view/pays-admin/pays-admin.component';


import { NatureEnseignementAdminComponent } from './view/nature-enseignement-admin/nature-enseignement-admin.component';


import { ContexteAdminComponent } from './view/contexte-admin/contexte-admin.component';


import { CampagneRappelChercheurAdminComponent } from './view/campagne-rappel-chercheur-admin/campagne-rappel-chercheur-admin.component';


import { EncadrementAdminComponent } from './view/encadrement-admin/encadrement-admin.component';


import { CommanditaireAdminComponent } from './view/commanditaire-admin/commanditaire-admin.component';


import { EnjeuxIrdConseilsScientifiqueAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/enjeux-ird-conseils-scientifique-admin.component';


import { DisciplineScientifiqueConsultanceScientifiquePonctuelleAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/discipline-scientifique-consultance-scientifique-ponctuelle-admin.component';


import { CommunauteSavoirAdminComponent } from './view/communaute-savoir-admin/communaute-savoir-admin.component';


import { NiveauFormationPostBacAdminComponent } from './view/niveau-formation-post-bac-admin/niveau-formation-post-bac-admin.component';


import { FormationContinuePubliqueProfessionelAdminComponent } from './view/formation-continue-publique-professionel-admin/formation-continue-publique-professionel-admin.component';


import { EnseignementEnjeuxIrdAdminComponent } from './view/enseignement-enjeux-ird-admin/enseignement-enjeux-ird-admin.component';


import { InstrumentIrdComiteEtCommissionEvaluationAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/instrument-ird-comite-et-commission-evaluation-admin.component';


import { DisciplineScientifiqueConseilEtComiteScientifiqueAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/discipline-scientifique-conseil-et-comite-scientifique-admin.component';


import { TemplateRelanceAdminComponent } from './view/template-relance-admin/template-relance-admin.component';


import { EtatEtapeCampagneAdminComponent } from './view/etat-etape-campagne-admin/etat-etape-campagne-admin.component';


import { ProjetActiviteRechercheDetailAdminComponent } from './view/projet-activite-recherche-detail-admin/projet-activite-recherche-detail-admin.component';


import { TypeSavoirAdminComponent } from './view/type-savoir-admin/type-savoir-admin.component';


import { ExpertiseAdminComponent } from './view/expertise-admin/expertise-admin.component';


import { TypePubliqueAdminComponent } from './view/type-publique-admin/type-publique-admin.component';


import { CampagneChercheurOuvertureAdminComponent } from './view/campagne-chercheur-ouverture-admin/campagne-chercheur-ouverture-admin.component';


import { ModeDiffusionAdminComponent } from './view/mode-diffusion-admin/mode-diffusion-admin.component';


import { EnjeuxIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/enjeux-ird-consultance-scientifique-ponctuelle-admin.component';


import { EtablissementComiteEtCommissionEvaluationAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/etablissement-comite-et-commission-evaluation-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin.component';


import { CorpsAdminComponent } from './view/corps-admin/corps-admin.component';


import { ZoneGeographiqueAdminComponent } from './view/zone-geographique-admin/zone-geographique-admin.component';


import { InstrumentIrdAdminComponent } from './view/instrument-ird-admin/instrument-ird-admin.component';


import { ResponsabilitePedagogiqueEnjeuxIrdAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/responsabilite-pedagogique-enjeux-ird-admin.component';


import { FaqAdminComponent } from './view/faq-admin/faq-admin.component';


import { ExpertiseScientifiqueAdminComponent } from './view/expertise-scientifique-admin/expertise-scientifique-admin.component';


import { NatureEtudeAdminComponent } from './view/nature-etude-admin/nature-etude-admin.component';


import { EtablissementEnseignementAdminComponent } from './view/etablissement-enseignement-admin/etablissement-enseignement-admin.component';


import { OutilPedagogiquePaysConceptionAdminComponent } from './view/outil-pedagogique-pays-conception-admin/outil-pedagogique-pays-conception-admin.component';


import { InstitutionAdminComponent } from './view/institution-admin/institution-admin.component';


import { CampagneChercheurFermetureAdminComponent } from './view/campagne-chercheur-fermeture-admin/campagne-chercheur-fermeture-admin.component';


import { EncadrementDoctorantAdminComponent } from './view/encadrement-doctorant-admin/encadrement-doctorant-admin.component';


import { CommunauteSavoirConseilEtComiteScientifiqueAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/communaute-savoir-conseil-et-comite-scientifique-admin.component';


import { PubliqueFormationAdminComponent } from './view/publique-formation-admin/publique-formation-admin.component';


import { OutilPedagogiqueTypeInstrumentIrdAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/outil-pedagogique-type-instrument-ird-admin.component';


import { FinancementDoctorantAdminComponent } from './view/financement-doctorant-admin/financement-doctorant-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin.component';


import { VilleAdminComponent } from './view/ville-admin/ville-admin.component';


import { RoleComiteEtCommissionEvaluationAdminComponent } from './view/role-comite-et-commission-evaluation-admin/role-comite-et-commission-evaluation-admin.component';


import { ChercheurEmailAdminComponent } from './view/chercheur-email-admin/chercheur-email-admin.component';


import { EntiteAdministrativeAdminComponent } from './view/entite-administrative-admin/entite-administrative-admin.component';


import { EnjeuxIrdChercheurAdminComponent } from './view/enjeux-ird-chercheur-admin/enjeux-ird-chercheur-admin.component';


import { EtablissementAdminComponent } from './view/etablissement-admin/etablissement-admin.component';


import { DisciplineScientifiqueParentAdminComponent } from './view/discipline-scientifique-parent-admin/discipline-scientifique-parent-admin.component';


import { ProjetActiviteRechercheDetailEnjeuxIrdAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/projet-activite-recherche-detail-enjeux-ird-admin.component';


import { TypePubliqueRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/type-publique-rencontre-grand-publique-jeune-publique-admin.component';


import { MasterInternationalAdminComponent } from './view/master-international-admin/master-international-admin.component';


import { EnseignementDisciplineScientifiqueAdminComponent } from './view/enseignement-discipline-scientifique-admin/enseignement-discipline-scientifique-admin.component';


import { CommunauteSavoirChercheurAdminComponent } from './view/communaute-savoir-chercheur-admin/communaute-savoir-chercheur-admin.component';


import { TypeExpertiseEvaluationAdminComponent } from './view/type-expertise-evaluation-admin/type-expertise-evaluation-admin.component';


import { ComiteEtCommissionEvaluationAdminComponent } from './view/comite-et-commission-evaluation-admin/comite-et-commission-evaluation-admin.component';


import { EtudiantAdminComponent } from './view/etudiant-admin/etudiant-admin.component';


import { EvenementColloqueScienntifiqueAdminComponent } from './view/evenement-colloque-scienntifique-admin/evenement-colloque-scienntifique-admin.component';


import { FormationContinueObjetFormationGeneriqueAdminComponent } from './view/formation-continue-objet-formation-generique-admin/formation-continue-objet-formation-generique-admin.component';


import { ModaliteAdminComponent } from './view/modalite-admin/modalite-admin.component';


import { FormationContinueAdminComponent } from './view/formation-continue-admin/formation-continue-admin.component';


import { ProjetActiviteRechercheDetailInstitutionCoContractantAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/projet-activite-recherche-detail-institution-co-contractant-admin.component';


import { ModaliteFormationContinueAdminComponent } from './view/modalite-formation-continue-admin/modalite-formation-continue-admin.component';


import { ConsultanceScientifiquePonctuelleAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/consultance-scientifique-ponctuelle-admin.component';


import { TypeEntiteAdministrativeAdminComponent } from './view/type-entite-administrative-admin/type-entite-administrative-admin.component';


import { TypeUtilisateurAdminComponent } from './view/type-utilisateur-admin/type-utilisateur-admin.component';


import { TypeInstrumentIrdAdminComponent } from './view/type-instrument-ird-admin/type-instrument-ird-admin.component';


import { EtablissementPartenaireAdminComponent } from './view/etablissement-partenaire-admin/etablissement-partenaire-admin.component';


import { ModaliteEtudeAdminComponent } from './view/modalite-etude-admin/modalite-etude-admin.component';


import { ZoneGeographiqueFormationContinueAdminComponent } from './view/zone-geographique-formation-continue-admin/zone-geographique-formation-continue-admin.component';


import { TemplateClotureAdminComponent } from './view/template-cloture-admin/template-cloture-admin.component';


import { ProjetActiviteRechercheDetailInstrumentIrdAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/projet-activite-recherche-detail-instrument-ird-admin.component';


import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/rencontre-grand-publique-jeune-publique-instrument-ird-admin.component';


import { TypeInstrumentIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/type-instrument-ird-consultance-scientifique-ponctuelle-admin.component';


import { NatureActiviteGrandPubliqueAdminComponent } from './view/nature-activite-grand-publique-admin/nature-activite-grand-publique-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiquePaysAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/developpement-de-savoir-et-innovation-scientifique-pays-admin.component';


import { RoleDeveloppementDeSavoirAdminComponent } from './view/role-developpement-de-savoir-admin/role-developpement-de-savoir-admin.component';


import { TypeUtilisateurSavoirConcuAdminComponent } from './view/type-utilisateur-savoir-concu-admin/type-utilisateur-savoir-concu-admin.component';


import { EncadrementEtudiantDisciplineScientifiqueAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/encadrement-etudiant-discipline-scientifique-admin.component';


import { CommunauteSavoirExpertiseScientifiqueAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/communaute-savoir-expertise-scientifique-admin.component';


import { DisciplineScientifiqueComiteEtCommissionEvaluationAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/discipline-scientifique-comite-et-commission-evaluation-admin.component';


import { TypePubliqueCultureScientifiqueAdminComponent } from './view/type-publique-culture-scientifique-admin/type-publique-culture-scientifique-admin.component';


import { StatusCursusAdminComponent } from './view/status-cursus-admin/status-cursus-admin.component';


import { DistinctionEtablissementPaysAdminComponent } from './view/distinction-etablissement-pays-admin/distinction-etablissement-pays-admin.component';


import { InstrumentIrdChercheurAdminComponent } from './view/instrument-ird-chercheur-admin/instrument-ird-chercheur-admin.component';


import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-admin.component';


import { CategorieFaqAdminComponent } from './view/categorie-faq-admin/categorie-faq-admin.component';


import { IdentifiantRechercheAdminComponent } from './view/identifiant-recherche-admin/identifiant-recherche-admin.component';


import { EnseignementEtFormationAdminComponent } from './view/enseignement-et-formation-admin/enseignement-et-formation-admin.component';


import { ModaliteInterventionAdminComponent } from './view/modalite-intervention-admin/modalite-intervention-admin.component';


import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-admin.component';


import { DisciplineScientifiqueExpertiseScientifiqueAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/discipline-scientifique-expertise-scientifique-admin.component';


import { DisciplineScientifiqueErcAdminComponent } from './view/discipline-scientifique-erc-admin/discipline-scientifique-erc-admin.component';


import { TypeInstanceAdminComponent } from './view/type-instance-admin/type-instance-admin.component';


import { NiveauFormationAdminComponent } from './view/niveau-formation-admin/niveau-formation-admin.component';


import { FournisseurAppelProjetRechercheAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/fournisseur-appel-projet-recherche-admin.component';


import { OutilPedagogiqueEnjeuxIrdAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/outil-pedagogique-enjeux-ird-admin.component';


import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin.component';


import { GestionEquipeAdminComponent } from './view/gestion-equipe-admin/gestion-equipe-admin.component';


import { DistinctionAdminComponent } from './view/distinction-admin/distinction-admin.component';


import { CampagneRelanceAdminComponent } from './view/campagne-relance-admin/campagne-relance-admin.component';


import { RencontreMediaEnjeuxIrdAdminComponent } from './view/rencontre-media-enjeux-ird-admin/rencontre-media-enjeux-ird-admin.component';


import { ResponsabilitePedagogiquePaysAdminComponent } from './view/responsabilite-pedagogique-pays-admin/responsabilite-pedagogique-pays-admin.component';


import { TypePubliqueRencontreMediaAdminComponent } from './view/type-publique-rencontre-media-admin/type-publique-rencontre-media-admin.component';


import { FormationContinueEnjeuxIrdAdminComponent } from './view/formation-continue-enjeux-ird-admin/formation-continue-enjeux-ird-admin.component';


import { TypeExpertiseAdminComponent } from './view/type-expertise-admin/type-expertise-admin.component';


import { ZoneGeographiqueConsultanceScientifiquePonctuelleAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/zone-geographique-consultance-scientifique-ponctuelle-admin.component';


import { RencontreMediaPeriodeAdminComponent } from './view/rencontre-media-periode-admin/rencontre-media-periode-admin.component';


import { PaysRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/pays-rencontre-grand-publique-jeune-publique-admin.component';


import { CommunauteSavoirProjetActiviteRechercheAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/communaute-savoir-projet-activite-recherche-admin.component';


import { OutilPedagogiqueLangueAdminComponent } from './view/outil-pedagogique-langue-admin/outil-pedagogique-langue-admin.component';


import { InstrumentIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/instrument-ird-consultance-scientifique-ponctuelle-admin.component';


import { ProjetActiviteRechercheAdminComponent } from './view/projet-activite-recherche-admin/projet-activite-recherche-admin.component';


import { ResponsabilitePedagogiqueEtablissementAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/responsabilite-pedagogique-etablissement-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-admin.component';


import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/objet-formation-generique-de-responsabilite-pedagogique-admin.component';


import { NiveauEtudeAdminComponent } from './view/niveau-etude-admin/niveau-etude-admin.component';


import { RoleEvaluationAdminComponent } from './view/role-evaluation-admin/role-evaluation-admin.component';


import { TypeInstrumentIrdChercheurAdminComponent } from './view/type-instrument-ird-chercheur-admin/type-instrument-ird-chercheur-admin.component';


import { SemanticRelationshipAdminComponent } from './view/semantic-relationship-admin/semantic-relationship-admin.component';


import { DisciplineScientifiqueEncadrementDoctorantAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/discipline-scientifique-encadrement-doctorant-admin.component';


import { PaysRencontreMediaAdminComponent } from './view/pays-rencontre-media-admin/pays-rencontre-media-admin.component';


import { RencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/rencontre-grand-publique-jeune-publique-admin.component';


import { TypeParticipationAdminComponent } from './view/type-participation-admin/type-participation-admin.component';


import { EvenementColloqueScienntifiquePaysAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/evenement-colloque-scienntifique-pays-admin.component';


import { EtatCampagneAdminComponent } from './view/etat-campagne-admin/etat-campagne-admin.component';


import { TypeEtudeAdminComponent } from './view/type-etude-admin/type-etude-admin.component';


import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin.component';


import { StructureOganisatriceAdminComponent } from './view/structure-oganisatrice-admin/structure-oganisatrice-admin.component';


import { DisciplineScientifiqueEncadrementEtudiantAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/discipline-scientifique-encadrement-etudiant-admin.component';


import { FormationContinueCommanditaireAdminComponent } from './view/formation-continue-commanditaire-admin/formation-continue-commanditaire-admin.component';


import { TemplateRappelAdminComponent } from './view/template-rappel-admin/template-rappel-admin.component';


import { AffectationStructurelleAdminComponent } from './view/affectation-structurelle-admin/affectation-structurelle-admin.component';


import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin.component';


import { PaysCommanditaireAdminComponent } from './view/pays-commanditaire-admin/pays-commanditaire-admin.component';


import { FormatRencontreAdminComponent } from './view/format-rencontre-admin/format-rencontre-admin.component';


import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin.component';


import { TypeReclamationAdminComponent } from './view/type-reclamation-admin/type-reclamation-admin.component';


import { FormationContinueDisciplineScientifiqueAdminComponent } from './view/formation-continue-discipline-scientifique-admin/formation-continue-discipline-scientifique-admin.component';


import { EnjeuxIrdEncadrementDoctorantAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/enjeux-ird-encadrement-doctorant-admin.component';


import { EnseignementNatureAdminComponent } from './view/enseignement-nature-admin/enseignement-nature-admin.component';


import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin.component';


import { NiveauEtudeEnseignementAdminComponent } from './view/niveau-etude-enseignement-admin/niveau-etude-enseignement-admin.component';


import { CommissionScientifiqueAdminComponent } from './view/commission-scientifique-admin/commission-scientifique-admin.component';


import { CategorieNotificationAdminComponent } from './view/categorie-notification-admin/categorie-notification-admin.component';


import { ChercheurAdminComponent } from './view/chercheur-admin/chercheur-admin.component';


import { EtablissementConseilsScientifiqueAdminComponent } from './view/etablissement-conseils-scientifique-admin/etablissement-conseils-scientifique-admin.component';


import { CampagneAdminComponent } from './view/campagne-admin/campagne-admin.component';


import { SexeAdminComponent } from './view/sexe-admin/sexe-admin.component';


import { EtatCampagneChercheurAdminComponent } from './view/etat-campagne-chercheur-admin/etat-campagne-chercheur-admin.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {

                            path: 'archivable',
                            loadChildren: './view/archivable/archivable-routing.module#ArchivableRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {

                            path: 'gestion-equipe-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionEquipeDetailAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'langue',
                            children: [
                                {
                                    path: 'list',
                                    component: LangueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-publique-cible',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiquePubliqueCibleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'status-contrat-et-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: StatusContratEtConventionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabilitePedagogiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'conseil-et-comite-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ConseilEtComiteScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-communaute-savoir',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-etude-enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeEtudeEnseignementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'savoir-et-innovation',
                            children: [
                                {
                                    path: 'list',
                                    component: SavoirEtInnovationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement-zone-geographique',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementZoneGeographiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'identifiant-auteur-expert',
                            children: [
                                {
                                    path: 'list',
                                    component: IdentifiantAuteurExpertAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirEncadrementDoctorantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'zone-activite-interaction-recherche',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneActiviteInteractionRechercheAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-conseils-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueConseilsScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'vie-institutionnelle',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-encadrement-etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirEncadrementEtudiantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'conseils-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ConseilsScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'instruments-et-dispositifs-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentsEtDispositifsIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'notification',
                            children: [
                                {
                                    path: 'list',
                                    component: NotificationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'vie-institutionnelle-detail-etablissement',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleDetailEtablissementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-outil-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeOutilPedagogiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-pays-diffusion',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiquePaysDiffusionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-media-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreMediaDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-evenement-colloque-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirEvenementColloqueScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'vie-institutionnelle-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleDetailAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-responsabilite-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauResponsabilitePedagogiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'zone-geographique-conseils-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneGeographiqueConseilsScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-relance-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneRelanceChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'contrat-et-convention-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: ContratEtConventionIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail-pays',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailPaysAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique-periode',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliquePeriodeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysFormationContinueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'vie-institutionnelle-detail-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: VieInstitutionnelleDetailInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'evenement-colloque-scienntifique-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: EvenementColloqueScienntifiqueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'culture-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CultureScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-zone-geographique',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysZoneGeographiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementEtudiantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-expertise-evaluation-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeExpertiseEvaluationComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-media',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreMediaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-etudiant-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementEtudiantEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail-etablissement-lanceur',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailEtablissementLanceurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-rappel',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneRappelAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-evenement-colloque-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueEvenementColloqueScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-rappel-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneRappelChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird-conseils-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdConseilsScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue-publique-professionel',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinuePubliqueProfessionelAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'instrument-ird-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentIrdComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-conseil-et-comite-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueConseilEtComiteScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-etape-campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatEtapeCampagneAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'expertise',
                            children: [
                                {
                                    path: 'list',
                                    component: ExpertiseAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-chercheur-ouverture',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneChercheurOuvertureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-mode-diffusion',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabilitePedagogiqueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'faq',
                            children: [
                                {
                                    path: 'list',
                                    component: FaqAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'expertise-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: ExpertiseScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementEnseignementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-pays-conception',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiquePaysConceptionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-chercheur-fermeture',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneChercheurFermetureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementDoctorantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-conseil-et-comite-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirConseilEtComiteScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-type-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueTypeInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur-email',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurEmailAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-publique-rencontre-grand-publique-jeune-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePubliqueRencontreGrandPubliqueJeunePubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: ComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'evenement-colloque-scienntifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EvenementColloqueScienntifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue-objet-formation-generique',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueObjetFormationGeneriqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail-institution-co-contractant',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailInstitutionCoContractantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: ConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'zone-geographique-formation-continue',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneGeographiqueFormationContinueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche-detail-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheDetailInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliqueInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-instrument-ird-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstrumentIrdConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'nature-activite-grand-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: NatureActiviteGrandPubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-pays',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiquePaysAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'role-developpement-de-savoir',
                            children: [
                                {
                                    path: 'list',
                                    component: RoleDeveloppementDeSavoirAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-utilisateur-savoir-concu',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeUtilisateurSavoirConcuAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'encadrement-etudiant-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EncadrementEtudiantDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-expertise-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirExpertiseScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-comite-et-commission-evaluation',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueComiteEtCommissionEvaluationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'distinction-etablissement-pays',
                            children: [
                                {
                                    path: 'list',
                                    component: DistinctionEtablissementPaysAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'instrument-ird-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentIrdChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement-et-formation',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementEtFormationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-organisateur-rencontre-grand-publique-jeune-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysOrganisateurRencontreGrandPubliqueJeunePubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-expertise-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueExpertiseScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'gestion-equipe',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionEquipeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'distinction',
                            children: [
                                {
                                    path: 'list',
                                    component: DistinctionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne-relance',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneRelanceAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-media-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreMediaEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique-pays',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabilitePedagogiquePaysAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-publique-rencontre-media',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePubliqueRencontreMediaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'zone-geographique-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: ZoneGeographiqueConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-media-periode',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreMediaPeriodeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-rencontre-grand-publique-jeune-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysRencontreGrandPubliqueJeunePubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'communaute-savoir-projet-activite-recherche',
                            children: [
                                {
                                    path: 'list',
                                    component: CommunauteSavoirProjetActiviteRechercheAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'outil-pedagogique-langue',
                            children: [
                                {
                                    path: 'list',
                                    component: OutilPedagogiqueLangueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'instrument-ird-consultance-scientifique-ponctuelle',
                            children: [
                                {
                                    path: 'list',
                                    component: InstrumentIrdConsultanceScientifiquePonctuelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'projet-activite-recherche',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetActiviteRechercheAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'responsabilite-pedagogique-etablissement',
                            children: [
                                {
                                    path: 'list',
                                    component: ResponsabilitePedagogiqueEtablissementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-etablissement',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'objet-formation-generique-de-responsabilite-pedagogique',
                            children: [
                                {
                                    path: 'list',
                                    component: ObjetFormationGeneriqueDeResponsabilitePedagogiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-instrument-ird-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeInstrumentIrdChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueEncadrementDoctorantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-rencontre-media',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysRencontreMediaAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-participation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeParticipationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'evenement-colloque-scienntifique-pays',
                            children: [
                                {
                                    path: 'list',
                                    component: EvenementColloqueScienntifiquePaysAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCampagneAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'developpement-de-savoir-et-innovation-scientifique-enjeux-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'structure-oganisatrice',
                            children: [
                                {
                                    path: 'list',
                                    component: StructureOganisatriceAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'discipline-scientifique-encadrement-etudiant',
                            children: [
                                {
                                    path: 'list',
                                    component: DisciplineScientifiqueEncadrementEtudiantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue-commanditaire',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueCommanditaireAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'affectation-structurelle',
                            children: [
                                {
                                    path: 'list',
                                    component: AffectationStructurelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'caracterisation-developpement-de-savoir-et-innovation-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'pays-commanditaire',
                            children: [
                                {
                                    path: 'list',
                                    component: PaysCommanditaireAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'rencontre-grand-publique-jeune-publique-type-instrument-ird',
                            children: [
                                {
                                    path: 'list',
                                    component: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'formation-continue-discipline-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: FormationContinueDisciplineScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enjeux-ird-encadrement-doctorant',
                            children: [
                                {
                                    path: 'list',
                                    component: EnjeuxIrdEncadrementDoctorantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'enseignement-nature',
                            children: [
                                {
                                    path: 'list',
                                    component: EnseignementNatureAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'type-savoir-developpement-de-savoir-et-innovation-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'niveau-etude-enseignement',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauEtudeEnseignementAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'categorie-notification',
                            children: [
                                {
                                    path: 'list',
                                    component: CategorieNotificationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etablissement-conseils-scientifique',
                            children: [
                                {
                                    path: 'list',
                                    component: EtablissementConseilsScientifiqueAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'campagne',
                            children: [
                                {
                                    path: 'list',
                                    component: CampagneAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'etat-campagne-chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCampagneChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
