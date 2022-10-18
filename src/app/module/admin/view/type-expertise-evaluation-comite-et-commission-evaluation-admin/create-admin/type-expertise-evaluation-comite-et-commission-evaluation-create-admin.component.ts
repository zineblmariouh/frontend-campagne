import {Component, OnInit, Input} from '@angular/core';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
@Component({
  selector: 'app-type-expertise-evaluation-comite-et-commission-evaluation-create-admin',
  templateUrl: './type-expertise-evaluation-comite-et-commission-evaluation-create-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-comite-et-commission-evaluation-create-admin.component.css']
})
export class TypeExpertiseEvaluationComiteEtCommissionEvaluationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypeExpertiseEvaluationLibelle = true;
    _validTypeExpertiseEvaluationCode = true;
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



constructor(private datePipe: DatePipe, private typeExpertiseEvaluationComiteEtCommissionEvaluationService: TypeExpertiseEvaluationComiteEtCommissionEvaluationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private typeExpertiseEvaluationService :TypeExpertiseEvaluationService
,       private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
) {

}


// methods
ngOnInit(): void {

    this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
    this.typeExpertiseEvaluationService.findAll().subscribe((data) => this.typeExpertiseEvaluations = data);
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
     this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.save().subscribe(typeExpertiseEvaluationComiteEtCommissionEvaluation=>{
       this.typeExpertiseEvaluationComiteEtCommissionEvaluations.push({...typeExpertiseEvaluationComiteEtCommissionEvaluation});
       this.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = false;
       this.submitted = false;
       this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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
    this.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeExpertiseEvaluationComiteEtCommissionEvaluations(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations;
       }
set typeExpertiseEvaluationComiteEtCommissionEvaluations(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations = value;
       }

 get selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation():TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }
    set selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

   get createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;

       }
    set createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog= value;
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


    get validTypeExpertiseEvaluationLibelle(): boolean {
    return this._validTypeExpertiseEvaluationLibelle;
    }

    set validTypeExpertiseEvaluationLibelle(value: boolean) {
    this._validTypeExpertiseEvaluationLibelle = value;
    }
    get validTypeExpertiseEvaluationCode(): boolean {
    return this._validTypeExpertiseEvaluationCode;
    }

    set validTypeExpertiseEvaluationCode(value: boolean) {
    this._validTypeExpertiseEvaluationCode = value;
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
