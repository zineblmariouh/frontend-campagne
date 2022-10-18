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

import { CaracterisationCreateAdminComponent } from './view/caracterisation-admin/create-admin/caracterisation-create-admin.component';
import { CaracterisationEditAdminComponent } from './view/caracterisation-admin/edit-admin/caracterisation-edit-admin.component';
import { CaracterisationViewAdminComponent } from './view/caracterisation-admin/view-admin/caracterisation-view-admin.component';
import { CaracterisationListAdminComponent } from './view/caracterisation-admin/list-admin/caracterisation-list-admin.component';
import { CaracterisationAdminComponent } from './view/caracterisation-admin/caracterisation-admin.component';

import { DepartementScientifiqueCreateAdminComponent } from './view/departement-scientifique-admin/create-admin/departement-scientifique-create-admin.component';
import { DepartementScientifiqueEditAdminComponent } from './view/departement-scientifique-admin/edit-admin/departement-scientifique-edit-admin.component';
import { DepartementScientifiqueViewAdminComponent } from './view/departement-scientifique-admin/view-admin/departement-scientifique-view-admin.component';
import { DepartementScientifiqueListAdminComponent } from './view/departement-scientifique-admin/list-admin/departement-scientifique-list-admin.component';
import { DepartementScientifiqueAdminComponent } from './view/departement-scientifique-admin/departement-scientifique-admin.component';

import { StructureIrdCreateAdminComponent } from './view/structure-ird-admin/create-admin/structure-ird-create-admin.component';
import { StructureIrdEditAdminComponent } from './view/structure-ird-admin/edit-admin/structure-ird-edit-admin.component';
import { StructureIrdViewAdminComponent } from './view/structure-ird-admin/view-admin/structure-ird-view-admin.component';
import { StructureIrdListAdminComponent } from './view/structure-ird-admin/list-admin/structure-ird-list-admin.component';
import { StructureIrdAdminComponent } from './view/structure-ird-admin/structure-ird-admin.component';

import { DisciplineScientifiqueErcAssociationCreateAdminComponent } from './view/discipline-scientifique-erc-association-admin/create-admin/discipline-scientifique-erc-association-create-admin.component';
import { DisciplineScientifiqueErcAssociationEditAdminComponent } from './view/discipline-scientifique-erc-association-admin/edit-admin/discipline-scientifique-erc-association-edit-admin.component';
import { DisciplineScientifiqueErcAssociationViewAdminComponent } from './view/discipline-scientifique-erc-association-admin/view-admin/discipline-scientifique-erc-association-view-admin.component';
import { DisciplineScientifiqueErcAssociationListAdminComponent } from './view/discipline-scientifique-erc-association-admin/list-admin/discipline-scientifique-erc-association-list-admin.component';
import { DisciplineScientifiqueErcAssociationAdminComponent } from './view/discipline-scientifique-erc-association-admin/discipline-scientifique-erc-association-admin.component';

import { TypeOutilCreateAdminComponent } from './view/type-outil-admin/create-admin/type-outil-create-admin.component';
import { TypeOutilEditAdminComponent } from './view/type-outil-admin/edit-admin/type-outil-edit-admin.component';
import { TypeOutilViewAdminComponent } from './view/type-outil-admin/view-admin/type-outil-view-admin.component';
import { TypeOutilListAdminComponent } from './view/type-outil-admin/list-admin/type-outil-list-admin.component';
import { TypeOutilAdminComponent } from './view/type-outil-admin/type-outil-admin.component';

import { TemplateOuvertureCreateAdminComponent } from './view/template-ouverture-admin/create-admin/template-ouverture-create-admin.component';
import { TemplateOuvertureEditAdminComponent } from './view/template-ouverture-admin/edit-admin/template-ouverture-edit-admin.component';
import { TemplateOuvertureViewAdminComponent } from './view/template-ouverture-admin/view-admin/template-ouverture-view-admin.component';
import { TemplateOuvertureListAdminComponent } from './view/template-ouverture-admin/list-admin/template-ouverture-list-admin.component';
import { TemplateOuvertureAdminComponent } from './view/template-ouverture-admin/template-ouverture-admin.component';

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

import { PubliqueCibleCreateAdminComponent } from './view/publique-cible-admin/create-admin/publique-cible-create-admin.component';
import { PubliqueCibleEditAdminComponent } from './view/publique-cible-admin/edit-admin/publique-cible-edit-admin.component';
import { PubliqueCibleViewAdminComponent } from './view/publique-cible-admin/view-admin/publique-cible-view-admin.component';
import { PubliqueCibleListAdminComponent } from './view/publique-cible-admin/list-admin/publique-cible-list-admin.component';
import { PubliqueCibleAdminComponent } from './view/publique-cible-admin/publique-cible-admin.component';

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

import { PubliqueProfessionelCreateAdminComponent } from './view/publique-professionel-admin/create-admin/publique-professionel-create-admin.component';
import { PubliqueProfessionelEditAdminComponent } from './view/publique-professionel-admin/edit-admin/publique-professionel-edit-admin.component';
import { PubliqueProfessionelViewAdminComponent } from './view/publique-professionel-admin/view-admin/publique-professionel-view-admin.component';
import { PubliqueProfessionelListAdminComponent } from './view/publique-professionel-admin/list-admin/publique-professionel-list-admin.component';
import { PubliqueProfessionelAdminComponent } from './view/publique-professionel-admin/publique-professionel-admin.component';

import { TypeEnseignementCreateAdminComponent } from './view/type-enseignement-admin/create-admin/type-enseignement-create-admin.component';
import { TypeEnseignementEditAdminComponent } from './view/type-enseignement-admin/edit-admin/type-enseignement-edit-admin.component';
import { TypeEnseignementViewAdminComponent } from './view/type-enseignement-admin/view-admin/type-enseignement-view-admin.component';
import { TypeEnseignementListAdminComponent } from './view/type-enseignement-admin/list-admin/type-enseignement-list-admin.component';
import { TypeEnseignementAdminComponent } from './view/type-enseignement-admin/type-enseignement-admin.component';

import { NationaliteCreateAdminComponent } from './view/nationalite-admin/create-admin/nationalite-create-admin.component';
import { NationaliteEditAdminComponent } from './view/nationalite-admin/edit-admin/nationalite-edit-admin.component';
import { NationaliteViewAdminComponent } from './view/nationalite-admin/view-admin/nationalite-view-admin.component';
import { NationaliteListAdminComponent } from './view/nationalite-admin/list-admin/nationalite-list-admin.component';
import { NationaliteAdminComponent } from './view/nationalite-admin/nationalite-admin.component';

import { EnjeuxIrdCreateAdminComponent } from './view/enjeux-ird-admin/create-admin/enjeux-ird-create-admin.component';
import { EnjeuxIrdEditAdminComponent } from './view/enjeux-ird-admin/edit-admin/enjeux-ird-edit-admin.component';
import { EnjeuxIrdViewAdminComponent } from './view/enjeux-ird-admin/view-admin/enjeux-ird-view-admin.component';
import { EnjeuxIrdListAdminComponent } from './view/enjeux-ird-admin/list-admin/enjeux-ird-list-admin.component';
import { EnjeuxIrdAdminComponent } from './view/enjeux-ird-admin/enjeux-ird-admin.component';

