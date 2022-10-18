import {Component, OnInit, Input} from '@angular/core';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-niveau-etude-create-admin',
  templateUrl: './niveau-etude-create-admin.component.html',
  styleUrls: ['./niveau-etude-create-admin.component.css']
})
export class NiveauEtudeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validNiveauEtudeLibelle = true;
   _validNiveauEtudeCode = true;




constructor(private datePipe: DatePipe, private niveauEtudeService: NiveauEtudeService
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
    this.validNiveauEtudeLibelle = value;
    this.validNiveauEtudeCode = value;
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
     this.niveauEtudeService.save().subscribe(niveauEtude=>{
       this.niveauEtudes.push({...niveauEtude});
       this.createNiveauEtudeDialog = false;
       this.submitted = false;
       this.selectedNiveauEtude = new NiveauEtudeVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateNiveauEtudeLibelle();
this.validateNiveauEtudeCode();

    }

private validateNiveauEtudeLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauEtude.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validNiveauEtudeLibelle = false;
        } else {
            this.validNiveauEtudeLibelle = true;
        }
    }
private validateNiveauEtudeCode(){
        if (this.stringUtilService.isEmpty(this.selectedNiveauEtude.code)) {
            this.errorMessages.push('Code non valide');
            this.validNiveauEtudeCode = false;
        } else {
            this.validNiveauEtudeCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createNiveauEtudeDialog  = false;
    this.setValidation(true);
}

// getters and setters

get niveauEtudes(): Array<NiveauEtudeVo> {
    return this.niveauEtudeService.niveauEtudes;
       }
set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }

 get selectedNiveauEtude():NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
    set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }

   get createNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;

       }
    set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
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

    get validNiveauEtudeLibelle(): boolean {
    return this._validNiveauEtudeLibelle;
    }

    set validNiveauEtudeLibelle(value: boolean) {
    this._validNiveauEtudeLibelle = value;
    }
    get validNiveauEtudeCode(): boolean {
    return this._validNiveauEtudeCode;
    }

    set validNiveauEtudeCode(value: boolean) {
    this._validNiveauEtudeCode = value;
    }


}
