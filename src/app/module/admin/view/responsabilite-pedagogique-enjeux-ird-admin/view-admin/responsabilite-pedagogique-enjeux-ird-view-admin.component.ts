import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';

@Component({
  selector: 'app-responsabilite-pedagogique-enjeux-ird-view-admin',
  templateUrl: './responsabilite-pedagogique-enjeux-ird-view-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-enjeux-ird-view-admin.component.css']
})
export class ResponsabilitePedagogiqueEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEnjeuxIrdService: ResponsabilitePedagogiqueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

hideViewDialog(){
    this.viewResponsabilitePedagogiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueEnjeuxIrds(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    return this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds;
       }
set responsabilitePedagogiqueEnjeuxIrds(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds = value;
       }

 get selectedResponsabilitePedagogiqueEnjeuxIrd():ResponsabilitePedagogiqueEnjeuxIrdVo {
           return this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd;
       }
    set selectedResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd = value;
       }

   get viewResponsabilitePedagogiqueEnjeuxIrdDialog():boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.viewResponsabilitePedagogiqueEnjeuxIrdDialog;

       }
    set viewResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.viewResponsabilitePedagogiqueEnjeuxIrdDialog= value;
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
       get selectedResponsabilitePedagogique():ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
      set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
       get responsabilitePedagogiques():Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
       set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }
       get editResponsabilitePedagogiqueDialog():boolean {
           return this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog;
       }
      set editResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.editResponsabilitePedagogiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
