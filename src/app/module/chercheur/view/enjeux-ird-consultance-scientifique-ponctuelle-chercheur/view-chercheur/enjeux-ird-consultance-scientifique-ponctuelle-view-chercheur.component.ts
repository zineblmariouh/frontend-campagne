import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-consultance-scientifique-ponctuelle-view-chercheur',
  templateUrl: './enjeux-ird-consultance-scientifique-ponctuelle-view-chercheur.component.html',
  styleUrls: ['./enjeux-ird-consultance-scientifique-ponctuelle-view-chercheur.component.css']
})
export class EnjeuxIrdConsultanceScientifiquePonctuelleViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdConsultanceScientifiquePonctuelleService: EnjeuxIrdConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
}

hideViewDialog(){
    this.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get enjeuxIrdConsultanceScientifiquePonctuelles(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    return this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles;
       }
set enjeuxIrdConsultanceScientifiquePonctuelles(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedEnjeuxIrdConsultanceScientifiquePonctuelle():EnjeuxIrdConsultanceScientifiquePonctuelleVo {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
       }
    set selectedEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

   get viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog():boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog;

       }
    set viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
