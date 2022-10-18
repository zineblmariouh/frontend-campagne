import {Component, OnInit} from '@angular/core';
import {PaysZoneGeographiqueService} from '../../../../../controller/service/PaysZoneGeographique.service';
import {PaysZoneGeographiqueVo} from '../../../../../controller/model/PaysZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-zone-geographique-view-admin',
  templateUrl: './pays-zone-geographique-view-admin.component.html',
  styleUrls: ['./pays-zone-geographique-view-admin.component.css']
})
export class PaysZoneGeographiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysZoneGeographiqueService: PaysZoneGeographiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
}

hideViewDialog(){
    this.viewPaysZoneGeographiqueDialog  = false;
}

// getters and setters

get paysZoneGeographiques(): Array<PaysZoneGeographiqueVo> {
    return this.paysZoneGeographiqueService.paysZoneGeographiques;
       }
set paysZoneGeographiques(value: Array<PaysZoneGeographiqueVo>) {
        this.paysZoneGeographiqueService.paysZoneGeographiques = value;
       }

 get selectedPaysZoneGeographique():PaysZoneGeographiqueVo {
           return this.paysZoneGeographiqueService.selectedPaysZoneGeographique;
       }
    set selectedPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this.paysZoneGeographiqueService.selectedPaysZoneGeographique = value;
       }

   get viewPaysZoneGeographiqueDialog():boolean {
           return this.paysZoneGeographiqueService.viewPaysZoneGeographiqueDialog;

       }
    set viewPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.viewPaysZoneGeographiqueDialog= value;
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
