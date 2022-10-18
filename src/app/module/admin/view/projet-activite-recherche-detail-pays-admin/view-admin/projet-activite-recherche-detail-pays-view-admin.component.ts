import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-pays-view-admin',
  templateUrl: './projet-activite-recherche-detail-pays-view-admin.component.html',
  styleUrls: ['./projet-activite-recherche-detail-pays-view-admin.component.css']
})
export class ProjetActiviteRechercheDetailPaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailPaysService: ProjetActiviteRechercheDetailPaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

hideViewDialog(){
    this.viewProjetActiviteRechercheDetailPaysDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailPayss(): Array<ProjetActiviteRechercheDetailPaysVo> {
    return this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss;
       }
set projetActiviteRechercheDetailPayss(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss = value;
       }

 get selectedProjetActiviteRechercheDetailPays():ProjetActiviteRechercheDetailPaysVo {
           return this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays;
       }
    set selectedProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays = value;
       }

   get viewProjetActiviteRechercheDetailPaysDialog():boolean {
           return this.projetActiviteRechercheDetailPaysService.viewProjetActiviteRechercheDetailPaysDialog;

       }
    set viewProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.viewProjetActiviteRechercheDetailPaysDialog= value;
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
