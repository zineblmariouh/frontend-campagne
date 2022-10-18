import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-outil-pedagogique-instrument-ird-view-chercheur',
  templateUrl: './outil-pedagogique-instrument-ird-view-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-instrument-ird-view-chercheur.component.css']
})
export class OutilPedagogiqueInstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueInstrumentIrdService: OutilPedagogiqueInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private instrumentIrdService :InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiqueInstrumentIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueInstrumentIrds(): Array<OutilPedagogiqueInstrumentIrdVo> {
    return this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds;
       }
set outilPedagogiqueInstrumentIrds(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds = value;
       }

 get selectedOutilPedagogiqueInstrumentIrd():OutilPedagogiqueInstrumentIrdVo {
           return this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd;
       }
    set selectedOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd = value;
       }

   get viewOutilPedagogiqueInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueInstrumentIrdService.viewOutilPedagogiqueInstrumentIrdDialog;

       }
    set viewOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.viewOutilPedagogiqueInstrumentIrdDialog= value;
       }

       get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques():Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get editOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.editOutilPedagogiqueDialog;
       }
      set editOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.editOutilPedagogiqueDialog= value;
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
