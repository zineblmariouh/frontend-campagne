import {Component, OnInit} from '@angular/core';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-consultance-scientifique-ponctuelle-view-chercheur',
  templateUrl: './etablissement-consultance-scientifique-ponctuelle-view-chercheur.component.html',
  styleUrls: ['./etablissement-consultance-scientifique-ponctuelle-view-chercheur.component.css']
})
export class EtablissementConsultanceScientifiquePonctuelleViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementConsultanceScientifiquePonctuelleService: EtablissementConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

hideViewDialog(){
    this.viewEtablissementConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get etablissementConsultanceScientifiquePonctuelles(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
    return this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles;
       }
set etablissementConsultanceScientifiquePonctuelles(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles = value;
       }

 get selectedEtablissementConsultanceScientifiquePonctuelle():EtablissementConsultanceScientifiquePonctuelleVo {
           return this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle;
       }
    set selectedEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle = value;
       }

   get viewEtablissementConsultanceScientifiquePonctuelleDialog():boolean {
           return this.etablissementConsultanceScientifiquePonctuelleService.viewEtablissementConsultanceScientifiquePonctuelleDialog;

       }
    set viewEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.etablissementConsultanceScientifiquePonctuelleService.viewEtablissementConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedConsultanceScientifiquePonctuelle():ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles():Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get editConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog;
       }
      set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