import { TypeExpertCreateAdminComponent } from './view/type-expert-admin/create-admin/type-expert-create-admin.component';
import { TypeExpertEditAdminComponent } from './view/type-expert-admin/edit-admin/type-expert-edit-admin.component';
import { TypeExpertViewAdminComponent } from './view/type-expert-admin/view-admin/type-expert-view-admin.component';
import { TypeExpertListAdminComponent } from './view/type-expert-admin/list-admin/type-expert-list-admin.component';
import { TypeExpertAdminComponent } from './view/type-expert-admin/type-expert-admin.component';

import { KeyWordCreateAdminComponent } from './view/key-word-admin/create-admin/key-word-create-admin.component';
import { KeyWordEditAdminComponent } from './view/key-word-admin/edit-admin/key-word-edit-admin.component';
import { KeyWordViewAdminComponent } from './view/key-word-admin/view-admin/key-word-view-admin.component';
import { KeyWordListAdminComponent } from './view/key-word-admin/list-admin/key-word-list-admin.component';
import { KeyWordAdminComponent } from './view/key-word-admin/key-word-admin.component';

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

import { CommanditaireCreateAdminComponent } from './view/commanditaire-admin/create-admin/commanditaire-create-admin.component';
import { CommanditaireEditAdminComponent } from './view/commanditaire-admin/edit-admin/commanditaire-edit-admin.component';
import { CommanditaireViewAdminComponent } from './view/commanditaire-admin/view-admin/commanditaire-view-admin.component';
import { CommanditaireListAdminComponent } from './view/commanditaire-admin/list-admin/commanditaire-list-admin.component';
import { CommanditaireAdminComponent } from './view/commanditaire-admin/commanditaire-admin.component';

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

import { TemplateRelanceCreateAdminComponent } from './view/template-relance-admin/create-admin/template-relance-create-admin.component';
import { TemplateRelanceEditAdminComponent } from './view/template-relance-admin/edit-admin/template-relance-edit-admin.component';
import { TemplateRelanceViewAdminComponent } from './view/template-relance-admin/view-admin/template-relance-view-admin.component';
import { TemplateRelanceListAdminComponent } from './view/template-relance-admin/list-admin/template-relance-list-admin.component';
import { TemplateRelanceAdminComponent } from './view/template-relance-admin/template-relance-admin.component';

import { TypeSavoirCreateAdminComponent } from './view/type-savoir-admin/create-admin/type-savoir-create-admin.component';
import { TypeSavoirEditAdminComponent } from './view/type-savoir-admin/edit-admin/type-savoir-edit-admin.component';
import { TypeSavoirViewAdminComponent } from './view/type-savoir-admin/view-admin/type-savoir-view-admin.component';
import { TypeSavoirListAdminComponent } from './view/type-savoir-admin/list-admin/type-savoir-list-admin.component';
import { TypeSavoirAdminComponent } from './view/type-savoir-admin/type-savoir-admin.component';

import { ModeDiffusionCreateAdminComponent } from './view/mode-diffusion-admin/create-admin/mode-diffusion-create-admin.component';
import { ModeDiffusionEditAdminComponent } from './view/mode-diffusion-admin/edit-admin/mode-diffusion-edit-admin.component';
import { ModeDiffusionViewAdminComponent } from './view/mode-diffusion-admin/view-admin/mode-diffusion-view-admin.component';
import { ModeDiffusionListAdminComponent } from './view/mode-diffusion-admin/list-admin/mode-diffusion-list-admin.component';
import { ModeDiffusionAdminComponent } from './view/mode-diffusion-admin/mode-diffusion-admin.component';

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

import { NatureEtudeCreateAdminComponent } from './view/nature-etude-admin/create-admin/nature-etude-create-admin.component';
import { NatureEtudeEditAdminComponent } from './view/nature-etude-admin/edit-admin/nature-etude-edit-admin.component';
import { NatureEtudeViewAdminComponent } from './view/nature-etude-admin/view-admin/nature-etude-view-admin.component';
import { NatureEtudeListAdminComponent } from './view/nature-etude-admin/list-admin/nature-etude-list-admin.component';
import { NatureEtudeAdminComponent } from './view/nature-etude-admin/nature-etude-admin.component';

import { InstitutionCreateAdminComponent } from './view/institution-admin/create-admin/institution-create-admin.component';
import { InstitutionEditAdminComponent } from './view/institution-admin/edit-admin/institution-edit-admin.component';
import { InstitutionViewAdminComponent } from './view/institution-admin/view-admin/institution-view-admin.component';
import { InstitutionListAdminComponent } from './view/institution-admin/list-admin/institution-list-admin.component';
import { InstitutionAdminComponent } from './view/institution-admin/institution-admin.component';

import { PubliqueFormationCreateAdminComponent } from './view/publique-formation-admin/create-admin/publique-formation-create-admin.component';
import { PubliqueFormationEditAdminComponent } from './view/publique-formation-admin/edit-admin/publique-formation-edit-admin.component';
import { PubliqueFormationViewAdminComponent } from './view/publique-formation-admin/view-admin/publique-formation-view-admin.component';
import { PubliqueFormationListAdminComponent } from './view/publique-formation-admin/list-admin/publique-formation-list-admin.component';
import { PubliqueFormationAdminComponent } from './view/publique-formation-admin/publique-formation-admin.component';

import { FinancementDoctorantCreateAdminComponent } from './view/financement-doctorant-admin/create-admin/financement-doctorant-create-admin.component';
import { FinancementDoctorantEditAdminComponent } from './view/financement-doctorant-admin/edit-admin/financement-doctorant-edit-admin.component';
import { FinancementDoctorantViewAdminComponent } from './view/financement-doctorant-admin/view-admin/financement-doctorant-view-admin.component';
import { FinancementDoctorantListAdminComponent } from './view/financement-doctorant-admin/list-admin/financement-doctorant-list-admin.component';
import { FinancementDoctorantAdminComponent } from './view/financement-doctorant-admin/financement-doctorant-admin.component';

import { VilleCreateAdminComponent } from './view/ville-admin/create-admin/ville-create-admin.component';
import { VilleEditAdminComponent } from './view/ville-admin/edit-admin/ville-edit-admin.component';
import { VilleViewAdminComponent } from './view/ville-admin/view-admin/ville-view-admin.component';
import { VilleListAdminComponent } from './view/ville-admin/list-admin/ville-list-admin.component';
import { VilleAdminComponent } from './view/ville-admin/ville-admin.component';

import { EntiteAdministrativeCreateAdminComponent } from './view/entite-administrative-admin/create-admin/entite-administrative-create-admin.component';
import { EntiteAdministrativeEditAdminComponent } from './view/entite-administrative-admin/edit-admin/entite-administrative-edit-admin.component';
import { EntiteAdministrativeViewAdminComponent } from './view/entite-administrative-admin/view-admin/entite-administrative-view-admin.component';
import { EntiteAdministrativeListAdminComponent } from './view/entite-administrative-admin/list-admin/entite-administrative-list-admin.component';
import { EntiteAdministrativeAdminComponent } from './view/entite-administrative-admin/entite-administrative-admin.component';

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

import { MasterInternationalCreateAdminComponent } from './view/master-international-admin/create-admin/master-international-create-admin.component';
import { MasterInternationalEditAdminComponent } from './view/master-international-admin/edit-admin/master-international-edit-admin.component';
import { MasterInternationalViewAdminComponent } from './view/master-international-admin/view-admin/master-international-view-admin.component';
import { MasterInternationalListAdminComponent } from './view/master-international-admin/list-admin/master-international-list-admin.component';
import { MasterInternationalAdminComponent } from './view/master-international-admin/master-international-admin.component';

