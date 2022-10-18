import {Component, OnInit} from '@angular/core';
import {InstrumentIrdChercheurService} from '../../../../../controller/service/InstrumentIrdChercheur.service';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-instrument-ird-chercheur-view-chercheur',
  templateUrl: './instrument-ird-chercheur-view-chercheur.component.html',
  styleUrls: ['./instrument-ird-chercheur-view-chercheur.component.css']
})
export class InstrumentIrdChercheurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdChercheurService: InstrumentIrdChercheurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private instrumentIrdService :InstrumentIrdService
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewInstrumentIrdChercheurDialog  = false;
}

// getters and setters

get instrumentIrdChercheurs(): Array<InstrumentIrdChercheurVo> {
    return this.instrumentIrdChercheurService.instrumentIrdChercheurs;
       }
set instrumentIrdChercheurs(value: Array<InstrumentIrdChercheurVo>) {
        this.instrumentIrdChercheurService.instrumentIrdChercheurs = value;
       }

 get selectedInstrumentIrdChercheur():InstrumentIrdChercheurVo {
           return this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur;
       }
    set selectedInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur = value;
       }

   get viewInstrumentIrdChercheurDialog():boolean {
           return this.instrumentIrdChercheurService.viewInstrumentIrdChercheurDialog;

       }
    set viewInstrumentIrdChercheurDialog(value: boolean) {
        this.instrumentIrdChercheurService.viewInstrumentIrdChercheurDialog= value;
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
       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
