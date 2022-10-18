import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-responsabilite-pedagogique-etablissement-view-chercheur',
  templateUrl: './responsabilite-pedagogique-etablissement-view-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-etablissement-view-chercheur.component.css']
})
export class ResponsabilitePedagogiqueEtablissementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEtablissementService: ResponsabilitePedagogiqueEtablissementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private etablissementService :EtablissementService
    ,private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewResponsabilitePedagogiqueEtablissementDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueEtablissements(): Array<ResponsabilitePedagogiqueEtablissementVo> {
    return this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements;
       }
set responsabilitePedagogiqueEtablissements(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements = value;
       }

 get selectedResponsabilitePedagogiqueEtablissement():ResponsabilitePedagogiqueEtablissementVo {
           return this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement;
       }
    set selectedResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement = value;
       }

   get viewResponsabilitePedagogiqueEtablissementDialog():boolean {
           return this.responsabilitePedagogiqueEtablissementService.viewResponsabilitePedagogiqueEtablissementDialog;

       }
    set viewResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this.responsabilitePedagogiqueEtablissementService.viewResponsabilitePedagogiqueEtablissementDialog= value;
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
       get selectedResponsabilitePedagogique():ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
      set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
       get responsabilitePedagogiques():Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
       set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }
       get editResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog;
       }
      set editResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog= value;
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
