import {Component, OnInit, Input} from '@angular/core';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {NatureExpertiseVo} from '../../../../../controller/model/NatureExpertise.model';
import {NatureExpertiseService} from '../../../../../controller/service/NatureExpertise.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {ExpertiseVo} from '../../../../../controller/model/Expertise.model';
import {ExpertiseService} from '../../../../../controller/service/Expertise.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
@Component({
  selector: 'app-comite-et-commission-evaluation-create-chercheur',
  templateUrl: './comite-et-commission-evaluation-create-chercheur.component.html',
  styleUrls: ['./comite-et-commission-evaluation-create-chercheur.component.css']
})
export class ComiteEtCommissionEvaluationCreateChercheurComponent implements OnInit {

        selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        selectedEtablissementComiteEtCommissionEvaluations: EtablissementComiteEtCommissionEvaluationVo = new EtablissementComiteEtCommissionEvaluationVo();
        selectedRoleComiteEtCommissionEvaluations: RoleComiteEtCommissionEvaluationVo = new RoleComiteEtCommissionEvaluationVo();
        selectedDisciplineScientifiqueComiteEtCommissionEvaluations: DisciplineScientifiqueComiteEtCommissionEvaluationVo = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        selectedEnjeuxIrdComiteEtCommissionEvaluations: EnjeuxIrdComiteEtCommissionEvaluationVo = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        selectedInstrumentIrdComiteEtCommissionEvaluations: InstrumentIrdComiteEtCommissionEvaluationVo = new InstrumentIrdComiteEtCommissionEvaluationVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

   _validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = true;
   _validComiteEtCommissionEvaluationNatureExpertise = true;
   _validComiteEtCommissionEvaluationNom = true;
   _validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = true;
   _validComiteEtCommissionEvaluationNomRevueOuEditeur = true;
   _validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = true;
   _validComiteEtCommissionEvaluationNombreJourDedie = true;
   _validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = true;
   _validComiteEtCommissionEvaluationRelieeInstrumentsIrd = true;
   _validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = true;

    _validNatureExpertiseLibelle = true;
    _validNatureExpertiseCode = true;
    _validExpertiseTempsEstimePourCetteAnnne = true;
    _validEtatEtapeCampagneLibelle = true;
    _validEtatEtapeCampagneCode = true;


private _typeExpertiseEvaluationComiteEtCommissionEvaluationsVo: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> = [];
private _etablissementComiteEtCommissionEvaluationsVo: Array<EtablissementComiteEtCommissionEvaluationVo> = [];
private _roleComiteEtCommissionEvaluationsVo: Array<RoleComiteEtCommissionEvaluationVo> = [];
private _disciplineScientifiqueComiteEtCommissionEvaluationsVo: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> = [];
private _enjeuxIrdComiteEtCommissionEvaluationsVo: Array<EnjeuxIrdComiteEtCommissionEvaluationVo> = [];

constructor(private datePipe: DatePipe, private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeExpertiseEvaluationService :TypeExpertiseEvaluationService
,       private etablissementComiteEtCommissionEvaluationService :EtablissementComiteEtCommissionEvaluationService
,       private instrumentIrdService :InstrumentIrdService
,       private etatEtapeCampagneService :EtatEtapeCampagneService
,       private roleComiteEtCommissionEvaluationService :RoleComiteEtCommissionEvaluationService
,       private roleEvaluationService :RoleEvaluationService
,       private natureExpertiseService :NatureExpertiseService
,       private enjeuxIrdService :EnjeuxIrdService
,       private etablissementService :EtablissementService
,       private typeInstrumentIrdService :TypeInstrumentIrdService
,       private disciplineScientifiqueComiteEtCommissionEvaluationService :DisciplineScientifiqueComiteEtCommissionEvaluationService
,       private enjeuxIrdComiteEtCommissionEvaluationService :EnjeuxIrdComiteEtCommissionEvaluationService
,       private typeExpertiseEvaluationComiteEtCommissionEvaluationService :TypeExpertiseEvaluationComiteEtCommissionEvaluationService
,       private expertiseService :ExpertiseService
,       private disciplineScientifiqueService :DisciplineScientifiqueService
,       private instrumentIrdComiteEtCommissionEvaluationService :InstrumentIrdComiteEtCommissionEvaluationService
) {

}


// methods
ngOnInit(): void {

            this.typeExpertiseEvaluationService.findAll().subscribe(data => this.prepareTypeExpertiseEvaluationComiteEtCommissionEvaluations(data));

                this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluations.typeExpertiseEvaluationVo = new TypeExpertiseEvaluationVo();
                this.typeExpertiseEvaluationService.findAll().subscribe((data) => this.typeExpertiseEvaluations = data);


            this.etablissementService.findAll().subscribe(data => this.prepareEtablissementComiteEtCommissionEvaluations(data));

                this.selectedEtablissementComiteEtCommissionEvaluations.etablissementVo = new EtablissementVo();
                this.etablissementService.findAll().subscribe((data) => this.etablissements = data);


            this.roleEvaluationService.findAll().subscribe(data => this.prepareRoleComiteEtCommissionEvaluations(data));

                this.selectedRoleComiteEtCommissionEvaluations.roleEvaluationVo = new RoleEvaluationVo();
                this.roleEvaluationService.findAll().subscribe((data) => this.roleEvaluations = data);


            this.disciplineScientifiqueService.findAll().subscribe(data => this.prepareDisciplineScientifiqueComiteEtCommissionEvaluations(data));

                this.selectedDisciplineScientifiqueComiteEtCommissionEvaluations.disciplineScientifiqueVo = new DisciplineScientifiqueVo();
                this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);


