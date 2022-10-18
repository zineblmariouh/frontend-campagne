import {Component, OnInit} from '@angular/core';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-view-chercheur',
  templateUrl: './instrument-ird-view-chercheur.component.html',
  styleUrls: ['./instrument-ird-view-chercheur.component.css']
})
export class InstrumentIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdService: InstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
}

hideViewDialog(){
    this.viewInstrumentIrdDialog  = false;
}

// getters and setters

get instrumentIrds(): Array<InstrumentIrdVo> {
    return this.instrumentIrdService.instrumentIrds;
       }
set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }

 get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }

   get viewInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.viewInstrumentIrdDialog;

       }
    set viewInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.viewInstrumentIrdDialog= value;
       }

       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
