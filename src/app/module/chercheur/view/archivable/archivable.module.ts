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

import { CaracterisationCreateChercheurComponent } from './view/caracterisation-chercheur/create-chercheur/caracterisation-create-chercheur.component';
import { CaracterisationEditChercheurComponent } from './view/caracterisation-chercheur/edit-chercheur/caracterisation-edit-chercheur.component';
import { CaracterisationViewChercheurComponent } from './view/caracterisation-chercheur/view-chercheur/caracterisation-view-chercheur.component';
import { CaracterisationListChercheurComponent } from './view/caracterisation-chercheur/list-chercheur/caracterisation-list-chercheur.component';
import { CaracterisationChercheurComponent } from './view/caracterisation-chercheur/caracterisation-chercheur.component';

import { DepartementScientifiqueCreateChercheurComponent } from './view/departement-scientifique-chercheur/create-chercheur/departement-scientifique-create-chercheur.component';
import { DepartementScientifiqueEditChercheurComponent } from './view/departement-scientifique-chercheur/edit-chercheur/departement-scientifique-edit-chercheur.component';
import { DepartementScientifiqueViewChercheurComponent } from './view/departement-scientifique-chercheur/view-chercheur/departement-scientifique-view-chercheur.component';
import { DepartementScientifiqueListChercheurComponent } from './view/departement-scientifique-chercheur/list-chercheur/departement-scientifique-list-chercheur.component';
import { DepartementScientifiqueChercheurComponent } from './view/departement-scientifique-chercheur/departement-scientifique-chercheur.component';

import { StructureIrdCreateChercheurComponent } from './view/structure-ird-chercheur/create-chercheur/structure-ird-create-chercheur.component';
import { StructureIrdEditChercheurComponent } from './view/structure-ird-chercheur/edit-chercheur/structure-ird-edit-chercheur.component';
import { StructureIrdViewChercheurComponent } from './view/structure-ird-chercheur/view-chercheur/structure-ird-view-chercheur.component';
import { StructureIrdListChercheurComponent } from './view/structure-ird-chercheur/list-chercheur/structure-ird-list-chercheur.component';
import { StructureIrdChercheurComponent } from './view/structure-ird-chercheur/structure-ird-chercheur.component';

