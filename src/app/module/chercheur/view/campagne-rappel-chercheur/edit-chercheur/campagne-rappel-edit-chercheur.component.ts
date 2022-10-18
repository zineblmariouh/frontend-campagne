import {Component, OnInit} from '@angular/core';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {TemplateRappelVo} from '../../../../../controller/model/TemplateRappel.model';
import {TemplateRappelService} from '../../../../../controller/service/TemplateRappel.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';

@Component({
  selector: 'app-campagne-rappel-edit-chercheur',
  templateUrl: './campagne-rappel-edit-chercheur.component.html',
  styleUrls: ['./campagne-rappel-edit-chercheur.component.css']
})
export class CampagneRappelEditChercheurComponent implements OnInit {

        selectedCampagneRappelChercheurs: CampagneRappelChercheurVo = new CampagneRappelChercheurVo();
        campagneRappelChercheursListe: Array<CampagneRappelChercheurVo> = [];

        myChercheurs: Array<ChercheurVo> = [];


constructor(private datePipe: DatePipe, private campagneRappelService: CampagneRappelService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private campagneRappelChercheurService: CampagneRappelChercheurService
 ,       private templateRappelService: TemplateRappelService
 ,       private chercheurService: ChercheurService
 ,       private campagneService: CampagneService
) {
}

// methods
ngOnInit(): void {
                this.selectedCampagneRappelChercheurs.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedTemplateRappel = new TemplateRappelVo();
    this.templateRappelService.findAll().subscribe((data) => this.templateRappels = data);
}
        addCampagneRappelChercheurs() {
        if( this.selectedCampagneRappel.campagneRappelChercheursVo == null ){
            this.selectedCampagneRappel.campagneRappelChercheursVo = new Array<CampagneRappelChercheurVo>();
        }
        this.selectedCampagneRappel.campagneRappelChercheursVo.push(this.selectedCampagneRappelChercheurs);
        this.selectedCampagneRappelChercheurs = new CampagneRappelChercheurVo();
        }

       deleteCampagneRappelChercheurs(p: CampagneRappelChercheurVo) {
        this.selectedCampagneRappel.campagneRappelChercheursVo.forEach((element, index) => {
            if (element === p) { this.selectedCampagneRappel.campagneRappelChercheursVo.splice(index, 1); }
        });
    }

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedCampagneRappel.dateRappel = DateUtils.toDate(this.selectedCampagneRappel.dateRappel);
    this.campagneRappelService.edit().subscribe(campagneRappel=>{
    const myIndex = this.campagneRappels.findIndex(e => e.id === this.selectedCampagneRappel.id);
    this.campagneRappels[myIndex] = this.selectedCampagneRappel;
    this.editCampagneRappelDialog = false;
    this.selectedCampagneRappel = new CampagneRappelVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetemplateRappel(templateRappel: string) {
                      const isPermistted = await this.roleService.isPermitted('TemplateRappel', 'add');
                       if(isPermistted){
         this.selectedTemplateRappel = new TemplateRappelVo();
        this.createTemplateRappelDialog = true;
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
    this.editCampagneRappelDialog  = false;
}

// getters and setters

get campagneRappels(): Array<CampagneRappelVo> {
    return this.campagneRappelService.campagneRappels;
       }
set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }

 get selectedCampagneRappel(): CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }

   get editCampagneRappelDialog(): boolean {
           return this.campagneRappelService.editCampagneRappelDialog;

       }
    set editCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.editCampagneRappelDialog = value;
       }

       get selectedTemplateRappel(): TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
      set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
       get templateRappels(): Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
       set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }
       get createTemplateRappelDialog(): boolean {
           return this.templateRappelService.createTemplateRappelDialog;
       }
      set createTemplateRappelDialog(value: boolean) {
        this.templateRappelService.createTemplateRappelDialog= value;
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
