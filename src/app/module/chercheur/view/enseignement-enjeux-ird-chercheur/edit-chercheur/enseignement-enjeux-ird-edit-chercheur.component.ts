import {Component, OnInit} from '@angular/core';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enseignement-enjeux-ird-edit-chercheur',
  templateUrl: './enseignement-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./enseignement-enjeux-ird-edit-chercheur.component.css']
})
export class EnseignementEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementEnjeuxIrdService.edit().subscribe(enseignementEnjeuxIrd=>{
    const myIndex = this.enseignementEnjeuxIrds.findIndex(e => e.id === this.selectedEnseignementEnjeuxIrd.id);
    this.enseignementEnjeuxIrds[myIndex] = this.selectedEnseignementEnjeuxIrd;
    this.editEnseignementEnjeuxIrdDialog = false;
    this.selectedEnseignementEnjeuxIrd = new EnseignementEnjeuxIrdVo();


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
// methods

hideEditDialog(){
    this.editEnseignementEnjeuxIrdDialog  = false;
}

// getters and setters

get enseignementEnjeuxIrds(): Array<EnseignementEnjeuxIrdVo> {
    return this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds;
       }
set enseignementEnjeuxIrds(value: Array<EnseignementEnjeuxIrdVo>) {
        this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds = value;
       }

 get selectedEnseignementEnjeuxIrd(): EnseignementEnjeuxIrdVo {
           return this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd;
       }
    set selectedEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd = value;
       }

   get editEnseignementEnjeuxIrdDialog(): boolean {
           return this.enseignementEnjeuxIrdService.editEnseignementEnjeuxIrdDialog;

       }
    set editEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.editEnseignementEnjeuxIrdDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
