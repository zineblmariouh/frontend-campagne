import {Component, OnInit} from '@angular/core';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
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
  selector: 'app-campagne-rappel-view-chercheur',
  templateUrl: './campagne-rappel-view-chercheur.component.html',
  styleUrls: ['./campagne-rappel-view-chercheur.component.css']
})
export class CampagneRappelViewChercheurComponent implements OnInit {

        selectedCampagneRappelChercheurs: CampagneRappelChercheurVo = new CampagneRappelChercheurVo();
        campagneRappelChercheursListe: Array<CampagneRappelChercheurVo> = [];

        myChercheurs: Array<ChercheurVo> = [];


constructor(private datePipe: DatePipe, private campagneRappelService: CampagneRappelService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneRappelChercheurService :CampagneRappelChercheurService
    ,private templateRappelService :TemplateRappelService
    ,private chercheurService :ChercheurService
    ,private campagneService :CampagneService
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

hideViewDialog(){
    this.viewCampagneRappelDialog  = false;
}

// getters and setters

get campagneRappels(): Array<CampagneRappelVo> {
    return this.campagneRappelService.campagneRappels;
       }
set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }

 get selectedCampagneRappel():CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
    set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }

   get viewCampagneRappelDialog():boolean {
           return this.campagneRappelService.viewCampagneRappelDialog;

       }
    set viewCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.viewCampagneRappelDialog= value;
       }

       get selectedTemplateRappel():TemplateRappelVo {
           return this.templateRappelService.selectedTemplateRappel;
       }
      set selectedTemplateRappel(value: TemplateRappelVo) {
        this.templateRappelService.selectedTemplateRappel = value;
       }
       get templateRappels():Array<TemplateRappelVo> {
           return this.templateRappelService.templateRappels;
       }
       set templateRappels(value: Array<TemplateRappelVo>) {
        this.templateRappelService.templateRappels = value;
       }
       get editTemplateRappelDialog():boolean {
           return this.templateRappelService.editTemplateRappelDialog;
       }
      set editTemplateRappelDialog(value: boolean) {
        this.templateRappelService.editTemplateRappelDialog= value;
       }
       get selectedCampagne():CampagneVo {
           return this.campagneService.selectedCampagne;
       }
      set selectedCampagne(value: CampagneVo) {
        this.campagneService.selectedCampagne = value;
       }
       get campagnes():Array<CampagneVo> {
           return this.campagneService.campagnes;
       }
       set campagnes(value: Array<CampagneVo>) {
        this.campagneService.campagnes = value;
       }
       get editCampagneDialog():boolean {
           return this.campagneService.editCampagneDialog;
       }
      set editCampagneDialog(value: boolean) {
        this.campagneService.editCampagneDialog= value;
       }
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
