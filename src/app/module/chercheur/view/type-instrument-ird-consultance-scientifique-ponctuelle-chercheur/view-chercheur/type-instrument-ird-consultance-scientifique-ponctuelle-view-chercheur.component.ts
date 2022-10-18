import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';

@Component({
  selector: 'app-type-instrument-ird-consultance-scientifique-ponctuelle-view-chercheur',
  templateUrl: './type-instrument-ird-consultance-scientifique-ponctuelle-view-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-consultance-scientifique-ponctuelle-view-chercheur.component.css']
})
export class TypeInstrumentIrdConsultanceScientifiquePonctuelleViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdConsultanceScientifiquePonctuelleService: TypeInstrumentIrdConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
}

hideViewDialog(){
    this.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get typeInstrumentIrdConsultanceScientifiquePonctuelles(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
    return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles;
       }
set typeInstrumentIrdConsultanceScientifiquePonctuelles(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle():TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

   get viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;

       }
    set viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog= value;
       }

       get selectedConsultanceScientifiquePonctuelle():ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles():Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get editConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog;
       }
      set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog= value;
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
