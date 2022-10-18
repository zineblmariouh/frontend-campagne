import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueConseilsScientifiqueService} from '../../../../../controller/service/ZoneGeographiqueConseilsScientifique.service';
import {ZoneGeographiqueConseilsScientifiqueVo} from '../../../../../controller/model/ZoneGeographiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-conseils-scientifique-edit-chercheur',
  templateUrl: './zone-geographique-conseils-scientifique-edit-chercheur.component.html',
  styleUrls: ['./zone-geographique-conseils-scientifique-edit-chercheur.component.css']
})
export class ZoneGeographiqueConseilsScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueConseilsScientifiqueService: ZoneGeographiqueConseilsScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private paysService: PaysService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.zoneGeographiqueConseilsScientifiqueService.edit().subscribe(zoneGeographiqueConseilsScientifique=>{
    const myIndex = this.zoneGeographiqueConseilsScientifiques.findIndex(e => e.id === this.selectedZoneGeographiqueConseilsScientifique.id);
    this.zoneGeographiqueConseilsScientifiques[myIndex] = this.selectedZoneGeographiqueConseilsScientifique;
    this.editZoneGeographiqueConseilsScientifiqueDialog = false;
    this.selectedZoneGeographiqueConseilsScientifique = new ZoneGeographiqueConseilsScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
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
    this.editZoneGeographiqueConseilsScientifiqueDialog  = false;
}

// getters and setters

get zoneGeographiqueConseilsScientifiques(): Array<ZoneGeographiqueConseilsScientifiqueVo> {
    return this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques;
       }
set zoneGeographiqueConseilsScientifiques(value: Array<ZoneGeographiqueConseilsScientifiqueVo>) {
        this.zoneGeographiqueConseilsScientifiqueService.zoneGeographiqueConseilsScientifiques = value;
       }

 get selectedZoneGeographiqueConseilsScientifique(): ZoneGeographiqueConseilsScientifiqueVo {
           return this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique;
       }
    set selectedZoneGeographiqueConseilsScientifique(value: ZoneGeographiqueConseilsScientifiqueVo) {
        this.zoneGeographiqueConseilsScientifiqueService.selectedZoneGeographiqueConseilsScientifique = value;
       }

   get editZoneGeographiqueConseilsScientifiqueDialog(): boolean {
           return this.zoneGeographiqueConseilsScientifiqueService.editZoneGeographiqueConseilsScientifiqueDialog;

       }
    set editZoneGeographiqueConseilsScientifiqueDialog(value: boolean) {
        this.zoneGeographiqueConseilsScientifiqueService.editZoneGeographiqueConseilsScientifiqueDialog = value;
       }

       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
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
