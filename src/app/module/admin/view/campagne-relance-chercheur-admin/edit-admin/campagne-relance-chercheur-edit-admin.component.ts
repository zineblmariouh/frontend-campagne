import {Component, OnInit} from '@angular/core';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-relance-chercheur-edit-admin',
  templateUrl: './campagne-relance-chercheur-edit-admin.component.html',
  styleUrls: ['./campagne-relance-chercheur-edit-admin.component.css']
})
export class CampagneRelanceChercheurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneRelanceChercheurService: CampagneRelanceChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private campagneRelanceService: CampagneRelanceService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRelance = new CampagneRelanceVo();
    this.campagneRelanceService.findAll().subscribe((data) => this.campagneRelances = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCampagneRelanceChercheur.dateEnvoi = DateUtils.toDate(this.selectedCampagneRelanceChercheur.dateEnvoi);
    this.campagneRelanceChercheurService.edit().subscribe(campagneRelanceChercheur=>{
    const myIndex = this.campagneRelanceChercheurs.findIndex(e => e.id === this.selectedCampagneRelanceChercheur.id);
    this.campagneRelanceChercheurs[myIndex] = this.selectedCampagneRelanceChercheur;
    this.editCampagneRelanceChercheurDialog = false;
    this.selectedCampagneRelanceChercheur = new CampagneRelanceChercheurVo();


    }, error => {
        console.log(error);
    });

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

hideEditDialog(){
    this.editCampagneRelanceChercheurDialog  = false;
}

// getters and setters

get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
       }
set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
        this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
       }

 get selectedCampagneRelanceChercheur(): CampagneRelanceChercheurVo {
           return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
       }
    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
       }

   get editCampagneRelanceChercheurDialog(): boolean {
           return this.campagneRelanceChercheurService.editCampagneRelanceChercheurDialog;

       }
    set editCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.editCampagneRelanceChercheurDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
