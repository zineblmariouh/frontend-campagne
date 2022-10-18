import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEtablissementLanceurService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEtablissementLanceur.service';
import {ProjetActiviteRechercheDetailEtablissementLanceurVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEtablissementLanceur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-etablissement-lanceur-view-admin',
  templateUrl: './projet-activite-recherche-detail-etablissement-lanceur-view-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-etablissement-lanceur-view-admin.component.css']
})
export class ProjetActiviteRechercheDetailEtablissementLanceurViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEtablissementLanceurService: ProjetActiviteRechercheDetailEtablissementLanceurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

hideViewDialog(){
    this.viewProjetActiviteRechercheDetailEtablissementLanceurDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailEtablissementLanceurs(): Array<ProjetActiviteRechercheDetailEtablissementLanceurVo> {
    return this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs;
       }
set projetActiviteRechercheDetailEtablissementLanceurs(value: Array<ProjetActiviteRechercheDetailEtablissementLanceurVo>) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.projetActiviteRechercheDetailEtablissementLanceurs = value;
       }

 get selectedProjetActiviteRechercheDetailEtablissementLanceur():ProjetActiviteRechercheDetailEtablissementLanceurVo {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur;
       }
    set selectedProjetActiviteRechercheDetailEtablissementLanceur(value: ProjetActiviteRechercheDetailEtablissementLanceurVo) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.selectedProjetActiviteRechercheDetailEtablissementLanceur = value;
       }

   get viewProjetActiviteRechercheDetailEtablissementLanceurDialog():boolean {
           return this.projetActiviteRechercheDetailEtablissementLanceurService.viewProjetActiviteRechercheDetailEtablissementLanceurDialog;

       }
    set viewProjetActiviteRechercheDetailEtablissementLanceurDialog(value: boolean) {
        this.projetActiviteRechercheDetailEtablissementLanceurService.viewProjetActiviteRechercheDetailEtablissementLanceurDialog= value;
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
       get selectedProjetActiviteRechercheDetail():ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
      set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }
       get projetActiviteRechercheDetails():Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
       set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }
       get editProjetActiviteRechercheDetailDialog():boolean {
           return this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog;
       }
      set editProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.editProjetActiviteRechercheDetailDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
