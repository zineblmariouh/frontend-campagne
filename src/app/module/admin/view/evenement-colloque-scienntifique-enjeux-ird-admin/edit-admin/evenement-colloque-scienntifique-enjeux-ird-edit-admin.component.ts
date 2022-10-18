import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-enjeux-ird-edit-admin',
  templateUrl: './evenement-colloque-scienntifique-enjeux-ird-edit-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-enjeux-ird-edit-admin.component.css']
})
export class EvenementColloqueScienntifiqueEnjeuxIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueEnjeuxIrdService: EvenementColloqueScienntifiqueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.evenementColloqueScienntifiqueEnjeuxIrdService.edit().subscribe(evenementColloqueScienntifiqueEnjeuxIrd=>{
    const myIndex = this.evenementColloqueScienntifiqueEnjeuxIrds.findIndex(e => e.id === this.selectedEvenementColloqueScienntifiqueEnjeuxIrd.id);
    this.evenementColloqueScienntifiqueEnjeuxIrds[myIndex] = this.selectedEvenementColloqueScienntifiqueEnjeuxIrd;
    this.editEvenementColloqueScienntifiqueEnjeuxIrdDialog = false;
    this.selectedEvenementColloqueScienntifiqueEnjeuxIrd = new EvenementColloqueScienntifiqueEnjeuxIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateevenementColloqueScienntifique(evenementColloqueScienntifique: string) {
                      const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'add');
                       if(isPermistted){
         this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        this.createEvenementColloqueScienntifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEvenementColloqueScienntifiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiqueEnjeuxIrds(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    return this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds;
       }
set evenementColloqueScienntifiqueEnjeuxIrds(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds = value;
       }

 get selectedEvenementColloqueScienntifiqueEnjeuxIrd(): EvenementColloqueScienntifiqueEnjeuxIrdVo {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd;
       }
    set selectedEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }

   get editEvenementColloqueScienntifiqueEnjeuxIrdDialog(): boolean {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.editEvenementColloqueScienntifiqueEnjeuxIrdDialog;

       }
    set editEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.editEvenementColloqueScienntifiqueEnjeuxIrdDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get createEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
       }
      set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
