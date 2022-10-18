import {Component, OnInit, Input} from '@angular/core';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-expertise-evaluation-create-admin',
  templateUrl: './type-expertise-evaluation-create-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-create-admin.component.css']
})
export class TypeExpertiseEvaluationCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeExpertiseEvaluationLibelle = true;
   _validTypeExpertiseEvaluationCode = true;




constructor(private datePipe: DatePipe, private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validTypeExpertiseEvaluationLibelle = value;
    this.validTypeExpertiseEvaluationCode = value;
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
     this.typeExpertiseEvaluationService.save().subscribe(typeExpertiseEvaluation=>{
       this.typeExpertiseEvaluations.push({...typeExpertiseEvaluation});
       this.createTypeExpertiseEvaluationDialog = false;
       this.submitted = false;
       this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeExpertiseEvaluationLibelle();
this.validateTypeExpertiseEvaluationCode();

    }

private validateTypeExpertiseEvaluationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertiseEvaluation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeExpertiseEvaluationLibelle = false;
        } else {
            this.validTypeExpertiseEvaluationLibelle = true;
        }
    }
private validateTypeExpertiseEvaluationCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeExpertiseEvaluation.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeExpertiseEvaluationCode = false;
        } else {
            this.validTypeExpertiseEvaluationCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeExpertiseEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
    return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }

 get selectedTypeExpertiseEvaluation():TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
    set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }

   get createTypeExpertiseEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog;

       }
    set createTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog= value;
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


}
