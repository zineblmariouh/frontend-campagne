import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-enjeux-ird-view-admin',
  templateUrl: './projet-activite-recherche-detail-enjeux-ird-view-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-enjeux-ird-view-admin.component.css']
})
export class ProjetActiviteRechercheDetailEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEnjeuxIrdService: ProjetActiviteRechercheDetailEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

hideViewDialog(){
    this.viewProjetActiviteRechercheDetailEnjeuxIrdDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailEnjeuxIrds(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    return this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds;
       }
set projetActiviteRechercheDetailEnjeuxIrds(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds = value;
       }

 get selectedProjetActiviteRechercheDetailEnjeuxIrd():ProjetActiviteRechercheDetailEnjeuxIrdVo {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd;
       }
    set selectedProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

   get viewProjetActiviteRechercheDetailEnjeuxIrdDialog():boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.viewProjetActiviteRechercheDetailEnjeuxIrdDialog;

       }
    set viewProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.viewProjetActiviteRechercheDetailEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
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
