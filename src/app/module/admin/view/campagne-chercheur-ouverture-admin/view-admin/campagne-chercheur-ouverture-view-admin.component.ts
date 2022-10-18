import {Component, OnInit} from '@angular/core';
import {CampagneChercheurOuvertureService} from '../../../../../controller/service/CampagneChercheurOuverture.service';
import {CampagneChercheurOuvertureVo} from '../../../../../controller/model/CampagneChercheurOuverture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtatCampagneChercheurVo} from '../../../../../controller/model/EtatCampagneChercheur.model';
import {EtatCampagneChercheurService} from '../../../../../controller/service/EtatCampagneChercheur.service';
import {CampagneVo} from '../../../../../controller/model/Campagne.model';
import {CampagneService} from '../../../../../controller/service/Campagne.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-chercheur-ouverture-view-admin',
  templateUrl: './campagne-chercheur-ouverture-view-admin.component.html',
  styleUrls: ['./campagne-chercheur-ouverture-view-admin.component.css']
})
export class CampagneChercheurOuvertureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneChercheurOuvertureService: CampagneChercheurOuvertureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etatCampagneChercheurService :EtatCampagneChercheurService
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
    this.selectedEtatCampagneChercheur = new EtatCampagneChercheurVo();
    this.etatCampagneChercheurService.findAll().subscribe((data) => this.etatCampagneChercheurs = data);
}

hideViewDialog(){
    this.viewCampagneChercheurOuvertureDialog  = false;
}

// getters and setters

get campagneChercheurOuvertures(): Array<CampagneChercheurOuvertureVo> {
    return this.campagneChercheurOuvertureService.campagneChercheurOuvertures;
       }
set campagneChercheurOuvertures(value: Array<CampagneChercheurOuvertureVo>) {
        this.campagneChercheurOuvertureService.campagneChercheurOuvertures = value;
       }

 get selectedCampagneChercheurOuverture():CampagneChercheurOuvertureVo {
           return this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture;
       }
    set selectedCampagneChercheurOuverture(value: CampagneChercheurOuvertureVo) {
        this.campagneChercheurOuvertureService.selectedCampagneChercheurOuverture = value;
       }

   get viewCampagneChercheurOuvertureDialog():boolean {
           return this.campagneChercheurOuvertureService.viewCampagneChercheurOuvertureDialog;

       }
    set viewCampagneChercheurOuvertureDialog(value: boolean) {
        this.campagneChercheurOuvertureService.viewCampagneChercheurOuvertureDialog= value;
       }

       get selectedEtatCampagneChercheur():EtatCampagneChercheurVo {
           return this.etatCampagneChercheurService.selectedEtatCampagneChercheur;
       }
      set selectedEtatCampagneChercheur(value: EtatCampagneChercheurVo) {
        this.etatCampagneChercheurService.selectedEtatCampagneChercheur = value;
       }
       get etatCampagneChercheurs():Array<EtatCampagneChercheurVo> {
           return this.etatCampagneChercheurService.etatCampagneChercheurs;
       }
       set etatCampagneChercheurs(value: Array<EtatCampagneChercheurVo>) {
        this.etatCampagneChercheurService.etatCampagneChercheurs = value;
       }
       get editEtatCampagneChercheurDialog():boolean {
           return this.etatCampagneChercheurService.editEtatCampagneChercheurDialog;
       }
      set editEtatCampagneChercheurDialog(value: boolean) {
        this.etatCampagneChercheurService.editEtatCampagneChercheurDialog= value;
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
