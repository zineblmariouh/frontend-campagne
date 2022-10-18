import {Component, OnInit} from '@angular/core';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-rappel-chercheur-edit-chercheur',
  templateUrl: './campagne-rappel-chercheur-edit-chercheur.component.html',
  styleUrls: ['./campagne-rappel-chercheur-edit-chercheur.component.css']
})
export class CampagneRappelChercheurEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneRappelChercheurService: CampagneRappelChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private campagneRappelService: CampagneRappelService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRappel = new CampagneRappelVo();
    this.campagneRappelService.findAll().subscribe((data) => this.campagneRappels = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCampagneRappelChercheur.dateEnvoi = DateUtils.toDate(this.selectedCampagneRappelChercheur.dateEnvoi);
    this.campagneRappelChercheurService.edit().subscribe(campagneRappelChercheur=>{
    const myIndex = this.campagneRappelChercheurs.findIndex(e => e.id === this.selectedCampagneRappelChercheur.id);
    this.campagneRappelChercheurs[myIndex] = this.selectedCampagneRappelChercheur;
    this.editCampagneRappelChercheurDialog = false;
    this.selectedCampagneRappelChercheur = new CampagneRappelChercheurVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editCampagneRappelChercheurDialog  = false;
}

// getters and setters

get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    return this.campagneRappelChercheurService.campagneRappelChercheurs;
       }
set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
        this.campagneRappelChercheurService.campagneRappelChercheurs = value;
       }

 get selectedCampagneRappelChercheur(): CampagneRappelChercheurVo {
           return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
       }
    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
       }

   get editCampagneRappelChercheurDialog(): boolean {
           return this.campagneRappelChercheurService.editCampagneRappelChercheurDialog;

       }
    set editCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.editCampagneRappelChercheurDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
