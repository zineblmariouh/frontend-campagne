import {Component, OnInit, Input} from '@angular/core';
import {EtatReclamationService} from '../../../../../controller/service/EtatReclamation.service';
import {EtatReclamationVo} from '../../../../../controller/model/EtatReclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-reclamation-create-chercheur',
  templateUrl: './etat-reclamation-create-chercheur.component.html',
  styleUrls: ['./etat-reclamation-create-chercheur.component.css']
})
export class EtatReclamationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatReclamationLibelle = true;
   _validEtatReclamationCode = true;




constructor(private datePipe: DatePipe, private etatReclamationService: EtatReclamationService
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
    this.validEtatReclamationLibelle = value;
    this.validEtatReclamationCode = value;
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
     this.etatReclamationService.save().subscribe(etatReclamation=>{
       this.etatReclamations.push({...etatReclamation});
       this.createEtatReclamationDialog = false;
       this.submitted = false;
       this.selectedEtatReclamation = new EtatReclamationVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatReclamationLibelle();
this.validateEtatReclamationCode();

    }

private validateEtatReclamationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatReclamation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatReclamationLibelle = false;
        } else {
            this.validEtatReclamationLibelle = true;
        }
    }
private validateEtatReclamationCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatReclamation.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatReclamationCode = false;
        } else {
            this.validEtatReclamationCode = true;
        }
    }







//openPopup
// methods

hideCreateDialog(){
    this.createEtatReclamationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatReclamations(): Array<EtatReclamationVo> {
    return this.etatReclamationService.etatReclamations;
       }
set etatReclamations(value: Array<EtatReclamationVo>) {
        this.etatReclamationService.etatReclamations = value;
       }

 get selectedEtatReclamation():EtatReclamationVo {
           return this.etatReclamationService.selectedEtatReclamation;
       }
    set selectedEtatReclamation(value: EtatReclamationVo) {
        this.etatReclamationService.selectedEtatReclamation = value;
       }

   get createEtatReclamationDialog(): boolean {
           return this.etatReclamationService.createEtatReclamationDialog;

       }
    set createEtatReclamationDialog(value: boolean) {
        this.etatReclamationService.createEtatReclamationDialog= value;
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

    get validEtatReclamationLibelle(): boolean {
    return this._validEtatReclamationLibelle;
    }

    set validEtatReclamationLibelle(value: boolean) {
    this._validEtatReclamationLibelle = value;
    }
    get validEtatReclamationCode(): boolean {
    return this._validEtatReclamationCode;
    }

    set validEtatReclamationCode(value: boolean) {
    this._validEtatReclamationCode = value;
    }


}
