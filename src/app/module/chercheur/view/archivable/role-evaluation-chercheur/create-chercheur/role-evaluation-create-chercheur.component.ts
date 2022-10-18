import {Component, OnInit, Input} from '@angular/core';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-role-evaluation-create-chercheur',
  templateUrl: './role-evaluation-create-chercheur.component.html',
  styleUrls: ['./role-evaluation-create-chercheur.component.css']
})
export class RoleEvaluationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRoleEvaluationLibelle = true;
   _validRoleEvaluationCode = true;




constructor(private datePipe: DatePipe, private roleEvaluationService: RoleEvaluationService
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
    this.validRoleEvaluationLibelle = value;
    this.validRoleEvaluationCode = value;
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
     this.roleEvaluationService.save().subscribe(roleEvaluation=>{
       this.roleEvaluations.push({...roleEvaluation});
       this.createRoleEvaluationDialog = false;
       this.submitted = false;
       this.selectedRoleEvaluation = new RoleEvaluationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRoleEvaluationLibelle();
this.validateRoleEvaluationCode();

    }

private validateRoleEvaluationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRoleEvaluation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleEvaluationLibelle = false;
        } else {
            this.validRoleEvaluationLibelle = true;
        }
    }
private validateRoleEvaluationCode(){
        if (this.stringUtilService.isEmpty(this.selectedRoleEvaluation.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleEvaluationCode = false;
        } else {
            this.validRoleEvaluationCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createRoleEvaluationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleEvaluations(): Array<RoleEvaluationVo> {
    return this.roleEvaluationService.roleEvaluations;
       }
set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }

 get selectedRoleEvaluation():RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
    set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
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


}
