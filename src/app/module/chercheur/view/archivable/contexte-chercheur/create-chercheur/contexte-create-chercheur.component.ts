import {Component, OnInit, Input} from '@angular/core';
import {ContexteService} from '../../../../../controller/service/Contexte.service';
import {ContexteVo} from '../../../../../controller/model/Contexte.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-contexte-create-chercheur',
  templateUrl: './contexte-create-chercheur.component.html',
  styleUrls: ['./contexte-create-chercheur.component.css']
})
export class ContexteCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validContexteLibelle = true;
   _validContexteCode = true;




constructor(private datePipe: DatePipe, private contexteService: ContexteService
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
    this.validContexteLibelle = value;
    this.validContexteCode = value;
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
     this.contexteService.save().subscribe(contexte=>{
       this.contextes.push({...contexte});
       this.createContexteDialog = false;
       this.submitted = false;
       this.selectedContexte = new ContexteVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateContexteLibelle();
this.validateContexteCode();

    }

private validateContexteLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedContexte.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validContexteLibelle = false;
        } else {
            this.validContexteLibelle = true;
        }
    }
private validateContexteCode(){
        if (this.stringUtilService.isEmpty(this.selectedContexte.code)) {
            this.errorMessages.push('Code non valide');
            this.validContexteCode = false;
        } else {
            this.validContexteCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createContexteDialog  = false;
    this.setValidation(true);
}

// getters and setters

get contextes(): Array<ContexteVo> {
    return this.contexteService.contextes;
       }
set contextes(value: Array<ContexteVo>) {
        this.contexteService.contextes = value;
       }

 get selectedContexte():ContexteVo {
           return this.contexteService.selectedContexte;
       }
    set selectedContexte(value: ContexteVo) {
        this.contexteService.selectedContexte = value;
       }

   get createContexteDialog(): boolean {
           return this.contexteService.createContexteDialog;

       }
    set createContexteDialog(value: boolean) {
        this.contexteService.createContexteDialog= value;
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

    get validContexteLibelle(): boolean {
    return this._validContexteLibelle;
    }

    set validContexteLibelle(value: boolean) {
    this._validContexteLibelle = value;
    }
    get validContexteCode(): boolean {
    return this._validContexteCode;
    }

    set validContexteCode(value: boolean) {
    this._validContexteCode = value;
    }


}
