import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { LoginChercheurComponent } from './login-chercheur/login-chercheur.component';
import { RegisterChercheurComponent } from './register-chercheur/register-chercheur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { ArchivableChercheurModule } from './view/archivable/archivable.module';


import { GestionEquipeDetailCreateChercheurComponent } from './view/gestion-equipe-detail-chercheur/create-chercheur/gestion-equipe-detail-create-chercheur.component';
import { GestionEquipeDetailEditChercheurComponent } from './view/gestion-equipe-detail-chercheur/edit-chercheur/gestion-equipe-detail-edit-chercheur.component';
import { GestionEquipeDetailViewChercheurComponent } from './view/gestion-equipe-detail-chercheur/view-chercheur/gestion-equipe-detail-view-chercheur.component';
import { GestionEquipeDetailListChercheurComponent } from './view/gestion-equipe-detail-chercheur/list-chercheur/gestion-equipe-detail-list-chercheur.component';
import { GestionEquipeDetailChercheurComponent } from './view/gestion-equipe-detail-chercheur/gestion-equipe-detail-chercheur.component';
import { KeyWordDisciplineScientifiqueErcCreateChercheurComponent } from './view/key-word-discipline-scientifique-erc-chercheur/create-chercheur/key-word-discipline-scientifique-erc-create-chercheur.component';
import { KeyWordDisciplineScientifiqueErcEditChercheurComponent } from './view/key-word-discipline-scientifique-erc-chercheur/edit-chercheur/key-word-discipline-scientifique-erc-edit-chercheur.component';
import { KeyWordDisciplineScientifiqueErcViewChercheurComponent } from './view/key-word-discipline-scientifique-erc-chercheur/view-chercheur/key-word-discipline-scientifique-erc-view-chercheur.component';
import { KeyWordDisciplineScientifiqueErcListChercheurComponent } from './view/key-word-discipline-scientifique-erc-chercheur/list-chercheur/key-word-discipline-scientifique-erc-list-chercheur.component';
import { KeyWordDisciplineScientifiqueErcChercheurComponent } from './view/key-word-discipline-scientifique-erc-chercheur/key-word-discipline-scientifique-erc-chercheur.component';
import { GradeCreateChercheurComponent } from './view/grade-chercheur/create-chercheur/grade-create-chercheur.component';
import { GradeEditChercheurComponent } from './view/grade-chercheur/edit-chercheur/grade-edit-chercheur.component';
import { GradeViewChercheurComponent } from './view/grade-chercheur/view-chercheur/grade-view-chercheur.component';
import { GradeListChercheurComponent } from './view/grade-chercheur/list-chercheur/grade-list-chercheur.component';
import { GradeChercheurComponent } from './view/grade-chercheur/grade-chercheur.component';
import { DoctorantCreateChercheurComponent } from './view/doctorant-chercheur/create-chercheur/doctorant-create-chercheur.component';
import { DoctorantEditChercheurComponent } from './view/doctorant-chercheur/edit-chercheur/doctorant-edit-chercheur.component';
import { DoctorantViewChercheurComponent } from './view/doctorant-chercheur/view-chercheur/doctorant-view-chercheur.component';
import { DoctorantListChercheurComponent } from './view/doctorant-chercheur/list-chercheur/doctorant-list-chercheur.component';
import { DoctorantChercheurComponent } from './view/doctorant-chercheur/doctorant-chercheur.component';
import { ResponsabiliteEncadrementDoctorantCreateChercheurComponent } from './view/responsabilite-encadrement-doctorant-chercheur/create-chercheur/responsabilite-encadrement-doctorant-create-chercheur.component';
import { ResponsabiliteEncadrementDoctorantEditChercheurComponent } from './view/responsabilite-encadrement-doctorant-chercheur/edit-chercheur/responsabilite-encadrement-doctorant-edit-chercheur.component';
import { ResponsabiliteEncadrementDoctorantViewChercheurComponent } from './view/responsabilite-encadrement-doctorant-chercheur/view-chercheur/responsabilite-encadrement-doctorant-view-chercheur.component';
import { ResponsabiliteEncadrementDoctorantListChercheurComponent } from './view/responsabilite-encadrement-doctorant-chercheur/list-chercheur/responsabilite-encadrement-doctorant-list-chercheur.component';
import { ResponsabiliteEncadrementDoctorantChercheurComponent } from './view/responsabilite-encadrement-doctorant-chercheur/responsabilite-encadrement-doctorant-chercheur.component';
import { LangueCreateChercheurComponent } from './view/langue-chercheur/create-chercheur/langue-create-chercheur.component';
import { LangueEditChercheurComponent } from './view/langue-chercheur/edit-chercheur/langue-edit-chercheur.component';
import { LangueViewChercheurComponent } from './view/langue-chercheur/view-chercheur/langue-view-chercheur.component';
import { LangueListChercheurComponent } from './view/langue-chercheur/list-chercheur/langue-list-chercheur.component';
import { LangueChercheurComponent } from './view/langue-chercheur/langue-chercheur.component';
import { OutilPedagogiquePubliqueCibleCreateChercheurComponent } from './view/outil-pedagogique-publique-cible-chercheur/create-chercheur/outil-pedagogique-publique-cible-create-chercheur.component';
import { OutilPedagogiquePubliqueCibleEditChercheurComponent } from './view/outil-pedagogique-publique-cible-chercheur/edit-chercheur/outil-pedagogique-publique-cible-edit-chercheur.component';
import { OutilPedagogiquePubliqueCibleViewChercheurComponent } from './view/outil-pedagogique-publique-cible-chercheur/view-chercheur/outil-pedagogique-publique-cible-view-chercheur.component';
import { OutilPedagogiquePubliqueCibleListChercheurComponent } from './view/outil-pedagogique-publique-cible-chercheur/list-chercheur/outil-pedagogique-publique-cible-list-chercheur.component';
import { OutilPedagogiquePubliqueCibleChercheurComponent } from './view/outil-pedagogique-publique-cible-chercheur/outil-pedagogique-publique-cible-chercheur.component';
import { RoleProjetCreateChercheurComponent } from './view/role-projet-chercheur/create-chercheur/role-projet-create-chercheur.component';
import { RoleProjetEditChercheurComponent } from './view/role-projet-chercheur/edit-chercheur/role-projet-edit-chercheur.component';
import { RoleProjetViewChercheurComponent } from './view/role-projet-chercheur/view-chercheur/role-projet-view-chercheur.component';
import { RoleProjetListChercheurComponent } from './view/role-projet-chercheur/list-chercheur/role-projet-list-chercheur.component';
import { RoleProjetChercheurComponent } from './view/role-projet-chercheur/role-projet-chercheur.component';
import { DisciplineScientifiqueCreateChercheurComponent } from './view/discipline-scientifique-chercheur/create-chercheur/discipline-scientifique-create-chercheur.component';
import { DisciplineScientifiqueEditChercheurComponent } from './view/discipline-scientifique-chercheur/edit-chercheur/discipline-scientifique-edit-chercheur.component';
import { DisciplineScientifiqueViewChercheurComponent } from './view/discipline-scientifique-chercheur/view-chercheur/discipline-scientifique-view-chercheur.component';
import { DisciplineScientifiqueListChercheurComponent } from './view/discipline-scientifique-chercheur/list-chercheur/discipline-scientifique-list-chercheur.component';
import { DisciplineScientifiqueChercheurComponent } from './view/discipline-scientifique-chercheur/discipline-scientifique-chercheur.component';
import { StatusContratEtConventionCreateChercheurComponent } from './view/status-contrat-et-convention-chercheur/create-chercheur/status-contrat-et-convention-create-chercheur.component';
import { StatusContratEtConventionEditChercheurComponent } from './view/status-contrat-et-convention-chercheur/edit-chercheur/status-contrat-et-convention-edit-chercheur.component';
import { StatusContratEtConventionViewChercheurComponent } from './view/status-contrat-et-convention-chercheur/view-chercheur/status-contrat-et-convention-view-chercheur.component';
import { StatusContratEtConventionListChercheurComponent } from './view/status-contrat-et-convention-chercheur/list-chercheur/status-contrat-et-convention-list-chercheur.component';
import { StatusContratEtConventionChercheurComponent } from './view/status-contrat-et-convention-chercheur/status-contrat-et-convention-chercheur.component';
import { DisciplineScientifiqueErcParentCreateChercheurComponent } from './view/discipline-scientifique-erc-parent-chercheur/create-chercheur/discipline-scientifique-erc-parent-create-chercheur.component';
import { DisciplineScientifiqueErcParentEditChercheurComponent } from './view/discipline-scientifique-erc-parent-chercheur/edit-chercheur/discipline-scientifique-erc-parent-edit-chercheur.component';
import { DisciplineScientifiqueErcParentViewChercheurComponent } from './view/discipline-scientifique-erc-parent-chercheur/view-chercheur/discipline-scientifique-erc-parent-view-chercheur.component';
import { DisciplineScientifiqueErcParentListChercheurComponent } from './view/discipline-scientifique-erc-parent-chercheur/list-chercheur/discipline-scientifique-erc-parent-list-chercheur.component';
import { DisciplineScientifiqueErcParentChercheurComponent } from './view/discipline-scientifique-erc-parent-chercheur/discipline-scientifique-erc-parent-chercheur.component';
import { ResponsabiliteDirectionEncadrementEtudiantCreateChercheurComponent } from './view/responsabilite-direction-encadrement-etudiant-chercheur/create-chercheur/responsabilite-direction-encadrement-etudiant-create-chercheur.component';
import { ResponsabiliteDirectionEncadrementEtudiantEditChercheurComponent } from './view/responsabilite-direction-encadrement-etudiant-chercheur/edit-chercheur/responsabilite-direction-encadrement-etudiant-edit-chercheur.component';
import { ResponsabiliteDirectionEncadrementEtudiantViewChercheurComponent } from './view/responsabilite-direction-encadrement-etudiant-chercheur/view-chercheur/responsabilite-direction-encadrement-etudiant-view-chercheur.component';
import { ResponsabiliteDirectionEncadrementEtudiantListChercheurComponent } from './view/responsabilite-direction-encadrement-etudiant-chercheur/list-chercheur/responsabilite-direction-encadrement-etudiant-list-chercheur.component';
import { ResponsabiliteDirectionEncadrementEtudiantChercheurComponent } from './view/responsabilite-direction-encadrement-etudiant-chercheur/responsabilite-direction-encadrement-etudiant-chercheur.component';
import { ResponsabilitePedagogiqueCreateChercheurComponent } from './view/responsabilite-pedagogique-chercheur/create-chercheur/responsabilite-pedagogique-create-chercheur.component';
import { ResponsabilitePedagogiqueEditChercheurComponent } from './view/responsabilite-pedagogique-chercheur/edit-chercheur/responsabilite-pedagogique-edit-chercheur.component';
import { ResponsabilitePedagogiqueViewChercheurComponent } from './view/responsabilite-pedagogique-chercheur/view-chercheur/responsabilite-pedagogique-view-chercheur.component';
import { ResponsabilitePedagogiqueListChercheurComponent } from './view/responsabilite-pedagogique-chercheur/list-chercheur/responsabilite-pedagogique-list-chercheur.component';
import { ResponsabilitePedagogiqueChercheurComponent } from './view/responsabilite-pedagogique-chercheur/responsabilite-pedagogique-chercheur.component';
import { CaracterisationCreateChercheurComponent } from './view/caracterisation-chercheur/create-chercheur/caracterisation-create-chercheur.component';
import { CaracterisationEditChercheurComponent } from './view/caracterisation-chercheur/edit-chercheur/caracterisation-edit-chercheur.component';
import { CaracterisationViewChercheurComponent } from './view/caracterisation-chercheur/view-chercheur/caracterisation-view-chercheur.component';
import { CaracterisationListChercheurComponent } from './view/caracterisation-chercheur/list-chercheur/caracterisation-list-chercheur.component';
import { CaracterisationChercheurComponent } from './view/caracterisation-chercheur/caracterisation-chercheur.component';
import { ConseilEtComiteScientifiqueCreateChercheurComponent } from './view/conseil-et-comite-scientifique-chercheur/create-chercheur/conseil-et-comite-scientifique-create-chercheur.component';
import { ConseilEtComiteScientifiqueEditChercheurComponent } from './view/conseil-et-comite-scientifique-chercheur/edit-chercheur/conseil-et-comite-scientifique-edit-chercheur.component';
import { ConseilEtComiteScientifiqueViewChercheurComponent } from './view/conseil-et-comite-scientifique-chercheur/view-chercheur/conseil-et-comite-scientifique-view-chercheur.component';
import { ConseilEtComiteScientifiqueListChercheurComponent } from './view/conseil-et-comite-scientifique-chercheur/list-chercheur/conseil-et-comite-scientifique-list-chercheur.component';
import { ConseilEtComiteScientifiqueChercheurComponent } from './view/conseil-et-comite-scientifique-chercheur/conseil-et-comite-scientifique-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-chercheur.component';
import { DepartementScientifiqueCreateChercheurComponent } from './view/departement-scientifique-chercheur/create-chercheur/departement-scientifique-create-chercheur.component';
import { DepartementScientifiqueEditChercheurComponent } from './view/departement-scientifique-chercheur/edit-chercheur/departement-scientifique-edit-chercheur.component';
import { DepartementScientifiqueViewChercheurComponent } from './view/departement-scientifique-chercheur/view-chercheur/departement-scientifique-view-chercheur.component';
import { DepartementScientifiqueListChercheurComponent } from './view/departement-scientifique-chercheur/list-chercheur/departement-scientifique-list-chercheur.component';
import { DepartementScientifiqueChercheurComponent } from './view/departement-scientifique-chercheur/departement-scientifique-chercheur.component';
import { TypeEtudeEnseignementCreateChercheurComponent } from './view/type-etude-enseignement-chercheur/create-chercheur/type-etude-enseignement-create-chercheur.component';
import { TypeEtudeEnseignementEditChercheurComponent } from './view/type-etude-enseignement-chercheur/edit-chercheur/type-etude-enseignement-edit-chercheur.component';
import { TypeEtudeEnseignementViewChercheurComponent } from './view/type-etude-enseignement-chercheur/view-chercheur/type-etude-enseignement-view-chercheur.component';
import { TypeEtudeEnseignementListChercheurComponent } from './view/type-etude-enseignement-chercheur/list-chercheur/type-etude-enseignement-list-chercheur.component';
import { TypeEtudeEnseignementChercheurComponent } from './view/type-etude-enseignement-chercheur/type-etude-enseignement-chercheur.component';
import { SavoirEtInnovationCreateChercheurComponent } from './view/savoir-et-innovation-chercheur/create-chercheur/savoir-et-innovation-create-chercheur.component';
import { SavoirEtInnovationEditChercheurComponent } from './view/savoir-et-innovation-chercheur/edit-chercheur/savoir-et-innovation-edit-chercheur.component';
import { SavoirEtInnovationViewChercheurComponent } from './view/savoir-et-innovation-chercheur/view-chercheur/savoir-et-innovation-view-chercheur.component';
import { SavoirEtInnovationListChercheurComponent } from './view/savoir-et-innovation-chercheur/list-chercheur/savoir-et-innovation-list-chercheur.component';
import { SavoirEtInnovationChercheurComponent } from './view/savoir-et-innovation-chercheur/savoir-et-innovation-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-chercheur/developpement-de-savoir-et-innovation-scientifique-chercheur.component';
import { StructureIrdCreateChercheurComponent } from './view/structure-ird-chercheur/create-chercheur/structure-ird-create-chercheur.component';
import { StructureIrdEditChercheurComponent } from './view/structure-ird-chercheur/edit-chercheur/structure-ird-edit-chercheur.component';
import { StructureIrdViewChercheurComponent } from './view/structure-ird-chercheur/view-chercheur/structure-ird-view-chercheur.component';
import { StructureIrdListChercheurComponent } from './view/structure-ird-chercheur/list-chercheur/structure-ird-list-chercheur.component';
import { StructureIrdChercheurComponent } from './view/structure-ird-chercheur/structure-ird-chercheur.component';
import { EnseignementZoneGeographiqueCreateChercheurComponent } from './view/enseignement-zone-geographique-chercheur/create-chercheur/enseignement-zone-geographique-create-chercheur.component';
import { EnseignementZoneGeographiqueEditChercheurComponent } from './view/enseignement-zone-geographique-chercheur/edit-chercheur/enseignement-zone-geographique-edit-chercheur.component';
import { EnseignementZoneGeographiqueViewChercheurComponent } from './view/enseignement-zone-geographique-chercheur/view-chercheur/enseignement-zone-geographique-view-chercheur.component';
import { EnseignementZoneGeographiqueListChercheurComponent } from './view/enseignement-zone-geographique-chercheur/list-chercheur/enseignement-zone-geographique-list-chercheur.component';
import { EnseignementZoneGeographiqueChercheurComponent } from './view/enseignement-zone-geographique-chercheur/enseignement-zone-geographique-chercheur.component';
import { DisciplineScientifiqueErcAssociationCreateChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/create-chercheur/discipline-scientifique-erc-association-create-chercheur.component';
import { DisciplineScientifiqueErcAssociationEditChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/edit-chercheur/discipline-scientifique-erc-association-edit-chercheur.component';
import { DisciplineScientifiqueErcAssociationViewChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/view-chercheur/discipline-scientifique-erc-association-view-chercheur.component';
import { DisciplineScientifiqueErcAssociationListChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/list-chercheur/discipline-scientifique-erc-association-list-chercheur.component';
import { DisciplineScientifiqueErcAssociationChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/discipline-scientifique-erc-association-chercheur.component';
import { IdentifiantAuteurExpertCreateChercheurComponent } from './view/identifiant-auteur-expert-chercheur/create-chercheur/identifiant-auteur-expert-create-chercheur.component';
import { IdentifiantAuteurExpertEditChercheurComponent } from './view/identifiant-auteur-expert-chercheur/edit-chercheur/identifiant-auteur-expert-edit-chercheur.component';
import { IdentifiantAuteurExpertViewChercheurComponent } from './view/identifiant-auteur-expert-chercheur/view-chercheur/identifiant-auteur-expert-view-chercheur.component';
import { IdentifiantAuteurExpertListChercheurComponent } from './view/identifiant-auteur-expert-chercheur/list-chercheur/identifiant-auteur-expert-list-chercheur.component';
import { IdentifiantAuteurExpertChercheurComponent } from './view/identifiant-auteur-expert-chercheur/identifiant-auteur-expert-chercheur.component';
import { CommunauteSavoirEncadrementDoctorantCreateChercheurComponent } from './view/communaute-savoir-encadrement-doctorant-chercheur/create-chercheur/communaute-savoir-encadrement-doctorant-create-chercheur.component';
import { CommunauteSavoirEncadrementDoctorantEditChercheurComponent } from './view/communaute-savoir-encadrement-doctorant-chercheur/edit-chercheur/communaute-savoir-encadrement-doctorant-edit-chercheur.component';
import { CommunauteSavoirEncadrementDoctorantViewChercheurComponent } from './view/communaute-savoir-encadrement-doctorant-chercheur/view-chercheur/communaute-savoir-encadrement-doctorant-view-chercheur.component';
import { CommunauteSavoirEncadrementDoctorantListChercheurComponent } from './view/communaute-savoir-encadrement-doctorant-chercheur/list-chercheur/communaute-savoir-encadrement-doctorant-list-chercheur.component';
import { CommunauteSavoirEncadrementDoctorantChercheurComponent } from './view/communaute-savoir-encadrement-doctorant-chercheur/communaute-savoir-encadrement-doctorant-chercheur.component';
import { ZoneActiviteInteractionRechercheCreateChercheurComponent } from './view/zone-activite-interaction-recherche-chercheur/create-chercheur/zone-activite-interaction-recherche-create-chercheur.component';
import { ZoneActiviteInteractionRechercheEditChercheurComponent } from './view/zone-activite-interaction-recherche-chercheur/edit-chercheur/zone-activite-interaction-recherche-edit-chercheur.component';
import { ZoneActiviteInteractionRechercheViewChercheurComponent } from './view/zone-activite-interaction-recherche-chercheur/view-chercheur/zone-activite-interaction-recherche-view-chercheur.component';
import { ZoneActiviteInteractionRechercheListChercheurComponent } from './view/zone-activite-interaction-recherche-chercheur/list-chercheur/zone-activite-interaction-recherche-list-chercheur.component';
import { ZoneActiviteInteractionRechercheChercheurComponent } from './view/zone-activite-interaction-recherche-chercheur/zone-activite-interaction-recherche-chercheur.component';
import { TypeOutilCreateChercheurComponent } from './view/type-outil-chercheur/create-chercheur/type-outil-create-chercheur.component';
import { TypeOutilEditChercheurComponent } from './view/type-outil-chercheur/edit-chercheur/type-outil-edit-chercheur.component';
import { TypeOutilViewChercheurComponent } from './view/type-outil-chercheur/view-chercheur/type-outil-view-chercheur.component';
import { TypeOutilListChercheurComponent } from './view/type-outil-chercheur/list-chercheur/type-outil-list-chercheur.component';
import { TypeOutilChercheurComponent } from './view/type-outil-chercheur/type-outil-chercheur.component';
import { DisciplineScientifiqueConseilsScientifiqueCreateChercheurComponent } from './view/discipline-scientifique-conseils-scientifique-chercheur/create-chercheur/discipline-scientifique-conseils-scientifique-create-chercheur.component';
import { DisciplineScientifiqueConseilsScientifiqueEditChercheurComponent } from './view/discipline-scientifique-conseils-scientifique-chercheur/edit-chercheur/discipline-scientifique-conseils-scientifique-edit-chercheur.component';
import { DisciplineScientifiqueConseilsScientifiqueViewChercheurComponent } from './view/discipline-scientifique-conseils-scientifique-chercheur/view-chercheur/discipline-scientifique-conseils-scientifique-view-chercheur.component';
import { DisciplineScientifiqueConseilsScientifiqueListChercheurComponent } from './view/discipline-scientifique-conseils-scientifique-chercheur/list-chercheur/discipline-scientifique-conseils-scientifique-list-chercheur.component';
import { DisciplineScientifiqueConseilsScientifiqueChercheurComponent } from './view/discipline-scientifique-conseils-scientifique-chercheur/discipline-scientifique-conseils-scientifique-chercheur.component';
import { VieInstitutionnelleCreateChercheurComponent } from './view/vie-institutionnelle-chercheur/create-chercheur/vie-institutionnelle-create-chercheur.component';
import { VieInstitutionnelleEditChercheurComponent } from './view/vie-institutionnelle-chercheur/edit-chercheur/vie-institutionnelle-edit-chercheur.component';
import { VieInstitutionnelleViewChercheurComponent } from './view/vie-institutionnelle-chercheur/view-chercheur/vie-institutionnelle-view-chercheur.component';
import { VieInstitutionnelleListChercheurComponent } from './view/vie-institutionnelle-chercheur/list-chercheur/vie-institutionnelle-list-chercheur.component';
import { VieInstitutionnelleChercheurComponent } from './view/vie-institutionnelle-chercheur/vie-institutionnelle-chercheur.component';
import { CommunauteSavoirEncadrementEtudiantCreateChercheurComponent } from './view/communaute-savoir-encadrement-etudiant-chercheur/create-chercheur/communaute-savoir-encadrement-etudiant-create-chercheur.component';
import { CommunauteSavoirEncadrementEtudiantEditChercheurComponent } from './view/communaute-savoir-encadrement-etudiant-chercheur/edit-chercheur/communaute-savoir-encadrement-etudiant-edit-chercheur.component';
import { CommunauteSavoirEncadrementEtudiantViewChercheurComponent } from './view/communaute-savoir-encadrement-etudiant-chercheur/view-chercheur/communaute-savoir-encadrement-etudiant-view-chercheur.component';
import { CommunauteSavoirEncadrementEtudiantListChercheurComponent } from './view/communaute-savoir-encadrement-etudiant-chercheur/list-chercheur/communaute-savoir-encadrement-etudiant-list-chercheur.component';
import { CommunauteSavoirEncadrementEtudiantChercheurComponent } from './view/communaute-savoir-encadrement-etudiant-chercheur/communaute-savoir-encadrement-etudiant-chercheur.component';
import { ConseilsScientifiqueCreateChercheurComponent } from './view/conseils-scientifique-chercheur/create-chercheur/conseils-scientifique-create-chercheur.component';
import { ConseilsScientifiqueEditChercheurComponent } from './view/conseils-scientifique-chercheur/edit-chercheur/conseils-scientifique-edit-chercheur.component';
import { ConseilsScientifiqueViewChercheurComponent } from './view/conseils-scientifique-chercheur/view-chercheur/conseils-scientifique-view-chercheur.component';
import { ConseilsScientifiqueListChercheurComponent } from './view/conseils-scientifique-chercheur/list-chercheur/conseils-scientifique-list-chercheur.component';
import { ConseilsScientifiqueChercheurComponent } from './view/conseils-scientifique-chercheur/conseils-scientifique-chercheur.component';
import { InstrumentsEtDispositifsIrdCreateChercheurComponent } from './view/instruments-et-dispositifs-ird-chercheur/create-chercheur/instruments-et-dispositifs-ird-create-chercheur.component';
import { InstrumentsEtDispositifsIrdEditChercheurComponent } from './view/instruments-et-dispositifs-ird-chercheur/edit-chercheur/instruments-et-dispositifs-ird-edit-chercheur.component';
import { InstrumentsEtDispositifsIrdViewChercheurComponent } from './view/instruments-et-dispositifs-ird-chercheur/view-chercheur/instruments-et-dispositifs-ird-view-chercheur.component';
import { InstrumentsEtDispositifsIrdListChercheurComponent } from './view/instruments-et-dispositifs-ird-chercheur/list-chercheur/instruments-et-dispositifs-ird-list-chercheur.component';
import { InstrumentsEtDispositifsIrdChercheurComponent } from './view/instruments-et-dispositifs-ird-chercheur/instruments-et-dispositifs-ird-chercheur.component';
import { EtatReclamationCreateChercheurComponent } from './view/etat-reclamation-chercheur/create-chercheur/etat-reclamation-create-chercheur.component';
import { EtatReclamationEditChercheurComponent } from './view/etat-reclamation-chercheur/edit-chercheur/etat-reclamation-edit-chercheur.component';
import { EtatReclamationViewChercheurComponent } from './view/etat-reclamation-chercheur/view-chercheur/etat-reclamation-view-chercheur.component';
import { EtatReclamationListChercheurComponent } from './view/etat-reclamation-chercheur/list-chercheur/etat-reclamation-list-chercheur.component';
import { EtatReclamationChercheurComponent } from './view/etat-reclamation-chercheur/etat-reclamation-chercheur.component';
import { TemplateOuvertureCreateChercheurComponent } from './view/template-ouverture-chercheur/create-chercheur/template-ouverture-create-chercheur.component';
import { TemplateOuvertureEditChercheurComponent } from './view/template-ouverture-chercheur/edit-chercheur/template-ouverture-edit-chercheur.component';
import { TemplateOuvertureViewChercheurComponent } from './view/template-ouverture-chercheur/view-chercheur/template-ouverture-view-chercheur.component';
import { TemplateOuvertureListChercheurComponent } from './view/template-ouverture-chercheur/list-chercheur/template-ouverture-list-chercheur.component';
import { TemplateOuvertureChercheurComponent } from './view/template-ouverture-chercheur/template-ouverture-chercheur.component';
import { NotificationCreateChercheurComponent } from './view/notification-chercheur/create-chercheur/notification-create-chercheur.component';
import { NotificationEditChercheurComponent } from './view/notification-chercheur/edit-chercheur/notification-edit-chercheur.component';
import { NotificationViewChercheurComponent } from './view/notification-chercheur/view-chercheur/notification-view-chercheur.component';
import { NotificationListChercheurComponent } from './view/notification-chercheur/list-chercheur/notification-list-chercheur.component';
import { NotificationChercheurComponent } from './view/notification-chercheur/notification-chercheur.component';
import { VieInstitutionnelleDetailEtablissementCreateChercheurComponent } from './view/vie-institutionnelle-detail-etablissement-chercheur/create-chercheur/vie-institutionnelle-detail-etablissement-create-chercheur.component';
import { VieInstitutionnelleDetailEtablissementEditChercheurComponent } from './view/vie-institutionnelle-detail-etablissement-chercheur/edit-chercheur/vie-institutionnelle-detail-etablissement-edit-chercheur.component';
import { VieInstitutionnelleDetailEtablissementViewChercheurComponent } from './view/vie-institutionnelle-detail-etablissement-chercheur/view-chercheur/vie-institutionnelle-detail-etablissement-view-chercheur.component';
import { VieInstitutionnelleDetailEtablissementListChercheurComponent } from './view/vie-institutionnelle-detail-etablissement-chercheur/list-chercheur/vie-institutionnelle-detail-etablissement-list-chercheur.component';
import { VieInstitutionnelleDetailEtablissementChercheurComponent } from './view/vie-institutionnelle-detail-etablissement-chercheur/vie-institutionnelle-detail-etablissement-chercheur.component';
import { OutilPedagogiqueInstrumentIrdCreateChercheurComponent } from './view/outil-pedagogique-instrument-ird-chercheur/create-chercheur/outil-pedagogique-instrument-ird-create-chercheur.component';
import { OutilPedagogiqueInstrumentIrdEditChercheurComponent } from './view/outil-pedagogique-instrument-ird-chercheur/edit-chercheur/outil-pedagogique-instrument-ird-edit-chercheur.component';
import { OutilPedagogiqueInstrumentIrdViewChercheurComponent } from './view/outil-pedagogique-instrument-ird-chercheur/view-chercheur/outil-pedagogique-instrument-ird-view-chercheur.component';
import { OutilPedagogiqueInstrumentIrdListChercheurComponent } from './view/outil-pedagogique-instrument-ird-chercheur/list-chercheur/outil-pedagogique-instrument-ird-list-chercheur.component';
import { OutilPedagogiqueInstrumentIrdChercheurComponent } from './view/outil-pedagogique-instrument-ird-chercheur/outil-pedagogique-instrument-ird-chercheur.component';
import { OutilPedagogiqueCreateChercheurComponent } from './view/outil-pedagogique-chercheur/create-chercheur/outil-pedagogique-create-chercheur.component';
import { OutilPedagogiqueEditChercheurComponent } from './view/outil-pedagogique-chercheur/edit-chercheur/outil-pedagogique-edit-chercheur.component';
import { OutilPedagogiqueViewChercheurComponent } from './view/outil-pedagogique-chercheur/view-chercheur/outil-pedagogique-view-chercheur.component';
import { OutilPedagogiqueListChercheurComponent } from './view/outil-pedagogique-chercheur/list-chercheur/outil-pedagogique-list-chercheur.component';
import { OutilPedagogiqueChercheurComponent } from './view/outil-pedagogique-chercheur/outil-pedagogique-chercheur.component';
import { TypeOutilPedagogiqueCreateChercheurComponent } from './view/type-outil-pedagogique-chercheur/create-chercheur/type-outil-pedagogique-create-chercheur.component';
import { TypeOutilPedagogiqueEditChercheurComponent } from './view/type-outil-pedagogique-chercheur/edit-chercheur/type-outil-pedagogique-edit-chercheur.component';
import { TypeOutilPedagogiqueViewChercheurComponent } from './view/type-outil-pedagogique-chercheur/view-chercheur/type-outil-pedagogique-view-chercheur.component';
import { TypeOutilPedagogiqueListChercheurComponent } from './view/type-outil-pedagogique-chercheur/list-chercheur/type-outil-pedagogique-list-chercheur.component';
import { TypeOutilPedagogiqueChercheurComponent } from './view/type-outil-pedagogique-chercheur/type-outil-pedagogique-chercheur.component';
import { NatureExpertiseCreateChercheurComponent } from './view/nature-expertise-chercheur/create-chercheur/nature-expertise-create-chercheur.component';
import { NatureExpertiseEditChercheurComponent } from './view/nature-expertise-chercheur/edit-chercheur/nature-expertise-edit-chercheur.component';
import { NatureExpertiseViewChercheurComponent } from './view/nature-expertise-chercheur/view-chercheur/nature-expertise-view-chercheur.component';
import { NatureExpertiseListChercheurComponent } from './view/nature-expertise-chercheur/list-chercheur/nature-expertise-list-chercheur.component';
import { NatureExpertiseChercheurComponent } from './view/nature-expertise-chercheur/nature-expertise-chercheur.component';
import { ObjetFormationGeneriqueCreateChercheurComponent } from './view/objet-formation-generique-chercheur/create-chercheur/objet-formation-generique-create-chercheur.component';
import { ObjetFormationGeneriqueEditChercheurComponent } from './view/objet-formation-generique-chercheur/edit-chercheur/objet-formation-generique-edit-chercheur.component';
import { ObjetFormationGeneriqueViewChercheurComponent } from './view/objet-formation-generique-chercheur/view-chercheur/objet-formation-generique-view-chercheur.component';
import { ObjetFormationGeneriqueListChercheurComponent } from './view/objet-formation-generique-chercheur/list-chercheur/objet-formation-generique-list-chercheur.component';
import { ObjetFormationGeneriqueChercheurComponent } from './view/objet-formation-generique-chercheur/objet-formation-generique-chercheur.component';
import { DisciplineScientifiqueChercheurCreateChercheurComponent } from './view/discipline-scientifique-chercheur-chercheur/create-chercheur/discipline-scientifique-chercheur-create-chercheur.component';
import { DisciplineScientifiqueChercheurEditChercheurComponent } from './view/discipline-scientifique-chercheur-chercheur/edit-chercheur/discipline-scientifique-chercheur-edit-chercheur.component';
import { DisciplineScientifiqueChercheurViewChercheurComponent } from './view/discipline-scientifique-chercheur-chercheur/view-chercheur/discipline-scientifique-chercheur-view-chercheur.component';
import { DisciplineScientifiqueChercheurListChercheurComponent } from './view/discipline-scientifique-chercheur-chercheur/list-chercheur/discipline-scientifique-chercheur-list-chercheur.component';
import { DisciplineScientifiqueChercheurChercheurComponent } from './view/discipline-scientifique-chercheur-chercheur/discipline-scientifique-chercheur-chercheur.component';
import { OutilPedagogiquePaysDiffusionCreateChercheurComponent } from './view/outil-pedagogique-pays-diffusion-chercheur/create-chercheur/outil-pedagogique-pays-diffusion-create-chercheur.component';
import { OutilPedagogiquePaysDiffusionEditChercheurComponent } from './view/outil-pedagogique-pays-diffusion-chercheur/edit-chercheur/outil-pedagogique-pays-diffusion-edit-chercheur.component';
import { OutilPedagogiquePaysDiffusionViewChercheurComponent } from './view/outil-pedagogique-pays-diffusion-chercheur/view-chercheur/outil-pedagogique-pays-diffusion-view-chercheur.component';
import { OutilPedagogiquePaysDiffusionListChercheurComponent } from './view/outil-pedagogique-pays-diffusion-chercheur/list-chercheur/outil-pedagogique-pays-diffusion-list-chercheur.component';
import { OutilPedagogiquePaysDiffusionChercheurComponent } from './view/outil-pedagogique-pays-diffusion-chercheur/outil-pedagogique-pays-diffusion-chercheur.component';
import { RencontreMediaDisciplineScientifiqueCreateChercheurComponent } from './view/rencontre-media-discipline-scientifique-chercheur/create-chercheur/rencontre-media-discipline-scientifique-create-chercheur.component';
import { RencontreMediaDisciplineScientifiqueEditChercheurComponent } from './view/rencontre-media-discipline-scientifique-chercheur/edit-chercheur/rencontre-media-discipline-scientifique-edit-chercheur.component';
import { RencontreMediaDisciplineScientifiqueViewChercheurComponent } from './view/rencontre-media-discipline-scientifique-chercheur/view-chercheur/rencontre-media-discipline-scientifique-view-chercheur.component';
import { RencontreMediaDisciplineScientifiqueListChercheurComponent } from './view/rencontre-media-discipline-scientifique-chercheur/list-chercheur/rencontre-media-discipline-scientifique-list-chercheur.component';
import { RencontreMediaDisciplineScientifiqueChercheurComponent } from './view/rencontre-media-discipline-scientifique-chercheur/rencontre-media-discipline-scientifique-chercheur.component';
import { CommunauteSavoirEvenementColloqueScientifiqueCreateChercheurComponent } from './view/communaute-savoir-evenement-colloque-scientifique-chercheur/create-chercheur/communaute-savoir-evenement-colloque-scientifique-create-chercheur.component';
import { CommunauteSavoirEvenementColloqueScientifiqueEditChercheurComponent } from './view/communaute-savoir-evenement-colloque-scientifique-chercheur/edit-chercheur/communaute-savoir-evenement-colloque-scientifique-edit-chercheur.component';
import { CommunauteSavoirEvenementColloqueScientifiqueViewChercheurComponent } from './view/communaute-savoir-evenement-colloque-scientifique-chercheur/view-chercheur/communaute-savoir-evenement-colloque-scientifique-view-chercheur.component';
import { CommunauteSavoirEvenementColloqueScientifiqueListChercheurComponent } from './view/communaute-savoir-evenement-colloque-scientifique-chercheur/list-chercheur/communaute-savoir-evenement-colloque-scientifique-list-chercheur.component';
import { CommunauteSavoirEvenementColloqueScientifiqueChercheurComponent } from './view/communaute-savoir-evenement-colloque-scientifique-chercheur/communaute-savoir-evenement-colloque-scientifique-chercheur.component';
import { PubliqueCibleCreateChercheurComponent } from './view/publique-cible-chercheur/create-chercheur/publique-cible-create-chercheur.component';
import { PubliqueCibleEditChercheurComponent } from './view/publique-cible-chercheur/edit-chercheur/publique-cible-edit-chercheur.component';
import { PubliqueCibleViewChercheurComponent } from './view/publique-cible-chercheur/view-chercheur/publique-cible-view-chercheur.component';
import { PubliqueCibleListChercheurComponent } from './view/publique-cible-chercheur/list-chercheur/publique-cible-list-chercheur.component';
import { PubliqueCibleChercheurComponent } from './view/publique-cible-chercheur/publique-cible-chercheur.component';
import { VieInstitutionnelleDetailCreateChercheurComponent } from './view/vie-institutionnelle-detail-chercheur/create-chercheur/vie-institutionnelle-detail-create-chercheur.component';
import { VieInstitutionnelleDetailEditChercheurComponent } from './view/vie-institutionnelle-detail-chercheur/edit-chercheur/vie-institutionnelle-detail-edit-chercheur.component';
import { VieInstitutionnelleDetailViewChercheurComponent } from './view/vie-institutionnelle-detail-chercheur/view-chercheur/vie-institutionnelle-detail-view-chercheur.component';
import { VieInstitutionnelleDetailListChercheurComponent } from './view/vie-institutionnelle-detail-chercheur/list-chercheur/vie-institutionnelle-detail-list-chercheur.component';
import { VieInstitutionnelleDetailChercheurComponent } from './view/vie-institutionnelle-detail-chercheur/vie-institutionnelle-detail-chercheur.component';
import { EtablissementProjetCreateChercheurComponent } from './view/etablissement-projet-chercheur/create-chercheur/etablissement-projet-create-chercheur.component';
import { EtablissementProjetEditChercheurComponent } from './view/etablissement-projet-chercheur/edit-chercheur/etablissement-projet-edit-chercheur.component';
import { EtablissementProjetViewChercheurComponent } from './view/etablissement-projet-chercheur/view-chercheur/etablissement-projet-view-chercheur.component';
import { EtablissementProjetListChercheurComponent } from './view/etablissement-projet-chercheur/list-chercheur/etablissement-projet-list-chercheur.component';
import { EtablissementProjetChercheurComponent } from './view/etablissement-projet-chercheur/etablissement-projet-chercheur.component';
import { StatusProjetCreateChercheurComponent } from './view/status-projet-chercheur/create-chercheur/status-projet-create-chercheur.component';
import { StatusProjetEditChercheurComponent } from './view/status-projet-chercheur/edit-chercheur/status-projet-edit-chercheur.component';
import { StatusProjetViewChercheurComponent } from './view/status-projet-chercheur/view-chercheur/status-projet-view-chercheur.component';
import { StatusProjetListChercheurComponent } from './view/status-projet-chercheur/list-chercheur/status-projet-list-chercheur.component';
import { StatusProjetChercheurComponent } from './view/status-projet-chercheur/status-projet-chercheur.component';
import { NiveauResponsabilitePedagogiqueCreateChercheurComponent } from './view/niveau-responsabilite-pedagogique-chercheur/create-chercheur/niveau-responsabilite-pedagogique-create-chercheur.component';
import { NiveauResponsabilitePedagogiqueEditChercheurComponent } from './view/niveau-responsabilite-pedagogique-chercheur/edit-chercheur/niveau-responsabilite-pedagogique-edit-chercheur.component';
import { NiveauResponsabilitePedagogiqueViewChercheurComponent } from './view/niveau-responsabilite-pedagogique-chercheur/view-chercheur/niveau-responsabilite-pedagogique-view-chercheur.component';
import { NiveauResponsabilitePedagogiqueListChercheurComponent } from './view/niveau-responsabilite-pedagogique-chercheur/list-chercheur/niveau-responsabilite-pedagogique-list-chercheur.component';
import { NiveauResponsabilitePedagogiqueChercheurComponent } from './view/niveau-responsabilite-pedagogique-chercheur/niveau-responsabilite-pedagogique-chercheur.component';
import { ZoneGeographiqueConseilsScientifiqueCreateChercheurComponent } from './view/zone-geographique-conseils-scientifique-chercheur/create-chercheur/zone-geographique-conseils-scientifique-create-chercheur.component';
import { ZoneGeographiqueConseilsScientifiqueEditChercheurComponent } from './view/zone-geographique-conseils-scientifique-chercheur/edit-chercheur/zone-geographique-conseils-scientifique-edit-chercheur.component';
import { ZoneGeographiqueConseilsScientifiqueViewChercheurComponent } from './view/zone-geographique-conseils-scientifique-chercheur/view-chercheur/zone-geographique-conseils-scientifique-view-chercheur.component';
import { ZoneGeographiqueConseilsScientifiqueListChercheurComponent } from './view/zone-geographique-conseils-scientifique-chercheur/list-chercheur/zone-geographique-conseils-scientifique-list-chercheur.component';
import { ZoneGeographiqueConseilsScientifiqueChercheurComponent } from './view/zone-geographique-conseils-scientifique-chercheur/zone-geographique-conseils-scientifique-chercheur.component';
import { EtablissementConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/etablissement-consultance-scientifique-ponctuelle-chercheur/create-chercheur/etablissement-consultance-scientifique-ponctuelle-create-chercheur.component';
import { EtablissementConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/etablissement-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/etablissement-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { EtablissementConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/etablissement-consultance-scientifique-ponctuelle-chercheur/view-chercheur/etablissement-consultance-scientifique-ponctuelle-view-chercheur.component';
import { EtablissementConsultanceScientifiquePonctuelleListChercheurComponent } from './view/etablissement-consultance-scientifique-ponctuelle-chercheur/list-chercheur/etablissement-consultance-scientifique-ponctuelle-list-chercheur.component';
import { EtablissementConsultanceScientifiquePonctuelleChercheurComponent } from './view/etablissement-consultance-scientifique-ponctuelle-chercheur/etablissement-consultance-scientifique-ponctuelle-chercheur.component';
import { PubliqueProfessionelCreateChercheurComponent } from './view/publique-professionel-chercheur/create-chercheur/publique-professionel-create-chercheur.component';
import { PubliqueProfessionelEditChercheurComponent } from './view/publique-professionel-chercheur/edit-chercheur/publique-professionel-edit-chercheur.component';
import { PubliqueProfessionelViewChercheurComponent } from './view/publique-professionel-chercheur/view-chercheur/publique-professionel-view-chercheur.component';
import { PubliqueProfessionelListChercheurComponent } from './view/publique-professionel-chercheur/list-chercheur/publique-professionel-list-chercheur.component';
import { PubliqueProfessionelChercheurComponent } from './view/publique-professionel-chercheur/publique-professionel-chercheur.component';
import { CampagneRelanceChercheurCreateChercheurComponent } from './view/campagne-relance-chercheur-chercheur/create-chercheur/campagne-relance-chercheur-create-chercheur.component';
import { CampagneRelanceChercheurEditChercheurComponent } from './view/campagne-relance-chercheur-chercheur/edit-chercheur/campagne-relance-chercheur-edit-chercheur.component';
import { CampagneRelanceChercheurViewChercheurComponent } from './view/campagne-relance-chercheur-chercheur/view-chercheur/campagne-relance-chercheur-view-chercheur.component';
import { CampagneRelanceChercheurListChercheurComponent } from './view/campagne-relance-chercheur-chercheur/list-chercheur/campagne-relance-chercheur-list-chercheur.component';
import { CampagneRelanceChercheurChercheurComponent } from './view/campagne-relance-chercheur-chercheur/campagne-relance-chercheur-chercheur.component';
import { TypeEnseignementCreateChercheurComponent } from './view/type-enseignement-chercheur/create-chercheur/type-enseignement-create-chercheur.component';
import { TypeEnseignementEditChercheurComponent } from './view/type-enseignement-chercheur/edit-chercheur/type-enseignement-edit-chercheur.component';
import { TypeEnseignementViewChercheurComponent } from './view/type-enseignement-chercheur/view-chercheur/type-enseignement-view-chercheur.component';
import { TypeEnseignementListChercheurComponent } from './view/type-enseignement-chercheur/list-chercheur/type-enseignement-list-chercheur.component';
import { TypeEnseignementChercheurComponent } from './view/type-enseignement-chercheur/type-enseignement-chercheur.component';
import { ContratEtConventionIrdCreateChercheurComponent } from './view/contrat-et-convention-ird-chercheur/create-chercheur/contrat-et-convention-ird-create-chercheur.component';
import { ContratEtConventionIrdEditChercheurComponent } from './view/contrat-et-convention-ird-chercheur/edit-chercheur/contrat-et-convention-ird-edit-chercheur.component';
import { ContratEtConventionIrdViewChercheurComponent } from './view/contrat-et-convention-ird-chercheur/view-chercheur/contrat-et-convention-ird-view-chercheur.component';
import { ContratEtConventionIrdListChercheurComponent } from './view/contrat-et-convention-ird-chercheur/list-chercheur/contrat-et-convention-ird-list-chercheur.component';
import { ContratEtConventionIrdChercheurComponent } from './view/contrat-et-convention-ird-chercheur/contrat-et-convention-ird-chercheur.component';
import { ProjetActiviteRechercheDetailPaysCreateChercheurComponent } from './view/projet-activite-recherche-detail-pays-chercheur/create-chercheur/projet-activite-recherche-detail-pays-create-chercheur.component';
import { ProjetActiviteRechercheDetailPaysEditChercheurComponent } from './view/projet-activite-recherche-detail-pays-chercheur/edit-chercheur/projet-activite-recherche-detail-pays-edit-chercheur.component';
import { ProjetActiviteRechercheDetailPaysViewChercheurComponent } from './view/projet-activite-recherche-detail-pays-chercheur/view-chercheur/projet-activite-recherche-detail-pays-view-chercheur.component';
import { ProjetActiviteRechercheDetailPaysListChercheurComponent } from './view/projet-activite-recherche-detail-pays-chercheur/list-chercheur/projet-activite-recherche-detail-pays-list-chercheur.component';
import { ProjetActiviteRechercheDetailPaysChercheurComponent } from './view/projet-activite-recherche-detail-pays-chercheur/projet-activite-recherche-detail-pays-chercheur.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-periode-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-periode-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-periode-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-periode-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-periode-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-periode-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-periode-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-periode-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-periode-chercheur/rencontre-grand-publique-jeune-publique-periode-chercheur.component';
import { PaysFormationContinueCreateChercheurComponent } from './view/pays-formation-continue-chercheur/create-chercheur/pays-formation-continue-create-chercheur.component';
import { PaysFormationContinueEditChercheurComponent } from './view/pays-formation-continue-chercheur/edit-chercheur/pays-formation-continue-edit-chercheur.component';
import { PaysFormationContinueViewChercheurComponent } from './view/pays-formation-continue-chercheur/view-chercheur/pays-formation-continue-view-chercheur.component';
import { PaysFormationContinueListChercheurComponent } from './view/pays-formation-continue-chercheur/list-chercheur/pays-formation-continue-list-chercheur.component';
import { PaysFormationContinueChercheurComponent } from './view/pays-formation-continue-chercheur/pays-formation-continue-chercheur.component';
import { VieInstitutionnelleDetailInstrumentIrdCreateChercheurComponent } from './view/vie-institutionnelle-detail-instrument-ird-chercheur/create-chercheur/vie-institutionnelle-detail-instrument-ird-create-chercheur.component';
import { VieInstitutionnelleDetailInstrumentIrdEditChercheurComponent } from './view/vie-institutionnelle-detail-instrument-ird-chercheur/edit-chercheur/vie-institutionnelle-detail-instrument-ird-edit-chercheur.component';
import { VieInstitutionnelleDetailInstrumentIrdViewChercheurComponent } from './view/vie-institutionnelle-detail-instrument-ird-chercheur/view-chercheur/vie-institutionnelle-detail-instrument-ird-view-chercheur.component';
import { VieInstitutionnelleDetailInstrumentIrdListChercheurComponent } from './view/vie-institutionnelle-detail-instrument-ird-chercheur/list-chercheur/vie-institutionnelle-detail-instrument-ird-list-chercheur.component';
import { VieInstitutionnelleDetailInstrumentIrdChercheurComponent } from './view/vie-institutionnelle-detail-instrument-ird-chercheur/vie-institutionnelle-detail-instrument-ird-chercheur.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdCreateChercheurComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-chercheur/create-chercheur/evenement-colloque-scienntifique-enjeux-ird-create-chercheur.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdEditChercheurComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-chercheur/edit-chercheur/evenement-colloque-scienntifique-enjeux-ird-edit-chercheur.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdViewChercheurComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-chercheur/view-chercheur/evenement-colloque-scienntifique-enjeux-ird-view-chercheur.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdListChercheurComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-chercheur/list-chercheur/evenement-colloque-scienntifique-enjeux-ird-list-chercheur.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdChercheurComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-chercheur/evenement-colloque-scienntifique-enjeux-ird-chercheur.component';
import { NationaliteCreateChercheurComponent } from './view/nationalite-chercheur/create-chercheur/nationalite-create-chercheur.component';
import { NationaliteEditChercheurComponent } from './view/nationalite-chercheur/edit-chercheur/nationalite-edit-chercheur.component';
import { NationaliteViewChercheurComponent } from './view/nationalite-chercheur/view-chercheur/nationalite-view-chercheur.component';
import { NationaliteListChercheurComponent } from './view/nationalite-chercheur/list-chercheur/nationalite-list-chercheur.component';
import { NationaliteChercheurComponent } from './view/nationalite-chercheur/nationalite-chercheur.component';
import { CultureScientifiqueCreateChercheurComponent } from './view/culture-scientifique-chercheur/create-chercheur/culture-scientifique-create-chercheur.component';
import { CultureScientifiqueEditChercheurComponent } from './view/culture-scientifique-chercheur/edit-chercheur/culture-scientifique-edit-chercheur.component';
import { CultureScientifiqueViewChercheurComponent } from './view/culture-scientifique-chercheur/view-chercheur/culture-scientifique-view-chercheur.component';
import { CultureScientifiqueListChercheurComponent } from './view/culture-scientifique-chercheur/list-chercheur/culture-scientifique-list-chercheur.component';
import { CultureScientifiqueChercheurComponent } from './view/culture-scientifique-chercheur/culture-scientifique-chercheur.component';
import { EnseignementCreateChercheurComponent } from './view/enseignement-chercheur/create-chercheur/enseignement-create-chercheur.component';
import { EnseignementEditChercheurComponent } from './view/enseignement-chercheur/edit-chercheur/enseignement-edit-chercheur.component';
import { EnseignementViewChercheurComponent } from './view/enseignement-chercheur/view-chercheur/enseignement-view-chercheur.component';
import { EnseignementListChercheurComponent } from './view/enseignement-chercheur/list-chercheur/enseignement-list-chercheur.component';
import { EnseignementChercheurComponent } from './view/enseignement-chercheur/enseignement-chercheur.component';
import { PaysZoneGeographiqueCreateChercheurComponent } from './view/pays-zone-geographique-chercheur/create-chercheur/pays-zone-geographique-create-chercheur.component';
import { PaysZoneGeographiqueEditChercheurComponent } from './view/pays-zone-geographique-chercheur/edit-chercheur/pays-zone-geographique-edit-chercheur.component';
import { PaysZoneGeographiqueViewChercheurComponent } from './view/pays-zone-geographique-chercheur/view-chercheur/pays-zone-geographique-view-chercheur.component';
import { PaysZoneGeographiqueListChercheurComponent } from './view/pays-zone-geographique-chercheur/list-chercheur/pays-zone-geographique-list-chercheur.component';
import { PaysZoneGeographiqueChercheurComponent } from './view/pays-zone-geographique-chercheur/pays-zone-geographique-chercheur.component';
import { EncadrementEtudiantCreateChercheurComponent } from './view/encadrement-etudiant-chercheur/create-chercheur/encadrement-etudiant-create-chercheur.component';
import { EncadrementEtudiantEditChercheurComponent } from './view/encadrement-etudiant-chercheur/edit-chercheur/encadrement-etudiant-edit-chercheur.component';
import { EncadrementEtudiantViewChercheurComponent } from './view/encadrement-etudiant-chercheur/view-chercheur/encadrement-etudiant-view-chercheur.component';
import { EncadrementEtudiantListChercheurComponent } from './view/encadrement-etudiant-chercheur/list-chercheur/encadrement-etudiant-list-chercheur.component';
import { EncadrementEtudiantChercheurComponent } from './view/encadrement-etudiant-chercheur/encadrement-etudiant-chercheur.component';
import { EnjeuxIrdCreateChercheurComponent } from './view/enjeux-ird-chercheur/create-chercheur/enjeux-ird-create-chercheur.component';
import { EnjeuxIrdEditChercheurComponent } from './view/enjeux-ird-chercheur/edit-chercheur/enjeux-ird-edit-chercheur.component';
import { EnjeuxIrdViewChercheurComponent } from './view/enjeux-ird-chercheur/view-chercheur/enjeux-ird-view-chercheur.component';
import { EnjeuxIrdListChercheurComponent } from './view/enjeux-ird-chercheur/list-chercheur/enjeux-ird-list-chercheur.component';
import { EnjeuxIrdChercheurComponent } from './view/enjeux-ird-chercheur/enjeux-ird-chercheur.component';
import { EnjeuxIrdComiteEtCommissionEvaluationCreateChercheurComponent } from './view/enjeux-ird-comite-et-commission-evaluation-chercheur/create-chercheur/enjeux-ird-comite-et-commission-evaluation-create-chercheur.component';
import { EnjeuxIrdComiteEtCommissionEvaluationEditChercheurComponent } from './view/enjeux-ird-comite-et-commission-evaluation-chercheur/edit-chercheur/enjeux-ird-comite-et-commission-evaluation-edit-chercheur.component';
import { EnjeuxIrdComiteEtCommissionEvaluationViewChercheurComponent } from './view/enjeux-ird-comite-et-commission-evaluation-chercheur/view-chercheur/enjeux-ird-comite-et-commission-evaluation-view-chercheur.component';
import { EnjeuxIrdComiteEtCommissionEvaluationListChercheurComponent } from './view/enjeux-ird-comite-et-commission-evaluation-chercheur/list-chercheur/enjeux-ird-comite-et-commission-evaluation-list-chercheur.component';
import { EnjeuxIrdComiteEtCommissionEvaluationChercheurComponent } from './view/enjeux-ird-comite-et-commission-evaluation-chercheur/enjeux-ird-comite-et-commission-evaluation-chercheur.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateChercheurComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-chercheur/create-chercheur/type-expertise-evaluation-comite-et-commission-evaluation-create-chercheur.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationEditChercheurComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-chercheur/edit-chercheur/type-expertise-evaluation-comite-et-commission-evaluation-edit-chercheur.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationViewChercheurComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-chercheur/view-chercheur/type-expertise-evaluation-comite-et-commission-evaluation-view-chercheur.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationListChercheurComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-chercheur/list-chercheur/type-expertise-evaluation-comite-et-commission-evaluation-list-chercheur.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationChercheurComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-chercheur/type-expertise-evaluation-comite-et-commission-evaluation-chercheur.component';
import { RencontreMediaCreateChercheurComponent } from './view/rencontre-media-chercheur/create-chercheur/rencontre-media-create-chercheur.component';
import { RencontreMediaEditChercheurComponent } from './view/rencontre-media-chercheur/edit-chercheur/rencontre-media-edit-chercheur.component';
import { RencontreMediaViewChercheurComponent } from './view/rencontre-media-chercheur/view-chercheur/rencontre-media-view-chercheur.component';
import { RencontreMediaListChercheurComponent } from './view/rencontre-media-chercheur/list-chercheur/rencontre-media-list-chercheur.component';
import { RencontreMediaChercheurComponent } from './view/rencontre-media-chercheur/rencontre-media-chercheur.component';
import { TypeExpertCreateChercheurComponent } from './view/type-expert-chercheur/create-chercheur/type-expert-create-chercheur.component';
import { TypeExpertEditChercheurComponent } from './view/type-expert-chercheur/edit-chercheur/type-expert-edit-chercheur.component';
import { TypeExpertViewChercheurComponent } from './view/type-expert-chercheur/view-chercheur/type-expert-view-chercheur.component';
import { TypeExpertListChercheurComponent } from './view/type-expert-chercheur/list-chercheur/type-expert-list-chercheur.component';
import { TypeExpertChercheurComponent } from './view/type-expert-chercheur/type-expert-chercheur.component';
import { ReclamationCreateChercheurComponent } from './view/reclamation-chercheur/create-chercheur/reclamation-create-chercheur.component';
import { ReclamationEditChercheurComponent } from './view/reclamation-chercheur/edit-chercheur/reclamation-edit-chercheur.component';
import { ReclamationViewChercheurComponent } from './view/reclamation-chercheur/view-chercheur/reclamation-view-chercheur.component';
import { ReclamationListChercheurComponent } from './view/reclamation-chercheur/list-chercheur/reclamation-list-chercheur.component';
import { ReclamationChercheurComponent } from './view/reclamation-chercheur/reclamation-chercheur.component';
import { EncadrementEtudiantEnjeuxIrdCreateChercheurComponent } from './view/encadrement-etudiant-enjeux-ird-chercheur/create-chercheur/encadrement-etudiant-enjeux-ird-create-chercheur.component';
import { EncadrementEtudiantEnjeuxIrdEditChercheurComponent } from './view/encadrement-etudiant-enjeux-ird-chercheur/edit-chercheur/encadrement-etudiant-enjeux-ird-edit-chercheur.component';
import { EncadrementEtudiantEnjeuxIrdViewChercheurComponent } from './view/encadrement-etudiant-enjeux-ird-chercheur/view-chercheur/encadrement-etudiant-enjeux-ird-view-chercheur.component';
import { EncadrementEtudiantEnjeuxIrdListChercheurComponent } from './view/encadrement-etudiant-enjeux-ird-chercheur/list-chercheur/encadrement-etudiant-enjeux-ird-list-chercheur.component';
import { EncadrementEtudiantEnjeuxIrdChercheurComponent } from './view/encadrement-etudiant-enjeux-ird-chercheur/encadrement-etudiant-enjeux-ird-chercheur.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurCreateChercheurComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-chercheur/create-chercheur/projet-activite-recherche-detail-etablissement-lanceur-create-chercheur.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurEditChercheurComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-chercheur/edit-chercheur/projet-activite-recherche-detail-etablissement-lanceur-edit-chercheur.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurViewChercheurComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-chercheur/view-chercheur/projet-activite-recherche-detail-etablissement-lanceur-view-chercheur.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurListChercheurComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-chercheur/list-chercheur/projet-activite-recherche-detail-etablissement-lanceur-list-chercheur.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurChercheurComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-chercheur/projet-activite-recherche-detail-etablissement-lanceur-chercheur.component';
import { CampagneRappelCreateChercheurComponent } from './view/campagne-rappel-chercheur/create-chercheur/campagne-rappel-create-chercheur.component';
import { CampagneRappelEditChercheurComponent } from './view/campagne-rappel-chercheur/edit-chercheur/campagne-rappel-edit-chercheur.component';
import { CampagneRappelViewChercheurComponent } from './view/campagne-rappel-chercheur/view-chercheur/campagne-rappel-view-chercheur.component';
import { CampagneRappelListChercheurComponent } from './view/campagne-rappel-chercheur/list-chercheur/campagne-rappel-list-chercheur.component';
import { CampagneRappelChercheurComponent } from './view/campagne-rappel-chercheur/campagne-rappel-chercheur.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueCreateChercheurComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-chercheur/create-chercheur/discipline-scientifique-evenement-colloque-scientifique-create-chercheur.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueEditChercheurComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-chercheur/edit-chercheur/discipline-scientifique-evenement-colloque-scientifique-edit-chercheur.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueViewChercheurComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-chercheur/view-chercheur/discipline-scientifique-evenement-colloque-scientifique-view-chercheur.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueListChercheurComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-chercheur/list-chercheur/discipline-scientifique-evenement-colloque-scientifique-list-chercheur.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueChercheurComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-chercheur/discipline-scientifique-evenement-colloque-scientifique-chercheur.component';
import { KeyWordCreateChercheurComponent } from './view/key-word-chercheur/create-chercheur/key-word-create-chercheur.component';
import { KeyWordEditChercheurComponent } from './view/key-word-chercheur/edit-chercheur/key-word-edit-chercheur.component';
import { KeyWordViewChercheurComponent } from './view/key-word-chercheur/view-chercheur/key-word-view-chercheur.component';
import { KeyWordListChercheurComponent } from './view/key-word-chercheur/list-chercheur/key-word-list-chercheur.component';
import { KeyWordChercheurComponent } from './view/key-word-chercheur/key-word-chercheur.component';
import { OutilPedagogiqueDisciplineScientifiqueCreateChercheurComponent } from './view/outil-pedagogique-discipline-scientifique-chercheur/create-chercheur/outil-pedagogique-discipline-scientifique-create-chercheur.component';
import { OutilPedagogiqueDisciplineScientifiqueEditChercheurComponent } from './view/outil-pedagogique-discipline-scientifique-chercheur/edit-chercheur/outil-pedagogique-discipline-scientifique-edit-chercheur.component';
import { OutilPedagogiqueDisciplineScientifiqueViewChercheurComponent } from './view/outil-pedagogique-discipline-scientifique-chercheur/view-chercheur/outil-pedagogique-discipline-scientifique-view-chercheur.component';
import { OutilPedagogiqueDisciplineScientifiqueListChercheurComponent } from './view/outil-pedagogique-discipline-scientifique-chercheur/list-chercheur/outil-pedagogique-discipline-scientifique-list-chercheur.component';
import { OutilPedagogiqueDisciplineScientifiqueChercheurComponent } from './view/outil-pedagogique-discipline-scientifique-chercheur/outil-pedagogique-discipline-scientifique-chercheur.component';
import { PaysCreateChercheurComponent } from './view/pays-chercheur/create-chercheur/pays-create-chercheur.component';
import { PaysEditChercheurComponent } from './view/pays-chercheur/edit-chercheur/pays-edit-chercheur.component';
import { PaysViewChercheurComponent } from './view/pays-chercheur/view-chercheur/pays-view-chercheur.component';
import { PaysListChercheurComponent } from './view/pays-chercheur/list-chercheur/pays-list-chercheur.component';
import { PaysChercheurComponent } from './view/pays-chercheur/pays-chercheur.component';
import { NatureEnseignementCreateChercheurComponent } from './view/nature-enseignement-chercheur/create-chercheur/nature-enseignement-create-chercheur.component';
import { NatureEnseignementEditChercheurComponent } from './view/nature-enseignement-chercheur/edit-chercheur/nature-enseignement-edit-chercheur.component';
import { NatureEnseignementViewChercheurComponent } from './view/nature-enseignement-chercheur/view-chercheur/nature-enseignement-view-chercheur.component';
import { NatureEnseignementListChercheurComponent } from './view/nature-enseignement-chercheur/list-chercheur/nature-enseignement-list-chercheur.component';
import { NatureEnseignementChercheurComponent } from './view/nature-enseignement-chercheur/nature-enseignement-chercheur.component';
import { ContexteCreateChercheurComponent } from './view/contexte-chercheur/create-chercheur/contexte-create-chercheur.component';
import { ContexteEditChercheurComponent } from './view/contexte-chercheur/edit-chercheur/contexte-edit-chercheur.component';
import { ContexteViewChercheurComponent } from './view/contexte-chercheur/view-chercheur/contexte-view-chercheur.component';
import { ContexteListChercheurComponent } from './view/contexte-chercheur/list-chercheur/contexte-list-chercheur.component';
import { ContexteChercheurComponent } from './view/contexte-chercheur/contexte-chercheur.component';
import { CampagneRappelChercheurCreateChercheurComponent } from './view/campagne-rappel-chercheur-chercheur/create-chercheur/campagne-rappel-chercheur-create-chercheur.component';
import { CampagneRappelChercheurEditChercheurComponent } from './view/campagne-rappel-chercheur-chercheur/edit-chercheur/campagne-rappel-chercheur-edit-chercheur.component';
import { CampagneRappelChercheurViewChercheurComponent } from './view/campagne-rappel-chercheur-chercheur/view-chercheur/campagne-rappel-chercheur-view-chercheur.component';
import { CampagneRappelChercheurListChercheurComponent } from './view/campagne-rappel-chercheur-chercheur/list-chercheur/campagne-rappel-chercheur-list-chercheur.component';
import { CampagneRappelChercheurChercheurComponent } from './view/campagne-rappel-chercheur-chercheur/campagne-rappel-chercheur-chercheur.component';
import { EncadrementCreateChercheurComponent } from './view/encadrement-chercheur/create-chercheur/encadrement-create-chercheur.component';
import { EncadrementEditChercheurComponent } from './view/encadrement-chercheur/edit-chercheur/encadrement-edit-chercheur.component';
import { EncadrementViewChercheurComponent } from './view/encadrement-chercheur/view-chercheur/encadrement-view-chercheur.component';
import { EncadrementListChercheurComponent } from './view/encadrement-chercheur/list-chercheur/encadrement-list-chercheur.component';
import { EncadrementChercheurComponent } from './view/encadrement-chercheur/encadrement-chercheur.component';
import { CommanditaireCreateChercheurComponent } from './view/commanditaire-chercheur/create-chercheur/commanditaire-create-chercheur.component';
import { CommanditaireEditChercheurComponent } from './view/commanditaire-chercheur/edit-chercheur/commanditaire-edit-chercheur.component';
import { CommanditaireViewChercheurComponent } from './view/commanditaire-chercheur/view-chercheur/commanditaire-view-chercheur.component';
import { CommanditaireListChercheurComponent } from './view/commanditaire-chercheur/list-chercheur/commanditaire-list-chercheur.component';
import { CommanditaireChercheurComponent } from './view/commanditaire-chercheur/commanditaire-chercheur.component';
import { EnjeuxIrdConseilsScientifiqueCreateChercheurComponent } from './view/enjeux-ird-conseils-scientifique-chercheur/create-chercheur/enjeux-ird-conseils-scientifique-create-chercheur.component';
import { EnjeuxIrdConseilsScientifiqueEditChercheurComponent } from './view/enjeux-ird-conseils-scientifique-chercheur/edit-chercheur/enjeux-ird-conseils-scientifique-edit-chercheur.component';
import { EnjeuxIrdConseilsScientifiqueViewChercheurComponent } from './view/enjeux-ird-conseils-scientifique-chercheur/view-chercheur/enjeux-ird-conseils-scientifique-view-chercheur.component';
import { EnjeuxIrdConseilsScientifiqueListChercheurComponent } from './view/enjeux-ird-conseils-scientifique-chercheur/list-chercheur/enjeux-ird-conseils-scientifique-list-chercheur.component';
import { EnjeuxIrdConseilsScientifiqueChercheurComponent } from './view/enjeux-ird-conseils-scientifique-chercheur/enjeux-ird-conseils-scientifique-chercheur.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur/create-chercheur/discipline-scientifique-consultance-scientifique-ponctuelle-create-chercheur.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/discipline-scientifique-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur/view-chercheur/discipline-scientifique-consultance-scientifique-ponctuelle-view-chercheur.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleListChercheurComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur/list-chercheur/discipline-scientifique-consultance-scientifique-ponctuelle-list-chercheur.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleChercheurComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur/discipline-scientifique-consultance-scientifique-ponctuelle-chercheur.component';
import { CommunauteSavoirCreateChercheurComponent } from './view/communaute-savoir-chercheur/create-chercheur/communaute-savoir-create-chercheur.component';
import { CommunauteSavoirEditChercheurComponent } from './view/communaute-savoir-chercheur/edit-chercheur/communaute-savoir-edit-chercheur.component';
import { CommunauteSavoirViewChercheurComponent } from './view/communaute-savoir-chercheur/view-chercheur/communaute-savoir-view-chercheur.component';
import { CommunauteSavoirListChercheurComponent } from './view/communaute-savoir-chercheur/list-chercheur/communaute-savoir-list-chercheur.component';
import { CommunauteSavoirChercheurComponent } from './view/communaute-savoir-chercheur/communaute-savoir-chercheur.component';
import { NiveauFormationPostBacCreateChercheurComponent } from './view/niveau-formation-post-bac-chercheur/create-chercheur/niveau-formation-post-bac-create-chercheur.component';
import { NiveauFormationPostBacEditChercheurComponent } from './view/niveau-formation-post-bac-chercheur/edit-chercheur/niveau-formation-post-bac-edit-chercheur.component';
import { NiveauFormationPostBacViewChercheurComponent } from './view/niveau-formation-post-bac-chercheur/view-chercheur/niveau-formation-post-bac-view-chercheur.component';
import { NiveauFormationPostBacListChercheurComponent } from './view/niveau-formation-post-bac-chercheur/list-chercheur/niveau-formation-post-bac-list-chercheur.component';
import { NiveauFormationPostBacChercheurComponent } from './view/niveau-formation-post-bac-chercheur/niveau-formation-post-bac-chercheur.component';
import { FormationContinuePubliqueProfessionelCreateChercheurComponent } from './view/formation-continue-publique-professionel-chercheur/create-chercheur/formation-continue-publique-professionel-create-chercheur.component';
import { FormationContinuePubliqueProfessionelEditChercheurComponent } from './view/formation-continue-publique-professionel-chercheur/edit-chercheur/formation-continue-publique-professionel-edit-chercheur.component';
import { FormationContinuePubliqueProfessionelViewChercheurComponent } from './view/formation-continue-publique-professionel-chercheur/view-chercheur/formation-continue-publique-professionel-view-chercheur.component';
import { FormationContinuePubliqueProfessionelListChercheurComponent } from './view/formation-continue-publique-professionel-chercheur/list-chercheur/formation-continue-publique-professionel-list-chercheur.component';
import { FormationContinuePubliqueProfessionelChercheurComponent } from './view/formation-continue-publique-professionel-chercheur/formation-continue-publique-professionel-chercheur.component';
import { EnseignementEnjeuxIrdCreateChercheurComponent } from './view/enseignement-enjeux-ird-chercheur/create-chercheur/enseignement-enjeux-ird-create-chercheur.component';
import { EnseignementEnjeuxIrdEditChercheurComponent } from './view/enseignement-enjeux-ird-chercheur/edit-chercheur/enseignement-enjeux-ird-edit-chercheur.component';
import { EnseignementEnjeuxIrdViewChercheurComponent } from './view/enseignement-enjeux-ird-chercheur/view-chercheur/enseignement-enjeux-ird-view-chercheur.component';
import { EnseignementEnjeuxIrdListChercheurComponent } from './view/enseignement-enjeux-ird-chercheur/list-chercheur/enseignement-enjeux-ird-list-chercheur.component';
import { EnseignementEnjeuxIrdChercheurComponent } from './view/enseignement-enjeux-ird-chercheur/enseignement-enjeux-ird-chercheur.component';
import { InstrumentIrdComiteEtCommissionEvaluationCreateChercheurComponent } from './view/instrument-ird-comite-et-commission-evaluation-chercheur/create-chercheur/instrument-ird-comite-et-commission-evaluation-create-chercheur.component';
import { InstrumentIrdComiteEtCommissionEvaluationEditChercheurComponent } from './view/instrument-ird-comite-et-commission-evaluation-chercheur/edit-chercheur/instrument-ird-comite-et-commission-evaluation-edit-chercheur.component';
import { InstrumentIrdComiteEtCommissionEvaluationViewChercheurComponent } from './view/instrument-ird-comite-et-commission-evaluation-chercheur/view-chercheur/instrument-ird-comite-et-commission-evaluation-view-chercheur.component';
import { InstrumentIrdComiteEtCommissionEvaluationListChercheurComponent } from './view/instrument-ird-comite-et-commission-evaluation-chercheur/list-chercheur/instrument-ird-comite-et-commission-evaluation-list-chercheur.component';
import { InstrumentIrdComiteEtCommissionEvaluationChercheurComponent } from './view/instrument-ird-comite-et-commission-evaluation-chercheur/instrument-ird-comite-et-commission-evaluation-chercheur.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueCreateChercheurComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-chercheur/create-chercheur/discipline-scientifique-conseil-et-comite-scientifique-create-chercheur.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueEditChercheurComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-chercheur/edit-chercheur/discipline-scientifique-conseil-et-comite-scientifique-edit-chercheur.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueViewChercheurComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-chercheur/view-chercheur/discipline-scientifique-conseil-et-comite-scientifique-view-chercheur.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueListChercheurComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-chercheur/list-chercheur/discipline-scientifique-conseil-et-comite-scientifique-list-chercheur.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueChercheurComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-chercheur/discipline-scientifique-conseil-et-comite-scientifique-chercheur.component';
import { TemplateRelanceCreateChercheurComponent } from './view/template-relance-chercheur/create-chercheur/template-relance-create-chercheur.component';
import { TemplateRelanceEditChercheurComponent } from './view/template-relance-chercheur/edit-chercheur/template-relance-edit-chercheur.component';
import { TemplateRelanceViewChercheurComponent } from './view/template-relance-chercheur/view-chercheur/template-relance-view-chercheur.component';
import { TemplateRelanceListChercheurComponent } from './view/template-relance-chercheur/list-chercheur/template-relance-list-chercheur.component';
import { TemplateRelanceChercheurComponent } from './view/template-relance-chercheur/template-relance-chercheur.component';
import { EtatEtapeCampagneCreateChercheurComponent } from './view/etat-etape-campagne-chercheur/create-chercheur/etat-etape-campagne-create-chercheur.component';
import { EtatEtapeCampagneEditChercheurComponent } from './view/etat-etape-campagne-chercheur/edit-chercheur/etat-etape-campagne-edit-chercheur.component';
import { EtatEtapeCampagneViewChercheurComponent } from './view/etat-etape-campagne-chercheur/view-chercheur/etat-etape-campagne-view-chercheur.component';
import { EtatEtapeCampagneListChercheurComponent } from './view/etat-etape-campagne-chercheur/list-chercheur/etat-etape-campagne-list-chercheur.component';
import { EtatEtapeCampagneChercheurComponent } from './view/etat-etape-campagne-chercheur/etat-etape-campagne-chercheur.component';
import { ProjetActiviteRechercheDetailCreateChercheurComponent } from './view/projet-activite-recherche-detail-chercheur/create-chercheur/projet-activite-recherche-detail-create-chercheur.component';
import { ProjetActiviteRechercheDetailEditChercheurComponent } from './view/projet-activite-recherche-detail-chercheur/edit-chercheur/projet-activite-recherche-detail-edit-chercheur.component';
import { ProjetActiviteRechercheDetailViewChercheurComponent } from './view/projet-activite-recherche-detail-chercheur/view-chercheur/projet-activite-recherche-detail-view-chercheur.component';
import { ProjetActiviteRechercheDetailListChercheurComponent } from './view/projet-activite-recherche-detail-chercheur/list-chercheur/projet-activite-recherche-detail-list-chercheur.component';
import { ProjetActiviteRechercheDetailChercheurComponent } from './view/projet-activite-recherche-detail-chercheur/projet-activite-recherche-detail-chercheur.component';
import { TypeSavoirCreateChercheurComponent } from './view/type-savoir-chercheur/create-chercheur/type-savoir-create-chercheur.component';
import { TypeSavoirEditChercheurComponent } from './view/type-savoir-chercheur/edit-chercheur/type-savoir-edit-chercheur.component';
import { TypeSavoirViewChercheurComponent } from './view/type-savoir-chercheur/view-chercheur/type-savoir-view-chercheur.component';
import { TypeSavoirListChercheurComponent } from './view/type-savoir-chercheur/list-chercheur/type-savoir-list-chercheur.component';
import { TypeSavoirChercheurComponent } from './view/type-savoir-chercheur/type-savoir-chercheur.component';
import { ExpertiseCreateChercheurComponent } from './view/expertise-chercheur/create-chercheur/expertise-create-chercheur.component';
import { ExpertiseEditChercheurComponent } from './view/expertise-chercheur/edit-chercheur/expertise-edit-chercheur.component';
import { ExpertiseViewChercheurComponent } from './view/expertise-chercheur/view-chercheur/expertise-view-chercheur.component';
import { ExpertiseListChercheurComponent } from './view/expertise-chercheur/list-chercheur/expertise-list-chercheur.component';
import { ExpertiseChercheurComponent } from './view/expertise-chercheur/expertise-chercheur.component';
import { TypePubliqueCreateChercheurComponent } from './view/type-publique-chercheur/create-chercheur/type-publique-create-chercheur.component';
import { TypePubliqueEditChercheurComponent } from './view/type-publique-chercheur/edit-chercheur/type-publique-edit-chercheur.component';
import { TypePubliqueViewChercheurComponent } from './view/type-publique-chercheur/view-chercheur/type-publique-view-chercheur.component';
import { TypePubliqueListChercheurComponent } from './view/type-publique-chercheur/list-chercheur/type-publique-list-chercheur.component';
import { TypePubliqueChercheurComponent } from './view/type-publique-chercheur/type-publique-chercheur.component';
import { CampagneChercheurOuvertureCreateChercheurComponent } from './view/campagne-chercheur-ouverture-chercheur/create-chercheur/campagne-chercheur-ouverture-create-chercheur.component';
import { CampagneChercheurOuvertureEditChercheurComponent } from './view/campagne-chercheur-ouverture-chercheur/edit-chercheur/campagne-chercheur-ouverture-edit-chercheur.component';
import { CampagneChercheurOuvertureViewChercheurComponent } from './view/campagne-chercheur-ouverture-chercheur/view-chercheur/campagne-chercheur-ouverture-view-chercheur.component';
import { CampagneChercheurOuvertureListChercheurComponent } from './view/campagne-chercheur-ouverture-chercheur/list-chercheur/campagne-chercheur-ouverture-list-chercheur.component';
import { CampagneChercheurOuvertureChercheurComponent } from './view/campagne-chercheur-ouverture-chercheur/campagne-chercheur-ouverture-chercheur.component';
import { ModeDiffusionCreateChercheurComponent } from './view/mode-diffusion-chercheur/create-chercheur/mode-diffusion-create-chercheur.component';
import { ModeDiffusionEditChercheurComponent } from './view/mode-diffusion-chercheur/edit-chercheur/mode-diffusion-edit-chercheur.component';
import { ModeDiffusionViewChercheurComponent } from './view/mode-diffusion-chercheur/view-chercheur/mode-diffusion-view-chercheur.component';
import { ModeDiffusionListChercheurComponent } from './view/mode-diffusion-chercheur/list-chercheur/mode-diffusion-list-chercheur.component';
import { ModeDiffusionChercheurComponent } from './view/mode-diffusion-chercheur/mode-diffusion-chercheur.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-chercheur/create-chercheur/enjeux-ird-consultance-scientifique-ponctuelle-create-chercheur.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/enjeux-ird-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-chercheur/view-chercheur/enjeux-ird-consultance-scientifique-ponctuelle-view-chercheur.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleListChercheurComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-chercheur/list-chercheur/enjeux-ird-consultance-scientifique-ponctuelle-list-chercheur.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleChercheurComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-chercheur/enjeux-ird-consultance-scientifique-ponctuelle-chercheur.component';
import { EtablissementComiteEtCommissionEvaluationCreateChercheurComponent } from './view/etablissement-comite-et-commission-evaluation-chercheur/create-chercheur/etablissement-comite-et-commission-evaluation-create-chercheur.component';
import { EtablissementComiteEtCommissionEvaluationEditChercheurComponent } from './view/etablissement-comite-et-commission-evaluation-chercheur/edit-chercheur/etablissement-comite-et-commission-evaluation-edit-chercheur.component';
import { EtablissementComiteEtCommissionEvaluationViewChercheurComponent } from './view/etablissement-comite-et-commission-evaluation-chercheur/view-chercheur/etablissement-comite-et-commission-evaluation-view-chercheur.component';
import { EtablissementComiteEtCommissionEvaluationListChercheurComponent } from './view/etablissement-comite-et-commission-evaluation-chercheur/list-chercheur/etablissement-comite-et-commission-evaluation-list-chercheur.component';
import { EtablissementComiteEtCommissionEvaluationChercheurComponent } from './view/etablissement-comite-et-commission-evaluation-chercheur/etablissement-comite-et-commission-evaluation-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-chercheur.component';
import { CorpsCreateChercheurComponent } from './view/corps-chercheur/create-chercheur/corps-create-chercheur.component';
import { CorpsEditChercheurComponent } from './view/corps-chercheur/edit-chercheur/corps-edit-chercheur.component';
import { CorpsViewChercheurComponent } from './view/corps-chercheur/view-chercheur/corps-view-chercheur.component';
import { CorpsListChercheurComponent } from './view/corps-chercheur/list-chercheur/corps-list-chercheur.component';
import { CorpsChercheurComponent } from './view/corps-chercheur/corps-chercheur.component';
import { ZoneGeographiqueCreateChercheurComponent } from './view/zone-geographique-chercheur/create-chercheur/zone-geographique-create-chercheur.component';
import { ZoneGeographiqueEditChercheurComponent } from './view/zone-geographique-chercheur/edit-chercheur/zone-geographique-edit-chercheur.component';
import { ZoneGeographiqueViewChercheurComponent } from './view/zone-geographique-chercheur/view-chercheur/zone-geographique-view-chercheur.component';
import { ZoneGeographiqueListChercheurComponent } from './view/zone-geographique-chercheur/list-chercheur/zone-geographique-list-chercheur.component';
import { ZoneGeographiqueChercheurComponent } from './view/zone-geographique-chercheur/zone-geographique-chercheur.component';
import { InstrumentIrdCreateChercheurComponent } from './view/instrument-ird-chercheur/create-chercheur/instrument-ird-create-chercheur.component';
import { InstrumentIrdEditChercheurComponent } from './view/instrument-ird-chercheur/edit-chercheur/instrument-ird-edit-chercheur.component';
import { InstrumentIrdViewChercheurComponent } from './view/instrument-ird-chercheur/view-chercheur/instrument-ird-view-chercheur.component';
import { InstrumentIrdListChercheurComponent } from './view/instrument-ird-chercheur/list-chercheur/instrument-ird-list-chercheur.component';
import { InstrumentIrdChercheurComponent } from './view/instrument-ird-chercheur/instrument-ird-chercheur.component';
import { ResponsabilitePedagogiqueEnjeuxIrdCreateChercheurComponent } from './view/responsabilite-pedagogique-enjeux-ird-chercheur/create-chercheur/responsabilite-pedagogique-enjeux-ird-create-chercheur.component';
import { ResponsabilitePedagogiqueEnjeuxIrdEditChercheurComponent } from './view/responsabilite-pedagogique-enjeux-ird-chercheur/edit-chercheur/responsabilite-pedagogique-enjeux-ird-edit-chercheur.component';
import { ResponsabilitePedagogiqueEnjeuxIrdViewChercheurComponent } from './view/responsabilite-pedagogique-enjeux-ird-chercheur/view-chercheur/responsabilite-pedagogique-enjeux-ird-view-chercheur.component';
import { ResponsabilitePedagogiqueEnjeuxIrdListChercheurComponent } from './view/responsabilite-pedagogique-enjeux-ird-chercheur/list-chercheur/responsabilite-pedagogique-enjeux-ird-list-chercheur.component';
import { ResponsabilitePedagogiqueEnjeuxIrdChercheurComponent } from './view/responsabilite-pedagogique-enjeux-ird-chercheur/responsabilite-pedagogique-enjeux-ird-chercheur.component';
import { FaqCreateChercheurComponent } from './view/faq-chercheur/create-chercheur/faq-create-chercheur.component';
import { FaqEditChercheurComponent } from './view/faq-chercheur/edit-chercheur/faq-edit-chercheur.component';
import { FaqViewChercheurComponent } from './view/faq-chercheur/view-chercheur/faq-view-chercheur.component';
import { FaqListChercheurComponent } from './view/faq-chercheur/list-chercheur/faq-list-chercheur.component';
import { FaqChercheurComponent } from './view/faq-chercheur/faq-chercheur.component';
import { ExpertiseScientifiqueCreateChercheurComponent } from './view/expertise-scientifique-chercheur/create-chercheur/expertise-scientifique-create-chercheur.component';
import { ExpertiseScientifiqueEditChercheurComponent } from './view/expertise-scientifique-chercheur/edit-chercheur/expertise-scientifique-edit-chercheur.component';
import { ExpertiseScientifiqueViewChercheurComponent } from './view/expertise-scientifique-chercheur/view-chercheur/expertise-scientifique-view-chercheur.component';
import { ExpertiseScientifiqueListChercheurComponent } from './view/expertise-scientifique-chercheur/list-chercheur/expertise-scientifique-list-chercheur.component';
import { ExpertiseScientifiqueChercheurComponent } from './view/expertise-scientifique-chercheur/expertise-scientifique-chercheur.component';
import { NatureEtudeCreateChercheurComponent } from './view/nature-etude-chercheur/create-chercheur/nature-etude-create-chercheur.component';
import { NatureEtudeEditChercheurComponent } from './view/nature-etude-chercheur/edit-chercheur/nature-etude-edit-chercheur.component';
import { NatureEtudeViewChercheurComponent } from './view/nature-etude-chercheur/view-chercheur/nature-etude-view-chercheur.component';
import { NatureEtudeListChercheurComponent } from './view/nature-etude-chercheur/list-chercheur/nature-etude-list-chercheur.component';
import { NatureEtudeChercheurComponent } from './view/nature-etude-chercheur/nature-etude-chercheur.component';
import { EtablissementEnseignementCreateChercheurComponent } from './view/etablissement-enseignement-chercheur/create-chercheur/etablissement-enseignement-create-chercheur.component';
import { EtablissementEnseignementEditChercheurComponent } from './view/etablissement-enseignement-chercheur/edit-chercheur/etablissement-enseignement-edit-chercheur.component';
import { EtablissementEnseignementViewChercheurComponent } from './view/etablissement-enseignement-chercheur/view-chercheur/etablissement-enseignement-view-chercheur.component';
import { EtablissementEnseignementListChercheurComponent } from './view/etablissement-enseignement-chercheur/list-chercheur/etablissement-enseignement-list-chercheur.component';
import { EtablissementEnseignementChercheurComponent } from './view/etablissement-enseignement-chercheur/etablissement-enseignement-chercheur.component';
import { OutilPedagogiquePaysConceptionCreateChercheurComponent } from './view/outil-pedagogique-pays-conception-chercheur/create-chercheur/outil-pedagogique-pays-conception-create-chercheur.component';
import { OutilPedagogiquePaysConceptionEditChercheurComponent } from './view/outil-pedagogique-pays-conception-chercheur/edit-chercheur/outil-pedagogique-pays-conception-edit-chercheur.component';
import { OutilPedagogiquePaysConceptionViewChercheurComponent } from './view/outil-pedagogique-pays-conception-chercheur/view-chercheur/outil-pedagogique-pays-conception-view-chercheur.component';
import { OutilPedagogiquePaysConceptionListChercheurComponent } from './view/outil-pedagogique-pays-conception-chercheur/list-chercheur/outil-pedagogique-pays-conception-list-chercheur.component';
import { OutilPedagogiquePaysConceptionChercheurComponent } from './view/outil-pedagogique-pays-conception-chercheur/outil-pedagogique-pays-conception-chercheur.component';
import { InstitutionCreateChercheurComponent } from './view/institution-chercheur/create-chercheur/institution-create-chercheur.component';
import { InstitutionEditChercheurComponent } from './view/institution-chercheur/edit-chercheur/institution-edit-chercheur.component';
import { InstitutionViewChercheurComponent } from './view/institution-chercheur/view-chercheur/institution-view-chercheur.component';
import { InstitutionListChercheurComponent } from './view/institution-chercheur/list-chercheur/institution-list-chercheur.component';
import { InstitutionChercheurComponent } from './view/institution-chercheur/institution-chercheur.component';
import { CampagneChercheurFermetureCreateChercheurComponent } from './view/campagne-chercheur-fermeture-chercheur/create-chercheur/campagne-chercheur-fermeture-create-chercheur.component';
import { CampagneChercheurFermetureEditChercheurComponent } from './view/campagne-chercheur-fermeture-chercheur/edit-chercheur/campagne-chercheur-fermeture-edit-chercheur.component';
import { CampagneChercheurFermetureViewChercheurComponent } from './view/campagne-chercheur-fermeture-chercheur/view-chercheur/campagne-chercheur-fermeture-view-chercheur.component';
import { CampagneChercheurFermetureListChercheurComponent } from './view/campagne-chercheur-fermeture-chercheur/list-chercheur/campagne-chercheur-fermeture-list-chercheur.component';
import { CampagneChercheurFermetureChercheurComponent } from './view/campagne-chercheur-fermeture-chercheur/campagne-chercheur-fermeture-chercheur.component';
import { EncadrementDoctorantCreateChercheurComponent } from './view/encadrement-doctorant-chercheur/create-chercheur/encadrement-doctorant-create-chercheur.component';
import { EncadrementDoctorantEditChercheurComponent } from './view/encadrement-doctorant-chercheur/edit-chercheur/encadrement-doctorant-edit-chercheur.component';
import { EncadrementDoctorantViewChercheurComponent } from './view/encadrement-doctorant-chercheur/view-chercheur/encadrement-doctorant-view-chercheur.component';
import { EncadrementDoctorantListChercheurComponent } from './view/encadrement-doctorant-chercheur/list-chercheur/encadrement-doctorant-list-chercheur.component';
import { EncadrementDoctorantChercheurComponent } from './view/encadrement-doctorant-chercheur/encadrement-doctorant-chercheur.component';
import { CommunauteSavoirConseilEtComiteScientifiqueCreateChercheurComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-chercheur/create-chercheur/communaute-savoir-conseil-et-comite-scientifique-create-chercheur.component';
import { CommunauteSavoirConseilEtComiteScientifiqueEditChercheurComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-chercheur/edit-chercheur/communaute-savoir-conseil-et-comite-scientifique-edit-chercheur.component';
import { CommunauteSavoirConseilEtComiteScientifiqueViewChercheurComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-chercheur/view-chercheur/communaute-savoir-conseil-et-comite-scientifique-view-chercheur.component';
import { CommunauteSavoirConseilEtComiteScientifiqueListChercheurComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-chercheur/list-chercheur/communaute-savoir-conseil-et-comite-scientifique-list-chercheur.component';
import { CommunauteSavoirConseilEtComiteScientifiqueChercheurComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-chercheur/communaute-savoir-conseil-et-comite-scientifique-chercheur.component';
import { PubliqueFormationCreateChercheurComponent } from './view/publique-formation-chercheur/create-chercheur/publique-formation-create-chercheur.component';
import { PubliqueFormationEditChercheurComponent } from './view/publique-formation-chercheur/edit-chercheur/publique-formation-edit-chercheur.component';
import { PubliqueFormationViewChercheurComponent } from './view/publique-formation-chercheur/view-chercheur/publique-formation-view-chercheur.component';
import { PubliqueFormationListChercheurComponent } from './view/publique-formation-chercheur/list-chercheur/publique-formation-list-chercheur.component';
import { PubliqueFormationChercheurComponent } from './view/publique-formation-chercheur/publique-formation-chercheur.component';
import { OutilPedagogiqueTypeInstrumentIrdCreateChercheurComponent } from './view/outil-pedagogique-type-instrument-ird-chercheur/create-chercheur/outil-pedagogique-type-instrument-ird-create-chercheur.component';
import { OutilPedagogiqueTypeInstrumentIrdEditChercheurComponent } from './view/outil-pedagogique-type-instrument-ird-chercheur/edit-chercheur/outil-pedagogique-type-instrument-ird-edit-chercheur.component';
import { OutilPedagogiqueTypeInstrumentIrdViewChercheurComponent } from './view/outil-pedagogique-type-instrument-ird-chercheur/view-chercheur/outil-pedagogique-type-instrument-ird-view-chercheur.component';
import { OutilPedagogiqueTypeInstrumentIrdListChercheurComponent } from './view/outil-pedagogique-type-instrument-ird-chercheur/list-chercheur/outil-pedagogique-type-instrument-ird-list-chercheur.component';
import { OutilPedagogiqueTypeInstrumentIrdChercheurComponent } from './view/outil-pedagogique-type-instrument-ird-chercheur/outil-pedagogique-type-instrument-ird-chercheur.component';
import { FinancementDoctorantCreateChercheurComponent } from './view/financement-doctorant-chercheur/create-chercheur/financement-doctorant-create-chercheur.component';
import { FinancementDoctorantEditChercheurComponent } from './view/financement-doctorant-chercheur/edit-chercheur/financement-doctorant-edit-chercheur.component';
import { FinancementDoctorantViewChercheurComponent } from './view/financement-doctorant-chercheur/view-chercheur/financement-doctorant-view-chercheur.component';
import { FinancementDoctorantListChercheurComponent } from './view/financement-doctorant-chercheur/list-chercheur/financement-doctorant-list-chercheur.component';
import { FinancementDoctorantChercheurComponent } from './view/financement-doctorant-chercheur/financement-doctorant-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-chercheur.component';
import { VilleCreateChercheurComponent } from './view/ville-chercheur/create-chercheur/ville-create-chercheur.component';
import { VilleEditChercheurComponent } from './view/ville-chercheur/edit-chercheur/ville-edit-chercheur.component';
import { VilleViewChercheurComponent } from './view/ville-chercheur/view-chercheur/ville-view-chercheur.component';
import { VilleListChercheurComponent } from './view/ville-chercheur/list-chercheur/ville-list-chercheur.component';
import { VilleChercheurComponent } from './view/ville-chercheur/ville-chercheur.component';
import { RoleComiteEtCommissionEvaluationCreateChercheurComponent } from './view/role-comite-et-commission-evaluation-chercheur/create-chercheur/role-comite-et-commission-evaluation-create-chercheur.component';
import { RoleComiteEtCommissionEvaluationEditChercheurComponent } from './view/role-comite-et-commission-evaluation-chercheur/edit-chercheur/role-comite-et-commission-evaluation-edit-chercheur.component';
import { RoleComiteEtCommissionEvaluationViewChercheurComponent } from './view/role-comite-et-commission-evaluation-chercheur/view-chercheur/role-comite-et-commission-evaluation-view-chercheur.component';
import { RoleComiteEtCommissionEvaluationListChercheurComponent } from './view/role-comite-et-commission-evaluation-chercheur/list-chercheur/role-comite-et-commission-evaluation-list-chercheur.component';
import { RoleComiteEtCommissionEvaluationChercheurComponent } from './view/role-comite-et-commission-evaluation-chercheur/role-comite-et-commission-evaluation-chercheur.component';
import { ChercheurEmailCreateChercheurComponent } from './view/chercheur-email-chercheur/create-chercheur/chercheur-email-create-chercheur.component';
import { ChercheurEmailEditChercheurComponent } from './view/chercheur-email-chercheur/edit-chercheur/chercheur-email-edit-chercheur.component';
import { ChercheurEmailViewChercheurComponent } from './view/chercheur-email-chercheur/view-chercheur/chercheur-email-view-chercheur.component';
import { ChercheurEmailListChercheurComponent } from './view/chercheur-email-chercheur/list-chercheur/chercheur-email-list-chercheur.component';
import { ChercheurEmailChercheurComponent } from './view/chercheur-email-chercheur/chercheur-email-chercheur.component';
import { EntiteAdministrativeCreateChercheurComponent } from './view/entite-administrative-chercheur/create-chercheur/entite-administrative-create-chercheur.component';
import { EntiteAdministrativeEditChercheurComponent } from './view/entite-administrative-chercheur/edit-chercheur/entite-administrative-edit-chercheur.component';
import { EntiteAdministrativeViewChercheurComponent } from './view/entite-administrative-chercheur/view-chercheur/entite-administrative-view-chercheur.component';
import { EntiteAdministrativeListChercheurComponent } from './view/entite-administrative-chercheur/list-chercheur/entite-administrative-list-chercheur.component';
import { EntiteAdministrativeChercheurComponent } from './view/entite-administrative-chercheur/entite-administrative-chercheur.component';
import { EnjeuxIrdChercheurCreateChercheurComponent } from './view/enjeux-ird-chercheur-chercheur/create-chercheur/enjeux-ird-chercheur-create-chercheur.component';
import { EnjeuxIrdChercheurEditChercheurComponent } from './view/enjeux-ird-chercheur-chercheur/edit-chercheur/enjeux-ird-chercheur-edit-chercheur.component';
import { EnjeuxIrdChercheurViewChercheurComponent } from './view/enjeux-ird-chercheur-chercheur/view-chercheur/enjeux-ird-chercheur-view-chercheur.component';
import { EnjeuxIrdChercheurListChercheurComponent } from './view/enjeux-ird-chercheur-chercheur/list-chercheur/enjeux-ird-chercheur-list-chercheur.component';
import { EnjeuxIrdChercheurChercheurComponent } from './view/enjeux-ird-chercheur-chercheur/enjeux-ird-chercheur-chercheur.component';
import { EtablissementCreateChercheurComponent } from './view/etablissement-chercheur/create-chercheur/etablissement-create-chercheur.component';
import { EtablissementEditChercheurComponent } from './view/etablissement-chercheur/edit-chercheur/etablissement-edit-chercheur.component';
import { EtablissementViewChercheurComponent } from './view/etablissement-chercheur/view-chercheur/etablissement-view-chercheur.component';
import { EtablissementListChercheurComponent } from './view/etablissement-chercheur/list-chercheur/etablissement-list-chercheur.component';
import { EtablissementChercheurComponent } from './view/etablissement-chercheur/etablissement-chercheur.component';
import { DisciplineScientifiqueParentCreateChercheurComponent } from './view/discipline-scientifique-parent-chercheur/create-chercheur/discipline-scientifique-parent-create-chercheur.component';
import { DisciplineScientifiqueParentEditChercheurComponent } from './view/discipline-scientifique-parent-chercheur/edit-chercheur/discipline-scientifique-parent-edit-chercheur.component';
import { DisciplineScientifiqueParentViewChercheurComponent } from './view/discipline-scientifique-parent-chercheur/view-chercheur/discipline-scientifique-parent-view-chercheur.component';
import { DisciplineScientifiqueParentListChercheurComponent } from './view/discipline-scientifique-parent-chercheur/list-chercheur/discipline-scientifique-parent-list-chercheur.component';
import { DisciplineScientifiqueParentChercheurComponent } from './view/discipline-scientifique-parent-chercheur/discipline-scientifique-parent-chercheur.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdCreateChercheurComponent } from './view/projet-activite-recherche-detail-enjeux-ird-chercheur/create-chercheur/projet-activite-recherche-detail-enjeux-ird-create-chercheur.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdEditChercheurComponent } from './view/projet-activite-recherche-detail-enjeux-ird-chercheur/edit-chercheur/projet-activite-recherche-detail-enjeux-ird-edit-chercheur.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdViewChercheurComponent } from './view/projet-activite-recherche-detail-enjeux-ird-chercheur/view-chercheur/projet-activite-recherche-detail-enjeux-ird-view-chercheur.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdListChercheurComponent } from './view/projet-activite-recherche-detail-enjeux-ird-chercheur/list-chercheur/projet-activite-recherche-detail-enjeux-ird-list-chercheur.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdChercheurComponent } from './view/projet-activite-recherche-detail-enjeux-ird-chercheur/projet-activite-recherche-detail-enjeux-ird-chercheur.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-chercheur/create-chercheur/type-publique-rencontre-grand-publique-jeune-publique-create-chercheur.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueEditChercheurComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-chercheur/edit-chercheur/type-publique-rencontre-grand-publique-jeune-publique-edit-chercheur.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueViewChercheurComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-chercheur/view-chercheur/type-publique-rencontre-grand-publique-jeune-publique-view-chercheur.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueListChercheurComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-chercheur/list-chercheur/type-publique-rencontre-grand-publique-jeune-publique-list-chercheur.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueChercheurComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-chercheur/type-publique-rencontre-grand-publique-jeune-publique-chercheur.component';
import { MasterInternationalCreateChercheurComponent } from './view/master-international-chercheur/create-chercheur/master-international-create-chercheur.component';
import { MasterInternationalEditChercheurComponent } from './view/master-international-chercheur/edit-chercheur/master-international-edit-chercheur.component';
import { MasterInternationalViewChercheurComponent } from './view/master-international-chercheur/view-chercheur/master-international-view-chercheur.component';
import { MasterInternationalListChercheurComponent } from './view/master-international-chercheur/list-chercheur/master-international-list-chercheur.component';
import { MasterInternationalChercheurComponent } from './view/master-international-chercheur/master-international-chercheur.component';
import { EnseignementDisciplineScientifiqueCreateChercheurComponent } from './view/enseignement-discipline-scientifique-chercheur/create-chercheur/enseignement-discipline-scientifique-create-chercheur.component';
import { EnseignementDisciplineScientifiqueEditChercheurComponent } from './view/enseignement-discipline-scientifique-chercheur/edit-chercheur/enseignement-discipline-scientifique-edit-chercheur.component';
import { EnseignementDisciplineScientifiqueViewChercheurComponent } from './view/enseignement-discipline-scientifique-chercheur/view-chercheur/enseignement-discipline-scientifique-view-chercheur.component';
import { EnseignementDisciplineScientifiqueListChercheurComponent } from './view/enseignement-discipline-scientifique-chercheur/list-chercheur/enseignement-discipline-scientifique-list-chercheur.component';
import { EnseignementDisciplineScientifiqueChercheurComponent } from './view/enseignement-discipline-scientifique-chercheur/enseignement-discipline-scientifique-chercheur.component';
import { CommunauteSavoirChercheurCreateChercheurComponent } from './view/communaute-savoir-chercheur-chercheur/create-chercheur/communaute-savoir-chercheur-create-chercheur.component';
import { CommunauteSavoirChercheurEditChercheurComponent } from './view/communaute-savoir-chercheur-chercheur/edit-chercheur/communaute-savoir-chercheur-edit-chercheur.component';
import { CommunauteSavoirChercheurViewChercheurComponent } from './view/communaute-savoir-chercheur-chercheur/view-chercheur/communaute-savoir-chercheur-view-chercheur.component';
import { CommunauteSavoirChercheurListChercheurComponent } from './view/communaute-savoir-chercheur-chercheur/list-chercheur/communaute-savoir-chercheur-list-chercheur.component';
import { CommunauteSavoirChercheurChercheurComponent } from './view/communaute-savoir-chercheur-chercheur/communaute-savoir-chercheur-chercheur.component';
import { TypeExpertiseEvaluationCreateChercheurComponent } from './view/type-expertise-evaluation-chercheur/create-chercheur/type-expertise-evaluation-create-chercheur.component';
import { TypeExpertiseEvaluationEditChercheurComponent } from './view/type-expertise-evaluation-chercheur/edit-chercheur/type-expertise-evaluation-edit-chercheur.component';
import { TypeExpertiseEvaluationViewChercheurComponent } from './view/type-expertise-evaluation-chercheur/view-chercheur/type-expertise-evaluation-view-chercheur.component';
import { TypeExpertiseEvaluationListChercheurComponent } from './view/type-expertise-evaluation-chercheur/list-chercheur/type-expertise-evaluation-list-chercheur.component';
import { TypeExpertiseEvaluationChercheurComponent } from './view/type-expertise-evaluation-chercheur/type-expertise-evaluation-chercheur.component';
import { ComiteEtCommissionEvaluationCreateChercheurComponent } from './view/comite-et-commission-evaluation-chercheur/create-chercheur/comite-et-commission-evaluation-create-chercheur.component';
import { ComiteEtCommissionEvaluationEditChercheurComponent } from './view/comite-et-commission-evaluation-chercheur/edit-chercheur/comite-et-commission-evaluation-edit-chercheur.component';
import { ComiteEtCommissionEvaluationViewChercheurComponent } from './view/comite-et-commission-evaluation-chercheur/view-chercheur/comite-et-commission-evaluation-view-chercheur.component';
import { ComiteEtCommissionEvaluationListChercheurComponent } from './view/comite-et-commission-evaluation-chercheur/list-chercheur/comite-et-commission-evaluation-list-chercheur.component';
import { ComiteEtCommissionEvaluationChercheurComponent } from './view/comite-et-commission-evaluation-chercheur/comite-et-commission-evaluation-chercheur.component';
import { EtudiantCreateChercheurComponent } from './view/etudiant-chercheur/create-chercheur/etudiant-create-chercheur.component';
import { EtudiantEditChercheurComponent } from './view/etudiant-chercheur/edit-chercheur/etudiant-edit-chercheur.component';
import { EtudiantViewChercheurComponent } from './view/etudiant-chercheur/view-chercheur/etudiant-view-chercheur.component';
import { EtudiantListChercheurComponent } from './view/etudiant-chercheur/list-chercheur/etudiant-list-chercheur.component';
import { EtudiantChercheurComponent } from './view/etudiant-chercheur/etudiant-chercheur.component';
import { EvenementColloqueScienntifiqueCreateChercheurComponent } from './view/evenement-colloque-scienntifique-chercheur/create-chercheur/evenement-colloque-scienntifique-create-chercheur.component';
import { EvenementColloqueScienntifiqueEditChercheurComponent } from './view/evenement-colloque-scienntifique-chercheur/edit-chercheur/evenement-colloque-scienntifique-edit-chercheur.component';
import { EvenementColloqueScienntifiqueViewChercheurComponent } from './view/evenement-colloque-scienntifique-chercheur/view-chercheur/evenement-colloque-scienntifique-view-chercheur.component';
import { EvenementColloqueScienntifiqueListChercheurComponent } from './view/evenement-colloque-scienntifique-chercheur/list-chercheur/evenement-colloque-scienntifique-list-chercheur.component';
import { EvenementColloqueScienntifiqueChercheurComponent } from './view/evenement-colloque-scienntifique-chercheur/evenement-colloque-scienntifique-chercheur.component';
import { FormationContinueObjetFormationGeneriqueCreateChercheurComponent } from './view/formation-continue-objet-formation-generique-chercheur/create-chercheur/formation-continue-objet-formation-generique-create-chercheur.component';
import { FormationContinueObjetFormationGeneriqueEditChercheurComponent } from './view/formation-continue-objet-formation-generique-chercheur/edit-chercheur/formation-continue-objet-formation-generique-edit-chercheur.component';
import { FormationContinueObjetFormationGeneriqueViewChercheurComponent } from './view/formation-continue-objet-formation-generique-chercheur/view-chercheur/formation-continue-objet-formation-generique-view-chercheur.component';
import { FormationContinueObjetFormationGeneriqueListChercheurComponent } from './view/formation-continue-objet-formation-generique-chercheur/list-chercheur/formation-continue-objet-formation-generique-list-chercheur.component';
import { FormationContinueObjetFormationGeneriqueChercheurComponent } from './view/formation-continue-objet-formation-generique-chercheur/formation-continue-objet-formation-generique-chercheur.component';
import { ModaliteCreateChercheurComponent } from './view/modalite-chercheur/create-chercheur/modalite-create-chercheur.component';
import { ModaliteEditChercheurComponent } from './view/modalite-chercheur/edit-chercheur/modalite-edit-chercheur.component';
import { ModaliteViewChercheurComponent } from './view/modalite-chercheur/view-chercheur/modalite-view-chercheur.component';
import { ModaliteListChercheurComponent } from './view/modalite-chercheur/list-chercheur/modalite-list-chercheur.component';
import { ModaliteChercheurComponent } from './view/modalite-chercheur/modalite-chercheur.component';
import { FormationContinueCreateChercheurComponent } from './view/formation-continue-chercheur/create-chercheur/formation-continue-create-chercheur.component';
import { FormationContinueEditChercheurComponent } from './view/formation-continue-chercheur/edit-chercheur/formation-continue-edit-chercheur.component';
import { FormationContinueViewChercheurComponent } from './view/formation-continue-chercheur/view-chercheur/formation-continue-view-chercheur.component';
import { FormationContinueListChercheurComponent } from './view/formation-continue-chercheur/list-chercheur/formation-continue-list-chercheur.component';
import { FormationContinueChercheurComponent } from './view/formation-continue-chercheur/formation-continue-chercheur.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantCreateChercheurComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-chercheur/create-chercheur/projet-activite-recherche-detail-institution-co-contractant-create-chercheur.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantEditChercheurComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-chercheur/edit-chercheur/projet-activite-recherche-detail-institution-co-contractant-edit-chercheur.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantViewChercheurComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-chercheur/view-chercheur/projet-activite-recherche-detail-institution-co-contractant-view-chercheur.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantListChercheurComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-chercheur/list-chercheur/projet-activite-recherche-detail-institution-co-contractant-list-chercheur.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantChercheurComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-chercheur/projet-activite-recherche-detail-institution-co-contractant-chercheur.component';
import { ModaliteFormationContinueCreateChercheurComponent } from './view/modalite-formation-continue-chercheur/create-chercheur/modalite-formation-continue-create-chercheur.component';
import { ModaliteFormationContinueEditChercheurComponent } from './view/modalite-formation-continue-chercheur/edit-chercheur/modalite-formation-continue-edit-chercheur.component';
import { ModaliteFormationContinueViewChercheurComponent } from './view/modalite-formation-continue-chercheur/view-chercheur/modalite-formation-continue-view-chercheur.component';
import { ModaliteFormationContinueListChercheurComponent } from './view/modalite-formation-continue-chercheur/list-chercheur/modalite-formation-continue-list-chercheur.component';
import { ModaliteFormationContinueChercheurComponent } from './view/modalite-formation-continue-chercheur/modalite-formation-continue-chercheur.component';
import { ConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/consultance-scientifique-ponctuelle-chercheur/create-chercheur/consultance-scientifique-ponctuelle-create-chercheur.component';
import { ConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/consultance-scientifique-ponctuelle-chercheur/edit-chercheur/consultance-scientifique-ponctuelle-edit-chercheur.component';
import { ConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/consultance-scientifique-ponctuelle-chercheur/view-chercheur/consultance-scientifique-ponctuelle-view-chercheur.component';
import { ConsultanceScientifiquePonctuelleListChercheurComponent } from './view/consultance-scientifique-ponctuelle-chercheur/list-chercheur/consultance-scientifique-ponctuelle-list-chercheur.component';
import { ConsultanceScientifiquePonctuelleChercheurComponent } from './view/consultance-scientifique-ponctuelle-chercheur/consultance-scientifique-ponctuelle-chercheur.component';
import { TypeEntiteAdministrativeCreateChercheurComponent } from './view/type-entite-administrative-chercheur/create-chercheur/type-entite-administrative-create-chercheur.component';
import { TypeEntiteAdministrativeEditChercheurComponent } from './view/type-entite-administrative-chercheur/edit-chercheur/type-entite-administrative-edit-chercheur.component';
import { TypeEntiteAdministrativeViewChercheurComponent } from './view/type-entite-administrative-chercheur/view-chercheur/type-entite-administrative-view-chercheur.component';
import { TypeEntiteAdministrativeListChercheurComponent } from './view/type-entite-administrative-chercheur/list-chercheur/type-entite-administrative-list-chercheur.component';
import { TypeEntiteAdministrativeChercheurComponent } from './view/type-entite-administrative-chercheur/type-entite-administrative-chercheur.component';
import { TypeUtilisateurCreateChercheurComponent } from './view/type-utilisateur-chercheur/create-chercheur/type-utilisateur-create-chercheur.component';
import { TypeUtilisateurEditChercheurComponent } from './view/type-utilisateur-chercheur/edit-chercheur/type-utilisateur-edit-chercheur.component';
import { TypeUtilisateurViewChercheurComponent } from './view/type-utilisateur-chercheur/view-chercheur/type-utilisateur-view-chercheur.component';
import { TypeUtilisateurListChercheurComponent } from './view/type-utilisateur-chercheur/list-chercheur/type-utilisateur-list-chercheur.component';
import { TypeUtilisateurChercheurComponent } from './view/type-utilisateur-chercheur/type-utilisateur-chercheur.component';
import { TypeInstrumentIrdCreateChercheurComponent } from './view/type-instrument-ird-chercheur/create-chercheur/type-instrument-ird-create-chercheur.component';
import { TypeInstrumentIrdEditChercheurComponent } from './view/type-instrument-ird-chercheur/edit-chercheur/type-instrument-ird-edit-chercheur.component';
import { TypeInstrumentIrdViewChercheurComponent } from './view/type-instrument-ird-chercheur/view-chercheur/type-instrument-ird-view-chercheur.component';
import { TypeInstrumentIrdListChercheurComponent } from './view/type-instrument-ird-chercheur/list-chercheur/type-instrument-ird-list-chercheur.component';
import { TypeInstrumentIrdChercheurComponent } from './view/type-instrument-ird-chercheur/type-instrument-ird-chercheur.component';
import { EtablissementPartenaireCreateChercheurComponent } from './view/etablissement-partenaire-chercheur/create-chercheur/etablissement-partenaire-create-chercheur.component';
import { EtablissementPartenaireEditChercheurComponent } from './view/etablissement-partenaire-chercheur/edit-chercheur/etablissement-partenaire-edit-chercheur.component';
import { EtablissementPartenaireViewChercheurComponent } from './view/etablissement-partenaire-chercheur/view-chercheur/etablissement-partenaire-view-chercheur.component';
import { EtablissementPartenaireListChercheurComponent } from './view/etablissement-partenaire-chercheur/list-chercheur/etablissement-partenaire-list-chercheur.component';
import { EtablissementPartenaireChercheurComponent } from './view/etablissement-partenaire-chercheur/etablissement-partenaire-chercheur.component';
import { ModaliteEtudeCreateChercheurComponent } from './view/modalite-etude-chercheur/create-chercheur/modalite-etude-create-chercheur.component';
import { ModaliteEtudeEditChercheurComponent } from './view/modalite-etude-chercheur/edit-chercheur/modalite-etude-edit-chercheur.component';
import { ModaliteEtudeViewChercheurComponent } from './view/modalite-etude-chercheur/view-chercheur/modalite-etude-view-chercheur.component';
import { ModaliteEtudeListChercheurComponent } from './view/modalite-etude-chercheur/list-chercheur/modalite-etude-list-chercheur.component';
import { ModaliteEtudeChercheurComponent } from './view/modalite-etude-chercheur/modalite-etude-chercheur.component';
import { ZoneGeographiqueFormationContinueCreateChercheurComponent } from './view/zone-geographique-formation-continue-chercheur/create-chercheur/zone-geographique-formation-continue-create-chercheur.component';
import { ZoneGeographiqueFormationContinueEditChercheurComponent } from './view/zone-geographique-formation-continue-chercheur/edit-chercheur/zone-geographique-formation-continue-edit-chercheur.component';
import { ZoneGeographiqueFormationContinueViewChercheurComponent } from './view/zone-geographique-formation-continue-chercheur/view-chercheur/zone-geographique-formation-continue-view-chercheur.component';
import { ZoneGeographiqueFormationContinueListChercheurComponent } from './view/zone-geographique-formation-continue-chercheur/list-chercheur/zone-geographique-formation-continue-list-chercheur.component';
import { ZoneGeographiqueFormationContinueChercheurComponent } from './view/zone-geographique-formation-continue-chercheur/zone-geographique-formation-continue-chercheur.component';
import { TemplateClotureCreateChercheurComponent } from './view/template-cloture-chercheur/create-chercheur/template-cloture-create-chercheur.component';
import { TemplateClotureEditChercheurComponent } from './view/template-cloture-chercheur/edit-chercheur/template-cloture-edit-chercheur.component';
import { TemplateClotureViewChercheurComponent } from './view/template-cloture-chercheur/view-chercheur/template-cloture-view-chercheur.component';
import { TemplateClotureListChercheurComponent } from './view/template-cloture-chercheur/list-chercheur/template-cloture-list-chercheur.component';
import { TemplateClotureChercheurComponent } from './view/template-cloture-chercheur/template-cloture-chercheur.component';
import { ProjetActiviteRechercheDetailInstrumentIrdCreateChercheurComponent } from './view/projet-activite-recherche-detail-instrument-ird-chercheur/create-chercheur/projet-activite-recherche-detail-instrument-ird-create-chercheur.component';
import { ProjetActiviteRechercheDetailInstrumentIrdEditChercheurComponent } from './view/projet-activite-recherche-detail-instrument-ird-chercheur/edit-chercheur/projet-activite-recherche-detail-instrument-ird-edit-chercheur.component';
import { ProjetActiviteRechercheDetailInstrumentIrdViewChercheurComponent } from './view/projet-activite-recherche-detail-instrument-ird-chercheur/view-chercheur/projet-activite-recherche-detail-instrument-ird-view-chercheur.component';
import { ProjetActiviteRechercheDetailInstrumentIrdListChercheurComponent } from './view/projet-activite-recherche-detail-instrument-ird-chercheur/list-chercheur/projet-activite-recherche-detail-instrument-ird-list-chercheur.component';
import { ProjetActiviteRechercheDetailInstrumentIrdChercheurComponent } from './view/projet-activite-recherche-detail-instrument-ird-chercheur/projet-activite-recherche-detail-instrument-ird-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-instrument-ird-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-instrument-ird-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-instrument-ird-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-instrument-ird-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur/rencontre-grand-publique-jeune-publique-instrument-ird-chercheur.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur/create-chercheur/type-instrument-ird-consultance-scientifique-ponctuelle-create-chercheur.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/type-instrument-ird-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur/view-chercheur/type-instrument-ird-consultance-scientifique-ponctuelle-view-chercheur.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur/list-chercheur/type-instrument-ird-consultance-scientifique-ponctuelle-list-chercheur.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur/type-instrument-ird-consultance-scientifique-ponctuelle-chercheur.component';
import { NatureActiviteGrandPubliqueCreateChercheurComponent } from './view/nature-activite-grand-publique-chercheur/create-chercheur/nature-activite-grand-publique-create-chercheur.component';
import { NatureActiviteGrandPubliqueEditChercheurComponent } from './view/nature-activite-grand-publique-chercheur/edit-chercheur/nature-activite-grand-publique-edit-chercheur.component';
import { NatureActiviteGrandPubliqueViewChercheurComponent } from './view/nature-activite-grand-publique-chercheur/view-chercheur/nature-activite-grand-publique-view-chercheur.component';
import { NatureActiviteGrandPubliqueListChercheurComponent } from './view/nature-activite-grand-publique-chercheur/list-chercheur/nature-activite-grand-publique-list-chercheur.component';
import { NatureActiviteGrandPubliqueChercheurComponent } from './view/nature-activite-grand-publique-chercheur/nature-activite-grand-publique-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-pays-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-pays-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-pays-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-pays-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-chercheur/developpement-de-savoir-et-innovation-scientifique-pays-chercheur.component';
import { RoleDeveloppementDeSavoirCreateChercheurComponent } from './view/role-developpement-de-savoir-chercheur/create-chercheur/role-developpement-de-savoir-create-chercheur.component';
import { RoleDeveloppementDeSavoirEditChercheurComponent } from './view/role-developpement-de-savoir-chercheur/edit-chercheur/role-developpement-de-savoir-edit-chercheur.component';
import { RoleDeveloppementDeSavoirViewChercheurComponent } from './view/role-developpement-de-savoir-chercheur/view-chercheur/role-developpement-de-savoir-view-chercheur.component';
import { RoleDeveloppementDeSavoirListChercheurComponent } from './view/role-developpement-de-savoir-chercheur/list-chercheur/role-developpement-de-savoir-list-chercheur.component';
import { RoleDeveloppementDeSavoirChercheurComponent } from './view/role-developpement-de-savoir-chercheur/role-developpement-de-savoir-chercheur.component';
import { TypeUtilisateurSavoirConcuCreateChercheurComponent } from './view/type-utilisateur-savoir-concu-chercheur/create-chercheur/type-utilisateur-savoir-concu-create-chercheur.component';
import { TypeUtilisateurSavoirConcuEditChercheurComponent } from './view/type-utilisateur-savoir-concu-chercheur/edit-chercheur/type-utilisateur-savoir-concu-edit-chercheur.component';
import { TypeUtilisateurSavoirConcuViewChercheurComponent } from './view/type-utilisateur-savoir-concu-chercheur/view-chercheur/type-utilisateur-savoir-concu-view-chercheur.component';
import { TypeUtilisateurSavoirConcuListChercheurComponent } from './view/type-utilisateur-savoir-concu-chercheur/list-chercheur/type-utilisateur-savoir-concu-list-chercheur.component';
import { TypeUtilisateurSavoirConcuChercheurComponent } from './view/type-utilisateur-savoir-concu-chercheur/type-utilisateur-savoir-concu-chercheur.component';
import { EncadrementEtudiantDisciplineScientifiqueCreateChercheurComponent } from './view/encadrement-etudiant-discipline-scientifique-chercheur/create-chercheur/encadrement-etudiant-discipline-scientifique-create-chercheur.component';
import { EncadrementEtudiantDisciplineScientifiqueEditChercheurComponent } from './view/encadrement-etudiant-discipline-scientifique-chercheur/edit-chercheur/encadrement-etudiant-discipline-scientifique-edit-chercheur.component';
import { EncadrementEtudiantDisciplineScientifiqueViewChercheurComponent } from './view/encadrement-etudiant-discipline-scientifique-chercheur/view-chercheur/encadrement-etudiant-discipline-scientifique-view-chercheur.component';
import { EncadrementEtudiantDisciplineScientifiqueListChercheurComponent } from './view/encadrement-etudiant-discipline-scientifique-chercheur/list-chercheur/encadrement-etudiant-discipline-scientifique-list-chercheur.component';
import { EncadrementEtudiantDisciplineScientifiqueChercheurComponent } from './view/encadrement-etudiant-discipline-scientifique-chercheur/encadrement-etudiant-discipline-scientifique-chercheur.component';
import { CommunauteSavoirExpertiseScientifiqueCreateChercheurComponent } from './view/communaute-savoir-expertise-scientifique-chercheur/create-chercheur/communaute-savoir-expertise-scientifique-create-chercheur.component';
import { CommunauteSavoirExpertiseScientifiqueEditChercheurComponent } from './view/communaute-savoir-expertise-scientifique-chercheur/edit-chercheur/communaute-savoir-expertise-scientifique-edit-chercheur.component';
import { CommunauteSavoirExpertiseScientifiqueViewChercheurComponent } from './view/communaute-savoir-expertise-scientifique-chercheur/view-chercheur/communaute-savoir-expertise-scientifique-view-chercheur.component';
import { CommunauteSavoirExpertiseScientifiqueListChercheurComponent } from './view/communaute-savoir-expertise-scientifique-chercheur/list-chercheur/communaute-savoir-expertise-scientifique-list-chercheur.component';
import { CommunauteSavoirExpertiseScientifiqueChercheurComponent } from './view/communaute-savoir-expertise-scientifique-chercheur/communaute-savoir-expertise-scientifique-chercheur.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationCreateChercheurComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-chercheur/create-chercheur/discipline-scientifique-comite-et-commission-evaluation-create-chercheur.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationEditChercheurComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-chercheur/edit-chercheur/discipline-scientifique-comite-et-commission-evaluation-edit-chercheur.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationViewChercheurComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-chercheur/view-chercheur/discipline-scientifique-comite-et-commission-evaluation-view-chercheur.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationListChercheurComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-chercheur/list-chercheur/discipline-scientifique-comite-et-commission-evaluation-list-chercheur.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationChercheurComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-chercheur/discipline-scientifique-comite-et-commission-evaluation-chercheur.component';
import { TypePubliqueCultureScientifiqueCreateChercheurComponent } from './view/type-publique-culture-scientifique-chercheur/create-chercheur/type-publique-culture-scientifique-create-chercheur.component';
import { TypePubliqueCultureScientifiqueEditChercheurComponent } from './view/type-publique-culture-scientifique-chercheur/edit-chercheur/type-publique-culture-scientifique-edit-chercheur.component';
import { TypePubliqueCultureScientifiqueViewChercheurComponent } from './view/type-publique-culture-scientifique-chercheur/view-chercheur/type-publique-culture-scientifique-view-chercheur.component';
import { TypePubliqueCultureScientifiqueListChercheurComponent } from './view/type-publique-culture-scientifique-chercheur/list-chercheur/type-publique-culture-scientifique-list-chercheur.component';
import { TypePubliqueCultureScientifiqueChercheurComponent } from './view/type-publique-culture-scientifique-chercheur/type-publique-culture-scientifique-chercheur.component';
import { StatusCursusCreateChercheurComponent } from './view/status-cursus-chercheur/create-chercheur/status-cursus-create-chercheur.component';
import { StatusCursusEditChercheurComponent } from './view/status-cursus-chercheur/edit-chercheur/status-cursus-edit-chercheur.component';
import { StatusCursusViewChercheurComponent } from './view/status-cursus-chercheur/view-chercheur/status-cursus-view-chercheur.component';
import { StatusCursusListChercheurComponent } from './view/status-cursus-chercheur/list-chercheur/status-cursus-list-chercheur.component';
import { StatusCursusChercheurComponent } from './view/status-cursus-chercheur/status-cursus-chercheur.component';
import { DistinctionEtablissementPaysCreateChercheurComponent } from './view/distinction-etablissement-pays-chercheur/create-chercheur/distinction-etablissement-pays-create-chercheur.component';
import { DistinctionEtablissementPaysEditChercheurComponent } from './view/distinction-etablissement-pays-chercheur/edit-chercheur/distinction-etablissement-pays-edit-chercheur.component';
import { DistinctionEtablissementPaysViewChercheurComponent } from './view/distinction-etablissement-pays-chercheur/view-chercheur/distinction-etablissement-pays-view-chercheur.component';
import { DistinctionEtablissementPaysListChercheurComponent } from './view/distinction-etablissement-pays-chercheur/list-chercheur/distinction-etablissement-pays-list-chercheur.component';
import { DistinctionEtablissementPaysChercheurComponent } from './view/distinction-etablissement-pays-chercheur/distinction-etablissement-pays-chercheur.component';
import { InstrumentIrdChercheurCreateChercheurComponent } from './view/instrument-ird-chercheur-chercheur/create-chercheur/instrument-ird-chercheur-create-chercheur.component';
import { InstrumentIrdChercheurEditChercheurComponent } from './view/instrument-ird-chercheur-chercheur/edit-chercheur/instrument-ird-chercheur-edit-chercheur.component';
import { InstrumentIrdChercheurViewChercheurComponent } from './view/instrument-ird-chercheur-chercheur/view-chercheur/instrument-ird-chercheur-view-chercheur.component';
import { InstrumentIrdChercheurListChercheurComponent } from './view/instrument-ird-chercheur-chercheur/list-chercheur/instrument-ird-chercheur-list-chercheur.component';
import { InstrumentIrdChercheurChercheurComponent } from './view/instrument-ird-chercheur-chercheur/instrument-ird-chercheur-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur/rencontre-grand-publique-jeune-publique-enjeux-ird-chercheur.component';
import { CategorieFaqCreateChercheurComponent } from './view/categorie-faq-chercheur/create-chercheur/categorie-faq-create-chercheur.component';
import { CategorieFaqEditChercheurComponent } from './view/categorie-faq-chercheur/edit-chercheur/categorie-faq-edit-chercheur.component';
import { CategorieFaqViewChercheurComponent } from './view/categorie-faq-chercheur/view-chercheur/categorie-faq-view-chercheur.component';
import { CategorieFaqListChercheurComponent } from './view/categorie-faq-chercheur/list-chercheur/categorie-faq-list-chercheur.component';
import { CategorieFaqChercheurComponent } from './view/categorie-faq-chercheur/categorie-faq-chercheur.component';
import { IdentifiantRechercheCreateChercheurComponent } from './view/identifiant-recherche-chercheur/create-chercheur/identifiant-recherche-create-chercheur.component';
import { IdentifiantRechercheEditChercheurComponent } from './view/identifiant-recherche-chercheur/edit-chercheur/identifiant-recherche-edit-chercheur.component';
import { IdentifiantRechercheViewChercheurComponent } from './view/identifiant-recherche-chercheur/view-chercheur/identifiant-recherche-view-chercheur.component';
import { IdentifiantRechercheListChercheurComponent } from './view/identifiant-recherche-chercheur/list-chercheur/identifiant-recherche-list-chercheur.component';
import { IdentifiantRechercheChercheurComponent } from './view/identifiant-recherche-chercheur/identifiant-recherche-chercheur.component';
import { EnseignementEtFormationCreateChercheurComponent } from './view/enseignement-et-formation-chercheur/create-chercheur/enseignement-et-formation-create-chercheur.component';
import { EnseignementEtFormationEditChercheurComponent } from './view/enseignement-et-formation-chercheur/edit-chercheur/enseignement-et-formation-edit-chercheur.component';
import { EnseignementEtFormationViewChercheurComponent } from './view/enseignement-et-formation-chercheur/view-chercheur/enseignement-et-formation-view-chercheur.component';
import { EnseignementEtFormationListChercheurComponent } from './view/enseignement-et-formation-chercheur/list-chercheur/enseignement-et-formation-list-chercheur.component';
import { EnseignementEtFormationChercheurComponent } from './view/enseignement-et-formation-chercheur/enseignement-et-formation-chercheur.component';
import { ModaliteInterventionCreateChercheurComponent } from './view/modalite-intervention-chercheur/create-chercheur/modalite-intervention-create-chercheur.component';
import { ModaliteInterventionEditChercheurComponent } from './view/modalite-intervention-chercheur/edit-chercheur/modalite-intervention-edit-chercheur.component';
import { ModaliteInterventionViewChercheurComponent } from './view/modalite-intervention-chercheur/view-chercheur/modalite-intervention-view-chercheur.component';
import { ModaliteInterventionListChercheurComponent } from './view/modalite-intervention-chercheur/list-chercheur/modalite-intervention-list-chercheur.component';
import { ModaliteInterventionChercheurComponent } from './view/modalite-intervention-chercheur/modalite-intervention-chercheur.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur/create-chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique-create-chercheur.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditChercheurComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur/edit-chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique-edit-chercheur.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewChercheurComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur/view-chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique-view-chercheur.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListChercheurComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur/list-chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique-list-chercheur.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueChercheurComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur/pays-organisateur-rencontre-grand-publique-jeune-publique-chercheur.component';
import { DisciplineScientifiqueExpertiseScientifiqueCreateChercheurComponent } from './view/discipline-scientifique-expertise-scientifique-chercheur/create-chercheur/discipline-scientifique-expertise-scientifique-create-chercheur.component';
import { DisciplineScientifiqueExpertiseScientifiqueEditChercheurComponent } from './view/discipline-scientifique-expertise-scientifique-chercheur/edit-chercheur/discipline-scientifique-expertise-scientifique-edit-chercheur.component';
import { DisciplineScientifiqueExpertiseScientifiqueViewChercheurComponent } from './view/discipline-scientifique-expertise-scientifique-chercheur/view-chercheur/discipline-scientifique-expertise-scientifique-view-chercheur.component';
import { DisciplineScientifiqueExpertiseScientifiqueListChercheurComponent } from './view/discipline-scientifique-expertise-scientifique-chercheur/list-chercheur/discipline-scientifique-expertise-scientifique-list-chercheur.component';
import { DisciplineScientifiqueExpertiseScientifiqueChercheurComponent } from './view/discipline-scientifique-expertise-scientifique-chercheur/discipline-scientifique-expertise-scientifique-chercheur.component';
import { DisciplineScientifiqueErcCreateChercheurComponent } from './view/discipline-scientifique-erc-chercheur/create-chercheur/discipline-scientifique-erc-create-chercheur.component';
import { DisciplineScientifiqueErcEditChercheurComponent } from './view/discipline-scientifique-erc-chercheur/edit-chercheur/discipline-scientifique-erc-edit-chercheur.component';
import { DisciplineScientifiqueErcViewChercheurComponent } from './view/discipline-scientifique-erc-chercheur/view-chercheur/discipline-scientifique-erc-view-chercheur.component';
import { DisciplineScientifiqueErcListChercheurComponent } from './view/discipline-scientifique-erc-chercheur/list-chercheur/discipline-scientifique-erc-list-chercheur.component';
import { DisciplineScientifiqueErcChercheurComponent } from './view/discipline-scientifique-erc-chercheur/discipline-scientifique-erc-chercheur.component';
import { TypeInstanceCreateChercheurComponent } from './view/type-instance-chercheur/create-chercheur/type-instance-create-chercheur.component';
import { TypeInstanceEditChercheurComponent } from './view/type-instance-chercheur/edit-chercheur/type-instance-edit-chercheur.component';
import { TypeInstanceViewChercheurComponent } from './view/type-instance-chercheur/view-chercheur/type-instance-view-chercheur.component';
import { TypeInstanceListChercheurComponent } from './view/type-instance-chercheur/list-chercheur/type-instance-list-chercheur.component';
import { TypeInstanceChercheurComponent } from './view/type-instance-chercheur/type-instance-chercheur.component';
import { NiveauFormationCreateChercheurComponent } from './view/niveau-formation-chercheur/create-chercheur/niveau-formation-create-chercheur.component';
import { NiveauFormationEditChercheurComponent } from './view/niveau-formation-chercheur/edit-chercheur/niveau-formation-edit-chercheur.component';
import { NiveauFormationViewChercheurComponent } from './view/niveau-formation-chercheur/view-chercheur/niveau-formation-view-chercheur.component';
import { NiveauFormationListChercheurComponent } from './view/niveau-formation-chercheur/list-chercheur/niveau-formation-list-chercheur.component';
import { NiveauFormationChercheurComponent } from './view/niveau-formation-chercheur/niveau-formation-chercheur.component';
import { FournisseurAppelProjetRechercheCreateChercheurComponent } from './view/fournisseur-appel-projet-recherche-chercheur/create-chercheur/fournisseur-appel-projet-recherche-create-chercheur.component';
import { FournisseurAppelProjetRechercheEditChercheurComponent } from './view/fournisseur-appel-projet-recherche-chercheur/edit-chercheur/fournisseur-appel-projet-recherche-edit-chercheur.component';
import { FournisseurAppelProjetRechercheViewChercheurComponent } from './view/fournisseur-appel-projet-recherche-chercheur/view-chercheur/fournisseur-appel-projet-recherche-view-chercheur.component';
import { FournisseurAppelProjetRechercheListChercheurComponent } from './view/fournisseur-appel-projet-recherche-chercheur/list-chercheur/fournisseur-appel-projet-recherche-list-chercheur.component';
import { FournisseurAppelProjetRechercheChercheurComponent } from './view/fournisseur-appel-projet-recherche-chercheur/fournisseur-appel-projet-recherche-chercheur.component';
import { OutilPedagogiqueEnjeuxIrdCreateChercheurComponent } from './view/outil-pedagogique-enjeux-ird-chercheur/create-chercheur/outil-pedagogique-enjeux-ird-create-chercheur.component';
import { OutilPedagogiqueEnjeuxIrdEditChercheurComponent } from './view/outil-pedagogique-enjeux-ird-chercheur/edit-chercheur/outil-pedagogique-enjeux-ird-edit-chercheur.component';
import { OutilPedagogiqueEnjeuxIrdViewChercheurComponent } from './view/outil-pedagogique-enjeux-ird-chercheur/view-chercheur/outil-pedagogique-enjeux-ird-view-chercheur.component';
import { OutilPedagogiqueEnjeuxIrdListChercheurComponent } from './view/outil-pedagogique-enjeux-ird-chercheur/list-chercheur/outil-pedagogique-enjeux-ird-list-chercheur.component';
import { OutilPedagogiqueEnjeuxIrdChercheurComponent } from './view/outil-pedagogique-enjeux-ird-chercheur/outil-pedagogique-enjeux-ird-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur/rencontre-grand-publique-jeune-publique-discipline-scientifique-chercheur.component';
import { GestionEquipeCreateChercheurComponent } from './view/gestion-equipe-chercheur/create-chercheur/gestion-equipe-create-chercheur.component';
import { GestionEquipeEditChercheurComponent } from './view/gestion-equipe-chercheur/edit-chercheur/gestion-equipe-edit-chercheur.component';
import { GestionEquipeViewChercheurComponent } from './view/gestion-equipe-chercheur/view-chercheur/gestion-equipe-view-chercheur.component';
import { GestionEquipeListChercheurComponent } from './view/gestion-equipe-chercheur/list-chercheur/gestion-equipe-list-chercheur.component';
import { GestionEquipeChercheurComponent } from './view/gestion-equipe-chercheur/gestion-equipe-chercheur.component';
import { DistinctionCreateChercheurComponent } from './view/distinction-chercheur/create-chercheur/distinction-create-chercheur.component';
import { DistinctionEditChercheurComponent } from './view/distinction-chercheur/edit-chercheur/distinction-edit-chercheur.component';
import { DistinctionViewChercheurComponent } from './view/distinction-chercheur/view-chercheur/distinction-view-chercheur.component';
import { DistinctionListChercheurComponent } from './view/distinction-chercheur/list-chercheur/distinction-list-chercheur.component';
import { DistinctionChercheurComponent } from './view/distinction-chercheur/distinction-chercheur.component';
import { CampagneRelanceCreateChercheurComponent } from './view/campagne-relance-chercheur/create-chercheur/campagne-relance-create-chercheur.component';
import { CampagneRelanceEditChercheurComponent } from './view/campagne-relance-chercheur/edit-chercheur/campagne-relance-edit-chercheur.component';
import { CampagneRelanceViewChercheurComponent } from './view/campagne-relance-chercheur/view-chercheur/campagne-relance-view-chercheur.component';
import { CampagneRelanceListChercheurComponent } from './view/campagne-relance-chercheur/list-chercheur/campagne-relance-list-chercheur.component';
import { CampagneRelanceChercheurComponent } from './view/campagne-relance-chercheur/campagne-relance-chercheur.component';
import { RencontreMediaEnjeuxIrdCreateChercheurComponent } from './view/rencontre-media-enjeux-ird-chercheur/create-chercheur/rencontre-media-enjeux-ird-create-chercheur.component';
import { RencontreMediaEnjeuxIrdEditChercheurComponent } from './view/rencontre-media-enjeux-ird-chercheur/edit-chercheur/rencontre-media-enjeux-ird-edit-chercheur.component';
import { RencontreMediaEnjeuxIrdViewChercheurComponent } from './view/rencontre-media-enjeux-ird-chercheur/view-chercheur/rencontre-media-enjeux-ird-view-chercheur.component';
import { RencontreMediaEnjeuxIrdListChercheurComponent } from './view/rencontre-media-enjeux-ird-chercheur/list-chercheur/rencontre-media-enjeux-ird-list-chercheur.component';
import { RencontreMediaEnjeuxIrdChercheurComponent } from './view/rencontre-media-enjeux-ird-chercheur/rencontre-media-enjeux-ird-chercheur.component';
import { ResponsabilitePedagogiquePaysCreateChercheurComponent } from './view/responsabilite-pedagogique-pays-chercheur/create-chercheur/responsabilite-pedagogique-pays-create-chercheur.component';
import { ResponsabilitePedagogiquePaysEditChercheurComponent } from './view/responsabilite-pedagogique-pays-chercheur/edit-chercheur/responsabilite-pedagogique-pays-edit-chercheur.component';
import { ResponsabilitePedagogiquePaysViewChercheurComponent } from './view/responsabilite-pedagogique-pays-chercheur/view-chercheur/responsabilite-pedagogique-pays-view-chercheur.component';
import { ResponsabilitePedagogiquePaysListChercheurComponent } from './view/responsabilite-pedagogique-pays-chercheur/list-chercheur/responsabilite-pedagogique-pays-list-chercheur.component';
import { ResponsabilitePedagogiquePaysChercheurComponent } from './view/responsabilite-pedagogique-pays-chercheur/responsabilite-pedagogique-pays-chercheur.component';
import { TypePubliqueRencontreMediaCreateChercheurComponent } from './view/type-publique-rencontre-media-chercheur/create-chercheur/type-publique-rencontre-media-create-chercheur.component';
import { TypePubliqueRencontreMediaEditChercheurComponent } from './view/type-publique-rencontre-media-chercheur/edit-chercheur/type-publique-rencontre-media-edit-chercheur.component';
import { TypePubliqueRencontreMediaViewChercheurComponent } from './view/type-publique-rencontre-media-chercheur/view-chercheur/type-publique-rencontre-media-view-chercheur.component';
import { TypePubliqueRencontreMediaListChercheurComponent } from './view/type-publique-rencontre-media-chercheur/list-chercheur/type-publique-rencontre-media-list-chercheur.component';
import { TypePubliqueRencontreMediaChercheurComponent } from './view/type-publique-rencontre-media-chercheur/type-publique-rencontre-media-chercheur.component';
import { FormationContinueEnjeuxIrdCreateChercheurComponent } from './view/formation-continue-enjeux-ird-chercheur/create-chercheur/formation-continue-enjeux-ird-create-chercheur.component';
import { FormationContinueEnjeuxIrdEditChercheurComponent } from './view/formation-continue-enjeux-ird-chercheur/edit-chercheur/formation-continue-enjeux-ird-edit-chercheur.component';
import { FormationContinueEnjeuxIrdViewChercheurComponent } from './view/formation-continue-enjeux-ird-chercheur/view-chercheur/formation-continue-enjeux-ird-view-chercheur.component';
import { FormationContinueEnjeuxIrdListChercheurComponent } from './view/formation-continue-enjeux-ird-chercheur/list-chercheur/formation-continue-enjeux-ird-list-chercheur.component';
import { FormationContinueEnjeuxIrdChercheurComponent } from './view/formation-continue-enjeux-ird-chercheur/formation-continue-enjeux-ird-chercheur.component';
import { TypeExpertiseCreateChercheurComponent } from './view/type-expertise-chercheur/create-chercheur/type-expertise-create-chercheur.component';
import { TypeExpertiseEditChercheurComponent } from './view/type-expertise-chercheur/edit-chercheur/type-expertise-edit-chercheur.component';
import { TypeExpertiseViewChercheurComponent } from './view/type-expertise-chercheur/view-chercheur/type-expertise-view-chercheur.component';
import { TypeExpertiseListChercheurComponent } from './view/type-expertise-chercheur/list-chercheur/type-expertise-list-chercheur.component';
import { TypeExpertiseChercheurComponent } from './view/type-expertise-chercheur/type-expertise-chercheur.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-chercheur/create-chercheur/zone-geographique-consultance-scientifique-ponctuelle-create-chercheur.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/zone-geographique-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-chercheur/view-chercheur/zone-geographique-consultance-scientifique-ponctuelle-view-chercheur.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleListChercheurComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-chercheur/list-chercheur/zone-geographique-consultance-scientifique-ponctuelle-list-chercheur.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleChercheurComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-chercheur/zone-geographique-consultance-scientifique-ponctuelle-chercheur.component';
import { RencontreMediaPeriodeCreateChercheurComponent } from './view/rencontre-media-periode-chercheur/create-chercheur/rencontre-media-periode-create-chercheur.component';
import { RencontreMediaPeriodeEditChercheurComponent } from './view/rencontre-media-periode-chercheur/edit-chercheur/rencontre-media-periode-edit-chercheur.component';
import { RencontreMediaPeriodeViewChercheurComponent } from './view/rencontre-media-periode-chercheur/view-chercheur/rencontre-media-periode-view-chercheur.component';
import { RencontreMediaPeriodeListChercheurComponent } from './view/rencontre-media-periode-chercheur/list-chercheur/rencontre-media-periode-list-chercheur.component';
import { RencontreMediaPeriodeChercheurComponent } from './view/rencontre-media-periode-chercheur/rencontre-media-periode-chercheur.component';
import { PaysRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent } from './view/pays-rencontre-grand-publique-jeune-publique-chercheur/create-chercheur/pays-rencontre-grand-publique-jeune-publique-create-chercheur.component';
import { PaysRencontreGrandPubliqueJeunePubliqueEditChercheurComponent } from './view/pays-rencontre-grand-publique-jeune-publique-chercheur/edit-chercheur/pays-rencontre-grand-publique-jeune-publique-edit-chercheur.component';
import { PaysRencontreGrandPubliqueJeunePubliqueViewChercheurComponent } from './view/pays-rencontre-grand-publique-jeune-publique-chercheur/view-chercheur/pays-rencontre-grand-publique-jeune-publique-view-chercheur.component';
import { PaysRencontreGrandPubliqueJeunePubliqueListChercheurComponent } from './view/pays-rencontre-grand-publique-jeune-publique-chercheur/list-chercheur/pays-rencontre-grand-publique-jeune-publique-list-chercheur.component';
import { PaysRencontreGrandPubliqueJeunePubliqueChercheurComponent } from './view/pays-rencontre-grand-publique-jeune-publique-chercheur/pays-rencontre-grand-publique-jeune-publique-chercheur.component';
import { CommunauteSavoirProjetActiviteRechercheCreateChercheurComponent } from './view/communaute-savoir-projet-activite-recherche-chercheur/create-chercheur/communaute-savoir-projet-activite-recherche-create-chercheur.component';
import { CommunauteSavoirProjetActiviteRechercheEditChercheurComponent } from './view/communaute-savoir-projet-activite-recherche-chercheur/edit-chercheur/communaute-savoir-projet-activite-recherche-edit-chercheur.component';
import { CommunauteSavoirProjetActiviteRechercheViewChercheurComponent } from './view/communaute-savoir-projet-activite-recherche-chercheur/view-chercheur/communaute-savoir-projet-activite-recherche-view-chercheur.component';
import { CommunauteSavoirProjetActiviteRechercheListChercheurComponent } from './view/communaute-savoir-projet-activite-recherche-chercheur/list-chercheur/communaute-savoir-projet-activite-recherche-list-chercheur.component';
import { CommunauteSavoirProjetActiviteRechercheChercheurComponent } from './view/communaute-savoir-projet-activite-recherche-chercheur/communaute-savoir-projet-activite-recherche-chercheur.component';
import { OutilPedagogiqueLangueCreateChercheurComponent } from './view/outil-pedagogique-langue-chercheur/create-chercheur/outil-pedagogique-langue-create-chercheur.component';
import { OutilPedagogiqueLangueEditChercheurComponent } from './view/outil-pedagogique-langue-chercheur/edit-chercheur/outil-pedagogique-langue-edit-chercheur.component';
import { OutilPedagogiqueLangueViewChercheurComponent } from './view/outil-pedagogique-langue-chercheur/view-chercheur/outil-pedagogique-langue-view-chercheur.component';
import { OutilPedagogiqueLangueListChercheurComponent } from './view/outil-pedagogique-langue-chercheur/list-chercheur/outil-pedagogique-langue-list-chercheur.component';
import { OutilPedagogiqueLangueChercheurComponent } from './view/outil-pedagogique-langue-chercheur/outil-pedagogique-langue-chercheur.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-chercheur/create-chercheur/instrument-ird-consultance-scientifique-ponctuelle-create-chercheur.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-chercheur/edit-chercheur/instrument-ird-consultance-scientifique-ponctuelle-edit-chercheur.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-chercheur/view-chercheur/instrument-ird-consultance-scientifique-ponctuelle-view-chercheur.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-chercheur/list-chercheur/instrument-ird-consultance-scientifique-ponctuelle-list-chercheur.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-chercheur/instrument-ird-consultance-scientifique-ponctuelle-chercheur.component';
import { ProjetActiviteRechercheCreateChercheurComponent } from './view/projet-activite-recherche-chercheur/create-chercheur/projet-activite-recherche-create-chercheur.component';
import { ProjetActiviteRechercheEditChercheurComponent } from './view/projet-activite-recherche-chercheur/edit-chercheur/projet-activite-recherche-edit-chercheur.component';
import { ProjetActiviteRechercheViewChercheurComponent } from './view/projet-activite-recherche-chercheur/view-chercheur/projet-activite-recherche-view-chercheur.component';
import { ProjetActiviteRechercheListChercheurComponent } from './view/projet-activite-recherche-chercheur/list-chercheur/projet-activite-recherche-list-chercheur.component';
import { ProjetActiviteRechercheChercheurComponent } from './view/projet-activite-recherche-chercheur/projet-activite-recherche-chercheur.component';
import { ResponsabilitePedagogiqueEtablissementCreateChercheurComponent } from './view/responsabilite-pedagogique-etablissement-chercheur/create-chercheur/responsabilite-pedagogique-etablissement-create-chercheur.component';
import { ResponsabilitePedagogiqueEtablissementEditChercheurComponent } from './view/responsabilite-pedagogique-etablissement-chercheur/edit-chercheur/responsabilite-pedagogique-etablissement-edit-chercheur.component';
import { ResponsabilitePedagogiqueEtablissementViewChercheurComponent } from './view/responsabilite-pedagogique-etablissement-chercheur/view-chercheur/responsabilite-pedagogique-etablissement-view-chercheur.component';
import { ResponsabilitePedagogiqueEtablissementListChercheurComponent } from './view/responsabilite-pedagogique-etablissement-chercheur/list-chercheur/responsabilite-pedagogique-etablissement-list-chercheur.component';
import { ResponsabilitePedagogiqueEtablissementChercheurComponent } from './view/responsabilite-pedagogique-etablissement-chercheur/responsabilite-pedagogique-etablissement-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur/developpement-de-savoir-et-innovation-scientifique-etablissement-chercheur.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateChercheurComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-chercheur/create-chercheur/objet-formation-generique-de-responsabilite-pedagogique-create-chercheur.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditChercheurComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-chercheur/edit-chercheur/objet-formation-generique-de-responsabilite-pedagogique-edit-chercheur.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewChercheurComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-chercheur/view-chercheur/objet-formation-generique-de-responsabilite-pedagogique-view-chercheur.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueListChercheurComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-chercheur/list-chercheur/objet-formation-generique-de-responsabilite-pedagogique-list-chercheur.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueChercheurComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-chercheur/objet-formation-generique-de-responsabilite-pedagogique-chercheur.component';
import { NiveauEtudeCreateChercheurComponent } from './view/niveau-etude-chercheur/create-chercheur/niveau-etude-create-chercheur.component';
import { NiveauEtudeEditChercheurComponent } from './view/niveau-etude-chercheur/edit-chercheur/niveau-etude-edit-chercheur.component';
import { NiveauEtudeViewChercheurComponent } from './view/niveau-etude-chercheur/view-chercheur/niveau-etude-view-chercheur.component';
import { NiveauEtudeListChercheurComponent } from './view/niveau-etude-chercheur/list-chercheur/niveau-etude-list-chercheur.component';
import { NiveauEtudeChercheurComponent } from './view/niveau-etude-chercheur/niveau-etude-chercheur.component';
import { RoleEvaluationCreateChercheurComponent } from './view/role-evaluation-chercheur/create-chercheur/role-evaluation-create-chercheur.component';
import { RoleEvaluationEditChercheurComponent } from './view/role-evaluation-chercheur/edit-chercheur/role-evaluation-edit-chercheur.component';
import { RoleEvaluationViewChercheurComponent } from './view/role-evaluation-chercheur/view-chercheur/role-evaluation-view-chercheur.component';
import { RoleEvaluationListChercheurComponent } from './view/role-evaluation-chercheur/list-chercheur/role-evaluation-list-chercheur.component';
import { RoleEvaluationChercheurComponent } from './view/role-evaluation-chercheur/role-evaluation-chercheur.component';
import { TypeInstrumentIrdChercheurCreateChercheurComponent } from './view/type-instrument-ird-chercheur-chercheur/create-chercheur/type-instrument-ird-chercheur-create-chercheur.component';
import { TypeInstrumentIrdChercheurEditChercheurComponent } from './view/type-instrument-ird-chercheur-chercheur/edit-chercheur/type-instrument-ird-chercheur-edit-chercheur.component';
import { TypeInstrumentIrdChercheurViewChercheurComponent } from './view/type-instrument-ird-chercheur-chercheur/view-chercheur/type-instrument-ird-chercheur-view-chercheur.component';
import { TypeInstrumentIrdChercheurListChercheurComponent } from './view/type-instrument-ird-chercheur-chercheur/list-chercheur/type-instrument-ird-chercheur-list-chercheur.component';
import { TypeInstrumentIrdChercheurChercheurComponent } from './view/type-instrument-ird-chercheur-chercheur/type-instrument-ird-chercheur-chercheur.component';
import { SemanticRelationshipCreateChercheurComponent } from './view/semantic-relationship-chercheur/create-chercheur/semantic-relationship-create-chercheur.component';
import { SemanticRelationshipEditChercheurComponent } from './view/semantic-relationship-chercheur/edit-chercheur/semantic-relationship-edit-chercheur.component';
import { SemanticRelationshipViewChercheurComponent } from './view/semantic-relationship-chercheur/view-chercheur/semantic-relationship-view-chercheur.component';
import { SemanticRelationshipListChercheurComponent } from './view/semantic-relationship-chercheur/list-chercheur/semantic-relationship-list-chercheur.component';
import { SemanticRelationshipChercheurComponent } from './view/semantic-relationship-chercheur/semantic-relationship-chercheur.component';
import { DisciplineScientifiqueEncadrementDoctorantCreateChercheurComponent } from './view/discipline-scientifique-encadrement-doctorant-chercheur/create-chercheur/discipline-scientifique-encadrement-doctorant-create-chercheur.component';
import { DisciplineScientifiqueEncadrementDoctorantEditChercheurComponent } from './view/discipline-scientifique-encadrement-doctorant-chercheur/edit-chercheur/discipline-scientifique-encadrement-doctorant-edit-chercheur.component';
import { DisciplineScientifiqueEncadrementDoctorantViewChercheurComponent } from './view/discipline-scientifique-encadrement-doctorant-chercheur/view-chercheur/discipline-scientifique-encadrement-doctorant-view-chercheur.component';
import { DisciplineScientifiqueEncadrementDoctorantListChercheurComponent } from './view/discipline-scientifique-encadrement-doctorant-chercheur/list-chercheur/discipline-scientifique-encadrement-doctorant-list-chercheur.component';
import { DisciplineScientifiqueEncadrementDoctorantChercheurComponent } from './view/discipline-scientifique-encadrement-doctorant-chercheur/discipline-scientifique-encadrement-doctorant-chercheur.component';
import { PaysRencontreMediaCreateChercheurComponent } from './view/pays-rencontre-media-chercheur/create-chercheur/pays-rencontre-media-create-chercheur.component';
import { PaysRencontreMediaEditChercheurComponent } from './view/pays-rencontre-media-chercheur/edit-chercheur/pays-rencontre-media-edit-chercheur.component';
import { PaysRencontreMediaViewChercheurComponent } from './view/pays-rencontre-media-chercheur/view-chercheur/pays-rencontre-media-view-chercheur.component';
import { PaysRencontreMediaListChercheurComponent } from './view/pays-rencontre-media-chercheur/list-chercheur/pays-rencontre-media-list-chercheur.component';
import { PaysRencontreMediaChercheurComponent } from './view/pays-rencontre-media-chercheur/pays-rencontre-media-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-chercheur/rencontre-grand-publique-jeune-publique-chercheur.component';
import { TypeParticipationCreateChercheurComponent } from './view/type-participation-chercheur/create-chercheur/type-participation-create-chercheur.component';
import { TypeParticipationEditChercheurComponent } from './view/type-participation-chercheur/edit-chercheur/type-participation-edit-chercheur.component';
import { TypeParticipationViewChercheurComponent } from './view/type-participation-chercheur/view-chercheur/type-participation-view-chercheur.component';
import { TypeParticipationListChercheurComponent } from './view/type-participation-chercheur/list-chercheur/type-participation-list-chercheur.component';
import { TypeParticipationChercheurComponent } from './view/type-participation-chercheur/type-participation-chercheur.component';
import { EvenementColloqueScienntifiquePaysCreateChercheurComponent } from './view/evenement-colloque-scienntifique-pays-chercheur/create-chercheur/evenement-colloque-scienntifique-pays-create-chercheur.component';
import { EvenementColloqueScienntifiquePaysEditChercheurComponent } from './view/evenement-colloque-scienntifique-pays-chercheur/edit-chercheur/evenement-colloque-scienntifique-pays-edit-chercheur.component';
import { EvenementColloqueScienntifiquePaysViewChercheurComponent } from './view/evenement-colloque-scienntifique-pays-chercheur/view-chercheur/evenement-colloque-scienntifique-pays-view-chercheur.component';
import { EvenementColloqueScienntifiquePaysListChercheurComponent } from './view/evenement-colloque-scienntifique-pays-chercheur/list-chercheur/evenement-colloque-scienntifique-pays-list-chercheur.component';
import { EvenementColloqueScienntifiquePaysChercheurComponent } from './view/evenement-colloque-scienntifique-pays-chercheur/evenement-colloque-scienntifique-pays-chercheur.component';
import { EtatCampagneCreateChercheurComponent } from './view/etat-campagne-chercheur/create-chercheur/etat-campagne-create-chercheur.component';
import { EtatCampagneEditChercheurComponent } from './view/etat-campagne-chercheur/edit-chercheur/etat-campagne-edit-chercheur.component';
import { EtatCampagneViewChercheurComponent } from './view/etat-campagne-chercheur/view-chercheur/etat-campagne-view-chercheur.component';
import { EtatCampagneListChercheurComponent } from './view/etat-campagne-chercheur/list-chercheur/etat-campagne-list-chercheur.component';
import { EtatCampagneChercheurComponent } from './view/etat-campagne-chercheur/etat-campagne-chercheur.component';
import { TypeEtudeCreateChercheurComponent } from './view/type-etude-chercheur/create-chercheur/type-etude-create-chercheur.component';
import { TypeEtudeEditChercheurComponent } from './view/type-etude-chercheur/edit-chercheur/type-etude-edit-chercheur.component';
import { TypeEtudeViewChercheurComponent } from './view/type-etude-chercheur/view-chercheur/type-etude-view-chercheur.component';
import { TypeEtudeListChercheurComponent } from './view/type-etude-chercheur/list-chercheur/type-etude-list-chercheur.component';
import { TypeEtudeChercheurComponent } from './view/type-etude-chercheur/type-etude-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur/create-chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-create-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur/edit-chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-edit-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur/view-chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-view-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur/list-chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-list-chercheur.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdChercheurComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-chercheur.component';
import { StructureOganisatriceCreateChercheurComponent } from './view/structure-oganisatrice-chercheur/create-chercheur/structure-oganisatrice-create-chercheur.component';
import { StructureOganisatriceEditChercheurComponent } from './view/structure-oganisatrice-chercheur/edit-chercheur/structure-oganisatrice-edit-chercheur.component';
import { StructureOganisatriceViewChercheurComponent } from './view/structure-oganisatrice-chercheur/view-chercheur/structure-oganisatrice-view-chercheur.component';
import { StructureOganisatriceListChercheurComponent } from './view/structure-oganisatrice-chercheur/list-chercheur/structure-oganisatrice-list-chercheur.component';
import { StructureOganisatriceChercheurComponent } from './view/structure-oganisatrice-chercheur/structure-oganisatrice-chercheur.component';
import { DisciplineScientifiqueEncadrementEtudiantCreateChercheurComponent } from './view/discipline-scientifique-encadrement-etudiant-chercheur/create-chercheur/discipline-scientifique-encadrement-etudiant-create-chercheur.component';
import { DisciplineScientifiqueEncadrementEtudiantEditChercheurComponent } from './view/discipline-scientifique-encadrement-etudiant-chercheur/edit-chercheur/discipline-scientifique-encadrement-etudiant-edit-chercheur.component';
import { DisciplineScientifiqueEncadrementEtudiantViewChercheurComponent } from './view/discipline-scientifique-encadrement-etudiant-chercheur/view-chercheur/discipline-scientifique-encadrement-etudiant-view-chercheur.component';
import { DisciplineScientifiqueEncadrementEtudiantListChercheurComponent } from './view/discipline-scientifique-encadrement-etudiant-chercheur/list-chercheur/discipline-scientifique-encadrement-etudiant-list-chercheur.component';
import { DisciplineScientifiqueEncadrementEtudiantChercheurComponent } from './view/discipline-scientifique-encadrement-etudiant-chercheur/discipline-scientifique-encadrement-etudiant-chercheur.component';
import { FormationContinueCommanditaireCreateChercheurComponent } from './view/formation-continue-commanditaire-chercheur/create-chercheur/formation-continue-commanditaire-create-chercheur.component';
import { FormationContinueCommanditaireEditChercheurComponent } from './view/formation-continue-commanditaire-chercheur/edit-chercheur/formation-continue-commanditaire-edit-chercheur.component';
import { FormationContinueCommanditaireViewChercheurComponent } from './view/formation-continue-commanditaire-chercheur/view-chercheur/formation-continue-commanditaire-view-chercheur.component';
import { FormationContinueCommanditaireListChercheurComponent } from './view/formation-continue-commanditaire-chercheur/list-chercheur/formation-continue-commanditaire-list-chercheur.component';
import { FormationContinueCommanditaireChercheurComponent } from './view/formation-continue-commanditaire-chercheur/formation-continue-commanditaire-chercheur.component';
import { TemplateRappelCreateChercheurComponent } from './view/template-rappel-chercheur/create-chercheur/template-rappel-create-chercheur.component';
import { TemplateRappelEditChercheurComponent } from './view/template-rappel-chercheur/edit-chercheur/template-rappel-edit-chercheur.component';
import { TemplateRappelViewChercheurComponent } from './view/template-rappel-chercheur/view-chercheur/template-rappel-view-chercheur.component';
import { TemplateRappelListChercheurComponent } from './view/template-rappel-chercheur/list-chercheur/template-rappel-list-chercheur.component';
import { TemplateRappelChercheurComponent } from './view/template-rappel-chercheur/template-rappel-chercheur.component';
import { AffectationStructurelleCreateChercheurComponent } from './view/affectation-structurelle-chercheur/create-chercheur/affectation-structurelle-create-chercheur.component';
import { AffectationStructurelleEditChercheurComponent } from './view/affectation-structurelle-chercheur/edit-chercheur/affectation-structurelle-edit-chercheur.component';
import { AffectationStructurelleViewChercheurComponent } from './view/affectation-structurelle-chercheur/view-chercheur/affectation-structurelle-view-chercheur.component';
import { AffectationStructurelleListChercheurComponent } from './view/affectation-structurelle-chercheur/list-chercheur/affectation-structurelle-list-chercheur.component';
import { AffectationStructurelleChercheurComponent } from './view/affectation-structurelle-chercheur/affectation-structurelle-chercheur.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur/create-chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique-create-chercheur.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur/edit-chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique-edit-chercheur.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur/view-chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique-view-chercheur.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur/list-chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique-list-chercheur.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur/caracterisation-developpement-de-savoir-et-innovation-scientifique-chercheur.component';
import { PaysCommanditaireCreateChercheurComponent } from './view/pays-commanditaire-chercheur/create-chercheur/pays-commanditaire-create-chercheur.component';
import { PaysCommanditaireEditChercheurComponent } from './view/pays-commanditaire-chercheur/edit-chercheur/pays-commanditaire-edit-chercheur.component';
import { PaysCommanditaireViewChercheurComponent } from './view/pays-commanditaire-chercheur/view-chercheur/pays-commanditaire-view-chercheur.component';
import { PaysCommanditaireListChercheurComponent } from './view/pays-commanditaire-chercheur/list-chercheur/pays-commanditaire-list-chercheur.component';
import { PaysCommanditaireChercheurComponent } from './view/pays-commanditaire-chercheur/pays-commanditaire-chercheur.component';
import { FormatRencontreCreateChercheurComponent } from './view/format-rencontre-chercheur/create-chercheur/format-rencontre-create-chercheur.component';
import { FormatRencontreEditChercheurComponent } from './view/format-rencontre-chercheur/edit-chercheur/format-rencontre-edit-chercheur.component';
import { FormatRencontreViewChercheurComponent } from './view/format-rencontre-chercheur/view-chercheur/format-rencontre-view-chercheur.component';
import { FormatRencontreListChercheurComponent } from './view/format-rencontre-chercheur/list-chercheur/format-rencontre-list-chercheur.component';
import { FormatRencontreChercheurComponent } from './view/format-rencontre-chercheur/format-rencontre-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur/create-chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird-create-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur/edit-chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird-edit-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur/view-chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird-view-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur/list-chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird-list-chercheur.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdChercheurComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur/rencontre-grand-publique-jeune-publique-type-instrument-ird-chercheur.component';
import { TypeReclamationCreateChercheurComponent } from './view/type-reclamation-chercheur/create-chercheur/type-reclamation-create-chercheur.component';
import { TypeReclamationEditChercheurComponent } from './view/type-reclamation-chercheur/edit-chercheur/type-reclamation-edit-chercheur.component';
import { TypeReclamationViewChercheurComponent } from './view/type-reclamation-chercheur/view-chercheur/type-reclamation-view-chercheur.component';
import { TypeReclamationListChercheurComponent } from './view/type-reclamation-chercheur/list-chercheur/type-reclamation-list-chercheur.component';
import { TypeReclamationChercheurComponent } from './view/type-reclamation-chercheur/type-reclamation-chercheur.component';
import { FormationContinueDisciplineScientifiqueCreateChercheurComponent } from './view/formation-continue-discipline-scientifique-chercheur/create-chercheur/formation-continue-discipline-scientifique-create-chercheur.component';
import { FormationContinueDisciplineScientifiqueEditChercheurComponent } from './view/formation-continue-discipline-scientifique-chercheur/edit-chercheur/formation-continue-discipline-scientifique-edit-chercheur.component';
import { FormationContinueDisciplineScientifiqueViewChercheurComponent } from './view/formation-continue-discipline-scientifique-chercheur/view-chercheur/formation-continue-discipline-scientifique-view-chercheur.component';
import { FormationContinueDisciplineScientifiqueListChercheurComponent } from './view/formation-continue-discipline-scientifique-chercheur/list-chercheur/formation-continue-discipline-scientifique-list-chercheur.component';
import { FormationContinueDisciplineScientifiqueChercheurComponent } from './view/formation-continue-discipline-scientifique-chercheur/formation-continue-discipline-scientifique-chercheur.component';
import { EnjeuxIrdEncadrementDoctorantCreateChercheurComponent } from './view/enjeux-ird-encadrement-doctorant-chercheur/create-chercheur/enjeux-ird-encadrement-doctorant-create-chercheur.component';
import { EnjeuxIrdEncadrementDoctorantEditChercheurComponent } from './view/enjeux-ird-encadrement-doctorant-chercheur/edit-chercheur/enjeux-ird-encadrement-doctorant-edit-chercheur.component';
import { EnjeuxIrdEncadrementDoctorantViewChercheurComponent } from './view/enjeux-ird-encadrement-doctorant-chercheur/view-chercheur/enjeux-ird-encadrement-doctorant-view-chercheur.component';
import { EnjeuxIrdEncadrementDoctorantListChercheurComponent } from './view/enjeux-ird-encadrement-doctorant-chercheur/list-chercheur/enjeux-ird-encadrement-doctorant-list-chercheur.component';
import { EnjeuxIrdEncadrementDoctorantChercheurComponent } from './view/enjeux-ird-encadrement-doctorant-chercheur/enjeux-ird-encadrement-doctorant-chercheur.component';
import { EnseignementNatureCreateChercheurComponent } from './view/enseignement-nature-chercheur/create-chercheur/enseignement-nature-create-chercheur.component';
import { EnseignementNatureEditChercheurComponent } from './view/enseignement-nature-chercheur/edit-chercheur/enseignement-nature-edit-chercheur.component';
import { EnseignementNatureViewChercheurComponent } from './view/enseignement-nature-chercheur/view-chercheur/enseignement-nature-view-chercheur.component';
import { EnseignementNatureListChercheurComponent } from './view/enseignement-nature-chercheur/list-chercheur/enseignement-nature-list-chercheur.component';
import { EnseignementNatureChercheurComponent } from './view/enseignement-nature-chercheur/enseignement-nature-chercheur.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur/create-chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique-create-chercheur.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur/edit-chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique-edit-chercheur.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur/view-chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique-view-chercheur.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur/list-chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique-list-chercheur.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur/type-savoir-developpement-de-savoir-et-innovation-scientifique-chercheur.component';
import { NiveauEtudeEnseignementCreateChercheurComponent } from './view/niveau-etude-enseignement-chercheur/create-chercheur/niveau-etude-enseignement-create-chercheur.component';
import { NiveauEtudeEnseignementEditChercheurComponent } from './view/niveau-etude-enseignement-chercheur/edit-chercheur/niveau-etude-enseignement-edit-chercheur.component';
import { NiveauEtudeEnseignementViewChercheurComponent } from './view/niveau-etude-enseignement-chercheur/view-chercheur/niveau-etude-enseignement-view-chercheur.component';
import { NiveauEtudeEnseignementListChercheurComponent } from './view/niveau-etude-enseignement-chercheur/list-chercheur/niveau-etude-enseignement-list-chercheur.component';
import { NiveauEtudeEnseignementChercheurComponent } from './view/niveau-etude-enseignement-chercheur/niveau-etude-enseignement-chercheur.component';
import { CommissionScientifiqueCreateChercheurComponent } from './view/commission-scientifique-chercheur/create-chercheur/commission-scientifique-create-chercheur.component';
import { CommissionScientifiqueEditChercheurComponent } from './view/commission-scientifique-chercheur/edit-chercheur/commission-scientifique-edit-chercheur.component';
import { CommissionScientifiqueViewChercheurComponent } from './view/commission-scientifique-chercheur/view-chercheur/commission-scientifique-view-chercheur.component';
import { CommissionScientifiqueListChercheurComponent } from './view/commission-scientifique-chercheur/list-chercheur/commission-scientifique-list-chercheur.component';
import { CommissionScientifiqueChercheurComponent } from './view/commission-scientifique-chercheur/commission-scientifique-chercheur.component';
import { CategorieNotificationCreateChercheurComponent } from './view/categorie-notification-chercheur/create-chercheur/categorie-notification-create-chercheur.component';
import { CategorieNotificationEditChercheurComponent } from './view/categorie-notification-chercheur/edit-chercheur/categorie-notification-edit-chercheur.component';
import { CategorieNotificationViewChercheurComponent } from './view/categorie-notification-chercheur/view-chercheur/categorie-notification-view-chercheur.component';
import { CategorieNotificationListChercheurComponent } from './view/categorie-notification-chercheur/list-chercheur/categorie-notification-list-chercheur.component';
import { CategorieNotificationChercheurComponent } from './view/categorie-notification-chercheur/categorie-notification-chercheur.component';
import { ChercheurCreateChercheurComponent } from './view/chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import { ChercheurEditChercheurComponent } from './view/chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import { ChercheurViewChercheurComponent } from './view/chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import { ChercheurListChercheurComponent } from './view/chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import { ChercheurChercheurComponent } from './view/chercheur-chercheur/chercheur-chercheur.component';
import { EtablissementConseilsScientifiqueCreateChercheurComponent } from './view/etablissement-conseils-scientifique-chercheur/create-chercheur/etablissement-conseils-scientifique-create-chercheur.component';
import { EtablissementConseilsScientifiqueEditChercheurComponent } from './view/etablissement-conseils-scientifique-chercheur/edit-chercheur/etablissement-conseils-scientifique-edit-chercheur.component';
import { EtablissementConseilsScientifiqueViewChercheurComponent } from './view/etablissement-conseils-scientifique-chercheur/view-chercheur/etablissement-conseils-scientifique-view-chercheur.component';
import { EtablissementConseilsScientifiqueListChercheurComponent } from './view/etablissement-conseils-scientifique-chercheur/list-chercheur/etablissement-conseils-scientifique-list-chercheur.component';
import { EtablissementConseilsScientifiqueChercheurComponent } from './view/etablissement-conseils-scientifique-chercheur/etablissement-conseils-scientifique-chercheur.component';
import { CampagneCreateChercheurComponent } from './view/campagne-chercheur/create-chercheur/campagne-create-chercheur.component';
import { CampagneEditChercheurComponent } from './view/campagne-chercheur/edit-chercheur/campagne-edit-chercheur.component';
import { CampagneViewChercheurComponent } from './view/campagne-chercheur/view-chercheur/campagne-view-chercheur.component';
import { CampagneListChercheurComponent } from './view/campagne-chercheur/list-chercheur/campagne-list-chercheur.component';
import { CampagneChercheurComponent } from './view/campagne-chercheur/campagne-chercheur.component';
import { SexeCreateChercheurComponent } from './view/sexe-chercheur/create-chercheur/sexe-create-chercheur.component';
import { SexeEditChercheurComponent } from './view/sexe-chercheur/edit-chercheur/sexe-edit-chercheur.component';
import { SexeViewChercheurComponent } from './view/sexe-chercheur/view-chercheur/sexe-view-chercheur.component';
import { SexeListChercheurComponent } from './view/sexe-chercheur/list-chercheur/sexe-list-chercheur.component';
import { SexeChercheurComponent } from './view/sexe-chercheur/sexe-chercheur.component';
import { EtatCampagneChercheurCreateChercheurComponent } from './view/etat-campagne-chercheur-chercheur/create-chercheur/etat-campagne-chercheur-create-chercheur.component';
import { EtatCampagneChercheurEditChercheurComponent } from './view/etat-campagne-chercheur-chercheur/edit-chercheur/etat-campagne-chercheur-edit-chercheur.component';
import { EtatCampagneChercheurViewChercheurComponent } from './view/etat-campagne-chercheur-chercheur/view-chercheur/etat-campagne-chercheur-view-chercheur.component';
import { EtatCampagneChercheurListChercheurComponent } from './view/etat-campagne-chercheur-chercheur/list-chercheur/etat-campagne-chercheur-list-chercheur.component';
import { EtatCampagneChercheurChercheurComponent } from './view/etat-campagne-chercheur-chercheur/etat-campagne-chercheur-chercheur.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

@NgModule({
  declarations: [
   LoginChercheurComponent,
   RegisterChercheurComponent,
    GestionEquipeDetailCreateChercheurComponent,
    GestionEquipeDetailListChercheurComponent,
    GestionEquipeDetailViewChercheurComponent,
    GestionEquipeDetailEditChercheurComponent,
    GestionEquipeDetailChercheurComponent,
    LangueCreateChercheurComponent,
    LangueListChercheurComponent,
    LangueViewChercheurComponent,
    LangueEditChercheurComponent,
    LangueChercheurComponent,
    OutilPedagogiquePubliqueCibleCreateChercheurComponent,
    OutilPedagogiquePubliqueCibleListChercheurComponent,
    OutilPedagogiquePubliqueCibleViewChercheurComponent,
    OutilPedagogiquePubliqueCibleEditChercheurComponent,
    OutilPedagogiquePubliqueCibleChercheurComponent,
    StatusContratEtConventionCreateChercheurComponent,
    StatusContratEtConventionListChercheurComponent,
    StatusContratEtConventionViewChercheurComponent,
    StatusContratEtConventionEditChercheurComponent,
    StatusContratEtConventionChercheurComponent,
    ResponsabilitePedagogiqueCreateChercheurComponent,
    ResponsabilitePedagogiqueListChercheurComponent,
    ResponsabilitePedagogiqueViewChercheurComponent,
    ResponsabilitePedagogiqueEditChercheurComponent,
    ResponsabilitePedagogiqueChercheurComponent,
    ConseilEtComiteScientifiqueCreateChercheurComponent,
    ConseilEtComiteScientifiqueListChercheurComponent,
    ConseilEtComiteScientifiqueViewChercheurComponent,
    ConseilEtComiteScientifiqueEditChercheurComponent,
    ConseilEtComiteScientifiqueChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirChercheurComponent,
    TypeEtudeEnseignementCreateChercheurComponent,
    TypeEtudeEnseignementListChercheurComponent,
    TypeEtudeEnseignementViewChercheurComponent,
    TypeEtudeEnseignementEditChercheurComponent,
    TypeEtudeEnseignementChercheurComponent,
    SavoirEtInnovationCreateChercheurComponent,
    SavoirEtInnovationListChercheurComponent,
    SavoirEtInnovationViewChercheurComponent,
    SavoirEtInnovationEditChercheurComponent,
    SavoirEtInnovationChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
    EnseignementZoneGeographiqueCreateChercheurComponent,
    EnseignementZoneGeographiqueListChercheurComponent,
    EnseignementZoneGeographiqueViewChercheurComponent,
    EnseignementZoneGeographiqueEditChercheurComponent,
    EnseignementZoneGeographiqueChercheurComponent,
    IdentifiantAuteurExpertCreateChercheurComponent,
    IdentifiantAuteurExpertListChercheurComponent,
    IdentifiantAuteurExpertViewChercheurComponent,
    IdentifiantAuteurExpertEditChercheurComponent,
    IdentifiantAuteurExpertChercheurComponent,
    CommunauteSavoirEncadrementDoctorantCreateChercheurComponent,
    CommunauteSavoirEncadrementDoctorantListChercheurComponent,
    CommunauteSavoirEncadrementDoctorantViewChercheurComponent,
    CommunauteSavoirEncadrementDoctorantEditChercheurComponent,
    CommunauteSavoirEncadrementDoctorantChercheurComponent,
    ZoneActiviteInteractionRechercheCreateChercheurComponent,
    ZoneActiviteInteractionRechercheListChercheurComponent,
    ZoneActiviteInteractionRechercheViewChercheurComponent,
    ZoneActiviteInteractionRechercheEditChercheurComponent,
    ZoneActiviteInteractionRechercheChercheurComponent,
    DisciplineScientifiqueConseilsScientifiqueCreateChercheurComponent,
    DisciplineScientifiqueConseilsScientifiqueListChercheurComponent,
    DisciplineScientifiqueConseilsScientifiqueViewChercheurComponent,
    DisciplineScientifiqueConseilsScientifiqueEditChercheurComponent,
    DisciplineScientifiqueConseilsScientifiqueChercheurComponent,
    VieInstitutionnelleCreateChercheurComponent,
    VieInstitutionnelleListChercheurComponent,
    VieInstitutionnelleViewChercheurComponent,
    VieInstitutionnelleEditChercheurComponent,
    VieInstitutionnelleChercheurComponent,
    CommunauteSavoirEncadrementEtudiantCreateChercheurComponent,
    CommunauteSavoirEncadrementEtudiantListChercheurComponent,
    CommunauteSavoirEncadrementEtudiantViewChercheurComponent,
    CommunauteSavoirEncadrementEtudiantEditChercheurComponent,
    CommunauteSavoirEncadrementEtudiantChercheurComponent,
    ConseilsScientifiqueCreateChercheurComponent,
    ConseilsScientifiqueListChercheurComponent,
    ConseilsScientifiqueViewChercheurComponent,
    ConseilsScientifiqueEditChercheurComponent,
    ConseilsScientifiqueChercheurComponent,
    InstrumentsEtDispositifsIrdCreateChercheurComponent,
    InstrumentsEtDispositifsIrdListChercheurComponent,
    InstrumentsEtDispositifsIrdViewChercheurComponent,
    InstrumentsEtDispositifsIrdEditChercheurComponent,
    InstrumentsEtDispositifsIrdChercheurComponent,
    EtatReclamationCreateChercheurComponent,
    EtatReclamationListChercheurComponent,
    EtatReclamationViewChercheurComponent,
    EtatReclamationEditChercheurComponent,
    EtatReclamationChercheurComponent,
    NotificationCreateChercheurComponent,
    NotificationListChercheurComponent,
    NotificationViewChercheurComponent,
    NotificationEditChercheurComponent,
    NotificationChercheurComponent,
    VieInstitutionnelleDetailEtablissementCreateChercheurComponent,
    VieInstitutionnelleDetailEtablissementListChercheurComponent,
    VieInstitutionnelleDetailEtablissementViewChercheurComponent,
    VieInstitutionnelleDetailEtablissementEditChercheurComponent,
    VieInstitutionnelleDetailEtablissementChercheurComponent,
    OutilPedagogiqueInstrumentIrdCreateChercheurComponent,
    OutilPedagogiqueInstrumentIrdListChercheurComponent,
    OutilPedagogiqueInstrumentIrdViewChercheurComponent,
    OutilPedagogiqueInstrumentIrdEditChercheurComponent,
    OutilPedagogiqueInstrumentIrdChercheurComponent,
    OutilPedagogiqueCreateChercheurComponent,
    OutilPedagogiqueListChercheurComponent,
    OutilPedagogiqueViewChercheurComponent,
    OutilPedagogiqueEditChercheurComponent,
    OutilPedagogiqueChercheurComponent,
    TypeOutilPedagogiqueCreateChercheurComponent,
    TypeOutilPedagogiqueListChercheurComponent,
    TypeOutilPedagogiqueViewChercheurComponent,
    TypeOutilPedagogiqueEditChercheurComponent,
    TypeOutilPedagogiqueChercheurComponent,
    DisciplineScientifiqueChercheurCreateChercheurComponent,
    DisciplineScientifiqueChercheurListChercheurComponent,
    DisciplineScientifiqueChercheurViewChercheurComponent,
    DisciplineScientifiqueChercheurEditChercheurComponent,
    DisciplineScientifiqueChercheurChercheurComponent,
    OutilPedagogiquePaysDiffusionCreateChercheurComponent,
    OutilPedagogiquePaysDiffusionListChercheurComponent,
    OutilPedagogiquePaysDiffusionViewChercheurComponent,
    OutilPedagogiquePaysDiffusionEditChercheurComponent,
    OutilPedagogiquePaysDiffusionChercheurComponent,
    RencontreMediaDisciplineScientifiqueCreateChercheurComponent,
    RencontreMediaDisciplineScientifiqueListChercheurComponent,
    RencontreMediaDisciplineScientifiqueViewChercheurComponent,
    RencontreMediaDisciplineScientifiqueEditChercheurComponent,
    RencontreMediaDisciplineScientifiqueChercheurComponent,
    CommunauteSavoirEvenementColloqueScientifiqueCreateChercheurComponent,
    CommunauteSavoirEvenementColloqueScientifiqueListChercheurComponent,
    CommunauteSavoirEvenementColloqueScientifiqueViewChercheurComponent,
    CommunauteSavoirEvenementColloqueScientifiqueEditChercheurComponent,
    CommunauteSavoirEvenementColloqueScientifiqueChercheurComponent,
    VieInstitutionnelleDetailCreateChercheurComponent,
    VieInstitutionnelleDetailListChercheurComponent,
    VieInstitutionnelleDetailViewChercheurComponent,
    VieInstitutionnelleDetailEditChercheurComponent,
    VieInstitutionnelleDetailChercheurComponent,
    NiveauResponsabilitePedagogiqueCreateChercheurComponent,
    NiveauResponsabilitePedagogiqueListChercheurComponent,
    NiveauResponsabilitePedagogiqueViewChercheurComponent,
    NiveauResponsabilitePedagogiqueEditChercheurComponent,
    NiveauResponsabilitePedagogiqueChercheurComponent,
    ZoneGeographiqueConseilsScientifiqueCreateChercheurComponent,
    ZoneGeographiqueConseilsScientifiqueListChercheurComponent,
    ZoneGeographiqueConseilsScientifiqueViewChercheurComponent,
    ZoneGeographiqueConseilsScientifiqueEditChercheurComponent,
    ZoneGeographiqueConseilsScientifiqueChercheurComponent,
    EtablissementConsultanceScientifiquePonctuelleCreateChercheurComponent,
    EtablissementConsultanceScientifiquePonctuelleListChercheurComponent,
    EtablissementConsultanceScientifiquePonctuelleViewChercheurComponent,
    EtablissementConsultanceScientifiquePonctuelleEditChercheurComponent,
    EtablissementConsultanceScientifiquePonctuelleChercheurComponent,
    CampagneRelanceChercheurCreateChercheurComponent,
    CampagneRelanceChercheurListChercheurComponent,
    CampagneRelanceChercheurViewChercheurComponent,
    CampagneRelanceChercheurEditChercheurComponent,
    CampagneRelanceChercheurChercheurComponent,
    ContratEtConventionIrdCreateChercheurComponent,
    ContratEtConventionIrdListChercheurComponent,
    ContratEtConventionIrdViewChercheurComponent,
    ContratEtConventionIrdEditChercheurComponent,
    ContratEtConventionIrdChercheurComponent,
    ProjetActiviteRechercheDetailPaysCreateChercheurComponent,
    ProjetActiviteRechercheDetailPaysListChercheurComponent,
    ProjetActiviteRechercheDetailPaysViewChercheurComponent,
    ProjetActiviteRechercheDetailPaysEditChercheurComponent,
    ProjetActiviteRechercheDetailPaysChercheurComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeListChercheurComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeChercheurComponent,
    PaysFormationContinueCreateChercheurComponent,
    PaysFormationContinueListChercheurComponent,
    PaysFormationContinueViewChercheurComponent,
    PaysFormationContinueEditChercheurComponent,
    PaysFormationContinueChercheurComponent,
    VieInstitutionnelleDetailInstrumentIrdCreateChercheurComponent,
    VieInstitutionnelleDetailInstrumentIrdListChercheurComponent,
    VieInstitutionnelleDetailInstrumentIrdViewChercheurComponent,
    VieInstitutionnelleDetailInstrumentIrdEditChercheurComponent,
    VieInstitutionnelleDetailInstrumentIrdChercheurComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdCreateChercheurComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdListChercheurComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdViewChercheurComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdEditChercheurComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdChercheurComponent,
    CultureScientifiqueCreateChercheurComponent,
    CultureScientifiqueListChercheurComponent,
    CultureScientifiqueViewChercheurComponent,
    CultureScientifiqueEditChercheurComponent,
    CultureScientifiqueChercheurComponent,
    EnseignementCreateChercheurComponent,
    EnseignementListChercheurComponent,
    EnseignementViewChercheurComponent,
    EnseignementEditChercheurComponent,
    EnseignementChercheurComponent,
    PaysZoneGeographiqueCreateChercheurComponent,
    PaysZoneGeographiqueListChercheurComponent,
    PaysZoneGeographiqueViewChercheurComponent,
    PaysZoneGeographiqueEditChercheurComponent,
    PaysZoneGeographiqueChercheurComponent,
    EncadrementEtudiantCreateChercheurComponent,
    EncadrementEtudiantListChercheurComponent,
    EncadrementEtudiantViewChercheurComponent,
    EncadrementEtudiantEditChercheurComponent,
    EncadrementEtudiantChercheurComponent,
    EnjeuxIrdComiteEtCommissionEvaluationCreateChercheurComponent,
    EnjeuxIrdComiteEtCommissionEvaluationListChercheurComponent,
    EnjeuxIrdComiteEtCommissionEvaluationViewChercheurComponent,
    EnjeuxIrdComiteEtCommissionEvaluationEditChercheurComponent,
    EnjeuxIrdComiteEtCommissionEvaluationChercheurComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateChercheurComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationListChercheurComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationViewChercheurComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationEditChercheurComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationChercheurComponent,
    RencontreMediaCreateChercheurComponent,
    RencontreMediaListChercheurComponent,
    RencontreMediaViewChercheurComponent,
    RencontreMediaEditChercheurComponent,
    RencontreMediaChercheurComponent,
    ReclamationCreateChercheurComponent,
    ReclamationListChercheurComponent,
    ReclamationViewChercheurComponent,
    ReclamationEditChercheurComponent,
    ReclamationChercheurComponent,
    EncadrementEtudiantEnjeuxIrdCreateChercheurComponent,
    EncadrementEtudiantEnjeuxIrdListChercheurComponent,
    EncadrementEtudiantEnjeuxIrdViewChercheurComponent,
    EncadrementEtudiantEnjeuxIrdEditChercheurComponent,
    EncadrementEtudiantEnjeuxIrdChercheurComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurCreateChercheurComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurListChercheurComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurViewChercheurComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurEditChercheurComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurChercheurComponent,
    CampagneRappelCreateChercheurComponent,
    CampagneRappelListChercheurComponent,
    CampagneRappelViewChercheurComponent,
    CampagneRappelEditChercheurComponent,
    CampagneRappelChercheurComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueCreateChercheurComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueListChercheurComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueViewChercheurComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueEditChercheurComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueChercheurComponent,
    OutilPedagogiqueDisciplineScientifiqueCreateChercheurComponent,
    OutilPedagogiqueDisciplineScientifiqueListChercheurComponent,
    OutilPedagogiqueDisciplineScientifiqueViewChercheurComponent,
    OutilPedagogiqueDisciplineScientifiqueEditChercheurComponent,
    OutilPedagogiqueDisciplineScientifiqueChercheurComponent,
    CampagneRappelChercheurCreateChercheurComponent,
    CampagneRappelChercheurListChercheurComponent,
    CampagneRappelChercheurViewChercheurComponent,
    CampagneRappelChercheurEditChercheurComponent,
    CampagneRappelChercheurChercheurComponent,
    EncadrementCreateChercheurComponent,
    EncadrementListChercheurComponent,
    EncadrementViewChercheurComponent,
    EncadrementEditChercheurComponent,
    EncadrementChercheurComponent,
    EnjeuxIrdConseilsScientifiqueCreateChercheurComponent,
    EnjeuxIrdConseilsScientifiqueListChercheurComponent,
    EnjeuxIrdConseilsScientifiqueViewChercheurComponent,
    EnjeuxIrdConseilsScientifiqueEditChercheurComponent,
    EnjeuxIrdConseilsScientifiqueChercheurComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateChercheurComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleListChercheurComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleViewChercheurComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleEditChercheurComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleChercheurComponent,
    FormationContinuePubliqueProfessionelCreateChercheurComponent,
    FormationContinuePubliqueProfessionelListChercheurComponent,
    FormationContinuePubliqueProfessionelViewChercheurComponent,
    FormationContinuePubliqueProfessionelEditChercheurComponent,
    FormationContinuePubliqueProfessionelChercheurComponent,
    EnseignementEnjeuxIrdCreateChercheurComponent,
    EnseignementEnjeuxIrdListChercheurComponent,
    EnseignementEnjeuxIrdViewChercheurComponent,
    EnseignementEnjeuxIrdEditChercheurComponent,
    EnseignementEnjeuxIrdChercheurComponent,
    InstrumentIrdComiteEtCommissionEvaluationCreateChercheurComponent,
    InstrumentIrdComiteEtCommissionEvaluationListChercheurComponent,
    InstrumentIrdComiteEtCommissionEvaluationViewChercheurComponent,
    InstrumentIrdComiteEtCommissionEvaluationEditChercheurComponent,
    InstrumentIrdComiteEtCommissionEvaluationChercheurComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueCreateChercheurComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueListChercheurComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueViewChercheurComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueEditChercheurComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueChercheurComponent,
    EtatEtapeCampagneCreateChercheurComponent,
    EtatEtapeCampagneListChercheurComponent,
    EtatEtapeCampagneViewChercheurComponent,
    EtatEtapeCampagneEditChercheurComponent,
    EtatEtapeCampagneChercheurComponent,
    ProjetActiviteRechercheDetailCreateChercheurComponent,
    ProjetActiviteRechercheDetailListChercheurComponent,
    ProjetActiviteRechercheDetailViewChercheurComponent,
    ProjetActiviteRechercheDetailEditChercheurComponent,
    ProjetActiviteRechercheDetailChercheurComponent,
    ExpertiseCreateChercheurComponent,
    ExpertiseListChercheurComponent,
    ExpertiseViewChercheurComponent,
    ExpertiseEditChercheurComponent,
    ExpertiseChercheurComponent,
    TypePubliqueCreateChercheurComponent,
    TypePubliqueListChercheurComponent,
    TypePubliqueViewChercheurComponent,
    TypePubliqueEditChercheurComponent,
    TypePubliqueChercheurComponent,
    CampagneChercheurOuvertureCreateChercheurComponent,
    CampagneChercheurOuvertureListChercheurComponent,
    CampagneChercheurOuvertureViewChercheurComponent,
    CampagneChercheurOuvertureEditChercheurComponent,
    CampagneChercheurOuvertureChercheurComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleListChercheurComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleChercheurComponent,
    EtablissementComiteEtCommissionEvaluationCreateChercheurComponent,
    EtablissementComiteEtCommissionEvaluationListChercheurComponent,
    EtablissementComiteEtCommissionEvaluationViewChercheurComponent,
    EtablissementComiteEtCommissionEvaluationEditChercheurComponent,
    EtablissementComiteEtCommissionEvaluationChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionChercheurComponent,
    ResponsabilitePedagogiqueEnjeuxIrdCreateChercheurComponent,
    ResponsabilitePedagogiqueEnjeuxIrdListChercheurComponent,
    ResponsabilitePedagogiqueEnjeuxIrdViewChercheurComponent,
    ResponsabilitePedagogiqueEnjeuxIrdEditChercheurComponent,
    ResponsabilitePedagogiqueEnjeuxIrdChercheurComponent,
    FaqCreateChercheurComponent,
    FaqListChercheurComponent,
    FaqViewChercheurComponent,
    FaqEditChercheurComponent,
    FaqChercheurComponent,
    ExpertiseScientifiqueCreateChercheurComponent,
    ExpertiseScientifiqueListChercheurComponent,
    ExpertiseScientifiqueViewChercheurComponent,
    ExpertiseScientifiqueEditChercheurComponent,
    ExpertiseScientifiqueChercheurComponent,
    EtablissementEnseignementCreateChercheurComponent,
    EtablissementEnseignementListChercheurComponent,
    EtablissementEnseignementViewChercheurComponent,
    EtablissementEnseignementEditChercheurComponent,
    EtablissementEnseignementChercheurComponent,
    OutilPedagogiquePaysConceptionCreateChercheurComponent,
    OutilPedagogiquePaysConceptionListChercheurComponent,
    OutilPedagogiquePaysConceptionViewChercheurComponent,
    OutilPedagogiquePaysConceptionEditChercheurComponent,
    OutilPedagogiquePaysConceptionChercheurComponent,
    CampagneChercheurFermetureCreateChercheurComponent,
    CampagneChercheurFermetureListChercheurComponent,
    CampagneChercheurFermetureViewChercheurComponent,
    CampagneChercheurFermetureEditChercheurComponent,
    CampagneChercheurFermetureChercheurComponent,
    EncadrementDoctorantCreateChercheurComponent,
    EncadrementDoctorantListChercheurComponent,
    EncadrementDoctorantViewChercheurComponent,
    EncadrementDoctorantEditChercheurComponent,
    EncadrementDoctorantChercheurComponent,
    CommunauteSavoirConseilEtComiteScientifiqueCreateChercheurComponent,
    CommunauteSavoirConseilEtComiteScientifiqueListChercheurComponent,
    CommunauteSavoirConseilEtComiteScientifiqueViewChercheurComponent,
    CommunauteSavoirConseilEtComiteScientifiqueEditChercheurComponent,
    CommunauteSavoirConseilEtComiteScientifiqueChercheurComponent,
    OutilPedagogiqueTypeInstrumentIrdCreateChercheurComponent,
    OutilPedagogiqueTypeInstrumentIrdListChercheurComponent,
    OutilPedagogiqueTypeInstrumentIrdViewChercheurComponent,
    OutilPedagogiqueTypeInstrumentIrdEditChercheurComponent,
    OutilPedagogiqueTypeInstrumentIrdChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueChercheurComponent,
    RoleComiteEtCommissionEvaluationCreateChercheurComponent,
    RoleComiteEtCommissionEvaluationListChercheurComponent,
    RoleComiteEtCommissionEvaluationViewChercheurComponent,
    RoleComiteEtCommissionEvaluationEditChercheurComponent,
    RoleComiteEtCommissionEvaluationChercheurComponent,
    ChercheurEmailCreateChercheurComponent,
    ChercheurEmailListChercheurComponent,
    ChercheurEmailViewChercheurComponent,
    ChercheurEmailEditChercheurComponent,
    ChercheurEmailChercheurComponent,
    EnjeuxIrdChercheurCreateChercheurComponent,
    EnjeuxIrdChercheurListChercheurComponent,
    EnjeuxIrdChercheurViewChercheurComponent,
    EnjeuxIrdChercheurEditChercheurComponent,
    EnjeuxIrdChercheurChercheurComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdCreateChercheurComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdListChercheurComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdViewChercheurComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdEditChercheurComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdChercheurComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueChercheurComponent,
    EnseignementDisciplineScientifiqueCreateChercheurComponent,
    EnseignementDisciplineScientifiqueListChercheurComponent,
    EnseignementDisciplineScientifiqueViewChercheurComponent,
    EnseignementDisciplineScientifiqueEditChercheurComponent,
    EnseignementDisciplineScientifiqueChercheurComponent,
    CommunauteSavoirChercheurCreateChercheurComponent,
    CommunauteSavoirChercheurListChercheurComponent,
    CommunauteSavoirChercheurViewChercheurComponent,
    CommunauteSavoirChercheurEditChercheurComponent,
    CommunauteSavoirChercheurChercheurComponent,
    ComiteEtCommissionEvaluationCreateChercheurComponent,
    ComiteEtCommissionEvaluationListChercheurComponent,
    ComiteEtCommissionEvaluationViewChercheurComponent,
    ComiteEtCommissionEvaluationEditChercheurComponent,
    ComiteEtCommissionEvaluationChercheurComponent,
    EvenementColloqueScienntifiqueCreateChercheurComponent,
    EvenementColloqueScienntifiqueListChercheurComponent,
    EvenementColloqueScienntifiqueViewChercheurComponent,
    EvenementColloqueScienntifiqueEditChercheurComponent,
    EvenementColloqueScienntifiqueChercheurComponent,
    FormationContinueObjetFormationGeneriqueCreateChercheurComponent,
    FormationContinueObjetFormationGeneriqueListChercheurComponent,
    FormationContinueObjetFormationGeneriqueViewChercheurComponent,
    FormationContinueObjetFormationGeneriqueEditChercheurComponent,
    FormationContinueObjetFormationGeneriqueChercheurComponent,
    FormationContinueCreateChercheurComponent,
    FormationContinueListChercheurComponent,
    FormationContinueViewChercheurComponent,
    FormationContinueEditChercheurComponent,
    FormationContinueChercheurComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantCreateChercheurComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantListChercheurComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantViewChercheurComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantEditChercheurComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantChercheurComponent,
    ConsultanceScientifiquePonctuelleCreateChercheurComponent,
    ConsultanceScientifiquePonctuelleListChercheurComponent,
    ConsultanceScientifiquePonctuelleViewChercheurComponent,
    ConsultanceScientifiquePonctuelleEditChercheurComponent,
    ConsultanceScientifiquePonctuelleChercheurComponent,
    ZoneGeographiqueFormationContinueCreateChercheurComponent,
    ZoneGeographiqueFormationContinueListChercheurComponent,
    ZoneGeographiqueFormationContinueViewChercheurComponent,
    ZoneGeographiqueFormationContinueEditChercheurComponent,
    ZoneGeographiqueFormationContinueChercheurComponent,
    ProjetActiviteRechercheDetailInstrumentIrdCreateChercheurComponent,
    ProjetActiviteRechercheDetailInstrumentIrdListChercheurComponent,
    ProjetActiviteRechercheDetailInstrumentIrdViewChercheurComponent,
    ProjetActiviteRechercheDetailInstrumentIrdEditChercheurComponent,
    ProjetActiviteRechercheDetailInstrumentIrdChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdListChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdChercheurComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent,
    NatureActiviteGrandPubliqueCreateChercheurComponent,
    NatureActiviteGrandPubliqueListChercheurComponent,
    NatureActiviteGrandPubliqueViewChercheurComponent,
    NatureActiviteGrandPubliqueEditChercheurComponent,
    NatureActiviteGrandPubliqueChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysChercheurComponent,
    RoleDeveloppementDeSavoirCreateChercheurComponent,
    RoleDeveloppementDeSavoirListChercheurComponent,
    RoleDeveloppementDeSavoirViewChercheurComponent,
    RoleDeveloppementDeSavoirEditChercheurComponent,
    RoleDeveloppementDeSavoirChercheurComponent,
    TypeUtilisateurSavoirConcuCreateChercheurComponent,
    TypeUtilisateurSavoirConcuListChercheurComponent,
    TypeUtilisateurSavoirConcuViewChercheurComponent,
    TypeUtilisateurSavoirConcuEditChercheurComponent,
    TypeUtilisateurSavoirConcuChercheurComponent,
    EncadrementEtudiantDisciplineScientifiqueCreateChercheurComponent,
    EncadrementEtudiantDisciplineScientifiqueListChercheurComponent,
    EncadrementEtudiantDisciplineScientifiqueViewChercheurComponent,
    EncadrementEtudiantDisciplineScientifiqueEditChercheurComponent,
    EncadrementEtudiantDisciplineScientifiqueChercheurComponent,
    CommunauteSavoirExpertiseScientifiqueCreateChercheurComponent,
    CommunauteSavoirExpertiseScientifiqueListChercheurComponent,
    CommunauteSavoirExpertiseScientifiqueViewChercheurComponent,
    CommunauteSavoirExpertiseScientifiqueEditChercheurComponent,
    CommunauteSavoirExpertiseScientifiqueChercheurComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationCreateChercheurComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationListChercheurComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationViewChercheurComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationEditChercheurComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationChercheurComponent,
    DistinctionEtablissementPaysCreateChercheurComponent,
    DistinctionEtablissementPaysListChercheurComponent,
    DistinctionEtablissementPaysViewChercheurComponent,
    DistinctionEtablissementPaysEditChercheurComponent,
    DistinctionEtablissementPaysChercheurComponent,
    InstrumentIrdChercheurCreateChercheurComponent,
    InstrumentIrdChercheurListChercheurComponent,
    InstrumentIrdChercheurViewChercheurComponent,
    InstrumentIrdChercheurEditChercheurComponent,
    InstrumentIrdChercheurChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdChercheurComponent,
    EnseignementEtFormationCreateChercheurComponent,
    EnseignementEtFormationListChercheurComponent,
    EnseignementEtFormationViewChercheurComponent,
    EnseignementEtFormationEditChercheurComponent,
    EnseignementEtFormationChercheurComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueChercheurComponent,
    DisciplineScientifiqueExpertiseScientifiqueCreateChercheurComponent,
    DisciplineScientifiqueExpertiseScientifiqueListChercheurComponent,
    DisciplineScientifiqueExpertiseScientifiqueViewChercheurComponent,
    DisciplineScientifiqueExpertiseScientifiqueEditChercheurComponent,
    DisciplineScientifiqueExpertiseScientifiqueChercheurComponent,
    OutilPedagogiqueEnjeuxIrdCreateChercheurComponent,
    OutilPedagogiqueEnjeuxIrdListChercheurComponent,
    OutilPedagogiqueEnjeuxIrdViewChercheurComponent,
    OutilPedagogiqueEnjeuxIrdEditChercheurComponent,
    OutilPedagogiqueEnjeuxIrdChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueChercheurComponent,
    GestionEquipeCreateChercheurComponent,
    GestionEquipeListChercheurComponent,
    GestionEquipeViewChercheurComponent,
    GestionEquipeEditChercheurComponent,
    GestionEquipeChercheurComponent,
    DistinctionCreateChercheurComponent,
    DistinctionListChercheurComponent,
    DistinctionViewChercheurComponent,
    DistinctionEditChercheurComponent,
    DistinctionChercheurComponent,
    CampagneRelanceCreateChercheurComponent,
    CampagneRelanceListChercheurComponent,
    CampagneRelanceViewChercheurComponent,
    CampagneRelanceEditChercheurComponent,
    CampagneRelanceChercheurComponent,
    RencontreMediaEnjeuxIrdCreateChercheurComponent,
    RencontreMediaEnjeuxIrdListChercheurComponent,
    RencontreMediaEnjeuxIrdViewChercheurComponent,
    RencontreMediaEnjeuxIrdEditChercheurComponent,
    RencontreMediaEnjeuxIrdChercheurComponent,
    ResponsabilitePedagogiquePaysCreateChercheurComponent,
    ResponsabilitePedagogiquePaysListChercheurComponent,
    ResponsabilitePedagogiquePaysViewChercheurComponent,
    ResponsabilitePedagogiquePaysEditChercheurComponent,
    ResponsabilitePedagogiquePaysChercheurComponent,
    TypePubliqueRencontreMediaCreateChercheurComponent,
    TypePubliqueRencontreMediaListChercheurComponent,
    TypePubliqueRencontreMediaViewChercheurComponent,
    TypePubliqueRencontreMediaEditChercheurComponent,
    TypePubliqueRencontreMediaChercheurComponent,
    FormationContinueEnjeuxIrdCreateChercheurComponent,
    FormationContinueEnjeuxIrdListChercheurComponent,
    FormationContinueEnjeuxIrdViewChercheurComponent,
    FormationContinueEnjeuxIrdEditChercheurComponent,
    FormationContinueEnjeuxIrdChercheurComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleCreateChercheurComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleListChercheurComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleViewChercheurComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleEditChercheurComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleChercheurComponent,
    RencontreMediaPeriodeCreateChercheurComponent,
    RencontreMediaPeriodeListChercheurComponent,
    RencontreMediaPeriodeViewChercheurComponent,
    RencontreMediaPeriodeEditChercheurComponent,
    RencontreMediaPeriodeChercheurComponent,
    PaysRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
    PaysRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
    PaysRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
    PaysRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
    PaysRencontreGrandPubliqueJeunePubliqueChercheurComponent,
    CommunauteSavoirProjetActiviteRechercheCreateChercheurComponent,
    CommunauteSavoirProjetActiviteRechercheListChercheurComponent,
    CommunauteSavoirProjetActiviteRechercheViewChercheurComponent,
    CommunauteSavoirProjetActiviteRechercheEditChercheurComponent,
    CommunauteSavoirProjetActiviteRechercheChercheurComponent,
    OutilPedagogiqueLangueCreateChercheurComponent,
    OutilPedagogiqueLangueListChercheurComponent,
    OutilPedagogiqueLangueViewChercheurComponent,
    OutilPedagogiqueLangueEditChercheurComponent,
    OutilPedagogiqueLangueChercheurComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent,
    ProjetActiviteRechercheCreateChercheurComponent,
    ProjetActiviteRechercheListChercheurComponent,
    ProjetActiviteRechercheViewChercheurComponent,
    ProjetActiviteRechercheEditChercheurComponent,
    ProjetActiviteRechercheChercheurComponent,
    ResponsabilitePedagogiqueEtablissementCreateChercheurComponent,
    ResponsabilitePedagogiqueEtablissementListChercheurComponent,
    ResponsabilitePedagogiqueEtablissementViewChercheurComponent,
    ResponsabilitePedagogiqueEtablissementEditChercheurComponent,
    ResponsabilitePedagogiqueEtablissementChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementChercheurComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateChercheurComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueListChercheurComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewChercheurComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditChercheurComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueChercheurComponent,
    TypeInstrumentIrdChercheurCreateChercheurComponent,
    TypeInstrumentIrdChercheurListChercheurComponent,
    TypeInstrumentIrdChercheurViewChercheurComponent,
    TypeInstrumentIrdChercheurEditChercheurComponent,
    TypeInstrumentIrdChercheurChercheurComponent,
    DisciplineScientifiqueEncadrementDoctorantCreateChercheurComponent,
    DisciplineScientifiqueEncadrementDoctorantListChercheurComponent,
    DisciplineScientifiqueEncadrementDoctorantViewChercheurComponent,
    DisciplineScientifiqueEncadrementDoctorantEditChercheurComponent,
    DisciplineScientifiqueEncadrementDoctorantChercheurComponent,
    PaysRencontreMediaCreateChercheurComponent,
    PaysRencontreMediaListChercheurComponent,
    PaysRencontreMediaViewChercheurComponent,
    PaysRencontreMediaEditChercheurComponent,
    PaysRencontreMediaChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueListChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueChercheurComponent,
    TypeParticipationCreateChercheurComponent,
    TypeParticipationListChercheurComponent,
    TypeParticipationViewChercheurComponent,
    TypeParticipationEditChercheurComponent,
    TypeParticipationChercheurComponent,
    EvenementColloqueScienntifiquePaysCreateChercheurComponent,
    EvenementColloqueScienntifiquePaysListChercheurComponent,
    EvenementColloqueScienntifiquePaysViewChercheurComponent,
    EvenementColloqueScienntifiquePaysEditChercheurComponent,
    EvenementColloqueScienntifiquePaysChercheurComponent,
    EtatCampagneCreateChercheurComponent,
    EtatCampagneListChercheurComponent,
    EtatCampagneViewChercheurComponent,
    EtatCampagneEditChercheurComponent,
    EtatCampagneChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditChercheurComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdChercheurComponent,
    StructureOganisatriceCreateChercheurComponent,
    StructureOganisatriceListChercheurComponent,
    StructureOganisatriceViewChercheurComponent,
    StructureOganisatriceEditChercheurComponent,
    StructureOganisatriceChercheurComponent,
    DisciplineScientifiqueEncadrementEtudiantCreateChercheurComponent,
    DisciplineScientifiqueEncadrementEtudiantListChercheurComponent,
    DisciplineScientifiqueEncadrementEtudiantViewChercheurComponent,
    DisciplineScientifiqueEncadrementEtudiantEditChercheurComponent,
    DisciplineScientifiqueEncadrementEtudiantChercheurComponent,
    FormationContinueCommanditaireCreateChercheurComponent,
    FormationContinueCommanditaireListChercheurComponent,
    FormationContinueCommanditaireViewChercheurComponent,
    FormationContinueCommanditaireEditChercheurComponent,
    FormationContinueCommanditaireChercheurComponent,
    AffectationStructurelleCreateChercheurComponent,
    AffectationStructurelleListChercheurComponent,
    AffectationStructurelleViewChercheurComponent,
    AffectationStructurelleEditChercheurComponent,
    AffectationStructurelleChercheurComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
    PaysCommanditaireCreateChercheurComponent,
    PaysCommanditaireListChercheurComponent,
    PaysCommanditaireViewChercheurComponent,
    PaysCommanditaireEditChercheurComponent,
    PaysCommanditaireChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditChercheurComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdChercheurComponent,
    FormationContinueDisciplineScientifiqueCreateChercheurComponent,
    FormationContinueDisciplineScientifiqueListChercheurComponent,
    FormationContinueDisciplineScientifiqueViewChercheurComponent,
    FormationContinueDisciplineScientifiqueEditChercheurComponent,
    FormationContinueDisciplineScientifiqueChercheurComponent,
    EnjeuxIrdEncadrementDoctorantCreateChercheurComponent,
    EnjeuxIrdEncadrementDoctorantListChercheurComponent,
    EnjeuxIrdEncadrementDoctorantViewChercheurComponent,
    EnjeuxIrdEncadrementDoctorantEditChercheurComponent,
    EnjeuxIrdEncadrementDoctorantChercheurComponent,
    EnseignementNatureCreateChercheurComponent,
    EnseignementNatureListChercheurComponent,
    EnseignementNatureViewChercheurComponent,
    EnseignementNatureEditChercheurComponent,
    EnseignementNatureChercheurComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
    NiveauEtudeEnseignementCreateChercheurComponent,
    NiveauEtudeEnseignementListChercheurComponent,
    NiveauEtudeEnseignementViewChercheurComponent,
    NiveauEtudeEnseignementEditChercheurComponent,
    NiveauEtudeEnseignementChercheurComponent,
    CategorieNotificationCreateChercheurComponent,
    CategorieNotificationListChercheurComponent,
    CategorieNotificationViewChercheurComponent,
    CategorieNotificationEditChercheurComponent,
    CategorieNotificationChercheurComponent,
    ChercheurCreateChercheurComponent,
    ChercheurListChercheurComponent,
    ChercheurViewChercheurComponent,
    ChercheurEditChercheurComponent,
    ChercheurChercheurComponent,
    EtablissementConseilsScientifiqueCreateChercheurComponent,
    EtablissementConseilsScientifiqueListChercheurComponent,
    EtablissementConseilsScientifiqueViewChercheurComponent,
    EtablissementConseilsScientifiqueEditChercheurComponent,
    EtablissementConseilsScientifiqueChercheurComponent,
    CampagneCreateChercheurComponent,
    CampagneListChercheurComponent,
    CampagneViewChercheurComponent,
    CampagneEditChercheurComponent,
    CampagneChercheurComponent,
    EtatCampagneChercheurCreateChercheurComponent,
    EtatCampagneChercheurListChercheurComponent,
    EtatCampagneChercheurViewChercheurComponent,
    EtatCampagneChercheurEditChercheurComponent,
    EtatCampagneChercheurChercheurComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
    ArchivableChercheurModule
  ],
  exports: [
  LoginChercheurComponent,
  RegisterChercheurComponent,
  GestionEquipeDetailCreateChercheurComponent,
  GestionEquipeDetailListChercheurComponent,
  GestionEquipeDetailViewChercheurComponent,
  GestionEquipeDetailEditChercheurComponent,
  GestionEquipeDetailChercheurComponent,
  LangueCreateChercheurComponent,
  LangueListChercheurComponent,
  LangueViewChercheurComponent,
  LangueEditChercheurComponent,
  LangueChercheurComponent,
  OutilPedagogiquePubliqueCibleCreateChercheurComponent,
  OutilPedagogiquePubliqueCibleListChercheurComponent,
  OutilPedagogiquePubliqueCibleViewChercheurComponent,
  OutilPedagogiquePubliqueCibleEditChercheurComponent,
  OutilPedagogiquePubliqueCibleChercheurComponent,
  StatusContratEtConventionCreateChercheurComponent,
  StatusContratEtConventionListChercheurComponent,
  StatusContratEtConventionViewChercheurComponent,
  StatusContratEtConventionEditChercheurComponent,
  StatusContratEtConventionChercheurComponent,
  ResponsabilitePedagogiqueCreateChercheurComponent,
  ResponsabilitePedagogiqueListChercheurComponent,
  ResponsabilitePedagogiqueViewChercheurComponent,
  ResponsabilitePedagogiqueEditChercheurComponent,
  ResponsabilitePedagogiqueChercheurComponent,
  ConseilEtComiteScientifiqueCreateChercheurComponent,
  ConseilEtComiteScientifiqueListChercheurComponent,
  ConseilEtComiteScientifiqueViewChercheurComponent,
  ConseilEtComiteScientifiqueEditChercheurComponent,
  ConseilEtComiteScientifiqueChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirChercheurComponent,
  TypeEtudeEnseignementCreateChercheurComponent,
  TypeEtudeEnseignementListChercheurComponent,
  TypeEtudeEnseignementViewChercheurComponent,
  TypeEtudeEnseignementEditChercheurComponent,
  TypeEtudeEnseignementChercheurComponent,
  SavoirEtInnovationCreateChercheurComponent,
  SavoirEtInnovationListChercheurComponent,
  SavoirEtInnovationViewChercheurComponent,
  SavoirEtInnovationEditChercheurComponent,
  SavoirEtInnovationChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
  EnseignementZoneGeographiqueCreateChercheurComponent,
  EnseignementZoneGeographiqueListChercheurComponent,
  EnseignementZoneGeographiqueViewChercheurComponent,
  EnseignementZoneGeographiqueEditChercheurComponent,
  EnseignementZoneGeographiqueChercheurComponent,
  IdentifiantAuteurExpertCreateChercheurComponent,
  IdentifiantAuteurExpertListChercheurComponent,
  IdentifiantAuteurExpertViewChercheurComponent,
  IdentifiantAuteurExpertEditChercheurComponent,
  IdentifiantAuteurExpertChercheurComponent,
  CommunauteSavoirEncadrementDoctorantCreateChercheurComponent,
  CommunauteSavoirEncadrementDoctorantListChercheurComponent,
  CommunauteSavoirEncadrementDoctorantViewChercheurComponent,
  CommunauteSavoirEncadrementDoctorantEditChercheurComponent,
  CommunauteSavoirEncadrementDoctorantChercheurComponent,
  ZoneActiviteInteractionRechercheCreateChercheurComponent,
  ZoneActiviteInteractionRechercheListChercheurComponent,
  ZoneActiviteInteractionRechercheViewChercheurComponent,
  ZoneActiviteInteractionRechercheEditChercheurComponent,
  ZoneActiviteInteractionRechercheChercheurComponent,
  DisciplineScientifiqueConseilsScientifiqueCreateChercheurComponent,
  DisciplineScientifiqueConseilsScientifiqueListChercheurComponent,
  DisciplineScientifiqueConseilsScientifiqueViewChercheurComponent,
  DisciplineScientifiqueConseilsScientifiqueEditChercheurComponent,
  DisciplineScientifiqueConseilsScientifiqueChercheurComponent,
  VieInstitutionnelleCreateChercheurComponent,
  VieInstitutionnelleListChercheurComponent,
  VieInstitutionnelleViewChercheurComponent,
  VieInstitutionnelleEditChercheurComponent,
  VieInstitutionnelleChercheurComponent,
  CommunauteSavoirEncadrementEtudiantCreateChercheurComponent,
  CommunauteSavoirEncadrementEtudiantListChercheurComponent,
  CommunauteSavoirEncadrementEtudiantViewChercheurComponent,
  CommunauteSavoirEncadrementEtudiantEditChercheurComponent,
  CommunauteSavoirEncadrementEtudiantChercheurComponent,
  ConseilsScientifiqueCreateChercheurComponent,
  ConseilsScientifiqueListChercheurComponent,
  ConseilsScientifiqueViewChercheurComponent,
  ConseilsScientifiqueEditChercheurComponent,
  ConseilsScientifiqueChercheurComponent,
  InstrumentsEtDispositifsIrdCreateChercheurComponent,
  InstrumentsEtDispositifsIrdListChercheurComponent,
  InstrumentsEtDispositifsIrdViewChercheurComponent,
  InstrumentsEtDispositifsIrdEditChercheurComponent,
  InstrumentsEtDispositifsIrdChercheurComponent,
  EtatReclamationCreateChercheurComponent,
  EtatReclamationListChercheurComponent,
  EtatReclamationViewChercheurComponent,
  EtatReclamationEditChercheurComponent,
  EtatReclamationChercheurComponent,
  NotificationCreateChercheurComponent,
  NotificationListChercheurComponent,
  NotificationViewChercheurComponent,
  NotificationEditChercheurComponent,
  NotificationChercheurComponent,
  VieInstitutionnelleDetailEtablissementCreateChercheurComponent,
  VieInstitutionnelleDetailEtablissementListChercheurComponent,
  VieInstitutionnelleDetailEtablissementViewChercheurComponent,
  VieInstitutionnelleDetailEtablissementEditChercheurComponent,
  VieInstitutionnelleDetailEtablissementChercheurComponent,
  OutilPedagogiqueInstrumentIrdCreateChercheurComponent,
  OutilPedagogiqueInstrumentIrdListChercheurComponent,
  OutilPedagogiqueInstrumentIrdViewChercheurComponent,
  OutilPedagogiqueInstrumentIrdEditChercheurComponent,
  OutilPedagogiqueInstrumentIrdChercheurComponent,
  OutilPedagogiqueCreateChercheurComponent,
  OutilPedagogiqueListChercheurComponent,
  OutilPedagogiqueViewChercheurComponent,
  OutilPedagogiqueEditChercheurComponent,
  OutilPedagogiqueChercheurComponent,
  TypeOutilPedagogiqueCreateChercheurComponent,
  TypeOutilPedagogiqueListChercheurComponent,
  TypeOutilPedagogiqueViewChercheurComponent,
  TypeOutilPedagogiqueEditChercheurComponent,
  TypeOutilPedagogiqueChercheurComponent,
  DisciplineScientifiqueChercheurCreateChercheurComponent,
  DisciplineScientifiqueChercheurListChercheurComponent,
  DisciplineScientifiqueChercheurViewChercheurComponent,
  DisciplineScientifiqueChercheurEditChercheurComponent,
  DisciplineScientifiqueChercheurChercheurComponent,
  OutilPedagogiquePaysDiffusionCreateChercheurComponent,
  OutilPedagogiquePaysDiffusionListChercheurComponent,
  OutilPedagogiquePaysDiffusionViewChercheurComponent,
  OutilPedagogiquePaysDiffusionEditChercheurComponent,
  OutilPedagogiquePaysDiffusionChercheurComponent,
  RencontreMediaDisciplineScientifiqueCreateChercheurComponent,
  RencontreMediaDisciplineScientifiqueListChercheurComponent,
  RencontreMediaDisciplineScientifiqueViewChercheurComponent,
  RencontreMediaDisciplineScientifiqueEditChercheurComponent,
  RencontreMediaDisciplineScientifiqueChercheurComponent,
  CommunauteSavoirEvenementColloqueScientifiqueCreateChercheurComponent,
  CommunauteSavoirEvenementColloqueScientifiqueListChercheurComponent,
  CommunauteSavoirEvenementColloqueScientifiqueViewChercheurComponent,
  CommunauteSavoirEvenementColloqueScientifiqueEditChercheurComponent,
  CommunauteSavoirEvenementColloqueScientifiqueChercheurComponent,
  VieInstitutionnelleDetailCreateChercheurComponent,
  VieInstitutionnelleDetailListChercheurComponent,
  VieInstitutionnelleDetailViewChercheurComponent,
  VieInstitutionnelleDetailEditChercheurComponent,
  VieInstitutionnelleDetailChercheurComponent,
  NiveauResponsabilitePedagogiqueCreateChercheurComponent,
  NiveauResponsabilitePedagogiqueListChercheurComponent,
  NiveauResponsabilitePedagogiqueViewChercheurComponent,
  NiveauResponsabilitePedagogiqueEditChercheurComponent,
  NiveauResponsabilitePedagogiqueChercheurComponent,
  ZoneGeographiqueConseilsScientifiqueCreateChercheurComponent,
  ZoneGeographiqueConseilsScientifiqueListChercheurComponent,
  ZoneGeographiqueConseilsScientifiqueViewChercheurComponent,
  ZoneGeographiqueConseilsScientifiqueEditChercheurComponent,
  ZoneGeographiqueConseilsScientifiqueChercheurComponent,
  EtablissementConsultanceScientifiquePonctuelleCreateChercheurComponent,
  EtablissementConsultanceScientifiquePonctuelleListChercheurComponent,
  EtablissementConsultanceScientifiquePonctuelleViewChercheurComponent,
  EtablissementConsultanceScientifiquePonctuelleEditChercheurComponent,
  EtablissementConsultanceScientifiquePonctuelleChercheurComponent,
  CampagneRelanceChercheurCreateChercheurComponent,
  CampagneRelanceChercheurListChercheurComponent,
  CampagneRelanceChercheurViewChercheurComponent,
  CampagneRelanceChercheurEditChercheurComponent,
  CampagneRelanceChercheurChercheurComponent,
  ContratEtConventionIrdCreateChercheurComponent,
  ContratEtConventionIrdListChercheurComponent,
  ContratEtConventionIrdViewChercheurComponent,
  ContratEtConventionIrdEditChercheurComponent,
  ContratEtConventionIrdChercheurComponent,
  ProjetActiviteRechercheDetailPaysCreateChercheurComponent,
  ProjetActiviteRechercheDetailPaysListChercheurComponent,
  ProjetActiviteRechercheDetailPaysViewChercheurComponent,
  ProjetActiviteRechercheDetailPaysEditChercheurComponent,
  ProjetActiviteRechercheDetailPaysChercheurComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeListChercheurComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeChercheurComponent,
  PaysFormationContinueCreateChercheurComponent,
  PaysFormationContinueListChercheurComponent,
  PaysFormationContinueViewChercheurComponent,
  PaysFormationContinueEditChercheurComponent,
  PaysFormationContinueChercheurComponent,
  VieInstitutionnelleDetailInstrumentIrdCreateChercheurComponent,
  VieInstitutionnelleDetailInstrumentIrdListChercheurComponent,
  VieInstitutionnelleDetailInstrumentIrdViewChercheurComponent,
  VieInstitutionnelleDetailInstrumentIrdEditChercheurComponent,
  VieInstitutionnelleDetailInstrumentIrdChercheurComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdCreateChercheurComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdListChercheurComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdViewChercheurComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdEditChercheurComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdChercheurComponent,
  CultureScientifiqueCreateChercheurComponent,
  CultureScientifiqueListChercheurComponent,
  CultureScientifiqueViewChercheurComponent,
  CultureScientifiqueEditChercheurComponent,
  CultureScientifiqueChercheurComponent,
  EnseignementCreateChercheurComponent,
  EnseignementListChercheurComponent,
  EnseignementViewChercheurComponent,
  EnseignementEditChercheurComponent,
  EnseignementChercheurComponent,
  PaysZoneGeographiqueCreateChercheurComponent,
  PaysZoneGeographiqueListChercheurComponent,
  PaysZoneGeographiqueViewChercheurComponent,
  PaysZoneGeographiqueEditChercheurComponent,
  PaysZoneGeographiqueChercheurComponent,
  EncadrementEtudiantCreateChercheurComponent,
  EncadrementEtudiantListChercheurComponent,
  EncadrementEtudiantViewChercheurComponent,
  EncadrementEtudiantEditChercheurComponent,
  EncadrementEtudiantChercheurComponent,
  EnjeuxIrdComiteEtCommissionEvaluationCreateChercheurComponent,
  EnjeuxIrdComiteEtCommissionEvaluationListChercheurComponent,
  EnjeuxIrdComiteEtCommissionEvaluationViewChercheurComponent,
  EnjeuxIrdComiteEtCommissionEvaluationEditChercheurComponent,
  EnjeuxIrdComiteEtCommissionEvaluationChercheurComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateChercheurComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationListChercheurComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationViewChercheurComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationEditChercheurComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationChercheurComponent,
  RencontreMediaCreateChercheurComponent,
  RencontreMediaListChercheurComponent,
  RencontreMediaViewChercheurComponent,
  RencontreMediaEditChercheurComponent,
  RencontreMediaChercheurComponent,
  ReclamationCreateChercheurComponent,
  ReclamationListChercheurComponent,
  ReclamationViewChercheurComponent,
  ReclamationEditChercheurComponent,
  ReclamationChercheurComponent,
  EncadrementEtudiantEnjeuxIrdCreateChercheurComponent,
  EncadrementEtudiantEnjeuxIrdListChercheurComponent,
  EncadrementEtudiantEnjeuxIrdViewChercheurComponent,
  EncadrementEtudiantEnjeuxIrdEditChercheurComponent,
  EncadrementEtudiantEnjeuxIrdChercheurComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurCreateChercheurComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurListChercheurComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurViewChercheurComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurEditChercheurComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurChercheurComponent,
  CampagneRappelCreateChercheurComponent,
  CampagneRappelListChercheurComponent,
  CampagneRappelViewChercheurComponent,
  CampagneRappelEditChercheurComponent,
  CampagneRappelChercheurComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueCreateChercheurComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueListChercheurComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueViewChercheurComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueEditChercheurComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueChercheurComponent,
  OutilPedagogiqueDisciplineScientifiqueCreateChercheurComponent,
  OutilPedagogiqueDisciplineScientifiqueListChercheurComponent,
  OutilPedagogiqueDisciplineScientifiqueViewChercheurComponent,
  OutilPedagogiqueDisciplineScientifiqueEditChercheurComponent,
  OutilPedagogiqueDisciplineScientifiqueChercheurComponent,
  CampagneRappelChercheurCreateChercheurComponent,
  CampagneRappelChercheurListChercheurComponent,
  CampagneRappelChercheurViewChercheurComponent,
  CampagneRappelChercheurEditChercheurComponent,
  CampagneRappelChercheurChercheurComponent,
  EncadrementCreateChercheurComponent,
  EncadrementListChercheurComponent,
  EncadrementViewChercheurComponent,
  EncadrementEditChercheurComponent,
  EncadrementChercheurComponent,
  EnjeuxIrdConseilsScientifiqueCreateChercheurComponent,
  EnjeuxIrdConseilsScientifiqueListChercheurComponent,
  EnjeuxIrdConseilsScientifiqueViewChercheurComponent,
  EnjeuxIrdConseilsScientifiqueEditChercheurComponent,
  EnjeuxIrdConseilsScientifiqueChercheurComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateChercheurComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleListChercheurComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleViewChercheurComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleEditChercheurComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleChercheurComponent,
  FormationContinuePubliqueProfessionelCreateChercheurComponent,
  FormationContinuePubliqueProfessionelListChercheurComponent,
  FormationContinuePubliqueProfessionelViewChercheurComponent,
  FormationContinuePubliqueProfessionelEditChercheurComponent,
  FormationContinuePubliqueProfessionelChercheurComponent,
  EnseignementEnjeuxIrdCreateChercheurComponent,
  EnseignementEnjeuxIrdListChercheurComponent,
  EnseignementEnjeuxIrdViewChercheurComponent,
  EnseignementEnjeuxIrdEditChercheurComponent,
  EnseignementEnjeuxIrdChercheurComponent,
  InstrumentIrdComiteEtCommissionEvaluationCreateChercheurComponent,
  InstrumentIrdComiteEtCommissionEvaluationListChercheurComponent,
  InstrumentIrdComiteEtCommissionEvaluationViewChercheurComponent,
  InstrumentIrdComiteEtCommissionEvaluationEditChercheurComponent,
  InstrumentIrdComiteEtCommissionEvaluationChercheurComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueCreateChercheurComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueListChercheurComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueViewChercheurComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueEditChercheurComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueChercheurComponent,
  EtatEtapeCampagneCreateChercheurComponent,
  EtatEtapeCampagneListChercheurComponent,
  EtatEtapeCampagneViewChercheurComponent,
  EtatEtapeCampagneEditChercheurComponent,
  EtatEtapeCampagneChercheurComponent,
  ProjetActiviteRechercheDetailCreateChercheurComponent,
  ProjetActiviteRechercheDetailListChercheurComponent,
  ProjetActiviteRechercheDetailViewChercheurComponent,
  ProjetActiviteRechercheDetailEditChercheurComponent,
  ProjetActiviteRechercheDetailChercheurComponent,
  ExpertiseCreateChercheurComponent,
  ExpertiseListChercheurComponent,
  ExpertiseViewChercheurComponent,
  ExpertiseEditChercheurComponent,
  ExpertiseChercheurComponent,
  TypePubliqueCreateChercheurComponent,
  TypePubliqueListChercheurComponent,
  TypePubliqueViewChercheurComponent,
  TypePubliqueEditChercheurComponent,
  TypePubliqueChercheurComponent,
  CampagneChercheurOuvertureCreateChercheurComponent,
  CampagneChercheurOuvertureListChercheurComponent,
  CampagneChercheurOuvertureViewChercheurComponent,
  CampagneChercheurOuvertureEditChercheurComponent,
  CampagneChercheurOuvertureChercheurComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleListChercheurComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleChercheurComponent,
  EtablissementComiteEtCommissionEvaluationCreateChercheurComponent,
  EtablissementComiteEtCommissionEvaluationListChercheurComponent,
  EtablissementComiteEtCommissionEvaluationViewChercheurComponent,
  EtablissementComiteEtCommissionEvaluationEditChercheurComponent,
  EtablissementComiteEtCommissionEvaluationChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionChercheurComponent,
  ResponsabilitePedagogiqueEnjeuxIrdCreateChercheurComponent,
  ResponsabilitePedagogiqueEnjeuxIrdListChercheurComponent,
  ResponsabilitePedagogiqueEnjeuxIrdViewChercheurComponent,
  ResponsabilitePedagogiqueEnjeuxIrdEditChercheurComponent,
  ResponsabilitePedagogiqueEnjeuxIrdChercheurComponent,
  FaqCreateChercheurComponent,
  FaqListChercheurComponent,
  FaqViewChercheurComponent,
  FaqEditChercheurComponent,
  FaqChercheurComponent,
  ExpertiseScientifiqueCreateChercheurComponent,
  ExpertiseScientifiqueListChercheurComponent,
  ExpertiseScientifiqueViewChercheurComponent,
  ExpertiseScientifiqueEditChercheurComponent,
  ExpertiseScientifiqueChercheurComponent,
  EtablissementEnseignementCreateChercheurComponent,
  EtablissementEnseignementListChercheurComponent,
  EtablissementEnseignementViewChercheurComponent,
  EtablissementEnseignementEditChercheurComponent,
  EtablissementEnseignementChercheurComponent,
  OutilPedagogiquePaysConceptionCreateChercheurComponent,
  OutilPedagogiquePaysConceptionListChercheurComponent,
  OutilPedagogiquePaysConceptionViewChercheurComponent,
  OutilPedagogiquePaysConceptionEditChercheurComponent,
  OutilPedagogiquePaysConceptionChercheurComponent,
  CampagneChercheurFermetureCreateChercheurComponent,
  CampagneChercheurFermetureListChercheurComponent,
  CampagneChercheurFermetureViewChercheurComponent,
  CampagneChercheurFermetureEditChercheurComponent,
  CampagneChercheurFermetureChercheurComponent,
  EncadrementDoctorantCreateChercheurComponent,
  EncadrementDoctorantListChercheurComponent,
  EncadrementDoctorantViewChercheurComponent,
  EncadrementDoctorantEditChercheurComponent,
  EncadrementDoctorantChercheurComponent,
  CommunauteSavoirConseilEtComiteScientifiqueCreateChercheurComponent,
  CommunauteSavoirConseilEtComiteScientifiqueListChercheurComponent,
  CommunauteSavoirConseilEtComiteScientifiqueViewChercheurComponent,
  CommunauteSavoirConseilEtComiteScientifiqueEditChercheurComponent,
  CommunauteSavoirConseilEtComiteScientifiqueChercheurComponent,
  OutilPedagogiqueTypeInstrumentIrdCreateChercheurComponent,
  OutilPedagogiqueTypeInstrumentIrdListChercheurComponent,
  OutilPedagogiqueTypeInstrumentIrdViewChercheurComponent,
  OutilPedagogiqueTypeInstrumentIrdEditChercheurComponent,
  OutilPedagogiqueTypeInstrumentIrdChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueChercheurComponent,
  RoleComiteEtCommissionEvaluationCreateChercheurComponent,
  RoleComiteEtCommissionEvaluationListChercheurComponent,
  RoleComiteEtCommissionEvaluationViewChercheurComponent,
  RoleComiteEtCommissionEvaluationEditChercheurComponent,
  RoleComiteEtCommissionEvaluationChercheurComponent,
  ChercheurEmailCreateChercheurComponent,
  ChercheurEmailListChercheurComponent,
  ChercheurEmailViewChercheurComponent,
  ChercheurEmailEditChercheurComponent,
  ChercheurEmailChercheurComponent,
  EnjeuxIrdChercheurCreateChercheurComponent,
  EnjeuxIrdChercheurListChercheurComponent,
  EnjeuxIrdChercheurViewChercheurComponent,
  EnjeuxIrdChercheurEditChercheurComponent,
  EnjeuxIrdChercheurChercheurComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdCreateChercheurComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdListChercheurComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdViewChercheurComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdEditChercheurComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdChercheurComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueChercheurComponent,
  EnseignementDisciplineScientifiqueCreateChercheurComponent,
  EnseignementDisciplineScientifiqueListChercheurComponent,
  EnseignementDisciplineScientifiqueViewChercheurComponent,
  EnseignementDisciplineScientifiqueEditChercheurComponent,
  EnseignementDisciplineScientifiqueChercheurComponent,
  CommunauteSavoirChercheurCreateChercheurComponent,
  CommunauteSavoirChercheurListChercheurComponent,
  CommunauteSavoirChercheurViewChercheurComponent,
  CommunauteSavoirChercheurEditChercheurComponent,
  CommunauteSavoirChercheurChercheurComponent,
  ComiteEtCommissionEvaluationCreateChercheurComponent,
  ComiteEtCommissionEvaluationListChercheurComponent,
  ComiteEtCommissionEvaluationViewChercheurComponent,
  ComiteEtCommissionEvaluationEditChercheurComponent,
  ComiteEtCommissionEvaluationChercheurComponent,
  EvenementColloqueScienntifiqueCreateChercheurComponent,
  EvenementColloqueScienntifiqueListChercheurComponent,
  EvenementColloqueScienntifiqueViewChercheurComponent,
  EvenementColloqueScienntifiqueEditChercheurComponent,
  EvenementColloqueScienntifiqueChercheurComponent,
  FormationContinueObjetFormationGeneriqueCreateChercheurComponent,
  FormationContinueObjetFormationGeneriqueListChercheurComponent,
  FormationContinueObjetFormationGeneriqueViewChercheurComponent,
  FormationContinueObjetFormationGeneriqueEditChercheurComponent,
  FormationContinueObjetFormationGeneriqueChercheurComponent,
  FormationContinueCreateChercheurComponent,
  FormationContinueListChercheurComponent,
  FormationContinueViewChercheurComponent,
  FormationContinueEditChercheurComponent,
  FormationContinueChercheurComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantCreateChercheurComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantListChercheurComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantViewChercheurComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantEditChercheurComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantChercheurComponent,
  ConsultanceScientifiquePonctuelleCreateChercheurComponent,
  ConsultanceScientifiquePonctuelleListChercheurComponent,
  ConsultanceScientifiquePonctuelleViewChercheurComponent,
  ConsultanceScientifiquePonctuelleEditChercheurComponent,
  ConsultanceScientifiquePonctuelleChercheurComponent,
  ZoneGeographiqueFormationContinueCreateChercheurComponent,
  ZoneGeographiqueFormationContinueListChercheurComponent,
  ZoneGeographiqueFormationContinueViewChercheurComponent,
  ZoneGeographiqueFormationContinueEditChercheurComponent,
  ZoneGeographiqueFormationContinueChercheurComponent,
  ProjetActiviteRechercheDetailInstrumentIrdCreateChercheurComponent,
  ProjetActiviteRechercheDetailInstrumentIrdListChercheurComponent,
  ProjetActiviteRechercheDetailInstrumentIrdViewChercheurComponent,
  ProjetActiviteRechercheDetailInstrumentIrdEditChercheurComponent,
  ProjetActiviteRechercheDetailInstrumentIrdChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdListChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdChercheurComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent,
  NatureActiviteGrandPubliqueCreateChercheurComponent,
  NatureActiviteGrandPubliqueListChercheurComponent,
  NatureActiviteGrandPubliqueViewChercheurComponent,
  NatureActiviteGrandPubliqueEditChercheurComponent,
  NatureActiviteGrandPubliqueChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysChercheurComponent,
  RoleDeveloppementDeSavoirCreateChercheurComponent,
  RoleDeveloppementDeSavoirListChercheurComponent,
  RoleDeveloppementDeSavoirViewChercheurComponent,
  RoleDeveloppementDeSavoirEditChercheurComponent,
  RoleDeveloppementDeSavoirChercheurComponent,
  TypeUtilisateurSavoirConcuCreateChercheurComponent,
  TypeUtilisateurSavoirConcuListChercheurComponent,
  TypeUtilisateurSavoirConcuViewChercheurComponent,
  TypeUtilisateurSavoirConcuEditChercheurComponent,
  TypeUtilisateurSavoirConcuChercheurComponent,
  EncadrementEtudiantDisciplineScientifiqueCreateChercheurComponent,
  EncadrementEtudiantDisciplineScientifiqueListChercheurComponent,
  EncadrementEtudiantDisciplineScientifiqueViewChercheurComponent,
  EncadrementEtudiantDisciplineScientifiqueEditChercheurComponent,
  EncadrementEtudiantDisciplineScientifiqueChercheurComponent,
  CommunauteSavoirExpertiseScientifiqueCreateChercheurComponent,
  CommunauteSavoirExpertiseScientifiqueListChercheurComponent,
  CommunauteSavoirExpertiseScientifiqueViewChercheurComponent,
  CommunauteSavoirExpertiseScientifiqueEditChercheurComponent,
  CommunauteSavoirExpertiseScientifiqueChercheurComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationCreateChercheurComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationListChercheurComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationViewChercheurComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationEditChercheurComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationChercheurComponent,
  DistinctionEtablissementPaysCreateChercheurComponent,
  DistinctionEtablissementPaysListChercheurComponent,
  DistinctionEtablissementPaysViewChercheurComponent,
  DistinctionEtablissementPaysEditChercheurComponent,
  DistinctionEtablissementPaysChercheurComponent,
  InstrumentIrdChercheurCreateChercheurComponent,
  InstrumentIrdChercheurListChercheurComponent,
  InstrumentIrdChercheurViewChercheurComponent,
  InstrumentIrdChercheurEditChercheurComponent,
  InstrumentIrdChercheurChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdChercheurComponent,
  EnseignementEtFormationCreateChercheurComponent,
  EnseignementEtFormationListChercheurComponent,
  EnseignementEtFormationViewChercheurComponent,
  EnseignementEtFormationEditChercheurComponent,
  EnseignementEtFormationChercheurComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueChercheurComponent,
  DisciplineScientifiqueExpertiseScientifiqueCreateChercheurComponent,
  DisciplineScientifiqueExpertiseScientifiqueListChercheurComponent,
  DisciplineScientifiqueExpertiseScientifiqueViewChercheurComponent,
  DisciplineScientifiqueExpertiseScientifiqueEditChercheurComponent,
  DisciplineScientifiqueExpertiseScientifiqueChercheurComponent,
  OutilPedagogiqueEnjeuxIrdCreateChercheurComponent,
  OutilPedagogiqueEnjeuxIrdListChercheurComponent,
  OutilPedagogiqueEnjeuxIrdViewChercheurComponent,
  OutilPedagogiqueEnjeuxIrdEditChercheurComponent,
  OutilPedagogiqueEnjeuxIrdChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueChercheurComponent,
  GestionEquipeCreateChercheurComponent,
  GestionEquipeListChercheurComponent,
  GestionEquipeViewChercheurComponent,
  GestionEquipeEditChercheurComponent,
  GestionEquipeChercheurComponent,
  DistinctionCreateChercheurComponent,
  DistinctionListChercheurComponent,
  DistinctionViewChercheurComponent,
  DistinctionEditChercheurComponent,
  DistinctionChercheurComponent,
  CampagneRelanceCreateChercheurComponent,
  CampagneRelanceListChercheurComponent,
  CampagneRelanceViewChercheurComponent,
  CampagneRelanceEditChercheurComponent,
  CampagneRelanceChercheurComponent,
  RencontreMediaEnjeuxIrdCreateChercheurComponent,
  RencontreMediaEnjeuxIrdListChercheurComponent,
  RencontreMediaEnjeuxIrdViewChercheurComponent,
  RencontreMediaEnjeuxIrdEditChercheurComponent,
  RencontreMediaEnjeuxIrdChercheurComponent,
  ResponsabilitePedagogiquePaysCreateChercheurComponent,
  ResponsabilitePedagogiquePaysListChercheurComponent,
  ResponsabilitePedagogiquePaysViewChercheurComponent,
  ResponsabilitePedagogiquePaysEditChercheurComponent,
  ResponsabilitePedagogiquePaysChercheurComponent,
  TypePubliqueRencontreMediaCreateChercheurComponent,
  TypePubliqueRencontreMediaListChercheurComponent,
  TypePubliqueRencontreMediaViewChercheurComponent,
  TypePubliqueRencontreMediaEditChercheurComponent,
  TypePubliqueRencontreMediaChercheurComponent,
  FormationContinueEnjeuxIrdCreateChercheurComponent,
  FormationContinueEnjeuxIrdListChercheurComponent,
  FormationContinueEnjeuxIrdViewChercheurComponent,
  FormationContinueEnjeuxIrdEditChercheurComponent,
  FormationContinueEnjeuxIrdChercheurComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleCreateChercheurComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleListChercheurComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleViewChercheurComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleEditChercheurComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleChercheurComponent,
  RencontreMediaPeriodeCreateChercheurComponent,
  RencontreMediaPeriodeListChercheurComponent,
  RencontreMediaPeriodeViewChercheurComponent,
  RencontreMediaPeriodeEditChercheurComponent,
  RencontreMediaPeriodeChercheurComponent,
  PaysRencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
  PaysRencontreGrandPubliqueJeunePubliqueListChercheurComponent,
  PaysRencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
  PaysRencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
  PaysRencontreGrandPubliqueJeunePubliqueChercheurComponent,
  CommunauteSavoirProjetActiviteRechercheCreateChercheurComponent,
  CommunauteSavoirProjetActiviteRechercheListChercheurComponent,
  CommunauteSavoirProjetActiviteRechercheViewChercheurComponent,
  CommunauteSavoirProjetActiviteRechercheEditChercheurComponent,
  CommunauteSavoirProjetActiviteRechercheChercheurComponent,
  OutilPedagogiqueLangueCreateChercheurComponent,
  OutilPedagogiqueLangueListChercheurComponent,
  OutilPedagogiqueLangueViewChercheurComponent,
  OutilPedagogiqueLangueEditChercheurComponent,
  OutilPedagogiqueLangueChercheurComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleCreateChercheurComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleListChercheurComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleEditChercheurComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleChercheurComponent,
  ProjetActiviteRechercheCreateChercheurComponent,
  ProjetActiviteRechercheListChercheurComponent,
  ProjetActiviteRechercheViewChercheurComponent,
  ProjetActiviteRechercheEditChercheurComponent,
  ProjetActiviteRechercheChercheurComponent,
  ResponsabilitePedagogiqueEtablissementCreateChercheurComponent,
  ResponsabilitePedagogiqueEtablissementListChercheurComponent,
  ResponsabilitePedagogiqueEtablissementViewChercheurComponent,
  ResponsabilitePedagogiqueEtablissementEditChercheurComponent,
  ResponsabilitePedagogiqueEtablissementChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementChercheurComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateChercheurComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueListChercheurComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewChercheurComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditChercheurComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueChercheurComponent,
  TypeInstrumentIrdChercheurCreateChercheurComponent,
  TypeInstrumentIrdChercheurListChercheurComponent,
  TypeInstrumentIrdChercheurViewChercheurComponent,
  TypeInstrumentIrdChercheurEditChercheurComponent,
  TypeInstrumentIrdChercheurChercheurComponent,
  DisciplineScientifiqueEncadrementDoctorantCreateChercheurComponent,
  DisciplineScientifiqueEncadrementDoctorantListChercheurComponent,
  DisciplineScientifiqueEncadrementDoctorantViewChercheurComponent,
  DisciplineScientifiqueEncadrementDoctorantEditChercheurComponent,
  DisciplineScientifiqueEncadrementDoctorantChercheurComponent,
  PaysRencontreMediaCreateChercheurComponent,
  PaysRencontreMediaListChercheurComponent,
  PaysRencontreMediaViewChercheurComponent,
  PaysRencontreMediaEditChercheurComponent,
  PaysRencontreMediaChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueListChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueChercheurComponent,
  TypeParticipationCreateChercheurComponent,
  TypeParticipationListChercheurComponent,
  TypeParticipationViewChercheurComponent,
  TypeParticipationEditChercheurComponent,
  TypeParticipationChercheurComponent,
  EvenementColloqueScienntifiquePaysCreateChercheurComponent,
  EvenementColloqueScienntifiquePaysListChercheurComponent,
  EvenementColloqueScienntifiquePaysViewChercheurComponent,
  EvenementColloqueScienntifiquePaysEditChercheurComponent,
  EvenementColloqueScienntifiquePaysChercheurComponent,
  EtatCampagneCreateChercheurComponent,
  EtatCampagneListChercheurComponent,
  EtatCampagneViewChercheurComponent,
  EtatCampagneEditChercheurComponent,
  EtatCampagneChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditChercheurComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdChercheurComponent,
  StructureOganisatriceCreateChercheurComponent,
  StructureOganisatriceListChercheurComponent,
  StructureOganisatriceViewChercheurComponent,
  StructureOganisatriceEditChercheurComponent,
  StructureOganisatriceChercheurComponent,
  DisciplineScientifiqueEncadrementEtudiantCreateChercheurComponent,
  DisciplineScientifiqueEncadrementEtudiantListChercheurComponent,
  DisciplineScientifiqueEncadrementEtudiantViewChercheurComponent,
  DisciplineScientifiqueEncadrementEtudiantEditChercheurComponent,
  DisciplineScientifiqueEncadrementEtudiantChercheurComponent,
  FormationContinueCommanditaireCreateChercheurComponent,
  FormationContinueCommanditaireListChercheurComponent,
  FormationContinueCommanditaireViewChercheurComponent,
  FormationContinueCommanditaireEditChercheurComponent,
  FormationContinueCommanditaireChercheurComponent,
  AffectationStructurelleCreateChercheurComponent,
  AffectationStructurelleListChercheurComponent,
  AffectationStructurelleViewChercheurComponent,
  AffectationStructurelleEditChercheurComponent,
  AffectationStructurelleChercheurComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
  PaysCommanditaireCreateChercheurComponent,
  PaysCommanditaireListChercheurComponent,
  PaysCommanditaireViewChercheurComponent,
  PaysCommanditaireEditChercheurComponent,
  PaysCommanditaireChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditChercheurComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdChercheurComponent,
  FormationContinueDisciplineScientifiqueCreateChercheurComponent,
  FormationContinueDisciplineScientifiqueListChercheurComponent,
  FormationContinueDisciplineScientifiqueViewChercheurComponent,
  FormationContinueDisciplineScientifiqueEditChercheurComponent,
  FormationContinueDisciplineScientifiqueChercheurComponent,
  EnjeuxIrdEncadrementDoctorantCreateChercheurComponent,
  EnjeuxIrdEncadrementDoctorantListChercheurComponent,
  EnjeuxIrdEncadrementDoctorantViewChercheurComponent,
  EnjeuxIrdEncadrementDoctorantEditChercheurComponent,
  EnjeuxIrdEncadrementDoctorantChercheurComponent,
  EnseignementNatureCreateChercheurComponent,
  EnseignementNatureListChercheurComponent,
  EnseignementNatureViewChercheurComponent,
  EnseignementNatureEditChercheurComponent,
  EnseignementNatureChercheurComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateChercheurComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListChercheurComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditChercheurComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueChercheurComponent,
  NiveauEtudeEnseignementCreateChercheurComponent,
  NiveauEtudeEnseignementListChercheurComponent,
  NiveauEtudeEnseignementViewChercheurComponent,
  NiveauEtudeEnseignementEditChercheurComponent,
  NiveauEtudeEnseignementChercheurComponent,
  CategorieNotificationCreateChercheurComponent,
  CategorieNotificationListChercheurComponent,
  CategorieNotificationViewChercheurComponent,
  CategorieNotificationEditChercheurComponent,
  CategorieNotificationChercheurComponent,
  ChercheurCreateChercheurComponent,
  ChercheurListChercheurComponent,
  ChercheurViewChercheurComponent,
  ChercheurEditChercheurComponent,
  ChercheurChercheurComponent,
  EtablissementConseilsScientifiqueCreateChercheurComponent,
  EtablissementConseilsScientifiqueListChercheurComponent,
  EtablissementConseilsScientifiqueViewChercheurComponent,
  EtablissementConseilsScientifiqueEditChercheurComponent,
  EtablissementConseilsScientifiqueChercheurComponent,
  CampagneCreateChercheurComponent,
  CampagneListChercheurComponent,
  CampagneViewChercheurComponent,
  CampagneEditChercheurComponent,
  CampagneChercheurComponent,
  EtatCampagneChercheurCreateChercheurComponent,
  EtatCampagneChercheurListChercheurComponent,
  EtatCampagneChercheurViewChercheurComponent,
  EtatCampagneChercheurEditChercheurComponent,
  EtatCampagneChercheurChercheurComponent,
  ],
  entryComponents: [],
})
export class ChercheurModule { }
