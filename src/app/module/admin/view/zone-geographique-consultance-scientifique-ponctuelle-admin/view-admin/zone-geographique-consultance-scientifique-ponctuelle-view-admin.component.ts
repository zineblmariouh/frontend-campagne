import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-consultance-scientifique-ponctuelle-view-admin',
  templateUrl: './zone-geographique-consultance-scientifique-ponctuelle-view-admin.component.html',
  styleUrls: ['./zone-geographique-consultance-scientifique-ponctuelle-view-admin.component.css']
})
export class ZoneGeographiqueConsultanceScientifiquePonctuelleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueConsultanceScientifiquePonctuelleService: ZoneGeographiqueConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get zoneGeographiqueConsultanceScientifiquePonctuelles(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
    return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles;
       }
set zoneGeographiqueConsultanceScientifiquePonctuelles(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedZoneGeographiqueConsultanceScientifiquePonctuelle():ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
       }
    set selectedZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

   get viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog;

       }
    set viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.viewZoneGeographiqueConsultanceScientifiquePonctuelleDialog= value;
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
       get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques():Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get editZoneGeographiqueDialog():boolean {
           return this.zoneGeographiqueService.editZoneGeographiqueDialog;
       }
      set editZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.editZoneGeographiqueDialog= value;
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
