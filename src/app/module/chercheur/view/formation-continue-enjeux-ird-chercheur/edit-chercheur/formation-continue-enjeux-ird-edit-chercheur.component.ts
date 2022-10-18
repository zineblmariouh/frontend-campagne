import {Component, OnInit} from '@angular/core';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-formation-continue-enjeux-ird-edit-chercheur',
  templateUrl: './formation-continue-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./formation-continue-enjeux-ird-edit-chercheur.component.css']
})
export class FormationContinueEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private formationContinueService: FormationContinueService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueEnjeuxIrdService.edit().subscribe(formationContinueEnjeuxIrd=>{
    const myIndex = this.formationContinueEnjeuxIrds.findIndex(e => e.id === this.selectedFormationContinueEnjeuxIrd.id);
    this.formationContinueEnjeuxIrds[myIndex] = this.selectedFormationContinueEnjeuxIrd;
    this.editFormationContinueEnjeuxIrdDialog = false;
    this.selectedFormationContinueEnjeuxIrd = new FormationContinueEnjeuxIrdVo();


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
    this.editFormationContinueEnjeuxIrdDialog  = false;
}

// getters and setters

get formationContinueEnjeuxIrds(): Array<FormationContinueEnjeuxIrdVo> {
    return this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds;
       }
set formationContinueEnjeuxIrds(value: Array<FormationContinueEnjeuxIrdVo>) {
        this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds = value;
       }

 get selectedFormationContinueEnjeuxIrd(): FormationContinueEnjeuxIrdVo {
           return this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd;
       }
    set selectedFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd = value;
       }

   get editFormationContinueEnjeuxIrdDialog(): boolean {
           return this.formationContinueEnjeuxIrdService.editFormationContinueEnjeuxIrdDialog;

       }
    set editFormationContinueEnjeuxIrdDialog(value: boolean) {
        this.formationContinueEnjeuxIrdService.editFormationContinueEnjeuxIrdDialog = value;
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
