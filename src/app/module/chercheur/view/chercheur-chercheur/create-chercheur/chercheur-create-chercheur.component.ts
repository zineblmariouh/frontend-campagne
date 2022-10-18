import {Component, OnInit, Input} from '@angular/core';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {DepartementScientifiqueVo} from '../../../../../controller/model/DepartementScientifique.model';
import {DepartementScientifiqueService} from '../../../../../controller/service/DepartementScientifique.service';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import {DisciplineScientifiqueErcService} from '../../../../../controller/service/DisciplineScientifiqueErc.service';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import {TypeInstrumentIrdChercheurService} from '../../../../../controller/service/TypeInstrumentIrdChercheur.service';
import {ZoneActiviteInteractionRechercheVo} from '../../../../../controller/model/ZoneActiviteInteractionRecherche.model';
import {ZoneActiviteInteractionRechercheService} from '../../../../../controller/service/ZoneActiviteInteractionRecherche.service';
import {CommissionScientifiqueVo} from '../../../../../controller/model/CommissionScientifique.model';
import {CommissionScientifiqueService} from '../../../../../controller/service/CommissionScientifique.service';
import {VilleVo} from '../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../controller/service/Ville.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {CorpsVo} from '../../../../../controller/model/Corps.model';
import {CorpsService} from '../../../../../controller/service/Corps.service';
import {SexeVo} from '../../../../../controller/model/Sexe.model';
import {SexeService} from '../../../../../controller/service/Sexe.service';
import {CommunauteSavoirChercheurVo} from '../../../../../controller/model/CommunauteSavoirChercheur.model';
import {CommunauteSavoirChercheurService} from '../../../../../controller/service/CommunauteSavoirChercheur.service';
import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {IdentifiantAuteurExpertVo} from '../../../../../controller/model/IdentifiantAuteurExpert.model';
import {IdentifiantAuteurExpertService} from '../../../../../controller/service/IdentifiantAuteurExpert.service';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import {InstrumentIrdChercheurService} from '../../../../../controller/service/InstrumentIrdChercheur.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {EnjeuxIrdChercheurVo} from '../../../../../controller/model/EnjeuxIrdChercheur.model';
import {EnjeuxIrdChercheurService} from '../../../../../controller/service/EnjeuxIrdChercheur.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {IdentifiantRechercheVo} from '../../../../../controller/model/IdentifiantRecherche.model';
import {IdentifiantRechercheService} from '../../../../../controller/service/IdentifiantRecherche.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {DisciplineScientifiqueChercheurVo} from '../../../../../controller/model/DisciplineScientifiqueChercheur.model';
import {DisciplineScientifiqueChercheurService} from '../../../../../controller/service/DisciplineScientifiqueChercheur.service';
import {AffectationStructurelleVo} from '../../../../../controller/model/AffectationStructurelle.model';
import {AffectationStructurelleService} from '../../../../../controller/service/AffectationStructurelle.service';
import {GradeVo} from '../../../../../controller/model/Grade.model';
import {GradeService} from '../../../../../controller/service/Grade.service';
@Component({
  selector: 'app-chercheur-create-chercheur',
  templateUrl: './chercheur-create-chercheur.component.html',
  styleUrls: ['./chercheur-create-chercheur.component.css']
})
export class ChercheurCreateChercheurComponent implements OnInit {

