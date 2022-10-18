import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-conseils-scientifique-view-chercheur',
  templateUrl: './zone-geographique-conseils-scientifique-view-chercheur.component.html',
  styleUrls: ['./zone-geographique-conseils-scientifique-view-chercheur.component.css']
})
export class ZoneGeographiqueConseilsScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueConseilsScientifiqueService: ZoneGeographiqueConseilsScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private conseilsScientifiqueService :ConseilsScientifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewZoneGeographiqueConseilsScientifiqueDialog  = false;
}

// getters and setters

get zoneGeographiqueConseilsScientifiques(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
    return this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques;
       }
set zoneGeographiqueConseilsScientifiques(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques = value;
       }

 get selectedZoneGeographiqueConseilsScientifique():ZoneGeographiqueConseilsScientifiqueVo {
           return this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique;
       }
    set selectedZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique = value;
       }

   get viewZoneGeographiqueConseilsScientifiqueDialog():boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.viewZoneGeographiqueConseilsScientifiqueDialog;

       }
    set viewZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.viewZoneGeographiqueConseilsScientifiqueDialog= value;
       }

       get selectedConseilsScientifique():ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques():Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get editConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.editConseilsScientifiqueDialog;
       }
      set editConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.editConseilsScientifiqueDialog= value;
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
