import {Component, OnInit} from '@angular/core';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueService} from '../../../../../controller/service/ObjetFormationGeneriqueDeResponsabilitePedagogique.service';
import {ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo} from '../../../../../controller/model/ObjetFormationGeneriqueDeResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';

@Component({
  selector: 'app-objet-formation-generique-de-responsabilite-pedagogique-view-admin',
  templateUrl: './objet-formation-generique-de-responsabilite-pedagogique-view-admin.component.html',
  styleUrls: ['./objet-formation-generique-de-responsabilite-pedagogique-view-admin.component.css']
})
export class ObjetFormationGeneriqueDeResponsabilitePedagogiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private objetFormationGeneriqueDeResponsabilitePedagogiqueService: ObjetFormationGeneriqueDeResponsabilitePedagogiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private objetFormationGeneriqueService :ObjetFormationGeneriqueService
    ,private responsabilitePedagogiqueService :ResponsabilitePedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

hideViewDialog(){
    this.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get objetFormationGeneriqueDeResponsabilitePedagogiques(): Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo> {
    return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques;
       }
set objetFormationGeneriqueDeResponsabilitePedagogiques(value: Array<ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo>) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.objetFormationGeneriqueDeResponsabilitePedagogiques = value;
       }

 get selectedObjetFormationGeneriqueDeResponsabilitePedagogique():ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique;
       }
    set selectedObjetFormationGeneriqueDeResponsabilitePedagogique(value: ObjetFormationGeneriqueDeResponsabilitePedagogiqueVo) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.selectedObjetFormationGeneriqueDeResponsabilitePedagogique = value;
       }

   get viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog():boolean {
           return this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog;

       }
    set viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog(value: boolean) {
        this.objetFormationGeneriqueDeResponsabilitePedagogiqueService.viewObjetFormationGeneriqueDeResponsabilitePedagogiqueDialog= value;
       }

       get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques():Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get editObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
       }
      set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog= value;
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
