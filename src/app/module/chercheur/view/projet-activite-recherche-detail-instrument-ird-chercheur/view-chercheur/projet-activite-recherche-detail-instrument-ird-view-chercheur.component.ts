import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-instrument-ird-view-chercheur',
  templateUrl: './projet-activite-recherche-detail-instrument-ird-view-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-instrument-ird-view-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailInstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstrumentIrdService: ProjetActiviteRechercheDetailInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private projetActiviteRechercheDetailService :ProjetActiviteRechercheDetailService
    ,private instrumentIrdService :InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

hideViewDialog(){
    this.viewProjetActiviteRechercheDetailInstrumentIrdDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailInstrumentIrds(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    return this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds;
       }
set projetActiviteRechercheDetailInstrumentIrds(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds = value;
       }

 get selectedProjetActiviteRechercheDetailInstrumentIrd():ProjetActiviteRechercheDetailInstrumentIrdVo {
           return this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd;
       }
    set selectedProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd = value;
       }

   get viewProjetActiviteRechercheDetailInstrumentIrdDialog():boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.viewProjetActiviteRechercheDetailInstrumentIrdDialog;

       }
    set viewProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.viewProjetActiviteRechercheDetailInstrumentIrdDialog= value;
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
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
