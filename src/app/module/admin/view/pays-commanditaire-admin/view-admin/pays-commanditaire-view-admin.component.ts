import {Component, OnInit} from '@angular/core';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-commanditaire-view-admin',
  templateUrl: './pays-commanditaire-view-admin.component.html',
  styleUrls: ['./pays-commanditaire-view-admin.component.css']
})
export class PaysCommanditaireViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysCommanditaireService: PaysCommanditaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewPaysCommanditaireDialog  = false;
}

// getters and setters

get paysCommanditaires(): Array<PaysCommanditaireVo> {
    return this.paysCommanditaireService.paysCommanditaires;
       }
set paysCommanditaires(value: Array<PaysCommanditaireVo>) {
        this.paysCommanditaireService.paysCommanditaires = value;
       }

 get selectedPaysCommanditaire():PaysCommanditaireVo {
           return this.paysCommanditaireService.selectedPaysCommanditaire;
       }
    set selectedPaysCommanditaire(value: PaysCommanditaireVo) {
        this.paysCommanditaireService.selectedPaysCommanditaire = value;
       }

   get viewPaysCommanditaireDialog():boolean {
           return this.paysCommanditaireService.viewPaysCommanditaireDialog;

       }
    set viewPaysCommanditaireDialog(value: boolean) {
        this.paysCommanditaireService.viewPaysCommanditaireDialog= value;
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
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
