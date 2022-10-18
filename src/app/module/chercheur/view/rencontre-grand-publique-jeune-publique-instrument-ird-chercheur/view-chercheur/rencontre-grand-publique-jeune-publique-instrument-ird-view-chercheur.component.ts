import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-instrument-ird-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-instrument-ird-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-instrument-ird-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueInstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private instrumentIrdService :InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd():RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

   get viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.viewRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog= value;
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
       get selectedRencontreGrandPubliqueJeunePublique():RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques():Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get editRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
