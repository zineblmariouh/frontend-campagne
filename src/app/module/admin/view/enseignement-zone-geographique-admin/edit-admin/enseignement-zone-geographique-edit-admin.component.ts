import {Component, OnInit} from '@angular/core';
import {EnseignementZoneGeographiqueService} from '../../../../../controller/service/EnseignementZoneGeographique.service';
import {EnseignementZoneGeographiqueVo} from '../../../../../controller/model/EnseignementZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-enseignement-zone-geographique-edit-admin',
  templateUrl: './enseignement-zone-geographique-edit-admin.component.html',
  styleUrls: ['./enseignement-zone-geographique-edit-admin.component.css']
})
export class EnseignementZoneGeographiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementZoneGeographiqueService: EnseignementZoneGeographiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private paysService: PaysService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementZoneGeographiqueService.edit().subscribe(enseignementZoneGeographique=>{
    const myIndex = this.enseignementZoneGeographiques.findIndex(e => e.id === this.selectedEnseignementZoneGeographique.id);
    this.enseignementZoneGeographiques[myIndex] = this.selectedEnseignementZoneGeographique;
    this.editEnseignementZoneGeographiqueDialog = false;
    this.selectedEnseignementZoneGeographique = new EnseignementZoneGeographiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
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
    this.editEnseignementZoneGeographiqueDialog  = false;
}

// getters and setters

get enseignementZoneGeographiques(): Array<EnseignementZoneGeographiqueVo> {
    return this.enseignementZoneGeographiqueService.enseignementZoneGeographiques;
       }
set enseignementZoneGeographiques(value: Array<EnseignementZoneGeographiqueVo>) {
        this.enseignementZoneGeographiqueService.enseignementZoneGeographiques = value;
       }

 get selectedEnseignementZoneGeographique(): EnseignementZoneGeographiqueVo {
           return this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique;
       }
    set selectedEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this.enseignementZoneGeographiqueService.selectedEnseignementZoneGeographique = value;
       }

   get editEnseignementZoneGeographiqueDialog(): boolean {
           return this.enseignementZoneGeographiqueService.editEnseignementZoneGeographiqueDialog;

       }
    set editEnseignementZoneGeographiqueDialog(value: boolean) {
        this.enseignementZoneGeographiqueService.editEnseignementZoneGeographiqueDialog = value;
       }

       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
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
