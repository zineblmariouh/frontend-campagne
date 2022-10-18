import {Component, OnInit, Input} from '@angular/core';
import {NationaliteService} from '../../../../../controller/service/Nationalite.service';
import {NationaliteVo} from '../../../../../controller/model/Nationalite.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-nationalite-create-admin',
  templateUrl: './nationalite-create-admin.component.html',
  styleUrls: ['./nationalite-create-admin.component.css']
})
export class NationaliteCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNationaliteLibelle = true;
   _validNationaliteCode = true;




constructor(private datePipe: DatePipe, private nationaliteService: NationaliteService
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
    this.validNationaliteLibelle = value;
    this.validNationaliteCode = value;
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
     this.nationaliteService.save().subscribe(nationalite=>{
       this.nationalites.push({...nationalite});
       this.createNationaliteDialog = false;
       this.submitted = false;
       this.selectedNationalite = new NationaliteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNationaliteLibelle();
this.validateNationaliteCode();

    }

private validateNationaliteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNationalite.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNationaliteLibelle = false;
        } else {
            this.validNationaliteLibelle = true;
        }
    }
private validateNationaliteCode(){
        if (this.stringUtilService.isEmpty(this.selectedNationalite.code)) {
            this.errorMessages.push('Code non valide');
            this.validNationaliteCode = false;
        } else {
            this.validNationaliteCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createNationaliteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get nationalites(): Array<NationaliteVo> {
    return this.nationaliteService.nationalites;
       }
set nationalites(value: Array<NationaliteVo>) {
        this.nationaliteService.nationalites = value;
       }

 get selectedNationalite():NationaliteVo {
           return this.nationaliteService.selectedNationalite;
       }
    set selectedNationalite(value: NationaliteVo) {
        this.nationaliteService.selectedNationalite = value;
       }

   get createNationaliteDialog(): boolean {
           return this.nationaliteService.createNationaliteDialog;

       }
    set createNationaliteDialog(value: boolean) {
        this.nationaliteService.createNationaliteDialog= value;
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

    get validNationaliteLibelle(): boolean {
    return this._validNationaliteLibelle;
    }

    set validNationaliteLibelle(value: boolean) {
    this._validNationaliteLibelle = value;
    }
    get validNationaliteCode(): boolean {
    return this._validNationaliteCode;
    }

    set validNationaliteCode(value: boolean) {
    this._validNationaliteCode = value;
    }


}