            this.enjeuxIrdService.findAll().subscribe(data => this.prepareEnjeuxIrdComiteEtCommissionEvaluations(data));

                this.selectedEnjeuxIrdComiteEtCommissionEvaluations.enjeuxIrdVo = new EnjeuxIrdVo();
                this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);



                this.selectedInstrumentIrdComiteEtCommissionEvaluations.instrumentIrdVo = new InstrumentIrdVo();
                this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
                this.selectedInstrumentIrdComiteEtCommissionEvaluations.typeInstrumentIrdVo = new TypeInstrumentIrdVo();
                this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);


    this.selectedNatureExpertise = new NatureExpertiseVo();
    this.natureExpertiseService.findAll().subscribe((data) => this.natureExpertises = data);
    this.selectedExpertise = new ExpertiseVo();
    this.expertiseService.findAll().subscribe((data) => this.expertises = data);
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}

         prepareTypeExpertiseEvaluationComiteEtCommissionEvaluations(typeExpertiseEvaluations: Array<TypeExpertiseEvaluationVo>): void{
        if( typeExpertiseEvaluations != null){
        typeExpertiseEvaluations.forEach(e => {
        const typeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
        typeExpertiseEvaluationComiteEtCommissionEvaluation.typeExpertiseEvaluationVo = e;
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo.push(typeExpertiseEvaluationComiteEtCommissionEvaluation);
        });
        }
    }
         prepareEtablissementComiteEtCommissionEvaluations(etablissements: Array<EtablissementVo>): void{
        if( etablissements != null){
        etablissements.forEach(e => {
        const etablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();
        etablissementComiteEtCommissionEvaluation.etablissementVo = e;
        this.etablissementComiteEtCommissionEvaluationsVo.push(etablissementComiteEtCommissionEvaluation);
        });
        }
    }
         prepareRoleComiteEtCommissionEvaluations(roleEvaluations: Array<RoleEvaluationVo>): void{
        if( roleEvaluations != null){
        roleEvaluations.forEach(e => {
        const roleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();
        roleComiteEtCommissionEvaluation.roleEvaluationVo = e;
        this.roleComiteEtCommissionEvaluationsVo.push(roleComiteEtCommissionEvaluation);
        });
        }
    }
         prepareDisciplineScientifiqueComiteEtCommissionEvaluations(disciplineScientifiques: Array<DisciplineScientifiqueVo>): void{
        if( disciplineScientifiques != null){
        disciplineScientifiques.forEach(e => {
        const disciplineScientifiqueComiteEtCommissionEvaluation = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
        disciplineScientifiqueComiteEtCommissionEvaluation.disciplineScientifiqueVo = e;
        this.disciplineScientifiqueComiteEtCommissionEvaluationsVo.push(disciplineScientifiqueComiteEtCommissionEvaluation);
        });
        }
    }
         prepareEnjeuxIrdComiteEtCommissionEvaluations(enjeuxIrds: Array<EnjeuxIrdVo>): void{
        if( enjeuxIrds != null){
        enjeuxIrds.forEach(e => {
        const enjeuxIrdComiteEtCommissionEvaluation = new EnjeuxIrdComiteEtCommissionEvaluationVo();
        enjeuxIrdComiteEtCommissionEvaluation.enjeuxIrdVo = e;
        this.enjeuxIrdComiteEtCommissionEvaluationsVo.push(enjeuxIrdComiteEtCommissionEvaluation);
        });
        }
    }

    validateInstrumentIrdComiteEtCommissionEvaluations(){
    this.errorMessages = new Array();
    }