import { DisciplineScientifiqueErcAssociationCreateChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/create-chercheur/discipline-scientifique-erc-association-create-chercheur.component';
import { DisciplineScientifiqueErcAssociationEditChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/edit-chercheur/discipline-scientifique-erc-association-edit-chercheur.component';
import { DisciplineScientifiqueErcAssociationViewChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/view-chercheur/discipline-scientifique-erc-association-view-chercheur.component';
import { DisciplineScientifiqueErcAssociationListChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/list-chercheur/discipline-scientifique-erc-association-list-chercheur.component';
import { DisciplineScientifiqueErcAssociationChercheurComponent } from './view/discipline-scientifique-erc-association-chercheur/discipline-scientifique-erc-association-chercheur.component';

import { TypeOutilCreateChercheurComponent } from './view/type-outil-chercheur/create-chercheur/type-outil-create-chercheur.component';
import { TypeOutilEditChercheurComponent } from './view/type-outil-chercheur/edit-chercheur/type-outil-edit-chercheur.component';
import { TypeOutilViewChercheurComponent } from './view/type-outil-chercheur/view-chercheur/type-outil-view-chercheur.component';
import { TypeOutilListChercheurComponent } from './view/type-outil-chercheur/list-chercheur/type-outil-list-chercheur.component';
import { TypeOutilChercheurComponent } from './view/type-outil-chercheur/type-outil-chercheur.component';

import { TemplateOuvertureCreateChercheurComponent } from './view/template-ouverture-chercheur/create-chercheur/template-ouverture-create-chercheur.component';
import { TemplateOuvertureEditChercheurComponent } from './view/template-ouverture-chercheur/edit-chercheur/template-ouverture-edit-chercheur.component';
import { TemplateOuvertureViewChercheurComponent } from './view/template-ouverture-chercheur/view-chercheur/template-ouverture-view-chercheur.component';
import { TemplateOuvertureListChercheurComponent } from './view/template-ouverture-chercheur/list-chercheur/template-ouverture-list-chercheur.component';
import { TemplateOuvertureChercheurComponent } from './view/template-ouverture-chercheur/template-ouverture-chercheur.component';

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

import { PubliqueCibleCreateChercheurComponent } from './view/publique-cible-chercheur/create-chercheur/publique-cible-create-chercheur.component';
import { PubliqueCibleEditChercheurComponent } from './view/publique-cible-chercheur/edit-chercheur/publique-cible-edit-chercheur.component';
import { PubliqueCibleViewChercheurComponent } from './view/publique-cible-chercheur/view-chercheur/publique-cible-view-chercheur.component';
import { PubliqueCibleListChercheurComponent } from './view/publique-cible-chercheur/list-chercheur/publique-cible-list-chercheur.component';
import { PubliqueCibleChercheurComponent } from './view/publique-cible-chercheur/publique-cible-chercheur.component';

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

import { PubliqueProfessionelCreateChercheurComponent } from './view/publique-professionel-chercheur/create-chercheur/publique-professionel-create-chercheur.component';
import { PubliqueProfessionelEditChercheurComponent } from './view/publique-professionel-chercheur/edit-chercheur/publique-professionel-edit-chercheur.component';
import { PubliqueProfessionelViewChercheurComponent } from './view/publique-professionel-chercheur/view-chercheur/publique-professionel-view-chercheur.component';
import { PubliqueProfessionelListChercheurComponent } from './view/publique-professionel-chercheur/list-chercheur/publique-professionel-list-chercheur.component';
import { PubliqueProfessionelChercheurComponent } from './view/publique-professionel-chercheur/publique-professionel-chercheur.component';

import { TypeEnseignementCreateChercheurComponent } from './view/type-enseignement-chercheur/create-chercheur/type-enseignement-create-chercheur.component';
import { TypeEnseignementEditChercheurComponent } from './view/type-enseignement-chercheur/edit-chercheur/type-enseignement-edit-chercheur.component';
import { TypeEnseignementViewChercheurComponent } from './view/type-enseignement-chercheur/view-chercheur/type-enseignement-view-chercheur.component';
import { TypeEnseignementListChercheurComponent } from './view/type-enseignement-chercheur/list-chercheur/type-enseignement-list-chercheur.component';
import { TypeEnseignementChercheurComponent } from './view/type-enseignement-chercheur/type-enseignement-chercheur.component';

import { NationaliteCreateChercheurComponent } from './view/nationalite-chercheur/create-chercheur/nationalite-create-chercheur.component';
import { NationaliteEditChercheurComponent } from './view/nationalite-chercheur/edit-chercheur/nationalite-edit-chercheur.component';
import { NationaliteViewChercheurComponent } from './view/nationalite-chercheur/view-chercheur/nationalite-view-chercheur.component';
import { NationaliteListChercheurComponent } from './view/nationalite-chercheur/list-chercheur/nationalite-list-chercheur.component';
import { NationaliteChercheurComponent } from './view/nationalite-chercheur/nationalite-chercheur.component';

import { EnjeuxIrdCreateChercheurComponent } from './view/enjeux-ird-chercheur/create-chercheur/enjeux-ird-create-chercheur.component';
import { EnjeuxIrdEditChercheurComponent } from './view/enjeux-ird-chercheur/edit-chercheur/enjeux-ird-edit-chercheur.component';
import { EnjeuxIrdViewChercheurComponent } from './view/enjeux-ird-chercheur/view-chercheur/enjeux-ird-view-chercheur.component';
import { EnjeuxIrdListChercheurComponent } from './view/enjeux-ird-chercheur/list-chercheur/enjeux-ird-list-chercheur.component';
import { EnjeuxIrdChercheurComponent } from './view/enjeux-ird-chercheur/enjeux-ird-chercheur.component';

import { TypeExpertCreateChercheurComponent } from './view/type-expert-chercheur/create-chercheur/type-expert-create-chercheur.component';
import { TypeExpertEditChercheurComponent } from './view/type-expert-chercheur/edit-chercheur/type-expert-edit-chercheur.component';
import { TypeExpertViewChercheurComponent } from './view/type-expert-chercheur/view-chercheur/type-expert-view-chercheur.component';
import { TypeExpertListChercheurComponent } from './view/type-expert-chercheur/list-chercheur/type-expert-list-chercheur.component';
import { TypeExpertChercheurComponent } from './view/type-expert-chercheur/type-expert-chercheur.component';

import { KeyWordCreateChercheurComponent } from './view/key-word-chercheur/create-chercheur/key-word-create-chercheur.component';
import { KeyWordEditChercheurComponent } from './view/key-word-chercheur/edit-chercheur/key-word-edit-chercheur.component';
import { KeyWordViewChercheurComponent } from './view/key-word-chercheur/view-chercheur/key-word-view-chercheur.component';
import { KeyWordListChercheurComponent } from './view/key-word-chercheur/list-chercheur/key-word-list-chercheur.component';
import { KeyWordChercheurComponent } from './view/key-word-chercheur/key-word-chercheur.component';

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

import { CommanditaireCreateChercheurComponent } from './view/commanditaire-chercheur/create-chercheur/commanditaire-create-chercheur.component';
import { CommanditaireEditChercheurComponent } from './view/commanditaire-chercheur/edit-chercheur/commanditaire-edit-chercheur.component';
import { CommanditaireViewChercheurComponent } from './view/commanditaire-chercheur/view-chercheur/commanditaire-view-chercheur.component';
import { CommanditaireListChercheurComponent } from './view/commanditaire-chercheur/list-chercheur/commanditaire-list-chercheur.component';
import { CommanditaireChercheurComponent } from './view/commanditaire-chercheur/commanditaire-chercheur.component';

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

import { TemplateRelanceCreateChercheurComponent } from './view/template-relance-chercheur/create-chercheur/template-relance-create-chercheur.component';
import { TemplateRelanceEditChercheurComponent } from './view/template-relance-chercheur/edit-chercheur/template-relance-edit-chercheur.component';
import { TemplateRelanceViewChercheurComponent } from './view/template-relance-chercheur/view-chercheur/template-relance-view-chercheur.component';
import { TemplateRelanceListChercheurComponent } from './view/template-relance-chercheur/list-chercheur/template-relance-list-chercheur.component';
import { TemplateRelanceChercheurComponent } from './view/template-relance-chercheur/template-relance-chercheur.component';

import { TypeSavoirCreateChercheurComponent } from './view/type-savoir-chercheur/create-chercheur/type-savoir-create-chercheur.component';
import { TypeSavoirEditChercheurComponent } from './view/type-savoir-chercheur/edit-chercheur/type-savoir-edit-chercheur.component';
import { TypeSavoirViewChercheurComponent } from './view/type-savoir-chercheur/view-chercheur/type-savoir-view-chercheur.component';
import { TypeSavoirListChercheurComponent } from './view/type-savoir-chercheur/list-chercheur/type-savoir-list-chercheur.component';
import { TypeSavoirChercheurComponent } from './view/type-savoir-chercheur/type-savoir-chercheur.component';

import { ModeDiffusionCreateChercheurComponent } from './view/mode-diffusion-chercheur/create-chercheur/mode-diffusion-create-chercheur.component';
import { ModeDiffusionEditChercheurComponent } from './view/mode-diffusion-chercheur/edit-chercheur/mode-diffusion-edit-chercheur.component';
import { ModeDiffusionViewChercheurComponent } from './view/mode-diffusion-chercheur/view-chercheur/mode-diffusion-view-chercheur.component';
import { ModeDiffusionListChercheurComponent } from './view/mode-diffusion-chercheur/list-chercheur/mode-diffusion-list-chercheur.component';
import { ModeDiffusionChercheurComponent } from './view/mode-diffusion-chercheur/mode-diffusion-chercheur.component';

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

import { NatureEtudeCreateChercheurComponent } from './view/nature-etude-chercheur/create-chercheur/nature-etude-create-chercheur.component';
import { NatureEtudeEditChercheurComponent } from './view/nature-etude-chercheur/edit-chercheur/nature-etude-edit-chercheur.component';
import { NatureEtudeViewChercheurComponent } from './view/nature-etude-chercheur/view-chercheur/nature-etude-view-chercheur.component';
import { NatureEtudeListChercheurComponent } from './view/nature-etude-chercheur/list-chercheur/nature-etude-list-chercheur.component';
import { NatureEtudeChercheurComponent } from './view/nature-etude-chercheur/nature-etude-chercheur.component';

import { InstitutionCreateChercheurComponent } from './view/institution-chercheur/create-chercheur/institution-create-chercheur.component';
import { InstitutionEditChercheurComponent } from './view/institution-chercheur/edit-chercheur/institution-edit-chercheur.component';
import { InstitutionViewChercheurComponent } from './view/institution-chercheur/view-chercheur/institution-view-chercheur.component';
import { InstitutionListChercheurComponent } from './view/institution-chercheur/list-chercheur/institution-list-chercheur.component';
import { InstitutionChercheurComponent } from './view/institution-chercheur/institution-chercheur.component';

import { PubliqueFormationCreateChercheurComponent } from './view/publique-formation-chercheur/create-chercheur/publique-formation-create-chercheur.component';
import { PubliqueFormationEditChercheurComponent } from './view/publique-formation-chercheur/edit-chercheur/publique-formation-edit-chercheur.component';
import { PubliqueFormationViewChercheurComponent } from './view/publique-formation-chercheur/view-chercheur/publique-formation-view-chercheur.component';
import { PubliqueFormationListChercheurComponent } from './view/publique-formation-chercheur/list-chercheur/publique-formation-list-chercheur.component';
import { PubliqueFormationChercheurComponent } from './view/publique-formation-chercheur/publique-formation-chercheur.component';

import { FinancementDoctorantCreateChercheurComponent } from './view/financement-doctorant-chercheur/create-chercheur/financement-doctorant-create-chercheur.component';
import { FinancementDoctorantEditChercheurComponent } from './view/financement-doctorant-chercheur/edit-chercheur/financement-doctorant-edit-chercheur.component';
import { FinancementDoctorantViewChercheurComponent } from './view/financement-doctorant-chercheur/view-chercheur/financement-doctorant-view-chercheur.component';
import { FinancementDoctorantListChercheurComponent } from './view/financement-doctorant-chercheur/list-chercheur/financement-doctorant-list-chercheur.component';
import { FinancementDoctorantChercheurComponent } from './view/financement-doctorant-chercheur/financement-doctorant-chercheur.component';

import { VilleCreateChercheurComponent } from './view/ville-chercheur/create-chercheur/ville-create-chercheur.component';
import { VilleEditChercheurComponent } from './view/ville-chercheur/edit-chercheur/ville-edit-chercheur.component';
import { VilleViewChercheurComponent } from './view/ville-chercheur/view-chercheur/ville-view-chercheur.component';
import { VilleListChercheurComponent } from './view/ville-chercheur/list-chercheur/ville-list-chercheur.component';
import { VilleChercheurComponent } from './view/ville-chercheur/ville-chercheur.component';

import { EntiteAdministrativeCreateChercheurComponent } from './view/entite-administrative-chercheur/create-chercheur/entite-administrative-create-chercheur.component';
import { EntiteAdministrativeEditChercheurComponent } from './view/entite-administrative-chercheur/edit-chercheur/entite-administrative-edit-chercheur.component';
import { EntiteAdministrativeViewChercheurComponent } from './view/entite-administrative-chercheur/view-chercheur/entite-administrative-view-chercheur.component';
import { EntiteAdministrativeListChercheurComponent } from './view/entite-administrative-chercheur/list-chercheur/entite-administrative-list-chercheur.component';
import { EntiteAdministrativeChercheurComponent } from './view/entite-administrative-chercheur/entite-administrative-chercheur.component';

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

import { MasterInternationalCreateChercheurComponent } from './view/master-international-chercheur/create-chercheur/master-international-create-chercheur.component';
import { MasterInternationalEditChercheurComponent } from './view/master-international-chercheur/edit-chercheur/master-international-edit-chercheur.component';
import { MasterInternationalViewChercheurComponent } from './view/master-international-chercheur/view-chercheur/master-international-view-chercheur.component';
import { MasterInternationalListChercheurComponent } from './view/master-international-chercheur/list-chercheur/master-international-list-chercheur.component';
import { MasterInternationalChercheurComponent } from './view/master-international-chercheur/master-international-chercheur.component';

import { TypeExpertiseEvaluationCreateChercheurComponent } from './view/type-expertise-evaluation-chercheur/create-chercheur/type-expertise-evaluation-create-chercheur.component';
import { TypeExpertiseEvaluationEditChercheurComponent } from './view/type-expertise-evaluation-chercheur/edit-chercheur/type-expertise-evaluation-edit-chercheur.component';
import { TypeExpertiseEvaluationViewChercheurComponent } from './view/type-expertise-evaluation-chercheur/view-chercheur/type-expertise-evaluation-view-chercheur.component';
import { TypeExpertiseEvaluationListChercheurComponent } from './view/type-expertise-evaluation-chercheur/list-chercheur/type-expertise-evaluation-list-chercheur.component';
import { TypeExpertiseEvaluationChercheurComponent } from './view/type-expertise-evaluation-chercheur/type-expertise-evaluation-chercheur.component';

import { EtudiantCreateChercheurComponent } from './view/etudiant-chercheur/create-chercheur/etudiant-create-chercheur.component';
import { EtudiantEditChercheurComponent } from './view/etudiant-chercheur/edit-chercheur/etudiant-edit-chercheur.component';
import { EtudiantViewChercheurComponent } from './view/etudiant-chercheur/view-chercheur/etudiant-view-chercheur.component';
import { EtudiantListChercheurComponent } from './view/etudiant-chercheur/list-chercheur/etudiant-list-chercheur.component';
import { EtudiantChercheurComponent } from './view/etudiant-chercheur/etudiant-chercheur.component';

import { ModaliteCreateChercheurComponent } from './view/modalite-chercheur/create-chercheur/modalite-create-chercheur.component';
import { ModaliteEditChercheurComponent } from './view/modalite-chercheur/edit-chercheur/modalite-edit-chercheur.component';
import { ModaliteViewChercheurComponent } from './view/modalite-chercheur/view-chercheur/modalite-view-chercheur.component';
import { ModaliteListChercheurComponent } from './view/modalite-chercheur/list-chercheur/modalite-list-chercheur.component';
import { ModaliteChercheurComponent } from './view/modalite-chercheur/modalite-chercheur.component';

import { ModaliteFormationContinueCreateChercheurComponent } from './view/modalite-formation-continue-chercheur/create-chercheur/modalite-formation-continue-create-chercheur.component';
import { ModaliteFormationContinueEditChercheurComponent } from './view/modalite-formation-continue-chercheur/edit-chercheur/modalite-formation-continue-edit-chercheur.component';
import { ModaliteFormationContinueViewChercheurComponent } from './view/modalite-formation-continue-chercheur/view-chercheur/modalite-formation-continue-view-chercheur.component';
import { ModaliteFormationContinueListChercheurComponent } from './view/modalite-formation-continue-chercheur/list-chercheur/modalite-formation-continue-list-chercheur.component';
import { ModaliteFormationContinueChercheurComponent } from './view/modalite-formation-continue-chercheur/modalite-formation-continue-chercheur.component';

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

import { TemplateClotureCreateChercheurComponent } from './view/template-cloture-chercheur/create-chercheur/template-cloture-create-chercheur.component';
import { TemplateClotureEditChercheurComponent } from './view/template-cloture-chercheur/edit-chercheur/template-cloture-edit-chercheur.component';
import { TemplateClotureViewChercheurComponent } from './view/template-cloture-chercheur/view-chercheur/template-cloture-view-chercheur.component';
import { TemplateClotureListChercheurComponent } from './view/template-cloture-chercheur/list-chercheur/template-cloture-list-chercheur.component';
import { TemplateClotureChercheurComponent } from './view/template-cloture-chercheur/template-cloture-chercheur.component';

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

import { ModaliteInterventionCreateChercheurComponent } from './view/modalite-intervention-chercheur/create-chercheur/modalite-intervention-create-chercheur.component';
import { ModaliteInterventionEditChercheurComponent } from './view/modalite-intervention-chercheur/edit-chercheur/modalite-intervention-edit-chercheur.component';
import { ModaliteInterventionViewChercheurComponent } from './view/modalite-intervention-chercheur/view-chercheur/modalite-intervention-view-chercheur.component';
import { ModaliteInterventionListChercheurComponent } from './view/modalite-intervention-chercheur/list-chercheur/modalite-intervention-list-chercheur.component';
import { ModaliteInterventionChercheurComponent } from './view/modalite-intervention-chercheur/modalite-intervention-chercheur.component';

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

import { TypeExpertiseCreateChercheurComponent } from './view/type-expertise-chercheur/create-chercheur/type-expertise-create-chercheur.component';
import { TypeExpertiseEditChercheurComponent } from './view/type-expertise-chercheur/edit-chercheur/type-expertise-edit-chercheur.component';
import { TypeExpertiseViewChercheurComponent } from './view/type-expertise-chercheur/view-chercheur/type-expertise-view-chercheur.component';
import { TypeExpertiseListChercheurComponent } from './view/type-expertise-chercheur/list-chercheur/type-expertise-list-chercheur.component';
import { TypeExpertiseChercheurComponent } from './view/type-expertise-chercheur/type-expertise-chercheur.component';

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

import { SemanticRelationshipCreateChercheurComponent } from './view/semantic-relationship-chercheur/create-chercheur/semantic-relationship-create-chercheur.component';
import { SemanticRelationshipEditChercheurComponent } from './view/semantic-relationship-chercheur/edit-chercheur/semantic-relationship-edit-chercheur.component';
import { SemanticRelationshipViewChercheurComponent } from './view/semantic-relationship-chercheur/view-chercheur/semantic-relationship-view-chercheur.component';
import { SemanticRelationshipListChercheurComponent } from './view/semantic-relationship-chercheur/list-chercheur/semantic-relationship-list-chercheur.component';
import { SemanticRelationshipChercheurComponent } from './view/semantic-relationship-chercheur/semantic-relationship-chercheur.component';

import { TypeEtudeCreateChercheurComponent } from './view/type-etude-chercheur/create-chercheur/type-etude-create-chercheur.component';
import { TypeEtudeEditChercheurComponent } from './view/type-etude-chercheur/edit-chercheur/type-etude-edit-chercheur.component';
import { TypeEtudeViewChercheurComponent } from './view/type-etude-chercheur/view-chercheur/type-etude-view-chercheur.component';
import { TypeEtudeListChercheurComponent } from './view/type-etude-chercheur/list-chercheur/type-etude-list-chercheur.component';
import { TypeEtudeChercheurComponent } from './view/type-etude-chercheur/type-etude-chercheur.component';

import { TemplateRappelCreateChercheurComponent } from './view/template-rappel-chercheur/create-chercheur/template-rappel-create-chercheur.component';
import { TemplateRappelEditChercheurComponent } from './view/template-rappel-chercheur/edit-chercheur/template-rappel-edit-chercheur.component';
import { TemplateRappelViewChercheurComponent } from './view/template-rappel-chercheur/view-chercheur/template-rappel-view-chercheur.component';
import { TemplateRappelListChercheurComponent } from './view/template-rappel-chercheur/list-chercheur/template-rappel-list-chercheur.component';
import { TemplateRappelChercheurComponent } from './view/template-rappel-chercheur/template-rappel-chercheur.component';

import { FormatRencontreCreateChercheurComponent } from './view/format-rencontre-chercheur/create-chercheur/format-rencontre-create-chercheur.component';
import { FormatRencontreEditChercheurComponent } from './view/format-rencontre-chercheur/edit-chercheur/format-rencontre-edit-chercheur.component';
import { FormatRencontreViewChercheurComponent } from './view/format-rencontre-chercheur/view-chercheur/format-rencontre-view-chercheur.component';
import { FormatRencontreListChercheurComponent } from './view/format-rencontre-chercheur/list-chercheur/format-rencontre-list-chercheur.component';
import { FormatRencontreChercheurComponent } from './view/format-rencontre-chercheur/format-rencontre-chercheur.component';

import { TypeReclamationCreateChercheurComponent } from './view/type-reclamation-chercheur/create-chercheur/type-reclamation-create-chercheur.component';
import { TypeReclamationEditChercheurComponent } from './view/type-reclamation-chercheur/edit-chercheur/type-reclamation-edit-chercheur.component';
import { TypeReclamationViewChercheurComponent } from './view/type-reclamation-chercheur/view-chercheur/type-reclamation-view-chercheur.component';
import { TypeReclamationListChercheurComponent } from './view/type-reclamation-chercheur/list-chercheur/type-reclamation-list-chercheur.component';
import { TypeReclamationChercheurComponent } from './view/type-reclamation-chercheur/type-reclamation-chercheur.component';

import { CommissionScientifiqueCreateChercheurComponent } from './view/commission-scientifique-chercheur/create-chercheur/commission-scientifique-create-chercheur.component';
import { CommissionScientifiqueEditChercheurComponent } from './view/commission-scientifique-chercheur/edit-chercheur/commission-scientifique-edit-chercheur.component';
import { CommissionScientifiqueViewChercheurComponent } from './view/commission-scientifique-chercheur/view-chercheur/commission-scientifique-view-chercheur.component';
import { CommissionScientifiqueListChercheurComponent } from './view/commission-scientifique-chercheur/list-chercheur/commission-scientifique-list-chercheur.component';
import { CommissionScientifiqueChercheurComponent } from './view/commission-scientifique-chercheur/commission-scientifique-chercheur.component';

import { SexeCreateChercheurComponent } from './view/sexe-chercheur/create-chercheur/sexe-create-chercheur.component';
import { SexeEditChercheurComponent } from './view/sexe-chercheur/edit-chercheur/sexe-edit-chercheur.component';
import { SexeViewChercheurComponent } from './view/sexe-chercheur/view-chercheur/sexe-view-chercheur.component';
import { SexeListChercheurComponent } from './view/sexe-chercheur/list-chercheur/sexe-list-chercheur.component';
import { SexeChercheurComponent } from './view/sexe-chercheur/sexe-chercheur.component';

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

    KeyWordDisciplineScientifiqueErcCreateChercheurComponent,
    KeyWordDisciplineScientifiqueErcListChercheurComponent,
    KeyWordDisciplineScientifiqueErcViewChercheurComponent,
    KeyWordDisciplineScientifiqueErcEditChercheurComponent,
    KeyWordDisciplineScientifiqueErcChercheurComponent,
    GradeCreateChercheurComponent,
    GradeListChercheurComponent,
    GradeViewChercheurComponent,
    GradeEditChercheurComponent,
    GradeChercheurComponent,
    DoctorantCreateChercheurComponent,
    DoctorantListChercheurComponent,
    DoctorantViewChercheurComponent,
    DoctorantEditChercheurComponent,
    DoctorantChercheurComponent,
    ResponsabiliteEncadrementDoctorantCreateChercheurComponent,
    ResponsabiliteEncadrementDoctorantListChercheurComponent,
    ResponsabiliteEncadrementDoctorantViewChercheurComponent,
    ResponsabiliteEncadrementDoctorantEditChercheurComponent,
    ResponsabiliteEncadrementDoctorantChercheurComponent,
    RoleProjetCreateChercheurComponent,
    RoleProjetListChercheurComponent,
    RoleProjetViewChercheurComponent,
    RoleProjetEditChercheurComponent,
    RoleProjetChercheurComponent,
    DisciplineScientifiqueCreateChercheurComponent,
    DisciplineScientifiqueListChercheurComponent,
    DisciplineScientifiqueViewChercheurComponent,
    DisciplineScientifiqueEditChercheurComponent,
    DisciplineScientifiqueChercheurComponent,
    DisciplineScientifiqueErcParentCreateChercheurComponent,
    DisciplineScientifiqueErcParentListChercheurComponent,
    DisciplineScientifiqueErcParentViewChercheurComponent,
    DisciplineScientifiqueErcParentEditChercheurComponent,
    DisciplineScientifiqueErcParentChercheurComponent,
    ResponsabiliteDirectionEncadrementEtudiantCreateChercheurComponent,
    ResponsabiliteDirectionEncadrementEtudiantListChercheurComponent,
    ResponsabiliteDirectionEncadrementEtudiantViewChercheurComponent,
    ResponsabiliteDirectionEncadrementEtudiantEditChercheurComponent,
    ResponsabiliteDirectionEncadrementEtudiantChercheurComponent,
    CaracterisationCreateChercheurComponent,
    CaracterisationListChercheurComponent,
    CaracterisationViewChercheurComponent,
    CaracterisationEditChercheurComponent,
    CaracterisationChercheurComponent,
    DepartementScientifiqueCreateChercheurComponent,
    DepartementScientifiqueListChercheurComponent,
    DepartementScientifiqueViewChercheurComponent,
    DepartementScientifiqueEditChercheurComponent,
    DepartementScientifiqueChercheurComponent,
    StructureIrdCreateChercheurComponent,
    StructureIrdListChercheurComponent,
    StructureIrdViewChercheurComponent,
    StructureIrdEditChercheurComponent,
    StructureIrdChercheurComponent,
    DisciplineScientifiqueErcAssociationCreateChercheurComponent,
    DisciplineScientifiqueErcAssociationListChercheurComponent,
    DisciplineScientifiqueErcAssociationViewChercheurComponent,
    DisciplineScientifiqueErcAssociationEditChercheurComponent,
    DisciplineScientifiqueErcAssociationChercheurComponent,
    TypeOutilCreateChercheurComponent,
    TypeOutilListChercheurComponent,
    TypeOutilViewChercheurComponent,
    TypeOutilEditChercheurComponent,
    TypeOutilChercheurComponent,
    TemplateOuvertureCreateChercheurComponent,
    TemplateOuvertureListChercheurComponent,
    TemplateOuvertureViewChercheurComponent,
    TemplateOuvertureEditChercheurComponent,
    TemplateOuvertureChercheurComponent,
    NatureExpertiseCreateChercheurComponent,
    NatureExpertiseListChercheurComponent,
    NatureExpertiseViewChercheurComponent,
    NatureExpertiseEditChercheurComponent,
    NatureExpertiseChercheurComponent,
    ObjetFormationGeneriqueCreateChercheurComponent,
    ObjetFormationGeneriqueListChercheurComponent,
    ObjetFormationGeneriqueViewChercheurComponent,
    ObjetFormationGeneriqueEditChercheurComponent,
    ObjetFormationGeneriqueChercheurComponent,
    PubliqueCibleCreateChercheurComponent,
    PubliqueCibleListChercheurComponent,
    PubliqueCibleViewChercheurComponent,
    PubliqueCibleEditChercheurComponent,
    PubliqueCibleChercheurComponent,
    EtablissementProjetCreateChercheurComponent,
    EtablissementProjetListChercheurComponent,
    EtablissementProjetViewChercheurComponent,
    EtablissementProjetEditChercheurComponent,
    EtablissementProjetChercheurComponent,
    StatusProjetCreateChercheurComponent,
    StatusProjetListChercheurComponent,
    StatusProjetViewChercheurComponent,
    StatusProjetEditChercheurComponent,
    StatusProjetChercheurComponent,
    PubliqueProfessionelCreateChercheurComponent,
    PubliqueProfessionelListChercheurComponent,
    PubliqueProfessionelViewChercheurComponent,
    PubliqueProfessionelEditChercheurComponent,
    PubliqueProfessionelChercheurComponent,
    TypeEnseignementCreateChercheurComponent,
    TypeEnseignementListChercheurComponent,
    TypeEnseignementViewChercheurComponent,
    TypeEnseignementEditChercheurComponent,
    TypeEnseignementChercheurComponent,
    NationaliteCreateChercheurComponent,
    NationaliteListChercheurComponent,
    NationaliteViewChercheurComponent,
    NationaliteEditChercheurComponent,
    NationaliteChercheurComponent,
    EnjeuxIrdCreateChercheurComponent,
    EnjeuxIrdListChercheurComponent,
    EnjeuxIrdViewChercheurComponent,
    EnjeuxIrdEditChercheurComponent,
    EnjeuxIrdChercheurComponent,
    TypeExpertCreateChercheurComponent,
    TypeExpertListChercheurComponent,
    TypeExpertViewChercheurComponent,
    TypeExpertEditChercheurComponent,
    TypeExpertChercheurComponent,
    KeyWordCreateChercheurComponent,
    KeyWordListChercheurComponent,
    KeyWordViewChercheurComponent,
    KeyWordEditChercheurComponent,
    KeyWordChercheurComponent,
    PaysCreateChercheurComponent,
    PaysListChercheurComponent,
    PaysViewChercheurComponent,
    PaysEditChercheurComponent,
    PaysChercheurComponent,
    NatureEnseignementCreateChercheurComponent,
    NatureEnseignementListChercheurComponent,
    NatureEnseignementViewChercheurComponent,
    NatureEnseignementEditChercheurComponent,
    NatureEnseignementChercheurComponent,
    ContexteCreateChercheurComponent,
    ContexteListChercheurComponent,
    ContexteViewChercheurComponent,
    ContexteEditChercheurComponent,
    ContexteChercheurComponent,
    CommanditaireCreateChercheurComponent,
    CommanditaireListChercheurComponent,
    CommanditaireViewChercheurComponent,
    CommanditaireEditChercheurComponent,
    CommanditaireChercheurComponent,
    CommunauteSavoirCreateChercheurComponent,
    CommunauteSavoirListChercheurComponent,
    CommunauteSavoirViewChercheurComponent,
    CommunauteSavoirEditChercheurComponent,
    CommunauteSavoirChercheurComponent,
    NiveauFormationPostBacCreateChercheurComponent,
    NiveauFormationPostBacListChercheurComponent,
    NiveauFormationPostBacViewChercheurComponent,
    NiveauFormationPostBacEditChercheurComponent,
    NiveauFormationPostBacChercheurComponent,
    TemplateRelanceCreateChercheurComponent,
    TemplateRelanceListChercheurComponent,
    TemplateRelanceViewChercheurComponent,
    TemplateRelanceEditChercheurComponent,
    TemplateRelanceChercheurComponent,
    TypeSavoirCreateChercheurComponent,
    TypeSavoirListChercheurComponent,
    TypeSavoirViewChercheurComponent,
    TypeSavoirEditChercheurComponent,
    TypeSavoirChercheurComponent,
    ModeDiffusionCreateChercheurComponent,
    ModeDiffusionListChercheurComponent,
    ModeDiffusionViewChercheurComponent,
    ModeDiffusionEditChercheurComponent,
    ModeDiffusionChercheurComponent,
    CorpsCreateChercheurComponent,
    CorpsListChercheurComponent,
    CorpsViewChercheurComponent,
    CorpsEditChercheurComponent,
    CorpsChercheurComponent,
    ZoneGeographiqueCreateChercheurComponent,
    ZoneGeographiqueListChercheurComponent,
    ZoneGeographiqueViewChercheurComponent,
    ZoneGeographiqueEditChercheurComponent,
    ZoneGeographiqueChercheurComponent,
    InstrumentIrdCreateChercheurComponent,
    InstrumentIrdListChercheurComponent,
    InstrumentIrdViewChercheurComponent,
    InstrumentIrdEditChercheurComponent,
    InstrumentIrdChercheurComponent,
    NatureEtudeCreateChercheurComponent,
    NatureEtudeListChercheurComponent,
    NatureEtudeViewChercheurComponent,
    NatureEtudeEditChercheurComponent,
    NatureEtudeChercheurComponent,
    InstitutionCreateChercheurComponent,
    InstitutionListChercheurComponent,
    InstitutionViewChercheurComponent,
    InstitutionEditChercheurComponent,
    InstitutionChercheurComponent,
    PubliqueFormationCreateChercheurComponent,
    PubliqueFormationListChercheurComponent,
    PubliqueFormationViewChercheurComponent,
    PubliqueFormationEditChercheurComponent,
    PubliqueFormationChercheurComponent,
    FinancementDoctorantCreateChercheurComponent,
    FinancementDoctorantListChercheurComponent,
    FinancementDoctorantViewChercheurComponent,
    FinancementDoctorantEditChercheurComponent,
    FinancementDoctorantChercheurComponent,
    VilleCreateChercheurComponent,
    VilleListChercheurComponent,
    VilleViewChercheurComponent,
    VilleEditChercheurComponent,
    VilleChercheurComponent,
    EntiteAdministrativeCreateChercheurComponent,
    EntiteAdministrativeListChercheurComponent,
    EntiteAdministrativeViewChercheurComponent,
    EntiteAdministrativeEditChercheurComponent,
    EntiteAdministrativeChercheurComponent,
    EtablissementCreateChercheurComponent,
    EtablissementListChercheurComponent,
    EtablissementViewChercheurComponent,
    EtablissementEditChercheurComponent,
    EtablissementChercheurComponent,
    DisciplineScientifiqueParentCreateChercheurComponent,
    DisciplineScientifiqueParentListChercheurComponent,
    DisciplineScientifiqueParentViewChercheurComponent,
    DisciplineScientifiqueParentEditChercheurComponent,
    DisciplineScientifiqueParentChercheurComponent,
    MasterInternationalCreateChercheurComponent,
    MasterInternationalListChercheurComponent,
    MasterInternationalViewChercheurComponent,
    MasterInternationalEditChercheurComponent,
    MasterInternationalChercheurComponent,
    TypeExpertiseEvaluationCreateChercheurComponent,
    TypeExpertiseEvaluationListChercheurComponent,
    TypeExpertiseEvaluationViewChercheurComponent,
    TypeExpertiseEvaluationEditChercheurComponent,
    TypeExpertiseEvaluationChercheurComponent,
    EtudiantCreateChercheurComponent,
    EtudiantListChercheurComponent,
    EtudiantViewChercheurComponent,
    EtudiantEditChercheurComponent,
    EtudiantChercheurComponent,
    ModaliteCreateChercheurComponent,
    ModaliteListChercheurComponent,
    ModaliteViewChercheurComponent,
    ModaliteEditChercheurComponent,
    ModaliteChercheurComponent,
    ModaliteFormationContinueCreateChercheurComponent,
    ModaliteFormationContinueListChercheurComponent,
    ModaliteFormationContinueViewChercheurComponent,
    ModaliteFormationContinueEditChercheurComponent,
    ModaliteFormationContinueChercheurComponent,
    TypeEntiteAdministrativeCreateChercheurComponent,
    TypeEntiteAdministrativeListChercheurComponent,
    TypeEntiteAdministrativeViewChercheurComponent,
    TypeEntiteAdministrativeEditChercheurComponent,
    TypeEntiteAdministrativeChercheurComponent,
    TypeUtilisateurCreateChercheurComponent,
    TypeUtilisateurListChercheurComponent,
    TypeUtilisateurViewChercheurComponent,
    TypeUtilisateurEditChercheurComponent,
    TypeUtilisateurChercheurComponent,
    TypeInstrumentIrdCreateChercheurComponent,
    TypeInstrumentIrdListChercheurComponent,
    TypeInstrumentIrdViewChercheurComponent,
    TypeInstrumentIrdEditChercheurComponent,
    TypeInstrumentIrdChercheurComponent,
    EtablissementPartenaireCreateChercheurComponent,
    EtablissementPartenaireListChercheurComponent,
    EtablissementPartenaireViewChercheurComponent,
    EtablissementPartenaireEditChercheurComponent,
    EtablissementPartenaireChercheurComponent,
    ModaliteEtudeCreateChercheurComponent,
    ModaliteEtudeListChercheurComponent,
    ModaliteEtudeViewChercheurComponent,
    ModaliteEtudeEditChercheurComponent,
    ModaliteEtudeChercheurComponent,
    TemplateClotureCreateChercheurComponent,
    TemplateClotureListChercheurComponent,
    TemplateClotureViewChercheurComponent,
    TemplateClotureEditChercheurComponent,
    TemplateClotureChercheurComponent,
    TypePubliqueCultureScientifiqueCreateChercheurComponent,
    TypePubliqueCultureScientifiqueListChercheurComponent,
    TypePubliqueCultureScientifiqueViewChercheurComponent,
    TypePubliqueCultureScientifiqueEditChercheurComponent,
    TypePubliqueCultureScientifiqueChercheurComponent,
    StatusCursusCreateChercheurComponent,
    StatusCursusListChercheurComponent,
    StatusCursusViewChercheurComponent,
    StatusCursusEditChercheurComponent,
    StatusCursusChercheurComponent,
    CategorieFaqCreateChercheurComponent,
    CategorieFaqListChercheurComponent,
    CategorieFaqViewChercheurComponent,
    CategorieFaqEditChercheurComponent,
    CategorieFaqChercheurComponent,
    IdentifiantRechercheCreateChercheurComponent,
    IdentifiantRechercheListChercheurComponent,
    IdentifiantRechercheViewChercheurComponent,
    IdentifiantRechercheEditChercheurComponent,
    IdentifiantRechercheChercheurComponent,
    ModaliteInterventionCreateChercheurComponent,
    ModaliteInterventionListChercheurComponent,
    ModaliteInterventionViewChercheurComponent,
    ModaliteInterventionEditChercheurComponent,
    ModaliteInterventionChercheurComponent,
    DisciplineScientifiqueErcCreateChercheurComponent,
    DisciplineScientifiqueErcListChercheurComponent,
    DisciplineScientifiqueErcViewChercheurComponent,
    DisciplineScientifiqueErcEditChercheurComponent,
    DisciplineScientifiqueErcChercheurComponent,
    TypeInstanceCreateChercheurComponent,
    TypeInstanceListChercheurComponent,
    TypeInstanceViewChercheurComponent,
    TypeInstanceEditChercheurComponent,
    TypeInstanceChercheurComponent,
    NiveauFormationCreateChercheurComponent,
    NiveauFormationListChercheurComponent,
    NiveauFormationViewChercheurComponent,
    NiveauFormationEditChercheurComponent,
    NiveauFormationChercheurComponent,
    FournisseurAppelProjetRechercheCreateChercheurComponent,
    FournisseurAppelProjetRechercheListChercheurComponent,
    FournisseurAppelProjetRechercheViewChercheurComponent,
    FournisseurAppelProjetRechercheEditChercheurComponent,
    FournisseurAppelProjetRechercheChercheurComponent,
    TypeExpertiseCreateChercheurComponent,
    TypeExpertiseListChercheurComponent,
    TypeExpertiseViewChercheurComponent,
    TypeExpertiseEditChercheurComponent,
    TypeExpertiseChercheurComponent,
    NiveauEtudeCreateChercheurComponent,
    NiveauEtudeListChercheurComponent,
    NiveauEtudeViewChercheurComponent,
    NiveauEtudeEditChercheurComponent,
    NiveauEtudeChercheurComponent,
    RoleEvaluationCreateChercheurComponent,
    RoleEvaluationListChercheurComponent,
    RoleEvaluationViewChercheurComponent,
    RoleEvaluationEditChercheurComponent,
    RoleEvaluationChercheurComponent,
    SemanticRelationshipCreateChercheurComponent,
    SemanticRelationshipListChercheurComponent,
    SemanticRelationshipViewChercheurComponent,
    SemanticRelationshipEditChercheurComponent,
    SemanticRelationshipChercheurComponent,
    TypeEtudeCreateChercheurComponent,
    TypeEtudeListChercheurComponent,
    TypeEtudeViewChercheurComponent,
    TypeEtudeEditChercheurComponent,
    TypeEtudeChercheurComponent,
    TemplateRappelCreateChercheurComponent,
    TemplateRappelListChercheurComponent,
    TemplateRappelViewChercheurComponent,
    TemplateRappelEditChercheurComponent,
    TemplateRappelChercheurComponent,
    FormatRencontreCreateChercheurComponent,
    FormatRencontreListChercheurComponent,
    FormatRencontreViewChercheurComponent,
    FormatRencontreEditChercheurComponent,
    FormatRencontreChercheurComponent,
    TypeReclamationCreateChercheurComponent,
    TypeReclamationListChercheurComponent,
    TypeReclamationViewChercheurComponent,
    TypeReclamationEditChercheurComponent,
    TypeReclamationChercheurComponent,
    CommissionScientifiqueCreateChercheurComponent,
    CommissionScientifiqueListChercheurComponent,
    CommissionScientifiqueViewChercheurComponent,
    CommissionScientifiqueEditChercheurComponent,
    CommissionScientifiqueChercheurComponent,
    SexeCreateChercheurComponent,
    SexeListChercheurComponent,
    SexeViewChercheurComponent,
    SexeEditChercheurComponent,
    SexeChercheurComponent,
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
    MultiSelectModule
  ],
  exports: [
  KeyWordDisciplineScientifiqueErcCreateChercheurComponent,
  KeyWordDisciplineScientifiqueErcListChercheurComponent,
  KeyWordDisciplineScientifiqueErcViewChercheurComponent,
  KeyWordDisciplineScientifiqueErcEditChercheurComponent,
  KeyWordDisciplineScientifiqueErcChercheurComponent,
  GradeCreateChercheurComponent,
  GradeListChercheurComponent,
  GradeViewChercheurComponent,
  GradeEditChercheurComponent,
  GradeChercheurComponent,
  DoctorantCreateChercheurComponent,
  DoctorantListChercheurComponent,
  DoctorantViewChercheurComponent,
  DoctorantEditChercheurComponent,
  DoctorantChercheurComponent,
  ResponsabiliteEncadrementDoctorantCreateChercheurComponent,
  ResponsabiliteEncadrementDoctorantListChercheurComponent,
  ResponsabiliteEncadrementDoctorantViewChercheurComponent,
  ResponsabiliteEncadrementDoctorantEditChercheurComponent,
  ResponsabiliteEncadrementDoctorantChercheurComponent,
  RoleProjetCreateChercheurComponent,
  RoleProjetListChercheurComponent,
  RoleProjetViewChercheurComponent,
  RoleProjetEditChercheurComponent,
  RoleProjetChercheurComponent,
  DisciplineScientifiqueCreateChercheurComponent,
  DisciplineScientifiqueListChercheurComponent,
  DisciplineScientifiqueViewChercheurComponent,
  DisciplineScientifiqueEditChercheurComponent,
  DisciplineScientifiqueChercheurComponent,
  DisciplineScientifiqueErcParentCreateChercheurComponent,
  DisciplineScientifiqueErcParentListChercheurComponent,
  DisciplineScientifiqueErcParentViewChercheurComponent,
  DisciplineScientifiqueErcParentEditChercheurComponent,
  DisciplineScientifiqueErcParentChercheurComponent,
  ResponsabiliteDirectionEncadrementEtudiantCreateChercheurComponent,
  ResponsabiliteDirectionEncadrementEtudiantListChercheurComponent,
  ResponsabiliteDirectionEncadrementEtudiantViewChercheurComponent,
  ResponsabiliteDirectionEncadrementEtudiantEditChercheurComponent,
  ResponsabiliteDirectionEncadrementEtudiantChercheurComponent,
  CaracterisationCreateChercheurComponent,
  CaracterisationListChercheurComponent,
  CaracterisationViewChercheurComponent,
  CaracterisationEditChercheurComponent,
  CaracterisationChercheurComponent,
  DepartementScientifiqueCreateChercheurComponent,
  DepartementScientifiqueListChercheurComponent,
  DepartementScientifiqueViewChercheurComponent,
  DepartementScientifiqueEditChercheurComponent,
  DepartementScientifiqueChercheurComponent,
  StructureIrdCreateChercheurComponent,
  StructureIrdListChercheurComponent,
  StructureIrdViewChercheurComponent,
  StructureIrdEditChercheurComponent,
  StructureIrdChercheurComponent,
  DisciplineScientifiqueErcAssociationCreateChercheurComponent,
  DisciplineScientifiqueErcAssociationListChercheurComponent,
  DisciplineScientifiqueErcAssociationViewChercheurComponent,
  DisciplineScientifiqueErcAssociationEditChercheurComponent,
  DisciplineScientifiqueErcAssociationChercheurComponent,
  TypeOutilCreateChercheurComponent,
  TypeOutilListChercheurComponent,
  TypeOutilViewChercheurComponent,
  TypeOutilEditChercheurComponent,
  TypeOutilChercheurComponent,
  TemplateOuvertureCreateChercheurComponent,
  TemplateOuvertureListChercheurComponent,
  TemplateOuvertureViewChercheurComponent,
  TemplateOuvertureEditChercheurComponent,
  TemplateOuvertureChercheurComponent,
  NatureExpertiseCreateChercheurComponent,
  NatureExpertiseListChercheurComponent,
  NatureExpertiseViewChercheurComponent,
  NatureExpertiseEditChercheurComponent,
  NatureExpertiseChercheurComponent,
  ObjetFormationGeneriqueCreateChercheurComponent,
  ObjetFormationGeneriqueListChercheurComponent,
  ObjetFormationGeneriqueViewChercheurComponent,
  ObjetFormationGeneriqueEditChercheurComponent,
  ObjetFormationGeneriqueChercheurComponent,
  PubliqueCibleCreateChercheurComponent,
  PubliqueCibleListChercheurComponent,
  PubliqueCibleViewChercheurComponent,
  PubliqueCibleEditChercheurComponent,
  PubliqueCibleChercheurComponent,
  EtablissementProjetCreateChercheurComponent,
  EtablissementProjetListChercheurComponent,
  EtablissementProjetViewChercheurComponent,
  EtablissementProjetEditChercheurComponent,
  EtablissementProjetChercheurComponent,
  StatusProjetCreateChercheurComponent,
  StatusProjetListChercheurComponent,
  StatusProjetViewChercheurComponent,
  StatusProjetEditChercheurComponent,
  StatusProjetChercheurComponent,
  PubliqueProfessionelCreateChercheurComponent,
  PubliqueProfessionelListChercheurComponent,
  PubliqueProfessionelViewChercheurComponent,
  PubliqueProfessionelEditChercheurComponent,
  PubliqueProfessionelChercheurComponent,
  TypeEnseignementCreateChercheurComponent,
  TypeEnseignementListChercheurComponent,
  TypeEnseignementViewChercheurComponent,
  TypeEnseignementEditChercheurComponent,
  TypeEnseignementChercheurComponent,
  NationaliteCreateChercheurComponent,
  NationaliteListChercheurComponent,
  NationaliteViewChercheurComponent,
  NationaliteEditChercheurComponent,
  NationaliteChercheurComponent,
  EnjeuxIrdCreateChercheurComponent,
  EnjeuxIrdListChercheurComponent,
  EnjeuxIrdViewChercheurComponent,
  EnjeuxIrdEditChercheurComponent,
  EnjeuxIrdChercheurComponent,
  TypeExpertCreateChercheurComponent,
  TypeExpertListChercheurComponent,
  TypeExpertViewChercheurComponent,
  TypeExpertEditChercheurComponent,
  TypeExpertChercheurComponent,
  KeyWordCreateChercheurComponent,
  KeyWordListChercheurComponent,
  KeyWordViewChercheurComponent,
  KeyWordEditChercheurComponent,
  KeyWordChercheurComponent,
  PaysCreateChercheurComponent,
  PaysListChercheurComponent,
  PaysViewChercheurComponent,
  PaysEditChercheurComponent,
  PaysChercheurComponent,
  NatureEnseignementCreateChercheurComponent,
  NatureEnseignementListChercheurComponent,
  NatureEnseignementViewChercheurComponent,
  NatureEnseignementEditChercheurComponent,
  NatureEnseignementChercheurComponent,
  ContexteCreateChercheurComponent,
  ContexteListChercheurComponent,
  ContexteViewChercheurComponent,
  ContexteEditChercheurComponent,
  ContexteChercheurComponent,
  CommanditaireCreateChercheurComponent,
  CommanditaireListChercheurComponent,
  CommanditaireViewChercheurComponent,
  CommanditaireEditChercheurComponent,
  CommanditaireChercheurComponent,
  CommunauteSavoirCreateChercheurComponent,
  CommunauteSavoirListChercheurComponent,
  CommunauteSavoirViewChercheurComponent,
  CommunauteSavoirEditChercheurComponent,
  CommunauteSavoirChercheurComponent,
  NiveauFormationPostBacCreateChercheurComponent,
  NiveauFormationPostBacListChercheurComponent,
  NiveauFormationPostBacViewChercheurComponent,
  NiveauFormationPostBacEditChercheurComponent,
  NiveauFormationPostBacChercheurComponent,
  TemplateRelanceCreateChercheurComponent,
  TemplateRelanceListChercheurComponent,
  TemplateRelanceViewChercheurComponent,
  TemplateRelanceEditChercheurComponent,
  TemplateRelanceChercheurComponent,
  TypeSavoirCreateChercheurComponent,
  TypeSavoirListChercheurComponent,
  TypeSavoirViewChercheurComponent,
  TypeSavoirEditChercheurComponent,
  TypeSavoirChercheurComponent,
  ModeDiffusionCreateChercheurComponent,
  ModeDiffusionListChercheurComponent,
  ModeDiffusionViewChercheurComponent,
  ModeDiffusionEditChercheurComponent,
  ModeDiffusionChercheurComponent,
  CorpsCreateChercheurComponent,
  CorpsListChercheurComponent,
  CorpsViewChercheurComponent,
  CorpsEditChercheurComponent,
  CorpsChercheurComponent,
  ZoneGeographiqueCreateChercheurComponent,
  ZoneGeographiqueListChercheurComponent,
  ZoneGeographiqueViewChercheurComponent,
  ZoneGeographiqueEditChercheurComponent,
  ZoneGeographiqueChercheurComponent,
  InstrumentIrdCreateChercheurComponent,
  InstrumentIrdListChercheurComponent,
  InstrumentIrdViewChercheurComponent,
  InstrumentIrdEditChercheurComponent,
  InstrumentIrdChercheurComponent,
  NatureEtudeCreateChercheurComponent,
  NatureEtudeListChercheurComponent,
  NatureEtudeViewChercheurComponent,
  NatureEtudeEditChercheurComponent,
  NatureEtudeChercheurComponent,
  InstitutionCreateChercheurComponent,
  InstitutionListChercheurComponent,
  InstitutionViewChercheurComponent,
  InstitutionEditChercheurComponent,
  InstitutionChercheurComponent,
  PubliqueFormationCreateChercheurComponent,
  PubliqueFormationListChercheurComponent,
  PubliqueFormationViewChercheurComponent,
  PubliqueFormationEditChercheurComponent,
  PubliqueFormationChercheurComponent,
  FinancementDoctorantCreateChercheurComponent,
  FinancementDoctorantListChercheurComponent,
  FinancementDoctorantViewChercheurComponent,
  FinancementDoctorantEditChercheurComponent,
  FinancementDoctorantChercheurComponent,
  VilleCreateChercheurComponent,
  VilleListChercheurComponent,
  VilleViewChercheurComponent,
  VilleEditChercheurComponent,
  VilleChercheurComponent,
  EntiteAdministrativeCreateChercheurComponent,
  EntiteAdministrativeListChercheurComponent,
  EntiteAdministrativeViewChercheurComponent,
  EntiteAdministrativeEditChercheurComponent,
  EntiteAdministrativeChercheurComponent,
  EtablissementCreateChercheurComponent,
  EtablissementListChercheurComponent,
  EtablissementViewChercheurComponent,
  EtablissementEditChercheurComponent,
  EtablissementChercheurComponent,
  DisciplineScientifiqueParentCreateChercheurComponent,
  DisciplineScientifiqueParentListChercheurComponent,
  DisciplineScientifiqueParentViewChercheurComponent,
  DisciplineScientifiqueParentEditChercheurComponent,
  DisciplineScientifiqueParentChercheurComponent,
  MasterInternationalCreateChercheurComponent,
  MasterInternationalListChercheurComponent,
  MasterInternationalViewChercheurComponent,
  MasterInternationalEditChercheurComponent,
  MasterInternationalChercheurComponent,
  TypeExpertiseEvaluationCreateChercheurComponent,
  TypeExpertiseEvaluationListChercheurComponent,
  TypeExpertiseEvaluationViewChercheurComponent,
  TypeExpertiseEvaluationEditChercheurComponent,
  TypeExpertiseEvaluationChercheurComponent,
  EtudiantCreateChercheurComponent,
  EtudiantListChercheurComponent,
  EtudiantViewChercheurComponent,
  EtudiantEditChercheurComponent,
  EtudiantChercheurComponent,
  ModaliteCreateChercheurComponent,
  ModaliteListChercheurComponent,
  ModaliteViewChercheurComponent,
  ModaliteEditChercheurComponent,
  ModaliteChercheurComponent,
  ModaliteFormationContinueCreateChercheurComponent,
  ModaliteFormationContinueListChercheurComponent,
  ModaliteFormationContinueViewChercheurComponent,
  ModaliteFormationContinueEditChercheurComponent,
  ModaliteFormationContinueChercheurComponent,
  TypeEntiteAdministrativeCreateChercheurComponent,
  TypeEntiteAdministrativeListChercheurComponent,
  TypeEntiteAdministrativeViewChercheurComponent,
  TypeEntiteAdministrativeEditChercheurComponent,
  TypeEntiteAdministrativeChercheurComponent,
  TypeUtilisateurCreateChercheurComponent,
  TypeUtilisateurListChercheurComponent,
  TypeUtilisateurViewChercheurComponent,
  TypeUtilisateurEditChercheurComponent,
  TypeUtilisateurChercheurComponent,
  TypeInstrumentIrdCreateChercheurComponent,
  TypeInstrumentIrdListChercheurComponent,
  TypeInstrumentIrdViewChercheurComponent,
  TypeInstrumentIrdEditChercheurComponent,
  TypeInstrumentIrdChercheurComponent,
  EtablissementPartenaireCreateChercheurComponent,
  EtablissementPartenaireListChercheurComponent,
  EtablissementPartenaireViewChercheurComponent,
  EtablissementPartenaireEditChercheurComponent,
  EtablissementPartenaireChercheurComponent,
  ModaliteEtudeCreateChercheurComponent,
  ModaliteEtudeListChercheurComponent,
  ModaliteEtudeViewChercheurComponent,
  ModaliteEtudeEditChercheurComponent,
  ModaliteEtudeChercheurComponent,
  TemplateClotureCreateChercheurComponent,
  TemplateClotureListChercheurComponent,
  TemplateClotureViewChercheurComponent,
  TemplateClotureEditChercheurComponent,
  TemplateClotureChercheurComponent,
  TypePubliqueCultureScientifiqueCreateChercheurComponent,
  TypePubliqueCultureScientifiqueListChercheurComponent,
  TypePubliqueCultureScientifiqueViewChercheurComponent,
  TypePubliqueCultureScientifiqueEditChercheurComponent,
  TypePubliqueCultureScientifiqueChercheurComponent,
  StatusCursusCreateChercheurComponent,
  StatusCursusListChercheurComponent,
  StatusCursusViewChercheurComponent,
  StatusCursusEditChercheurComponent,
  StatusCursusChercheurComponent,
  CategorieFaqCreateChercheurComponent,
  CategorieFaqListChercheurComponent,
  CategorieFaqViewChercheurComponent,
  CategorieFaqEditChercheurComponent,
  CategorieFaqChercheurComponent,
  IdentifiantRechercheCreateChercheurComponent,
  IdentifiantRechercheListChercheurComponent,
  IdentifiantRechercheViewChercheurComponent,
  IdentifiantRechercheEditChercheurComponent,
  IdentifiantRechercheChercheurComponent,
  ModaliteInterventionCreateChercheurComponent,
  ModaliteInterventionListChercheurComponent,
  ModaliteInterventionViewChercheurComponent,
  ModaliteInterventionEditChercheurComponent,
  ModaliteInterventionChercheurComponent,
  DisciplineScientifiqueErcCreateChercheurComponent,
  DisciplineScientifiqueErcListChercheurComponent,
  DisciplineScientifiqueErcViewChercheurComponent,
  DisciplineScientifiqueErcEditChercheurComponent,
  DisciplineScientifiqueErcChercheurComponent,
  TypeInstanceCreateChercheurComponent,
  TypeInstanceListChercheurComponent,
  TypeInstanceViewChercheurComponent,
  TypeInstanceEditChercheurComponent,
  TypeInstanceChercheurComponent,
  NiveauFormationCreateChercheurComponent,
  NiveauFormationListChercheurComponent,
  NiveauFormationViewChercheurComponent,
  NiveauFormationEditChercheurComponent,
  NiveauFormationChercheurComponent,
  FournisseurAppelProjetRechercheCreateChercheurComponent,
  FournisseurAppelProjetRechercheListChercheurComponent,
  FournisseurAppelProjetRechercheViewChercheurComponent,
  FournisseurAppelProjetRechercheEditChercheurComponent,
  FournisseurAppelProjetRechercheChercheurComponent,
  TypeExpertiseCreateChercheurComponent,
  TypeExpertiseListChercheurComponent,
  TypeExpertiseViewChercheurComponent,
  TypeExpertiseEditChercheurComponent,
  TypeExpertiseChercheurComponent,
  NiveauEtudeCreateChercheurComponent,
  NiveauEtudeListChercheurComponent,
  NiveauEtudeViewChercheurComponent,
  NiveauEtudeEditChercheurComponent,
  NiveauEtudeChercheurComponent,
  RoleEvaluationCreateChercheurComponent,
  RoleEvaluationListChercheurComponent,
  RoleEvaluationViewChercheurComponent,
  RoleEvaluationEditChercheurComponent,
  RoleEvaluationChercheurComponent,
  SemanticRelationshipCreateChercheurComponent,
  SemanticRelationshipListChercheurComponent,
  SemanticRelationshipViewChercheurComponent,
  SemanticRelationshipEditChercheurComponent,
  SemanticRelationshipChercheurComponent,
  TypeEtudeCreateChercheurComponent,
  TypeEtudeListChercheurComponent,
  TypeEtudeViewChercheurComponent,
  TypeEtudeEditChercheurComponent,
  TypeEtudeChercheurComponent,
  TemplateRappelCreateChercheurComponent,
  TemplateRappelListChercheurComponent,
  TemplateRappelViewChercheurComponent,
  TemplateRappelEditChercheurComponent,
  TemplateRappelChercheurComponent,
  FormatRencontreCreateChercheurComponent,
  FormatRencontreListChercheurComponent,
  FormatRencontreViewChercheurComponent,
  FormatRencontreEditChercheurComponent,
  FormatRencontreChercheurComponent,
  TypeReclamationCreateChercheurComponent,
  TypeReclamationListChercheurComponent,
  TypeReclamationViewChercheurComponent,
  TypeReclamationEditChercheurComponent,
  TypeReclamationChercheurComponent,
  CommissionScientifiqueCreateChercheurComponent,
  CommissionScientifiqueListChercheurComponent,
  CommissionScientifiqueViewChercheurComponent,
  CommissionScientifiqueEditChercheurComponent,
  CommissionScientifiqueChercheurComponent,
  SexeCreateChercheurComponent,
  SexeListChercheurComponent,
  SexeViewChercheurComponent,
  SexeEditChercheurComponent,
  SexeChercheurComponent,
  ],
  entryComponents: [],
})
export class ArchivableChercheurModule { }
