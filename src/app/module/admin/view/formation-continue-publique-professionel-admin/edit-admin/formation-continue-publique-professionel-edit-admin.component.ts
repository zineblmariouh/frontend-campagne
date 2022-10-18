import {Component, OnInit} from '@angular/core';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';

@Component({
  selector: 'app-formation-continue-publique-professionel-edit-admin',
  templateUrl: './formation-continue-publique-professionel-edit-admin.component.html',
  styleUrls: ['./formation-continue-publique-professionel-edit-admin.component.css']
})
export class FormationContinuePubliqueProfessionelEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private formationContinueService: FormationContinueService
 ,       private publiqueProfessionelService: PubliqueProfessionelService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
    this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinuePubliqueProfessionelService.edit().subscribe(formationContinuePubliqueProfessionel=>{
    const myIndex = this.formationContinuePubliqueProfessionels.findIndex(e => e.id === this.selectedFormationContinuePubliqueProfessionel.id);
    this.formationContinuePubliqueProfessionels[myIndex] = this.selectedFormationContinuePubliqueProfessionel;
    this.editFormationContinuePubliqueProfessionelDialog = false;
    this.selectedFormationContinuePubliqueProfessionel = new FormationContinuePubliqueProfessionelVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatepubliqueProfessionel(publiqueProfessionel: string) {
                      const isPermistted = await this.roleService.isPermitted('PubliqueProfessionel', 'add');
                       if(isPermistted){
         this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
        this.createPubliqueProfessionelDialog = true;
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
    this.editFormationContinuePubliqueProfessionelDialog  = false;
}

// getters and setters

get formationContinuePubliqueProfessionels(): Array<FormationContinuePubliqueProfessionelVo> {
    return this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels;
       }
set formationContinuePubliqueProfessionels(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels = value;
       }

 get selectedFormationContinuePubliqueProfessionel(): FormationContinuePubliqueProfessionelVo {
           return this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel;
       }
    set selectedFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel = value;
       }

   get editFormationContinuePubliqueProfessionelDialog(): boolean {
           return this.formationContinuePubliqueProfessionelService.editFormationContinuePubliqueProfessionelDialog;

       }
    set editFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.editFormationContinuePubliqueProfessionelDialog = value;
       }

       get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get createPubliqueProfessionelDialog(): boolean {
           return this.publiqueProfessionelService.createPubliqueProfessionelDialog;
       }
      set createPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.createPubliqueProfessionelDialog= value;
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
