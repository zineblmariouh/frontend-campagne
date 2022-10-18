import {Component, OnInit} from '@angular/core';
import {CampagneChercheurOuvertureService} from '../../../../../controller/service/CampagneChercheurOuverture.service';
import {CampagneChercheurOuvertureVo} from '../../../../../controller/model/CampagneChercheurOuverture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-chercheur-ouverture-edit-chercheur',
  templateUrl: './campagne-chercheur-ouverture-edit-chercheur.component.html',
  styleUrls: ['./campagne-chercheur-ouverture-edit-chercheur.component.css']
})
export class CampagneChercheurOuvertureEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneChercheurOuvertureService: CampagneChercheurOuvertureService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatCampagneChercheurService: EtatCampagneChercheurService
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
    this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
    this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCampagneChercheurOuverture.dateEnvoi = DateUtils.toDate(this.selectedCampagneChercheurOuverture.dateEnvoi);
    this.campagneChercheurOuvertureService.edit().subscribe(campagneChercheurOuverture=>{
    const myIndex = this.campagneChercheurOuvertures.findIndex(e => e.id === this.selectedCampagneChercheurOuverture.id);
    this.campagneChercheurOuvertures[myIndex] = this.selectedCampagneChercheurOuverture;
    this.editCampagneChercheurOuvertureDialog = false;
    this.selectedCampagneChercheurOuverture = new CampagneChercheurOuvertureVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetatCampagneChercheur(etatCampagneChercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatCampagneChercheur', 'add');
                       if(isPermistted){
         this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
        this.createEtatCampagneChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    this.editCampagneChercheurOuvertureDialog  = false;
}

// getters and setters

get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
    return this.campagneChercheurOuvertureService.campagneChercheurOuvertures;
       }
set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertures = value;
       }

 get selectedCampagneChercheurOuverture(): CampagneChercheurOuvertureVo {
           return this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture;
       }
    set selectedCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture = value;
       }

   get editCampagneChercheurOuvertureDialog(): boolean {
           return this.campagneChercheurOuvertureService.editCampagneChercheurOuvertureDialog;

       }
    set editCampagneChercheurOuvertureDialog(value: boolean) {
        this.campagneChercheurOuvertureService.editCampagneChercheurOuvertureDialog = value;
       }

       get selectedEtatCampagneChercheur(): EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
      set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
       get etatCampagneChercheurs(): Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
       set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }
       get createEtatCampagneChercheurDialog(): boolean {
           return this.etatCampagneChercheurService.createEtatCampagneChercheurDialog;
       }
      set createEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.createEtatCampagneChercheurDialog= value;
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
