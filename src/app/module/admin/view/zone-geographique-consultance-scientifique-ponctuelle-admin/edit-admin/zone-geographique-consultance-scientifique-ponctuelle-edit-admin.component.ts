import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ZoneGeographiqueConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ZoneGeographiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-consultance-scientifique-ponctuelle-edit-admin',
  templateUrl: './zone-geographique-consultance-scientifique-ponctuelle-edit-admin.component.html',
  styleUrls: ['./zone-geographique-consultance-scientifique-ponctuelle-edit-admin.component.css']
})
export class ZoneGeographiqueConsultanceScientifiquePonctuelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueConsultanceScientifiquePonctuelleService: ZoneGeographiqueConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private paysService: PaysService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.zoneGeographiqueConsultanceScientifiquePonctuelleService.edit().subscribe(zoneGeographiqueConsultanceScientifiquePonctuelle=>{
    const myIndex = this.zoneGeographiqueConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle.id);
    this.zoneGeographiqueConsultanceScientifiquePonctuelles[myIndex] = this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
    this.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog = false;
    this.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = new ZoneGeographiqueConsultanceScientifiquePonctuelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: string) {
                      const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'add');
                       if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        this.createConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get zoneGeographiqueConsultanceScientifiquePonctuelles(): Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo> {
    return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles;
       }
set zoneGeographiqueConsultanceScientifiquePonctuelles(value: Array<ZoneGeographiqueConsultanceScientifiquePonctuelleVo>) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.zoneGeographiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedZoneGeographiqueConsultanceScientifiquePonctuelle(): ZoneGeographiqueConsultanceScientifiquePonctuelleVo {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle;
       }
    set selectedZoneGeographiqueConsultanceScientifiquePonctuelle(value: ZoneGeographiqueConsultanceScientifiquePonctuelleVo) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.selectedZoneGeographiqueConsultanceScientifiquePonctuelle = value;
       }

   get editZoneGeographiqueConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.zoneGeographiqueConsultanceScientifiquePonctuelleService.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog;

       }
    set editZoneGeographiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.zoneGeographiqueConsultanceScientifiquePonctuelleService.editZoneGeographiqueConsultanceScientifiquePonctuelleDialog = value;
       }

       get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
      set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
       }
       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
