import {Component, OnInit} from '@angular/core';
import {CampagneChercheurFermetureService} from '../../../../../controller/service/CampagneChercheurFermeture.service';
import {CampagneChercheurFermetureVo} from '../../../../../controller/model/CampagneChercheurFermeture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-chercheur-fermeture-edit-chercheur',
  templateUrl: './campagne-chercheur-fermeture-edit-chercheur.component.html',
  styleUrls: ['./campagne-chercheur-fermeture-edit-chercheur.component.css']
})
export class CampagneChercheurFermetureEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneChercheurFermetureService: CampagneChercheurFermetureService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private campagneService: CampagneService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCampagneChercheurFermeture.dateEnvoi = DateUtils.toDate(this.selectedCampagneChercheurFermeture.dateEnvoi);
    this.campagneChercheurFermetureService.edit().subscribe(campagneChercheurFermeture=>{
    const myIndex = this.campagneChercheurFermetures.findIndex(e => e.id === this.selectedCampagneChercheurFermeture.id);
    this.campagneChercheurFermetures[myIndex] = this.selectedCampagneChercheurFermeture;
    this.editCampagneChercheurFermetureDialog = false;
    this.selectedCampagneChercheurFermeture = new CampagneChercheurFermetureVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecampagne(campagne: string) {
                      const isPermistted = await this.roleService.isPermitted('Campagne', 'add');
                       if(isPermistted){
         this.selectedCampagne = new CampagneVo();
        this.createCampagneDialog = true;
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
    this.editCampagneChercheurFermetureDialog  = false;
}

// getters and setters

get campagneChercheurFermetures(): Array<CampagneChercheurFermetureVo> {
    return this.campagneChercheurFermetureService.campagneChercheurFermetures;
       }
set campagneChercheurFermetures(value: Array<CampagneChercheurFermetureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetures = value;
       }

 get selectedCampagneChercheurFermeture(): CampagneChercheurFermetureVo {
           return this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture;
       }
    set selectedCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture = value;
       }

   get editCampagneChercheurFermetureDialog(): boolean {
           return this.campagneChercheurFermetureService.editCampagneChercheurFermetureDialog;

       }
    set editCampagneChercheurFermetureDialog(value: boolean) {
        this.campagneChercheurFermetureService.editCampagneChercheurFermetureDialog = value;
       }

       get selectedCampagne(): CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes(): Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get createCampagneDialog(): boolean {
           return this.campagneService.createCampagneDialog;
       }
      set createCampagneDialog(value: boolean) {
        this.campagneService.createCampagneDialog= value;
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
