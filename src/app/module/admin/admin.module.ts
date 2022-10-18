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
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { ArchivableAdminModule } from './view/archivable/archivable.module';


import { GestionEquipeDetailCreateAdminComponent } from './view/gestion-equipe-detail-admin/create-admin/gestion-equipe-detail-create-admin.component';
import { GestionEquipeDetailEditAdminComponent } from './view/gestion-equipe-detail-admin/edit-admin/gestion-equipe-detail-edit-admin.component';
import { GestionEquipeDetailViewAdminComponent } from './view/gestion-equipe-detail-admin/view-admin/gestion-equipe-detail-view-admin.component';
import { GestionEquipeDetailListAdminComponent } from './view/gestion-equipe-detail-admin/list-admin/gestion-equipe-detail-list-admin.component';
import { GestionEquipeDetailAdminComponent } from './view/gestion-equipe-detail-admin/gestion-equipe-detail-admin.component';
import { KeyWordDisciplineScientifiqueErcCreateAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/create-admin/key-word-discipline-scientifique-erc-create-admin.component';
import { KeyWordDisciplineScientifiqueErcEditAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/edit-admin/key-word-discipline-scientifique-erc-edit-admin.component';
import { KeyWordDisciplineScientifiqueErcViewAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/view-admin/key-word-discipline-scientifique-erc-view-admin.component';
import { KeyWordDisciplineScientifiqueErcListAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/list-admin/key-word-discipline-scientifique-erc-list-admin.component';
import { KeyWordDisciplineScientifiqueErcAdminComponent } from './view/key-word-discipline-scientifique-erc-admin/key-word-discipline-scientifique-erc-admin.component';
import { GradeCreateAdminComponent } from './view/grade-admin/create-admin/grade-create-admin.component';
import { GradeEditAdminComponent } from './view/grade-admin/edit-admin/grade-edit-admin.component';
import { GradeViewAdminComponent } from './view/grade-admin/view-admin/grade-view-admin.component';
import { GradeListAdminComponent } from './view/grade-admin/list-admin/grade-list-admin.component';
import { GradeAdminComponent } from './view/grade-admin/grade-admin.component';
import { DoctorantCreateAdminComponent } from './view/doctorant-admin/create-admin/doctorant-create-admin.component';
import { DoctorantEditAdminComponent } from './view/doctorant-admin/edit-admin/doctorant-edit-admin.component';
import { DoctorantViewAdminComponent } from './view/doctorant-admin/view-admin/doctorant-view-admin.component';
import { DoctorantListAdminComponent } from './view/doctorant-admin/list-admin/doctorant-list-admin.component';
import { DoctorantAdminComponent } from './view/doctorant-admin/doctorant-admin.component';
import { ResponsabiliteEncadrementDoctorantCreateAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/create-admin/responsabilite-encadrement-doctorant-create-admin.component';
import { ResponsabiliteEncadrementDoctorantEditAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/edit-admin/responsabilite-encadrement-doctorant-edit-admin.component';
import { ResponsabiliteEncadrementDoctorantViewAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/view-admin/responsabilite-encadrement-doctorant-view-admin.component';
import { ResponsabiliteEncadrementDoctorantListAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/list-admin/responsabilite-encadrement-doctorant-list-admin.component';
import { ResponsabiliteEncadrementDoctorantAdminComponent } from './view/responsabilite-encadrement-doctorant-admin/responsabilite-encadrement-doctorant-admin.component';
import { LangueCreateAdminComponent } from './view/langue-admin/create-admin/langue-create-admin.component';
import { LangueEditAdminComponent } from './view/langue-admin/edit-admin/langue-edit-admin.component';
import { LangueViewAdminComponent } from './view/langue-admin/view-admin/langue-view-admin.component';
import { LangueListAdminComponent } from './view/langue-admin/list-admin/langue-list-admin.component';
import { LangueAdminComponent } from './view/langue-admin/langue-admin.component';
import { OutilPedagogiquePubliqueCibleCreateAdminComponent } from './view/outil-pedagogique-publique-cible-admin/create-admin/outil-pedagogique-publique-cible-create-admin.component';
import { OutilPedagogiquePubliqueCibleEditAdminComponent } from './view/outil-pedagogique-publique-cible-admin/edit-admin/outil-pedagogique-publique-cible-edit-admin.component';
import { OutilPedagogiquePubliqueCibleViewAdminComponent } from './view/outil-pedagogique-publique-cible-admin/view-admin/outil-pedagogique-publique-cible-view-admin.component';
import { OutilPedagogiquePubliqueCibleListAdminComponent } from './view/outil-pedagogique-publique-cible-admin/list-admin/outil-pedagogique-publique-cible-list-admin.component';
import { OutilPedagogiquePubliqueCibleAdminComponent } from './view/outil-pedagogique-publique-cible-admin/outil-pedagogique-publique-cible-admin.component';
import { RoleProjetCreateAdminComponent } from './view/role-projet-admin/create-admin/role-projet-create-admin.component';
import { RoleProjetEditAdminComponent } from './view/role-projet-admin/edit-admin/role-projet-edit-admin.component';
import { RoleProjetViewAdminComponent } from './view/role-projet-admin/view-admin/role-projet-view-admin.component';
import { RoleProjetListAdminComponent } from './view/role-projet-admin/list-admin/role-projet-list-admin.component';
import { RoleProjetAdminComponent } from './view/role-projet-admin/role-projet-admin.component';
import { DisciplineScientifiqueCreateAdminComponent } from './view/discipline-scientifique-admin/create-admin/discipline-scientifique-create-admin.component';
import { DisciplineScientifiqueEditAdminComponent } from './view/discipline-scientifique-admin/edit-admin/discipline-scientifique-edit-admin.component';
import { DisciplineScientifiqueViewAdminComponent } from './view/discipline-scientifique-admin/view-admin/discipline-scientifique-view-admin.component';
import { DisciplineScientifiqueListAdminComponent } from './view/discipline-scientifique-admin/list-admin/discipline-scientifique-list-admin.component';
import { DisciplineScientifiqueAdminComponent } from './view/discipline-scientifique-admin/discipline-scientifique-admin.component';
import { StatusContratEtConventionCreateAdminComponent } from './view/status-contrat-et-convention-admin/create-admin/status-contrat-et-convention-create-admin.component';
import { StatusContratEtConventionEditAdminComponent } from './view/status-contrat-et-convention-admin/edit-admin/status-contrat-et-convention-edit-admin.component';
import { StatusContratEtConventionViewAdminComponent } from './view/status-contrat-et-convention-admin/view-admin/status-contrat-et-convention-view-admin.component';
import { StatusContratEtConventionListAdminComponent } from './view/status-contrat-et-convention-admin/list-admin/status-contrat-et-convention-list-admin.component';
import { StatusContratEtConventionAdminComponent } from './view/status-contrat-et-convention-admin/status-contrat-et-convention-admin.component';
import { DisciplineScientifiqueErcParentCreateAdminComponent } from './view/discipline-scientifique-erc-parent-admin/create-admin/discipline-scientifique-erc-parent-create-admin.component';
import { DisciplineScientifiqueErcParentEditAdminComponent } from './view/discipline-scientifique-erc-parent-admin/edit-admin/discipline-scientifique-erc-parent-edit-admin.component';
import { DisciplineScientifiqueErcParentViewAdminComponent } from './view/discipline-scientifique-erc-parent-admin/view-admin/discipline-scientifique-erc-parent-view-admin.component';
import { DisciplineScientifiqueErcParentListAdminComponent } from './view/discipline-scientifique-erc-parent-admin/list-admin/discipline-scientifique-erc-parent-list-admin.component';
import { DisciplineScientifiqueErcParentAdminComponent } from './view/discipline-scientifique-erc-parent-admin/discipline-scientifique-erc-parent-admin.component';
import { ResponsabiliteDirectionEncadrementEtudiantCreateAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/create-admin/responsabilite-direction-encadrement-etudiant-create-admin.component';
import { ResponsabiliteDirectionEncadrementEtudiantEditAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/edit-admin/responsabilite-direction-encadrement-etudiant-edit-admin.component';
import { ResponsabiliteDirectionEncadrementEtudiantViewAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/view-admin/responsabilite-direction-encadrement-etudiant-view-admin.component';
import { ResponsabiliteDirectionEncadrementEtudiantListAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/list-admin/responsabilite-direction-encadrement-etudiant-list-admin.component';
import { ResponsabiliteDirectionEncadrementEtudiantAdminComponent } from './view/responsabilite-direction-encadrement-etudiant-admin/responsabilite-direction-encadrement-etudiant-admin.component';
import { ResponsabilitePedagogiqueCreateAdminComponent } from './view/responsabilite-pedagogique-admin/create-admin/responsabilite-pedagogique-create-admin.component';
import { ResponsabilitePedagogiqueEditAdminComponent } from './view/responsabilite-pedagogique-admin/edit-admin/responsabilite-pedagogique-edit-admin.component';
import { ResponsabilitePedagogiqueViewAdminComponent } from './view/responsabilite-pedagogique-admin/view-admin/responsabilite-pedagogique-view-admin.component';
import { ResponsabilitePedagogiqueListAdminComponent } from './view/responsabilite-pedagogique-admin/list-admin/responsabilite-pedagogique-list-admin.component';
import { ResponsabilitePedagogiqueAdminComponent } from './view/responsabilite-pedagogique-admin/responsabilite-pedagogique-admin.component';
import { CaracterisationCreateAdminComponent } from './view/caracterisation-admin/create-admin/caracterisation-create-admin.component';
import { CaracterisationEditAdminComponent } from './view/caracterisation-admin/edit-admin/caracterisation-edit-admin.component';
import { CaracterisationViewAdminComponent } from './view/caracterisation-admin/view-admin/caracterisation-view-admin.component';
import { CaracterisationListAdminComponent } from './view/caracterisation-admin/list-admin/caracterisation-list-admin.component';
import { CaracterisationAdminComponent } from './view/caracterisation-admin/caracterisation-admin.component';
import { ConseilEtComiteScientifiqueCreateAdminComponent } from './view/conseil-et-comite-scientifique-admin/create-admin/conseil-et-comite-scientifique-create-admin.component';
import { ConseilEtComiteScientifiqueEditAdminComponent } from './view/conseil-et-comite-scientifique-admin/edit-admin/conseil-et-comite-scientifique-edit-admin.component';
import { ConseilEtComiteScientifiqueViewAdminComponent } from './view/conseil-et-comite-scientifique-admin/view-admin/conseil-et-comite-scientifique-view-admin.component';
import { ConseilEtComiteScientifiqueListAdminComponent } from './view/conseil-et-comite-scientifique-admin/list-admin/conseil-et-comite-scientifique-list-admin.component';
import { ConseilEtComiteScientifiqueAdminComponent } from './view/conseil-et-comite-scientifique-admin/conseil-et-comite-scientifique-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin/developpement-de-savoir-et-innovation-scientifique-communaute-savoir-admin.component';
import { DepartementScientifiqueCreateAdminComponent } from './view/departement-scientifique-admin/create-admin/departement-scientifique-create-admin.component';
import { DepartementScientifiqueEditAdminComponent } from './view/departement-scientifique-admin/edit-admin/departement-scientifique-edit-admin.component';
import { DepartementScientifiqueViewAdminComponent } from './view/departement-scientifique-admin/view-admin/departement-scientifique-view-admin.component';
import { DepartementScientifiqueListAdminComponent } from './view/departement-scientifique-admin/list-admin/departement-scientifique-list-admin.component';
import { DepartementScientifiqueAdminComponent } from './view/departement-scientifique-admin/departement-scientifique-admin.component';
import { TypeEtudeEnseignementCreateAdminComponent } from './view/type-etude-enseignement-admin/create-admin/type-etude-enseignement-create-admin.component';
import { TypeEtudeEnseignementEditAdminComponent } from './view/type-etude-enseignement-admin/edit-admin/type-etude-enseignement-edit-admin.component';
import { TypeEtudeEnseignementViewAdminComponent } from './view/type-etude-enseignement-admin/view-admin/type-etude-enseignement-view-admin.component';
import { TypeEtudeEnseignementListAdminComponent } from './view/type-etude-enseignement-admin/list-admin/type-etude-enseignement-list-admin.component';
import { TypeEtudeEnseignementAdminComponent } from './view/type-etude-enseignement-admin/type-etude-enseignement-admin.component';
import { SavoirEtInnovationCreateAdminComponent } from './view/savoir-et-innovation-admin/create-admin/savoir-et-innovation-create-admin.component';
import { SavoirEtInnovationEditAdminComponent } from './view/savoir-et-innovation-admin/edit-admin/savoir-et-innovation-edit-admin.component';
import { SavoirEtInnovationViewAdminComponent } from './view/savoir-et-innovation-admin/view-admin/savoir-et-innovation-view-admin.component';
import { SavoirEtInnovationListAdminComponent } from './view/savoir-et-innovation-admin/list-admin/savoir-et-innovation-list-admin.component';
import { SavoirEtInnovationAdminComponent } from './view/savoir-et-innovation-admin/savoir-et-innovation-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-admin/developpement-de-savoir-et-innovation-scientifique-admin.component';
import { StructureIrdCreateAdminComponent } from './view/structure-ird-admin/create-admin/structure-ird-create-admin.component';
import { StructureIrdEditAdminComponent } from './view/structure-ird-admin/edit-admin/structure-ird-edit-admin.component';
import { StructureIrdViewAdminComponent } from './view/structure-ird-admin/view-admin/structure-ird-view-admin.component';
import { StructureIrdListAdminComponent } from './view/structure-ird-admin/list-admin/structure-ird-list-admin.component';
import { StructureIrdAdminComponent } from './view/structure-ird-admin/structure-ird-admin.component';
import { EnseignementZoneGeographiqueCreateAdminComponent } from './view/enseignement-zone-geographique-admin/create-admin/enseignement-zone-geographique-create-admin.component';
import { EnseignementZoneGeographiqueEditAdminComponent } from './view/enseignement-zone-geographique-admin/edit-admin/enseignement-zone-geographique-edit-admin.component';
import { EnseignementZoneGeographiqueViewAdminComponent } from './view/enseignement-zone-geographique-admin/view-admin/enseignement-zone-geographique-view-admin.component';
import { EnseignementZoneGeographiqueListAdminComponent } from './view/enseignement-zone-geographique-admin/list-admin/enseignement-zone-geographique-list-admin.component';
import { EnseignementZoneGeographiqueAdminComponent } from './view/enseignement-zone-geographique-admin/enseignement-zone-geographique-admin.component';
import { DisciplineScientifiqueErcAssociationCreateAdminComponent } from './view/discipline-scientifique-erc-association-admin/create-admin/discipline-scientifique-erc-association-create-admin.component';
import { DisciplineScientifiqueErcAssociationEditAdminComponent } from './view/discipline-scientifique-erc-association-admin/edit-admin/discipline-scientifique-erc-association-edit-admin.component';
import { DisciplineScientifiqueErcAssociationViewAdminComponent } from './view/discipline-scientifique-erc-association-admin/view-admin/discipline-scientifique-erc-association-view-admin.component';
import { DisciplineScientifiqueErcAssociationListAdminComponent } from './view/discipline-scientifique-erc-association-admin/list-admin/discipline-scientifique-erc-association-list-admin.component';
import { DisciplineScientifiqueErcAssociationAdminComponent } from './view/discipline-scientifique-erc-association-admin/discipline-scientifique-erc-association-admin.component';
import { IdentifiantAuteurExpertCreateAdminComponent } from './view/identifiant-auteur-expert-admin/create-admin/identifiant-auteur-expert-create-admin.component';
import { IdentifiantAuteurExpertEditAdminComponent } from './view/identifiant-auteur-expert-admin/edit-admin/identifiant-auteur-expert-edit-admin.component';
import { IdentifiantAuteurExpertViewAdminComponent } from './view/identifiant-auteur-expert-admin/view-admin/identifiant-auteur-expert-view-admin.component';
import { IdentifiantAuteurExpertListAdminComponent } from './view/identifiant-auteur-expert-admin/list-admin/identifiant-auteur-expert-list-admin.component';
import { IdentifiantAuteurExpertAdminComponent } from './view/identifiant-auteur-expert-admin/identifiant-auteur-expert-admin.component';
import { CommunauteSavoirEncadrementDoctorantCreateAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/create-admin/communaute-savoir-encadrement-doctorant-create-admin.component';
import { CommunauteSavoirEncadrementDoctorantEditAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/edit-admin/communaute-savoir-encadrement-doctorant-edit-admin.component';
import { CommunauteSavoirEncadrementDoctorantViewAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/view-admin/communaute-savoir-encadrement-doctorant-view-admin.component';
import { CommunauteSavoirEncadrementDoctorantListAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/list-admin/communaute-savoir-encadrement-doctorant-list-admin.component';
import { CommunauteSavoirEncadrementDoctorantAdminComponent } from './view/communaute-savoir-encadrement-doctorant-admin/communaute-savoir-encadrement-doctorant-admin.component';
import { ZoneActiviteInteractionRechercheCreateAdminComponent } from './view/zone-activite-interaction-recherche-admin/create-admin/zone-activite-interaction-recherche-create-admin.component';
import { ZoneActiviteInteractionRechercheEditAdminComponent } from './view/zone-activite-interaction-recherche-admin/edit-admin/zone-activite-interaction-recherche-edit-admin.component';
import { ZoneActiviteInteractionRechercheViewAdminComponent } from './view/zone-activite-interaction-recherche-admin/view-admin/zone-activite-interaction-recherche-view-admin.component';
import { ZoneActiviteInteractionRechercheListAdminComponent } from './view/zone-activite-interaction-recherche-admin/list-admin/zone-activite-interaction-recherche-list-admin.component';
import { ZoneActiviteInteractionRechercheAdminComponent } from './view/zone-activite-interaction-recherche-admin/zone-activite-interaction-recherche-admin.component';
import { TypeOutilCreateAdminComponent } from './view/type-outil-admin/create-admin/type-outil-create-admin.component';
import { TypeOutilEditAdminComponent } from './view/type-outil-admin/edit-admin/type-outil-edit-admin.component';
import { TypeOutilViewAdminComponent } from './view/type-outil-admin/view-admin/type-outil-view-admin.component';
import { TypeOutilListAdminComponent } from './view/type-outil-admin/list-admin/type-outil-list-admin.component';
import { TypeOutilAdminComponent } from './view/type-outil-admin/type-outil-admin.component';
import { DisciplineScientifiqueConseilsScientifiqueCreateAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/create-admin/discipline-scientifique-conseils-scientifique-create-admin.component';
import { DisciplineScientifiqueConseilsScientifiqueEditAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/edit-admin/discipline-scientifique-conseils-scientifique-edit-admin.component';
import { DisciplineScientifiqueConseilsScientifiqueViewAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/view-admin/discipline-scientifique-conseils-scientifique-view-admin.component';
import { DisciplineScientifiqueConseilsScientifiqueListAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/list-admin/discipline-scientifique-conseils-scientifique-list-admin.component';
import { DisciplineScientifiqueConseilsScientifiqueAdminComponent } from './view/discipline-scientifique-conseils-scientifique-admin/discipline-scientifique-conseils-scientifique-admin.component';
import { VieInstitutionnelleCreateAdminComponent } from './view/vie-institutionnelle-admin/create-admin/vie-institutionnelle-create-admin.component';
import { VieInstitutionnelleEditAdminComponent } from './view/vie-institutionnelle-admin/edit-admin/vie-institutionnelle-edit-admin.component';
import { VieInstitutionnelleViewAdminComponent } from './view/vie-institutionnelle-admin/view-admin/vie-institutionnelle-view-admin.component';
import { VieInstitutionnelleListAdminComponent } from './view/vie-institutionnelle-admin/list-admin/vie-institutionnelle-list-admin.component';
import { VieInstitutionnelleAdminComponent } from './view/vie-institutionnelle-admin/vie-institutionnelle-admin.component';
import { CommunauteSavoirEncadrementEtudiantCreateAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/create-admin/communaute-savoir-encadrement-etudiant-create-admin.component';
import { CommunauteSavoirEncadrementEtudiantEditAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/edit-admin/communaute-savoir-encadrement-etudiant-edit-admin.component';
import { CommunauteSavoirEncadrementEtudiantViewAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/view-admin/communaute-savoir-encadrement-etudiant-view-admin.component';
import { CommunauteSavoirEncadrementEtudiantListAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/list-admin/communaute-savoir-encadrement-etudiant-list-admin.component';
import { CommunauteSavoirEncadrementEtudiantAdminComponent } from './view/communaute-savoir-encadrement-etudiant-admin/communaute-savoir-encadrement-etudiant-admin.component';
import { ConseilsScientifiqueCreateAdminComponent } from './view/conseils-scientifique-admin/create-admin/conseils-scientifique-create-admin.component';
import { ConseilsScientifiqueEditAdminComponent } from './view/conseils-scientifique-admin/edit-admin/conseils-scientifique-edit-admin.component';
import { ConseilsScientifiqueViewAdminComponent } from './view/conseils-scientifique-admin/view-admin/conseils-scientifique-view-admin.component';
import { ConseilsScientifiqueListAdminComponent } from './view/conseils-scientifique-admin/list-admin/conseils-scientifique-list-admin.component';
import { ConseilsScientifiqueAdminComponent } from './view/conseils-scientifique-admin/conseils-scientifique-admin.component';
import { InstrumentsEtDispositifsIrdCreateAdminComponent } from './view/instruments-et-dispositifs-ird-admin/create-admin/instruments-et-dispositifs-ird-create-admin.component';
import { InstrumentsEtDispositifsIrdEditAdminComponent } from './view/instruments-et-dispositifs-ird-admin/edit-admin/instruments-et-dispositifs-ird-edit-admin.component';
import { InstrumentsEtDispositifsIrdViewAdminComponent } from './view/instruments-et-dispositifs-ird-admin/view-admin/instruments-et-dispositifs-ird-view-admin.component';
import { InstrumentsEtDispositifsIrdListAdminComponent } from './view/instruments-et-dispositifs-ird-admin/list-admin/instruments-et-dispositifs-ird-list-admin.component';
import { InstrumentsEtDispositifsIrdAdminComponent } from './view/instruments-et-dispositifs-ird-admin/instruments-et-dispositifs-ird-admin.component';
import { EtatReclamationCreateAdminComponent } from './view/etat-reclamation-admin/create-admin/etat-reclamation-create-admin.component';
import { EtatReclamationEditAdminComponent } from './view/etat-reclamation-admin/edit-admin/etat-reclamation-edit-admin.component';
import { EtatReclamationViewAdminComponent } from './view/etat-reclamation-admin/view-admin/etat-reclamation-view-admin.component';
import { EtatReclamationListAdminComponent } from './view/etat-reclamation-admin/list-admin/etat-reclamation-list-admin.component';
import { EtatReclamationAdminComponent } from './view/etat-reclamation-admin/etat-reclamation-admin.component';
import { TemplateOuvertureCreateAdminComponent } from './view/template-ouverture-admin/create-admin/template-ouverture-create-admin.component';
import { TemplateOuvertureEditAdminComponent } from './view/template-ouverture-admin/edit-admin/template-ouverture-edit-admin.component';
import { TemplateOuvertureViewAdminComponent } from './view/template-ouverture-admin/view-admin/template-ouverture-view-admin.component';
import { TemplateOuvertureListAdminComponent } from './view/template-ouverture-admin/list-admin/template-ouverture-list-admin.component';
import { TemplateOuvertureAdminComponent } from './view/template-ouverture-admin/template-ouverture-admin.component';
import { NotificationCreateAdminComponent } from './view/notification-admin/create-admin/notification-create-admin.component';
import { NotificationEditAdminComponent } from './view/notification-admin/edit-admin/notification-edit-admin.component';
import { NotificationViewAdminComponent } from './view/notification-admin/view-admin/notification-view-admin.component';
import { NotificationListAdminComponent } from './view/notification-admin/list-admin/notification-list-admin.component';
import { NotificationAdminComponent } from './view/notification-admin/notification-admin.component';
import { VieInstitutionnelleDetailEtablissementCreateAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/create-admin/vie-institutionnelle-detail-etablissement-create-admin.component';
import { VieInstitutionnelleDetailEtablissementEditAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/edit-admin/vie-institutionnelle-detail-etablissement-edit-admin.component';
import { VieInstitutionnelleDetailEtablissementViewAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/view-admin/vie-institutionnelle-detail-etablissement-view-admin.component';
import { VieInstitutionnelleDetailEtablissementListAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/list-admin/vie-institutionnelle-detail-etablissement-list-admin.component';
import { VieInstitutionnelleDetailEtablissementAdminComponent } from './view/vie-institutionnelle-detail-etablissement-admin/vie-institutionnelle-detail-etablissement-admin.component';
import { OutilPedagogiqueInstrumentIrdCreateAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/create-admin/outil-pedagogique-instrument-ird-create-admin.component';
import { OutilPedagogiqueInstrumentIrdEditAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/edit-admin/outil-pedagogique-instrument-ird-edit-admin.component';
import { OutilPedagogiqueInstrumentIrdViewAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/view-admin/outil-pedagogique-instrument-ird-view-admin.component';
import { OutilPedagogiqueInstrumentIrdListAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/list-admin/outil-pedagogique-instrument-ird-list-admin.component';
import { OutilPedagogiqueInstrumentIrdAdminComponent } from './view/outil-pedagogique-instrument-ird-admin/outil-pedagogique-instrument-ird-admin.component';
import { OutilPedagogiqueCreateAdminComponent } from './view/outil-pedagogique-admin/create-admin/outil-pedagogique-create-admin.component';
import { OutilPedagogiqueEditAdminComponent } from './view/outil-pedagogique-admin/edit-admin/outil-pedagogique-edit-admin.component';
import { OutilPedagogiqueViewAdminComponent } from './view/outil-pedagogique-admin/view-admin/outil-pedagogique-view-admin.component';
import { OutilPedagogiqueListAdminComponent } from './view/outil-pedagogique-admin/list-admin/outil-pedagogique-list-admin.component';
import { OutilPedagogiqueAdminComponent } from './view/outil-pedagogique-admin/outil-pedagogique-admin.component';
import { TypeOutilPedagogiqueCreateAdminComponent } from './view/type-outil-pedagogique-admin/create-admin/type-outil-pedagogique-create-admin.component';
import { TypeOutilPedagogiqueEditAdminComponent } from './view/type-outil-pedagogique-admin/edit-admin/type-outil-pedagogique-edit-admin.component';
import { TypeOutilPedagogiqueViewAdminComponent } from './view/type-outil-pedagogique-admin/view-admin/type-outil-pedagogique-view-admin.component';
import { TypeOutilPedagogiqueListAdminComponent } from './view/type-outil-pedagogique-admin/list-admin/type-outil-pedagogique-list-admin.component';
import { TypeOutilPedagogiqueAdminComponent } from './view/type-outil-pedagogique-admin/type-outil-pedagogique-admin.component';
import { NatureExpertiseCreateAdminComponent } from './view/nature-expertise-admin/create-admin/nature-expertise-create-admin.component';
import { NatureExpertiseEditAdminComponent } from './view/nature-expertise-admin/edit-admin/nature-expertise-edit-admin.component';
import { NatureExpertiseViewAdminComponent } from './view/nature-expertise-admin/view-admin/nature-expertise-view-admin.component';
import { NatureExpertiseListAdminComponent } from './view/nature-expertise-admin/list-admin/nature-expertise-list-admin.component';
import { NatureExpertiseAdminComponent } from './view/nature-expertise-admin/nature-expertise-admin.component';
import { ObjetFormationGeneriqueCreateAdminComponent } from './view/objet-formation-generique-admin/create-admin/objet-formation-generique-create-admin.component';
import { ObjetFormationGeneriqueEditAdminComponent } from './view/objet-formation-generique-admin/edit-admin/objet-formation-generique-edit-admin.component';
import { ObjetFormationGeneriqueViewAdminComponent } from './view/objet-formation-generique-admin/view-admin/objet-formation-generique-view-admin.component';
import { ObjetFormationGeneriqueListAdminComponent } from './view/objet-formation-generique-admin/list-admin/objet-formation-generique-list-admin.component';
import { ObjetFormationGeneriqueAdminComponent } from './view/objet-formation-generique-admin/objet-formation-generique-admin.component';
import { DisciplineScientifiqueChercheurCreateAdminComponent } from './view/discipline-scientifique-chercheur-admin/create-admin/discipline-scientifique-chercheur-create-admin.component';
import { DisciplineScientifiqueChercheurEditAdminComponent } from './view/discipline-scientifique-chercheur-admin/edit-admin/discipline-scientifique-chercheur-edit-admin.component';
import { DisciplineScientifiqueChercheurViewAdminComponent } from './view/discipline-scientifique-chercheur-admin/view-admin/discipline-scientifique-chercheur-view-admin.component';
import { DisciplineScientifiqueChercheurListAdminComponent } from './view/discipline-scientifique-chercheur-admin/list-admin/discipline-scientifique-chercheur-list-admin.component';
import { DisciplineScientifiqueChercheurAdminComponent } from './view/discipline-scientifique-chercheur-admin/discipline-scientifique-chercheur-admin.component';
import { OutilPedagogiquePaysDiffusionCreateAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/create-admin/outil-pedagogique-pays-diffusion-create-admin.component';
import { OutilPedagogiquePaysDiffusionEditAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/edit-admin/outil-pedagogique-pays-diffusion-edit-admin.component';
import { OutilPedagogiquePaysDiffusionViewAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/view-admin/outil-pedagogique-pays-diffusion-view-admin.component';
import { OutilPedagogiquePaysDiffusionListAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/list-admin/outil-pedagogique-pays-diffusion-list-admin.component';
import { OutilPedagogiquePaysDiffusionAdminComponent } from './view/outil-pedagogique-pays-diffusion-admin/outil-pedagogique-pays-diffusion-admin.component';
import { RencontreMediaDisciplineScientifiqueCreateAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/create-admin/rencontre-media-discipline-scientifique-create-admin.component';
import { RencontreMediaDisciplineScientifiqueEditAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/edit-admin/rencontre-media-discipline-scientifique-edit-admin.component';
import { RencontreMediaDisciplineScientifiqueViewAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/view-admin/rencontre-media-discipline-scientifique-view-admin.component';
import { RencontreMediaDisciplineScientifiqueListAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/list-admin/rencontre-media-discipline-scientifique-list-admin.component';
import { RencontreMediaDisciplineScientifiqueAdminComponent } from './view/rencontre-media-discipline-scientifique-admin/rencontre-media-discipline-scientifique-admin.component';
import { CommunauteSavoirEvenementColloqueScientifiqueCreateAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/create-admin/communaute-savoir-evenement-colloque-scientifique-create-admin.component';
import { CommunauteSavoirEvenementColloqueScientifiqueEditAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/edit-admin/communaute-savoir-evenement-colloque-scientifique-edit-admin.component';
import { CommunauteSavoirEvenementColloqueScientifiqueViewAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/view-admin/communaute-savoir-evenement-colloque-scientifique-view-admin.component';
import { CommunauteSavoirEvenementColloqueScientifiqueListAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/list-admin/communaute-savoir-evenement-colloque-scientifique-list-admin.component';
import { CommunauteSavoirEvenementColloqueScientifiqueAdminComponent } from './view/communaute-savoir-evenement-colloque-scientifique-admin/communaute-savoir-evenement-colloque-scientifique-admin.component';
import { PubliqueCibleCreateAdminComponent } from './view/publique-cible-admin/create-admin/publique-cible-create-admin.component';
import { PubliqueCibleEditAdminComponent } from './view/publique-cible-admin/edit-admin/publique-cible-edit-admin.component';
import { PubliqueCibleViewAdminComponent } from './view/publique-cible-admin/view-admin/publique-cible-view-admin.component';
import { PubliqueCibleListAdminComponent } from './view/publique-cible-admin/list-admin/publique-cible-list-admin.component';
import { PubliqueCibleAdminComponent } from './view/publique-cible-admin/publique-cible-admin.component';
import { VieInstitutionnelleDetailCreateAdminComponent } from './view/vie-institutionnelle-detail-admin/create-admin/vie-institutionnelle-detail-create-admin.component';
import { VieInstitutionnelleDetailEditAdminComponent } from './view/vie-institutionnelle-detail-admin/edit-admin/vie-institutionnelle-detail-edit-admin.component';
import { VieInstitutionnelleDetailViewAdminComponent } from './view/vie-institutionnelle-detail-admin/view-admin/vie-institutionnelle-detail-view-admin.component';
import { VieInstitutionnelleDetailListAdminComponent } from './view/vie-institutionnelle-detail-admin/list-admin/vie-institutionnelle-detail-list-admin.component';
import { VieInstitutionnelleDetailAdminComponent } from './view/vie-institutionnelle-detail-admin/vie-institutionnelle-detail-admin.component';
import { EtablissementProjetCreateAdminComponent } from './view/etablissement-projet-admin/create-admin/etablissement-projet-create-admin.component';
import { EtablissementProjetEditAdminComponent } from './view/etablissement-projet-admin/edit-admin/etablissement-projet-edit-admin.component';
import { EtablissementProjetViewAdminComponent } from './view/etablissement-projet-admin/view-admin/etablissement-projet-view-admin.component';
import { EtablissementProjetListAdminComponent } from './view/etablissement-projet-admin/list-admin/etablissement-projet-list-admin.component';
import { EtablissementProjetAdminComponent } from './view/etablissement-projet-admin/etablissement-projet-admin.component';
import { StatusProjetCreateAdminComponent } from './view/status-projet-admin/create-admin/status-projet-create-admin.component';
import { StatusProjetEditAdminComponent } from './view/status-projet-admin/edit-admin/status-projet-edit-admin.component';
import { StatusProjetViewAdminComponent } from './view/status-projet-admin/view-admin/status-projet-view-admin.component';
import { StatusProjetListAdminComponent } from './view/status-projet-admin/list-admin/status-projet-list-admin.component';
import { StatusProjetAdminComponent } from './view/status-projet-admin/status-projet-admin.component';
import { NiveauResponsabilitePedagogiqueCreateAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/create-admin/niveau-responsabilite-pedagogique-create-admin.component';
import { NiveauResponsabilitePedagogiqueEditAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/edit-admin/niveau-responsabilite-pedagogique-edit-admin.component';
import { NiveauResponsabilitePedagogiqueViewAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/view-admin/niveau-responsabilite-pedagogique-view-admin.component';
import { NiveauResponsabilitePedagogiqueListAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/list-admin/niveau-responsabilite-pedagogique-list-admin.component';
import { NiveauResponsabilitePedagogiqueAdminComponent } from './view/niveau-responsabilite-pedagogique-admin/niveau-responsabilite-pedagogique-admin.component';
import { ZoneGeographiqueConseilsScientifiqueCreateAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/create-admin/zone-geographique-conseils-scientifique-create-admin.component';
import { ZoneGeographiqueConseilsScientifiqueEditAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/edit-admin/zone-geographique-conseils-scientifique-edit-admin.component';
import { ZoneGeographiqueConseilsScientifiqueViewAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/view-admin/zone-geographique-conseils-scientifique-view-admin.component';
import { ZoneGeographiqueConseilsScientifiqueListAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/list-admin/zone-geographique-conseils-scientifique-list-admin.component';
import { ZoneGeographiqueConseilsScientifiqueAdminComponent } from './view/zone-geographique-conseils-scientifique-admin/zone-geographique-conseils-scientifique-admin.component';
import { EtablissementConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/create-admin/etablissement-consultance-scientifique-ponctuelle-create-admin.component';
import { EtablissementConsultanceScientifiquePonctuelleEditAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/edit-admin/etablissement-consultance-scientifique-ponctuelle-edit-admin.component';
import { EtablissementConsultanceScientifiquePonctuelleViewAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/view-admin/etablissement-consultance-scientifique-ponctuelle-view-admin.component';
import { EtablissementConsultanceScientifiquePonctuelleListAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/list-admin/etablissement-consultance-scientifique-ponctuelle-list-admin.component';
import { EtablissementConsultanceScientifiquePonctuelleAdminComponent } from './view/etablissement-consultance-scientifique-ponctuelle-admin/etablissement-consultance-scientifique-ponctuelle-admin.component';
import { PubliqueProfessionelCreateAdminComponent } from './view/publique-professionel-admin/create-admin/publique-professionel-create-admin.component';
import { PubliqueProfessionelEditAdminComponent } from './view/publique-professionel-admin/edit-admin/publique-professionel-edit-admin.component';
import { PubliqueProfessionelViewAdminComponent } from './view/publique-professionel-admin/view-admin/publique-professionel-view-admin.component';
import { PubliqueProfessionelListAdminComponent } from './view/publique-professionel-admin/list-admin/publique-professionel-list-admin.component';
import { PubliqueProfessionelAdminComponent } from './view/publique-professionel-admin/publique-professionel-admin.component';
import { CampagneRelanceChercheurCreateAdminComponent } from './view/campagne-relance-chercheur-admin/create-admin/campagne-relance-chercheur-create-admin.component';
import { CampagneRelanceChercheurEditAdminComponent } from './view/campagne-relance-chercheur-admin/edit-admin/campagne-relance-chercheur-edit-admin.component';
import { CampagneRelanceChercheurViewAdminComponent } from './view/campagne-relance-chercheur-admin/view-admin/campagne-relance-chercheur-view-admin.component';
import { CampagneRelanceChercheurListAdminComponent } from './view/campagne-relance-chercheur-admin/list-admin/campagne-relance-chercheur-list-admin.component';
import { CampagneRelanceChercheurAdminComponent } from './view/campagne-relance-chercheur-admin/campagne-relance-chercheur-admin.component';
import { TypeEnseignementCreateAdminComponent } from './view/type-enseignement-admin/create-admin/type-enseignement-create-admin.component';
import { TypeEnseignementEditAdminComponent } from './view/type-enseignement-admin/edit-admin/type-enseignement-edit-admin.component';
import { TypeEnseignementViewAdminComponent } from './view/type-enseignement-admin/view-admin/type-enseignement-view-admin.component';
import { TypeEnseignementListAdminComponent } from './view/type-enseignement-admin/list-admin/type-enseignement-list-admin.component';
import { TypeEnseignementAdminComponent } from './view/type-enseignement-admin/type-enseignement-admin.component';
import { ContratEtConventionIrdCreateAdminComponent } from './view/contrat-et-convention-ird-admin/create-admin/contrat-et-convention-ird-create-admin.component';
import { ContratEtConventionIrdEditAdminComponent } from './view/contrat-et-convention-ird-admin/edit-admin/contrat-et-convention-ird-edit-admin.component';
import { ContratEtConventionIrdViewAdminComponent } from './view/contrat-et-convention-ird-admin/view-admin/contrat-et-convention-ird-view-admin.component';
import { ContratEtConventionIrdListAdminComponent } from './view/contrat-et-convention-ird-admin/list-admin/contrat-et-convention-ird-list-admin.component';
import { ContratEtConventionIrdAdminComponent } from './view/contrat-et-convention-ird-admin/contrat-et-convention-ird-admin.component';
import { ProjetActiviteRechercheDetailPaysCreateAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/create-admin/projet-activite-recherche-detail-pays-create-admin.component';
import { ProjetActiviteRechercheDetailPaysEditAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/edit-admin/projet-activite-recherche-detail-pays-edit-admin.component';
import { ProjetActiviteRechercheDetailPaysViewAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/view-admin/projet-activite-recherche-detail-pays-view-admin.component';
import { ProjetActiviteRechercheDetailPaysListAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/list-admin/projet-activite-recherche-detail-pays-list-admin.component';
import { ProjetActiviteRechercheDetailPaysAdminComponent } from './view/projet-activite-recherche-detail-pays-admin/projet-activite-recherche-detail-pays-admin.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/create-admin/rencontre-grand-publique-jeune-publique-periode-create-admin.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/edit-admin/rencontre-grand-publique-jeune-publique-periode-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/view-admin/rencontre-grand-publique-jeune-publique-periode-view-admin.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/list-admin/rencontre-grand-publique-jeune-publique-periode-list-admin.component';
import { RencontreGrandPubliqueJeunePubliquePeriodeAdminComponent } from './view/rencontre-grand-publique-jeune-publique-periode-admin/rencontre-grand-publique-jeune-publique-periode-admin.component';
import { PaysFormationContinueCreateAdminComponent } from './view/pays-formation-continue-admin/create-admin/pays-formation-continue-create-admin.component';
import { PaysFormationContinueEditAdminComponent } from './view/pays-formation-continue-admin/edit-admin/pays-formation-continue-edit-admin.component';
import { PaysFormationContinueViewAdminComponent } from './view/pays-formation-continue-admin/view-admin/pays-formation-continue-view-admin.component';
import { PaysFormationContinueListAdminComponent } from './view/pays-formation-continue-admin/list-admin/pays-formation-continue-list-admin.component';
import { PaysFormationContinueAdminComponent } from './view/pays-formation-continue-admin/pays-formation-continue-admin.component';
import { VieInstitutionnelleDetailInstrumentIrdCreateAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/create-admin/vie-institutionnelle-detail-instrument-ird-create-admin.component';
import { VieInstitutionnelleDetailInstrumentIrdEditAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/edit-admin/vie-institutionnelle-detail-instrument-ird-edit-admin.component';
import { VieInstitutionnelleDetailInstrumentIrdViewAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/view-admin/vie-institutionnelle-detail-instrument-ird-view-admin.component';
import { VieInstitutionnelleDetailInstrumentIrdListAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/list-admin/vie-institutionnelle-detail-instrument-ird-list-admin.component';
import { VieInstitutionnelleDetailInstrumentIrdAdminComponent } from './view/vie-institutionnelle-detail-instrument-ird-admin/vie-institutionnelle-detail-instrument-ird-admin.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdCreateAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/create-admin/evenement-colloque-scienntifique-enjeux-ird-create-admin.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdEditAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/edit-admin/evenement-colloque-scienntifique-enjeux-ird-edit-admin.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdViewAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/view-admin/evenement-colloque-scienntifique-enjeux-ird-view-admin.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdListAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/list-admin/evenement-colloque-scienntifique-enjeux-ird-list-admin.component';
import { EvenementColloqueScienntifiqueEnjeuxIrdAdminComponent } from './view/evenement-colloque-scienntifique-enjeux-ird-admin/evenement-colloque-scienntifique-enjeux-ird-admin.component';
import { NationaliteCreateAdminComponent } from './view/nationalite-admin/create-admin/nationalite-create-admin.component';
import { NationaliteEditAdminComponent } from './view/nationalite-admin/edit-admin/nationalite-edit-admin.component';
import { NationaliteViewAdminComponent } from './view/nationalite-admin/view-admin/nationalite-view-admin.component';
import { NationaliteListAdminComponent } from './view/nationalite-admin/list-admin/nationalite-list-admin.component';
import { NationaliteAdminComponent } from './view/nationalite-admin/nationalite-admin.component';
import { CultureScientifiqueCreateAdminComponent } from './view/culture-scientifique-admin/create-admin/culture-scientifique-create-admin.component';
import { CultureScientifiqueEditAdminComponent } from './view/culture-scientifique-admin/edit-admin/culture-scientifique-edit-admin.component';
import { CultureScientifiqueViewAdminComponent } from './view/culture-scientifique-admin/view-admin/culture-scientifique-view-admin.component';
import { CultureScientifiqueListAdminComponent } from './view/culture-scientifique-admin/list-admin/culture-scientifique-list-admin.component';
import { CultureScientifiqueAdminComponent } from './view/culture-scientifique-admin/culture-scientifique-admin.component';
import { EnseignementCreateAdminComponent } from './view/enseignement-admin/create-admin/enseignement-create-admin.component';
import { EnseignementEditAdminComponent } from './view/enseignement-admin/edit-admin/enseignement-edit-admin.component';
import { EnseignementViewAdminComponent } from './view/enseignement-admin/view-admin/enseignement-view-admin.component';
import { EnseignementListAdminComponent } from './view/enseignement-admin/list-admin/enseignement-list-admin.component';
import { EnseignementAdminComponent } from './view/enseignement-admin/enseignement-admin.component';
import { PaysZoneGeographiqueCreateAdminComponent } from './view/pays-zone-geographique-admin/create-admin/pays-zone-geographique-create-admin.component';
import { PaysZoneGeographiqueEditAdminComponent } from './view/pays-zone-geographique-admin/edit-admin/pays-zone-geographique-edit-admin.component';
import { PaysZoneGeographiqueViewAdminComponent } from './view/pays-zone-geographique-admin/view-admin/pays-zone-geographique-view-admin.component';
import { PaysZoneGeographiqueListAdminComponent } from './view/pays-zone-geographique-admin/list-admin/pays-zone-geographique-list-admin.component';
import { PaysZoneGeographiqueAdminComponent } from './view/pays-zone-geographique-admin/pays-zone-geographique-admin.component';
import { EncadrementEtudiantCreateAdminComponent } from './view/encadrement-etudiant-admin/create-admin/encadrement-etudiant-create-admin.component';
import { EncadrementEtudiantEditAdminComponent } from './view/encadrement-etudiant-admin/edit-admin/encadrement-etudiant-edit-admin.component';
import { EncadrementEtudiantViewAdminComponent } from './view/encadrement-etudiant-admin/view-admin/encadrement-etudiant-view-admin.component';
import { EncadrementEtudiantListAdminComponent } from './view/encadrement-etudiant-admin/list-admin/encadrement-etudiant-list-admin.component';
import { EncadrementEtudiantAdminComponent } from './view/encadrement-etudiant-admin/encadrement-etudiant-admin.component';
import { EnjeuxIrdCreateAdminComponent } from './view/enjeux-ird-admin/create-admin/enjeux-ird-create-admin.component';
import { EnjeuxIrdEditAdminComponent } from './view/enjeux-ird-admin/edit-admin/enjeux-ird-edit-admin.component';
import { EnjeuxIrdViewAdminComponent } from './view/enjeux-ird-admin/view-admin/enjeux-ird-view-admin.component';
import { EnjeuxIrdListAdminComponent } from './view/enjeux-ird-admin/list-admin/enjeux-ird-list-admin.component';
import { EnjeuxIrdAdminComponent } from './view/enjeux-ird-admin/enjeux-ird-admin.component';
import { EnjeuxIrdComiteEtCommissionEvaluationCreateAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/create-admin/enjeux-ird-comite-et-commission-evaluation-create-admin.component';
import { EnjeuxIrdComiteEtCommissionEvaluationEditAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/edit-admin/enjeux-ird-comite-et-commission-evaluation-edit-admin.component';
import { EnjeuxIrdComiteEtCommissionEvaluationViewAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/view-admin/enjeux-ird-comite-et-commission-evaluation-view-admin.component';
import { EnjeuxIrdComiteEtCommissionEvaluationListAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/list-admin/enjeux-ird-comite-et-commission-evaluation-list-admin.component';
import { EnjeuxIrdComiteEtCommissionEvaluationAdminComponent } from './view/enjeux-ird-comite-et-commission-evaluation-admin/enjeux-ird-comite-et-commission-evaluation-admin.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/create-admin/type-expertise-evaluation-comite-et-commission-evaluation-create-admin.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationEditAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/edit-admin/type-expertise-evaluation-comite-et-commission-evaluation-edit-admin.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationViewAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/view-admin/type-expertise-evaluation-comite-et-commission-evaluation-view-admin.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationListAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/list-admin/type-expertise-evaluation-comite-et-commission-evaluation-list-admin.component';
import { TypeExpertiseEvaluationComiteEtCommissionEvaluationAdminComponent } from './view/type-expertise-evaluation-comite-et-commission-evaluation-admin/type-expertise-evaluation-comite-et-commission-evaluation-admin.component';
import { RencontreMediaCreateAdminComponent } from './view/rencontre-media-admin/create-admin/rencontre-media-create-admin.component';
import { RencontreMediaEditAdminComponent } from './view/rencontre-media-admin/edit-admin/rencontre-media-edit-admin.component';
import { RencontreMediaViewAdminComponent } from './view/rencontre-media-admin/view-admin/rencontre-media-view-admin.component';
import { RencontreMediaListAdminComponent } from './view/rencontre-media-admin/list-admin/rencontre-media-list-admin.component';
import { RencontreMediaAdminComponent } from './view/rencontre-media-admin/rencontre-media-admin.component';
import { TypeExpertCreateAdminComponent } from './view/type-expert-admin/create-admin/type-expert-create-admin.component';
import { TypeExpertEditAdminComponent } from './view/type-expert-admin/edit-admin/type-expert-edit-admin.component';
import { TypeExpertViewAdminComponent } from './view/type-expert-admin/view-admin/type-expert-view-admin.component';
import { TypeExpertListAdminComponent } from './view/type-expert-admin/list-admin/type-expert-list-admin.component';
import { TypeExpertAdminComponent } from './view/type-expert-admin/type-expert-admin.component';
import { ReclamationCreateAdminComponent } from './view/reclamation-admin/create-admin/reclamation-create-admin.component';
import { ReclamationEditAdminComponent } from './view/reclamation-admin/edit-admin/reclamation-edit-admin.component';
import { ReclamationViewAdminComponent } from './view/reclamation-admin/view-admin/reclamation-view-admin.component';
import { ReclamationListAdminComponent } from './view/reclamation-admin/list-admin/reclamation-list-admin.component';
import { ReclamationAdminComponent } from './view/reclamation-admin/reclamation-admin.component';
import { EncadrementEtudiantEnjeuxIrdCreateAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/create-admin/encadrement-etudiant-enjeux-ird-create-admin.component';
import { EncadrementEtudiantEnjeuxIrdEditAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/edit-admin/encadrement-etudiant-enjeux-ird-edit-admin.component';
import { EncadrementEtudiantEnjeuxIrdViewAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/view-admin/encadrement-etudiant-enjeux-ird-view-admin.component';
import { EncadrementEtudiantEnjeuxIrdListAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/list-admin/encadrement-etudiant-enjeux-ird-list-admin.component';
import { EncadrementEtudiantEnjeuxIrdAdminComponent } from './view/encadrement-etudiant-enjeux-ird-admin/encadrement-etudiant-enjeux-ird-admin.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurCreateAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/create-admin/projet-activite-recherche-detail-etablissement-lanceur-create-admin.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurEditAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/edit-admin/projet-activite-recherche-detail-etablissement-lanceur-edit-admin.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurViewAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/view-admin/projet-activite-recherche-detail-etablissement-lanceur-view-admin.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurListAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/list-admin/projet-activite-recherche-detail-etablissement-lanceur-list-admin.component';
import { ProjetActiviteRechercheDetailEtablissementLanceurAdminComponent } from './view/projet-activite-recherche-detail-etablissement-lanceur-admin/projet-activite-recherche-detail-etablissement-lanceur-admin.component';
import { CampagneRappelCreateAdminComponent } from './view/campagne-rappel-admin/create-admin/campagne-rappel-create-admin.component';
import { CampagneRappelEditAdminComponent } from './view/campagne-rappel-admin/edit-admin/campagne-rappel-edit-admin.component';
import { CampagneRappelViewAdminComponent } from './view/campagne-rappel-admin/view-admin/campagne-rappel-view-admin.component';
import { CampagneRappelListAdminComponent } from './view/campagne-rappel-admin/list-admin/campagne-rappel-list-admin.component';
import { CampagneRappelAdminComponent } from './view/campagne-rappel-admin/campagne-rappel-admin.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueCreateAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/create-admin/discipline-scientifique-evenement-colloque-scientifique-create-admin.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueEditAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/edit-admin/discipline-scientifique-evenement-colloque-scientifique-edit-admin.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueViewAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/view-admin/discipline-scientifique-evenement-colloque-scientifique-view-admin.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueListAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/list-admin/discipline-scientifique-evenement-colloque-scientifique-list-admin.component';
import { DisciplineScientifiqueEvenementColloqueScientifiqueAdminComponent } from './view/discipline-scientifique-evenement-colloque-scientifique-admin/discipline-scientifique-evenement-colloque-scientifique-admin.component';
import { KeyWordCreateAdminComponent } from './view/key-word-admin/create-admin/key-word-create-admin.component';
import { KeyWordEditAdminComponent } from './view/key-word-admin/edit-admin/key-word-edit-admin.component';
import { KeyWordViewAdminComponent } from './view/key-word-admin/view-admin/key-word-view-admin.component';
import { KeyWordListAdminComponent } from './view/key-word-admin/list-admin/key-word-list-admin.component';
import { KeyWordAdminComponent } from './view/key-word-admin/key-word-admin.component';
import { OutilPedagogiqueDisciplineScientifiqueCreateAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/create-admin/outil-pedagogique-discipline-scientifique-create-admin.component';
import { OutilPedagogiqueDisciplineScientifiqueEditAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/edit-admin/outil-pedagogique-discipline-scientifique-edit-admin.component';
import { OutilPedagogiqueDisciplineScientifiqueViewAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/view-admin/outil-pedagogique-discipline-scientifique-view-admin.component';
import { OutilPedagogiqueDisciplineScientifiqueListAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/list-admin/outil-pedagogique-discipline-scientifique-list-admin.component';
import { OutilPedagogiqueDisciplineScientifiqueAdminComponent } from './view/outil-pedagogique-discipline-scientifique-admin/outil-pedagogique-discipline-scientifique-admin.component';
import { PaysCreateAdminComponent } from './view/pays-admin/create-admin/pays-create-admin.component';
import { PaysEditAdminComponent } from './view/pays-admin/edit-admin/pays-edit-admin.component';
import { PaysViewAdminComponent } from './view/pays-admin/view-admin/pays-view-admin.component';
import { PaysListAdminComponent } from './view/pays-admin/list-admin/pays-list-admin.component';
import { PaysAdminComponent } from './view/pays-admin/pays-admin.component';
import { NatureEnseignementCreateAdminComponent } from './view/nature-enseignement-admin/create-admin/nature-enseignement-create-admin.component';
import { NatureEnseignementEditAdminComponent } from './view/nature-enseignement-admin/edit-admin/nature-enseignement-edit-admin.component';
import { NatureEnseignementViewAdminComponent } from './view/nature-enseignement-admin/view-admin/nature-enseignement-view-admin.component';
import { NatureEnseignementListAdminComponent } from './view/nature-enseignement-admin/list-admin/nature-enseignement-list-admin.component';
import { NatureEnseignementAdminComponent } from './view/nature-enseignement-admin/nature-enseignement-admin.component';
import { ContexteCreateAdminComponent } from './view/contexte-admin/create-admin/contexte-create-admin.component';
import { ContexteEditAdminComponent } from './view/contexte-admin/edit-admin/contexte-edit-admin.component';
import { ContexteViewAdminComponent } from './view/contexte-admin/view-admin/contexte-view-admin.component';
import { ContexteListAdminComponent } from './view/contexte-admin/list-admin/contexte-list-admin.component';
import { ContexteAdminComponent } from './view/contexte-admin/contexte-admin.component';
import { CampagneRappelChercheurCreateAdminComponent } from './view/campagne-rappel-chercheur-admin/create-admin/campagne-rappel-chercheur-create-admin.component';
import { CampagneRappelChercheurEditAdminComponent } from './view/campagne-rappel-chercheur-admin/edit-admin/campagne-rappel-chercheur-edit-admin.component';
import { CampagneRappelChercheurViewAdminComponent } from './view/campagne-rappel-chercheur-admin/view-admin/campagne-rappel-chercheur-view-admin.component';
import { CampagneRappelChercheurListAdminComponent } from './view/campagne-rappel-chercheur-admin/list-admin/campagne-rappel-chercheur-list-admin.component';
import { CampagneRappelChercheurAdminComponent } from './view/campagne-rappel-chercheur-admin/campagne-rappel-chercheur-admin.component';
import { EncadrementCreateAdminComponent } from './view/encadrement-admin/create-admin/encadrement-create-admin.component';
import { EncadrementEditAdminComponent } from './view/encadrement-admin/edit-admin/encadrement-edit-admin.component';
import { EncadrementViewAdminComponent } from './view/encadrement-admin/view-admin/encadrement-view-admin.component';
import { EncadrementListAdminComponent } from './view/encadrement-admin/list-admin/encadrement-list-admin.component';
import { EncadrementAdminComponent } from './view/encadrement-admin/encadrement-admin.component';
import { CommanditaireCreateAdminComponent } from './view/commanditaire-admin/create-admin/commanditaire-create-admin.component';
import { CommanditaireEditAdminComponent } from './view/commanditaire-admin/edit-admin/commanditaire-edit-admin.component';
import { CommanditaireViewAdminComponent } from './view/commanditaire-admin/view-admin/commanditaire-view-admin.component';
import { CommanditaireListAdminComponent } from './view/commanditaire-admin/list-admin/commanditaire-list-admin.component';
import { CommanditaireAdminComponent } from './view/commanditaire-admin/commanditaire-admin.component';
import { EnjeuxIrdConseilsScientifiqueCreateAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/create-admin/enjeux-ird-conseils-scientifique-create-admin.component';
import { EnjeuxIrdConseilsScientifiqueEditAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/edit-admin/enjeux-ird-conseils-scientifique-edit-admin.component';
import { EnjeuxIrdConseilsScientifiqueViewAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/view-admin/enjeux-ird-conseils-scientifique-view-admin.component';
import { EnjeuxIrdConseilsScientifiqueListAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/list-admin/enjeux-ird-conseils-scientifique-list-admin.component';
import { EnjeuxIrdConseilsScientifiqueAdminComponent } from './view/enjeux-ird-conseils-scientifique-admin/enjeux-ird-conseils-scientifique-admin.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/create-admin/discipline-scientifique-consultance-scientifique-ponctuelle-create-admin.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleEditAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/edit-admin/discipline-scientifique-consultance-scientifique-ponctuelle-edit-admin.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleViewAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/view-admin/discipline-scientifique-consultance-scientifique-ponctuelle-view-admin.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleListAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/list-admin/discipline-scientifique-consultance-scientifique-ponctuelle-list-admin.component';
import { DisciplineScientifiqueConsultanceScientifiquePonctuelleAdminComponent } from './view/discipline-scientifique-consultance-scientifique-ponctuelle-admin/discipline-scientifique-consultance-scientifique-ponctuelle-admin.component';
import { CommunauteSavoirCreateAdminComponent } from './view/communaute-savoir-admin/create-admin/communaute-savoir-create-admin.component';
import { CommunauteSavoirEditAdminComponent } from './view/communaute-savoir-admin/edit-admin/communaute-savoir-edit-admin.component';
import { CommunauteSavoirViewAdminComponent } from './view/communaute-savoir-admin/view-admin/communaute-savoir-view-admin.component';
import { CommunauteSavoirListAdminComponent } from './view/communaute-savoir-admin/list-admin/communaute-savoir-list-admin.component';
import { CommunauteSavoirAdminComponent } from './view/communaute-savoir-admin/communaute-savoir-admin.component';
import { NiveauFormationPostBacCreateAdminComponent } from './view/niveau-formation-post-bac-admin/create-admin/niveau-formation-post-bac-create-admin.component';
import { NiveauFormationPostBacEditAdminComponent } from './view/niveau-formation-post-bac-admin/edit-admin/niveau-formation-post-bac-edit-admin.component';
import { NiveauFormationPostBacViewAdminComponent } from './view/niveau-formation-post-bac-admin/view-admin/niveau-formation-post-bac-view-admin.component';
import { NiveauFormationPostBacListAdminComponent } from './view/niveau-formation-post-bac-admin/list-admin/niveau-formation-post-bac-list-admin.component';
import { NiveauFormationPostBacAdminComponent } from './view/niveau-formation-post-bac-admin/niveau-formation-post-bac-admin.component';
import { FormationContinuePubliqueProfessionelCreateAdminComponent } from './view/formation-continue-publique-professionel-admin/create-admin/formation-continue-publique-professionel-create-admin.component';
import { FormationContinuePubliqueProfessionelEditAdminComponent } from './view/formation-continue-publique-professionel-admin/edit-admin/formation-continue-publique-professionel-edit-admin.component';
import { FormationContinuePubliqueProfessionelViewAdminComponent } from './view/formation-continue-publique-professionel-admin/view-admin/formation-continue-publique-professionel-view-admin.component';
import { FormationContinuePubliqueProfessionelListAdminComponent } from './view/formation-continue-publique-professionel-admin/list-admin/formation-continue-publique-professionel-list-admin.component';
import { FormationContinuePubliqueProfessionelAdminComponent } from './view/formation-continue-publique-professionel-admin/formation-continue-publique-professionel-admin.component';
import { EnseignementEnjeuxIrdCreateAdminComponent } from './view/enseignement-enjeux-ird-admin/create-admin/enseignement-enjeux-ird-create-admin.component';
import { EnseignementEnjeuxIrdEditAdminComponent } from './view/enseignement-enjeux-ird-admin/edit-admin/enseignement-enjeux-ird-edit-admin.component';
import { EnseignementEnjeuxIrdViewAdminComponent } from './view/enseignement-enjeux-ird-admin/view-admin/enseignement-enjeux-ird-view-admin.component';
import { EnseignementEnjeuxIrdListAdminComponent } from './view/enseignement-enjeux-ird-admin/list-admin/enseignement-enjeux-ird-list-admin.component';
import { EnseignementEnjeuxIrdAdminComponent } from './view/enseignement-enjeux-ird-admin/enseignement-enjeux-ird-admin.component';
import { InstrumentIrdComiteEtCommissionEvaluationCreateAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/create-admin/instrument-ird-comite-et-commission-evaluation-create-admin.component';
import { InstrumentIrdComiteEtCommissionEvaluationEditAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/edit-admin/instrument-ird-comite-et-commission-evaluation-edit-admin.component';
import { InstrumentIrdComiteEtCommissionEvaluationViewAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/view-admin/instrument-ird-comite-et-commission-evaluation-view-admin.component';
import { InstrumentIrdComiteEtCommissionEvaluationListAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/list-admin/instrument-ird-comite-et-commission-evaluation-list-admin.component';
import { InstrumentIrdComiteEtCommissionEvaluationAdminComponent } from './view/instrument-ird-comite-et-commission-evaluation-admin/instrument-ird-comite-et-commission-evaluation-admin.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueCreateAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/create-admin/discipline-scientifique-conseil-et-comite-scientifique-create-admin.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueEditAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/edit-admin/discipline-scientifique-conseil-et-comite-scientifique-edit-admin.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueViewAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/view-admin/discipline-scientifique-conseil-et-comite-scientifique-view-admin.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueListAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/list-admin/discipline-scientifique-conseil-et-comite-scientifique-list-admin.component';
import { DisciplineScientifiqueConseilEtComiteScientifiqueAdminComponent } from './view/discipline-scientifique-conseil-et-comite-scientifique-admin/discipline-scientifique-conseil-et-comite-scientifique-admin.component';
import { TemplateRelanceCreateAdminComponent } from './view/template-relance-admin/create-admin/template-relance-create-admin.component';
import { TemplateRelanceEditAdminComponent } from './view/template-relance-admin/edit-admin/template-relance-edit-admin.component';
import { TemplateRelanceViewAdminComponent } from './view/template-relance-admin/view-admin/template-relance-view-admin.component';
import { TemplateRelanceListAdminComponent } from './view/template-relance-admin/list-admin/template-relance-list-admin.component';
import { TemplateRelanceAdminComponent } from './view/template-relance-admin/template-relance-admin.component';
import { EtatEtapeCampagneCreateAdminComponent } from './view/etat-etape-campagne-admin/create-admin/etat-etape-campagne-create-admin.component';
import { EtatEtapeCampagneEditAdminComponent } from './view/etat-etape-campagne-admin/edit-admin/etat-etape-campagne-edit-admin.component';
import { EtatEtapeCampagneViewAdminComponent } from './view/etat-etape-campagne-admin/view-admin/etat-etape-campagne-view-admin.component';
import { EtatEtapeCampagneListAdminComponent } from './view/etat-etape-campagne-admin/list-admin/etat-etape-campagne-list-admin.component';
import { EtatEtapeCampagneAdminComponent } from './view/etat-etape-campagne-admin/etat-etape-campagne-admin.component';
import { ProjetActiviteRechercheDetailCreateAdminComponent } from './view/projet-activite-recherche-detail-admin/create-admin/projet-activite-recherche-detail-create-admin.component';
import { ProjetActiviteRechercheDetailEditAdminComponent } from './view/projet-activite-recherche-detail-admin/edit-admin/projet-activite-recherche-detail-edit-admin.component';
import { ProjetActiviteRechercheDetailViewAdminComponent } from './view/projet-activite-recherche-detail-admin/view-admin/projet-activite-recherche-detail-view-admin.component';
import { ProjetActiviteRechercheDetailListAdminComponent } from './view/projet-activite-recherche-detail-admin/list-admin/projet-activite-recherche-detail-list-admin.component';
import { ProjetActiviteRechercheDetailAdminComponent } from './view/projet-activite-recherche-detail-admin/projet-activite-recherche-detail-admin.component';
import { TypeSavoirCreateAdminComponent } from './view/type-savoir-admin/create-admin/type-savoir-create-admin.component';
import { TypeSavoirEditAdminComponent } from './view/type-savoir-admin/edit-admin/type-savoir-edit-admin.component';
import { TypeSavoirViewAdminComponent } from './view/type-savoir-admin/view-admin/type-savoir-view-admin.component';
import { TypeSavoirListAdminComponent } from './view/type-savoir-admin/list-admin/type-savoir-list-admin.component';
import { TypeSavoirAdminComponent } from './view/type-savoir-admin/type-savoir-admin.component';
import { ExpertiseCreateAdminComponent } from './view/expertise-admin/create-admin/expertise-create-admin.component';
import { ExpertiseEditAdminComponent } from './view/expertise-admin/edit-admin/expertise-edit-admin.component';
import { ExpertiseViewAdminComponent } from './view/expertise-admin/view-admin/expertise-view-admin.component';
import { ExpertiseListAdminComponent } from './view/expertise-admin/list-admin/expertise-list-admin.component';
import { ExpertiseAdminComponent } from './view/expertise-admin/expertise-admin.component';
import { TypePubliqueCreateAdminComponent } from './view/type-publique-admin/create-admin/type-publique-create-admin.component';
import { TypePubliqueEditAdminComponent } from './view/type-publique-admin/edit-admin/type-publique-edit-admin.component';
import { TypePubliqueViewAdminComponent } from './view/type-publique-admin/view-admin/type-publique-view-admin.component';
import { TypePubliqueListAdminComponent } from './view/type-publique-admin/list-admin/type-publique-list-admin.component';
import { TypePubliqueAdminComponent } from './view/type-publique-admin/type-publique-admin.component';
import { CampagneChercheurOuvertureCreateAdminComponent } from './view/campagne-chercheur-ouverture-admin/create-admin/campagne-chercheur-ouverture-create-admin.component';
import { CampagneChercheurOuvertureEditAdminComponent } from './view/campagne-chercheur-ouverture-admin/edit-admin/campagne-chercheur-ouverture-edit-admin.component';
import { CampagneChercheurOuvertureViewAdminComponent } from './view/campagne-chercheur-ouverture-admin/view-admin/campagne-chercheur-ouverture-view-admin.component';
import { CampagneChercheurOuvertureListAdminComponent } from './view/campagne-chercheur-ouverture-admin/list-admin/campagne-chercheur-ouverture-list-admin.component';
import { CampagneChercheurOuvertureAdminComponent } from './view/campagne-chercheur-ouverture-admin/campagne-chercheur-ouverture-admin.component';
import { ModeDiffusionCreateAdminComponent } from './view/mode-diffusion-admin/create-admin/mode-diffusion-create-admin.component';
import { ModeDiffusionEditAdminComponent } from './view/mode-diffusion-admin/edit-admin/mode-diffusion-edit-admin.component';
import { ModeDiffusionViewAdminComponent } from './view/mode-diffusion-admin/view-admin/mode-diffusion-view-admin.component';
import { ModeDiffusionListAdminComponent } from './view/mode-diffusion-admin/list-admin/mode-diffusion-list-admin.component';
import { ModeDiffusionAdminComponent } from './view/mode-diffusion-admin/mode-diffusion-admin.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/create-admin/enjeux-ird-consultance-scientifique-ponctuelle-create-admin.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleEditAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/edit-admin/enjeux-ird-consultance-scientifique-ponctuelle-edit-admin.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleViewAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/view-admin/enjeux-ird-consultance-scientifique-ponctuelle-view-admin.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleListAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/list-admin/enjeux-ird-consultance-scientifique-ponctuelle-list-admin.component';
import { EnjeuxIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/enjeux-ird-consultance-scientifique-ponctuelle-admin/enjeux-ird-consultance-scientifique-ponctuelle-admin.component';
import { EtablissementComiteEtCommissionEvaluationCreateAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/create-admin/etablissement-comite-et-commission-evaluation-create-admin.component';
import { EtablissementComiteEtCommissionEvaluationEditAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/edit-admin/etablissement-comite-et-commission-evaluation-edit-admin.component';
import { EtablissementComiteEtCommissionEvaluationViewAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/view-admin/etablissement-comite-et-commission-evaluation-view-admin.component';
import { EtablissementComiteEtCommissionEvaluationListAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/list-admin/etablissement-comite-et-commission-evaluation-list-admin.component';
import { EtablissementComiteEtCommissionEvaluationAdminComponent } from './view/etablissement-comite-et-commission-evaluation-admin/etablissement-comite-et-commission-evaluation-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin/developpement-de-savoir-et-innovation-scientifique-mode-diffusion-admin.component';
import { CorpsCreateAdminComponent } from './view/corps-admin/create-admin/corps-create-admin.component';
import { CorpsEditAdminComponent } from './view/corps-admin/edit-admin/corps-edit-admin.component';
import { CorpsViewAdminComponent } from './view/corps-admin/view-admin/corps-view-admin.component';
import { CorpsListAdminComponent } from './view/corps-admin/list-admin/corps-list-admin.component';
import { CorpsAdminComponent } from './view/corps-admin/corps-admin.component';
import { ZoneGeographiqueCreateAdminComponent } from './view/zone-geographique-admin/create-admin/zone-geographique-create-admin.component';
import { ZoneGeographiqueEditAdminComponent } from './view/zone-geographique-admin/edit-admin/zone-geographique-edit-admin.component';
import { ZoneGeographiqueViewAdminComponent } from './view/zone-geographique-admin/view-admin/zone-geographique-view-admin.component';
import { ZoneGeographiqueListAdminComponent } from './view/zone-geographique-admin/list-admin/zone-geographique-list-admin.component';
import { ZoneGeographiqueAdminComponent } from './view/zone-geographique-admin/zone-geographique-admin.component';
import { InstrumentIrdCreateAdminComponent } from './view/instrument-ird-admin/create-admin/instrument-ird-create-admin.component';
import { InstrumentIrdEditAdminComponent } from './view/instrument-ird-admin/edit-admin/instrument-ird-edit-admin.component';
import { InstrumentIrdViewAdminComponent } from './view/instrument-ird-admin/view-admin/instrument-ird-view-admin.component';
import { InstrumentIrdListAdminComponent } from './view/instrument-ird-admin/list-admin/instrument-ird-list-admin.component';
import { InstrumentIrdAdminComponent } from './view/instrument-ird-admin/instrument-ird-admin.component';
import { ResponsabilitePedagogiqueEnjeuxIrdCreateAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/create-admin/responsabilite-pedagogique-enjeux-ird-create-admin.component';
import { ResponsabilitePedagogiqueEnjeuxIrdEditAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/edit-admin/responsabilite-pedagogique-enjeux-ird-edit-admin.component';
import { ResponsabilitePedagogiqueEnjeuxIrdViewAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/view-admin/responsabilite-pedagogique-enjeux-ird-view-admin.component';
import { ResponsabilitePedagogiqueEnjeuxIrdListAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/list-admin/responsabilite-pedagogique-enjeux-ird-list-admin.component';
import { ResponsabilitePedagogiqueEnjeuxIrdAdminComponent } from './view/responsabilite-pedagogique-enjeux-ird-admin/responsabilite-pedagogique-enjeux-ird-admin.component';
import { FaqCreateAdminComponent } from './view/faq-admin/create-admin/faq-create-admin.component';
import { FaqEditAdminComponent } from './view/faq-admin/edit-admin/faq-edit-admin.component';
import { FaqViewAdminComponent } from './view/faq-admin/view-admin/faq-view-admin.component';
import { FaqListAdminComponent } from './view/faq-admin/list-admin/faq-list-admin.component';
import { FaqAdminComponent } from './view/faq-admin/faq-admin.component';
import { ExpertiseScientifiqueCreateAdminComponent } from './view/expertise-scientifique-admin/create-admin/expertise-scientifique-create-admin.component';
import { ExpertiseScientifiqueEditAdminComponent } from './view/expertise-scientifique-admin/edit-admin/expertise-scientifique-edit-admin.component';
import { ExpertiseScientifiqueViewAdminComponent } from './view/expertise-scientifique-admin/view-admin/expertise-scientifique-view-admin.component';
import { ExpertiseScientifiqueListAdminComponent } from './view/expertise-scientifique-admin/list-admin/expertise-scientifique-list-admin.component';
import { ExpertiseScientifiqueAdminComponent } from './view/expertise-scientifique-admin/expertise-scientifique-admin.component';
import { NatureEtudeCreateAdminComponent } from './view/nature-etude-admin/create-admin/nature-etude-create-admin.component';
import { NatureEtudeEditAdminComponent } from './view/nature-etude-admin/edit-admin/nature-etude-edit-admin.component';
import { NatureEtudeViewAdminComponent } from './view/nature-etude-admin/view-admin/nature-etude-view-admin.component';
import { NatureEtudeListAdminComponent } from './view/nature-etude-admin/list-admin/nature-etude-list-admin.component';
import { NatureEtudeAdminComponent } from './view/nature-etude-admin/nature-etude-admin.component';
import { EtablissementEnseignementCreateAdminComponent } from './view/etablissement-enseignement-admin/create-admin/etablissement-enseignement-create-admin.component';
import { EtablissementEnseignementEditAdminComponent } from './view/etablissement-enseignement-admin/edit-admin/etablissement-enseignement-edit-admin.component';
import { EtablissementEnseignementViewAdminComponent } from './view/etablissement-enseignement-admin/view-admin/etablissement-enseignement-view-admin.component';
import { EtablissementEnseignementListAdminComponent } from './view/etablissement-enseignement-admin/list-admin/etablissement-enseignement-list-admin.component';
import { EtablissementEnseignementAdminComponent } from './view/etablissement-enseignement-admin/etablissement-enseignement-admin.component';
import { OutilPedagogiquePaysConceptionCreateAdminComponent } from './view/outil-pedagogique-pays-conception-admin/create-admin/outil-pedagogique-pays-conception-create-admin.component';
import { OutilPedagogiquePaysConceptionEditAdminComponent } from './view/outil-pedagogique-pays-conception-admin/edit-admin/outil-pedagogique-pays-conception-edit-admin.component';
import { OutilPedagogiquePaysConceptionViewAdminComponent } from './view/outil-pedagogique-pays-conception-admin/view-admin/outil-pedagogique-pays-conception-view-admin.component';
import { OutilPedagogiquePaysConceptionListAdminComponent } from './view/outil-pedagogique-pays-conception-admin/list-admin/outil-pedagogique-pays-conception-list-admin.component';
import { OutilPedagogiquePaysConceptionAdminComponent } from './view/outil-pedagogique-pays-conception-admin/outil-pedagogique-pays-conception-admin.component';
import { InstitutionCreateAdminComponent } from './view/institution-admin/create-admin/institution-create-admin.component';
import { InstitutionEditAdminComponent } from './view/institution-admin/edit-admin/institution-edit-admin.component';
import { InstitutionViewAdminComponent } from './view/institution-admin/view-admin/institution-view-admin.component';
import { InstitutionListAdminComponent } from './view/institution-admin/list-admin/institution-list-admin.component';
import { InstitutionAdminComponent } from './view/institution-admin/institution-admin.component';
import { CampagneChercheurFermetureCreateAdminComponent } from './view/campagne-chercheur-fermeture-admin/create-admin/campagne-chercheur-fermeture-create-admin.component';
import { CampagneChercheurFermetureEditAdminComponent } from './view/campagne-chercheur-fermeture-admin/edit-admin/campagne-chercheur-fermeture-edit-admin.component';
import { CampagneChercheurFermetureViewAdminComponent } from './view/campagne-chercheur-fermeture-admin/view-admin/campagne-chercheur-fermeture-view-admin.component';
import { CampagneChercheurFermetureListAdminComponent } from './view/campagne-chercheur-fermeture-admin/list-admin/campagne-chercheur-fermeture-list-admin.component';
import { CampagneChercheurFermetureAdminComponent } from './view/campagne-chercheur-fermeture-admin/campagne-chercheur-fermeture-admin.component';
import { EncadrementDoctorantCreateAdminComponent } from './view/encadrement-doctorant-admin/create-admin/encadrement-doctorant-create-admin.component';
import { EncadrementDoctorantEditAdminComponent } from './view/encadrement-doctorant-admin/edit-admin/encadrement-doctorant-edit-admin.component';
import { EncadrementDoctorantViewAdminComponent } from './view/encadrement-doctorant-admin/view-admin/encadrement-doctorant-view-admin.component';
import { EncadrementDoctorantListAdminComponent } from './view/encadrement-doctorant-admin/list-admin/encadrement-doctorant-list-admin.component';
import { EncadrementDoctorantAdminComponent } from './view/encadrement-doctorant-admin/encadrement-doctorant-admin.component';
import { CommunauteSavoirConseilEtComiteScientifiqueCreateAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/create-admin/communaute-savoir-conseil-et-comite-scientifique-create-admin.component';
import { CommunauteSavoirConseilEtComiteScientifiqueEditAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/edit-admin/communaute-savoir-conseil-et-comite-scientifique-edit-admin.component';
import { CommunauteSavoirConseilEtComiteScientifiqueViewAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/view-admin/communaute-savoir-conseil-et-comite-scientifique-view-admin.component';
import { CommunauteSavoirConseilEtComiteScientifiqueListAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/list-admin/communaute-savoir-conseil-et-comite-scientifique-list-admin.component';
import { CommunauteSavoirConseilEtComiteScientifiqueAdminComponent } from './view/communaute-savoir-conseil-et-comite-scientifique-admin/communaute-savoir-conseil-et-comite-scientifique-admin.component';
import { PubliqueFormationCreateAdminComponent } from './view/publique-formation-admin/create-admin/publique-formation-create-admin.component';
import { PubliqueFormationEditAdminComponent } from './view/publique-formation-admin/edit-admin/publique-formation-edit-admin.component';
import { PubliqueFormationViewAdminComponent } from './view/publique-formation-admin/view-admin/publique-formation-view-admin.component';
import { PubliqueFormationListAdminComponent } from './view/publique-formation-admin/list-admin/publique-formation-list-admin.component';
import { PubliqueFormationAdminComponent } from './view/publique-formation-admin/publique-formation-admin.component';
import { OutilPedagogiqueTypeInstrumentIrdCreateAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/create-admin/outil-pedagogique-type-instrument-ird-create-admin.component';
import { OutilPedagogiqueTypeInstrumentIrdEditAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/edit-admin/outil-pedagogique-type-instrument-ird-edit-admin.component';
import { OutilPedagogiqueTypeInstrumentIrdViewAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/view-admin/outil-pedagogique-type-instrument-ird-view-admin.component';
import { OutilPedagogiqueTypeInstrumentIrdListAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/list-admin/outil-pedagogique-type-instrument-ird-list-admin.component';
import { OutilPedagogiqueTypeInstrumentIrdAdminComponent } from './view/outil-pedagogique-type-instrument-ird-admin/outil-pedagogique-type-instrument-ird-admin.component';
import { FinancementDoctorantCreateAdminComponent } from './view/financement-doctorant-admin/create-admin/financement-doctorant-create-admin.component';
import { FinancementDoctorantEditAdminComponent } from './view/financement-doctorant-admin/edit-admin/financement-doctorant-edit-admin.component';
import { FinancementDoctorantViewAdminComponent } from './view/financement-doctorant-admin/view-admin/financement-doctorant-view-admin.component';
import { FinancementDoctorantListAdminComponent } from './view/financement-doctorant-admin/list-admin/financement-doctorant-list-admin.component';
import { FinancementDoctorantAdminComponent } from './view/financement-doctorant-admin/financement-doctorant-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin/developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-admin.component';
import { VilleCreateAdminComponent } from './view/ville-admin/create-admin/ville-create-admin.component';
import { VilleEditAdminComponent } from './view/ville-admin/edit-admin/ville-edit-admin.component';
import { VilleViewAdminComponent } from './view/ville-admin/view-admin/ville-view-admin.component';
import { VilleListAdminComponent } from './view/ville-admin/list-admin/ville-list-admin.component';
import { VilleAdminComponent } from './view/ville-admin/ville-admin.component';
import { RoleComiteEtCommissionEvaluationCreateAdminComponent } from './view/role-comite-et-commission-evaluation-admin/create-admin/role-comite-et-commission-evaluation-create-admin.component';
import { RoleComiteEtCommissionEvaluationEditAdminComponent } from './view/role-comite-et-commission-evaluation-admin/edit-admin/role-comite-et-commission-evaluation-edit-admin.component';
import { RoleComiteEtCommissionEvaluationViewAdminComponent } from './view/role-comite-et-commission-evaluation-admin/view-admin/role-comite-et-commission-evaluation-view-admin.component';
import { RoleComiteEtCommissionEvaluationListAdminComponent } from './view/role-comite-et-commission-evaluation-admin/list-admin/role-comite-et-commission-evaluation-list-admin.component';
import { RoleComiteEtCommissionEvaluationAdminComponent } from './view/role-comite-et-commission-evaluation-admin/role-comite-et-commission-evaluation-admin.component';
import { ChercheurEmailCreateAdminComponent } from './view/chercheur-email-admin/create-admin/chercheur-email-create-admin.component';
import { ChercheurEmailEditAdminComponent } from './view/chercheur-email-admin/edit-admin/chercheur-email-edit-admin.component';
import { ChercheurEmailViewAdminComponent } from './view/chercheur-email-admin/view-admin/chercheur-email-view-admin.component';
import { ChercheurEmailListAdminComponent } from './view/chercheur-email-admin/list-admin/chercheur-email-list-admin.component';
import { ChercheurEmailAdminComponent } from './view/chercheur-email-admin/chercheur-email-admin.component';
import { EntiteAdministrativeCreateAdminComponent } from './view/entite-administrative-admin/create-admin/entite-administrative-create-admin.component';
import { EntiteAdministrativeEditAdminComponent } from './view/entite-administrative-admin/edit-admin/entite-administrative-edit-admin.component';
import { EntiteAdministrativeViewAdminComponent } from './view/entite-administrative-admin/view-admin/entite-administrative-view-admin.component';
import { EntiteAdministrativeListAdminComponent } from './view/entite-administrative-admin/list-admin/entite-administrative-list-admin.component';
import { EntiteAdministrativeAdminComponent } from './view/entite-administrative-admin/entite-administrative-admin.component';
import { EnjeuxIrdChercheurCreateAdminComponent } from './view/enjeux-ird-chercheur-admin/create-admin/enjeux-ird-chercheur-create-admin.component';
import { EnjeuxIrdChercheurEditAdminComponent } from './view/enjeux-ird-chercheur-admin/edit-admin/enjeux-ird-chercheur-edit-admin.component';
import { EnjeuxIrdChercheurViewAdminComponent } from './view/enjeux-ird-chercheur-admin/view-admin/enjeux-ird-chercheur-view-admin.component';
import { EnjeuxIrdChercheurListAdminComponent } from './view/enjeux-ird-chercheur-admin/list-admin/enjeux-ird-chercheur-list-admin.component';
import { EnjeuxIrdChercheurAdminComponent } from './view/enjeux-ird-chercheur-admin/enjeux-ird-chercheur-admin.component';
import { EtablissementCreateAdminComponent } from './view/etablissement-admin/create-admin/etablissement-create-admin.component';
import { EtablissementEditAdminComponent } from './view/etablissement-admin/edit-admin/etablissement-edit-admin.component';
import { EtablissementViewAdminComponent } from './view/etablissement-admin/view-admin/etablissement-view-admin.component';
import { EtablissementListAdminComponent } from './view/etablissement-admin/list-admin/etablissement-list-admin.component';
import { EtablissementAdminComponent } from './view/etablissement-admin/etablissement-admin.component';
import { DisciplineScientifiqueParentCreateAdminComponent } from './view/discipline-scientifique-parent-admin/create-admin/discipline-scientifique-parent-create-admin.component';
import { DisciplineScientifiqueParentEditAdminComponent } from './view/discipline-scientifique-parent-admin/edit-admin/discipline-scientifique-parent-edit-admin.component';
import { DisciplineScientifiqueParentViewAdminComponent } from './view/discipline-scientifique-parent-admin/view-admin/discipline-scientifique-parent-view-admin.component';
import { DisciplineScientifiqueParentListAdminComponent } from './view/discipline-scientifique-parent-admin/list-admin/discipline-scientifique-parent-list-admin.component';
import { DisciplineScientifiqueParentAdminComponent } from './view/discipline-scientifique-parent-admin/discipline-scientifique-parent-admin.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdCreateAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/create-admin/projet-activite-recherche-detail-enjeux-ird-create-admin.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdEditAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/edit-admin/projet-activite-recherche-detail-enjeux-ird-edit-admin.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdViewAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/view-admin/projet-activite-recherche-detail-enjeux-ird-view-admin.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdListAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/list-admin/projet-activite-recherche-detail-enjeux-ird-list-admin.component';
import { ProjetActiviteRechercheDetailEnjeuxIrdAdminComponent } from './view/projet-activite-recherche-detail-enjeux-ird-admin/projet-activite-recherche-detail-enjeux-ird-admin.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/create-admin/type-publique-rencontre-grand-publique-jeune-publique-create-admin.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueEditAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/edit-admin/type-publique-rencontre-grand-publique-jeune-publique-edit-admin.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueViewAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/view-admin/type-publique-rencontre-grand-publique-jeune-publique-view-admin.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueListAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/list-admin/type-publique-rencontre-grand-publique-jeune-publique-list-admin.component';
import { TypePubliqueRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/type-publique-rencontre-grand-publique-jeune-publique-admin/type-publique-rencontre-grand-publique-jeune-publique-admin.component';
import { MasterInternationalCreateAdminComponent } from './view/master-international-admin/create-admin/master-international-create-admin.component';
import { MasterInternationalEditAdminComponent } from './view/master-international-admin/edit-admin/master-international-edit-admin.component';
import { MasterInternationalViewAdminComponent } from './view/master-international-admin/view-admin/master-international-view-admin.component';
import { MasterInternationalListAdminComponent } from './view/master-international-admin/list-admin/master-international-list-admin.component';
import { MasterInternationalAdminComponent } from './view/master-international-admin/master-international-admin.component';
import { EnseignementDisciplineScientifiqueCreateAdminComponent } from './view/enseignement-discipline-scientifique-admin/create-admin/enseignement-discipline-scientifique-create-admin.component';
import { EnseignementDisciplineScientifiqueEditAdminComponent } from './view/enseignement-discipline-scientifique-admin/edit-admin/enseignement-discipline-scientifique-edit-admin.component';
import { EnseignementDisciplineScientifiqueViewAdminComponent } from './view/enseignement-discipline-scientifique-admin/view-admin/enseignement-discipline-scientifique-view-admin.component';
import { EnseignementDisciplineScientifiqueListAdminComponent } from './view/enseignement-discipline-scientifique-admin/list-admin/enseignement-discipline-scientifique-list-admin.component';
import { EnseignementDisciplineScientifiqueAdminComponent } from './view/enseignement-discipline-scientifique-admin/enseignement-discipline-scientifique-admin.component';
import { CommunauteSavoirChercheurCreateAdminComponent } from './view/communaute-savoir-chercheur-admin/create-admin/communaute-savoir-chercheur-create-admin.component';
import { CommunauteSavoirChercheurEditAdminComponent } from './view/communaute-savoir-chercheur-admin/edit-admin/communaute-savoir-chercheur-edit-admin.component';
import { CommunauteSavoirChercheurViewAdminComponent } from './view/communaute-savoir-chercheur-admin/view-admin/communaute-savoir-chercheur-view-admin.component';
import { CommunauteSavoirChercheurListAdminComponent } from './view/communaute-savoir-chercheur-admin/list-admin/communaute-savoir-chercheur-list-admin.component';
import { CommunauteSavoirChercheurAdminComponent } from './view/communaute-savoir-chercheur-admin/communaute-savoir-chercheur-admin.component';
import { TypeExpertiseEvaluationCreateAdminComponent } from './view/type-expertise-evaluation-admin/create-admin/type-expertise-evaluation-create-admin.component';
import { TypeExpertiseEvaluationEditAdminComponent } from './view/type-expertise-evaluation-admin/edit-admin/type-expertise-evaluation-edit-admin.component';
import { TypeExpertiseEvaluationViewAdminComponent } from './view/type-expertise-evaluation-admin/view-admin/type-expertise-evaluation-view-admin.component';
import { TypeExpertiseEvaluationListAdminComponent } from './view/type-expertise-evaluation-admin/list-admin/type-expertise-evaluation-list-admin.component';
import { TypeExpertiseEvaluationAdminComponent } from './view/type-expertise-evaluation-admin/type-expertise-evaluation-admin.component';
import { ComiteEtCommissionEvaluationCreateAdminComponent } from './view/comite-et-commission-evaluation-admin/create-admin/comite-et-commission-evaluation-create-admin.component';
import { ComiteEtCommissionEvaluationEditAdminComponent } from './view/comite-et-commission-evaluation-admin/edit-admin/comite-et-commission-evaluation-edit-admin.component';
import { ComiteEtCommissionEvaluationViewAdminComponent } from './view/comite-et-commission-evaluation-admin/view-admin/comite-et-commission-evaluation-view-admin.component';
import { ComiteEtCommissionEvaluationListAdminComponent } from './view/comite-et-commission-evaluation-admin/list-admin/comite-et-commission-evaluation-list-admin.component';
import { ComiteEtCommissionEvaluationAdminComponent } from './view/comite-et-commission-evaluation-admin/comite-et-commission-evaluation-admin.component';
import { EtudiantCreateAdminComponent } from './view/etudiant-admin/create-admin/etudiant-create-admin.component';
import { EtudiantEditAdminComponent } from './view/etudiant-admin/edit-admin/etudiant-edit-admin.component';
import { EtudiantViewAdminComponent } from './view/etudiant-admin/view-admin/etudiant-view-admin.component';
import { EtudiantListAdminComponent } from './view/etudiant-admin/list-admin/etudiant-list-admin.component';
import { EtudiantAdminComponent } from './view/etudiant-admin/etudiant-admin.component';
import { EvenementColloqueScienntifiqueCreateAdminComponent } from './view/evenement-colloque-scienntifique-admin/create-admin/evenement-colloque-scienntifique-create-admin.component';
import { EvenementColloqueScienntifiqueEditAdminComponent } from './view/evenement-colloque-scienntifique-admin/edit-admin/evenement-colloque-scienntifique-edit-admin.component';
import { EvenementColloqueScienntifiqueViewAdminComponent } from './view/evenement-colloque-scienntifique-admin/view-admin/evenement-colloque-scienntifique-view-admin.component';
import { EvenementColloqueScienntifiqueListAdminComponent } from './view/evenement-colloque-scienntifique-admin/list-admin/evenement-colloque-scienntifique-list-admin.component';
import { EvenementColloqueScienntifiqueAdminComponent } from './view/evenement-colloque-scienntifique-admin/evenement-colloque-scienntifique-admin.component';
import { FormationContinueObjetFormationGeneriqueCreateAdminComponent } from './view/formation-continue-objet-formation-generique-admin/create-admin/formation-continue-objet-formation-generique-create-admin.component';
import { FormationContinueObjetFormationGeneriqueEditAdminComponent } from './view/formation-continue-objet-formation-generique-admin/edit-admin/formation-continue-objet-formation-generique-edit-admin.component';
import { FormationContinueObjetFormationGeneriqueViewAdminComponent } from './view/formation-continue-objet-formation-generique-admin/view-admin/formation-continue-objet-formation-generique-view-admin.component';
import { FormationContinueObjetFormationGeneriqueListAdminComponent } from './view/formation-continue-objet-formation-generique-admin/list-admin/formation-continue-objet-formation-generique-list-admin.component';
import { FormationContinueObjetFormationGeneriqueAdminComponent } from './view/formation-continue-objet-formation-generique-admin/formation-continue-objet-formation-generique-admin.component';
import { ModaliteCreateAdminComponent } from './view/modalite-admin/create-admin/modalite-create-admin.component';
import { ModaliteEditAdminComponent } from './view/modalite-admin/edit-admin/modalite-edit-admin.component';
import { ModaliteViewAdminComponent } from './view/modalite-admin/view-admin/modalite-view-admin.component';
import { ModaliteListAdminComponent } from './view/modalite-admin/list-admin/modalite-list-admin.component';
import { ModaliteAdminComponent } from './view/modalite-admin/modalite-admin.component';
import { FormationContinueCreateAdminComponent } from './view/formation-continue-admin/create-admin/formation-continue-create-admin.component';
import { FormationContinueEditAdminComponent } from './view/formation-continue-admin/edit-admin/formation-continue-edit-admin.component';
import { FormationContinueViewAdminComponent } from './view/formation-continue-admin/view-admin/formation-continue-view-admin.component';
import { FormationContinueListAdminComponent } from './view/formation-continue-admin/list-admin/formation-continue-list-admin.component';
import { FormationContinueAdminComponent } from './view/formation-continue-admin/formation-continue-admin.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantCreateAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/create-admin/projet-activite-recherche-detail-institution-co-contractant-create-admin.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantEditAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/edit-admin/projet-activite-recherche-detail-institution-co-contractant-edit-admin.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantViewAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/view-admin/projet-activite-recherche-detail-institution-co-contractant-view-admin.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantListAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/list-admin/projet-activite-recherche-detail-institution-co-contractant-list-admin.component';
import { ProjetActiviteRechercheDetailInstitutionCoContractantAdminComponent } from './view/projet-activite-recherche-detail-institution-co-contractant-admin/projet-activite-recherche-detail-institution-co-contractant-admin.component';
import { ModaliteFormationContinueCreateAdminComponent } from './view/modalite-formation-continue-admin/create-admin/modalite-formation-continue-create-admin.component';
import { ModaliteFormationContinueEditAdminComponent } from './view/modalite-formation-continue-admin/edit-admin/modalite-formation-continue-edit-admin.component';
import { ModaliteFormationContinueViewAdminComponent } from './view/modalite-formation-continue-admin/view-admin/modalite-formation-continue-view-admin.component';
import { ModaliteFormationContinueListAdminComponent } from './view/modalite-formation-continue-admin/list-admin/modalite-formation-continue-list-admin.component';
import { ModaliteFormationContinueAdminComponent } from './view/modalite-formation-continue-admin/modalite-formation-continue-admin.component';
import { ConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/create-admin/consultance-scientifique-ponctuelle-create-admin.component';
import { ConsultanceScientifiquePonctuelleEditAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/edit-admin/consultance-scientifique-ponctuelle-edit-admin.component';
import { ConsultanceScientifiquePonctuelleViewAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/view-admin/consultance-scientifique-ponctuelle-view-admin.component';
import { ConsultanceScientifiquePonctuelleListAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/list-admin/consultance-scientifique-ponctuelle-list-admin.component';
import { ConsultanceScientifiquePonctuelleAdminComponent } from './view/consultance-scientifique-ponctuelle-admin/consultance-scientifique-ponctuelle-admin.component';
import { TypeEntiteAdministrativeCreateAdminComponent } from './view/type-entite-administrative-admin/create-admin/type-entite-administrative-create-admin.component';
import { TypeEntiteAdministrativeEditAdminComponent } from './view/type-entite-administrative-admin/edit-admin/type-entite-administrative-edit-admin.component';
import { TypeEntiteAdministrativeViewAdminComponent } from './view/type-entite-administrative-admin/view-admin/type-entite-administrative-view-admin.component';
import { TypeEntiteAdministrativeListAdminComponent } from './view/type-entite-administrative-admin/list-admin/type-entite-administrative-list-admin.component';
import { TypeEntiteAdministrativeAdminComponent } from './view/type-entite-administrative-admin/type-entite-administrative-admin.component';
import { TypeUtilisateurCreateAdminComponent } from './view/type-utilisateur-admin/create-admin/type-utilisateur-create-admin.component';
import { TypeUtilisateurEditAdminComponent } from './view/type-utilisateur-admin/edit-admin/type-utilisateur-edit-admin.component';
import { TypeUtilisateurViewAdminComponent } from './view/type-utilisateur-admin/view-admin/type-utilisateur-view-admin.component';
import { TypeUtilisateurListAdminComponent } from './view/type-utilisateur-admin/list-admin/type-utilisateur-list-admin.component';
import { TypeUtilisateurAdminComponent } from './view/type-utilisateur-admin/type-utilisateur-admin.component';
import { TypeInstrumentIrdCreateAdminComponent } from './view/type-instrument-ird-admin/create-admin/type-instrument-ird-create-admin.component';
import { TypeInstrumentIrdEditAdminComponent } from './view/type-instrument-ird-admin/edit-admin/type-instrument-ird-edit-admin.component';
import { TypeInstrumentIrdViewAdminComponent } from './view/type-instrument-ird-admin/view-admin/type-instrument-ird-view-admin.component';
import { TypeInstrumentIrdListAdminComponent } from './view/type-instrument-ird-admin/list-admin/type-instrument-ird-list-admin.component';
import { TypeInstrumentIrdAdminComponent } from './view/type-instrument-ird-admin/type-instrument-ird-admin.component';
import { EtablissementPartenaireCreateAdminComponent } from './view/etablissement-partenaire-admin/create-admin/etablissement-partenaire-create-admin.component';
import { EtablissementPartenaireEditAdminComponent } from './view/etablissement-partenaire-admin/edit-admin/etablissement-partenaire-edit-admin.component';
import { EtablissementPartenaireViewAdminComponent } from './view/etablissement-partenaire-admin/view-admin/etablissement-partenaire-view-admin.component';
import { EtablissementPartenaireListAdminComponent } from './view/etablissement-partenaire-admin/list-admin/etablissement-partenaire-list-admin.component';
import { EtablissementPartenaireAdminComponent } from './view/etablissement-partenaire-admin/etablissement-partenaire-admin.component';
import { ModaliteEtudeCreateAdminComponent } from './view/modalite-etude-admin/create-admin/modalite-etude-create-admin.component';
import { ModaliteEtudeEditAdminComponent } from './view/modalite-etude-admin/edit-admin/modalite-etude-edit-admin.component';
import { ModaliteEtudeViewAdminComponent } from './view/modalite-etude-admin/view-admin/modalite-etude-view-admin.component';
import { ModaliteEtudeListAdminComponent } from './view/modalite-etude-admin/list-admin/modalite-etude-list-admin.component';
import { ModaliteEtudeAdminComponent } from './view/modalite-etude-admin/modalite-etude-admin.component';
import { ZoneGeographiqueFormationContinueCreateAdminComponent } from './view/zone-geographique-formation-continue-admin/create-admin/zone-geographique-formation-continue-create-admin.component';
import { ZoneGeographiqueFormationContinueEditAdminComponent } from './view/zone-geographique-formation-continue-admin/edit-admin/zone-geographique-formation-continue-edit-admin.component';
import { ZoneGeographiqueFormationContinueViewAdminComponent } from './view/zone-geographique-formation-continue-admin/view-admin/zone-geographique-formation-continue-view-admin.component';
import { ZoneGeographiqueFormationContinueListAdminComponent } from './view/zone-geographique-formation-continue-admin/list-admin/zone-geographique-formation-continue-list-admin.component';
import { ZoneGeographiqueFormationContinueAdminComponent } from './view/zone-geographique-formation-continue-admin/zone-geographique-formation-continue-admin.component';
import { TemplateClotureCreateAdminComponent } from './view/template-cloture-admin/create-admin/template-cloture-create-admin.component';
import { TemplateClotureEditAdminComponent } from './view/template-cloture-admin/edit-admin/template-cloture-edit-admin.component';
import { TemplateClotureViewAdminComponent } from './view/template-cloture-admin/view-admin/template-cloture-view-admin.component';
import { TemplateClotureListAdminComponent } from './view/template-cloture-admin/list-admin/template-cloture-list-admin.component';
import { TemplateClotureAdminComponent } from './view/template-cloture-admin/template-cloture-admin.component';
import { ProjetActiviteRechercheDetailInstrumentIrdCreateAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/create-admin/projet-activite-recherche-detail-instrument-ird-create-admin.component';
import { ProjetActiviteRechercheDetailInstrumentIrdEditAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/edit-admin/projet-activite-recherche-detail-instrument-ird-edit-admin.component';
import { ProjetActiviteRechercheDetailInstrumentIrdViewAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/view-admin/projet-activite-recherche-detail-instrument-ird-view-admin.component';
import { ProjetActiviteRechercheDetailInstrumentIrdListAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/list-admin/projet-activite-recherche-detail-instrument-ird-list-admin.component';
import { ProjetActiviteRechercheDetailInstrumentIrdAdminComponent } from './view/projet-activite-recherche-detail-instrument-ird-admin/projet-activite-recherche-detail-instrument-ird-admin.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/create-admin/rencontre-grand-publique-jeune-publique-instrument-ird-create-admin.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/edit-admin/rencontre-grand-publique-jeune-publique-instrument-ird-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/view-admin/rencontre-grand-publique-jeune-publique-instrument-ird-view-admin.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/list-admin/rencontre-grand-publique-jeune-publique-instrument-ird-list-admin.component';
import { RencontreGrandPubliqueJeunePubliqueInstrumentIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-instrument-ird-admin/rencontre-grand-publique-jeune-publique-instrument-ird-admin.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/create-admin/type-instrument-ird-consultance-scientifique-ponctuelle-create-admin.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/edit-admin/type-instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/view-admin/type-instrument-ird-consultance-scientifique-ponctuelle-view-admin.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/list-admin/type-instrument-ird-consultance-scientifique-ponctuelle-list-admin.component';
import { TypeInstrumentIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/type-instrument-ird-consultance-scientifique-ponctuelle-admin/type-instrument-ird-consultance-scientifique-ponctuelle-admin.component';
import { NatureActiviteGrandPubliqueCreateAdminComponent } from './view/nature-activite-grand-publique-admin/create-admin/nature-activite-grand-publique-create-admin.component';
import { NatureActiviteGrandPubliqueEditAdminComponent } from './view/nature-activite-grand-publique-admin/edit-admin/nature-activite-grand-publique-edit-admin.component';
import { NatureActiviteGrandPubliqueViewAdminComponent } from './view/nature-activite-grand-publique-admin/view-admin/nature-activite-grand-publique-view-admin.component';
import { NatureActiviteGrandPubliqueListAdminComponent } from './view/nature-activite-grand-publique-admin/list-admin/nature-activite-grand-publique-list-admin.component';
import { NatureActiviteGrandPubliqueAdminComponent } from './view/nature-activite-grand-publique-admin/nature-activite-grand-publique-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-pays-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-pays-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-pays-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-pays-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiquePaysAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-pays-admin/developpement-de-savoir-et-innovation-scientifique-pays-admin.component';
import { RoleDeveloppementDeSavoirCreateAdminComponent } from './view/role-developpement-de-savoir-admin/create-admin/role-developpement-de-savoir-create-admin.component';
import { RoleDeveloppementDeSavoirEditAdminComponent } from './view/role-developpement-de-savoir-admin/edit-admin/role-developpement-de-savoir-edit-admin.component';
import { RoleDeveloppementDeSavoirViewAdminComponent } from './view/role-developpement-de-savoir-admin/view-admin/role-developpement-de-savoir-view-admin.component';
import { RoleDeveloppementDeSavoirListAdminComponent } from './view/role-developpement-de-savoir-admin/list-admin/role-developpement-de-savoir-list-admin.component';
import { RoleDeveloppementDeSavoirAdminComponent } from './view/role-developpement-de-savoir-admin/role-developpement-de-savoir-admin.component';
import { TypeUtilisateurSavoirConcuCreateAdminComponent } from './view/type-utilisateur-savoir-concu-admin/create-admin/type-utilisateur-savoir-concu-create-admin.component';
import { TypeUtilisateurSavoirConcuEditAdminComponent } from './view/type-utilisateur-savoir-concu-admin/edit-admin/type-utilisateur-savoir-concu-edit-admin.component';
import { TypeUtilisateurSavoirConcuViewAdminComponent } from './view/type-utilisateur-savoir-concu-admin/view-admin/type-utilisateur-savoir-concu-view-admin.component';
import { TypeUtilisateurSavoirConcuListAdminComponent } from './view/type-utilisateur-savoir-concu-admin/list-admin/type-utilisateur-savoir-concu-list-admin.component';
import { TypeUtilisateurSavoirConcuAdminComponent } from './view/type-utilisateur-savoir-concu-admin/type-utilisateur-savoir-concu-admin.component';
import { EncadrementEtudiantDisciplineScientifiqueCreateAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/create-admin/encadrement-etudiant-discipline-scientifique-create-admin.component';
import { EncadrementEtudiantDisciplineScientifiqueEditAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/edit-admin/encadrement-etudiant-discipline-scientifique-edit-admin.component';
import { EncadrementEtudiantDisciplineScientifiqueViewAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/view-admin/encadrement-etudiant-discipline-scientifique-view-admin.component';
import { EncadrementEtudiantDisciplineScientifiqueListAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/list-admin/encadrement-etudiant-discipline-scientifique-list-admin.component';
import { EncadrementEtudiantDisciplineScientifiqueAdminComponent } from './view/encadrement-etudiant-discipline-scientifique-admin/encadrement-etudiant-discipline-scientifique-admin.component';
import { CommunauteSavoirExpertiseScientifiqueCreateAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/create-admin/communaute-savoir-expertise-scientifique-create-admin.component';
import { CommunauteSavoirExpertiseScientifiqueEditAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/edit-admin/communaute-savoir-expertise-scientifique-edit-admin.component';
import { CommunauteSavoirExpertiseScientifiqueViewAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/view-admin/communaute-savoir-expertise-scientifique-view-admin.component';
import { CommunauteSavoirExpertiseScientifiqueListAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/list-admin/communaute-savoir-expertise-scientifique-list-admin.component';
import { CommunauteSavoirExpertiseScientifiqueAdminComponent } from './view/communaute-savoir-expertise-scientifique-admin/communaute-savoir-expertise-scientifique-admin.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationCreateAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/create-admin/discipline-scientifique-comite-et-commission-evaluation-create-admin.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationEditAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/edit-admin/discipline-scientifique-comite-et-commission-evaluation-edit-admin.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationViewAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/view-admin/discipline-scientifique-comite-et-commission-evaluation-view-admin.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationListAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/list-admin/discipline-scientifique-comite-et-commission-evaluation-list-admin.component';
import { DisciplineScientifiqueComiteEtCommissionEvaluationAdminComponent } from './view/discipline-scientifique-comite-et-commission-evaluation-admin/discipline-scientifique-comite-et-commission-evaluation-admin.component';
import { TypePubliqueCultureScientifiqueCreateAdminComponent } from './view/type-publique-culture-scientifique-admin/create-admin/type-publique-culture-scientifique-create-admin.component';
import { TypePubliqueCultureScientifiqueEditAdminComponent } from './view/type-publique-culture-scientifique-admin/edit-admin/type-publique-culture-scientifique-edit-admin.component';
import { TypePubliqueCultureScientifiqueViewAdminComponent } from './view/type-publique-culture-scientifique-admin/view-admin/type-publique-culture-scientifique-view-admin.component';
import { TypePubliqueCultureScientifiqueListAdminComponent } from './view/type-publique-culture-scientifique-admin/list-admin/type-publique-culture-scientifique-list-admin.component';
import { TypePubliqueCultureScientifiqueAdminComponent } from './view/type-publique-culture-scientifique-admin/type-publique-culture-scientifique-admin.component';
import { StatusCursusCreateAdminComponent } from './view/status-cursus-admin/create-admin/status-cursus-create-admin.component';
import { StatusCursusEditAdminComponent } from './view/status-cursus-admin/edit-admin/status-cursus-edit-admin.component';
import { StatusCursusViewAdminComponent } from './view/status-cursus-admin/view-admin/status-cursus-view-admin.component';
import { StatusCursusListAdminComponent } from './view/status-cursus-admin/list-admin/status-cursus-list-admin.component';
import { StatusCursusAdminComponent } from './view/status-cursus-admin/status-cursus-admin.component';
import { DistinctionEtablissementPaysCreateAdminComponent } from './view/distinction-etablissement-pays-admin/create-admin/distinction-etablissement-pays-create-admin.component';
import { DistinctionEtablissementPaysEditAdminComponent } from './view/distinction-etablissement-pays-admin/edit-admin/distinction-etablissement-pays-edit-admin.component';
import { DistinctionEtablissementPaysViewAdminComponent } from './view/distinction-etablissement-pays-admin/view-admin/distinction-etablissement-pays-view-admin.component';
import { DistinctionEtablissementPaysListAdminComponent } from './view/distinction-etablissement-pays-admin/list-admin/distinction-etablissement-pays-list-admin.component';
import { DistinctionEtablissementPaysAdminComponent } from './view/distinction-etablissement-pays-admin/distinction-etablissement-pays-admin.component';
import { InstrumentIrdChercheurCreateAdminComponent } from './view/instrument-ird-chercheur-admin/create-admin/instrument-ird-chercheur-create-admin.component';
import { InstrumentIrdChercheurEditAdminComponent } from './view/instrument-ird-chercheur-admin/edit-admin/instrument-ird-chercheur-edit-admin.component';
import { InstrumentIrdChercheurViewAdminComponent } from './view/instrument-ird-chercheur-admin/view-admin/instrument-ird-chercheur-view-admin.component';
import { InstrumentIrdChercheurListAdminComponent } from './view/instrument-ird-chercheur-admin/list-admin/instrument-ird-chercheur-list-admin.component';
import { InstrumentIrdChercheurAdminComponent } from './view/instrument-ird-chercheur-admin/instrument-ird-chercheur-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/create-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-create-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/edit-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/view-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-view-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/list-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-list-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEnjeuxIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-enjeux-ird-admin/rencontre-grand-publique-jeune-publique-enjeux-ird-admin.component';
import { CategorieFaqCreateAdminComponent } from './view/categorie-faq-admin/create-admin/categorie-faq-create-admin.component';
import { CategorieFaqEditAdminComponent } from './view/categorie-faq-admin/edit-admin/categorie-faq-edit-admin.component';
import { CategorieFaqViewAdminComponent } from './view/categorie-faq-admin/view-admin/categorie-faq-view-admin.component';
import { CategorieFaqListAdminComponent } from './view/categorie-faq-admin/list-admin/categorie-faq-list-admin.component';
import { CategorieFaqAdminComponent } from './view/categorie-faq-admin/categorie-faq-admin.component';
import { IdentifiantRechercheCreateAdminComponent } from './view/identifiant-recherche-admin/create-admin/identifiant-recherche-create-admin.component';
import { IdentifiantRechercheEditAdminComponent } from './view/identifiant-recherche-admin/edit-admin/identifiant-recherche-edit-admin.component';
import { IdentifiantRechercheViewAdminComponent } from './view/identifiant-recherche-admin/view-admin/identifiant-recherche-view-admin.component';
import { IdentifiantRechercheListAdminComponent } from './view/identifiant-recherche-admin/list-admin/identifiant-recherche-list-admin.component';
import { IdentifiantRechercheAdminComponent } from './view/identifiant-recherche-admin/identifiant-recherche-admin.component';
import { EnseignementEtFormationCreateAdminComponent } from './view/enseignement-et-formation-admin/create-admin/enseignement-et-formation-create-admin.component';
import { EnseignementEtFormationEditAdminComponent } from './view/enseignement-et-formation-admin/edit-admin/enseignement-et-formation-edit-admin.component';
import { EnseignementEtFormationViewAdminComponent } from './view/enseignement-et-formation-admin/view-admin/enseignement-et-formation-view-admin.component';
import { EnseignementEtFormationListAdminComponent } from './view/enseignement-et-formation-admin/list-admin/enseignement-et-formation-list-admin.component';
import { EnseignementEtFormationAdminComponent } from './view/enseignement-et-formation-admin/enseignement-et-formation-admin.component';
import { ModaliteInterventionCreateAdminComponent } from './view/modalite-intervention-admin/create-admin/modalite-intervention-create-admin.component';
import { ModaliteInterventionEditAdminComponent } from './view/modalite-intervention-admin/edit-admin/modalite-intervention-edit-admin.component';
import { ModaliteInterventionViewAdminComponent } from './view/modalite-intervention-admin/view-admin/modalite-intervention-view-admin.component';
import { ModaliteInterventionListAdminComponent } from './view/modalite-intervention-admin/list-admin/modalite-intervention-list-admin.component';
import { ModaliteInterventionAdminComponent } from './view/modalite-intervention-admin/modalite-intervention-admin.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/create-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-create-admin.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/edit-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-edit-admin.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/view-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-view-admin.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/list-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-list-admin.component';
import { PaysOrganisateurRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/pays-organisateur-rencontre-grand-publique-jeune-publique-admin/pays-organisateur-rencontre-grand-publique-jeune-publique-admin.component';
import { DisciplineScientifiqueExpertiseScientifiqueCreateAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/create-admin/discipline-scientifique-expertise-scientifique-create-admin.component';
import { DisciplineScientifiqueExpertiseScientifiqueEditAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/edit-admin/discipline-scientifique-expertise-scientifique-edit-admin.component';
import { DisciplineScientifiqueExpertiseScientifiqueViewAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/view-admin/discipline-scientifique-expertise-scientifique-view-admin.component';
import { DisciplineScientifiqueExpertiseScientifiqueListAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/list-admin/discipline-scientifique-expertise-scientifique-list-admin.component';
import { DisciplineScientifiqueExpertiseScientifiqueAdminComponent } from './view/discipline-scientifique-expertise-scientifique-admin/discipline-scientifique-expertise-scientifique-admin.component';
import { DisciplineScientifiqueErcCreateAdminComponent } from './view/discipline-scientifique-erc-admin/create-admin/discipline-scientifique-erc-create-admin.component';
import { DisciplineScientifiqueErcEditAdminComponent } from './view/discipline-scientifique-erc-admin/edit-admin/discipline-scientifique-erc-edit-admin.component';
import { DisciplineScientifiqueErcViewAdminComponent } from './view/discipline-scientifique-erc-admin/view-admin/discipline-scientifique-erc-view-admin.component';
import { DisciplineScientifiqueErcListAdminComponent } from './view/discipline-scientifique-erc-admin/list-admin/discipline-scientifique-erc-list-admin.component';
import { DisciplineScientifiqueErcAdminComponent } from './view/discipline-scientifique-erc-admin/discipline-scientifique-erc-admin.component';
import { TypeInstanceCreateAdminComponent } from './view/type-instance-admin/create-admin/type-instance-create-admin.component';
import { TypeInstanceEditAdminComponent } from './view/type-instance-admin/edit-admin/type-instance-edit-admin.component';
import { TypeInstanceViewAdminComponent } from './view/type-instance-admin/view-admin/type-instance-view-admin.component';
import { TypeInstanceListAdminComponent } from './view/type-instance-admin/list-admin/type-instance-list-admin.component';
import { TypeInstanceAdminComponent } from './view/type-instance-admin/type-instance-admin.component';
import { NiveauFormationCreateAdminComponent } from './view/niveau-formation-admin/create-admin/niveau-formation-create-admin.component';
import { NiveauFormationEditAdminComponent } from './view/niveau-formation-admin/edit-admin/niveau-formation-edit-admin.component';
import { NiveauFormationViewAdminComponent } from './view/niveau-formation-admin/view-admin/niveau-formation-view-admin.component';
import { NiveauFormationListAdminComponent } from './view/niveau-formation-admin/list-admin/niveau-formation-list-admin.component';
import { NiveauFormationAdminComponent } from './view/niveau-formation-admin/niveau-formation-admin.component';
import { FournisseurAppelProjetRechercheCreateAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/create-admin/fournisseur-appel-projet-recherche-create-admin.component';
import { FournisseurAppelProjetRechercheEditAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/edit-admin/fournisseur-appel-projet-recherche-edit-admin.component';
import { FournisseurAppelProjetRechercheViewAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/view-admin/fournisseur-appel-projet-recherche-view-admin.component';
import { FournisseurAppelProjetRechercheListAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/list-admin/fournisseur-appel-projet-recherche-list-admin.component';
import { FournisseurAppelProjetRechercheAdminComponent } from './view/fournisseur-appel-projet-recherche-admin/fournisseur-appel-projet-recherche-admin.component';
import { OutilPedagogiqueEnjeuxIrdCreateAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/create-admin/outil-pedagogique-enjeux-ird-create-admin.component';
import { OutilPedagogiqueEnjeuxIrdEditAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/edit-admin/outil-pedagogique-enjeux-ird-edit-admin.component';
import { OutilPedagogiqueEnjeuxIrdViewAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/view-admin/outil-pedagogique-enjeux-ird-view-admin.component';
import { OutilPedagogiqueEnjeuxIrdListAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/list-admin/outil-pedagogique-enjeux-ird-list-admin.component';
import { OutilPedagogiqueEnjeuxIrdAdminComponent } from './view/outil-pedagogique-enjeux-ird-admin/outil-pedagogique-enjeux-ird-admin.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/create-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-create-admin.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/edit-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/view-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-view-admin.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/list-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-list-admin.component';
import { RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueAdminComponent } from './view/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin/rencontre-grand-publique-jeune-publique-discipline-scientifique-admin.component';
import { GestionEquipeCreateAdminComponent } from './view/gestion-equipe-admin/create-admin/gestion-equipe-create-admin.component';
import { GestionEquipeEditAdminComponent } from './view/gestion-equipe-admin/edit-admin/gestion-equipe-edit-admin.component';
import { GestionEquipeViewAdminComponent } from './view/gestion-equipe-admin/view-admin/gestion-equipe-view-admin.component';
import { GestionEquipeListAdminComponent } from './view/gestion-equipe-admin/list-admin/gestion-equipe-list-admin.component';
import { GestionEquipeAdminComponent } from './view/gestion-equipe-admin/gestion-equipe-admin.component';
import { DistinctionCreateAdminComponent } from './view/distinction-admin/create-admin/distinction-create-admin.component';
import { DistinctionEditAdminComponent } from './view/distinction-admin/edit-admin/distinction-edit-admin.component';
import { DistinctionViewAdminComponent } from './view/distinction-admin/view-admin/distinction-view-admin.component';
import { DistinctionListAdminComponent } from './view/distinction-admin/list-admin/distinction-list-admin.component';
import { DistinctionAdminComponent } from './view/distinction-admin/distinction-admin.component';
import { CampagneRelanceCreateAdminComponent } from './view/campagne-relance-admin/create-admin/campagne-relance-create-admin.component';
import { CampagneRelanceEditAdminComponent } from './view/campagne-relance-admin/edit-admin/campagne-relance-edit-admin.component';
import { CampagneRelanceViewAdminComponent } from './view/campagne-relance-admin/view-admin/campagne-relance-view-admin.component';
import { CampagneRelanceListAdminComponent } from './view/campagne-relance-admin/list-admin/campagne-relance-list-admin.component';
import { CampagneRelanceAdminComponent } from './view/campagne-relance-admin/campagne-relance-admin.component';
import { RencontreMediaEnjeuxIrdCreateAdminComponent } from './view/rencontre-media-enjeux-ird-admin/create-admin/rencontre-media-enjeux-ird-create-admin.component';
import { RencontreMediaEnjeuxIrdEditAdminComponent } from './view/rencontre-media-enjeux-ird-admin/edit-admin/rencontre-media-enjeux-ird-edit-admin.component';
import { RencontreMediaEnjeuxIrdViewAdminComponent } from './view/rencontre-media-enjeux-ird-admin/view-admin/rencontre-media-enjeux-ird-view-admin.component';
import { RencontreMediaEnjeuxIrdListAdminComponent } from './view/rencontre-media-enjeux-ird-admin/list-admin/rencontre-media-enjeux-ird-list-admin.component';
import { RencontreMediaEnjeuxIrdAdminComponent } from './view/rencontre-media-enjeux-ird-admin/rencontre-media-enjeux-ird-admin.component';
import { ResponsabilitePedagogiquePaysCreateAdminComponent } from './view/responsabilite-pedagogique-pays-admin/create-admin/responsabilite-pedagogique-pays-create-admin.component';
import { ResponsabilitePedagogiquePaysEditAdminComponent } from './view/responsabilite-pedagogique-pays-admin/edit-admin/responsabilite-pedagogique-pays-edit-admin.component';
import { ResponsabilitePedagogiquePaysViewAdminComponent } from './view/responsabilite-pedagogique-pays-admin/view-admin/responsabilite-pedagogique-pays-view-admin.component';
import { ResponsabilitePedagogiquePaysListAdminComponent } from './view/responsabilite-pedagogique-pays-admin/list-admin/responsabilite-pedagogique-pays-list-admin.component';
import { ResponsabilitePedagogiquePaysAdminComponent } from './view/responsabilite-pedagogique-pays-admin/responsabilite-pedagogique-pays-admin.component';
import { TypePubliqueRencontreMediaCreateAdminComponent } from './view/type-publique-rencontre-media-admin/create-admin/type-publique-rencontre-media-create-admin.component';
import { TypePubliqueRencontreMediaEditAdminComponent } from './view/type-publique-rencontre-media-admin/edit-admin/type-publique-rencontre-media-edit-admin.component';
import { TypePubliqueRencontreMediaViewAdminComponent } from './view/type-publique-rencontre-media-admin/view-admin/type-publique-rencontre-media-view-admin.component';
import { TypePubliqueRencontreMediaListAdminComponent } from './view/type-publique-rencontre-media-admin/list-admin/type-publique-rencontre-media-list-admin.component';
import { TypePubliqueRencontreMediaAdminComponent } from './view/type-publique-rencontre-media-admin/type-publique-rencontre-media-admin.component';
import { FormationContinueEnjeuxIrdCreateAdminComponent } from './view/formation-continue-enjeux-ird-admin/create-admin/formation-continue-enjeux-ird-create-admin.component';
import { FormationContinueEnjeuxIrdEditAdminComponent } from './view/formation-continue-enjeux-ird-admin/edit-admin/formation-continue-enjeux-ird-edit-admin.component';
import { FormationContinueEnjeuxIrdViewAdminComponent } from './view/formation-continue-enjeux-ird-admin/view-admin/formation-continue-enjeux-ird-view-admin.component';
import { FormationContinueEnjeuxIrdListAdminComponent } from './view/formation-continue-enjeux-ird-admin/list-admin/formation-continue-enjeux-ird-list-admin.component';
import { FormationContinueEnjeuxIrdAdminComponent } from './view/formation-continue-enjeux-ird-admin/formation-continue-enjeux-ird-admin.component';
import { TypeExpertiseCreateAdminComponent } from './view/type-expertise-admin/create-admin/type-expertise-create-admin.component';
import { TypeExpertiseEditAdminComponent } from './view/type-expertise-admin/edit-admin/type-expertise-edit-admin.component';
import { TypeExpertiseViewAdminComponent } from './view/type-expertise-admin/view-admin/type-expertise-view-admin.component';
import { TypeExpertiseListAdminComponent } from './view/type-expertise-admin/list-admin/type-expertise-list-admin.component';
import { TypeExpertiseAdminComponent } from './view/type-expertise-admin/type-expertise-admin.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/create-admin/zone-geographique-consultance-scientifique-ponctuelle-create-admin.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleEditAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/edit-admin/zone-geographique-consultance-scientifique-ponctuelle-edit-admin.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleViewAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/view-admin/zone-geographique-consultance-scientifique-ponctuelle-view-admin.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleListAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/list-admin/zone-geographique-consultance-scientifique-ponctuelle-list-admin.component';
import { ZoneGeographiqueConsultanceScientifiquePonctuelleAdminComponent } from './view/zone-geographique-consultance-scientifique-ponctuelle-admin/zone-geographique-consultance-scientifique-ponctuelle-admin.component';
import { RencontreMediaPeriodeCreateAdminComponent } from './view/rencontre-media-periode-admin/create-admin/rencontre-media-periode-create-admin.component';
import { RencontreMediaPeriodeEditAdminComponent } from './view/rencontre-media-periode-admin/edit-admin/rencontre-media-periode-edit-admin.component';
import { RencontreMediaPeriodeViewAdminComponent } from './view/rencontre-media-periode-admin/view-admin/rencontre-media-periode-view-admin.component';
import { RencontreMediaPeriodeListAdminComponent } from './view/rencontre-media-periode-admin/list-admin/rencontre-media-periode-list-admin.component';
import { RencontreMediaPeriodeAdminComponent } from './view/rencontre-media-periode-admin/rencontre-media-periode-admin.component';
import { PaysRencontreGrandPubliqueJeunePubliqueCreateAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/create-admin/pays-rencontre-grand-publique-jeune-publique-create-admin.component';
import { PaysRencontreGrandPubliqueJeunePubliqueEditAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/edit-admin/pays-rencontre-grand-publique-jeune-publique-edit-admin.component';
import { PaysRencontreGrandPubliqueJeunePubliqueViewAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/view-admin/pays-rencontre-grand-publique-jeune-publique-view-admin.component';
import { PaysRencontreGrandPubliqueJeunePubliqueListAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/list-admin/pays-rencontre-grand-publique-jeune-publique-list-admin.component';
import { PaysRencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/pays-rencontre-grand-publique-jeune-publique-admin/pays-rencontre-grand-publique-jeune-publique-admin.component';
import { CommunauteSavoirProjetActiviteRechercheCreateAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/create-admin/communaute-savoir-projet-activite-recherche-create-admin.component';
import { CommunauteSavoirProjetActiviteRechercheEditAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/edit-admin/communaute-savoir-projet-activite-recherche-edit-admin.component';
import { CommunauteSavoirProjetActiviteRechercheViewAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/view-admin/communaute-savoir-projet-activite-recherche-view-admin.component';
import { CommunauteSavoirProjetActiviteRechercheListAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/list-admin/communaute-savoir-projet-activite-recherche-list-admin.component';
import { CommunauteSavoirProjetActiviteRechercheAdminComponent } from './view/communaute-savoir-projet-activite-recherche-admin/communaute-savoir-projet-activite-recherche-admin.component';
import { OutilPedagogiqueLangueCreateAdminComponent } from './view/outil-pedagogique-langue-admin/create-admin/outil-pedagogique-langue-create-admin.component';
import { OutilPedagogiqueLangueEditAdminComponent } from './view/outil-pedagogique-langue-admin/edit-admin/outil-pedagogique-langue-edit-admin.component';
import { OutilPedagogiqueLangueViewAdminComponent } from './view/outil-pedagogique-langue-admin/view-admin/outil-pedagogique-langue-view-admin.component';
import { OutilPedagogiqueLangueListAdminComponent } from './view/outil-pedagogique-langue-admin/list-admin/outil-pedagogique-langue-list-admin.component';
import { OutilPedagogiqueLangueAdminComponent } from './view/outil-pedagogique-langue-admin/outil-pedagogique-langue-admin.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/create-admin/instrument-ird-consultance-scientifique-ponctuelle-create-admin.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/edit-admin/instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/view-admin/instrument-ird-consultance-scientifique-ponctuelle-view-admin.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/list-admin/instrument-ird-consultance-scientifique-ponctuelle-list-admin.component';
import { InstrumentIrdConsultanceScientifiquePonctuelleAdminComponent } from './view/instrument-ird-consultance-scientifique-ponctuelle-admin/instrument-ird-consultance-scientifique-ponctuelle-admin.component';
import { ProjetActiviteRechercheCreateAdminComponent } from './view/projet-activite-recherche-admin/create-admin/projet-activite-recherche-create-admin.component';
import { ProjetActiviteRechercheEditAdminComponent } from './view/projet-activite-recherche-admin/edit-admin/projet-activite-recherche-edit-admin.component';
import { ProjetActiviteRechercheViewAdminComponent } from './view/projet-activite-recherche-admin/view-admin/projet-activite-recherche-view-admin.component';
import { ProjetActiviteRechercheListAdminComponent } from './view/projet-activite-recherche-admin/list-admin/projet-activite-recherche-list-admin.component';
import { ProjetActiviteRechercheAdminComponent } from './view/projet-activite-recherche-admin/projet-activite-recherche-admin.component';
import { ResponsabilitePedagogiqueEtablissementCreateAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/create-admin/responsabilite-pedagogique-etablissement-create-admin.component';
import { ResponsabilitePedagogiqueEtablissementEditAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/edit-admin/responsabilite-pedagogique-etablissement-edit-admin.component';
import { ResponsabilitePedagogiqueEtablissementViewAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/view-admin/responsabilite-pedagogique-etablissement-view-admin.component';
import { ResponsabilitePedagogiqueEtablissementListAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/list-admin/responsabilite-pedagogique-etablissement-list-admin.component';
import { ResponsabilitePedagogiqueEtablissementAdminComponent } from './view/responsabilite-pedagogique-etablissement-admin/responsabilite-pedagogique-etablissement-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEtablissementAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-etablissement-admin/developpement-de-savoir-et-innovation-scientifique-etablissement-admin.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/create-admin/objet-formation-generique-de-responsabilite-pedagogique-create-admin.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/edit-admin/objet-formation-generique-de-responsabilite-pedagogique-edit-admin.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/view-admin/objet-formation-generique-de-responsabilite-pedagogique-view-admin.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueListAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/list-admin/objet-formation-generique-de-responsabilite-pedagogique-list-admin.component';
import { ObjetFormationGeneriqueDeResponsabilitePedagogiqueAdminComponent } from './view/objet-formation-generique-de-responsabilite-pedagogique-admin/objet-formation-generique-de-responsabilite-pedagogique-admin.component';
import { NiveauEtudeCreateAdminComponent } from './view/niveau-etude-admin/create-admin/niveau-etude-create-admin.component';
import { NiveauEtudeEditAdminComponent } from './view/niveau-etude-admin/edit-admin/niveau-etude-edit-admin.component';
import { NiveauEtudeViewAdminComponent } from './view/niveau-etude-admin/view-admin/niveau-etude-view-admin.component';
import { NiveauEtudeListAdminComponent } from './view/niveau-etude-admin/list-admin/niveau-etude-list-admin.component';
import { NiveauEtudeAdminComponent } from './view/niveau-etude-admin/niveau-etude-admin.component';
import { RoleEvaluationCreateAdminComponent } from './view/role-evaluation-admin/create-admin/role-evaluation-create-admin.component';
import { RoleEvaluationEditAdminComponent } from './view/role-evaluation-admin/edit-admin/role-evaluation-edit-admin.component';
import { RoleEvaluationViewAdminComponent } from './view/role-evaluation-admin/view-admin/role-evaluation-view-admin.component';
import { RoleEvaluationListAdminComponent } from './view/role-evaluation-admin/list-admin/role-evaluation-list-admin.component';
import { RoleEvaluationAdminComponent } from './view/role-evaluation-admin/role-evaluation-admin.component';
import { TypeInstrumentIrdChercheurCreateAdminComponent } from './view/type-instrument-ird-chercheur-admin/create-admin/type-instrument-ird-chercheur-create-admin.component';
import { TypeInstrumentIrdChercheurEditAdminComponent } from './view/type-instrument-ird-chercheur-admin/edit-admin/type-instrument-ird-chercheur-edit-admin.component';
import { TypeInstrumentIrdChercheurViewAdminComponent } from './view/type-instrument-ird-chercheur-admin/view-admin/type-instrument-ird-chercheur-view-admin.component';
import { TypeInstrumentIrdChercheurListAdminComponent } from './view/type-instrument-ird-chercheur-admin/list-admin/type-instrument-ird-chercheur-list-admin.component';
import { TypeInstrumentIrdChercheurAdminComponent } from './view/type-instrument-ird-chercheur-admin/type-instrument-ird-chercheur-admin.component';
import { SemanticRelationshipCreateAdminComponent } from './view/semantic-relationship-admin/create-admin/semantic-relationship-create-admin.component';
import { SemanticRelationshipEditAdminComponent } from './view/semantic-relationship-admin/edit-admin/semantic-relationship-edit-admin.component';
import { SemanticRelationshipViewAdminComponent } from './view/semantic-relationship-admin/view-admin/semantic-relationship-view-admin.component';
import { SemanticRelationshipListAdminComponent } from './view/semantic-relationship-admin/list-admin/semantic-relationship-list-admin.component';
import { SemanticRelationshipAdminComponent } from './view/semantic-relationship-admin/semantic-relationship-admin.component';
import { DisciplineScientifiqueEncadrementDoctorantCreateAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/create-admin/discipline-scientifique-encadrement-doctorant-create-admin.component';
import { DisciplineScientifiqueEncadrementDoctorantEditAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/edit-admin/discipline-scientifique-encadrement-doctorant-edit-admin.component';
import { DisciplineScientifiqueEncadrementDoctorantViewAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/view-admin/discipline-scientifique-encadrement-doctorant-view-admin.component';
import { DisciplineScientifiqueEncadrementDoctorantListAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/list-admin/discipline-scientifique-encadrement-doctorant-list-admin.component';
import { DisciplineScientifiqueEncadrementDoctorantAdminComponent } from './view/discipline-scientifique-encadrement-doctorant-admin/discipline-scientifique-encadrement-doctorant-admin.component';
import { PaysRencontreMediaCreateAdminComponent } from './view/pays-rencontre-media-admin/create-admin/pays-rencontre-media-create-admin.component';
import { PaysRencontreMediaEditAdminComponent } from './view/pays-rencontre-media-admin/edit-admin/pays-rencontre-media-edit-admin.component';
import { PaysRencontreMediaViewAdminComponent } from './view/pays-rencontre-media-admin/view-admin/pays-rencontre-media-view-admin.component';
import { PaysRencontreMediaListAdminComponent } from './view/pays-rencontre-media-admin/list-admin/pays-rencontre-media-list-admin.component';
import { PaysRencontreMediaAdminComponent } from './view/pays-rencontre-media-admin/pays-rencontre-media-admin.component';
import { RencontreGrandPubliqueJeunePubliqueCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/create-admin/rencontre-grand-publique-jeune-publique-create-admin.component';
import { RencontreGrandPubliqueJeunePubliqueEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/edit-admin/rencontre-grand-publique-jeune-publique-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliqueViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/view-admin/rencontre-grand-publique-jeune-publique-view-admin.component';
import { RencontreGrandPubliqueJeunePubliqueListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/list-admin/rencontre-grand-publique-jeune-publique-list-admin.component';
import { RencontreGrandPubliqueJeunePubliqueAdminComponent } from './view/rencontre-grand-publique-jeune-publique-admin/rencontre-grand-publique-jeune-publique-admin.component';
import { TypeParticipationCreateAdminComponent } from './view/type-participation-admin/create-admin/type-participation-create-admin.component';
import { TypeParticipationEditAdminComponent } from './view/type-participation-admin/edit-admin/type-participation-edit-admin.component';
import { TypeParticipationViewAdminComponent } from './view/type-participation-admin/view-admin/type-participation-view-admin.component';
import { TypeParticipationListAdminComponent } from './view/type-participation-admin/list-admin/type-participation-list-admin.component';
import { TypeParticipationAdminComponent } from './view/type-participation-admin/type-participation-admin.component';
import { EvenementColloqueScienntifiquePaysCreateAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/create-admin/evenement-colloque-scienntifique-pays-create-admin.component';
import { EvenementColloqueScienntifiquePaysEditAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/edit-admin/evenement-colloque-scienntifique-pays-edit-admin.component';
import { EvenementColloqueScienntifiquePaysViewAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/view-admin/evenement-colloque-scienntifique-pays-view-admin.component';
import { EvenementColloqueScienntifiquePaysListAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/list-admin/evenement-colloque-scienntifique-pays-list-admin.component';
import { EvenementColloqueScienntifiquePaysAdminComponent } from './view/evenement-colloque-scienntifique-pays-admin/evenement-colloque-scienntifique-pays-admin.component';
import { EtatCampagneCreateAdminComponent } from './view/etat-campagne-admin/create-admin/etat-campagne-create-admin.component';
import { EtatCampagneEditAdminComponent } from './view/etat-campagne-admin/edit-admin/etat-campagne-edit-admin.component';
import { EtatCampagneViewAdminComponent } from './view/etat-campagne-admin/view-admin/etat-campagne-view-admin.component';
import { EtatCampagneListAdminComponent } from './view/etat-campagne-admin/list-admin/etat-campagne-list-admin.component';
import { EtatCampagneAdminComponent } from './view/etat-campagne-admin/etat-campagne-admin.component';
import { TypeEtudeCreateAdminComponent } from './view/type-etude-admin/create-admin/type-etude-create-admin.component';
import { TypeEtudeEditAdminComponent } from './view/type-etude-admin/edit-admin/type-etude-edit-admin.component';
import { TypeEtudeViewAdminComponent } from './view/type-etude-admin/view-admin/type-etude-view-admin.component';
import { TypeEtudeListAdminComponent } from './view/type-etude-admin/list-admin/type-etude-list-admin.component';
import { TypeEtudeAdminComponent } from './view/type-etude-admin/type-etude-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/create-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-create-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/edit-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-edit-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/view-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-view-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/list-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-list-admin.component';
import { DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminComponent } from './view/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin/developpement-de-savoir-et-innovation-scientifique-enjeux-ird-admin.component';
import { StructureOganisatriceCreateAdminComponent } from './view/structure-oganisatrice-admin/create-admin/structure-oganisatrice-create-admin.component';
import { StructureOganisatriceEditAdminComponent } from './view/structure-oganisatrice-admin/edit-admin/structure-oganisatrice-edit-admin.component';
import { StructureOganisatriceViewAdminComponent } from './view/structure-oganisatrice-admin/view-admin/structure-oganisatrice-view-admin.component';
import { StructureOganisatriceListAdminComponent } from './view/structure-oganisatrice-admin/list-admin/structure-oganisatrice-list-admin.component';
import { StructureOganisatriceAdminComponent } from './view/structure-oganisatrice-admin/structure-oganisatrice-admin.component';
import { DisciplineScientifiqueEncadrementEtudiantCreateAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/create-admin/discipline-scientifique-encadrement-etudiant-create-admin.component';
import { DisciplineScientifiqueEncadrementEtudiantEditAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/edit-admin/discipline-scientifique-encadrement-etudiant-edit-admin.component';
import { DisciplineScientifiqueEncadrementEtudiantViewAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/view-admin/discipline-scientifique-encadrement-etudiant-view-admin.component';
import { DisciplineScientifiqueEncadrementEtudiantListAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/list-admin/discipline-scientifique-encadrement-etudiant-list-admin.component';
import { DisciplineScientifiqueEncadrementEtudiantAdminComponent } from './view/discipline-scientifique-encadrement-etudiant-admin/discipline-scientifique-encadrement-etudiant-admin.component';
import { FormationContinueCommanditaireCreateAdminComponent } from './view/formation-continue-commanditaire-admin/create-admin/formation-continue-commanditaire-create-admin.component';
import { FormationContinueCommanditaireEditAdminComponent } from './view/formation-continue-commanditaire-admin/edit-admin/formation-continue-commanditaire-edit-admin.component';
import { FormationContinueCommanditaireViewAdminComponent } from './view/formation-continue-commanditaire-admin/view-admin/formation-continue-commanditaire-view-admin.component';
import { FormationContinueCommanditaireListAdminComponent } from './view/formation-continue-commanditaire-admin/list-admin/formation-continue-commanditaire-list-admin.component';
import { FormationContinueCommanditaireAdminComponent } from './view/formation-continue-commanditaire-admin/formation-continue-commanditaire-admin.component';
import { TemplateRappelCreateAdminComponent } from './view/template-rappel-admin/create-admin/template-rappel-create-admin.component';
import { TemplateRappelEditAdminComponent } from './view/template-rappel-admin/edit-admin/template-rappel-edit-admin.component';
import { TemplateRappelViewAdminComponent } from './view/template-rappel-admin/view-admin/template-rappel-view-admin.component';
import { TemplateRappelListAdminComponent } from './view/template-rappel-admin/list-admin/template-rappel-list-admin.component';
import { TemplateRappelAdminComponent } from './view/template-rappel-admin/template-rappel-admin.component';
import { AffectationStructurelleCreateAdminComponent } from './view/affectation-structurelle-admin/create-admin/affectation-structurelle-create-admin.component';
import { AffectationStructurelleEditAdminComponent } from './view/affectation-structurelle-admin/edit-admin/affectation-structurelle-edit-admin.component';
import { AffectationStructurelleViewAdminComponent } from './view/affectation-structurelle-admin/view-admin/affectation-structurelle-view-admin.component';
import { AffectationStructurelleListAdminComponent } from './view/affectation-structurelle-admin/list-admin/affectation-structurelle-list-admin.component';
import { AffectationStructurelleAdminComponent } from './view/affectation-structurelle-admin/affectation-structurelle-admin.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/create-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-create-admin.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/edit-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-edit-admin.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/view-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-view-admin.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/list-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-list-admin.component';
import { CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin/caracterisation-developpement-de-savoir-et-innovation-scientifique-admin.component';
import { PaysCommanditaireCreateAdminComponent } from './view/pays-commanditaire-admin/create-admin/pays-commanditaire-create-admin.component';
import { PaysCommanditaireEditAdminComponent } from './view/pays-commanditaire-admin/edit-admin/pays-commanditaire-edit-admin.component';
import { PaysCommanditaireViewAdminComponent } from './view/pays-commanditaire-admin/view-admin/pays-commanditaire-view-admin.component';
import { PaysCommanditaireListAdminComponent } from './view/pays-commanditaire-admin/list-admin/pays-commanditaire-list-admin.component';
import { PaysCommanditaireAdminComponent } from './view/pays-commanditaire-admin/pays-commanditaire-admin.component';
import { FormatRencontreCreateAdminComponent } from './view/format-rencontre-admin/create-admin/format-rencontre-create-admin.component';
import { FormatRencontreEditAdminComponent } from './view/format-rencontre-admin/edit-admin/format-rencontre-edit-admin.component';
import { FormatRencontreViewAdminComponent } from './view/format-rencontre-admin/view-admin/format-rencontre-view-admin.component';
import { FormatRencontreListAdminComponent } from './view/format-rencontre-admin/list-admin/format-rencontre-list-admin.component';
import { FormatRencontreAdminComponent } from './view/format-rencontre-admin/format-rencontre-admin.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/create-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-create-admin.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/edit-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-edit-admin.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/view-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-view-admin.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/list-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-list-admin.component';
import { RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdAdminComponent } from './view/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin/rencontre-grand-publique-jeune-publique-type-instrument-ird-admin.component';
import { TypeReclamationCreateAdminComponent } from './view/type-reclamation-admin/create-admin/type-reclamation-create-admin.component';
import { TypeReclamationEditAdminComponent } from './view/type-reclamation-admin/edit-admin/type-reclamation-edit-admin.component';
import { TypeReclamationViewAdminComponent } from './view/type-reclamation-admin/view-admin/type-reclamation-view-admin.component';
import { TypeReclamationListAdminComponent } from './view/type-reclamation-admin/list-admin/type-reclamation-list-admin.component';
import { TypeReclamationAdminComponent } from './view/type-reclamation-admin/type-reclamation-admin.component';
import { FormationContinueDisciplineScientifiqueCreateAdminComponent } from './view/formation-continue-discipline-scientifique-admin/create-admin/formation-continue-discipline-scientifique-create-admin.component';
import { FormationContinueDisciplineScientifiqueEditAdminComponent } from './view/formation-continue-discipline-scientifique-admin/edit-admin/formation-continue-discipline-scientifique-edit-admin.component';
import { FormationContinueDisciplineScientifiqueViewAdminComponent } from './view/formation-continue-discipline-scientifique-admin/view-admin/formation-continue-discipline-scientifique-view-admin.component';
import { FormationContinueDisciplineScientifiqueListAdminComponent } from './view/formation-continue-discipline-scientifique-admin/list-admin/formation-continue-discipline-scientifique-list-admin.component';
import { FormationContinueDisciplineScientifiqueAdminComponent } from './view/formation-continue-discipline-scientifique-admin/formation-continue-discipline-scientifique-admin.component';
import { EnjeuxIrdEncadrementDoctorantCreateAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/create-admin/enjeux-ird-encadrement-doctorant-create-admin.component';
import { EnjeuxIrdEncadrementDoctorantEditAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/edit-admin/enjeux-ird-encadrement-doctorant-edit-admin.component';
import { EnjeuxIrdEncadrementDoctorantViewAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/view-admin/enjeux-ird-encadrement-doctorant-view-admin.component';
import { EnjeuxIrdEncadrementDoctorantListAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/list-admin/enjeux-ird-encadrement-doctorant-list-admin.component';
import { EnjeuxIrdEncadrementDoctorantAdminComponent } from './view/enjeux-ird-encadrement-doctorant-admin/enjeux-ird-encadrement-doctorant-admin.component';
import { EnseignementNatureCreateAdminComponent } from './view/enseignement-nature-admin/create-admin/enseignement-nature-create-admin.component';
import { EnseignementNatureEditAdminComponent } from './view/enseignement-nature-admin/edit-admin/enseignement-nature-edit-admin.component';
import { EnseignementNatureViewAdminComponent } from './view/enseignement-nature-admin/view-admin/enseignement-nature-view-admin.component';
import { EnseignementNatureListAdminComponent } from './view/enseignement-nature-admin/list-admin/enseignement-nature-list-admin.component';
import { EnseignementNatureAdminComponent } from './view/enseignement-nature-admin/enseignement-nature-admin.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/create-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-create-admin.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/edit-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-edit-admin.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/view-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-view-admin.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/list-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-list-admin.component';
import { TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent } from './view/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin/type-savoir-developpement-de-savoir-et-innovation-scientifique-admin.component';
import { NiveauEtudeEnseignementCreateAdminComponent } from './view/niveau-etude-enseignement-admin/create-admin/niveau-etude-enseignement-create-admin.component';
import { NiveauEtudeEnseignementEditAdminComponent } from './view/niveau-etude-enseignement-admin/edit-admin/niveau-etude-enseignement-edit-admin.component';
import { NiveauEtudeEnseignementViewAdminComponent } from './view/niveau-etude-enseignement-admin/view-admin/niveau-etude-enseignement-view-admin.component';
import { NiveauEtudeEnseignementListAdminComponent } from './view/niveau-etude-enseignement-admin/list-admin/niveau-etude-enseignement-list-admin.component';
import { NiveauEtudeEnseignementAdminComponent } from './view/niveau-etude-enseignement-admin/niveau-etude-enseignement-admin.component';
import { CommissionScientifiqueCreateAdminComponent } from './view/commission-scientifique-admin/create-admin/commission-scientifique-create-admin.component';
import { CommissionScientifiqueEditAdminComponent } from './view/commission-scientifique-admin/edit-admin/commission-scientifique-edit-admin.component';
import { CommissionScientifiqueViewAdminComponent } from './view/commission-scientifique-admin/view-admin/commission-scientifique-view-admin.component';
import { CommissionScientifiqueListAdminComponent } from './view/commission-scientifique-admin/list-admin/commission-scientifique-list-admin.component';
import { CommissionScientifiqueAdminComponent } from './view/commission-scientifique-admin/commission-scientifique-admin.component';
import { CategorieNotificationCreateAdminComponent } from './view/categorie-notification-admin/create-admin/categorie-notification-create-admin.component';
import { CategorieNotificationEditAdminComponent } from './view/categorie-notification-admin/edit-admin/categorie-notification-edit-admin.component';
import { CategorieNotificationViewAdminComponent } from './view/categorie-notification-admin/view-admin/categorie-notification-view-admin.component';
import { CategorieNotificationListAdminComponent } from './view/categorie-notification-admin/list-admin/categorie-notification-list-admin.component';
import { CategorieNotificationAdminComponent } from './view/categorie-notification-admin/categorie-notification-admin.component';
import { ChercheurCreateAdminComponent } from './view/chercheur-admin/create-admin/chercheur-create-admin.component';
import { ChercheurEditAdminComponent } from './view/chercheur-admin/edit-admin/chercheur-edit-admin.component';
import { ChercheurViewAdminComponent } from './view/chercheur-admin/view-admin/chercheur-view-admin.component';
import { ChercheurListAdminComponent } from './view/chercheur-admin/list-admin/chercheur-list-admin.component';
import { ChercheurAdminComponent } from './view/chercheur-admin/chercheur-admin.component';
import { EtablissementConseilsScientifiqueCreateAdminComponent } from './view/etablissement-conseils-scientifique-admin/create-admin/etablissement-conseils-scientifique-create-admin.component';
import { EtablissementConseilsScientifiqueEditAdminComponent } from './view/etablissement-conseils-scientifique-admin/edit-admin/etablissement-conseils-scientifique-edit-admin.component';
import { EtablissementConseilsScientifiqueViewAdminComponent } from './view/etablissement-conseils-scientifique-admin/view-admin/etablissement-conseils-scientifique-view-admin.component';
import { EtablissementConseilsScientifiqueListAdminComponent } from './view/etablissement-conseils-scientifique-admin/list-admin/etablissement-conseils-scientifique-list-admin.component';
import { EtablissementConseilsScientifiqueAdminComponent } from './view/etablissement-conseils-scientifique-admin/etablissement-conseils-scientifique-admin.component';
import { CampagneCreateAdminComponent } from './view/campagne-admin/create-admin/campagne-create-admin.component';
import { CampagneEditAdminComponent } from './view/campagne-admin/edit-admin/campagne-edit-admin.component';
import { CampagneViewAdminComponent } from './view/campagne-admin/view-admin/campagne-view-admin.component';
import { CampagneListAdminComponent } from './view/campagne-admin/list-admin/campagne-list-admin.component';
import { CampagneAdminComponent } from './view/campagne-admin/campagne-admin.component';
import { SexeCreateAdminComponent } from './view/sexe-admin/create-admin/sexe-create-admin.component';
import { SexeEditAdminComponent } from './view/sexe-admin/edit-admin/sexe-edit-admin.component';
import { SexeViewAdminComponent } from './view/sexe-admin/view-admin/sexe-view-admin.component';
import { SexeListAdminComponent } from './view/sexe-admin/list-admin/sexe-list-admin.component';
import { SexeAdminComponent } from './view/sexe-admin/sexe-admin.component';
import { EtatCampagneChercheurCreateAdminComponent } from './view/etat-campagne-chercheur-admin/create-admin/etat-campagne-chercheur-create-admin.component';
import { EtatCampagneChercheurEditAdminComponent } from './view/etat-campagne-chercheur-admin/edit-admin/etat-campagne-chercheur-edit-admin.component';
import { EtatCampagneChercheurViewAdminComponent } from './view/etat-campagne-chercheur-admin/view-admin/etat-campagne-chercheur-view-admin.component';
import { EtatCampagneChercheurListAdminComponent } from './view/etat-campagne-chercheur-admin/list-admin/etat-campagne-chercheur-list-admin.component';
import { EtatCampagneChercheurAdminComponent } from './view/etat-campagne-chercheur-admin/etat-campagne-chercheur-admin.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {SwitchChercheurAdminComponent} from './view/switch_chercheur/switch-chercheur-admin.component';

@NgModule({
  declarations: [
   LoginAdminComponent,
   RegisterAdminComponent,
     SwitchChercheurAdminComponent,
    GestionEquipeDetailCreateAdminComponent,
    GestionEquipeDetailListAdminComponent,
    GestionEquipeDetailViewAdminComponent,
    GestionEquipeDetailEditAdminComponent,
    GestionEquipeDetailAdminComponent,
    LangueCreateAdminComponent,
    LangueListAdminComponent,
    LangueViewAdminComponent,
    LangueEditAdminComponent,
    LangueAdminComponent,
    OutilPedagogiquePubliqueCibleCreateAdminComponent,
    OutilPedagogiquePubliqueCibleListAdminComponent,
    OutilPedagogiquePubliqueCibleViewAdminComponent,
    OutilPedagogiquePubliqueCibleEditAdminComponent,
    OutilPedagogiquePubliqueCibleAdminComponent,
    StatusContratEtConventionCreateAdminComponent,
    StatusContratEtConventionListAdminComponent,
    StatusContratEtConventionViewAdminComponent,
    StatusContratEtConventionEditAdminComponent,
    StatusContratEtConventionAdminComponent,
    ResponsabilitePedagogiqueCreateAdminComponent,
    ResponsabilitePedagogiqueListAdminComponent,
    ResponsabilitePedagogiqueViewAdminComponent,
    ResponsabilitePedagogiqueEditAdminComponent,
    ResponsabilitePedagogiqueAdminComponent,
    ConseilEtComiteScientifiqueCreateAdminComponent,
    ConseilEtComiteScientifiqueListAdminComponent,
    ConseilEtComiteScientifiqueViewAdminComponent,
    ConseilEtComiteScientifiqueEditAdminComponent,
    ConseilEtComiteScientifiqueAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirAdminComponent,
    TypeEtudeEnseignementCreateAdminComponent,
    TypeEtudeEnseignementListAdminComponent,
    TypeEtudeEnseignementViewAdminComponent,
    TypeEtudeEnseignementEditAdminComponent,
    TypeEtudeEnseignementAdminComponent,
    SavoirEtInnovationCreateAdminComponent,
    SavoirEtInnovationListAdminComponent,
    SavoirEtInnovationViewAdminComponent,
    SavoirEtInnovationEditAdminComponent,
    SavoirEtInnovationAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
    EnseignementZoneGeographiqueCreateAdminComponent,
    EnseignementZoneGeographiqueListAdminComponent,
    EnseignementZoneGeographiqueViewAdminComponent,
    EnseignementZoneGeographiqueEditAdminComponent,
    EnseignementZoneGeographiqueAdminComponent,
    IdentifiantAuteurExpertCreateAdminComponent,
    IdentifiantAuteurExpertListAdminComponent,
    IdentifiantAuteurExpertViewAdminComponent,
    IdentifiantAuteurExpertEditAdminComponent,
    IdentifiantAuteurExpertAdminComponent,
    CommunauteSavoirEncadrementDoctorantCreateAdminComponent,
    CommunauteSavoirEncadrementDoctorantListAdminComponent,
    CommunauteSavoirEncadrementDoctorantViewAdminComponent,
    CommunauteSavoirEncadrementDoctorantEditAdminComponent,
    CommunauteSavoirEncadrementDoctorantAdminComponent,
    ZoneActiviteInteractionRechercheCreateAdminComponent,
    ZoneActiviteInteractionRechercheListAdminComponent,
    ZoneActiviteInteractionRechercheViewAdminComponent,
    ZoneActiviteInteractionRechercheEditAdminComponent,
    ZoneActiviteInteractionRechercheAdminComponent,
    DisciplineScientifiqueConseilsScientifiqueCreateAdminComponent,
    DisciplineScientifiqueConseilsScientifiqueListAdminComponent,
    DisciplineScientifiqueConseilsScientifiqueViewAdminComponent,
    DisciplineScientifiqueConseilsScientifiqueEditAdminComponent,
    DisciplineScientifiqueConseilsScientifiqueAdminComponent,
    VieInstitutionnelleCreateAdminComponent,
    VieInstitutionnelleListAdminComponent,
    VieInstitutionnelleViewAdminComponent,
    VieInstitutionnelleEditAdminComponent,
    VieInstitutionnelleAdminComponent,
    CommunauteSavoirEncadrementEtudiantCreateAdminComponent,
    CommunauteSavoirEncadrementEtudiantListAdminComponent,
    CommunauteSavoirEncadrementEtudiantViewAdminComponent,
    CommunauteSavoirEncadrementEtudiantEditAdminComponent,
    CommunauteSavoirEncadrementEtudiantAdminComponent,
    ConseilsScientifiqueCreateAdminComponent,
    ConseilsScientifiqueListAdminComponent,
    ConseilsScientifiqueViewAdminComponent,
    ConseilsScientifiqueEditAdminComponent,
    ConseilsScientifiqueAdminComponent,
    InstrumentsEtDispositifsIrdCreateAdminComponent,
    InstrumentsEtDispositifsIrdListAdminComponent,
    InstrumentsEtDispositifsIrdViewAdminComponent,
    InstrumentsEtDispositifsIrdEditAdminComponent,
    InstrumentsEtDispositifsIrdAdminComponent,
    EtatReclamationCreateAdminComponent,
    EtatReclamationListAdminComponent,
    EtatReclamationViewAdminComponent,
    EtatReclamationEditAdminComponent,
    EtatReclamationAdminComponent,
    NotificationCreateAdminComponent,
    NotificationListAdminComponent,
    NotificationViewAdminComponent,
    NotificationEditAdminComponent,
    NotificationAdminComponent,
    VieInstitutionnelleDetailEtablissementCreateAdminComponent,
    VieInstitutionnelleDetailEtablissementListAdminComponent,
    VieInstitutionnelleDetailEtablissementViewAdminComponent,
    VieInstitutionnelleDetailEtablissementEditAdminComponent,
    VieInstitutionnelleDetailEtablissementAdminComponent,
    OutilPedagogiqueInstrumentIrdCreateAdminComponent,
    OutilPedagogiqueInstrumentIrdListAdminComponent,
    OutilPedagogiqueInstrumentIrdViewAdminComponent,
    OutilPedagogiqueInstrumentIrdEditAdminComponent,
    OutilPedagogiqueInstrumentIrdAdminComponent,
    OutilPedagogiqueCreateAdminComponent,
    OutilPedagogiqueListAdminComponent,
    OutilPedagogiqueViewAdminComponent,
    OutilPedagogiqueEditAdminComponent,
    OutilPedagogiqueAdminComponent,
    TypeOutilPedagogiqueCreateAdminComponent,
    TypeOutilPedagogiqueListAdminComponent,
    TypeOutilPedagogiqueViewAdminComponent,
    TypeOutilPedagogiqueEditAdminComponent,
    TypeOutilPedagogiqueAdminComponent,
    DisciplineScientifiqueChercheurCreateAdminComponent,
    DisciplineScientifiqueChercheurListAdminComponent,
    DisciplineScientifiqueChercheurViewAdminComponent,
    DisciplineScientifiqueChercheurEditAdminComponent,
    DisciplineScientifiqueChercheurAdminComponent,
    OutilPedagogiquePaysDiffusionCreateAdminComponent,
    OutilPedagogiquePaysDiffusionListAdminComponent,
    OutilPedagogiquePaysDiffusionViewAdminComponent,
    OutilPedagogiquePaysDiffusionEditAdminComponent,
    OutilPedagogiquePaysDiffusionAdminComponent,
    RencontreMediaDisciplineScientifiqueCreateAdminComponent,
    RencontreMediaDisciplineScientifiqueListAdminComponent,
    RencontreMediaDisciplineScientifiqueViewAdminComponent,
    RencontreMediaDisciplineScientifiqueEditAdminComponent,
    RencontreMediaDisciplineScientifiqueAdminComponent,
    CommunauteSavoirEvenementColloqueScientifiqueCreateAdminComponent,
    CommunauteSavoirEvenementColloqueScientifiqueListAdminComponent,
    CommunauteSavoirEvenementColloqueScientifiqueViewAdminComponent,
    CommunauteSavoirEvenementColloqueScientifiqueEditAdminComponent,
    CommunauteSavoirEvenementColloqueScientifiqueAdminComponent,
    VieInstitutionnelleDetailCreateAdminComponent,
    VieInstitutionnelleDetailListAdminComponent,
    VieInstitutionnelleDetailViewAdminComponent,
    VieInstitutionnelleDetailEditAdminComponent,
    VieInstitutionnelleDetailAdminComponent,
    NiveauResponsabilitePedagogiqueCreateAdminComponent,
    NiveauResponsabilitePedagogiqueListAdminComponent,
    NiveauResponsabilitePedagogiqueViewAdminComponent,
    NiveauResponsabilitePedagogiqueEditAdminComponent,
    NiveauResponsabilitePedagogiqueAdminComponent,
    ZoneGeographiqueConseilsScientifiqueCreateAdminComponent,
    ZoneGeographiqueConseilsScientifiqueListAdminComponent,
    ZoneGeographiqueConseilsScientifiqueViewAdminComponent,
    ZoneGeographiqueConseilsScientifiqueEditAdminComponent,
    ZoneGeographiqueConseilsScientifiqueAdminComponent,
    EtablissementConsultanceScientifiquePonctuelleCreateAdminComponent,
    EtablissementConsultanceScientifiquePonctuelleListAdminComponent,
    EtablissementConsultanceScientifiquePonctuelleViewAdminComponent,
    EtablissementConsultanceScientifiquePonctuelleEditAdminComponent,
    EtablissementConsultanceScientifiquePonctuelleAdminComponent,
    CampagneRelanceChercheurCreateAdminComponent,
    CampagneRelanceChercheurListAdminComponent,
    CampagneRelanceChercheurViewAdminComponent,
    CampagneRelanceChercheurEditAdminComponent,
    CampagneRelanceChercheurAdminComponent,
    ContratEtConventionIrdCreateAdminComponent,
    ContratEtConventionIrdListAdminComponent,
    ContratEtConventionIrdViewAdminComponent,
    ContratEtConventionIrdEditAdminComponent,
    ContratEtConventionIrdAdminComponent,
    ProjetActiviteRechercheDetailPaysCreateAdminComponent,
    ProjetActiviteRechercheDetailPaysListAdminComponent,
    ProjetActiviteRechercheDetailPaysViewAdminComponent,
    ProjetActiviteRechercheDetailPaysEditAdminComponent,
    ProjetActiviteRechercheDetailPaysAdminComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeListAdminComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeViewAdminComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeEditAdminComponent,
    RencontreGrandPubliqueJeunePubliquePeriodeAdminComponent,
    PaysFormationContinueCreateAdminComponent,
    PaysFormationContinueListAdminComponent,
    PaysFormationContinueViewAdminComponent,
    PaysFormationContinueEditAdminComponent,
    PaysFormationContinueAdminComponent,
    VieInstitutionnelleDetailInstrumentIrdCreateAdminComponent,
    VieInstitutionnelleDetailInstrumentIrdListAdminComponent,
    VieInstitutionnelleDetailInstrumentIrdViewAdminComponent,
    VieInstitutionnelleDetailInstrumentIrdEditAdminComponent,
    VieInstitutionnelleDetailInstrumentIrdAdminComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdCreateAdminComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdListAdminComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdViewAdminComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdEditAdminComponent,
    EvenementColloqueScienntifiqueEnjeuxIrdAdminComponent,
    CultureScientifiqueCreateAdminComponent,
    CultureScientifiqueListAdminComponent,
    CultureScientifiqueViewAdminComponent,
    CultureScientifiqueEditAdminComponent,
    CultureScientifiqueAdminComponent,
    EnseignementCreateAdminComponent,
    EnseignementListAdminComponent,
    EnseignementViewAdminComponent,
    EnseignementEditAdminComponent,
    EnseignementAdminComponent,
    PaysZoneGeographiqueCreateAdminComponent,
    PaysZoneGeographiqueListAdminComponent,
    PaysZoneGeographiqueViewAdminComponent,
    PaysZoneGeographiqueEditAdminComponent,
    PaysZoneGeographiqueAdminComponent,
    EncadrementEtudiantCreateAdminComponent,
    EncadrementEtudiantListAdminComponent,
    EncadrementEtudiantViewAdminComponent,
    EncadrementEtudiantEditAdminComponent,
    EncadrementEtudiantAdminComponent,
    EnjeuxIrdComiteEtCommissionEvaluationCreateAdminComponent,
    EnjeuxIrdComiteEtCommissionEvaluationListAdminComponent,
    EnjeuxIrdComiteEtCommissionEvaluationViewAdminComponent,
    EnjeuxIrdComiteEtCommissionEvaluationEditAdminComponent,
    EnjeuxIrdComiteEtCommissionEvaluationAdminComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateAdminComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationListAdminComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationViewAdminComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationEditAdminComponent,
    TypeExpertiseEvaluationComiteEtCommissionEvaluationAdminComponent,
    RencontreMediaCreateAdminComponent,
    RencontreMediaListAdminComponent,
    RencontreMediaViewAdminComponent,
    RencontreMediaEditAdminComponent,
    RencontreMediaAdminComponent,
    ReclamationCreateAdminComponent,
    ReclamationListAdminComponent,
    ReclamationViewAdminComponent,
    ReclamationEditAdminComponent,
    ReclamationAdminComponent,
    EncadrementEtudiantEnjeuxIrdCreateAdminComponent,
    EncadrementEtudiantEnjeuxIrdListAdminComponent,
    EncadrementEtudiantEnjeuxIrdViewAdminComponent,
    EncadrementEtudiantEnjeuxIrdEditAdminComponent,
    EncadrementEtudiantEnjeuxIrdAdminComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurCreateAdminComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurListAdminComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurViewAdminComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurEditAdminComponent,
    ProjetActiviteRechercheDetailEtablissementLanceurAdminComponent,
    CampagneRappelCreateAdminComponent,
    CampagneRappelListAdminComponent,
    CampagneRappelViewAdminComponent,
    CampagneRappelEditAdminComponent,
    CampagneRappelAdminComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueCreateAdminComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueListAdminComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueViewAdminComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueEditAdminComponent,
    DisciplineScientifiqueEvenementColloqueScientifiqueAdminComponent,
    OutilPedagogiqueDisciplineScientifiqueCreateAdminComponent,
    OutilPedagogiqueDisciplineScientifiqueListAdminComponent,
    OutilPedagogiqueDisciplineScientifiqueViewAdminComponent,
    OutilPedagogiqueDisciplineScientifiqueEditAdminComponent,
    OutilPedagogiqueDisciplineScientifiqueAdminComponent,
    CampagneRappelChercheurCreateAdminComponent,
    CampagneRappelChercheurListAdminComponent,
    CampagneRappelChercheurViewAdminComponent,
    CampagneRappelChercheurEditAdminComponent,
    CampagneRappelChercheurAdminComponent,
    EncadrementCreateAdminComponent,
    EncadrementListAdminComponent,
    EncadrementViewAdminComponent,
    EncadrementEditAdminComponent,
    EncadrementAdminComponent,
    EnjeuxIrdConseilsScientifiqueCreateAdminComponent,
    EnjeuxIrdConseilsScientifiqueListAdminComponent,
    EnjeuxIrdConseilsScientifiqueViewAdminComponent,
    EnjeuxIrdConseilsScientifiqueEditAdminComponent,
    EnjeuxIrdConseilsScientifiqueAdminComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateAdminComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleListAdminComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleViewAdminComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleEditAdminComponent,
    DisciplineScientifiqueConsultanceScientifiquePonctuelleAdminComponent,
    FormationContinuePubliqueProfessionelCreateAdminComponent,
    FormationContinuePubliqueProfessionelListAdminComponent,
    FormationContinuePubliqueProfessionelViewAdminComponent,
    FormationContinuePubliqueProfessionelEditAdminComponent,
    FormationContinuePubliqueProfessionelAdminComponent,
    EnseignementEnjeuxIrdCreateAdminComponent,
    EnseignementEnjeuxIrdListAdminComponent,
    EnseignementEnjeuxIrdViewAdminComponent,
    EnseignementEnjeuxIrdEditAdminComponent,
    EnseignementEnjeuxIrdAdminComponent,
    InstrumentIrdComiteEtCommissionEvaluationCreateAdminComponent,
    InstrumentIrdComiteEtCommissionEvaluationListAdminComponent,
    InstrumentIrdComiteEtCommissionEvaluationViewAdminComponent,
    InstrumentIrdComiteEtCommissionEvaluationEditAdminComponent,
    InstrumentIrdComiteEtCommissionEvaluationAdminComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueCreateAdminComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueListAdminComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueViewAdminComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueEditAdminComponent,
    DisciplineScientifiqueConseilEtComiteScientifiqueAdminComponent,
    EtatEtapeCampagneCreateAdminComponent,
    EtatEtapeCampagneListAdminComponent,
    EtatEtapeCampagneViewAdminComponent,
    EtatEtapeCampagneEditAdminComponent,
    EtatEtapeCampagneAdminComponent,
    ProjetActiviteRechercheDetailCreateAdminComponent,
    ProjetActiviteRechercheDetailListAdminComponent,
    ProjetActiviteRechercheDetailViewAdminComponent,
    ProjetActiviteRechercheDetailEditAdminComponent,
    ProjetActiviteRechercheDetailAdminComponent,
    ExpertiseCreateAdminComponent,
    ExpertiseListAdminComponent,
    ExpertiseViewAdminComponent,
    ExpertiseEditAdminComponent,
    ExpertiseAdminComponent,
    TypePubliqueCreateAdminComponent,
    TypePubliqueListAdminComponent,
    TypePubliqueViewAdminComponent,
    TypePubliqueEditAdminComponent,
    TypePubliqueAdminComponent,
    CampagneChercheurOuvertureCreateAdminComponent,
    CampagneChercheurOuvertureListAdminComponent,
    CampagneChercheurOuvertureViewAdminComponent,
    CampagneChercheurOuvertureEditAdminComponent,
    CampagneChercheurOuvertureAdminComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleListAdminComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleViewAdminComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleEditAdminComponent,
    EnjeuxIrdConsultanceScientifiquePonctuelleAdminComponent,
    EtablissementComiteEtCommissionEvaluationCreateAdminComponent,
    EtablissementComiteEtCommissionEvaluationListAdminComponent,
    EtablissementComiteEtCommissionEvaluationViewAdminComponent,
    EtablissementComiteEtCommissionEvaluationEditAdminComponent,
    EtablissementComiteEtCommissionEvaluationAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminComponent,
    ResponsabilitePedagogiqueEnjeuxIrdCreateAdminComponent,
    ResponsabilitePedagogiqueEnjeuxIrdListAdminComponent,
    ResponsabilitePedagogiqueEnjeuxIrdViewAdminComponent,
    ResponsabilitePedagogiqueEnjeuxIrdEditAdminComponent,
    ResponsabilitePedagogiqueEnjeuxIrdAdminComponent,
    FaqCreateAdminComponent,
    FaqListAdminComponent,
    FaqViewAdminComponent,
    FaqEditAdminComponent,
    FaqAdminComponent,
    ExpertiseScientifiqueCreateAdminComponent,
    ExpertiseScientifiqueListAdminComponent,
    ExpertiseScientifiqueViewAdminComponent,
    ExpertiseScientifiqueEditAdminComponent,
    ExpertiseScientifiqueAdminComponent,
    EtablissementEnseignementCreateAdminComponent,
    EtablissementEnseignementListAdminComponent,
    EtablissementEnseignementViewAdminComponent,
    EtablissementEnseignementEditAdminComponent,
    EtablissementEnseignementAdminComponent,
    OutilPedagogiquePaysConceptionCreateAdminComponent,
    OutilPedagogiquePaysConceptionListAdminComponent,
    OutilPedagogiquePaysConceptionViewAdminComponent,
    OutilPedagogiquePaysConceptionEditAdminComponent,
    OutilPedagogiquePaysConceptionAdminComponent,
    CampagneChercheurFermetureCreateAdminComponent,
    CampagneChercheurFermetureListAdminComponent,
    CampagneChercheurFermetureViewAdminComponent,
    CampagneChercheurFermetureEditAdminComponent,
    CampagneChercheurFermetureAdminComponent,
    EncadrementDoctorantCreateAdminComponent,
    EncadrementDoctorantListAdminComponent,
    EncadrementDoctorantViewAdminComponent,
    EncadrementDoctorantEditAdminComponent,
    EncadrementDoctorantAdminComponent,
    CommunauteSavoirConseilEtComiteScientifiqueCreateAdminComponent,
    CommunauteSavoirConseilEtComiteScientifiqueListAdminComponent,
    CommunauteSavoirConseilEtComiteScientifiqueViewAdminComponent,
    CommunauteSavoirConseilEtComiteScientifiqueEditAdminComponent,
    CommunauteSavoirConseilEtComiteScientifiqueAdminComponent,
    OutilPedagogiqueTypeInstrumentIrdCreateAdminComponent,
    OutilPedagogiqueTypeInstrumentIrdListAdminComponent,
    OutilPedagogiqueTypeInstrumentIrdViewAdminComponent,
    OutilPedagogiqueTypeInstrumentIrdEditAdminComponent,
    OutilPedagogiqueTypeInstrumentIrdAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminComponent,
    RoleComiteEtCommissionEvaluationCreateAdminComponent,
    RoleComiteEtCommissionEvaluationListAdminComponent,
    RoleComiteEtCommissionEvaluationViewAdminComponent,
    RoleComiteEtCommissionEvaluationEditAdminComponent,
    RoleComiteEtCommissionEvaluationAdminComponent,
    ChercheurEmailCreateAdminComponent,
    ChercheurEmailListAdminComponent,
    ChercheurEmailViewAdminComponent,
    ChercheurEmailEditAdminComponent,
    ChercheurEmailAdminComponent,
    EnjeuxIrdChercheurCreateAdminComponent,
    EnjeuxIrdChercheurListAdminComponent,
    EnjeuxIrdChercheurViewAdminComponent,
    EnjeuxIrdChercheurEditAdminComponent,
    EnjeuxIrdChercheurAdminComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdCreateAdminComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdListAdminComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdViewAdminComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdEditAdminComponent,
    ProjetActiviteRechercheDetailEnjeuxIrdAdminComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueListAdminComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
    TypePubliqueRencontreGrandPubliqueJeunePubliqueAdminComponent,
    EnseignementDisciplineScientifiqueCreateAdminComponent,
    EnseignementDisciplineScientifiqueListAdminComponent,
    EnseignementDisciplineScientifiqueViewAdminComponent,
    EnseignementDisciplineScientifiqueEditAdminComponent,
    EnseignementDisciplineScientifiqueAdminComponent,
    CommunauteSavoirChercheurCreateAdminComponent,
    CommunauteSavoirChercheurListAdminComponent,
    CommunauteSavoirChercheurViewAdminComponent,
    CommunauteSavoirChercheurEditAdminComponent,
    CommunauteSavoirChercheurAdminComponent,
    ComiteEtCommissionEvaluationCreateAdminComponent,
    ComiteEtCommissionEvaluationListAdminComponent,
    ComiteEtCommissionEvaluationViewAdminComponent,
    ComiteEtCommissionEvaluationEditAdminComponent,
    ComiteEtCommissionEvaluationAdminComponent,
    EvenementColloqueScienntifiqueCreateAdminComponent,
    EvenementColloqueScienntifiqueListAdminComponent,
    EvenementColloqueScienntifiqueViewAdminComponent,
    EvenementColloqueScienntifiqueEditAdminComponent,
    EvenementColloqueScienntifiqueAdminComponent,
    FormationContinueObjetFormationGeneriqueCreateAdminComponent,
    FormationContinueObjetFormationGeneriqueListAdminComponent,
    FormationContinueObjetFormationGeneriqueViewAdminComponent,
    FormationContinueObjetFormationGeneriqueEditAdminComponent,
    FormationContinueObjetFormationGeneriqueAdminComponent,
    FormationContinueCreateAdminComponent,
    FormationContinueListAdminComponent,
    FormationContinueViewAdminComponent,
    FormationContinueEditAdminComponent,
    FormationContinueAdminComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantCreateAdminComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantListAdminComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantViewAdminComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantEditAdminComponent,
    ProjetActiviteRechercheDetailInstitutionCoContractantAdminComponent,
    ConsultanceScientifiquePonctuelleCreateAdminComponent,
    ConsultanceScientifiquePonctuelleListAdminComponent,
    ConsultanceScientifiquePonctuelleViewAdminComponent,
    ConsultanceScientifiquePonctuelleEditAdminComponent,
    ConsultanceScientifiquePonctuelleAdminComponent,
    ZoneGeographiqueFormationContinueCreateAdminComponent,
    ZoneGeographiqueFormationContinueListAdminComponent,
    ZoneGeographiqueFormationContinueViewAdminComponent,
    ZoneGeographiqueFormationContinueEditAdminComponent,
    ZoneGeographiqueFormationContinueAdminComponent,
    ProjetActiviteRechercheDetailInstrumentIrdCreateAdminComponent,
    ProjetActiviteRechercheDetailInstrumentIrdListAdminComponent,
    ProjetActiviteRechercheDetailInstrumentIrdViewAdminComponent,
    ProjetActiviteRechercheDetailInstrumentIrdEditAdminComponent,
    ProjetActiviteRechercheDetailInstrumentIrdAdminComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdListAdminComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewAdminComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditAdminComponent,
    RencontreGrandPubliqueJeunePubliqueInstrumentIrdAdminComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent,
    TypeInstrumentIrdConsultanceScientifiquePonctuelleAdminComponent,
    NatureActiviteGrandPubliqueCreateAdminComponent,
    NatureActiviteGrandPubliqueListAdminComponent,
    NatureActiviteGrandPubliqueViewAdminComponent,
    NatureActiviteGrandPubliqueEditAdminComponent,
    NatureActiviteGrandPubliqueAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiquePaysAdminComponent,
    RoleDeveloppementDeSavoirCreateAdminComponent,
    RoleDeveloppementDeSavoirListAdminComponent,
    RoleDeveloppementDeSavoirViewAdminComponent,
    RoleDeveloppementDeSavoirEditAdminComponent,
    RoleDeveloppementDeSavoirAdminComponent,
    TypeUtilisateurSavoirConcuCreateAdminComponent,
    TypeUtilisateurSavoirConcuListAdminComponent,
    TypeUtilisateurSavoirConcuViewAdminComponent,
    TypeUtilisateurSavoirConcuEditAdminComponent,
    TypeUtilisateurSavoirConcuAdminComponent,
    EncadrementEtudiantDisciplineScientifiqueCreateAdminComponent,
    EncadrementEtudiantDisciplineScientifiqueListAdminComponent,
    EncadrementEtudiantDisciplineScientifiqueViewAdminComponent,
    EncadrementEtudiantDisciplineScientifiqueEditAdminComponent,
    EncadrementEtudiantDisciplineScientifiqueAdminComponent,
    CommunauteSavoirExpertiseScientifiqueCreateAdminComponent,
    CommunauteSavoirExpertiseScientifiqueListAdminComponent,
    CommunauteSavoirExpertiseScientifiqueViewAdminComponent,
    CommunauteSavoirExpertiseScientifiqueEditAdminComponent,
    CommunauteSavoirExpertiseScientifiqueAdminComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationCreateAdminComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationListAdminComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationViewAdminComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationEditAdminComponent,
    DisciplineScientifiqueComiteEtCommissionEvaluationAdminComponent,
    DistinctionEtablissementPaysCreateAdminComponent,
    DistinctionEtablissementPaysListAdminComponent,
    DistinctionEtablissementPaysViewAdminComponent,
    DistinctionEtablissementPaysEditAdminComponent,
    DistinctionEtablissementPaysAdminComponent,
    InstrumentIrdChercheurCreateAdminComponent,
    InstrumentIrdChercheurListAdminComponent,
    InstrumentIrdChercheurViewAdminComponent,
    InstrumentIrdChercheurEditAdminComponent,
    InstrumentIrdChercheurAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEnjeuxIrdAdminComponent,
    EnseignementEtFormationCreateAdminComponent,
    EnseignementEtFormationListAdminComponent,
    EnseignementEtFormationViewAdminComponent,
    EnseignementEtFormationEditAdminComponent,
    EnseignementEtFormationAdminComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListAdminComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
    PaysOrganisateurRencontreGrandPubliqueJeunePubliqueAdminComponent,
    DisciplineScientifiqueExpertiseScientifiqueCreateAdminComponent,
    DisciplineScientifiqueExpertiseScientifiqueListAdminComponent,
    DisciplineScientifiqueExpertiseScientifiqueViewAdminComponent,
    DisciplineScientifiqueExpertiseScientifiqueEditAdminComponent,
    DisciplineScientifiqueExpertiseScientifiqueAdminComponent,
    OutilPedagogiqueEnjeuxIrdCreateAdminComponent,
    OutilPedagogiqueEnjeuxIrdListAdminComponent,
    OutilPedagogiqueEnjeuxIrdViewAdminComponent,
    OutilPedagogiqueEnjeuxIrdEditAdminComponent,
    OutilPedagogiqueEnjeuxIrdAdminComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListAdminComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewAdminComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditAdminComponent,
    RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueAdminComponent,
    GestionEquipeCreateAdminComponent,
    GestionEquipeListAdminComponent,
    GestionEquipeViewAdminComponent,
    GestionEquipeEditAdminComponent,
    GestionEquipeAdminComponent,
    DistinctionCreateAdminComponent,
    DistinctionListAdminComponent,
    DistinctionViewAdminComponent,
    DistinctionEditAdminComponent,
    DistinctionAdminComponent,
    CampagneRelanceCreateAdminComponent,
    CampagneRelanceListAdminComponent,
    CampagneRelanceViewAdminComponent,
    CampagneRelanceEditAdminComponent,
    CampagneRelanceAdminComponent,
    RencontreMediaEnjeuxIrdCreateAdminComponent,
    RencontreMediaEnjeuxIrdListAdminComponent,
    RencontreMediaEnjeuxIrdViewAdminComponent,
    RencontreMediaEnjeuxIrdEditAdminComponent,
    RencontreMediaEnjeuxIrdAdminComponent,
    ResponsabilitePedagogiquePaysCreateAdminComponent,
    ResponsabilitePedagogiquePaysListAdminComponent,
    ResponsabilitePedagogiquePaysViewAdminComponent,
    ResponsabilitePedagogiquePaysEditAdminComponent,
    ResponsabilitePedagogiquePaysAdminComponent,
    TypePubliqueRencontreMediaCreateAdminComponent,
    TypePubliqueRencontreMediaListAdminComponent,
    TypePubliqueRencontreMediaViewAdminComponent,
    TypePubliqueRencontreMediaEditAdminComponent,
    TypePubliqueRencontreMediaAdminComponent,
    FormationContinueEnjeuxIrdCreateAdminComponent,
    FormationContinueEnjeuxIrdListAdminComponent,
    FormationContinueEnjeuxIrdViewAdminComponent,
    FormationContinueEnjeuxIrdEditAdminComponent,
    FormationContinueEnjeuxIrdAdminComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleCreateAdminComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleListAdminComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleViewAdminComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleEditAdminComponent,
    ZoneGeographiqueConsultanceScientifiquePonctuelleAdminComponent,
    RencontreMediaPeriodeCreateAdminComponent,
    RencontreMediaPeriodeListAdminComponent,
    RencontreMediaPeriodeViewAdminComponent,
    RencontreMediaPeriodeEditAdminComponent,
    RencontreMediaPeriodeAdminComponent,
    PaysRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
    PaysRencontreGrandPubliqueJeunePubliqueListAdminComponent,
    PaysRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
    PaysRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
    PaysRencontreGrandPubliqueJeunePubliqueAdminComponent,
    CommunauteSavoirProjetActiviteRechercheCreateAdminComponent,
    CommunauteSavoirProjetActiviteRechercheListAdminComponent,
    CommunauteSavoirProjetActiviteRechercheViewAdminComponent,
    CommunauteSavoirProjetActiviteRechercheEditAdminComponent,
    CommunauteSavoirProjetActiviteRechercheAdminComponent,
    OutilPedagogiqueLangueCreateAdminComponent,
    OutilPedagogiqueLangueListAdminComponent,
    OutilPedagogiqueLangueViewAdminComponent,
    OutilPedagogiqueLangueEditAdminComponent,
    OutilPedagogiqueLangueAdminComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent,
    InstrumentIrdConsultanceScientifiquePonctuelleAdminComponent,
    ProjetActiviteRechercheCreateAdminComponent,
    ProjetActiviteRechercheListAdminComponent,
    ProjetActiviteRechercheViewAdminComponent,
    ProjetActiviteRechercheEditAdminComponent,
    ProjetActiviteRechercheAdminComponent,
    ResponsabilitePedagogiqueEtablissementCreateAdminComponent,
    ResponsabilitePedagogiqueEtablissementListAdminComponent,
    ResponsabilitePedagogiqueEtablissementViewAdminComponent,
    ResponsabilitePedagogiqueEtablissementEditAdminComponent,
    ResponsabilitePedagogiqueEtablissementAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEtablissementAdminComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateAdminComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueListAdminComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewAdminComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditAdminComponent,
    ObjetFormationGeneriqueDeResponsabilitePedagogiqueAdminComponent,
    TypeInstrumentIrdChercheurCreateAdminComponent,
    TypeInstrumentIrdChercheurListAdminComponent,
    TypeInstrumentIrdChercheurViewAdminComponent,
    TypeInstrumentIrdChercheurEditAdminComponent,
    TypeInstrumentIrdChercheurAdminComponent,
    DisciplineScientifiqueEncadrementDoctorantCreateAdminComponent,
    DisciplineScientifiqueEncadrementDoctorantListAdminComponent,
    DisciplineScientifiqueEncadrementDoctorantViewAdminComponent,
    DisciplineScientifiqueEncadrementDoctorantEditAdminComponent,
    DisciplineScientifiqueEncadrementDoctorantAdminComponent,
    PaysRencontreMediaCreateAdminComponent,
    PaysRencontreMediaListAdminComponent,
    PaysRencontreMediaViewAdminComponent,
    PaysRencontreMediaEditAdminComponent,
    PaysRencontreMediaAdminComponent,
    RencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliqueListAdminComponent,
    RencontreGrandPubliqueJeunePubliqueViewAdminComponent,
    RencontreGrandPubliqueJeunePubliqueEditAdminComponent,
    RencontreGrandPubliqueJeunePubliqueAdminComponent,
    TypeParticipationCreateAdminComponent,
    TypeParticipationListAdminComponent,
    TypeParticipationViewAdminComponent,
    TypeParticipationEditAdminComponent,
    TypeParticipationAdminComponent,
    EvenementColloqueScienntifiquePaysCreateAdminComponent,
    EvenementColloqueScienntifiquePaysListAdminComponent,
    EvenementColloqueScienntifiquePaysViewAdminComponent,
    EvenementColloqueScienntifiquePaysEditAdminComponent,
    EvenementColloqueScienntifiquePaysAdminComponent,
    EtatCampagneCreateAdminComponent,
    EtatCampagneListAdminComponent,
    EtatCampagneViewAdminComponent,
    EtatCampagneEditAdminComponent,
    EtatCampagneAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditAdminComponent,
    DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminComponent,
    StructureOganisatriceCreateAdminComponent,
    StructureOganisatriceListAdminComponent,
    StructureOganisatriceViewAdminComponent,
    StructureOganisatriceEditAdminComponent,
    StructureOganisatriceAdminComponent,
    DisciplineScientifiqueEncadrementEtudiantCreateAdminComponent,
    DisciplineScientifiqueEncadrementEtudiantListAdminComponent,
    DisciplineScientifiqueEncadrementEtudiantViewAdminComponent,
    DisciplineScientifiqueEncadrementEtudiantEditAdminComponent,
    DisciplineScientifiqueEncadrementEtudiantAdminComponent,
    FormationContinueCommanditaireCreateAdminComponent,
    FormationContinueCommanditaireListAdminComponent,
    FormationContinueCommanditaireViewAdminComponent,
    FormationContinueCommanditaireEditAdminComponent,
    FormationContinueCommanditaireAdminComponent,
    AffectationStructurelleCreateAdminComponent,
    AffectationStructurelleListAdminComponent,
    AffectationStructurelleViewAdminComponent,
    AffectationStructurelleEditAdminComponent,
    AffectationStructurelleAdminComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
    CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
    PaysCommanditaireCreateAdminComponent,
    PaysCommanditaireListAdminComponent,
    PaysCommanditaireViewAdminComponent,
    PaysCommanditaireEditAdminComponent,
    PaysCommanditaireAdminComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateAdminComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListAdminComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewAdminComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditAdminComponent,
    RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdAdminComponent,
    FormationContinueDisciplineScientifiqueCreateAdminComponent,
    FormationContinueDisciplineScientifiqueListAdminComponent,
    FormationContinueDisciplineScientifiqueViewAdminComponent,
    FormationContinueDisciplineScientifiqueEditAdminComponent,
    FormationContinueDisciplineScientifiqueAdminComponent,
    EnjeuxIrdEncadrementDoctorantCreateAdminComponent,
    EnjeuxIrdEncadrementDoctorantListAdminComponent,
    EnjeuxIrdEncadrementDoctorantViewAdminComponent,
    EnjeuxIrdEncadrementDoctorantEditAdminComponent,
    EnjeuxIrdEncadrementDoctorantAdminComponent,
    EnseignementNatureCreateAdminComponent,
    EnseignementNatureListAdminComponent,
    EnseignementNatureViewAdminComponent,
    EnseignementNatureEditAdminComponent,
    EnseignementNatureAdminComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
    TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
    NiveauEtudeEnseignementCreateAdminComponent,
    NiveauEtudeEnseignementListAdminComponent,
    NiveauEtudeEnseignementViewAdminComponent,
    NiveauEtudeEnseignementEditAdminComponent,
    NiveauEtudeEnseignementAdminComponent,
    CategorieNotificationCreateAdminComponent,
    CategorieNotificationListAdminComponent,
    CategorieNotificationViewAdminComponent,
    CategorieNotificationEditAdminComponent,
    CategorieNotificationAdminComponent,
    ChercheurCreateAdminComponent,
    ChercheurListAdminComponent,
    ChercheurViewAdminComponent,
    ChercheurEditAdminComponent,
    ChercheurAdminComponent,
    EtablissementConseilsScientifiqueCreateAdminComponent,
    EtablissementConseilsScientifiqueListAdminComponent,
    EtablissementConseilsScientifiqueViewAdminComponent,
    EtablissementConseilsScientifiqueEditAdminComponent,
    EtablissementConseilsScientifiqueAdminComponent,
    CampagneCreateAdminComponent,
    CampagneListAdminComponent,
    CampagneViewAdminComponent,
    CampagneEditAdminComponent,
    CampagneAdminComponent,
    EtatCampagneChercheurCreateAdminComponent,
    EtatCampagneChercheurListAdminComponent,
    EtatCampagneChercheurViewAdminComponent,
    EtatCampagneChercheurEditAdminComponent,
    EtatCampagneChercheurAdminComponent,
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
    ArchivableAdminModule
  ],
  exports: [
  LoginAdminComponent,
  RegisterAdminComponent,
    SwitchChercheurAdminComponent,
  GestionEquipeDetailCreateAdminComponent,
  GestionEquipeDetailListAdminComponent,
  GestionEquipeDetailViewAdminComponent,
  GestionEquipeDetailEditAdminComponent,
  GestionEquipeDetailAdminComponent,
  LangueCreateAdminComponent,
  LangueListAdminComponent,
  LangueViewAdminComponent,
  LangueEditAdminComponent,
  LangueAdminComponent,
  OutilPedagogiquePubliqueCibleCreateAdminComponent,
  OutilPedagogiquePubliqueCibleListAdminComponent,
  OutilPedagogiquePubliqueCibleViewAdminComponent,
  OutilPedagogiquePubliqueCibleEditAdminComponent,
  OutilPedagogiquePubliqueCibleAdminComponent,
  StatusContratEtConventionCreateAdminComponent,
  StatusContratEtConventionListAdminComponent,
  StatusContratEtConventionViewAdminComponent,
  StatusContratEtConventionEditAdminComponent,
  StatusContratEtConventionAdminComponent,
  ResponsabilitePedagogiqueCreateAdminComponent,
  ResponsabilitePedagogiqueListAdminComponent,
  ResponsabilitePedagogiqueViewAdminComponent,
  ResponsabilitePedagogiqueEditAdminComponent,
  ResponsabilitePedagogiqueAdminComponent,
  ConseilEtComiteScientifiqueCreateAdminComponent,
  ConseilEtComiteScientifiqueListAdminComponent,
  ConseilEtComiteScientifiqueViewAdminComponent,
  ConseilEtComiteScientifiqueEditAdminComponent,
  ConseilEtComiteScientifiqueAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirAdminComponent,
  TypeEtudeEnseignementCreateAdminComponent,
  TypeEtudeEnseignementListAdminComponent,
  TypeEtudeEnseignementViewAdminComponent,
  TypeEtudeEnseignementEditAdminComponent,
  TypeEtudeEnseignementAdminComponent,
  SavoirEtInnovationCreateAdminComponent,
  SavoirEtInnovationListAdminComponent,
  SavoirEtInnovationViewAdminComponent,
  SavoirEtInnovationEditAdminComponent,
  SavoirEtInnovationAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
  EnseignementZoneGeographiqueCreateAdminComponent,
  EnseignementZoneGeographiqueListAdminComponent,
  EnseignementZoneGeographiqueViewAdminComponent,
  EnseignementZoneGeographiqueEditAdminComponent,
  EnseignementZoneGeographiqueAdminComponent,
  IdentifiantAuteurExpertCreateAdminComponent,
  IdentifiantAuteurExpertListAdminComponent,
  IdentifiantAuteurExpertViewAdminComponent,
  IdentifiantAuteurExpertEditAdminComponent,
  IdentifiantAuteurExpertAdminComponent,
  CommunauteSavoirEncadrementDoctorantCreateAdminComponent,
  CommunauteSavoirEncadrementDoctorantListAdminComponent,
  CommunauteSavoirEncadrementDoctorantViewAdminComponent,
  CommunauteSavoirEncadrementDoctorantEditAdminComponent,
  CommunauteSavoirEncadrementDoctorantAdminComponent,
  ZoneActiviteInteractionRechercheCreateAdminComponent,
  ZoneActiviteInteractionRechercheListAdminComponent,
  ZoneActiviteInteractionRechercheViewAdminComponent,
  ZoneActiviteInteractionRechercheEditAdminComponent,
  ZoneActiviteInteractionRechercheAdminComponent,
  DisciplineScientifiqueConseilsScientifiqueCreateAdminComponent,
  DisciplineScientifiqueConseilsScientifiqueListAdminComponent,
  DisciplineScientifiqueConseilsScientifiqueViewAdminComponent,
  DisciplineScientifiqueConseilsScientifiqueEditAdminComponent,
  DisciplineScientifiqueConseilsScientifiqueAdminComponent,
  VieInstitutionnelleCreateAdminComponent,
  VieInstitutionnelleListAdminComponent,
  VieInstitutionnelleViewAdminComponent,
  VieInstitutionnelleEditAdminComponent,
  VieInstitutionnelleAdminComponent,
  CommunauteSavoirEncadrementEtudiantCreateAdminComponent,
  CommunauteSavoirEncadrementEtudiantListAdminComponent,
  CommunauteSavoirEncadrementEtudiantViewAdminComponent,
  CommunauteSavoirEncadrementEtudiantEditAdminComponent,
  CommunauteSavoirEncadrementEtudiantAdminComponent,
  ConseilsScientifiqueCreateAdminComponent,
  ConseilsScientifiqueListAdminComponent,
  ConseilsScientifiqueViewAdminComponent,
  ConseilsScientifiqueEditAdminComponent,
  ConseilsScientifiqueAdminComponent,
  InstrumentsEtDispositifsIrdCreateAdminComponent,
  InstrumentsEtDispositifsIrdListAdminComponent,
  InstrumentsEtDispositifsIrdViewAdminComponent,
  InstrumentsEtDispositifsIrdEditAdminComponent,
  InstrumentsEtDispositifsIrdAdminComponent,
  EtatReclamationCreateAdminComponent,
  EtatReclamationListAdminComponent,
  EtatReclamationViewAdminComponent,
  EtatReclamationEditAdminComponent,
  EtatReclamationAdminComponent,
  NotificationCreateAdminComponent,
  NotificationListAdminComponent,
  NotificationViewAdminComponent,
  NotificationEditAdminComponent,
  NotificationAdminComponent,
  VieInstitutionnelleDetailEtablissementCreateAdminComponent,
  VieInstitutionnelleDetailEtablissementListAdminComponent,
  VieInstitutionnelleDetailEtablissementViewAdminComponent,
  VieInstitutionnelleDetailEtablissementEditAdminComponent,
  VieInstitutionnelleDetailEtablissementAdminComponent,
  OutilPedagogiqueInstrumentIrdCreateAdminComponent,
  OutilPedagogiqueInstrumentIrdListAdminComponent,
  OutilPedagogiqueInstrumentIrdViewAdminComponent,
  OutilPedagogiqueInstrumentIrdEditAdminComponent,
  OutilPedagogiqueInstrumentIrdAdminComponent,
  OutilPedagogiqueCreateAdminComponent,
  OutilPedagogiqueListAdminComponent,
  OutilPedagogiqueViewAdminComponent,
  OutilPedagogiqueEditAdminComponent,
  OutilPedagogiqueAdminComponent,
  TypeOutilPedagogiqueCreateAdminComponent,
  TypeOutilPedagogiqueListAdminComponent,
  TypeOutilPedagogiqueViewAdminComponent,
  TypeOutilPedagogiqueEditAdminComponent,
  TypeOutilPedagogiqueAdminComponent,
  DisciplineScientifiqueChercheurCreateAdminComponent,
  DisciplineScientifiqueChercheurListAdminComponent,
  DisciplineScientifiqueChercheurViewAdminComponent,
  DisciplineScientifiqueChercheurEditAdminComponent,
  DisciplineScientifiqueChercheurAdminComponent,
  OutilPedagogiquePaysDiffusionCreateAdminComponent,
  OutilPedagogiquePaysDiffusionListAdminComponent,
  OutilPedagogiquePaysDiffusionViewAdminComponent,
  OutilPedagogiquePaysDiffusionEditAdminComponent,
  OutilPedagogiquePaysDiffusionAdminComponent,
  RencontreMediaDisciplineScientifiqueCreateAdminComponent,
  RencontreMediaDisciplineScientifiqueListAdminComponent,
  RencontreMediaDisciplineScientifiqueViewAdminComponent,
  RencontreMediaDisciplineScientifiqueEditAdminComponent,
  RencontreMediaDisciplineScientifiqueAdminComponent,
  CommunauteSavoirEvenementColloqueScientifiqueCreateAdminComponent,
  CommunauteSavoirEvenementColloqueScientifiqueListAdminComponent,
  CommunauteSavoirEvenementColloqueScientifiqueViewAdminComponent,
  CommunauteSavoirEvenementColloqueScientifiqueEditAdminComponent,
  CommunauteSavoirEvenementColloqueScientifiqueAdminComponent,
  VieInstitutionnelleDetailCreateAdminComponent,
  VieInstitutionnelleDetailListAdminComponent,
  VieInstitutionnelleDetailViewAdminComponent,
  VieInstitutionnelleDetailEditAdminComponent,
  VieInstitutionnelleDetailAdminComponent,
  NiveauResponsabilitePedagogiqueCreateAdminComponent,
  NiveauResponsabilitePedagogiqueListAdminComponent,
  NiveauResponsabilitePedagogiqueViewAdminComponent,
  NiveauResponsabilitePedagogiqueEditAdminComponent,
  NiveauResponsabilitePedagogiqueAdminComponent,
  ZoneGeographiqueConseilsScientifiqueCreateAdminComponent,
  ZoneGeographiqueConseilsScientifiqueListAdminComponent,
  ZoneGeographiqueConseilsScientifiqueViewAdminComponent,
  ZoneGeographiqueConseilsScientifiqueEditAdminComponent,
  ZoneGeographiqueConseilsScientifiqueAdminComponent,
  EtablissementConsultanceScientifiquePonctuelleCreateAdminComponent,
  EtablissementConsultanceScientifiquePonctuelleListAdminComponent,
  EtablissementConsultanceScientifiquePonctuelleViewAdminComponent,
  EtablissementConsultanceScientifiquePonctuelleEditAdminComponent,
  EtablissementConsultanceScientifiquePonctuelleAdminComponent,
  CampagneRelanceChercheurCreateAdminComponent,
  CampagneRelanceChercheurListAdminComponent,
  CampagneRelanceChercheurViewAdminComponent,
  CampagneRelanceChercheurEditAdminComponent,
  CampagneRelanceChercheurAdminComponent,
  ContratEtConventionIrdCreateAdminComponent,
  ContratEtConventionIrdListAdminComponent,
  ContratEtConventionIrdViewAdminComponent,
  ContratEtConventionIrdEditAdminComponent,
  ContratEtConventionIrdAdminComponent,
  ProjetActiviteRechercheDetailPaysCreateAdminComponent,
  ProjetActiviteRechercheDetailPaysListAdminComponent,
  ProjetActiviteRechercheDetailPaysViewAdminComponent,
  ProjetActiviteRechercheDetailPaysEditAdminComponent,
  ProjetActiviteRechercheDetailPaysAdminComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeListAdminComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeViewAdminComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeEditAdminComponent,
  RencontreGrandPubliqueJeunePubliquePeriodeAdminComponent,
  PaysFormationContinueCreateAdminComponent,
  PaysFormationContinueListAdminComponent,
  PaysFormationContinueViewAdminComponent,
  PaysFormationContinueEditAdminComponent,
  PaysFormationContinueAdminComponent,
  VieInstitutionnelleDetailInstrumentIrdCreateAdminComponent,
  VieInstitutionnelleDetailInstrumentIrdListAdminComponent,
  VieInstitutionnelleDetailInstrumentIrdViewAdminComponent,
  VieInstitutionnelleDetailInstrumentIrdEditAdminComponent,
  VieInstitutionnelleDetailInstrumentIrdAdminComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdCreateAdminComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdListAdminComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdViewAdminComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdEditAdminComponent,
  EvenementColloqueScienntifiqueEnjeuxIrdAdminComponent,
  CultureScientifiqueCreateAdminComponent,
  CultureScientifiqueListAdminComponent,
  CultureScientifiqueViewAdminComponent,
  CultureScientifiqueEditAdminComponent,
  CultureScientifiqueAdminComponent,
  EnseignementCreateAdminComponent,
  EnseignementListAdminComponent,
  EnseignementViewAdminComponent,
  EnseignementEditAdminComponent,
  EnseignementAdminComponent,
  PaysZoneGeographiqueCreateAdminComponent,
  PaysZoneGeographiqueListAdminComponent,
  PaysZoneGeographiqueViewAdminComponent,
  PaysZoneGeographiqueEditAdminComponent,
  PaysZoneGeographiqueAdminComponent,
  EncadrementEtudiantCreateAdminComponent,
  EncadrementEtudiantListAdminComponent,
  EncadrementEtudiantViewAdminComponent,
  EncadrementEtudiantEditAdminComponent,
  EncadrementEtudiantAdminComponent,
  EnjeuxIrdComiteEtCommissionEvaluationCreateAdminComponent,
  EnjeuxIrdComiteEtCommissionEvaluationListAdminComponent,
  EnjeuxIrdComiteEtCommissionEvaluationViewAdminComponent,
  EnjeuxIrdComiteEtCommissionEvaluationEditAdminComponent,
  EnjeuxIrdComiteEtCommissionEvaluationAdminComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateAdminComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationListAdminComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationViewAdminComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationEditAdminComponent,
  TypeExpertiseEvaluationComiteEtCommissionEvaluationAdminComponent,
  RencontreMediaCreateAdminComponent,
  RencontreMediaListAdminComponent,
  RencontreMediaViewAdminComponent,
  RencontreMediaEditAdminComponent,
  RencontreMediaAdminComponent,
  ReclamationCreateAdminComponent,
  ReclamationListAdminComponent,
  ReclamationViewAdminComponent,
  ReclamationEditAdminComponent,
  ReclamationAdminComponent,
  EncadrementEtudiantEnjeuxIrdCreateAdminComponent,
  EncadrementEtudiantEnjeuxIrdListAdminComponent,
  EncadrementEtudiantEnjeuxIrdViewAdminComponent,
  EncadrementEtudiantEnjeuxIrdEditAdminComponent,
  EncadrementEtudiantEnjeuxIrdAdminComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurCreateAdminComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurListAdminComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurViewAdminComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurEditAdminComponent,
  ProjetActiviteRechercheDetailEtablissementLanceurAdminComponent,
  CampagneRappelCreateAdminComponent,
  CampagneRappelListAdminComponent,
  CampagneRappelViewAdminComponent,
  CampagneRappelEditAdminComponent,
  CampagneRappelAdminComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueCreateAdminComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueListAdminComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueViewAdminComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueEditAdminComponent,
  DisciplineScientifiqueEvenementColloqueScientifiqueAdminComponent,
  OutilPedagogiqueDisciplineScientifiqueCreateAdminComponent,
  OutilPedagogiqueDisciplineScientifiqueListAdminComponent,
  OutilPedagogiqueDisciplineScientifiqueViewAdminComponent,
  OutilPedagogiqueDisciplineScientifiqueEditAdminComponent,
  OutilPedagogiqueDisciplineScientifiqueAdminComponent,
  CampagneRappelChercheurCreateAdminComponent,
  CampagneRappelChercheurListAdminComponent,
  CampagneRappelChercheurViewAdminComponent,
  CampagneRappelChercheurEditAdminComponent,
  CampagneRappelChercheurAdminComponent,
  EncadrementCreateAdminComponent,
  EncadrementListAdminComponent,
  EncadrementViewAdminComponent,
  EncadrementEditAdminComponent,
  EncadrementAdminComponent,
  EnjeuxIrdConseilsScientifiqueCreateAdminComponent,
  EnjeuxIrdConseilsScientifiqueListAdminComponent,
  EnjeuxIrdConseilsScientifiqueViewAdminComponent,
  EnjeuxIrdConseilsScientifiqueEditAdminComponent,
  EnjeuxIrdConseilsScientifiqueAdminComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleCreateAdminComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleListAdminComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleViewAdminComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleEditAdminComponent,
  DisciplineScientifiqueConsultanceScientifiquePonctuelleAdminComponent,
  FormationContinuePubliqueProfessionelCreateAdminComponent,
  FormationContinuePubliqueProfessionelListAdminComponent,
  FormationContinuePubliqueProfessionelViewAdminComponent,
  FormationContinuePubliqueProfessionelEditAdminComponent,
  FormationContinuePubliqueProfessionelAdminComponent,
  EnseignementEnjeuxIrdCreateAdminComponent,
  EnseignementEnjeuxIrdListAdminComponent,
  EnseignementEnjeuxIrdViewAdminComponent,
  EnseignementEnjeuxIrdEditAdminComponent,
  EnseignementEnjeuxIrdAdminComponent,
  InstrumentIrdComiteEtCommissionEvaluationCreateAdminComponent,
  InstrumentIrdComiteEtCommissionEvaluationListAdminComponent,
  InstrumentIrdComiteEtCommissionEvaluationViewAdminComponent,
  InstrumentIrdComiteEtCommissionEvaluationEditAdminComponent,
  InstrumentIrdComiteEtCommissionEvaluationAdminComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueCreateAdminComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueListAdminComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueViewAdminComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueEditAdminComponent,
  DisciplineScientifiqueConseilEtComiteScientifiqueAdminComponent,
  EtatEtapeCampagneCreateAdminComponent,
  EtatEtapeCampagneListAdminComponent,
  EtatEtapeCampagneViewAdminComponent,
  EtatEtapeCampagneEditAdminComponent,
  EtatEtapeCampagneAdminComponent,
  ProjetActiviteRechercheDetailCreateAdminComponent,
  ProjetActiviteRechercheDetailListAdminComponent,
  ProjetActiviteRechercheDetailViewAdminComponent,
  ProjetActiviteRechercheDetailEditAdminComponent,
  ProjetActiviteRechercheDetailAdminComponent,
  ExpertiseCreateAdminComponent,
  ExpertiseListAdminComponent,
  ExpertiseViewAdminComponent,
  ExpertiseEditAdminComponent,
  ExpertiseAdminComponent,
  TypePubliqueCreateAdminComponent,
  TypePubliqueListAdminComponent,
  TypePubliqueViewAdminComponent,
  TypePubliqueEditAdminComponent,
  TypePubliqueAdminComponent,
  CampagneChercheurOuvertureCreateAdminComponent,
  CampagneChercheurOuvertureListAdminComponent,
  CampagneChercheurOuvertureViewAdminComponent,
  CampagneChercheurOuvertureEditAdminComponent,
  CampagneChercheurOuvertureAdminComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleListAdminComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleViewAdminComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleEditAdminComponent,
  EnjeuxIrdConsultanceScientifiquePonctuelleAdminComponent,
  EtablissementComiteEtCommissionEvaluationCreateAdminComponent,
  EtablissementComiteEtCommissionEvaluationListAdminComponent,
  EtablissementComiteEtCommissionEvaluationViewAdminComponent,
  EtablissementComiteEtCommissionEvaluationEditAdminComponent,
  EtablissementComiteEtCommissionEvaluationAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionAdminComponent,
  ResponsabilitePedagogiqueEnjeuxIrdCreateAdminComponent,
  ResponsabilitePedagogiqueEnjeuxIrdListAdminComponent,
  ResponsabilitePedagogiqueEnjeuxIrdViewAdminComponent,
  ResponsabilitePedagogiqueEnjeuxIrdEditAdminComponent,
  ResponsabilitePedagogiqueEnjeuxIrdAdminComponent,
  FaqCreateAdminComponent,
  FaqListAdminComponent,
  FaqViewAdminComponent,
  FaqEditAdminComponent,
  FaqAdminComponent,
  ExpertiseScientifiqueCreateAdminComponent,
  ExpertiseScientifiqueListAdminComponent,
  ExpertiseScientifiqueViewAdminComponent,
  ExpertiseScientifiqueEditAdminComponent,
  ExpertiseScientifiqueAdminComponent,
  EtablissementEnseignementCreateAdminComponent,
  EtablissementEnseignementListAdminComponent,
  EtablissementEnseignementViewAdminComponent,
  EtablissementEnseignementEditAdminComponent,
  EtablissementEnseignementAdminComponent,
  OutilPedagogiquePaysConceptionCreateAdminComponent,
  OutilPedagogiquePaysConceptionListAdminComponent,
  OutilPedagogiquePaysConceptionViewAdminComponent,
  OutilPedagogiquePaysConceptionEditAdminComponent,
  OutilPedagogiquePaysConceptionAdminComponent,
  CampagneChercheurFermetureCreateAdminComponent,
  CampagneChercheurFermetureListAdminComponent,
  CampagneChercheurFermetureViewAdminComponent,
  CampagneChercheurFermetureEditAdminComponent,
  CampagneChercheurFermetureAdminComponent,
  EncadrementDoctorantCreateAdminComponent,
  EncadrementDoctorantListAdminComponent,
  EncadrementDoctorantViewAdminComponent,
  EncadrementDoctorantEditAdminComponent,
  EncadrementDoctorantAdminComponent,
  CommunauteSavoirConseilEtComiteScientifiqueCreateAdminComponent,
  CommunauteSavoirConseilEtComiteScientifiqueListAdminComponent,
  CommunauteSavoirConseilEtComiteScientifiqueViewAdminComponent,
  CommunauteSavoirConseilEtComiteScientifiqueEditAdminComponent,
  CommunauteSavoirConseilEtComiteScientifiqueAdminComponent,
  OutilPedagogiqueTypeInstrumentIrdCreateAdminComponent,
  OutilPedagogiqueTypeInstrumentIrdListAdminComponent,
  OutilPedagogiqueTypeInstrumentIrdViewAdminComponent,
  OutilPedagogiqueTypeInstrumentIrdEditAdminComponent,
  OutilPedagogiqueTypeInstrumentIrdAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueAdminComponent,
  RoleComiteEtCommissionEvaluationCreateAdminComponent,
  RoleComiteEtCommissionEvaluationListAdminComponent,
  RoleComiteEtCommissionEvaluationViewAdminComponent,
  RoleComiteEtCommissionEvaluationEditAdminComponent,
  RoleComiteEtCommissionEvaluationAdminComponent,
  ChercheurEmailCreateAdminComponent,
  ChercheurEmailListAdminComponent,
  ChercheurEmailViewAdminComponent,
  ChercheurEmailEditAdminComponent,
  ChercheurEmailAdminComponent,
  EnjeuxIrdChercheurCreateAdminComponent,
  EnjeuxIrdChercheurListAdminComponent,
  EnjeuxIrdChercheurViewAdminComponent,
  EnjeuxIrdChercheurEditAdminComponent,
  EnjeuxIrdChercheurAdminComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdCreateAdminComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdListAdminComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdViewAdminComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdEditAdminComponent,
  ProjetActiviteRechercheDetailEnjeuxIrdAdminComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueListAdminComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
  TypePubliqueRencontreGrandPubliqueJeunePubliqueAdminComponent,
  EnseignementDisciplineScientifiqueCreateAdminComponent,
  EnseignementDisciplineScientifiqueListAdminComponent,
  EnseignementDisciplineScientifiqueViewAdminComponent,
  EnseignementDisciplineScientifiqueEditAdminComponent,
  EnseignementDisciplineScientifiqueAdminComponent,
  CommunauteSavoirChercheurCreateAdminComponent,
  CommunauteSavoirChercheurListAdminComponent,
  CommunauteSavoirChercheurViewAdminComponent,
  CommunauteSavoirChercheurEditAdminComponent,
  CommunauteSavoirChercheurAdminComponent,
  ComiteEtCommissionEvaluationCreateAdminComponent,
  ComiteEtCommissionEvaluationListAdminComponent,
  ComiteEtCommissionEvaluationViewAdminComponent,
  ComiteEtCommissionEvaluationEditAdminComponent,
  ComiteEtCommissionEvaluationAdminComponent,
  EvenementColloqueScienntifiqueCreateAdminComponent,
  EvenementColloqueScienntifiqueListAdminComponent,
  EvenementColloqueScienntifiqueViewAdminComponent,
  EvenementColloqueScienntifiqueEditAdminComponent,
  EvenementColloqueScienntifiqueAdminComponent,
  FormationContinueObjetFormationGeneriqueCreateAdminComponent,
  FormationContinueObjetFormationGeneriqueListAdminComponent,
  FormationContinueObjetFormationGeneriqueViewAdminComponent,
  FormationContinueObjetFormationGeneriqueEditAdminComponent,
  FormationContinueObjetFormationGeneriqueAdminComponent,
  FormationContinueCreateAdminComponent,
  FormationContinueListAdminComponent,
  FormationContinueViewAdminComponent,
  FormationContinueEditAdminComponent,
  FormationContinueAdminComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantCreateAdminComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantListAdminComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantViewAdminComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantEditAdminComponent,
  ProjetActiviteRechercheDetailInstitutionCoContractantAdminComponent,
  ConsultanceScientifiquePonctuelleCreateAdminComponent,
  ConsultanceScientifiquePonctuelleListAdminComponent,
  ConsultanceScientifiquePonctuelleViewAdminComponent,
  ConsultanceScientifiquePonctuelleEditAdminComponent,
  ConsultanceScientifiquePonctuelleAdminComponent,
  ZoneGeographiqueFormationContinueCreateAdminComponent,
  ZoneGeographiqueFormationContinueListAdminComponent,
  ZoneGeographiqueFormationContinueViewAdminComponent,
  ZoneGeographiqueFormationContinueEditAdminComponent,
  ZoneGeographiqueFormationContinueAdminComponent,
  ProjetActiviteRechercheDetailInstrumentIrdCreateAdminComponent,
  ProjetActiviteRechercheDetailInstrumentIrdListAdminComponent,
  ProjetActiviteRechercheDetailInstrumentIrdViewAdminComponent,
  ProjetActiviteRechercheDetailInstrumentIrdEditAdminComponent,
  ProjetActiviteRechercheDetailInstrumentIrdAdminComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdListAdminComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewAdminComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditAdminComponent,
  RencontreGrandPubliqueJeunePubliqueInstrumentIrdAdminComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent,
  TypeInstrumentIrdConsultanceScientifiquePonctuelleAdminComponent,
  NatureActiviteGrandPubliqueCreateAdminComponent,
  NatureActiviteGrandPubliqueListAdminComponent,
  NatureActiviteGrandPubliqueViewAdminComponent,
  NatureActiviteGrandPubliqueEditAdminComponent,
  NatureActiviteGrandPubliqueAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiquePaysAdminComponent,
  RoleDeveloppementDeSavoirCreateAdminComponent,
  RoleDeveloppementDeSavoirListAdminComponent,
  RoleDeveloppementDeSavoirViewAdminComponent,
  RoleDeveloppementDeSavoirEditAdminComponent,
  RoleDeveloppementDeSavoirAdminComponent,
  TypeUtilisateurSavoirConcuCreateAdminComponent,
  TypeUtilisateurSavoirConcuListAdminComponent,
  TypeUtilisateurSavoirConcuViewAdminComponent,
  TypeUtilisateurSavoirConcuEditAdminComponent,
  TypeUtilisateurSavoirConcuAdminComponent,
  EncadrementEtudiantDisciplineScientifiqueCreateAdminComponent,
  EncadrementEtudiantDisciplineScientifiqueListAdminComponent,
  EncadrementEtudiantDisciplineScientifiqueViewAdminComponent,
  EncadrementEtudiantDisciplineScientifiqueEditAdminComponent,
  EncadrementEtudiantDisciplineScientifiqueAdminComponent,
  CommunauteSavoirExpertiseScientifiqueCreateAdminComponent,
  CommunauteSavoirExpertiseScientifiqueListAdminComponent,
  CommunauteSavoirExpertiseScientifiqueViewAdminComponent,
  CommunauteSavoirExpertiseScientifiqueEditAdminComponent,
  CommunauteSavoirExpertiseScientifiqueAdminComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationCreateAdminComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationListAdminComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationViewAdminComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationEditAdminComponent,
  DisciplineScientifiqueComiteEtCommissionEvaluationAdminComponent,
  DistinctionEtablissementPaysCreateAdminComponent,
  DistinctionEtablissementPaysListAdminComponent,
  DistinctionEtablissementPaysViewAdminComponent,
  DistinctionEtablissementPaysEditAdminComponent,
  DistinctionEtablissementPaysAdminComponent,
  InstrumentIrdChercheurCreateAdminComponent,
  InstrumentIrdChercheurListAdminComponent,
  InstrumentIrdChercheurViewAdminComponent,
  InstrumentIrdChercheurEditAdminComponent,
  InstrumentIrdChercheurAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdListAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdViewAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEnjeuxIrdAdminComponent,
  EnseignementEtFormationCreateAdminComponent,
  EnseignementEtFormationListAdminComponent,
  EnseignementEtFormationViewAdminComponent,
  EnseignementEtFormationEditAdminComponent,
  EnseignementEtFormationAdminComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueListAdminComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
  PaysOrganisateurRencontreGrandPubliqueJeunePubliqueAdminComponent,
  DisciplineScientifiqueExpertiseScientifiqueCreateAdminComponent,
  DisciplineScientifiqueExpertiseScientifiqueListAdminComponent,
  DisciplineScientifiqueExpertiseScientifiqueViewAdminComponent,
  DisciplineScientifiqueExpertiseScientifiqueEditAdminComponent,
  DisciplineScientifiqueExpertiseScientifiqueAdminComponent,
  OutilPedagogiqueEnjeuxIrdCreateAdminComponent,
  OutilPedagogiqueEnjeuxIrdListAdminComponent,
  OutilPedagogiqueEnjeuxIrdViewAdminComponent,
  OutilPedagogiqueEnjeuxIrdEditAdminComponent,
  OutilPedagogiqueEnjeuxIrdAdminComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueListAdminComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewAdminComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditAdminComponent,
  RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueAdminComponent,
  GestionEquipeCreateAdminComponent,
  GestionEquipeListAdminComponent,
  GestionEquipeViewAdminComponent,
  GestionEquipeEditAdminComponent,
  GestionEquipeAdminComponent,
  DistinctionCreateAdminComponent,
  DistinctionListAdminComponent,
  DistinctionViewAdminComponent,
  DistinctionEditAdminComponent,
  DistinctionAdminComponent,
  CampagneRelanceCreateAdminComponent,
  CampagneRelanceListAdminComponent,
  CampagneRelanceViewAdminComponent,
  CampagneRelanceEditAdminComponent,
  CampagneRelanceAdminComponent,
  RencontreMediaEnjeuxIrdCreateAdminComponent,
  RencontreMediaEnjeuxIrdListAdminComponent,
  RencontreMediaEnjeuxIrdViewAdminComponent,
  RencontreMediaEnjeuxIrdEditAdminComponent,
  RencontreMediaEnjeuxIrdAdminComponent,
  ResponsabilitePedagogiquePaysCreateAdminComponent,
  ResponsabilitePedagogiquePaysListAdminComponent,
  ResponsabilitePedagogiquePaysViewAdminComponent,
  ResponsabilitePedagogiquePaysEditAdminComponent,
  ResponsabilitePedagogiquePaysAdminComponent,
  TypePubliqueRencontreMediaCreateAdminComponent,
  TypePubliqueRencontreMediaListAdminComponent,
  TypePubliqueRencontreMediaViewAdminComponent,
  TypePubliqueRencontreMediaEditAdminComponent,
  TypePubliqueRencontreMediaAdminComponent,
  FormationContinueEnjeuxIrdCreateAdminComponent,
  FormationContinueEnjeuxIrdListAdminComponent,
  FormationContinueEnjeuxIrdViewAdminComponent,
  FormationContinueEnjeuxIrdEditAdminComponent,
  FormationContinueEnjeuxIrdAdminComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleCreateAdminComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleListAdminComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleViewAdminComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleEditAdminComponent,
  ZoneGeographiqueConsultanceScientifiquePonctuelleAdminComponent,
  RencontreMediaPeriodeCreateAdminComponent,
  RencontreMediaPeriodeListAdminComponent,
  RencontreMediaPeriodeViewAdminComponent,
  RencontreMediaPeriodeEditAdminComponent,
  RencontreMediaPeriodeAdminComponent,
  PaysRencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
  PaysRencontreGrandPubliqueJeunePubliqueListAdminComponent,
  PaysRencontreGrandPubliqueJeunePubliqueViewAdminComponent,
  PaysRencontreGrandPubliqueJeunePubliqueEditAdminComponent,
  PaysRencontreGrandPubliqueJeunePubliqueAdminComponent,
  CommunauteSavoirProjetActiviteRechercheCreateAdminComponent,
  CommunauteSavoirProjetActiviteRechercheListAdminComponent,
  CommunauteSavoirProjetActiviteRechercheViewAdminComponent,
  CommunauteSavoirProjetActiviteRechercheEditAdminComponent,
  CommunauteSavoirProjetActiviteRechercheAdminComponent,
  OutilPedagogiqueLangueCreateAdminComponent,
  OutilPedagogiqueLangueListAdminComponent,
  OutilPedagogiqueLangueViewAdminComponent,
  OutilPedagogiqueLangueEditAdminComponent,
  OutilPedagogiqueLangueAdminComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleCreateAdminComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleListAdminComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent,
  InstrumentIrdConsultanceScientifiquePonctuelleAdminComponent,
  ProjetActiviteRechercheCreateAdminComponent,
  ProjetActiviteRechercheListAdminComponent,
  ProjetActiviteRechercheViewAdminComponent,
  ProjetActiviteRechercheEditAdminComponent,
  ProjetActiviteRechercheAdminComponent,
  ResponsabilitePedagogiqueEtablissementCreateAdminComponent,
  ResponsabilitePedagogiqueEtablissementListAdminComponent,
  ResponsabilitePedagogiqueEtablissementViewAdminComponent,
  ResponsabilitePedagogiqueEtablissementEditAdminComponent,
  ResponsabilitePedagogiqueEtablissementAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEtablissementAdminComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueCreateAdminComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueListAdminComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewAdminComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueEditAdminComponent,
  ObjetFormationGeneriqueDeResponsabilitePedagogiqueAdminComponent,
  TypeInstrumentIrdChercheurCreateAdminComponent,
  TypeInstrumentIrdChercheurListAdminComponent,
  TypeInstrumentIrdChercheurViewAdminComponent,
  TypeInstrumentIrdChercheurEditAdminComponent,
  TypeInstrumentIrdChercheurAdminComponent,
  DisciplineScientifiqueEncadrementDoctorantCreateAdminComponent,
  DisciplineScientifiqueEncadrementDoctorantListAdminComponent,
  DisciplineScientifiqueEncadrementDoctorantViewAdminComponent,
  DisciplineScientifiqueEncadrementDoctorantEditAdminComponent,
  DisciplineScientifiqueEncadrementDoctorantAdminComponent,
  PaysRencontreMediaCreateAdminComponent,
  PaysRencontreMediaListAdminComponent,
  PaysRencontreMediaViewAdminComponent,
  PaysRencontreMediaEditAdminComponent,
  PaysRencontreMediaAdminComponent,
  RencontreGrandPubliqueJeunePubliqueCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliqueListAdminComponent,
  RencontreGrandPubliqueJeunePubliqueViewAdminComponent,
  RencontreGrandPubliqueJeunePubliqueEditAdminComponent,
  RencontreGrandPubliqueJeunePubliqueAdminComponent,
  TypeParticipationCreateAdminComponent,
  TypeParticipationListAdminComponent,
  TypeParticipationViewAdminComponent,
  TypeParticipationEditAdminComponent,
  TypeParticipationAdminComponent,
  EvenementColloqueScienntifiquePaysCreateAdminComponent,
  EvenementColloqueScienntifiquePaysListAdminComponent,
  EvenementColloqueScienntifiquePaysViewAdminComponent,
  EvenementColloqueScienntifiquePaysEditAdminComponent,
  EvenementColloqueScienntifiquePaysAdminComponent,
  EtatCampagneCreateAdminComponent,
  EtatCampagneListAdminComponent,
  EtatCampagneViewAdminComponent,
  EtatCampagneEditAdminComponent,
  EtatCampagneAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdCreateAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdListAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditAdminComponent,
  DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdAdminComponent,
  StructureOganisatriceCreateAdminComponent,
  StructureOganisatriceListAdminComponent,
  StructureOganisatriceViewAdminComponent,
  StructureOganisatriceEditAdminComponent,
  StructureOganisatriceAdminComponent,
  DisciplineScientifiqueEncadrementEtudiantCreateAdminComponent,
  DisciplineScientifiqueEncadrementEtudiantListAdminComponent,
  DisciplineScientifiqueEncadrementEtudiantViewAdminComponent,
  DisciplineScientifiqueEncadrementEtudiantEditAdminComponent,
  DisciplineScientifiqueEncadrementEtudiantAdminComponent,
  FormationContinueCommanditaireCreateAdminComponent,
  FormationContinueCommanditaireListAdminComponent,
  FormationContinueCommanditaireViewAdminComponent,
  FormationContinueCommanditaireEditAdminComponent,
  FormationContinueCommanditaireAdminComponent,
  AffectationStructurelleCreateAdminComponent,
  AffectationStructurelleListAdminComponent,
  AffectationStructurelleViewAdminComponent,
  AffectationStructurelleEditAdminComponent,
  AffectationStructurelleAdminComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
  CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
  PaysCommanditaireCreateAdminComponent,
  PaysCommanditaireListAdminComponent,
  PaysCommanditaireViewAdminComponent,
  PaysCommanditaireEditAdminComponent,
  PaysCommanditaireAdminComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdCreateAdminComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdListAdminComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdViewAdminComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditAdminComponent,
  RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdAdminComponent,
  FormationContinueDisciplineScientifiqueCreateAdminComponent,
  FormationContinueDisciplineScientifiqueListAdminComponent,
  FormationContinueDisciplineScientifiqueViewAdminComponent,
  FormationContinueDisciplineScientifiqueEditAdminComponent,
  FormationContinueDisciplineScientifiqueAdminComponent,
  EnjeuxIrdEncadrementDoctorantCreateAdminComponent,
  EnjeuxIrdEncadrementDoctorantListAdminComponent,
  EnjeuxIrdEncadrementDoctorantViewAdminComponent,
  EnjeuxIrdEncadrementDoctorantEditAdminComponent,
  EnjeuxIrdEncadrementDoctorantAdminComponent,
  EnseignementNatureCreateAdminComponent,
  EnseignementNatureListAdminComponent,
  EnseignementNatureViewAdminComponent,
  EnseignementNatureEditAdminComponent,
  EnseignementNatureAdminComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueCreateAdminComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueListAdminComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent,
  TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueAdminComponent,
  NiveauEtudeEnseignementCreateAdminComponent,
  NiveauEtudeEnseignementListAdminComponent,
  NiveauEtudeEnseignementViewAdminComponent,
  NiveauEtudeEnseignementEditAdminComponent,
  NiveauEtudeEnseignementAdminComponent,
  CategorieNotificationCreateAdminComponent,
  CategorieNotificationListAdminComponent,
  CategorieNotificationViewAdminComponent,
  CategorieNotificationEditAdminComponent,
  CategorieNotificationAdminComponent,
  ChercheurCreateAdminComponent,
  ChercheurListAdminComponent,
  ChercheurViewAdminComponent,
  ChercheurEditAdminComponent,
  ChercheurAdminComponent,
  EtablissementConseilsScientifiqueCreateAdminComponent,
  EtablissementConseilsScientifiqueListAdminComponent,
  EtablissementConseilsScientifiqueViewAdminComponent,
  EtablissementConseilsScientifiqueEditAdminComponent,
  EtablissementConseilsScientifiqueAdminComponent,
  CampagneCreateAdminComponent,
  CampagneListAdminComponent,
  CampagneViewAdminComponent,
  CampagneEditAdminComponent,
  CampagneAdminComponent,
  EtatCampagneChercheurCreateAdminComponent,
  EtatCampagneChercheurListAdminComponent,
  EtatCampagneChercheurViewAdminComponent,
  EtatCampagneChercheurEditAdminComponent,
  EtatCampagneChercheurAdminComponent,
  ],
  entryComponents: [],
})
export class AdminModule { }
