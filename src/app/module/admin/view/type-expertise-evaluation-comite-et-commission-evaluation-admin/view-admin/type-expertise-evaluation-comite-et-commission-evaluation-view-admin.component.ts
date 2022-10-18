import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';

@Component({
  selector: 'app-type-expertise-evaluation-comite-et-commission-evaluation-view-admin',
  templateUrl: './type-expertise-evaluation-comite-et-commission-evaluation-view-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-comite-et-commission-evaluation-view-admin.component.css']
})
export class TypeExpertiseEvaluationComiteEtCommissionEvaluationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertiseEvaluationComiteEtCommissionEvaluationService: TypeExpertiseEvaluationComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private typeExpertiseEvaluationService :TypeExpertiseEvaluationService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
    this.typeExpertiseEvaluationService.findAll().subscribe((data) => this.typeExpertiseEvaluations = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

hideViewDialog(){
    this.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get typeExpertiseEvaluationComiteEtCommissionEvaluations(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations;
       }
set typeExpertiseEvaluationComiteEtCommissionEvaluations(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations = value;
       }

 get selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation():TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }
    set selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

   get viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;

       }
    set viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog= value;
       }

       get selectedTypeExpertiseEvaluation():TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
      set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
       get typeExpertiseEvaluations():Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
       set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }
       get editTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog;
       }
      set editTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog= value;
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
