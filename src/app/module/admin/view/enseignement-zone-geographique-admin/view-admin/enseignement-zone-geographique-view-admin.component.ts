import {Component, OnInit} from '@angular/core';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-enseignement-zone-geographique-view-admin',
  templateUrl: './enseignement-zone-geographique-view-admin.component.html',
  styleUrls: ['./enseignement-zone-geographique-view-admin.component.css']
})
export class EnseignementZoneGeographiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewEnseignementZoneGeographiqueDialog  = false;
}

// getters and setters

get enseignementZoneGeographiques(): Array<EnseignementZoneGeographiqueVo> {
    return this.enseignementZoneGeographiqueService.enseignementZoneGeographiques;
       }
set enseignementZoneGeographiques(value: Array<EnseignementZoneGeographiqueVo>) {
        this.enseignementZoneGeographiqueService.enseignementZoneGeographiques = value;
       }

 get selectedEnseignementZoneGeographique():EnseignementZoneGeographiqueVo {
           return this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique;
       }
    set selectedEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique = value;
       }

   get viewEnseignementZoneGeographiqueDialog():boolean {
           return this.enseignementZoneGeographiqueService.viewEnseignementZoneGeographiqueDialog;

       }
    set viewEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.viewEnseignementZoneGeographiqueDialog= value;
       }

       get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements():Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
      set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
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
