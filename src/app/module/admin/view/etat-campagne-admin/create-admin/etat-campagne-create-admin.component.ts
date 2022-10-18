import {Component, OnInit, Input} from '@angular/core';
import {EtatCampagneService} from '../../../../../controller/service/EtatCampagne.service';
import {EtatCampagneVo} from '../../../../../controller/model/EtatCampagne.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-campagne-create-admin',
  templateUrl: './etat-campagne-create-admin.component.html',
  styleUrls: ['./etat-campagne-create-admin.component.css']
})
export class EtatCampagneCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatCampagneLibelle = true;
   _validEtatCampagneCode = true;




constructor(private datePipe: DatePipe, private etatCampagneService: EtatCampagneService
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
    this.validEtatCampagneLibelle = value;
    this.validEtatCampagneCode = value;
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
     this.etatCampagneService.save().subscribe(etatCampagne=>{
       this.etatCampagnes.push({...etatCampagne});
       this.createEtatCampagneDialog = false;
       this.submitted = false;
       this.selectedEtatCampagne = new EtatCampagneVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatCampagneLibelle();
this.validateEtatCampagneCode();

    }

private validateEtatCampagneLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatCampagne.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatCampagneLibelle = false;
        } else {
            this.validEtatCampagneLibelle = true;
        }
    }
private validateEtatCampagneCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatCampagne.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatCampagneCode = false;
        } else {
            this.validEtatCampagneCode = true;
        }
    }







//openPopup
// methods

hideCreateDialog(){
    this.createEtatCampagneDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatCampagnes(): Array<EtatCampagneVo> {
    return this.etatCampagneService.etatCampagnes;
       }
set etatCampagnes(value: Array<EtatCampagneVo>) {
        this.etatCampagneService.etatCampagnes = value;
       }

 get selectedEtatCampagne():EtatCampagneVo {
           return this.etatCampagneService.selectedEtatCampagne;
       }
    set selectedEtatCampagne(value: EtatCampagneVo) {
        this.etatCampagneService.selectedEtatCampagne = value;
       }

   get createEtatCampagneDialog(): boolean {
           return this.etatCampagneService.createEtatCampagneDialog;

       }
    set createEtatCampagneDialog(value: boolean) {
        this.etatCampagneService.createEtatCampagneDialog= value;
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

    get validEtatCampagneLibelle(): boolean {
    return this._validEtatCampagneLibelle;
    }

    set validEtatCampagneLibelle(value: boolean) {
    this._validEtatCampagneLibelle = value;
    }
    get validEtatCampagneCode(): boolean {
    return this._validEtatCampagneCode;
    }

    set validEtatCampagneCode(value: boolean) {
    this._validEtatCampagneCode = value;
    }


}