import { TypeExpertiseEvaluationCreateAdminComponent } from './view/type-expertise-evaluation-admin/create-admin/type-expertise-evaluation-create-admin.component';
import { TypeExpertiseEvaluationEditAdminComponent } from './view/type-expertise-evaluation-admin/edit-admin/type-expertise-evaluation-edit-admin.component';
import { TypeExpertiseEvaluationViewAdminComponent } from './view/type-expertise-evaluation-admin/view-admin/type-expertise-evaluation-view-admin.component';
import { TypeExpertiseEvaluationListAdminComponent } from './view/type-expertise-evaluation-admin/list-admin/type-expertise-evaluation-list-admin.component';
import { TypeExpertiseEvaluationAdminComponent } from './view/type-expertise-evaluation-admin/type-expertise-evaluation-admin.component';

import { EtudiantCreateAdminComponent } from './view/etudiant-admin/create-admin/etudiant-create-admin.component';
import { EtudiantEditAdminComponent } from './view/etudiant-admin/edit-admin/etudiant-edit-admin.component';
import { EtudiantViewAdminComponent } from './view/etudiant-admin/view-admin/etudiant-view-admin.component';
import { EtudiantListAdminComponent } from './view/etudiant-admin/list-admin/etudiant-list-admin.component';
import { EtudiantAdminComponent } from './view/etudiant-admin/etudiant-admin.component';

import { ModaliteCreateAdminComponent } from './view/modalite-admin/create-admin/modalite-create-admin.component';
import { ModaliteEditAdminComponent } from './view/modalite-admin/edit-admin/modalite-edit-admin.component';
import { ModaliteViewAdminComponent } from './view/modalite-admin/view-admin/modalite-view-admin.component';
import { ModaliteListAdminComponent } from './view/modalite-admin/list-admin/modalite-list-admin.component';
import { ModaliteAdminComponent } from './view/modalite-admin/modalite-admin.component';

import { ModaliteFormationContinueCreateAdminComponent } from './view/modalite-formation-continue-admin/create-admin/modalite-formation-continue-create-admin.component';
import { ModaliteFormationContinueEditAdminComponent } from './view/modalite-formation-continue-admin/edit-admin/modalite-formation-continue-edit-admin.component';
import { ModaliteFormationContinueViewAdminComponent } from './view/modalite-formation-continue-admin/view-admin/modalite-formation-continue-view-admin.component';
import { ModaliteFormationContinueListAdminComponent } from './view/modalite-formation-continue-admin/list-admin/modalite-formation-continue-list-admin.component';
import { ModaliteFormationContinueAdminComponent } from './view/modalite-formation-continue-admin/modalite-formation-continue-admin.component';

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

import { TemplateClotureCreateAdminComponent } from './view/template-cloture-admin/create-admin/template-cloture-create-admin.component';
import { TemplateClotureEditAdminComponent } from './view/template-cloture-admin/edit-admin/template-cloture-edit-admin.component';
import { TemplateClotureViewAdminComponent } from './view/template-cloture-admin/view-admin/template-cloture-view-admin.component';
import { TemplateClotureListAdminComponent } from './view/template-cloture-admin/list-admin/template-cloture-list-admin.component';
import { TemplateClotureAdminComponent } from './view/template-cloture-admin/template-cloture-admin.component';

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

import { ModaliteInterventionCreateAdminComponent } from './view/modalite-intervention-admin/create-admin/modalite-intervention-create-admin.component';
import { ModaliteInterventionEditAdminComponent } from './view/modalite-intervention-admin/edit-admin/modalite-intervention-edit-admin.component';
import { ModaliteInterventionViewAdminComponent } from './view/modalite-intervention-admin/view-admin/modalite-intervention-view-admin.component';
import { ModaliteInterventionListAdminComponent } from './view/modalite-intervention-admin/list-admin/modalite-intervention-list-admin.component';
import { ModaliteInterventionAdminComponent } from './view/modalite-intervention-admin/modalite-intervention-admin.component';

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

import { TypeExpertiseCreateAdminComponent } from './view/type-expertise-admin/create-admin/type-expertise-create-admin.component';
import { TypeExpertiseEditAdminComponent } from './view/type-expertise-admin/edit-admin/type-expertise-edit-admin.component';
import { TypeExpertiseViewAdminComponent } from './view/type-expertise-admin/view-admin/type-expertise-view-admin.component';
import { TypeExpertiseListAdminComponent } from './view/type-expertise-admin/list-admin/type-expertise-list-admin.component';
import { TypeExpertiseAdminComponent } from './view/type-expertise-admin/type-expertise-admin.component';

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

import { SemanticRelationshipCreateAdminComponent } from './view/semantic-relationship-admin/create-admin/semantic-relationship-create-admin.component';
import { SemanticRelationshipEditAdminComponent } from './view/semantic-relationship-admin/edit-admin/semantic-relationship-edit-admin.component';
import { SemanticRelationshipViewAdminComponent } from './view/semantic-relationship-admin/view-admin/semantic-relationship-view-admin.component';
import { SemanticRelationshipListAdminComponent } from './view/semantic-relationship-admin/list-admin/semantic-relationship-list-admin.component';
import { SemanticRelationshipAdminComponent } from './view/semantic-relationship-admin/semantic-relationship-admin.component';

import { TypeEtudeCreateAdminComponent } from './view/type-etude-admin/create-admin/type-etude-create-admin.component';
import { TypeEtudeEditAdminComponent } from './view/type-etude-admin/edit-admin/type-etude-edit-admin.component';
import { TypeEtudeViewAdminComponent } from './view/type-etude-admin/view-admin/type-etude-view-admin.component';
import { TypeEtudeListAdminComponent } from './view/type-etude-admin/list-admin/type-etude-list-admin.component';
import { TypeEtudeAdminComponent } from './view/type-etude-admin/type-etude-admin.component';

import { TemplateRappelCreateAdminComponent } from './view/template-rappel-admin/create-admin/template-rappel-create-admin.component';
import { TemplateRappelEditAdminComponent } from './view/template-rappel-admin/edit-admin/template-rappel-edit-admin.component';
import { TemplateRappelViewAdminComponent } from './view/template-rappel-admin/view-admin/template-rappel-view-admin.component';
import { TemplateRappelListAdminComponent } from './view/template-rappel-admin/list-admin/template-rappel-list-admin.component';
import { TemplateRappelAdminComponent } from './view/template-rappel-admin/template-rappel-admin.component';

import { FormatRencontreCreateAdminComponent } from './view/format-rencontre-admin/create-admin/format-rencontre-create-admin.component';
import { FormatRencontreEditAdminComponent } from './view/format-rencontre-admin/edit-admin/format-rencontre-edit-admin.component';
import { FormatRencontreViewAdminComponent } from './view/format-rencontre-admin/view-admin/format-rencontre-view-admin.component';
import { FormatRencontreListAdminComponent } from './view/format-rencontre-admin/list-admin/format-rencontre-list-admin.component';
import { FormatRencontreAdminComponent } from './view/format-rencontre-admin/format-rencontre-admin.component';

import { TypeReclamationCreateAdminComponent } from './view/type-reclamation-admin/create-admin/type-reclamation-create-admin.component';
import { TypeReclamationEditAdminComponent } from './view/type-reclamation-admin/edit-admin/type-reclamation-edit-admin.component';
import { TypeReclamationViewAdminComponent } from './view/type-reclamation-admin/view-admin/type-reclamation-view-admin.component';
import { TypeReclamationListAdminComponent } from './view/type-reclamation-admin/list-admin/type-reclamation-list-admin.component';
import { TypeReclamationAdminComponent } from './view/type-reclamation-admin/type-reclamation-admin.component';

