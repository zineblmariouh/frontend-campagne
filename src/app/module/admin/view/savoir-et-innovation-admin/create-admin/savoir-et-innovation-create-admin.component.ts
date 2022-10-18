import {Component, OnInit, Input} from '@angular/core';
import {SavoirEtInnovationService} from '../../../../../controller/service/SavoirEtInnovation.service';
import {SavoirEtInnovationVo} from '../../../../../controller/model/SavoirEtInnovation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {TypeUtilisateurSavoirConcuVo} from '../../../../../controller/model/TypeUtilisateurSavoirConcu.model';
import {TypeUtilisateurSavoirConcuService} from '../../../../../controller/service/TypeUtilisateurSavoirConcu.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {ContratEtConventionIrdVo} from '../../../../../controller/model/ContratEtConventionIrd.model';
import {ContratEtConventionIrdService} from '../../../../../controller/service/ContratEtConventionIrd.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {ModaliteVo} from '../../../../../controller/model/Modalite.model';
import {ModaliteService} from '../../../../../controller/service/Modalite.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoir.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
@Component({
  selector: 'app-savoir-et-innovation-create-admin',
  templateUrl: './savoir-et-innovation-create-admin.component.html',
  styleUrls: ['./savoir-et-innovation-create-admin.component.css']
})
export class SavoirEtInnovationCreateAdminComponent implements OnInit {

        selectedContratEtConventionIrds: ContratEtConventionIrdVo = new ContratEtConventionIrdVo();
        selectedEvenementColloqueScienntifiques: EvenementColloqueScienntifiqueVo = new EvenementColloqueScienntifiqueVo();
        selectedDeveloppementDeSavoirEtInnovationScientifiques: DeveloppementDeSavoirEtInnovationScientifiqueVo = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCampagneLibelle = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;
    _validContratEtConventionIrdIntitule = true;

       private _evenementColloqueScienntifiqueEnjeuxIrdsVo: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> = [];
       private _communauteSavoirEvenementColloqueScientifiquesVo: Array<CommunauteSavoirEvenementColloqueScientifiqueVo> = [];
       private _disciplineScientifiqueEvenementColloqueScientifiquesVo: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> = [];
       private _evenementColloqueScienntifiquePayssVo: Array<EvenementColloqueScienntifiquePaysVo> = [];
       private _typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> = [];
       private _typeUtilisateurSavoirConcusVo: Array<TypeUtilisateurSavoirConcuVo> = [];
       private _developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> = [];
       private _developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> = [];
       private _developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> = [];
       private _developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> = [];
       private _developpementDeSavoirEtInnovationScientifiquePayssVo: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> = [];
       private _developpementDeSavoirEtInnovationScientifiqueEtablissementsVo: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> = [];


constructor(private datePipe: DatePipe, private savoirEtInnovationService: SavoirEtInnovationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private modaliteService :ModaliteService
,       private chercheurService :ChercheurService
,       private modaliteInterventionService :ModaliteInterventionService
,       private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
,       private typeSavoirService :TypeSavoirService
,       private modeDiffusionService :ModeDiffusionService
,       private statusContratEtConventionService :StatusContratEtConventionService
,       private enjeuxIrdService :EnjeuxIrdService
,       private etablissementService :EtablissementService
,       private campagneService :CampagneService
,       private roleDeveloppementDeSavoirService :RoleDeveloppementDeSavoirService
,       private communauteSavoirService :CommunauteSavoirService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private typeUtilisateurService :TypeUtilisateurService
,       private contratEtConventionIrdService :ContratEtConventionIrdService
,       private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
,       private paysService :PaysService
) {

}


// methods
ngOnInit(): void {


                this.selectedContratEtConventionIrds.statusContratEtConventionVo = new StatusContratEtConventionVo();
                this.statusContratEtConventionService.findAll().subscribe((data) => this.statusContratEtConventions = data);
                this.selectedContratEtConventionIrds.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);



