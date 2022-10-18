import {Component, OnInit} from '@angular/core';
import {PaysZoneGeographiqueService} from '../../../../../controller/service/PaysZoneGeographique.service';
import {PaysZoneGeographiqueVo} from '../../../../../controller/model/PaysZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-zone-geographique-edit-chercheur',
  templateUrl: './pays-zone-geographique-edit-chercheur.component.html',
  styleUrls: ['./pays-zone-geographique-edit-chercheur.component.css']
})
export class PaysZoneGeographiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysZoneGeographiqueService: PaysZoneGeographiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysZoneGeographiqueService.edit().subscribe(paysZoneGeographique=>{
    const myIndex = this.paysZoneGeographiques.findIndex(e => e.id === this.selectedPaysZoneGeographique.id);
    this.paysZoneGeographiques[myIndex] = this.selectedPaysZoneGeographique;
    this.editPaysZoneGeographiqueDialog = false;
    this.selectedPaysZoneGeographique = new PaysZoneGeographiqueVo();


    }, error => {
        console.log(error);
    });

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
    this.editPaysZoneGeographiqueDialog  = false;
}

// getters and setters

get paysZoneGeographiques(): Array<PaysZoneGeographiqueVo> {
    return this.paysZoneGeographiqueService.paysZoneGeographiques;
       }
set paysZoneGeographiques(value: Array<PaysZoneGeographiqueVo>) {
        this.paysZoneGeographiqueService.paysZoneGeographiques = value;
       }

 get selectedPaysZoneGeographique(): PaysZoneGeographiqueVo {
           return this.paysZoneGeographiqueService.selectedPaysZoneGeographique;
       }
    set selectedPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this.paysZoneGeographiqueService.selectedPaysZoneGeographique = value;
       }

   get editPaysZoneGeographiqueDialog(): boolean {
           return this.paysZoneGeographiqueService.editPaysZoneGeographiqueDialog;

       }
    set editPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.editPaysZoneGeographiqueDialog = value;
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
