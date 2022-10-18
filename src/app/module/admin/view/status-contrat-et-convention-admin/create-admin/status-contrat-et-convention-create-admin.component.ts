import {Component, OnInit, Input} from '@angular/core';
import {StatusContratEtConventionService} from '../../../../../controller/service/StatusContratEtConvention.service';
import {StatusContratEtConventionVo} from '../../../../../controller/model/StatusContratEtConvention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-status-contrat-et-convention-create-admin',
  templateUrl: './status-contrat-et-convention-create-admin.component.html',
  styleUrls: ['./status-contrat-et-convention-create-admin.component.css']
})
export class StatusContratEtConventionCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validStatusContratEtConventionLibelle = true;
   _validStatusContratEtConventionCode = true;




constructor(private datePipe: DatePipe, private statusContratEtConventionService: StatusContratEtConventionService
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
    this.validStatusContratEtConventionLibelle = value;
    this.validStatusContratEtConventionCode = value;
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
     this.statusContratEtConventionService.save().subscribe(statusContratEtConvention=>{
       this.statusContratEtConventions.push({...statusContratEtConvention});
       this.createStatusContratEtConventionDialog = false;
       this.submitted = false;
       this.selectedStatusContratEtConvention = new StatusContratEtConventionVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateStatusContratEtConventionLibelle();
this.validateStatusContratEtConventionCode();

    }

private validateStatusContratEtConventionLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedStatusContratEtConvention.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validStatusContratEtConventionLibelle = false;
        } else {
            this.validStatusContratEtConventionLibelle = true;
        }
    }
private validateStatusContratEtConventionCode(){
        if (this.stringUtilService.isEmpty(this.selectedStatusContratEtConvention.code)) {
            this.errorMessages.push('Code non valide');
            this.validStatusContratEtConventionCode = false;
        } else {
            this.validStatusContratEtConventionCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createStatusContratEtConventionDialog  = false;
    this.setValidation(true);
}

// getters and setters

get statusContratEtConventions(): Array<StatusContratEtConventionVo> {
    return this.statusContratEtConventionService.statusContratEtConventions;
       }
set statusContratEtConventions(value: Array<StatusContratEtConventionVo>) {
        this.statusContratEtConventionService.statusContratEtConventions = value;
       }

 get selectedStatusContratEtConvention():StatusContratEtConventionVo {
           return this.statusContratEtConventionService.selectedStatusContratEtConvention;
       }
    set selectedStatusContratEtConvention(value: StatusContratEtConventionVo) {
        this.statusContratEtConventionService.selectedStatusContratEtConvention = value;
       }

   get createStatusContratEtConventionDialog(): boolean {
           return this.statusContratEtConventionService.createStatusContratEtConventionDialog;

       }
    set createStatusContratEtConventionDialog(value: boolean) {
        this.statusContratEtConventionService.createStatusContratEtConventionDialog= value;
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

    get validStatusContratEtConventionLibelle(): boolean {
    return this._validStatusContratEtConventionLibelle;
    }

    set validStatusContratEtConventionLibelle(value: boolean) {
    this._validStatusContratEtConventionLibelle = value;
    }
    get validStatusContratEtConventionCode(): boolean {
    return this._validStatusContratEtConventionCode;
    }

    set validStatusContratEtConventionCode(value: boolean) {
    this._validStatusContratEtConventionCode = value;
    }


}
