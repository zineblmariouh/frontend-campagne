import {Component, OnInit} from '@angular/core';
import {ZoneGeographiqueFormationContinueService} from '../../../../../controller/service/ZoneGeographiqueFormationContinue.service';
import {ZoneGeographiqueFormationContinueVo} from '../../../../../controller/model/ZoneGeographiqueFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-zone-geographique-formation-continue-edit-chercheur',
  templateUrl: './zone-geographique-formation-continue-edit-chercheur.component.html',
  styleUrls: ['./zone-geographique-formation-continue-edit-chercheur.component.css']
})
export class ZoneGeographiqueFormationContinueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private zoneGeographiqueFormationContinueService: ZoneGeographiqueFormationContinueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private formationContinueService: FormationContinueService
 ,       private zoneGeographiqueService: ZoneGeographiqueService
 ,       private paysService: PaysService
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

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.zoneGeographiqueFormationContinueService.edit().subscribe(zoneGeographiqueFormationContinue=>{
    const myIndex = this.zoneGeographiqueFormationContinues.findIndex(e => e.id === this.selectedZoneGeographiqueFormationContinue.id);
    this.zoneGeographiqueFormationContinues[myIndex] = this.selectedZoneGeographiqueFormationContinue;
    this.editZoneGeographiqueFormationContinueDialog = false;
    this.selectedZoneGeographiqueFormationContinue = new ZoneGeographiqueFormationContinueVo();


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
              public async openCreateformationContinue(formationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('FormationContinue', 'add');
                       if(isPermistted){
         this.selectedFormationContinue = new FormationContinueVo();
        this.createFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editZoneGeographiqueFormationContinueDialog  = false;
}

// getters and setters

get zoneGeographiqueFormationContinues(): Array<ZoneGeographiqueFormationContinueVo> {
    return this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues;
       }
set zoneGeographiqueFormationContinues(value: Array<ZoneGeographiqueFormationContinueVo>) {
        this.zoneGeographiqueFormationContinueService.zoneGeographiqueFormationContinues = value;
       }

 get selectedZoneGeographiqueFormationContinue(): ZoneGeographiqueFormationContinueVo {
           return this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue;
       }
    set selectedZoneGeographiqueFormationContinue(value: ZoneGeographiqueFormationContinueVo) {
        this.zoneGeographiqueFormationContinueService.selectedZoneGeographiqueFormationContinue = value;
       }

   get editZoneGeographiqueFormationContinueDialog(): boolean {
           return this.zoneGeographiqueFormationContinueService.editZoneGeographiqueFormationContinueDialog;

       }
    set editZoneGeographiqueFormationContinueDialog(value: boolean) {
        this.zoneGeographiqueFormationContinueService.editZoneGeographiqueFormationContinueDialog = value;
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
       get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues(): Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get createFormationContinueDialog(): boolean {
           return this.formationContinueService.createFormationContinueDialog;
       }
      set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
