import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-formation-continue-view-chercheur',
  templateUrl: './zone-geographique-formation-continue-view-chercheur.component.html',
  styleUrls: ['./zone-geographique-formation-continue-view-chercheur.component.css']
})
export class ZoneGeographiqueFormationContinueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private formationContinueService :FormationContinueService
    ,private zoneGeographiqueService :ZoneGeographiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewZoneGeographiqueFormationContinueDialog  = false;
}

// getters and setters

get zoneGeographiqueFormationContinues(): Array<ZoneGeographiqueFormationContinueVo> {
    return this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues;
       }
set zoneGeographiqueFormationContinues(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues = value;
       }

 get selectedZoneGeographiqueFormationContinue():ZoneGeographiqueFormationContinueVo {
           return this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue;
       }
    set selectedZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue = value;
       }

   get viewZoneGeographiqueFormationContinueDialog():boolean {
           return this.zoneGeographiqueFormationContinueService.viewZoneGeographiqueFormationContinueDialog;

       }
    set viewZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.viewZoneGeographiqueFormationContinueDialog= value;
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
       get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues():Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get editFormationContinueDialog():boolean {
           return this.formationContinueService.editFormationContinueDialog;
       }
      set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