        selectedChercheurEmails: ChercheurEmailVo = new ChercheurEmailVo();
        selectedDisciplineScientifiqueChercheurs: DisciplineScientifiqueChercheurVo = new DisciplineScientifiqueChercheurVo();
        selectedZoneActiviteInteractionRecherches: ZoneActiviteInteractionRechercheVo = new ZoneActiviteInteractionRechercheVo();
        selectedEnjeuxIrdChercheurs: EnjeuxIrdChercheurVo = new EnjeuxIrdChercheurVo();
        selectedCommunauteSavoirChercheurs: CommunauteSavoirChercheurVo = new CommunauteSavoirChercheurVo();
        selectedInstrumentIrdChercheurs: InstrumentIrdChercheurVo = new InstrumentIrdChercheurVo();
        selectedTypeInstrumentIrdChercheurs: TypeInstrumentIrdChercheurVo = new TypeInstrumentIrdChercheurVo();
        selectedIdentifiantAuteurExperts: IdentifiantAuteurExpertVo = new IdentifiantAuteurExpertVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    _validAffectationStructurelleCode = true;
    _validAffectationStructurelleLibelleCourt = true;
    _validAffectationStructurelleLibelleLong = true;
    _validEntiteAdministrativeCode = true;
    _validEntiteAdministrativeLibelleCourt = true;
    _validTypeEntiteAdministrativeLibelle = true;
    _validPaysLibelle = true;
    _validPaysCode = true;
    _validVilleLibelle = true;
    _validVilleCode = true;
    _validDepartementScientifiqueLibelle = true;
    _validDepartementScientifiqueCode = true;
    _validCommissionScientifiqueLibelleCourt = true;
    _validCommissionScientifiqueCode = true;
    _validGradeLibelle = true;
    _validGradeCode = true;
    _validCorpsLibelle = true;
    _validCorpsCode = true;
    _validSexeLibelle = true;


private _enjeuxIrdChercheursVo: Array<EnjeuxIrdChercheurVo> = [];
private _communauteSavoirChercheursVo: Array<CommunauteSavoirChercheurVo> = [];
private _typeInstrumentIrdChercheursVo: Array<TypeInstrumentIrdChercheurVo> = [];

constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private instrumentIrdService :InstrumentIrdService
,       private departementScientifiqueService :DepartementScientifiqueService
,       private disciplineScientifiqueErcService :DisciplineScientifiqueErcService
,       private typeInstrumentIrdChercheurService :TypeInstrumentIrdChercheurService
,       private zoneActiviteInteractionRechercheService :ZoneActiviteInteractionRechercheService
,       private commissionScientifiqueService :CommissionScientifiqueService
,       private villeService :VilleService
,       private paysService :PaysService
,       private zoneGeographiqueService :ZoneGeographiqueService
,       private corpsService :CorpsService
,       private sexeService :SexeService
,       private communauteSavoirChercheurService :CommunauteSavoirChercheurService
,       private typeEntiteAdministrativeService :TypeEntiteAdministrativeService
,       private enjeuxIrdService :EnjeuxIrdService
,       private chercheurEmailService :ChercheurEmailService
,       private identifiantAuteurExpertService :IdentifiantAuteurExpertService
,       private instrumentIrdChercheurService :InstrumentIrdChercheurService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private enjeuxIrdChercheurService :EnjeuxIrdChercheurService
,       private communauteSavoirService :CommunauteSavoirService
,       private identifiantRechercheService :IdentifiantRechercheService
,       private entiteAdministrativeService :EntiteAdministrativeService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private disciplineScientifiqueChercheurService :DisciplineScientifiqueChercheurService
,       private affectationStructurelleService :AffectationStructurelleService
,       private gradeService :GradeService
) {

}


