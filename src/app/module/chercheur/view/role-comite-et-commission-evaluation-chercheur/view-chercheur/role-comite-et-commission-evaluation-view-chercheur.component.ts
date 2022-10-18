import {Component, OnInit} from '@angular/core';
import {RoleComiteEtCommissionEvaluationService} from '../../../../../controller/service/RoleComiteEtCommissionEvaluation.service';
import {RoleComiteEtCommissionEvaluationVo} from '../../../../../controller/model/RoleComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';

@Component({
  selector: 'app-role-comite-et-commission-evaluation-view-chercheur',
  templateUrl: './role-comite-et-commission-evaluation-view-chercheur.component.html',
  styleUrls: ['./role-comite-et-commission-evaluation-view-chercheur.component.css']
})
export class RoleComiteEtCommissionEvaluationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleComiteEtCommissionEvaluationService: RoleComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private roleEvaluationService :RoleEvaluationService
) {
}

// methods
ngOnInit(): void {
    this.selectedRoleEvaluation = new RoleEvaluationVo();
    this.roleEvaluationService.findAll().subscribe((data) => this.roleEvaluations = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

hideViewDialog(){
    this.viewRoleComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get roleComiteEtCommissionEvaluations(): Array<RoleComiteEtCommissionEvaluationVo> {
    return this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations;
       }
set roleComiteEtCommissionEvaluations(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this.roleComiteEtCommissionEvaluationService.roleComiteEtCommissionEvaluations = value;
       }

 get selectedRoleComiteEtCommissionEvaluation():RoleComiteEtCommissionEvaluationVo {
           return this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation;
       }
    set selectedRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this.roleComiteEtCommissionEvaluationService.selectedRoleComiteEtCommissionEvaluation = value;
       }

   get viewRoleComiteEtCommissionEvaluationDialog():boolean {
           return this.roleComiteEtCommissionEvaluationService.viewRoleComiteEtCommissionEvaluationDialog;

       }
    set viewRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this.roleComiteEtCommissionEvaluationService.viewRoleComiteEtCommissionEvaluationDialog= value;
       }

       get selectedRoleEvaluation():RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
      set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }
       get roleEvaluations():Array<RoleEvaluationVo> {
           return this.roleEvaluationService.roleEvaluations;
       }
       set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }
       get editRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.editRoleEvaluationDialog;
       }
      set editRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.editRoleEvaluationDialog= value;
       }
       get selectedComiteEtCommissionEvaluation():ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations():Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get editComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog;
       }
      set editComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
