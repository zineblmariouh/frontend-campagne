import {Component, OnInit, Input} from '@angular/core';
import {RoleDeveloppementDeSavoirService} from '../../../../../controller/service/RoleDeveloppementDeSavoir.service';
import {RoleDeveloppementDeSavoirVo} from '../../../../../controller/model/RoleDeveloppementDeSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-role-developpement-de-savoir-create-admin',
  templateUrl: './role-developpement-de-savoir-create-admin.component.html',
  styleUrls: ['./role-developpement-de-savoir-create-admin.component.css']
})
export class RoleDeveloppementDeSavoirCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRoleDeveloppementDeSavoirLibelle = true;
   _validRoleDeveloppementDeSavoirCode = true;




constructor(private datePipe: DatePipe, private roleDeveloppementDeSavoirService: RoleDeveloppementDeSavoirService
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
    this.validRoleDeveloppementDeSavoirLibelle = value;
    this.validRoleDeveloppementDeSavoirCode = value;
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
     this.roleDeveloppementDeSavoirService.save().subscribe(roleDeveloppementDeSavoir=>{
       this.roleDeveloppementDeSavoirs.push({...roleDeveloppementDeSavoir});
       this.createRoleDeveloppementDeSavoirDialog = false;
       this.submitted = false;
       this.selectedRoleDeveloppementDeSavoir = new RoleDeveloppementDeSavoirVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRoleDeveloppementDeSavoirLibelle();
this.validateRoleDeveloppementDeSavoirCode();

    }

private validateRoleDeveloppementDeSavoirLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRoleDeveloppementDeSavoirLibelle = false;
        } else {
            this.validRoleDeveloppementDeSavoirLibelle = true;
        }
    }
private validateRoleDeveloppementDeSavoirCode(){
        if (this.stringUtilService.isEmpty(this.selectedRoleDeveloppementDeSavoir.code)) {
            this.errorMessages.push('Code non valide');
            this.validRoleDeveloppementDeSavoirCode = false;
        } else {
            this.validRoleDeveloppementDeSavoirCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createRoleDeveloppementDeSavoirDialog  = false;
    this.setValidation(true);
}

// getters and setters

get roleDeveloppementDeSavoirs(): Array<RoleDeveloppementDeSavoirVo> {
    return this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs;
       }
set roleDeveloppementDeSavoirs(value: Array<RoleDeveloppementDeSavoirVo>) {
        this.roleDeveloppementDeSavoirService.roleDeveloppementDeSavoirs = value;
       }

 get selectedRoleDeveloppementDeSavoir():RoleDeveloppementDeSavoirVo {
           return this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir;
       }
    set selectedRoleDeveloppementDeSavoir(value: RoleDeveloppementDeSavoirVo) {
        this.roleDeveloppementDeSavoirService.selectedRoleDeveloppementDeSavoir = value;
       }

   get createRoleDeveloppementDeSavoirDialog(): boolean {
           return this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog;

       }
    set createRoleDeveloppementDeSavoirDialog(value: boolean) {
        this.roleDeveloppementDeSavoirService.createRoleDeveloppementDeSavoirDialog= value;
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

    get validRoleDeveloppementDeSavoirLibelle(): boolean {
    return this._validRoleDeveloppementDeSavoirLibelle;
    }

    set validRoleDeveloppementDeSavoirLibelle(value: boolean) {
    this._validRoleDeveloppementDeSavoirLibelle = value;
    }
    get validRoleDeveloppementDeSavoirCode(): boolean {
    return this._validRoleDeveloppementDeSavoirCode;
    }

    set validRoleDeveloppementDeSavoirCode(value: boolean) {
    this._validRoleDeveloppementDeSavoirCode = value;
    }


}