import { CommissionScientifiqueCreateAdminComponent } from './view/commission-scientifique-admin/create-admin/commission-scientifique-create-admin.component';
import { CommissionScientifiqueEditAdminComponent } from './view/commission-scientifique-admin/edit-admin/commission-scientifique-edit-admin.component';
import { CommissionScientifiqueViewAdminComponent } from './view/commission-scientifique-admin/view-admin/commission-scientifique-view-admin.component';
import { CommissionScientifiqueListAdminComponent } from './view/commission-scientifique-admin/list-admin/commission-scientifique-list-admin.component';
import { CommissionScientifiqueAdminComponent } from './view/commission-scientifique-admin/commission-scientifique-admin.component';

import { SexeCreateAdminComponent } from './view/sexe-admin/create-admin/sexe-create-admin.component';
import { SexeEditAdminComponent } from './view/sexe-admin/edit-admin/sexe-edit-admin.component';
import { SexeViewAdminComponent } from './view/sexe-admin/view-admin/sexe-view-admin.component';
import { SexeListAdminComponent } from './view/sexe-admin/list-admin/sexe-list-admin.component';
import { SexeAdminComponent } from './view/sexe-admin/sexe-admin.component';

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

    KeyWordDisciplineScientifiqueErcCreateAdminComponent,
    KeyWordDisciplineScientifiqueErcListAdminComponent,
    KeyWordDisciplineScientifiqueErcViewAdminComponent,
    KeyWordDisciplineScientifiqueErcEditAdminComponent,
    KeyWordDisciplineScientifiqueErcAdminComponent,
    GradeCreateAdminComponent,
    GradeListAdminComponent,
    GradeViewAdminComponent,
    GradeEditAdminComponent,
    GradeAdminComponent,
    DoctorantCreateAdminComponent,
    DoctorantListAdminComponent,
    DoctorantViewAdminComponent,
    DoctorantEditAdminComponent,
    DoctorantAdminComponent,
    ResponsabiliteEncadrementDoctorantCreateAdminComponent,
    ResponsabiliteEncadrementDoctorantListAdminComponent,
    ResponsabiliteEncadrementDoctorantViewAdminComponent,
    ResponsabiliteEncadrementDoctorantEditAdminComponent,
    ResponsabiliteEncadrementDoctorantAdminComponent,
    RoleProjetCreateAdminComponent,
    RoleProjetListAdminComponent,
    RoleProjetViewAdminComponent,
    RoleProjetEditAdminComponent,
    RoleProjetAdminComponent,
    DisciplineScientifiqueCreateAdminComponent,
    DisciplineScientifiqueListAdminComponent,
    DisciplineScientifiqueViewAdminComponent,
    DisciplineScientifiqueEditAdminComponent,
    DisciplineScientifiqueAdminComponent,
    DisciplineScientifiqueErcParentCreateAdminComponent,
    DisciplineScientifiqueErcParentListAdminComponent,
    DisciplineScientifiqueErcParentViewAdminComponent,
    DisciplineScientifiqueErcParentEditAdminComponent,
    DisciplineScientifiqueErcParentAdminComponent,
    ResponsabiliteDirectionEncadrementEtudiantCreateAdminComponent,
    ResponsabiliteDirectionEncadrementEtudiantListAdminComponent,
    ResponsabiliteDirectionEncadrementEtudiantViewAdminComponent,
    ResponsabiliteDirectionEncadrementEtudiantEditAdminComponent,
    ResponsabiliteDirectionEncadrementEtudiantAdminComponent,
    CaracterisationCreateAdminComponent,
    CaracterisationListAdminComponent,
    CaracterisationViewAdminComponent,
    CaracterisationEditAdminComponent,
    CaracterisationAdminComponent,
    DepartementScientifiqueCreateAdminComponent,
    DepartementScientifiqueListAdminComponent,
    DepartementScientifiqueViewAdminComponent,
    DepartementScientifiqueEditAdminComponent,
    DepartementScientifiqueAdminComponent,
    StructureIrdCreateAdminComponent,
    StructureIrdListAdminComponent,
    StructureIrdViewAdminComponent,
    StructureIrdEditAdminComponent,
    StructureIrdAdminComponent,
    DisciplineScientifiqueErcAssociationCreateAdminComponent,
    DisciplineScientifiqueErcAssociationListAdminComponent,
    DisciplineScientifiqueErcAssociationViewAdminComponent,
    DisciplineScientifiqueErcAssociationEditAdminComponent,
    DisciplineScientifiqueErcAssociationAdminComponent,
    TypeOutilCreateAdminComponent,
    TypeOutilListAdminComponent,
    TypeOutilViewAdminComponent,
    TypeOutilEditAdminComponent,
    TypeOutilAdminComponent,
    TemplateOuvertureCreateAdminComponent,
    TemplateOuvertureListAdminComponent,
    TemplateOuvertureViewAdminComponent,
    TemplateOuvertureEditAdminComponent,
    TemplateOuvertureAdminComponent,
    NatureExpertiseCreateAdminComponent,
    NatureExpertiseListAdminComponent,
    NatureExpertiseViewAdminComponent,
    NatureExpertiseEditAdminComponent,
    NatureExpertiseAdminComponent,
    ObjetFormationGeneriqueCreateAdminComponent,
    ObjetFormationGeneriqueListAdminComponent,
    ObjetFormationGeneriqueViewAdminComponent,
    ObjetFormationGeneriqueEditAdminComponent,
    ObjetFormationGeneriqueAdminComponent,
    PubliqueCibleCreateAdminComponent,
    PubliqueCibleListAdminComponent,
    PubliqueCibleViewAdminComponent,
    PubliqueCibleEditAdminComponent,
    PubliqueCibleAdminComponent,
    EtablissementProjetCreateAdminComponent,
    EtablissementProjetListAdminComponent,
    EtablissementProjetViewAdminComponent,
    EtablissementProjetEditAdminComponent,
    EtablissementProjetAdminComponent,
    StatusProjetCreateAdminComponent,
    StatusProjetListAdminComponent,
    StatusProjetViewAdminComponent,
    StatusProjetEditAdminComponent,
    StatusProjetAdminComponent,
    PubliqueProfessionelCreateAdminComponent,
    PubliqueProfessionelListAdminComponent,
    PubliqueProfessionelViewAdminComponent,
    PubliqueProfessionelEditAdminComponent,
    PubliqueProfessionelAdminComponent,
    TypeEnseignementCreateAdminComponent,
    TypeEnseignementListAdminComponent,
    TypeEnseignementViewAdminComponent,
    TypeEnseignementEditAdminComponent,
    TypeEnseignementAdminComponent,
    NationaliteCreateAdminComponent,
    NationaliteListAdminComponent,
    NationaliteViewAdminComponent,
    NationaliteEditAdminComponent,
    NationaliteAdminComponent,
    EnjeuxIrdCreateAdminComponent,
    EnjeuxIrdListAdminComponent,
    EnjeuxIrdViewAdminComponent,
    EnjeuxIrdEditAdminComponent,
    EnjeuxIrdAdminComponent,
    TypeExpertCreateAdminComponent,
    TypeExpertListAdminComponent,
    TypeExpertViewAdminComponent,
    TypeExpertEditAdminComponent,
    TypeExpertAdminComponent,
    KeyWordCreateAdminComponent,
    KeyWordListAdminComponent,
    KeyWordViewAdminComponent,
    KeyWordEditAdminComponent,
    KeyWordAdminComponent,
    PaysCreateAdminComponent,
    PaysListAdminComponent,
    PaysViewAdminComponent,
    PaysEditAdminComponent,
    PaysAdminComponent,
    NatureEnseignementCreateAdminComponent,
    NatureEnseignementListAdminComponent,
    NatureEnseignementViewAdminComponent,
    NatureEnseignementEditAdminComponent,
    NatureEnseignementAdminComponent,
    ContexteCreateAdminComponent,
    ContexteListAdminComponent,
    ContexteViewAdminComponent,
    ContexteEditAdminComponent,
    ContexteAdminComponent,
    CommanditaireCreateAdminComponent,
    CommanditaireListAdminComponent,
    CommanditaireViewAdminComponent,
    CommanditaireEditAdminComponent,
    CommanditaireAdminComponent,
    CommunauteSavoirCreateAdminComponent,
    CommunauteSavoirListAdminComponent,
    CommunauteSavoirViewAdminComponent,
    CommunauteSavoirEditAdminComponent,
    CommunauteSavoirAdminComponent,
    NiveauFormationPostBacCreateAdminComponent,
    NiveauFormationPostBacListAdminComponent,
    NiveauFormationPostBacViewAdminComponent,
    NiveauFormationPostBacEditAdminComponent,
    NiveauFormationPostBacAdminComponent,
    TemplateRelanceCreateAdminComponent,
    TemplateRelanceListAdminComponent,
    TemplateRelanceViewAdminComponent,
    TemplateRelanceEditAdminComponent,
    TemplateRelanceAdminComponent,
    TypeSavoirCreateAdminComponent,
    TypeSavoirListAdminComponent,
    TypeSavoirViewAdminComponent,
    TypeSavoirEditAdminComponent,
    TypeSavoirAdminComponent,
    ModeDiffusionCreateAdminComponent,
    ModeDiffusionListAdminComponent,
    ModeDiffusionViewAdminComponent,
    ModeDiffusionEditAdminComponent,
    ModeDiffusionAdminComponent,
    CorpsCreateAdminComponent,
    CorpsListAdminComponent,
    CorpsViewAdminComponent,
    CorpsEditAdminComponent,
    CorpsAdminComponent,
    ZoneGeographiqueCreateAdminComponent,
    ZoneGeographiqueListAdminComponent,
    ZoneGeographiqueViewAdminComponent,
    ZoneGeographiqueEditAdminComponent,
    ZoneGeographiqueAdminComponent,
    InstrumentIrdCreateAdminComponent,
    InstrumentIrdListAdminComponent,
    InstrumentIrdViewAdminComponent,
    InstrumentIrdEditAdminComponent,
    InstrumentIrdAdminComponent,
    NatureEtudeCreateAdminComponent,
    NatureEtudeListAdminComponent,
    NatureEtudeViewAdminComponent,
    NatureEtudeEditAdminComponent,
    NatureEtudeAdminComponent,
    InstitutionCreateAdminComponent,
    InstitutionListAdminComponent,
    InstitutionViewAdminComponent,
    InstitutionEditAdminComponent,
    InstitutionAdminComponent,
    PubliqueFormationCreateAdminComponent,
    PubliqueFormationListAdminComponent,
    PubliqueFormationViewAdminComponent,
    PubliqueFormationEditAdminComponent,
    PubliqueFormationAdminComponent,
    FinancementDoctorantCreateAdminComponent,
    FinancementDoctorantListAdminComponent,
    FinancementDoctorantViewAdminComponent,
    FinancementDoctorantEditAdminComponent,
    FinancementDoctorantAdminComponent,
    VilleCreateAdminComponent,
    VilleListAdminComponent,
    VilleViewAdminComponent,
    VilleEditAdminComponent,
    VilleAdminComponent,
    EntiteAdministrativeCreateAdminComponent,
    EntiteAdministrativeListAdminComponent,
    EntiteAdministrativeViewAdminComponent,
    EntiteAdministrativeEditAdminComponent,
    EntiteAdministrativeAdminComponent,
    EtablissementCreateAdminComponent,
    EtablissementListAdminComponent,
    EtablissementViewAdminComponent,
    EtablissementEditAdminComponent,
    EtablissementAdminComponent,
    DisciplineScientifiqueParentCreateAdminComponent,
    DisciplineScientifiqueParentListAdminComponent,
    DisciplineScientifiqueParentViewAdminComponent,
    DisciplineScientifiqueParentEditAdminComponent,
    DisciplineScientifiqueParentAdminComponent,
    MasterInternationalCreateAdminComponent,
    MasterInternationalListAdminComponent,
    MasterInternationalViewAdminComponent,
    MasterInternationalEditAdminComponent,
    MasterInternationalAdminComponent,
    TypeExpertiseEvaluationCreateAdminComponent,
    TypeExpertiseEvaluationListAdminComponent,
    TypeExpertiseEvaluationViewAdminComponent,
    TypeExpertiseEvaluationEditAdminComponent,
    TypeExpertiseEvaluationAdminComponent,
    EtudiantCreateAdminComponent,
    EtudiantListAdminComponent,
    EtudiantViewAdminComponent,
    EtudiantEditAdminComponent,
    EtudiantAdminComponent,
    ModaliteCreateAdminComponent,
    ModaliteListAdminComponent,
    ModaliteViewAdminComponent,
    ModaliteEditAdminComponent,
    ModaliteAdminComponent,
    ModaliteFormationContinueCreateAdminComponent,
    ModaliteFormationContinueListAdminComponent,
    ModaliteFormationContinueViewAdminComponent,
    ModaliteFormationContinueEditAdminComponent,
    ModaliteFormationContinueAdminComponent,
    TypeEntiteAdministrativeCreateAdminComponent,
    TypeEntiteAdministrativeListAdminComponent,
    TypeEntiteAdministrativeViewAdminComponent,
    TypeEntiteAdministrativeEditAdminComponent,
    TypeEntiteAdministrativeAdminComponent,
    TypeUtilisateurCreateAdminComponent,
    TypeUtilisateurListAdminComponent,
    TypeUtilisateurViewAdminComponent,
    TypeUtilisateurEditAdminComponent,
    TypeUtilisateurAdminComponent,
    TypeInstrumentIrdCreateAdminComponent,
    TypeInstrumentIrdListAdminComponent,
    TypeInstrumentIrdViewAdminComponent,
    TypeInstrumentIrdEditAdminComponent,
    TypeInstrumentIrdAdminComponent,
    EtablissementPartenaireCreateAdminComponent,
    EtablissementPartenaireListAdminComponent,
    EtablissementPartenaireViewAdminComponent,
    EtablissementPartenaireEditAdminComponent,
    EtablissementPartenaireAdminComponent,
    ModaliteEtudeCreateAdminComponent,
    ModaliteEtudeListAdminComponent,
    ModaliteEtudeViewAdminComponent,
    ModaliteEtudeEditAdminComponent,
    ModaliteEtudeAdminComponent,
    TemplateClotureCreateAdminComponent,
    TemplateClotureListAdminComponent,
    TemplateClotureViewAdminComponent,
    TemplateClotureEditAdminComponent,
    TemplateClotureAdminComponent,
    TypePubliqueCultureScientifiqueCreateAdminComponent,
    TypePubliqueCultureScientifiqueListAdminComponent,
    TypePubliqueCultureScientifiqueViewAdminComponent,
    TypePubliqueCultureScientifiqueEditAdminComponent,
    TypePubliqueCultureScientifiqueAdminComponent,
    StatusCursusCreateAdminComponent,
    StatusCursusListAdminComponent,
    StatusCursusViewAdminComponent,
    StatusCursusEditAdminComponent,
    StatusCursusAdminComponent,
    CategorieFaqCreateAdminComponent,
    CategorieFaqListAdminComponent,
    CategorieFaqViewAdminComponent,
    CategorieFaqEditAdminComponent,
    CategorieFaqAdminComponent,
    IdentifiantRechercheCreateAdminComponent,
    IdentifiantRechercheListAdminComponent,
    IdentifiantRechercheViewAdminComponent,
    IdentifiantRechercheEditAdminComponent,
    IdentifiantRechercheAdminComponent,
    ModaliteInterventionCreateAdminComponent,
    ModaliteInterventionListAdminComponent,
    ModaliteInterventionViewAdminComponent,
    ModaliteInterventionEditAdminComponent,
    ModaliteInterventionAdminComponent,
    DisciplineScientifiqueErcCreateAdminComponent,
    DisciplineScientifiqueErcListAdminComponent,
    DisciplineScientifiqueErcViewAdminComponent,
    DisciplineScientifiqueErcEditAdminComponent,
    DisciplineScientifiqueErcAdminComponent,
    TypeInstanceCreateAdminComponent,
    TypeInstanceListAdminComponent,
    TypeInstanceViewAdminComponent,
    TypeInstanceEditAdminComponent,
    TypeInstanceAdminComponent,
    NiveauFormationCreateAdminComponent,
    NiveauFormationListAdminComponent,
    NiveauFormationViewAdminComponent,
    NiveauFormationEditAdminComponent,
    NiveauFormationAdminComponent,
    FournisseurAppelProjetRechercheCreateAdminComponent,
    FournisseurAppelProjetRechercheListAdminComponent,
    FournisseurAppelProjetRechercheViewAdminComponent,
    FournisseurAppelProjetRechercheEditAdminComponent,
    FournisseurAppelProjetRechercheAdminComponent,
    TypeExpertiseCreateAdminComponent,
    TypeExpertiseListAdminComponent,
    TypeExpertiseViewAdminComponent,
    TypeExpertiseEditAdminComponent,
    TypeExpertiseAdminComponent,
    NiveauEtudeCreateAdminComponent,
    NiveauEtudeListAdminComponent,
    NiveauEtudeViewAdminComponent,
    NiveauEtudeEditAdminComponent,
    NiveauEtudeAdminComponent,
    RoleEvaluationCreateAdminComponent,
    RoleEvaluationListAdminComponent,
    RoleEvaluationViewAdminComponent,
    RoleEvaluationEditAdminComponent,
    RoleEvaluationAdminComponent,
    SemanticRelationshipCreateAdminComponent,
    SemanticRelationshipListAdminComponent,
    SemanticRelationshipViewAdminComponent,
    SemanticRelationshipEditAdminComponent,
    SemanticRelationshipAdminComponent,
    TypeEtudeCreateAdminComponent,
    TypeEtudeListAdminComponent,
    TypeEtudeViewAdminComponent,
    TypeEtudeEditAdminComponent,
    TypeEtudeAdminComponent,
    TemplateRappelCreateAdminComponent,
    TemplateRappelListAdminComponent,
    TemplateRappelViewAdminComponent,
    TemplateRappelEditAdminComponent,
    TemplateRappelAdminComponent,
    FormatRencontreCreateAdminComponent,
    FormatRencontreListAdminComponent,
    FormatRencontreViewAdminComponent,
    FormatRencontreEditAdminComponent,
    FormatRencontreAdminComponent,
    TypeReclamationCreateAdminComponent,
    TypeReclamationListAdminComponent,
    TypeReclamationViewAdminComponent,
    TypeReclamationEditAdminComponent,
    TypeReclamationAdminComponent,
    CommissionScientifiqueCreateAdminComponent,
    CommissionScientifiqueListAdminComponent,
    CommissionScientifiqueViewAdminComponent,
    CommissionScientifiqueEditAdminComponent,
    CommissionScientifiqueAdminComponent,
    SexeCreateAdminComponent,
    SexeListAdminComponent,
    SexeViewAdminComponent,
    SexeEditAdminComponent,
    SexeAdminComponent,
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
  KeyWordDisciplineScientifiqueErcCreateAdminComponent,
  KeyWordDisciplineScientifiqueErcListAdminComponent,
  KeyWordDisciplineScientifiqueErcViewAdminComponent,
  KeyWordDisciplineScientifiqueErcEditAdminComponent,
  KeyWordDisciplineScientifiqueErcAdminComponent,
  GradeCreateAdminComponent,
  GradeListAdminComponent,
  GradeViewAdminComponent,
  GradeEditAdminComponent,
  GradeAdminComponent,
  DoctorantCreateAdminComponent,
  DoctorantListAdminComponent,
  DoctorantViewAdminComponent,
  DoctorantEditAdminComponent,
  DoctorantAdminComponent,
  ResponsabiliteEncadrementDoctorantCreateAdminComponent,
  ResponsabiliteEncadrementDoctorantListAdminComponent,
  ResponsabiliteEncadrementDoctorantViewAdminComponent,
  ResponsabiliteEncadrementDoctorantEditAdminComponent,
  ResponsabiliteEncadrementDoctorantAdminComponent,
  RoleProjetCreateAdminComponent,
  RoleProjetListAdminComponent,
  RoleProjetViewAdminComponent,
  RoleProjetEditAdminComponent,
  RoleProjetAdminComponent,
  DisciplineScientifiqueCreateAdminComponent,
  DisciplineScientifiqueListAdminComponent,
  DisciplineScientifiqueViewAdminComponent,
  DisciplineScientifiqueEditAdminComponent,
  DisciplineScientifiqueAdminComponent,
  DisciplineScientifiqueErcParentCreateAdminComponent,
  DisciplineScientifiqueErcParentListAdminComponent,
  DisciplineScientifiqueErcParentViewAdminComponent,
  DisciplineScientifiqueErcParentEditAdminComponent,
  DisciplineScientifiqueErcParentAdminComponent,
  ResponsabiliteDirectionEncadrementEtudiantCreateAdminComponent,
  ResponsabiliteDirectionEncadrementEtudiantListAdminComponent,
  ResponsabiliteDirectionEncadrementEtudiantViewAdminComponent,
  ResponsabiliteDirectionEncadrementEtudiantEditAdminComponent,
  ResponsabiliteDirectionEncadrementEtudiantAdminComponent,
  CaracterisationCreateAdminComponent,
  CaracterisationListAdminComponent,
  CaracterisationViewAdminComponent,
  CaracterisationEditAdminComponent,
  CaracterisationAdminComponent,
  DepartementScientifiqueCreateAdminComponent,
  DepartementScientifiqueListAdminComponent,
  DepartementScientifiqueViewAdminComponent,
  DepartementScientifiqueEditAdminComponent,
  DepartementScientifiqueAdminComponent,
  StructureIrdCreateAdminComponent,
  StructureIrdListAdminComponent,
  StructureIrdViewAdminComponent,
  StructureIrdEditAdminComponent,
  StructureIrdAdminComponent,
  DisciplineScientifiqueErcAssociationCreateAdminComponent,
  DisciplineScientifiqueErcAssociationListAdminComponent,
  DisciplineScientifiqueErcAssociationViewAdminComponent,
  DisciplineScientifiqueErcAssociationEditAdminComponent,
  DisciplineScientifiqueErcAssociationAdminComponent,
  TypeOutilCreateAdminComponent,
  TypeOutilListAdminComponent,
  TypeOutilViewAdminComponent,
  TypeOutilEditAdminComponent,
  TypeOutilAdminComponent,
  TemplateOuvertureCreateAdminComponent,
  TemplateOuvertureListAdminComponent,
  TemplateOuvertureViewAdminComponent,
  TemplateOuvertureEditAdminComponent,
  TemplateOuvertureAdminComponent,
  NatureExpertiseCreateAdminComponent,
  NatureExpertiseListAdminComponent,
  NatureExpertiseViewAdminComponent,
  NatureExpertiseEditAdminComponent,
  NatureExpertiseAdminComponent,
  ObjetFormationGeneriqueCreateAdminComponent,
  ObjetFormationGeneriqueListAdminComponent,
  ObjetFormationGeneriqueViewAdminComponent,
  ObjetFormationGeneriqueEditAdminComponent,
  ObjetFormationGeneriqueAdminComponent,
  PubliqueCibleCreateAdminComponent,
  PubliqueCibleListAdminComponent,
  PubliqueCibleViewAdminComponent,
  PubliqueCibleEditAdminComponent,
  PubliqueCibleAdminComponent,
  EtablissementProjetCreateAdminComponent,
  EtablissementProjetListAdminComponent,
  EtablissementProjetViewAdminComponent,
  EtablissementProjetEditAdminComponent,
  EtablissementProjetAdminComponent,
  StatusProjetCreateAdminComponent,
  StatusProjetListAdminComponent,
  StatusProjetViewAdminComponent,
  StatusProjetEditAdminComponent,
  StatusProjetAdminComponent,
  PubliqueProfessionelCreateAdminComponent,
  PubliqueProfessionelListAdminComponent,
  PubliqueProfessionelViewAdminComponent,
  PubliqueProfessionelEditAdminComponent,
  PubliqueProfessionelAdminComponent,
  TypeEnseignementCreateAdminComponent,
  TypeEnseignementListAdminComponent,
  TypeEnseignementViewAdminComponent,
  TypeEnseignementEditAdminComponent,
  TypeEnseignementAdminComponent,
  NationaliteCreateAdminComponent,
  NationaliteListAdminComponent,
  NationaliteViewAdminComponent,
  NationaliteEditAdminComponent,
  NationaliteAdminComponent,
  EnjeuxIrdCreateAdminComponent,
  EnjeuxIrdListAdminComponent,
  EnjeuxIrdViewAdminComponent,
  EnjeuxIrdEditAdminComponent,
  EnjeuxIrdAdminComponent,
  TypeExpertCreateAdminComponent,
  TypeExpertListAdminComponent,
  TypeExpertViewAdminComponent,
  TypeExpertEditAdminComponent,
  TypeExpertAdminComponent,
  KeyWordCreateAdminComponent,
  KeyWordListAdminComponent,
  KeyWordViewAdminComponent,
  KeyWordEditAdminComponent,
  KeyWordAdminComponent,
  PaysCreateAdminComponent,
  PaysListAdminComponent,
  PaysViewAdminComponent,
  PaysEditAdminComponent,
  PaysAdminComponent,
  NatureEnseignementCreateAdminComponent,
  NatureEnseignementListAdminComponent,
  NatureEnseignementViewAdminComponent,
  NatureEnseignementEditAdminComponent,
  NatureEnseignementAdminComponent,
  ContexteCreateAdminComponent,
  ContexteListAdminComponent,
  ContexteViewAdminComponent,
  ContexteEditAdminComponent,
  ContexteAdminComponent,
  CommanditaireCreateAdminComponent,
  CommanditaireListAdminComponent,
  CommanditaireViewAdminComponent,
  CommanditaireEditAdminComponent,
  CommanditaireAdminComponent,
  CommunauteSavoirCreateAdminComponent,
  CommunauteSavoirListAdminComponent,
  CommunauteSavoirViewAdminComponent,
  CommunauteSavoirEditAdminComponent,
  CommunauteSavoirAdminComponent,
  NiveauFormationPostBacCreateAdminComponent,
  NiveauFormationPostBacListAdminComponent,
  NiveauFormationPostBacViewAdminComponent,
  NiveauFormationPostBacEditAdminComponent,
  NiveauFormationPostBacAdminComponent,
  TemplateRelanceCreateAdminComponent,
  TemplateRelanceListAdminComponent,
  TemplateRelanceViewAdminComponent,
  TemplateRelanceEditAdminComponent,
  TemplateRelanceAdminComponent,
  TypeSavoirCreateAdminComponent,
  TypeSavoirListAdminComponent,
  TypeSavoirViewAdminComponent,
  TypeSavoirEditAdminComponent,
  TypeSavoirAdminComponent,
  ModeDiffusionCreateAdminComponent,
  ModeDiffusionListAdminComponent,
  ModeDiffusionViewAdminComponent,
  ModeDiffusionEditAdminComponent,
  ModeDiffusionAdminComponent,
  CorpsCreateAdminComponent,
  CorpsListAdminComponent,
  CorpsViewAdminComponent,
  CorpsEditAdminComponent,
  CorpsAdminComponent,
  ZoneGeographiqueCreateAdminComponent,
  ZoneGeographiqueListAdminComponent,
  ZoneGeographiqueViewAdminComponent,
  ZoneGeographiqueEditAdminComponent,
  ZoneGeographiqueAdminComponent,
  InstrumentIrdCreateAdminComponent,
  InstrumentIrdListAdminComponent,
  InstrumentIrdViewAdminComponent,
  InstrumentIrdEditAdminComponent,
  InstrumentIrdAdminComponent,
  NatureEtudeCreateAdminComponent,
  NatureEtudeListAdminComponent,
  NatureEtudeViewAdminComponent,
  NatureEtudeEditAdminComponent,
  NatureEtudeAdminComponent,
  InstitutionCreateAdminComponent,
  InstitutionListAdminComponent,
  InstitutionViewAdminComponent,
  InstitutionEditAdminComponent,
  InstitutionAdminComponent,
  PubliqueFormationCreateAdminComponent,
  PubliqueFormationListAdminComponent,
  PubliqueFormationViewAdminComponent,
  PubliqueFormationEditAdminComponent,
  PubliqueFormationAdminComponent,
  FinancementDoctorantCreateAdminComponent,
  FinancementDoctorantListAdminComponent,
  FinancementDoctorantViewAdminComponent,
  FinancementDoctorantEditAdminComponent,
  FinancementDoctorantAdminComponent,
  VilleCreateAdminComponent,
  VilleListAdminComponent,
  VilleViewAdminComponent,
  VilleEditAdminComponent,
  VilleAdminComponent,
  EntiteAdministrativeCreateAdminComponent,
  EntiteAdministrativeListAdminComponent,
  EntiteAdministrativeViewAdminComponent,
  EntiteAdministrativeEditAdminComponent,
  EntiteAdministrativeAdminComponent,
  EtablissementCreateAdminComponent,
  EtablissementListAdminComponent,
  EtablissementViewAdminComponent,
  EtablissementEditAdminComponent,
  EtablissementAdminComponent,
  DisciplineScientifiqueParentCreateAdminComponent,
  DisciplineScientifiqueParentListAdminComponent,
  DisciplineScientifiqueParentViewAdminComponent,
  DisciplineScientifiqueParentEditAdminComponent,
  DisciplineScientifiqueParentAdminComponent,
  MasterInternationalCreateAdminComponent,
  MasterInternationalListAdminComponent,
  MasterInternationalViewAdminComponent,
  MasterInternationalEditAdminComponent,
  MasterInternationalAdminComponent,
  TypeExpertiseEvaluationCreateAdminComponent,
  TypeExpertiseEvaluationListAdminComponent,
  TypeExpertiseEvaluationViewAdminComponent,
  TypeExpertiseEvaluationEditAdminComponent,
  TypeExpertiseEvaluationAdminComponent,
  EtudiantCreateAdminComponent,
  EtudiantListAdminComponent,
  EtudiantViewAdminComponent,
  EtudiantEditAdminComponent,
  EtudiantAdminComponent,
  ModaliteCreateAdminComponent,
  ModaliteListAdminComponent,
  ModaliteViewAdminComponent,
  ModaliteEditAdminComponent,
  ModaliteAdminComponent,
  ModaliteFormationContinueCreateAdminComponent,
  ModaliteFormationContinueListAdminComponent,
  ModaliteFormationContinueViewAdminComponent,
  ModaliteFormationContinueEditAdminComponent,
  ModaliteFormationContinueAdminComponent,
  TypeEntiteAdministrativeCreateAdminComponent,
  TypeEntiteAdministrativeListAdminComponent,
  TypeEntiteAdministrativeViewAdminComponent,
  TypeEntiteAdministrativeEditAdminComponent,
  TypeEntiteAdministrativeAdminComponent,
  TypeUtilisateurCreateAdminComponent,
  TypeUtilisateurListAdminComponent,
  TypeUtilisateurViewAdminComponent,
  TypeUtilisateurEditAdminComponent,
  TypeUtilisateurAdminComponent,
  TypeInstrumentIrdCreateAdminComponent,
  TypeInstrumentIrdListAdminComponent,
  TypeInstrumentIrdViewAdminComponent,
  TypeInstrumentIrdEditAdminComponent,
  TypeInstrumentIrdAdminComponent,
  EtablissementPartenaireCreateAdminComponent,
  EtablissementPartenaireListAdminComponent,
  EtablissementPartenaireViewAdminComponent,
  EtablissementPartenaireEditAdminComponent,
  EtablissementPartenaireAdminComponent,
  ModaliteEtudeCreateAdminComponent,
  ModaliteEtudeListAdminComponent,
  ModaliteEtudeViewAdminComponent,
  ModaliteEtudeEditAdminComponent,
  ModaliteEtudeAdminComponent,
  TemplateClotureCreateAdminComponent,
  TemplateClotureListAdminComponent,
  TemplateClotureViewAdminComponent,
  TemplateClotureEditAdminComponent,
  TemplateClotureAdminComponent,
  TypePubliqueCultureScientifiqueCreateAdminComponent,
  TypePubliqueCultureScientifiqueListAdminComponent,
  TypePubliqueCultureScientifiqueViewAdminComponent,
  TypePubliqueCultureScientifiqueEditAdminComponent,
  TypePubliqueCultureScientifiqueAdminComponent,
  StatusCursusCreateAdminComponent,
  StatusCursusListAdminComponent,
  StatusCursusViewAdminComponent,
  StatusCursusEditAdminComponent,
  StatusCursusAdminComponent,
  CategorieFaqCreateAdminComponent,
  CategorieFaqListAdminComponent,
  CategorieFaqViewAdminComponent,
  CategorieFaqEditAdminComponent,
  CategorieFaqAdminComponent,
  IdentifiantRechercheCreateAdminComponent,
  IdentifiantRechercheListAdminComponent,
  IdentifiantRechercheViewAdminComponent,
  IdentifiantRechercheEditAdminComponent,
  IdentifiantRechercheAdminComponent,
  ModaliteInterventionCreateAdminComponent,
  ModaliteInterventionListAdminComponent,
  ModaliteInterventionViewAdminComponent,
  ModaliteInterventionEditAdminComponent,
  ModaliteInterventionAdminComponent,
  DisciplineScientifiqueErcCreateAdminComponent,
  DisciplineScientifiqueErcListAdminComponent,
  DisciplineScientifiqueErcViewAdminComponent,
  DisciplineScientifiqueErcEditAdminComponent,
  DisciplineScientifiqueErcAdminComponent,
  TypeInstanceCreateAdminComponent,
  TypeInstanceListAdminComponent,
  TypeInstanceViewAdminComponent,
  TypeInstanceEditAdminComponent,
  TypeInstanceAdminComponent,
  NiveauFormationCreateAdminComponent,
  NiveauFormationListAdminComponent,
  NiveauFormationViewAdminComponent,
  NiveauFormationEditAdminComponent,
  NiveauFormationAdminComponent,
  FournisseurAppelProjetRechercheCreateAdminComponent,
  FournisseurAppelProjetRechercheListAdminComponent,
  FournisseurAppelProjetRechercheViewAdminComponent,
  FournisseurAppelProjetRechercheEditAdminComponent,
  FournisseurAppelProjetRechercheAdminComponent,
  TypeExpertiseCreateAdminComponent,
  TypeExpertiseListAdminComponent,
  TypeExpertiseViewAdminComponent,
  TypeExpertiseEditAdminComponent,
  TypeExpertiseAdminComponent,
  NiveauEtudeCreateAdminComponent,
  NiveauEtudeListAdminComponent,
  NiveauEtudeViewAdminComponent,
  NiveauEtudeEditAdminComponent,
  NiveauEtudeAdminComponent,
  RoleEvaluationCreateAdminComponent,
  RoleEvaluationListAdminComponent,
  RoleEvaluationViewAdminComponent,
  RoleEvaluationEditAdminComponent,
  RoleEvaluationAdminComponent,
  SemanticRelationshipCreateAdminComponent,
  SemanticRelationshipListAdminComponent,
  SemanticRelationshipViewAdminComponent,
  SemanticRelationshipEditAdminComponent,
  SemanticRelationshipAdminComponent,
  TypeEtudeCreateAdminComponent,
  TypeEtudeListAdminComponent,
  TypeEtudeViewAdminComponent,
  TypeEtudeEditAdminComponent,
  TypeEtudeAdminComponent,
  TemplateRappelCreateAdminComponent,
  TemplateRappelListAdminComponent,
  TemplateRappelViewAdminComponent,
  TemplateRappelEditAdminComponent,
  TemplateRappelAdminComponent,
  FormatRencontreCreateAdminComponent,
  FormatRencontreListAdminComponent,
  FormatRencontreViewAdminComponent,
  FormatRencontreEditAdminComponent,
  FormatRencontreAdminComponent,
  TypeReclamationCreateAdminComponent,
  TypeReclamationListAdminComponent,
  TypeReclamationViewAdminComponent,
  TypeReclamationEditAdminComponent,
  TypeReclamationAdminComponent,
  CommissionScientifiqueCreateAdminComponent,
  CommissionScientifiqueListAdminComponent,
  CommissionScientifiqueViewAdminComponent,
  CommissionScientifiqueEditAdminComponent,
  CommissionScientifiqueAdminComponent,
  SexeCreateAdminComponent,
  SexeListAdminComponent,
  SexeViewAdminComponent,
  SexeEditAdminComponent,
  SexeAdminComponent,
  ],
  entryComponents: [],
})
export class ArchivableAdminModule { }
