import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-etablissement-view-admin',
  templateUrl: './vie-institutionnelle-detail-etablissement-view-admin.component.html',
  styleUrls: ['./vie-institutionnelle-detail-etablissement-view-admin.component.css']
})
export class VieInstitutionnelleDetailEtablissementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

hideViewDialog(){
    this.viewVieInstitutionnelleDetailEtablissementDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetailEtablissements(): Array<VieInstitutionnelleDetailEtablissementVo> {
    return this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements;
       }
set vieInstitutionnelleDetailEtablissements(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements = value;
       }

 get selectedVieInstitutionnelleDetailEtablissement():VieInstitutionnelleDetailEtablissementVo {
           return this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement;
       }
    set selectedVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement = value;
       }

   get viewVieInstitutionnelleDetailEtablissementDialog():boolean {
           return this.vieInstitutionnelleDetailEtablissementService.viewVieInstitutionnelleDetailEtablissementDialog;

       }
    set viewVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.viewVieInstitutionnelleDetailEtablissementDialog= value;
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
       get selectedVieInstitutionnelleDetail():VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
      set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }
       get vieInstitutionnelleDetails():Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
       set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }
       get editVieInstitutionnelleDetailDialog():boolean {
           return this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog;
       }
      set editVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.editVieInstitutionnelleDetailDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
