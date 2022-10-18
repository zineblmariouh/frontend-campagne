import {Component, OnInit} from '@angular/core';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';

@Component({
  selector: 'app-campagne-relance-view-admin',
  templateUrl: './campagne-relance-view-admin.component.html',
  styleUrls: ['./campagne-relance-view-admin.component.css']
})
export class CampagneRelanceViewAdminComponent implements OnInit {

        selectedCampagneRelanceChercheurs: CampagneRelanceChercheurVo = new CampagneRelanceChercheurVo();
        campagneRelanceChercheursListe: Array<CampagneRelanceChercheurVo> = [];

        myChercheurs: Array<ChercheurVo> = [];


constructor(private datePipe: DatePipe, private campagneRelanceService: CampagneRelanceService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneRelanceChercheurService :CampagneRelanceChercheurService
    ,private chercheurService :ChercheurService
    ,private templateRelanceService :TemplateRelanceService
    ,private campagneService :CampagneService
) {
}

// methods
ngOnInit(): void {
                this.selectedCampagneRelanceChercheurs.chercheurVo = new ChercheurVo();
                this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
    this.selectedTemplateRelance = new TemplateRelanceVo();
    this.templateRelanceService.findAll().subscribe((data) => this.templateRelances = data);
}

hideViewDialog(){
    this.viewCampagneRelanceDialog  = false;
}

// getters and setters

get campagneRelances(): Array<CampagneRelanceVo> {
    return this.campagneRelanceService.campagneRelances;
       }
set campagneRelances(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelances = value;
       }

 get selectedCampagneRelance():CampagneRelanceVo {
           return this.campagneRelanceService.selectedCampagneRelance;
       }
    set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
       }

   get viewCampagneRelanceDialog():boolean {
           return this.campagneRelanceService.viewCampagneRelanceDialog;

       }
    set viewCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.viewCampagneRelanceDialog= value;
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
       get selectedTemplateRelance():TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
      set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }
       get templateRelances():Array<TemplateRelanceVo> {
           return this.templateRelanceService.templateRelances;
       }
       set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }
       get editTemplateRelanceDialog():boolean {
           return this.templateRelanceService.editTemplateRelanceDialog;
       }
      set editTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.editTemplateRelanceDialog= value;
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
