import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-view-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-view-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-view-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueViewChercheurComponent implements OnInit {

        selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesListe: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> = [];

        myTypeSavoirs: Array<TypeSavoirVo> = [];

        selectedTypeUtilisateurSavoirConcus: TypeUtilisateurSavoirConcuVo = new TypeUtilisateurSavoirConcuVo();
        typeUtilisateurSavoirConcusListe: Array<TypeUtilisateurSavoirConcuVo> = [];

        myTypeUtilisateurs: Array<TypeUtilisateurVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        developpementDeSavoirEtInnovationScientifiqueModeDiffusionsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> = [];

        myModeDiffusions: Array<ModeDiffusionVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> = [];

        myEnjeuxIrds: Array<EnjeuxIrdVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> = [];

        myCommunauteSavoirs: Array<CommunauteSavoirVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs: DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> = [];


        selectedDeveloppementDeSavoirEtInnovationScientifiquePayss: DeveloppementDeSavoirEtInnovationScientifiquePaysVo = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        developpementDeSavoirEtInnovationScientifiquePayssListe: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> = [];

        myPayss: Array<PaysVo> = [];

        selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        developpementDeSavoirEtInnovationScientifiqueEtablissementsListe: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> = [];

        myEtablissements: Array<EtablissementVo> = [];


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeSavoirService :TypeSavoirService
    ,private typeUtilisateurService :TypeUtilisateurService
    ,private etatEtapeCampagneService :EtatEtapeCampagneService
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private developpementDeSavoirEtInnovationScientifiquePaysService :DeveloppementDeSavoirEtInnovationScientifiquePaysService
    ,private roleDeveloppementDeSavoirService :RoleDeveloppementDeSavoirService
    ,private developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirService :DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService
    ,private typeUtilisateurSavoirConcuService :TypeUtilisateurSavoirConcuService
    ,private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
    ,private etablissementService :EtablissementService
    ,private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService :DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
    ,private savoirEtInnovationService :SavoirEtInnovationService
    ,private developpementDeSavoirEtInnovationScientifiqueEtablissementService :DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
    ,private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService :TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
    ,private modeDiffusionService :ModeDiffusionService
    ,private communauteSavoirService :CommunauteSavoirService
    ,private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService :DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
                this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques.typeSavoirVo = new TypeSavoirVo();
                this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
                this.selectedTypeUtilisateurSavoirConcus.typeUtilisateurVo = new TypeUtilisateurVo();
                this.typeUtilisateurService.findAll().subscribe((data) => this.typeUtilisateurs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions.modeDiffusionVo = new ModeDiffusionVo();
                this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiquePayss.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissements.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
    this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
    this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();
    this.savoirEtInnovationService.findAll().subscribe((data) => this.savoirEtInnovations = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedTypeSavoir():TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs():Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get editTypeSavoirDialog():boolean {
           return this.typeSavoirService.editTypeSavoirDialog;
       }
      set editTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.editTypeSavoirDialog= value;
       }
       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
       }
       get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
      set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }
       get savoirEtInnovations():Array<SavoirEtInnovationVo> {
           return this.savoirEtInnovationService.savoirEtInnovations;
       }
       set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }
       get editSavoirEtInnovationDialog():boolean {
           return this.savoirEtInnovationService.editSavoirEtInnovationDialog;
       }
      set editSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.editSavoirEtInnovationDialog= value;
       }
       get selectedModeDiffusion():ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions():Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get editModeDiffusionDialog():boolean {
           return this.modeDiffusionService.editModeDiffusionDialog;
       }
      set editModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.editModeDiffusionDialog= value;
       }
       get selectedEtatEtapeCampagne():EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes():Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get editEtatEtapeCampagneDialog():boolean {
           return this.etatEtapeCampagneService.editEtatEtapeCampagneDialog;
       }
      set editEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.editEtatEtapeCampagneDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }
       get selectedRoleDeveloppementDeSavoir():RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs():Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get editRoleDeveloppementDeSavoirDialog():boolean {
           return this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog;
       }
      set editRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.editRoleDeveloppementDeSavoirDialog= value;
       }
       get selectedTypeUtilisateur():TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
      set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }
       get typeUtilisateurs():Array<TypeUtilisateurVo> {
           return this.typeUtilisateurService.typeUtilisateurs;
       }
       set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }
       get editTypeUtilisateurDialog():boolean {
           return this.typeUtilisateurService.editTypeUtilisateurDialog;
       }
      set editTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.editTypeUtilisateurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
