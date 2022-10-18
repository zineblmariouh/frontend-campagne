import {Component, OnInit} from '@angular/core';
import {DistinctionEtablissementPaysService} from '../../../../../controller/service/DistinctionEtablissementPays.service';
import {DistinctionEtablissementPaysVo} from '../../../../../controller/model/DistinctionEtablissementPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {DistinctionService} from '../../../../../controller/service/Distinction.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-distinction-etablissement-pays-view-admin',
  templateUrl: './distinction-etablissement-pays-view-admin.component.html',
  styleUrls: ['./distinction-etablissement-pays-view-admin.component.css']
})
export class DistinctionEtablissementPaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private distinctionEtablissementPaysService: DistinctionEtablissementPaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private distinctionService :DistinctionService
    ,private etablissementService :EtablissementService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedDistinction = new DistinctionVo();
    this.distinctionService.findAll().subscribe((data) => this.distinctions = data);
}

hideViewDialog(){
    this.viewDistinctionEtablissementPaysDialog  = false;
}

// getters and setters

get distinctionEtablissementPayss(): Array<DistinctionEtablissementPaysVo> {
    return this.distinctionEtablissementPaysService.distinctionEtablissementPayss;
       }
set distinctionEtablissementPayss(value: Array<DistinctionEtablissementPaysVo>) {
        this.distinctionEtablissementPaysService.distinctionEtablissementPayss = value;
       }

 get selectedDistinctionEtablissementPays():DistinctionEtablissementPaysVo {
           return this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays;
       }
    set selectedDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays = value;
       }

   get viewDistinctionEtablissementPaysDialog():boolean {
           return this.distinctionEtablissementPaysService.viewDistinctionEtablissementPaysDialog;

       }
    set viewDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.viewDistinctionEtablissementPaysDialog= value;
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
       get selectedDistinction():DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
      set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }
       get distinctions():Array<DistinctionVo> {
           return this.distinctionService.distinctions;
       }
       set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
       }
       get editDistinctionDialog():boolean {
           return this.distinctionService.editDistinctionDialog;
       }
      set editDistinctionDialog(value: boolean) {
        this.distinctionService.editDistinctionDialog= value;
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
