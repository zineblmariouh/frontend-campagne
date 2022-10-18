import {Component, OnInit, Input} from '@angular/core';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
@Component({
  selector: 'app-campagne-rappel-chercheur-create-admin',
  templateUrl: './campagne-rappel-chercheur-create-admin.component.html',
  styleUrls: ['./campagne-rappel-chercheur-create-admin.component.css']
})
export class CampagneRappelChercheurCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private campagneRappelChercheurService: CampagneRappelChercheurService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private chercheurService :ChercheurService
,       private campagneRappelService :CampagneRappelService
) {

}


// methods
ngOnInit(): void {

    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRappel = new CampagneRappelVo();
    this.campagneRappelService.findAll().subscribe((data) => this.campagneRappels = data);
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
     this.campagneRappelChercheurService.save().subscribe(campagneRappelChercheur=>{
       this.campagneRappelChercheurs.push({...campagneRappelChercheur});
       this.createCampagneRappelChercheurDialog = false;
       this.submitted = false;
       this.selectedCampagneRappelChercheur = new CampagneRappelChercheurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }











//openPopup
              public async openCreatecampagneRappel(campagneRappel: string) {
                      const isPermistted = await this.roleService.isPermitted('CampagneRappel', 'add');
                       if(isPermistted){
         this.selectedCampagneRappel = new CampagneRappelVo();
        this.createCampagneRappelDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
// methods

hideCreateDialog(){
    this.createCampagneRappelChercheurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    return this.campagneRappelChercheurService.campagneRappelChercheurs;
       }
set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
        this.campagneRappelChercheurService.campagneRappelChercheurs = value;
       }

 get selectedCampagneRappelChercheur():CampagneRappelChercheurVo {
           return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
       }
    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
       }

   get createCampagneRappelChercheurDialog(): boolean {
           return this.campagneRappelChercheurService.createCampagneRappelChercheurDialog;

       }
    set createCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.createCampagneRappelChercheurDialog= value;
       }

       get selectedCampagneRappel(): CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
      set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }
       get campagneRappels(): Array<CampagneRappelVo> {
           return this.campagneRappelService.campagneRappels;
       }
       set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }
       get createCampagneRappelDialog(): boolean {
           return this.campagneRappelService.createCampagneRappelDialog;
       }
      set createCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.createCampagneRappelDialog= value;
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
