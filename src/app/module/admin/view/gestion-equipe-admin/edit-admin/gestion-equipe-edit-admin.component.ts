import {Component, OnInit} from '@angular/core';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';
import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtatEtapeCampagneVo} from '../../../../../controller/model/EtatEtapeCampagne.model';
import {EtatEtapeCampagneService} from '../../../../../controller/service/EtatEtapeCampagne.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-gestion-equipe-edit-admin',
  templateUrl: './gestion-equipe-edit-admin.component.html',
  styleUrls: ['./gestion-equipe-edit-admin.component.css']
})
export class GestionEquipeEditAdminComponent implements OnInit {

        selectedGestionEquipeDetails: GestionEquipeDetailVo = new GestionEquipeDetailVo();
        gestionEquipeDetailsListe: Array<GestionEquipeDetailVo> = [];



constructor(private datePipe: DatePipe, private gestionEquipeService: GestionEquipeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etatEtapeCampagneService: EtatEtapeCampagneService
 ,       private gestionEquipeDetailService: GestionEquipeDetailService
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
    this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
    this.etatEtapeCampagneService.findAll().subscribe((data) => this.etatEtapeCampagnes = data);
}
        addGestionEquipeDetails() {
        if( this.selectedGestionEquipe.gestionEquipeDetailsVo == null ){
            this.selectedGestionEquipe.gestionEquipeDetailsVo = new Array<GestionEquipeDetailVo>();
        }
        this.selectedGestionEquipe.gestionEquipeDetailsVo.push(this.selectedGestionEquipeDetails);
        this.selectedGestionEquipeDetails = new GestionEquipeDetailVo();
        }

       deleteGestionEquipeDetails(p: GestionEquipeDetailVo) {
        this.selectedGestionEquipe.gestionEquipeDetailsVo.forEach((element, index) => {
            if (element === p) { this.selectedGestionEquipe.gestionEquipeDetailsVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.gestionEquipeService.edit().subscribe(gestionEquipe=>{
    const myIndex = this.gestionEquipes.findIndex(e => e.id === this.selectedGestionEquipe.id);
    this.gestionEquipes[myIndex] = this.selectedGestionEquipe;
    this.editGestionEquipeDialog = false;
    this.selectedGestionEquipe = new GestionEquipeVo();


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
              public async openCreateetatEtapeCampagne(etatEtapeCampagne: string) {
                      const isPermistted = await this.roleService.isPermitted('EtatEtapeCampagne', 'add');
                       if(isPermistted){
         this.selectedEtatEtapeCampagne = new EtatEtapeCampagneVo();
        this.createEtatEtapeCampagneDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editGestionEquipeDialog  = false;
}

// getters and setters

get gestionEquipes(): Array<GestionEquipeVo> {
    return this.gestionEquipeService.gestionEquipes;
       }
set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }

 get selectedGestionEquipe(): GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
    set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }

   get editGestionEquipeDialog(): boolean {
           return this.gestionEquipeService.editGestionEquipeDialog;

       }
    set editGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.editGestionEquipeDialog = value;
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
       get selectedEtatEtapeCampagne(): EtatEtapeCampagneVo {
           return this.etatEtapeCampagneService.selectedEtatEtapeCampagne;
       }
      set selectedEtatEtapeCampagne(value: EtatEtapeCampagneVo) {
        this.etatEtapeCampagneService.selectedEtatEtapeCampagne = value;
       }
       get etatEtapeCampagnes(): Array<EtatEtapeCampagneVo> {
           return this.etatEtapeCampagneService.etatEtapeCampagnes;
       }
       set etatEtapeCampagnes(value: Array<EtatEtapeCampagneVo>) {
        this.etatEtapeCampagneService.etatEtapeCampagnes = value;
       }
       get createEtatEtapeCampagneDialog(): boolean {
           return this.etatEtapeCampagneService.createEtatEtapeCampagneDialog;
       }
      set createEtatEtapeCampagneDialog(value: boolean) {
        this.etatEtapeCampagneService.createEtatEtapeCampagneDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
