import {Component, OnInit} from '@angular/core';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';

@Component({
  selector: 'app-type-outil-pedagogique-view-chercheur',
  templateUrl: './type-outil-pedagogique-view-chercheur.component.html',
  styleUrls: ['./type-outil-pedagogique-view-chercheur.component.css']
})
export class TypeOutilPedagogiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOutilPedagogiqueService: TypeOutilPedagogiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeOutilService :TypeOutilService
    ,private outilPedagogiqueService :OutilPedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeOutil = new TypeOutilVo();
    this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewTypeOutilPedagogiqueDialog  = false;
}

// getters and setters

get typeOutilPedagogiques(): Array<TypeOutilPedagogiqueVo> {
    return this.typeOutilPedagogiqueService.typeOutilPedagogiques;
       }
set typeOutilPedagogiques(value: Array<TypeOutilPedagogiqueVo>) {
        this.typeOutilPedagogiqueService.typeOutilPedagogiques = value;
       }

 get selectedTypeOutilPedagogique():TypeOutilPedagogiqueVo {
           return this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique;
       }
    set selectedTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique = value;
       }

   get viewTypeOutilPedagogiqueDialog():boolean {
           return this.typeOutilPedagogiqueService.viewTypeOutilPedagogiqueDialog;

       }
    set viewTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.viewTypeOutilPedagogiqueDialog= value;
       }

       get selectedTypeOutil():TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils():Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get editTypeOutilDialog():boolean {
           return this.typeOutilService.editTypeOutilDialog;
       }
      set editTypeOutilDialog(value: boolean) {
        this.typeOutilService.editTypeOutilDialog= value;
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
