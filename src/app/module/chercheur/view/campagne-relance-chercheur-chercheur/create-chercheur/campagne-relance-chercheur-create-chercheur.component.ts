import {Component, OnInit, Input} from '@angular/core';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
@Component({
  selector: 'app-campagne-relance-chercheur-create-chercheur',
  templateUrl: './campagne-relance-chercheur-create-chercheur.component.html',
  styleUrls: ['./campagne-relance-chercheur-create-chercheur.component.css']
})
export class CampagneRelanceChercheurCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private campagneRelanceChercheurService: CampagneRelanceChercheurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
,       private campagneRelanceService :CampagneRelanceService
) {

}


// methods
ngOnInit(): void {

    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRelance = new CampagneRelanceVo();
    this.campagneRelanceService.findAll().subscribe((data) => this.campagneRelances = data);
}




private setValidation(value : boolean){
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
     this.campagneRelanceChercheurService.save().subscribe(campagneRelanceChercheur=>{
       this.campagneRelanceChercheurs.push({...campagneRelanceChercheur});
       this.createCampagneRelanceChercheurDialog = false;
       this.submitted = false;
       this.selectedCampagneRelanceChercheur = new CampagneRelanceChercheurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }











//openPopup
              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecampagneRelance(campagneRelance: string) {
                      const isPermistted = await this.roleService.isPermitted('CampagneRelance', 'add');
                       if(isPermistted){
         this.selectedCampagneRelance = new CampagneRelanceVo();
        this.createCampagneRelanceDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCampagneRelanceChercheurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
       }
set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
        this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
       }

 get selectedCampagneRelanceChercheur():CampagneRelanceChercheurVo {
           return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
       }
    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
       }

   get createCampagneRelanceChercheurDialog(): boolean {
           return this.campagneRelanceChercheurService.createCampagneRelanceChercheurDialog;

       }
    set createCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.createCampagneRelanceChercheurDialog= value;
       }

       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }
       get selectedCampagneRelance(): CampagneRelanceVo {
           return this.campagneRelanceService.selectedCampagneRelance;
       }
      set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
       }
       get campagneRelances(): Array<CampagneRelanceVo> {
           return this.campagneRelanceService.campagneRelances;
       }
       set campagneRelances(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelances = value;
       }
       get createCampagneRelanceDialog(): boolean {
           return this.campagneRelanceService.createCampagneRelanceDialog;
       }
      set createCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.createCampagneRelanceDialog= value;
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



}
