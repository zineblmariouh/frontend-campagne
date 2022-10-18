import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-outil-pedagogique-enjeux-ird-view-admin',
  templateUrl: './outil-pedagogique-enjeux-ird-view-admin.component.html',
  styleUrls: ['./outil-pedagogique-enjeux-ird-view-admin.component.css']
})
export class OutilPedagogiqueEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueEnjeuxIrdService: OutilPedagogiqueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewOutilPedagogiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueEnjeuxIrds(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    return this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds;
       }
set outilPedagogiqueEnjeuxIrds(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds = value;
       }

 get selectedOutilPedagogiqueEnjeuxIrd():OutilPedagogiqueEnjeuxIrdVo {
           return this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd;
       }
    set selectedOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd = value;
       }

   get viewOutilPedagogiqueEnjeuxIrdDialog():boolean {
           return this.outilPedagogiqueEnjeuxIrdService.viewOutilPedagogiqueEnjeuxIrdDialog;

       }
    set viewOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.viewOutilPedagogiqueEnjeuxIrdDialog= value;
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
