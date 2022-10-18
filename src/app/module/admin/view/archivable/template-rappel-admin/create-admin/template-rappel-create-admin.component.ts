import {Component, OnInit, Input} from '@angular/core';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-template-rappel-create-admin',
  templateUrl: './template-rappel-create-admin.component.html',
  styleUrls: ['./template-rappel-create-admin.component.css']
})
export class TemplateRappelCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateRappelCode = true;




constructor(private datePipe: DatePipe, private templateRappelService: TemplateRappelService
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
    this.validTemplateRappelCode = value;
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
     this.templateRappelService.save().subscribe(templateRappel=>{
       this.templateRappels.push({...templateRappel});
       this.createTemplateRappelDialog = false;
       this.submitted = false;
       this.selectedTemplateRappel = new TemplateRappelVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateRappelCode();

    }

private validateTemplateRappelCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateRappel.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateRappelCode = false;
        } else {
            this.validTemplateRappelCode = true;
        }
    }













//openPopup
// methods

hideCreateDialog(){
    this.createTemplateRappelDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateRappels(): Array<TemplateRappelVo> {
    return this.templateRappelService.templateRappels;
       }
set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }

 get selectedTemplateRappel():TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
    set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }

   get createTemplateRappelDialog(): boolean {
           return this.templateRappelService.createTemplateRappelDialog;

       }
    set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
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

    get validTemplateRappelCode(): boolean {
    return this._validTemplateRappelCode;
    }

    set validTemplateRappelCode(value: boolean) {
    this._validTemplateRappelCode = value;
    }


}
