import {Component, OnInit, Input} from '@angular/core';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-pays-create-admin',
  templateUrl: './pays-create-admin.component.html',
  styleUrls: ['./pays-create-admin.component.css']
})
export class PaysCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPaysLibelle = true;
   _validPaysCode = true;




constructor(private datePipe: DatePipe, private paysService: PaysService
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
    this.validPaysLibelle = value;
    this.validPaysCode = value;
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
     this.paysService.save().subscribe(pays=>{
       this.payss.push({...pays});
       this.createPaysDialog = false;
       this.submitted = false;
       this.selectedPays = new PaysVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePaysLibelle();
this.validatePaysCode();

    }

private validatePaysLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPays.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPaysLibelle = false;
        } else {
            this.validPaysLibelle = true;
        }
    }
private validatePaysCode(){
        if (this.stringUtilService.isEmpty(this.selectedPays.code)) {
            this.errorMessages.push('Code non valide');
            this.validPaysCode = false;
        } else {
            this.validPaysCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createPaysDialog  = false;
    this.setValidation(true);
}

// getters and setters

get payss(): Array<PaysVo> {
    return this.paysService.payss;
       }
set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }

 get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
    set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }

   get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;

       }
    set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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

    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
    }


}
