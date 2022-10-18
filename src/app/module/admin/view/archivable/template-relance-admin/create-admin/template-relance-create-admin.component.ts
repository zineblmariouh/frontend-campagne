import {Component, OnInit, Input} from '@angular/core';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-template-relance-create-admin',
  templateUrl: './template-relance-create-admin.component.html',
  styleUrls: ['./template-relance-create-admin.component.css']
})
export class TemplateRelanceCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateRelanceCode = true;




constructor(private datePipe: DatePipe, private templateRelanceService: TemplateRelanceService
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
    this.validTemplateRelanceCode = value;
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
     this.templateRelanceService.save().subscribe(templateRelance=>{
       this.templateRelances.push({...templateRelance});
       this.createTemplateRelanceDialog = false;
       this.submitted = false;
       this.selectedTemplateRelance = new TemplateRelanceVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateRelanceCode();

    }

private validateTemplateRelanceCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateRelance.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateRelanceCode = false;
        } else {
            this.validTemplateRelanceCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createTemplateRelanceDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateRelances(): Array<TemplateRelanceVo> {
    return this.templateRelanceService.templateRelances;
       }
set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }

 get selectedTemplateRelance():TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }

   get createTemplateRelanceDialog(): boolean {
           return this.templateRelanceService.createTemplateRelanceDialog;

       }
    set createTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.createTemplateRelanceDialog= value;
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

    get validTemplateRelanceCode(): boolean {
    return this._validTemplateRelanceCode;
    }

    set validTemplateRelanceCode(value: boolean) {
    this._validTemplateRelanceCode = value;
    }


}
