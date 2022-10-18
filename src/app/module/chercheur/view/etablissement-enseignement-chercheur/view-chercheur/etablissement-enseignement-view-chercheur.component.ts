import {Component, OnInit} from '@angular/core';
import {EtablissementEnseignementService} from '../../../../../controller/service/EtablissementEnseignement.service';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-enseignement-view-chercheur',
  templateUrl: './etablissement-enseignement-view-chercheur.component.html',
  styleUrls: ['./etablissement-enseignement-view-chercheur.component.css']
})
export class EtablissementEnseignementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementEnseignementService: EtablissementEnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

hideViewDialog(){
    this.viewEtablissementEnseignementDialog  = false;
}

// getters and setters

get etablissementEnseignements(): Array<EtablissementEnseignementVo> {
    return this.etablissementEnseignementService.etablissementEnseignements;
       }
set etablissementEnseignements(value: Array<EtablissementEnseignementVo>) {
        this.etablissementEnseignementService.etablissementEnseignements = value;
       }

 get selectedEtablissementEnseignement():EtablissementEnseignementVo {
           return this.etablissementEnseignementService.selectedEtablissementEnseignement;
       }
    set selectedEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this.etablissementEnseignementService.selectedEtablissementEnseignement = value;
       }

   get viewEtablissementEnseignementDialog():boolean {
           return this.etablissementEnseignementService.viewEtablissementEnseignementDialog;

       }
    set viewEtablissementEnseignementDialog(value: boolean) {
        this.etablissementEnseignementService.viewEtablissementEnseignementDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
       }
       get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements():Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
      set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
