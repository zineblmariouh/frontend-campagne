import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirProjetActiviteRechercheService} from '../../../../../controller/service/CommunauteSavoirProjetActiviteRecherche.service';
import {CommunauteSavoirProjetActiviteRechercheVo} from '../../../../../controller/model/CommunauteSavoirProjetActiviteRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-projet-activite-recherche-view-chercheur',
  templateUrl: './communaute-savoir-projet-activite-recherche-view-chercheur.component.html',
  styleUrls: ['./communaute-savoir-projet-activite-recherche-view-chercheur.component.css']
})
export class CommunauteSavoirProjetActiviteRechercheViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirProjetActiviteRechercheService: CommunauteSavoirProjetActiviteRechercheService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetActiviteRechercheService :ProjetActiviteRechercheService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
    this.projetActiviteRechercheService.findAll().subscribe((data) => this.projetActiviteRecherches = data);
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
}

hideViewDialog(){
    this.viewCommunauteSavoirProjetActiviteRechercheDialog  = false;
}

// getters and setters

get communauteSavoirProjetActiviteRecherches(): Array<CommunauteSavoirProjetActiviteRechercheVo> {
    return this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches;
       }
set communauteSavoirProjetActiviteRecherches(value: Array<CommunauteSavoirProjetActiviteRechercheVo>) {
        this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches = value;
       }

 get selectedCommunauteSavoirProjetActiviteRecherche():CommunauteSavoirProjetActiviteRechercheVo {
           return this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche;
       }
    set selectedCommunauteSavoirProjetActiviteRecherche(value: CommunauteSavoirProjetActiviteRechercheVo) {
        this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche = value;
       }

   get viewCommunauteSavoirProjetActiviteRechercheDialog():boolean {
           return this.communauteSavoirProjetActiviteRechercheService.viewCommunauteSavoirProjetActiviteRechercheDialog;

       }
    set viewCommunauteSavoirProjetActiviteRechercheDialog(value: boolean) {
        this.communauteSavoirProjetActiviteRechercheService.viewCommunauteSavoirProjetActiviteRechercheDialog= value;
       }

       get selectedProjetActiviteRecherche():ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches():Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get editProjetActiviteRechercheDialog():boolean {
           return this.projetActiviteRechercheService.editProjetActiviteRechercheDialog;
       }
      set editProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.editProjetActiviteRechercheDialog= value;
       }
       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
