import {Component, OnInit} from '@angular/core';
import {CampagneChercheurFermetureService} from '../../../../../controller/service/CampagneChercheurFermeture.service';
import {CampagneChercheurFermetureVo} from '../../../../../controller/model/CampagneChercheurFermeture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-chercheur-fermeture-view-chercheur',
  templateUrl: './campagne-chercheur-fermeture-view-chercheur.component.html',
  styleUrls: ['./campagne-chercheur-fermeture-view-chercheur.component.css']
})
export class CampagneChercheurFermetureViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneChercheurFermetureService: CampagneChercheurFermetureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneService :CampagneService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagne = new CampagneVo();
    this.campagneService.findAll().subscribe((data) => this.campagnes = data);
}

hideViewDialog(){
    this.viewCampagneChercheurFermetureDialog  = false;
}

// getters and setters

get campagneChercheurFermetures(): Array<CampagneChercheurFermetureVo> {
    return this.campagneChercheurFermetureService.campagneChercheurFermetures;
       }
set campagneChercheurFermetures(value: Array<CampagneChercheurFermetureVo>) {
        this.campagneChercheurFermetureService.campagneChercheurFermetures = value;
       }

 get selectedCampagneChercheurFermeture():CampagneChercheurFermetureVo {
           return this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture;
       }
    set selectedCampagneChercheurFermeture(value: CampagneChercheurFermetureVo) {
        this.campagneChercheurFermetureService.selectedCampagneChercheurFermeture = value;
       }

   get viewCampagneChercheurFermetureDialog():boolean {
           return this.campagneChercheurFermetureService.viewCampagneChercheurFermetureDialog;

       }
    set viewCampagneChercheurFermetureDialog(value: boolean) {
        this.campagneChercheurFermetureService.viewCampagneChercheurFermetureDialog= value;
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
