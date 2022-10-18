import {Component, OnInit, Input} from '@angular/core';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
@Component({
  selector: 'app-role-comite-et-commission-evaluation-create-chercheur',
  templateUrl: './role-comite-et-commission-evaluation-create-chercheur.component.html',
  styleUrls: ['./role-comite-et-commission-evaluation-create-chercheur.component.css']
})
export class RoleComiteEtCommissionEvaluationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validRoleEvaluationLibelle = true;
    _validRoleEvaluationCode = true;
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



constructor(private datePipe: DatePipe, private roleComiteEtCommissionEvaluationService: RoleComiteEtCommissionEvaluationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private roleEvaluationService :RoleEvaluationService
,       private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
) {

}


// methods
ngOnInit(): void {

    this.selectedRoleEvaluation = new RoleEvaluationVo();
    this.roleEvaluationService.findAll().subscribe((data) => this.roleEvaluations = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}




private setValidation(value : boolean){
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
     this.roleComiteEtCommissionEvaluationService.save().subscribe(roleComiteEtCommissionEvaluation=>{
       this.roleComiteEtCommissionEvaluations.push({...roleComiteEtCommissionEvaluation});
       this.createRoleComiteEtCommissionEvaluationDialog = false;
       this.submitted = false;
       this.selectedRoleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
              public async openCreatecomiteEtCommissionEvaluation(comiteEtCommissionEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'add');
                       if(isPermistted){
         this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
        this.createComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createRoleComiteEtCommissionEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleComiteEtCommissionEvaluations(): Array<RoleComiteEtCommissionEvaluationVo> {
    return this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations;
       }
set roleComiteEtCommissionEvaluations(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations = value;
       }

 get selectedRoleComiteEtCommissionEvaluation():RoleComiteEtCommissionEvaluationVo {
           return this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation;
       }
    set selectedRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation = value;
       }

   get createRoleComiteEtCommissionEvaluationDialog(): boolean {
           return this.roleComiteEtCommissionEvaluationService.createRoleComiteEtCommissionEvaluationDialog;

       }
    set createRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.createRoleComiteEtCommissionEvaluationDialog= value;
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
       get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get createComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;
       }
      set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
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




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validRoleEvaluationLibelle(): boolean {
    return this._validRoleEvaluationLibelle;
    }

    set validRoleEvaluationLibelle(value: boolean) {
    this._validRoleEvaluationLibelle = value;
    }
    get validRoleEvaluationCode(): boolean {
    return this._validRoleEvaluationCode;
    }

    set validRoleEvaluationCode(value: boolean) {
    this._validRoleEvaluationCode = value;
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

}
