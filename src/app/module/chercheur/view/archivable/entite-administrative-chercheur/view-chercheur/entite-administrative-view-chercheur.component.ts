import {Component, OnInit} from '@angular/core';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';

@Component({
  selector: 'app-entite-administrative-view-chercheur',
  templateUrl: './entite-administrative-view-chercheur.component.html',
  styleUrls: ['./entite-administrative-view-chercheur.component.css']
})
export class EntiteAdministrativeViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeEntiteAdministrativeService :TypeEntiteAdministrativeService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
}

hideViewDialog(){
    this.viewEntiteAdministrativeDialog  = false;
}

// getters and setters

get entiteAdministratives(): Array<EntiteAdministrativeVo> {
    return this.entiteAdministrativeService.entiteAdministratives;
       }
set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

 get selectedEntiteAdministrative():EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }

   get viewEntiteAdministrativeDialog():boolean {
           return this.entiteAdministrativeService.viewEntiteAdministrativeDialog;

       }
    set viewEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.viewEntiteAdministrativeDialog= value;
       }

       get selectedTypeEntiteAdministrative():TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives():Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get editTypeEntiteAdministrativeDialog():boolean {
           return this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog;
       }
      set editTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.editTypeEntiteAdministrativeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
