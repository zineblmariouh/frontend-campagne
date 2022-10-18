import {Component, OnInit} from '@angular/core';
import {CampagneRappelChercheurService} from '../../../../../controller/service/CampagneRappelChercheur.service';
import {CampagneRappelChercheurVo} from '../../../../../controller/model/CampagneRappelChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneRappelVo} from '../../../../../controller/model/CampagneRappel.model';
import {CampagneRappelService} from '../../../../../controller/service/CampagneRappel.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-rappel-chercheur-view-admin',
  templateUrl: './campagne-rappel-chercheur-view-admin.component.html',
  styleUrls: ['./campagne-rappel-chercheur-view-admin.component.css']
})
export class CampagneRappelChercheurViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneRappelChercheurService: CampagneRappelChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneRappelService :CampagneRappelService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRappel = new CampagneRappelVo();
    this.campagneRappelService.findAll().subscribe((data) => this.campagneRappels = data);
}

hideViewDialog(){
    this.viewCampagneRappelChercheurDialog  = false;
}

// getters and setters

get campagneRappelChercheurs(): Array<CampagneRappelChercheurVo> {
    return this.campagneRappelChercheurService.campagneRappelChercheurs;
       }
set campagneRappelChercheurs(value: Array<CampagneRappelChercheurVo>) {
        this.campagneRappelChercheurService.campagneRappelChercheurs = value;
       }

 get selectedCampagneRappelChercheur():CampagneRappelChercheurVo {
           return this.campagneRappelChercheurService.selectedCampagneRappelChercheur;
       }
    set selectedCampagneRappelChercheur(value: CampagneRappelChercheurVo) {
        this.campagneRappelChercheurService.selectedCampagneRappelChercheur = value;
       }

   get viewCampagneRappelChercheurDialog():boolean {
           return this.campagneRappelChercheurService.viewCampagneRappelChercheurDialog;

       }
    set viewCampagneRappelChercheurDialog(value: boolean) {
        this.campagneRappelChercheurService.viewCampagneRappelChercheurDialog= value;
       }

       get selectedCampagneRappel():CampagneRappelVo {
           return this.campagneRappelService.selectedCampagneRappel;
       }
      set selectedCampagneRappel(value: CampagneRappelVo) {
        this.campagneRappelService.selectedCampagneRappel = value;
       }
       get campagneRappels():Array<CampagneRappelVo> {
           return this.campagneRappelService.campagneRappels;
       }
       set campagneRappels(value: Array<CampagneRappelVo>) {
        this.campagneRappelService.campagneRappels = value;
       }
       get editCampagneRappelDialog():boolean {
           return this.campagneRappelService.editCampagneRappelDialog;
       }
      set editCampagneRappelDialog(value: boolean) {
        this.campagneRappelService.editCampagneRappelDialog= value;
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
