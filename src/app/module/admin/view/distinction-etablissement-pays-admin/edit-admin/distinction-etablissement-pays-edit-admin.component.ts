import {Component, OnInit} from '@angular/core';
import {DistinctionEtablissementPaysService} from '../../../../../controller/service/DistinctionEtablissementPays.service';
import {DistinctionEtablissementPaysVo} from '../../../../../controller/model/DistinctionEtablissementPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DistinctionVo} from '../../../../../controller/model/Distinction.model';
import {DistinctionService} from '../../../../../controller/service/Distinction.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-distinction-etablissement-pays-edit-admin',
  templateUrl: './distinction-etablissement-pays-edit-admin.component.html',
  styleUrls: ['./distinction-etablissement-pays-edit-admin.component.css']
})
export class DistinctionEtablissementPaysEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private distinctionEtablissementPaysService: DistinctionEtablissementPaysService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private distinctionService: DistinctionService
 ,       private etablissementService: EtablissementService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedDistinction = new DistinctionVo();
    this.distinctionService.findAll().subscribe((data) => this.distinctions = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.distinctionEtablissementPaysService.edit().subscribe(distinctionEtablissementPays=>{
    const myIndex = this.distinctionEtablissementPayss.findIndex(e => e.id === this.selectedDistinctionEtablissementPays.id);
    this.distinctionEtablissementPayss[myIndex] = this.selectedDistinctionEtablissementPays;
    this.editDistinctionEtablissementPaysDialog = false;
    this.selectedDistinctionEtablissementPays = new DistinctionEtablissementPaysVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedistinction(distinction: string) {
                      const isPermistted = await this.roleService.isPermitted('Distinction', 'add');
                       if(isPermistted){
         this.selectedDistinction = new DistinctionVo();
        this.createDistinctionDialog = true;
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
    this.editDistinctionEtablissementPaysDialog  = false;
}

// getters and setters

get distinctionEtablissementPayss(): Array<DistinctionEtablissementPaysVo> {
    return this.distinctionEtablissementPaysService.distinctionEtablissementPayss;
       }
set distinctionEtablissementPayss(value: Array<DistinctionEtablissementPaysVo>) {
        this.distinctionEtablissementPaysService.distinctionEtablissementPayss = value;
       }

 get selectedDistinctionEtablissementPays(): DistinctionEtablissementPaysVo {
           return this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays;
       }
    set selectedDistinctionEtablissementPays(value: DistinctionEtablissementPaysVo) {
        this.distinctionEtablissementPaysService.selectedDistinctionEtablissementPays = value;
       }

   get editDistinctionEtablissementPaysDialog(): boolean {
           return this.distinctionEtablissementPaysService.editDistinctionEtablissementPaysDialog;

       }
    set editDistinctionEtablissementPaysDialog(value: boolean) {
        this.distinctionEtablissementPaysService.editDistinctionEtablissementPaysDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
       }
       get selectedDistinction(): DistinctionVo {
           return this.distinctionService.selectedDistinction;
       }
      set selectedDistinction(value: DistinctionVo) {
        this.distinctionService.selectedDistinction = value;
       }
       get distinctions(): Array<DistinctionVo> {
           return this.distinctionService.distinctions;
       }
       set distinctions(value: Array<DistinctionVo>) {
        this.distinctionService.distinctions = value;
       }
       get createDistinctionDialog(): boolean {
           return this.distinctionService.createDistinctionDialog;
       }
      set createDistinctionDialog(value: boolean) {
        this.distinctionService.createDistinctionDialog= value;
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
