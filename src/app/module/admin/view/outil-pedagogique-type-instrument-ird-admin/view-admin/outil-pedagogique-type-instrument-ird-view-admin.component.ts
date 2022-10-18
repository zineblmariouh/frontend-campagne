import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-outil-pedagogique-type-instrument-ird-view-admin',
  templateUrl: './outil-pedagogique-type-instrument-ird-view-admin.component.html',
  styleUrls: ['./outil-pedagogique-type-instrument-ird-view-admin.component.css']
})
export class OutilPedagogiqueTypeInstrumentIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueTypeInstrumentIrdService: OutilPedagogiqueTypeInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiqueTypeInstrumentIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueTypeInstrumentIrds(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
    return this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds;
       }
set outilPedagogiqueTypeInstrumentIrds(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds = value;
       }

 get selectedOutilPedagogiqueTypeInstrumentIrd():OutilPedagogiqueTypeInstrumentIrdVo {
           return this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd;
       }
    set selectedOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd = value;
       }

   get viewOutilPedagogiqueTypeInstrumentIrdDialog():boolean {
           return this.outilPedagogiqueTypeInstrumentIrdService.viewOutilPedagogiqueTypeInstrumentIrdDialog;

       }
    set viewOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueTypeInstrumentIrdService.viewOutilPedagogiqueTypeInstrumentIrdDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
