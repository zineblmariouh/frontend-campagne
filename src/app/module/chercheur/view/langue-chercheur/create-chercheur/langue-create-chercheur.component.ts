import {Component, OnInit, Input} from '@angular/core';
import {LangueService} from '../../../../../controller/service/Langue.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-langue-create-chercheur',
  templateUrl: './langue-create-chercheur.component.html',
  styleUrls: ['./langue-create-chercheur.component.css']
})
export class LangueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validLangueLibelle = true;
   _validLangueCode = true;




constructor(private datePipe: DatePipe, private langueService: LangueService
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
    this.validLangueLibelle = value;
    this.validLangueCode = value;
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
     this.langueService.save().subscribe(langue=>{
       this.langues.push({...langue});
       this.createLangueDialog = false;
       this.submitted = false;
       this.selectedLangue = new LangueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateLangueLibelle();
this.validateLangueCode();

    }

private validateLangueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedLangue.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validLangueLibelle = false;
        } else {
            this.validLangueLibelle = true;
        }
    }
private validateLangueCode(){
        if (this.stringUtilService.isEmpty(this.selectedLangue.code)) {
            this.errorMessages.push('Code non valide');
            this.validLangueCode = false;
        } else {
            this.validLangueCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createLangueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get langues(): Array<LangueVo> {
    return this.langueService.langues;
       }
set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }

 get selectedLangue():LangueVo {
           return this.langueService.selectedLangue;
       }
    set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }

   get createLangueDialog(): boolean {
           return this.langueService.createLangueDialog;

       }
    set createLangueDialog(value: boolean) {
        this.langueService.createLangueDialog= value;
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

    get validLangueLibelle(): boolean {
    return this._validLangueLibelle;
    }

    set validLangueLibelle(value: boolean) {
    this._validLangueLibelle = value;
    }
    get validLangueCode(): boolean {
    return this._validLangueCode;
    }

    set validLangueCode(value: boolean) {
    this._validLangueCode = value;
    }


}
