import {Component, OnInit, Input} from '@angular/core';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-campagne-chercheur-create-chercheur',
  templateUrl: './etat-campagne-chercheur-create-chercheur.component.html',
  styleUrls: ['./etat-campagne-chercheur-create-chercheur.component.css']
})
export class EtatCampagneChercheurCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatCampagneChercheurLibelle = true;
   _validEtatCampagneChercheurCode = true;




constructor(private datePipe: DatePipe, private etatCampagneChercheurService: EtatCampagneChercheurService
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
    this.validEtatCampagneChercheurLibelle = value;
    this.validEtatCampagneChercheurCode = value;
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
     this.etatCampagneChercheurService.save().subscribe(etatCampagneChercheur=>{
       this.etatCampagneChercheurs.push({...etatCampagneChercheur});
       this.createEtatCampagneChercheurDialog = false;
       this.submitted = false;
       this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatCampagneChercheurLibelle();
this.validateEtatCampagneChercheurCode();

    }

private validateEtatCampagneChercheurLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatCampagneChercheur.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatCampagneChercheurLibelle = false;
        } else {
            this.validEtatCampagneChercheurLibelle = true;
        }
    }
private validateEtatCampagneChercheurCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatCampagneChercheur.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatCampagneChercheurCode = false;
        } else {
            this.validEtatCampagneChercheurCode = true;
        }
    }







//openPopup
// methods

hideCreateDialog(){
    this.createEtatCampagneChercheurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
    return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }

 get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
    set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }

   get createEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;

       }
    set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
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

    get validEtatCampagneChercheurLibelle(): boolean {
    return this._validEtatCampagneChercheurLibelle;
    }

    set validEtatCampagneChercheurLibelle(value: boolean) {
    this._validEtatCampagneChercheurLibelle = value;
    }
    get validEtatCampagneChercheurCode(): boolean {
    return this._validEtatCampagneChercheurCode;
    }

    set validEtatCampagneChercheurCode(value: boolean) {
    this._validEtatCampagneChercheurCode = value;
    }


}