// methods
ngOnInit(): void {





                this.selectedDisciplineScientifiqueChercheurs.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
                this.selectedDisciplineScientifiqueChercheurs.disciplineScientifiqueErcVo = new DisciplineScientifiqueErcVo();
                this.disciplineScientifiqueErcService.findAll().subscribe((data) => this.disciplineScientifiqueErcs = data);



                this.selectedZoneActiviteInteractionRecherches.paysVo = new PaysVo();
                this.paysService.findAll().subscribe((data) => this.payss = data);
                this.selectedZoneActiviteInteractionRecherches.zoneGeographiqueVo = new ZoneGeographiqueVo();
                this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdChercheurs(data));

                this.selectedEnjeuxIrdChercheurs.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);


            this.communauteSavoirService.findAll().subscribe(data => this.prepareCommunauteSavoirChercheurs(data));

                this.selectedCommunauteSavoirChercheurs.communauteSavoirVo = new CommunauteSavoirVo();
                this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);



                this.selectedInstrumentIrdChercheurs.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);


            this.typeInstrumentIrdService.findAll().subscribe(data => this.prepareTypeInstrumentIrdChercheurs(data));

                this.selectedTypeInstrumentIrdChercheurs.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);



                this.selectedIdentifiantAuteurExperts.identifiantRechercheVo = new IdentifiantRechercheVo();
                this.identifiantRechercheService.findAll().subscribe((data) => this.identifiantRecherches = data);


    this.selectedAffectationStructurelle = new AffectationStructurelleVo();
    this.affectationStructurelleService.findAll().subscribe((data) => this.affectationStructurelles = data);
    this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
    this.entiteAdministrativeService.findAll().subscribe((data) => this.entiteAdministratives = data);
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedDepartementScientifique = new DepartementScientifiqueVo();
    this.departementScientifiqueService.findAll().subscribe((data) => this.departementScientifiques = data);
    this.selectedCommissionScientifique = new CommissionScientifiqueVo();
    this.commissionScientifiqueService.findAll().subscribe((data) => this.commissionScientifiques = data);
    this.selectedGrade = new GradeVo();
    this.gradeService.findAll().subscribe((data) => this.grades = data);
    this.selectedCorps = new CorpsVo();
    this.corpsService.findAll().subscribe((data) => this.corpss = data);
    this.selectedSexe = new SexeVo();
    this.sexeService.findAll().subscribe((data) => this.sexes = data);
}

         prepareEnjeuxIrdChercheurs(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdChercheur = new EnjeuxIrdChercheurVo();
        enjeuxIrdChercheur.enjeuxIrdVo = e;
        this.enjeuxIrdChercheursVo.push(enjeuxIrdChercheur);
        });
        }
    }
         prepareCommunauteSavoirChercheurs(communauteSavoirs: Array<CommunauteSavoirVo>): void{
        if( communauteSavoirs != null){
        communauteSavoirs.forEach(e => {
        const communauteSavoirChercheur = new CommunauteSavoirChercheurVo();
        communauteSavoirChercheur.communauteSavoirVo = e;
        this.communauteSavoirChercheursVo.push(communauteSavoirChercheur);
        });
        }
    }
         prepareTypeInstrumentIrdChercheurs(typeInstrumentIrds: Array<TypeInstrumentIrdVo>): void{
        if( typeInstrumentIrds != null){
        typeInstrumentIrds.forEach(e => {
        const typeInstrumentIrdChercheur = new TypeInstrumentIrdChercheurVo();
        typeInstrumentIrdChercheur.typeInstrumentIrdVo = e;
        this.typeInstrumentIrdChercheursVo.push(typeInstrumentIrdChercheur);
        });
        }
    }

    validateChercheurEmails(){
    this.errorMessages = new Array();
    }
    validateDisciplineScientifiqueChercheurs(){
    this.errorMessages = new Array();
    }
    validateZoneActiviteInteractionRecherches(){
    this.errorMessages = new Array();
    }
    validateInstrumentIrdChercheurs(){
    this.errorMessages = new Array();
    }
    validateIdentifiantAuteurExperts(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    }

        addChercheurEmails() {
        if( this.selectedChercheur.chercheurEmailsVo == null ){
            this.selectedChercheur.chercheurEmailsVo = new Array<ChercheurEmailVo>();
        }
       this.validateChercheurEmails();
       if (this.errorMessages.length === 0) {
              this.selectedChercheur.chercheurEmailsVo.push(this.selectedChercheurEmails);
              this.selectedChercheurEmails = new ChercheurEmailVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteChercheurEmails(p: ChercheurEmailVo) {
        this.selectedChercheur.chercheurEmailsVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.chercheurEmailsVo.splice(index, 1); }
        });
    }
        addDisciplineScientifiqueChercheurs() {
        if( this.selectedChercheur.disciplineScientifiqueChercheursVo == null ){
            this.selectedChercheur.disciplineScientifiqueChercheursVo = new Array<DisciplineScientifiqueChercheurVo>();
        }
       this.validateDisciplineScientifiqueChercheurs();
       if (this.errorMessages.length === 0) {
              this.selectedChercheur.disciplineScientifiqueChercheursVo.push(this.selectedDisciplineScientifiqueChercheurs);
              this.selectedDisciplineScientifiqueChercheurs = new DisciplineScientifiqueChercheurVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteDisciplineScientifiqueChercheurs(p: DisciplineScientifiqueChercheurVo) {
        this.selectedChercheur.disciplineScientifiqueChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.disciplineScientifiqueChercheursVo.splice(index, 1); }
        });
    }
        addZoneActiviteInteractionRecherches() {
        if( this.selectedChercheur.zoneActiviteInteractionRecherchesVo == null ){
            this.selectedChercheur.zoneActiviteInteractionRecherchesVo = new Array<ZoneActiviteInteractionRechercheVo>();
        }
       this.validateZoneActiviteInteractionRecherches();
       if (this.errorMessages.length === 0) {
              this.selectedChercheur.zoneActiviteInteractionRecherchesVo.push(this.selectedZoneActiviteInteractionRecherches);
              this.selectedZoneActiviteInteractionRecherches = new ZoneActiviteInteractionRechercheVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteZoneActiviteInteractionRecherches(p: ZoneActiviteInteractionRechercheVo) {
        this.selectedChercheur.zoneActiviteInteractionRecherchesVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.zoneActiviteInteractionRecherchesVo.splice(index, 1); }
        });
    }
        addInstrumentIrdChercheurs() {
        if( this.selectedChercheur.instrumentIrdChercheursVo == null ){
            this.selectedChercheur.instrumentIrdChercheursVo = new Array<InstrumentIrdChercheurVo>();
        }
       this.validateInstrumentIrdChercheurs();
       if (this.errorMessages.length === 0) {
              this.selectedChercheur.instrumentIrdChercheursVo.push(this.selectedInstrumentIrdChercheurs);
              this.selectedInstrumentIrdChercheurs = new InstrumentIrdChercheurVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteInstrumentIrdChercheurs(p: InstrumentIrdChercheurVo) {
        this.selectedChercheur.instrumentIrdChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.instrumentIrdChercheursVo.splice(index, 1); }
        });
    }
        addIdentifiantAuteurExperts() {
        if( this.selectedChercheur.identifiantAuteurExpertsVo == null ){
            this.selectedChercheur.identifiantAuteurExpertsVo = new Array<IdentifiantAuteurExpertVo>();
        }
       this.validateIdentifiantAuteurExperts();
       if (this.errorMessages.length === 0) {
              this.selectedChercheur.identifiantAuteurExpertsVo.push(this.selectedIdentifiantAuteurExperts);
              this.selectedIdentifiantAuteurExperts = new IdentifiantAuteurExpertVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteIdentifiantAuteurExperts(p: IdentifiantAuteurExpertVo) {
        this.selectedChercheur.identifiantAuteurExpertsVo.forEach((element, index) => {
            if (element === p) { this.selectedChercheur.identifiantAuteurExpertsVo.splice(index, 1); }
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
     this.chercheurService.save().subscribe(chercheur=>{
       this.chercheurs.push({...chercheur});
       this.createChercheurDialog = false;
       this.submitted = false;
       this.selectedChercheur = new ChercheurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }
















































































//openPopup
              public async openCreateentiteAdministrative(entiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('EntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedEntiteAdministrative = new EntiteAdministrativeVo();
        this.createEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEntiteAdministrative(typeEntiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
        this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecorps(corps: string) {
                      const isPermistted = await this.roleService.isPermitted('Corps', 'add');
                       if(isPermistted){
         this.selectedCorps = new CorpsVo();
        this.createCorpsDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifiqueErc(disciplineScientifiqueErc: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifiqueErc', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifiqueErc = new DisciplineScientifiqueErcVo();
        this.createDisciplineScientifiqueErcDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatesexe(sexe: string) {
                      const isPermistted = await this.roleService.isPermitted('Sexe', 'add');
                       if(isPermistted){
         this.selectedSexe = new SexeVo();
        this.createSexeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommissionScientifique(commissionScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('CommissionScientifique', 'add');
                       if(isPermistted){
         this.selectedCommissionScientifique = new CommissionScientifiqueVo();
        this.createCommissionScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateidentifiantRecherche(identifiantRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('IdentifiantRecherche', 'add');
                       if(isPermistted){
         this.selectedIdentifiantRecherche = new IdentifiantRechercheVo();
        this.createIdentifiantRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreategrade(grade: string) {
                      const isPermistted = await this.roleService.isPermitted('Grade', 'add');
                       if(isPermistted){
         this.selectedGrade = new GradeVo();
        this.createGradeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedepartementScientifique(departementScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DepartementScientifique', 'add');
                       if(isPermistted){
         this.selectedDepartementScientifique = new DepartementScientifiqueVo();
        this.createDepartementScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateaffectationStructurelle(affectationStructurelle: string) {
                      const isPermistted = await this.roleService.isPermitted('AffectationStructurelle', 'add');
                       if(isPermistted){
         this.selectedAffectationStructurelle = new AffectationStructurelleVo();
        this.createAffectationStructurelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createChercheurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get chercheurs(): Array<ChercheurVo> {
    return this.chercheurService.chercheurs;
       }
set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }

 get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }

   get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;

       }
    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

       get selectedEntiteAdministrative(): EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
      set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }
       get entiteAdministratives(): Array<EntiteAdministrativeVo> {
           return this.entiteAdministrativeService.entiteAdministratives;
       }
       set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }
       get createEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.createEntiteAdministrativeDialog;
       }
      set createEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.createEntiteAdministrativeDialog= value;
       }
       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
       }
       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
      set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
       }
       get selectedCorps(): CorpsVo {
           return this.corpsService.selectedCorps;
       }
      set selectedCorps(value: CorpsVo) {
        this.corpsService.selectedCorps = value;
       }
       get corpss(): Array<CorpsVo> {
           return this.corpsService.corpss;
       }
       set corpss(value: Array<CorpsVo>) {
        this.corpsService.corpss = value;
       }
       get createCorpsDialog(): boolean {
           return this.corpsService.createCorpsDialog;
       }
      set createCorpsDialog(value: boolean) {
        this.corpsService.createCorpsDialog= value;
       }
       get selectedDisciplineScientifiqueErc(): DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
      set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }
       get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
           return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
       set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }
       get createDisciplineScientifiqueErcDialog(): boolean {
           return this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog;
       }
      set createDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.createDisciplineScientifiqueErcDialog= value;
       }
       get selectedSexe(): SexeVo {
           return this.sexeService.selectedSexe;
       }
      set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
       }
       get sexes(): Array<SexeVo> {
           return this.sexeService.sexes;
       }
       set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
       }
       get createSexeDialog(): boolean {
           return this.sexeService.createSexeDialog;
       }
      set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog= value;
       }
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
       get selectedCommissionScientifique(): CommissionScientifiqueVo {
           return this.commissionScientifiqueService.selectedCommissionScientifique;
       }
      set selectedCommissionScientifique(value: CommissionScientifiqueVo) {
        this.commissionScientifiqueService.selectedCommissionScientifique = value;
       }
       get commissionScientifiques(): Array<CommissionScientifiqueVo> {
           return this.commissionScientifiqueService.commissionScientifiques;
       }
       set commissionScientifiques(value: Array<CommissionScientifiqueVo>) {
        this.commissionScientifiqueService.commissionScientifiques = value;
       }
       get createCommissionScientifiqueDialog(): boolean {
           return this.commissionScientifiqueService.createCommissionScientifiqueDialog;
       }
      set createCommissionScientifiqueDialog(value: boolean) {
        this.commissionScientifiqueService.createCommissionScientifiqueDialog= value;
       }
       get selectedIdentifiantRecherche(): IdentifiantRechercheVo {
           return this.identifiantRechercheService.selectedIdentifiantRecherche;
       }
      set selectedIdentifiantRecherche(value: IdentifiantRechercheVo) {
        this.identifiantRechercheService.selectedIdentifiantRecherche = value;
       }
       get identifiantRecherches(): Array<IdentifiantRechercheVo> {
           return this.identifiantRechercheService.identifiantRecherches;
       }
       set identifiantRecherches(value: Array<IdentifiantRechercheVo>) {
        this.identifiantRechercheService.identifiantRecherches = value;
       }
       get createIdentifiantRechercheDialog(): boolean {
           return this.identifiantRechercheService.createIdentifiantRechercheDialog;
       }
      set createIdentifiantRechercheDialog(value: boolean) {
        this.identifiantRechercheService.createIdentifiantRechercheDialog= value;
       }
       get selectedGrade(): GradeVo {
           return this.gradeService.selectedGrade;
       }
      set selectedGrade(value: GradeVo) {
        this.gradeService.selectedGrade = value;
       }
       get grades(): Array<GradeVo> {
           return this.gradeService.grades;
       }
       set grades(value: Array<GradeVo>) {
        this.gradeService.grades = value;
       }
       get createGradeDialog(): boolean {
           return this.gradeService.createGradeDialog;
       }
      set createGradeDialog(value: boolean) {
        this.gradeService.createGradeDialog= value;
       }
       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedDepartementScientifique(): DepartementScientifiqueVo {
           return this.departementScientifiqueService.selectedDepartementScientifique;
       }
      set selectedDepartementScientifique(value: DepartementScientifiqueVo) {
        this.departementScientifiqueService.selectedDepartementScientifique = value;
       }
       get departementScientifiques(): Array<DepartementScientifiqueVo> {
           return this.departementScientifiqueService.departementScientifiques;
       }
       set departementScientifiques(value: Array<DepartementScientifiqueVo>) {
        this.departementScientifiqueService.departementScientifiques = value;
       }
       get createDepartementScientifiqueDialog(): boolean {
           return this.departementScientifiqueService.createDepartementScientifiqueDialog;
       }
      set createDepartementScientifiqueDialog(value: boolean) {
        this.departementScientifiqueService.createDepartementScientifiqueDialog= value;
       }
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }
       get selectedAffectationStructurelle(): AffectationStructurelleVo {
           return this.affectationStructurelleService.selectedAffectationStructurelle;
       }
      set selectedAffectationStructurelle(value: AffectationStructurelleVo) {
        this.affectationStructurelleService.selectedAffectationStructurelle = value;
       }
       get affectationStructurelles(): Array<AffectationStructurelleVo> {
           return this.affectationStructurelleService.affectationStructurelles;
       }
       set affectationStructurelles(value: Array<AffectationStructurelleVo>) {
        this.affectationStructurelleService.affectationStructurelles = value;
       }
       get createAffectationStructurelleDialog(): boolean {
           return this.affectationStructurelleService.createAffectationStructurelleDialog;
       }
      set createAffectationStructurelleDialog(value: boolean) {
        this.affectationStructurelleService.createAffectationStructurelleDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
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


    get enjeuxIrdChercheursVo(): Array<EnjeuxIrdChercheurVo> {
    if( this._enjeuxIrdChercheursVo == null )
    this._enjeuxIrdChercheursVo = new Array();
    return this._enjeuxIrdChercheursVo;
    }

    set enjeuxIrdChercheursVo(value: Array<EnjeuxIrdChercheurVo>) {
    this._enjeuxIrdChercheursVo = value;
    }
    get communauteSavoirChercheursVo(): Array<CommunauteSavoirChercheurVo> {
    if( this._communauteSavoirChercheursVo == null )
    this._communauteSavoirChercheursVo = new Array();
    return this._communauteSavoirChercheursVo;
    }

    set communauteSavoirChercheursVo(value: Array<CommunauteSavoirChercheurVo>) {
    this._communauteSavoirChercheursVo = value;
    }
    get typeInstrumentIrdChercheursVo(): Array<TypeInstrumentIrdChercheurVo> {
    if( this._typeInstrumentIrdChercheursVo == null )
    this._typeInstrumentIrdChercheursVo = new Array();
    return this._typeInstrumentIrdChercheursVo;
    }

    set typeInstrumentIrdChercheursVo(value: Array<TypeInstrumentIrdChercheurVo>) {
    this._typeInstrumentIrdChercheursVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validAffectationStructurelleCode(): boolean {
    return this._validAffectationStructurelleCode;
    }

    set validAffectationStructurelleCode(value: boolean) {
    this._validAffectationStructurelleCode = value;
    }
    get validAffectationStructurelleLibelleCourt(): boolean {
    return this._validAffectationStructurelleLibelleCourt;
    }

    set validAffectationStructurelleLibelleCourt(value: boolean) {
    this._validAffectationStructurelleLibelleCourt = value;
    }
    get validAffectationStructurelleLibelleLong(): boolean {
    return this._validAffectationStructurelleLibelleLong;
    }

    set validAffectationStructurelleLibelleLong(value: boolean) {
    this._validAffectationStructurelleLibelleLong = value;
    }
    get validEntiteAdministrativeCode(): boolean {
    return this._validEntiteAdministrativeCode;
    }

    set validEntiteAdministrativeCode(value: boolean) {
    this._validEntiteAdministrativeCode = value;
    }
    get validEntiteAdministrativeLibelleCourt(): boolean {
    return this._validEntiteAdministrativeLibelleCourt;
    }

    set validEntiteAdministrativeLibelleCourt(value: boolean) {
    this._validEntiteAdministrativeLibelleCourt = value;
    }
    get validTypeEntiteAdministrativeLibelle(): boolean {
    return this._validTypeEntiteAdministrativeLibelle;
    }

    set validTypeEntiteAdministrativeLibelle(value: boolean) {
    this._validTypeEntiteAdministrativeLibelle = value;
    }
    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }
    get validVilleLibelle(): boolean {
    return this._validVilleLibelle;
    }

    set validVilleLibelle(value: boolean) {
    this._validVilleLibelle = value;
    }
    get validVilleCode(): boolean {
    return this._validVilleCode;
    }

    set validVilleCode(value: boolean) {
    this._validVilleCode = value;
    }
    get validDepartementScientifiqueLibelle(): boolean {
    return this._validDepartementScientifiqueLibelle;
    }

    set validDepartementScientifiqueLibelle(value: boolean) {
    this._validDepartementScientifiqueLibelle = value;
    }
    get validDepartementScientifiqueCode(): boolean {
    return this._validDepartementScientifiqueCode;
    }

    set validDepartementScientifiqueCode(value: boolean) {
    this._validDepartementScientifiqueCode = value;
    }
    get validCommissionScientifiqueLibelleCourt(): boolean {
    return this._validCommissionScientifiqueLibelleCourt;
    }

    set validCommissionScientifiqueLibelleCourt(value: boolean) {
    this._validCommissionScientifiqueLibelleCourt = value;
    }
    get validCommissionScientifiqueCode(): boolean {
    return this._validCommissionScientifiqueCode;
    }

    set validCommissionScientifiqueCode(value: boolean) {
    this._validCommissionScientifiqueCode = value;
    }
    get validGradeLibelle(): boolean {
    return this._validGradeLibelle;
    }

    set validGradeLibelle(value: boolean) {
    this._validGradeLibelle = value;
    }
    get validGradeCode(): boolean {
    return this._validGradeCode;
    }

    set validGradeCode(value: boolean) {
    this._validGradeCode = value;
    }
    get validCorpsLibelle(): boolean {
    return this._validCorpsLibelle;
    }

    set validCorpsLibelle(value: boolean) {
    this._validCorpsLibelle = value;
    }
    get validCorpsCode(): boolean {
    return this._validCorpsCode;
    }

    set validCorpsCode(value: boolean) {
    this._validCorpsCode = value;
    }
    get validSexeLibelle(): boolean {
    return this._validSexeLibelle;
    }

    set validSexeLibelle(value: boolean) {
    this._validSexeLibelle = value;
    }

}
