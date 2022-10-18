import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-instrument-ird-view-chercheur',
  templateUrl: './vie-institutionnelle-detail-instrument-ird-view-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-instrument-ird-view-chercheur.component.css']
})
export class VieInstitutionnelleDetailInstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private vieInstitutionnelleDetailService :VieInstitutionnelleDetailService
    ,private instrumentIrdService :InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

hideViewDialog(){
    this.viewVieInstitutionnelleDetailInstrumentIrdDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetailInstrumentIrds(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    return this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds;
       }
set vieInstitutionnelleDetailInstrumentIrds(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds = value;
       }

 get selectedVieInstitutionnelleDetailInstrumentIrd():VieInstitutionnelleDetailInstrumentIrdVo {
           return this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd;
       }
    set selectedVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd = value;
       }

   get viewVieInstitutionnelleDetailInstrumentIrdDialog():boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.viewVieInstitutionnelleDetailInstrumentIrdDialog;

       }
    set viewVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.viewVieInstitutionnelleDetailInstrumentIrdDialog= value;
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
