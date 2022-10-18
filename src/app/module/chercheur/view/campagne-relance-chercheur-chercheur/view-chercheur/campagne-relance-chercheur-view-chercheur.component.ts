import {Component, OnInit} from '@angular/core';
import {CampagneRelanceChercheurService} from '../../../../../controller/service/CampagneRelanceChercheur.service';
import {CampagneRelanceChercheurVo} from '../../../../../controller/model/CampagneRelanceChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CampagneRelanceVo} from '../../../../../controller/model/CampagneRelance.model';
import {CampagneRelanceService} from '../../../../../controller/service/CampagneRelance.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-campagne-relance-chercheur-view-chercheur',
  templateUrl: './campagne-relance-chercheur-view-chercheur.component.html',
  styleUrls: ['./campagne-relance-chercheur-view-chercheur.component.css']
})
export class CampagneRelanceChercheurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private campagneRelanceChercheurService: CampagneRelanceChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private campagneRelanceService :CampagneRelanceService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
    this.selectedCampagneRelance = new CampagneRelanceVo();
    this.campagneRelanceService.findAll().subscribe((data) => this.campagneRelances = data);
}

hideViewDialog(){
    this.viewCampagneRelanceChercheurDialog  = false;
}

// getters and setters

get campagneRelanceChercheurs(): Array<CampagneRelanceChercheurVo> {
    return this.campagneRelanceChercheurService.campagneRelanceChercheurs;
       }
set campagneRelanceChercheurs(value: Array<CampagneRelanceChercheurVo>) {
        this.campagneRelanceChercheurService.campagneRelanceChercheurs = value;
       }

 get selectedCampagneRelanceChercheur():CampagneRelanceChercheurVo {
           return this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur;
       }
    set selectedCampagneRelanceChercheur(value: CampagneRelanceChercheurVo) {
        this.campagneRelanceChercheurService.selectedCampagneRelanceChercheur = value;
       }

   get viewCampagneRelanceChercheurDialog():boolean {
           return this.campagneRelanceChercheurService.viewCampagneRelanceChercheurDialog;

       }
    set viewCampagneRelanceChercheurDialog(value: boolean) {
        this.campagneRelanceChercheurService.viewCampagneRelanceChercheurDialog= value;
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
       get selectedCampagneRelance():CampagneRelanceVo {
           return this.campagneRelanceService.selectedCampagneRelance;
       }
      set selectedCampagneRelance(value: CampagneRelanceVo) {
        this.campagneRelanceService.selectedCampagneRelance = value;
       }
       get campagneRelances():Array<CampagneRelanceVo> {
           return this.campagneRelanceService.campagneRelances;
       }
       set campagneRelances(value: Array<CampagneRelanceVo>) {
        this.campagneRelanceService.campagneRelances = value;
       }
       get editCampagneRelanceDialog():boolean {
           return this.campagneRelanceService.editCampagneRelanceDialog;
       }
      set editCampagneRelanceDialog(value: boolean) {
        this.campagneRelanceService.editCampagneRelanceDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