                this.selectedEvenementColloqueScienntifiques.modaliteVo = new ModaliteVo();
                this.modaliteService.findAll().subscribe((data) => this.modalites = data);
                this.selectedEvenementColloqueScienntifiques.modaliteInterventionVo = new ModaliteInterventionVo();
                this.modaliteInterventionService.findAll().subscribe((data) => this.modaliteInterventions = data);
                this.selectedEvenementColloqueScienntifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.enjeuxIrdService.findAll().subscribe(data => this.prepareEvenementColloqueScienntifiqueEnjeuxIrds(data));
                this.communauteSavoirService.findAll().subscribe(data => this.prepareCommunauteSavoirEvenementColloqueScientifiques(data));
                this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueEvenementColloqueScientifiques(data));
                this.paysService.findAll().subscribe(data => this.prepareEvenementColloqueScienntifiquePayss(data));


                this.selectedDeveloppementDeSavoirEtInnovationScientifiques.roleDeveloppementDeSavoirVo = new RoleDeveloppementDeSavoirVo();
                this.roleDeveloppementDeSavoirService.findAll().subscribe((data) => this.roleDeveloppementDeSavoirs = data);
                this.selectedDeveloppementDeSavoirEtInnovationScientifiques.etatEtapeCampagneVo = new EtatEtapeCampagneVo();
                this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);

                this.typeSavoirService.findAll().subscribe(data => this.prepareTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(data));
                this.typeUtilisateurService.findAll().subscribe(data => this.prepareTypeUtilisateurSavoirConcus(data));
                this.modeDiffusionService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(data));
                this.enjeuxIrdService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(data));
                this.communauteSavoirService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(data));
                this.communauteSavoirService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(data));
                this.paysService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiquePayss(data));
                this.etablissementService.findAll().subscribe(data => this.prepareDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(data));

    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

   prepareEvenementColloqueScienntifiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const evenementColloqueScienntifiqueEnjeuxIrd = new EvenementColloqueScienntifiqueEnjeuxIrdVo();
        evenementColloqueScienntifiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.evenementColloqueScienntifiqueEnjeuxIrdsVo.push(evenementColloqueScienntifiqueEnjeuxIrd);
        });
        }
   }
   prepareCommunauteSavoirEvenementColloqueScientifiques(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const communauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();
        communauteSavoirEvenementColloqueScientifique.communauteSavoirVo = e;
        this.communauteSavoirEvenementColloqueScientifiquesVo.push(communauteSavoirEvenementColloqueScientifique);
        });
        }
   }
   prepareDisciplineScientifiqueEvenementColloqueScientifiques(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueEvenementColloqueScientifique = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
        disciplineScientifiqueEvenementColloqueScientifique.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueEvenementColloqueScientifiquesVo.push(disciplineScientifiqueEvenementColloqueScientifique);
        });
        }
   }
   prepareEvenementColloqueScienntifiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const evenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();
        evenementColloqueScienntifiquePays.paysVo = e;
        this.evenementColloqueScienntifiquePayssVo.push(evenementColloqueScienntifiquePays);
        });
        }
   }
   prepareTypeSavoirDeveloppementDeSavoirEtInnovationScientifiques(typeSavoirs: Array<TypeSavoirVo>): void{
        if( typeSavoirs != null){
        typeSavoirs.forEach(e => {
        const typeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();
        typeSavoirDeveloppementDeSavoirEtInnovationScientifique.typeSavoirVo = e;
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo.push(typeSavoirDeveloppementDeSavoirEtInnovationScientifique);
        });
        }
   }
   prepareTypeUtilisateurSavoirConcus(typeUtilisateurs: Array<TypeUtilisateurVo>): void{
        if( typeUtilisateurs != null){
        typeUtilisateurs.forEach(e => {
        const typeUtilisateurSavoirConcu = new TypeUtilisateurSavoirConcuVo();
        typeUtilisateurSavoirConcu.typeUtilisateurVo = e;
        this.typeUtilisateurSavoirConcusVo.push(typeUtilisateurSavoirConcu);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusions(modeDiffusions: Array<ModeDiffusionVo>): void{
        if( modeDiffusions != null){
        modeDiffusions.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();
        developpementDeSavoirEtInnovationScientifiqueModeDiffusion.modeDiffusionVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo.push(developpementDeSavoirEtInnovationScientifiqueModeDiffusion);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrds(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();
        developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd.enjeuxIrdVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo.push(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();
        developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique.communauteSavoirVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo.push(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirs(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir = new DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo();
        developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir.communauteSavoirVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo.push(developpementDeSavoirEtInnovationScientifiqueCommunauteSavoir);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiquePayss(payss: Array<PaysVo>): void{
        if( payss != null){
        payss.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();
        developpementDeSavoirEtInnovationScientifiquePays.paysVo = e;
        this.developpementDeSavoirEtInnovationScientifiquePayssVo.push(developpementDeSavoirEtInnovationScientifiquePays);
        });
        }
   }
   prepareDeveloppementDeSavoirEtInnovationScientifiqueEtablissements(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const developpementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();
        developpementDeSavoirEtInnovationScientifiqueEtablissement.etablissementVo = e;
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementsVo.push(developpementDeSavoirEtInnovationScientifiqueEtablissement);
        });
        }
   }

    validateContratEtConventionIrds(){
    this.errorMessages = new Array();
    this.validateContratEtConventionIrdIntitule();
    }
    validateEvenementColloqueScienntifiques(){
    this.errorMessages = new Array();
    }
    validateDeveloppementDeSavoirEtInnovationScientifiques(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validContratEtConventionIrdIntitule = value;
    }

        addContratEtConventionIrds() {
        if( this.selectedSavoirEtInnovation.contratEtConventionIrdsVo == null ){
            this.selectedSavoirEtInnovation.contratEtConventionIrdsVo = new Array<ContratEtConventionIrdVo>();
        }
       this.validateContratEtConventionIrds();
       if (this.errorMessages.length === 0) {
              this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.push(this.selectedContratEtConventionIrds);
              this.selectedContratEtConventionIrds = new ContratEtConventionIrdVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteContratEtConventionIrds(p: ContratEtConventionIrdVo) {
        this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.contratEtConventionIrdsVo.splice(index, 1); }
        });
    }
        addEvenementColloqueScienntifiques() {
        if( this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo == null ){
            this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo = new Array<EvenementColloqueScienntifiqueVo>();
        }
       this.validateEvenementColloqueScienntifiques();
       if (this.errorMessages.length === 0) {
              this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.push(this.selectedEvenementColloqueScienntifiques);
              this.selectedEvenementColloqueScienntifiques = new EvenementColloqueScienntifiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteEvenementColloqueScienntifiques(p: EvenementColloqueScienntifiqueVo) {
        this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.evenementColloqueScienntifiquesVo.splice(index, 1); }
        });
    }
        addDeveloppementDeSavoirEtInnovationScientifiques() {
        if( this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo == null ){
            this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo = new Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>();
        }
       this.validateDeveloppementDeSavoirEtInnovationScientifiques();
       if (this.errorMessages.length === 0) {
              this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.push(this.selectedDeveloppementDeSavoirEtInnovationScientifiques);
              this.selectedDeveloppementDeSavoirEtInnovationScientifiques = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteDeveloppementDeSavoirEtInnovationScientifiques(p: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.forEach((element, index) => {
            if (element === p) { this.selectedSavoirEtInnovation.developpementDeSavoirEtInnovationScientifiquesVo.splice(index, 1); }
        });
    }

public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.savoirEtInnovationService.save().subscribe(savoirEtInnovation=>{
       this.savoirEtInnovations.push({...savoirEtInnovation});
       this.createSavoirEtInnovationDialog = false;
       this.submitted = false;
       this.selectedSavoirEtInnovation = new SavoirEtInnovationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }














            private validateContratEtConventionIrdIntitule(){
            if (this.selectedContratEtConventionIrds.intitule == null) {
            this.errorMessages.push('Intitule de la contratEtConventionIrd est  invalide');
             this.validContratEtConventionIrdIntitule = false;
            } else {
            this.validContratEtConventionIrdIntitule = true;
            }
            }







































//openPopup
              public async openCreatemodaliteIntervention(modaliteIntervention: string) {
                      const isPermistted = await this.roleService.isPermitted('ModaliteIntervention', 'add');
                       if(isPermistted){
         this.selectedModaliteIntervention = new ModaliteInterventionVo();
        this.createModaliteInterventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatestatusContratEtConvention(statusContratEtConvention: string) {
                      const isPermistted = await this.roleService.isPermitted('StatusContratEtConvention', 'add');
                       if(isPermistted){
         this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();
        this.createStatusContratEtConventionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatemodalite(modalite: string) {
                      const isPermistted = await this.roleService.isPermitted('Modalite', 'add');
                       if(isPermistted){
         this.selectedModalite = new ModaliteVo();
        this.createModaliteDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateroleDeveloppementDeSavoir(roleDeveloppementDeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleDeveloppementDeSavoir', 'add');
                       if(isPermistted){
         this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();
        this.createRoleDeveloppementDeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createSavoirEtInnovationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get savoirEtInnovations(): Array<SavoirEtInnovationVo> {
    return this.savoirEtInnovationService.savoirEtInnovations;
       }
set savoirEtInnovations(value: Array<SavoirEtInnovationVo>) {
        this.savoirEtInnovationService.savoirEtInnovations = value;
       }

 get selectedSavoirEtInnovation():SavoirEtInnovationVo {
           return this.savoirEtInnovationService.selectedSavoirEtInnovation;
       }
    set selectedSavoirEtInnovation(value: SavoirEtInnovationVo) {
        this.savoirEtInnovationService.selectedSavoirEtInnovation = value;
       }

   get createSavoirEtInnovationDialog(): boolean {
           return this.savoirEtInnovationService.createSavoirEtInnovationDialog;

       }
    set createSavoirEtInnovationDialog(value: boolean) {
        this.savoirEtInnovationService.createSavoirEtInnovationDialog= value;
       }

       get selectedModaliteIntervention(): ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
      set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }
       get modaliteInterventions(): Array<ModaliteInterventionVo> {
           return this.modaliteInterventionService.modaliteInterventions;
       }
       set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }
       get createModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.createModaliteInterventionDialog;
       }
      set createModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.createModaliteInterventionDialog= value;
       }
       get selectedStatusContratEtConvention(): StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
      set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }
       get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
           return this.statusContratEtConventionService.statusContratEtConventions;
       }
       set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }
       get createStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;
       }
      set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
       }
       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
       }
       get selectedModalite(): ModaliteVo {
           return this.modaliteService.selectedModalite;
       }
      set selectedModalite(value: ModaliteVo) {
        this.modaliteService.selectedModalite = value;
       }
       get modalites(): Array<ModaliteVo> {
           return this.modaliteService.modalites;
       }
       set modalites(value: Array<ModaliteVo>) {
        this.modaliteService.modalites = value;
       }
       get createModaliteDialog(): boolean {
           return this.modaliteService.createModaliteDialog;
       }
      set createModaliteDialog(value: boolean) {
        this.modaliteService.createModaliteDialog= value;
       }
       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }
       get selectedRoleDeveloppementDeSavoir(): RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
      set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }
       get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
           return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
       set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }
       get createRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;
       }
      set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }



    get evenementColloqueScienntifiqueEnjeuxIrdsVo(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    if( this._evenementColloqueScienntifiqueEnjeuxIrdsVo == null )
    this._evenementColloqueScienntifiqueEnjeuxIrdsVo = new Array();
        return this._evenementColloqueScienntifiqueEnjeuxIrdsVo;
    }

    set evenementColloqueScienntifiqueEnjeuxIrdsVo(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this._evenementColloqueScienntifiqueEnjeuxIrdsVo = value;
    }
    get communauteSavoirEvenementColloqueScientifiquesVo(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    if( this._communauteSavoirEvenementColloqueScientifiquesVo == null )
    this._communauteSavoirEvenementColloqueScientifiquesVo = new Array();
        return this._communauteSavoirEvenementColloqueScientifiquesVo;
    }

    set communauteSavoirEvenementColloqueScientifiquesVo(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this._communauteSavoirEvenementColloqueScientifiquesVo = value;
    }
    get disciplineScientifiqueEvenementColloqueScientifiquesVo(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    if( this._disciplineScientifiqueEvenementColloqueScientifiquesVo == null )
    this._disciplineScientifiqueEvenementColloqueScientifiquesVo = new Array();
        return this._disciplineScientifiqueEvenementColloqueScientifiquesVo;
    }

    set disciplineScientifiqueEvenementColloqueScientifiquesVo(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this._disciplineScientifiqueEvenementColloqueScientifiquesVo = value;
    }
    get evenementColloqueScienntifiquePayssVo(): Array<EvenementColloqueScienntifiquePaysVo> {
    if( this._evenementColloqueScienntifiquePayssVo == null )
    this._evenementColloqueScienntifiquePayssVo = new Array();
        return this._evenementColloqueScienntifiquePayssVo;
    }

    set evenementColloqueScienntifiquePayssVo(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this._evenementColloqueScienntifiquePayssVo = value;
    }
    get typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    if( this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo == null )
    this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = new Array();
        return this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo;
    }

    set typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this._typeSavoirDeveloppementDeSavoirEtInnovationScientifiquesVo = value;
    }
    get typeUtilisateurSavoirConcusVo(): Array<TypeUtilisateurSavoirConcuVo> {
    if( this._typeUtilisateurSavoirConcusVo == null )
    this._typeUtilisateurSavoirConcusVo = new Array();
        return this._typeUtilisateurSavoirConcusVo;
    }

    set typeUtilisateurSavoirConcusVo(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this._typeUtilisateurSavoirConcusVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueModeDiffusionsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiquesVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueCommunauteSavoirVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueCommunauteSavoirsVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiquePayssVo(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    if( this._developpementDeSavoirEtInnovationScientifiquePayssVo == null )
    this._developpementDeSavoirEtInnovationScientifiquePayssVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiquePayssVo;
    }

    set developpementDeSavoirEtInnovationScientifiquePayssVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this._developpementDeSavoirEtInnovationScientifiquePayssVo = value;
    }
    get developpementDeSavoirEtInnovationScientifiqueEtablissementsVo(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    if( this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo == null )
    this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo = new Array();
        return this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo;
    }

    set developpementDeSavoirEtInnovationScientifiqueEtablissementsVo(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this._developpementDeSavoirEtInnovationScientifiqueEtablissementsVo = value;
    }

    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validCampagneLibelle(): boolean {
    return this._validCampagneLibelle;
    }

    set validCampagneLibelle(value: boolean) {
    this._validCampagneLibelle = value;
    }
    get validEtatEtapeCampagneLibelle(): boolean {
    return this._validEtatEtapeCampagneLibelle;
    }

    set validEtatEtapeCampagneLibelle(value: boolean) {
    this._validEtatEtapeCampagneLibelle = value;
    }
    get validEtatEtapeCampagneCode(): boolean {
    return this._validEtatEtapeCampagneCode;
    }

    set validEtatEtapeCampagneCode(value: boolean) {
    this._validEtatEtapeCampagneCode = value;
    }
    get validContratEtConventionIrdIntitule(): boolean {
    return this._validContratEtConventionIrdIntitule;
    }

    set validContratEtConventionIrdIntitule(value: boolean) {
    this._validContratEtConventionIrdIntitule = value;
    }

}
