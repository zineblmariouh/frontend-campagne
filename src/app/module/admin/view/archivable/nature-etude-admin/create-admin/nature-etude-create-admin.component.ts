import {Component, OnInit, Input} from '@angular/core';
import {NatureEtudeService} from '../../../../../controller/service/NatureEtude.service';
import {NatureEtudeVo} from '../../../../../controller/model/NatureEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-nature-etude-create-admin',
  templateUrl: './nature-etude-create-admin.component.html',
  styleUrls: ['./nature-etude-create-admin.component.css']
})
export class NatureEtudeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNatureEtudeLibelle = true;
   _validNatureEtudeCode = true;




constructor(private datePipe: DatePipe, private natureEtudeService: NatureEtudeService
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
    this.validNatureEtudeLibelle = value;
    this.validNatureEtudeCode = value;
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
     this.natureEtudeService.save().subscribe(natureEtude=>{
       this.natureEtudes.push({...natureEtude});
       this.createNatureEtudeDialog = false;
       this.submitted = false;
       this.selectedNatureEtude = new NatureEtudeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNatureEtudeLibelle();
this.validateNatureEtudeCode();

    }

private validateNatureEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNatureEtudeLibelle = false;
        } else {
            this.validNatureEtudeLibelle = true;
        }
    }
private validateNatureEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedNatureEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validNatureEtudeCode = false;
        } else {
            this.validNatureEtudeCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createNatureEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get natureEtudes(): Array<NatureEtudeVo> {
    return this.natureEtudeService.natureEtudes;
       }
set natureEtudes(value: Array<NatureEtudeVo>) {
        this.natureEtudeService.natureEtudes = value;
       }

 get selectedNatureEtude():NatureEtudeVo {
           return this.natureEtudeService.selectedNatureEtude;
       }
    set selectedNatureEtude(value: NatureEtudeVo) {
        this.natureEtudeService.selectedNatureEtude = value;
       }

   get createNatureEtudeDialog(): boolean {
           return this.natureEtudeService.createNatureEtudeDialog;

       }
    set createNatureEtudeDialog(value: boolean) {
        this.natureEtudeService.createNatureEtudeDialog= value;
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

    get validNatureEtudeLibelle(): boolean {
    return this._validNatureEtudeLibelle;
    }

    set validNatureEtudeLibelle(value: boolean) {
    this._validNatureEtudeLibelle = value;
    }
    get validNatureEtudeCode(): boolean {
    return this._validNatureEtudeCode;
    }

    set validNatureEtudeCode(value: boolean) {
    this._validNatureEtudeCode = value;
    }


}
