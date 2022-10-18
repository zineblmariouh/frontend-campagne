import {Component, OnInit} from '@angular/core';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-consultance-scientifique-ponctuelle-view-admin',
  templateUrl: './instrument-ird-consultance-scientifique-ponctuelle-view-admin.component.html',
  styleUrls: ['./instrument-ird-consultance-scientifique-ponctuelle-view-admin.component.css']
})
export class InstrumentIrdConsultanceScientifiquePonctuelleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdConsultanceScientifiquePonctuelleService: InstrumentIrdConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private instrumentIrdService :InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

hideViewDialog(){
    this.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get instrumentIrdConsultanceScientifiquePonctuelles(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
    return this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles;
       }
set instrumentIrdConsultanceScientifiquePonctuelles(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedInstrumentIrdConsultanceScientifiquePonctuelle():InstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

   get viewInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog;

       }
    set viewInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.viewInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
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
