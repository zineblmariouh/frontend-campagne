import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-responsabilite-pedagogique-pays-view-admin',
  templateUrl: './responsabilite-pedagogique-pays-view-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-pays-view-admin.component.css']
})
export class ResponsabilitePedagogiquePaysViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiquePaysService: ResponsabilitePedagogiquePaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

hideViewDialog(){
    this.viewResponsabilitePedagogiquePaysDialog  = false;
}

// getters and setters

get responsabilitePedagogiquePayss(): Array<ResponsabilitePedagogiquePaysVo> {
    return this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss;
       }
set responsabilitePedagogiquePayss(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss = value;
       }

 get selectedResponsabilitePedagogiquePays():ResponsabilitePedagogiquePaysVo {
           return this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays;
       }
    set selectedResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays = value;
       }

   get viewResponsabilitePedagogiquePaysDialog():boolean {
           return this.responsabilitePedagogiquePaysService.viewResponsabilitePedagogiquePaysDialog;

       }
    set viewResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.viewResponsabilitePedagogiquePaysDialog= value;
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
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