private setValidation(value : boolean){
    this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNatureExpertise = value;
    this.validComiteEtCommissionEvaluationNom = value;
    this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNomRevueOuEditeur = value;
    this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationNombreJourDedie = value;
    this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = value;
    this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = value;
    this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = value;
    }

        addInstrumentIrdComiteEtCommissionEvaluations() {
        if( this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo == null ){
            this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo = new Array<InstrumentIrdComiteEtCommissionEvaluationVo>();
        }
       this.validateInstrumentIrdComiteEtCommissionEvaluations();
       if (this.errorMessages.length === 0) {
              this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.push(this.selectedInstrumentIrdComiteEtCommissionEvaluations);
              this.selectedInstrumentIrdComiteEtCommissionEvaluations = new InstrumentIrdComiteEtCommissionEvaluationVo();
           }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
       }

        deleteInstrumentIrdComiteEtCommissionEvaluations(p: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.forEach((element, index) => {
            if (element === p) { this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo.splice(index, 1); }
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
     this.comiteEtCommissionEvaluationService.save().subscribe(comiteEtCommissionEvaluation=>{
       this.comiteEtCommissionEvaluations.push({...comiteEtCommissionEvaluation});
       this.createComiteEtCommissionEvaluationDialog = false;
       this.submitted = false;
       this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations();
this.validateComiteEtCommissionEvaluationNatureExpertise();
this.validateComiteEtCommissionEvaluationNom();
this.validateComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations();
this.validateComiteEtCommissionEvaluationNomRevueOuEditeur();
this.validateComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations();
this.validateComiteEtCommissionEvaluationNombreJourDedie();
this.validateComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations();
this.validateComiteEtCommissionEvaluationRelieeInstrumentsIrd();
this.validateComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations();

    }

private validateComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.typeExpertiseEvaluationComiteEtCommissionEvaluationsVo)) {
            this.errorMessages.push('Type expertise evaluation comite et commission evaluations non valide');
            this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = false;
        } else {
            this.validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = true;
        }
    }
private validateComiteEtCommissionEvaluationNatureExpertise(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.natureExpertiseVo)) {
            this.errorMessages.push('Nature expertise non valide');
            this.validComiteEtCommissionEvaluationNatureExpertise = false;
        } else {
            this.validComiteEtCommissionEvaluationNatureExpertise = true;
        }
    }
private validateComiteEtCommissionEvaluationNom(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.nom)) {
            this.errorMessages.push('Nom non valide');
            this.validComiteEtCommissionEvaluationNom = false;
        } else {
            this.validComiteEtCommissionEvaluationNom = true;
        }
    }
private validateComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.etablissementComiteEtCommissionEvaluationsVo)) {
            this.errorMessages.push('Etablissement comite et commission evaluations non valide');
            this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = false;
        } else {
            this.validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = true;
        }
    }
private validateComiteEtCommissionEvaluationNomRevueOuEditeur(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.nomRevueOuEditeur)) {
            this.errorMessages.push('Nom revue ou editeur non valide');
            this.validComiteEtCommissionEvaluationNomRevueOuEditeur = false;
        } else {
            this.validComiteEtCommissionEvaluationNomRevueOuEditeur = true;
        }
    }
private validateComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.roleComiteEtCommissionEvaluationsVo)) {
            this.errorMessages.push('Role comite et commission evaluations non valide');
            this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = false;
        } else {
            this.validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = true;
        }
    }
private validateComiteEtCommissionEvaluationNombreJourDedie(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.nombreJourDedie)) {
            this.errorMessages.push('Nombre jour dedie non valide');
            this.validComiteEtCommissionEvaluationNombreJourDedie = false;
        } else {
            this.validComiteEtCommissionEvaluationNombreJourDedie = true;
        }
    }
private validateComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.disciplineScientifiqueComiteEtCommissionEvaluationsVo)) {
            this.errorMessages.push('Discipline scientifique comite et commission evaluations non valide');
            this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = false;
        } else {
            this.validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = true;
        }
    }
private validateComiteEtCommissionEvaluationRelieeInstrumentsIrd(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.relieeInstrumentsIrd)) {
            this.errorMessages.push('Reliee instruments ird non valide');
            this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = false;
        } else {
            this.validComiteEtCommissionEvaluationRelieeInstrumentsIrd = true;
        }
    }
private validateComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(){
        if (this.stringUtilService.isEmpty(this.selectedComiteEtCommissionEvaluation.instrumentIrdComiteEtCommissionEvaluationsVo)) {
            this.errorMessages.push('Instrument ird comite et commission evaluations non valide');
            this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = false;
        } else {
            this.validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = true;
        }
    }












































//openPopup
              public async openCreatenatureExpertise(natureExpertise: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureExpertise', 'add');
                       if(isPermistted){
         this.selectedNatureExpertise = new NatureExpertiseVo();
        this.createNatureExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
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
              public async openCreateexpertise(expertise: string) {
                      const isPermistted = await this.roleService.isPermitted('Expertise', 'add');
                       if(isPermistted){
         this.selectedExpertise = new ExpertiseVo();
        this.createExpertiseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeExpertiseEvaluation(typeExpertiseEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'add');
                       if(isPermistted){
         this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
        this.createTypeExpertiseEvaluationDialog = true;
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
              public async openCreateroleEvaluation(roleEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'add');
                       if(isPermistted){
         this.selectedRoleEvaluation = new RoleEvaluationVo();
        this.createRoleEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createComiteEtCommissionEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
    return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }

 get selectedComiteEtCommissionEvaluation():ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
    set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }

   get createComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;

       }
    set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
       }

       get selectedNatureExpertise(): NatureExpertiseVo {
           return this.natureExpertiseService.selectedNatureExpertise;
       }
      set selectedNatureExpertise(value: NatureExpertiseVo) {
        this.natureExpertiseService.selectedNatureExpertise = value;
       }
       get natureExpertises(): Array<NatureExpertiseVo> {
           return this.natureExpertiseService.natureExpertises;
       }
       set natureExpertises(value: Array<NatureExpertiseVo>) {
        this.natureExpertiseService.natureExpertises = value;
       }
       get createNatureExpertiseDialog(): boolean {
           return this.natureExpertiseService.createNatureExpertiseDialog;
       }
      set createNatureExpertiseDialog(value: boolean) {
        this.natureExpertiseService.createNatureExpertiseDialog= value;
       }
       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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
       get selectedExpertise(): ExpertiseVo {
           return this.expertiseService.selectedExpertise;
       }
      set selectedExpertise(value: ExpertiseVo) {
        this.expertiseService.selectedExpertise = value;
       }
       get expertises(): Array<ExpertiseVo> {
           return this.expertiseService.expertises;
       }
       set expertises(value: Array<ExpertiseVo>) {
        this.expertiseService.expertises = value;
       }
       get createExpertiseDialog(): boolean {
           return this.expertiseService.createExpertiseDialog;
       }
      set createExpertiseDialog(value: boolean) {
        this.expertiseService.createExpertiseDialog= value;
       }
       get selectedTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
      set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
       get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
       set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }
       get createTypeExpertiseEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog;
       }
      set createTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog= value;
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
       get selectedRoleEvaluation(): RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
      set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
       get roleEvaluations(): Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
       set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }
       get createRoleEvaluationDialog(): boolean {
           return this.roleEvaluationService.createRoleEvaluationDialog;
       }
      set createRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.createRoleEvaluationDialog= value;
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


    get typeExpertiseEvaluationComiteEtCommissionEvaluationsVo(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    if( this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo == null )
    this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo = new Array();
    return this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo;
    }

    set typeExpertiseEvaluationComiteEtCommissionEvaluationsVo(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
    this._typeExpertiseEvaluationComiteEtCommissionEvaluationsVo = value;
    }
    get etablissementComiteEtCommissionEvaluationsVo(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    if( this._etablissementComiteEtCommissionEvaluationsVo == null )
    this._etablissementComiteEtCommissionEvaluationsVo = new Array();
    return this._etablissementComiteEtCommissionEvaluationsVo;
    }

    set etablissementComiteEtCommissionEvaluationsVo(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
    this._etablissementComiteEtCommissionEvaluationsVo = value;
    }
    get roleComiteEtCommissionEvaluationsVo(): Array<RoleComiteEtCommissionEvaluationVo> {
    if( this._roleComiteEtCommissionEvaluationsVo == null )
    this._roleComiteEtCommissionEvaluationsVo = new Array();
    return this._roleComiteEtCommissionEvaluationsVo;
    }

    set roleComiteEtCommissionEvaluationsVo(value: Array<RoleComiteEtCommissionEvaluationVo>) {
    this._roleComiteEtCommissionEvaluationsVo = value;
    }
    get disciplineScientifiqueComiteEtCommissionEvaluationsVo(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    if( this._disciplineScientifiqueComiteEtCommissionEvaluationsVo == null )
    this._disciplineScientifiqueComiteEtCommissionEvaluationsVo = new Array();
    return this._disciplineScientifiqueComiteEtCommissionEvaluationsVo;
    }

    set disciplineScientifiqueComiteEtCommissionEvaluationsVo(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
    this._disciplineScientifiqueComiteEtCommissionEvaluationsVo = value;
    }
    get enjeuxIrdComiteEtCommissionEvaluationsVo(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    if( this._enjeuxIrdComiteEtCommissionEvaluationsVo == null )
    this._enjeuxIrdComiteEtCommissionEvaluationsVo = new Array();
    return this._enjeuxIrdComiteEtCommissionEvaluationsVo;
    }

    set enjeuxIrdComiteEtCommissionEvaluationsVo(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
    this._enjeuxIrdComiteEtCommissionEvaluationsVo = value;
    }


    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationTypeExpertiseEvaluationComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNatureExpertise(): boolean {
    return this._validComiteEtCommissionEvaluationNatureExpertise;
    }

    set validComiteEtCommissionEvaluationNatureExpertise(value: boolean) {
    this._validComiteEtCommissionEvaluationNatureExpertise = value;
    }
    get validComiteEtCommissionEvaluationNom(): boolean {
    return this._validComiteEtCommissionEvaluationNom;
    }

    set validComiteEtCommissionEvaluationNom(value: boolean) {
    this._validComiteEtCommissionEvaluationNom = value;
    }
    get validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationEtablissementComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNomRevueOuEditeur(): boolean {
    return this._validComiteEtCommissionEvaluationNomRevueOuEditeur;
    }

    set validComiteEtCommissionEvaluationNomRevueOuEditeur(value: boolean) {
    this._validComiteEtCommissionEvaluationNomRevueOuEditeur = value;
    }
    get validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationRoleComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationNombreJourDedie(): boolean {
    return this._validComiteEtCommissionEvaluationNombreJourDedie;
    }

    set validComiteEtCommissionEvaluationNombreJourDedie(value: boolean) {
    this._validComiteEtCommissionEvaluationNombreJourDedie = value;
    }
    get validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationDisciplineScientifiqueComiteEtCommissionEvaluations = value;
    }
    get validComiteEtCommissionEvaluationRelieeInstrumentsIrd(): boolean {
    return this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd;
    }

    set validComiteEtCommissionEvaluationRelieeInstrumentsIrd(value: boolean) {
    this._validComiteEtCommissionEvaluationRelieeInstrumentsIrd = value;
    }
    get validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(): boolean {
    return this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations;
    }

    set validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations(value: boolean) {
    this._validComiteEtCommissionEvaluationInstrumentIrdComiteEtCommissionEvaluations = value;
    }

    get validNatureExpertiseLibelle(): boolean {
    return this._validNatureExpertiseLibelle;
    }

    set validNatureExpertiseLibelle(value: boolean) {
    this._validNatureExpertiseLibelle = value;
    }
    get validNatureExpertiseCode(): boolean {
    return this._validNatureExpertiseCode;
    }

    set validNatureExpertiseCode(value: boolean) {
    this._validNatureExpertiseCode = value;
    }
    get validExpertiseTempsEstimePourCetteAnnne(): boolean {
    return this._validExpertiseTempsEstimePourCetteAnnne;
    }

    set validExpertiseTempsEstimePourCetteAnnne(value: boolean) {
    this._validExpertiseTempsEstimePourCetteAnnne = value;
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

}
