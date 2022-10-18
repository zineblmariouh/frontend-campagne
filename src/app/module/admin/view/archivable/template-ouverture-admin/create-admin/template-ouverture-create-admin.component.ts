import {Component, OnInit, Input} from '@angular/core';
import {TemplateOuvertureService} from '../../../../../controller/service/TemplateOuverture.service';
import {TemplateOuvertureVo} from '../../../../../controller/model/TemplateOuverture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-template-ouverture-create-admin',
  templateUrl: './template-ouverture-create-admin.component.html',
  styleUrls: ['./template-ouverture-create-admin.component.css']
})
export class TemplateOuvertureCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateOuvertureCode = true;




constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService
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
    this.validTemplateOuvertureCode = value;
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
     this.templateOuvertureService.save().subscribe(templateOuverture=>{
       this.templateOuvertures.push({...templateOuverture});
       this.createTemplateOuvertureDialog = false;
       this.submitted = false;
       this.selectedTemplateOuverture = new TemplateOuvertureVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateOuvertureCode();

    }

private validateTemplateOuvertureCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateOuverture.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateOuvertureCode = false;
        } else {
            this.validTemplateOuvertureCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createTemplateOuvertureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateOuvertures(): Array<TemplateOuvertureVo> {
    return this.templateOuvertureService.templateOuvertures;
       }
set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

 get selectedTemplateOuverture():TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }

   get createTemplateOuvertureDialog(): boolean {
           return this.templateOuvertureService.createTemplateOuvertureDialog;

       }
    set createTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.createTemplateOuvertureDialog= value;
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

    get validTemplateOuvertureCode(): boolean {
    return this._validTemplateOuvertureCode;
    }

    set validTemplateOuvertureCode(value: boolean) {
    this._validTemplateOuvertureCode = value;
    }


}
