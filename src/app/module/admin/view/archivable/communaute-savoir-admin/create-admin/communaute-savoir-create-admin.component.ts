import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-communaute-savoir-create-admin',
  templateUrl: './communaute-savoir-create-admin.component.html',
  styleUrls: ['./communaute-savoir-create-admin.component.css']
})
export class CommunauteSavoirCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validCommunauteSavoirLibelle = true;
   _validCommunauteSavoirCode = true;




constructor(private datePipe: DatePipe, private communauteSavoirService: CommunauteSavoirService
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
    this.validCommunauteSavoirLibelle = value;
    this.validCommunauteSavoirCode = value;
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
     this.communauteSavoirService.save().subscribe(communauteSavoir=>{
       this.communauteSavoirs.push({...communauteSavoir});
       this.createCommunauteSavoirDialog = false;
       this.submitted = false;
       this.selectedCommunauteSavoir = new CommunauteSavoirVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateCommunauteSavoirLibelle();
this.validateCommunauteSavoirCode();

    }

private validateCommunauteSavoirLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedCommunauteSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validCommunauteSavoirLibelle = false;
        } else {
            this.validCommunauteSavoirLibelle = true;
        }
    }
private validateCommunauteSavoirCode(){
        if (this.stringUtilService.isEmpty(this.selectedCommunauteSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validCommunauteSavoirCode = false;
        } else {
            this.validCommunauteSavoirCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createCommunauteSavoirDialog  = false;
    this.setValidation(true);
}

// getters and setters

get communauteSavoirs(): Array<CommunauteSavoirVo> {
    return this.communauteSavoirService.communauteSavoirs;
       }
set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }

 get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }

   get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;

       }
    set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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

    get validCommunauteSavoirLibelle(): boolean {
    return this._validCommunauteSavoirLibelle;
    }

    set validCommunauteSavoirLibelle(value: boolean) {
    this._validCommunauteSavoirLibelle = value;
    }
    get validCommunauteSavoirCode(): boolean {
    return this._validCommunauteSavoirCode;
    }

    set validCommunauteSavoirCode(value: boolean) {
    this._validCommunauteSavoirCode = value;
    }


}
