import {Component, OnInit} from '@angular/core';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';

@Component({
  selector: 'app-role-comite-et-commission-evaluation-edit-chercheur',
  templateUrl: './role-comite-et-commission-evaluation-edit-chercheur.component.html',
  styleUrls: ['./role-comite-et-commission-evaluation-edit-chercheur.component.css']
})
export class RoleComiteEtCommissionEvaluationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleComiteEtCommissionEvaluationService: RoleComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private roleEvaluationService: RoleEvaluationService
) {
}

// methods
ngOnInit(): void {
    this.selectedRoleEvaluation = new RoleEvaluationVo();
    this.roleEvaluationService.findAll().subscribe((data) => this.roleEvaluations = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.roleComiteEtCommissionEvaluationService.edit().subscribe(roleComiteEtCommissionEvaluation=>{
    const myIndex = this.roleComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedRoleComiteEtCommissionEvaluation.id);
    this.roleComiteEtCommissionEvaluations[myIndex] = this.selectedRoleComiteEtCommissionEvaluation;
    this.editRoleComiteEtCommissionEvaluationDialog = false;
    this.selectedRoleComiteEtCommissionEvaluation = new RoleComiteEtCommissionEvaluationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateroleEvaluation(roleEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('RoleEvaluation', 'add');
                       if(isPermistted){
         this.selectedRoleEvaluation = new RoleEvaluationVo();
        this.createRoleEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecomiteEtCommissionEvaluation(comiteEtCommissionEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'add');
                       if(isPermistted){
         this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
        this.createComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editRoleComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get roleComiteEtCommissionEvaluations(): Array<RoleComiteEtCommissionEvaluationVo> {
    return this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations;
       }
set roleComiteEtCommissionEvaluations(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations = value;
       }

 get selectedRoleComiteEtCommissionEvaluation(): RoleComiteEtCommissionEvaluationVo {
           return this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation;
       }
    set selectedRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation = value;
       }

   get editRoleComiteEtCommissionEvaluationDialog(): boolean {
           return this.roleComiteEtCommissionEvaluationService.editRoleComiteEtCommissionEvaluationDialog;

       }
    set editRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.editRoleComiteEtCommissionEvaluationDialog = value;
       }

       get selectedRoleEvaluation(): RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
      set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
       get roleEvaluations(): Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
       set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }
       get createRoleEvaluationDialog(): boolean {
           return this.roleEvaluationService.createRoleEvaluationDialog;
       }
      set createRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.createRoleEvaluationDialog= value;
       }
       get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get createComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;
       }
      set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
