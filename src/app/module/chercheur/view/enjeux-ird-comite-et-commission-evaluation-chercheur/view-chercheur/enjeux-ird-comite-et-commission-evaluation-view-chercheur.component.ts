import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-comite-et-commission-evaluation-view-chercheur',
  templateUrl: './enjeux-ird-comite-et-commission-evaluation-view-chercheur.component.html',
  styleUrls: ['./enjeux-ird-comite-et-commission-evaluation-view-chercheur.component.css']
})
export class EnjeuxIrdComiteEtCommissionEvaluationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdComiteEtCommissionEvaluationService: EnjeuxIrdComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

hideViewDialog(){
    this.viewEnjeuxIrdComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get enjeuxIrdComiteEtCommissionEvaluations(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    return this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations;
       }
set enjeuxIrdComiteEtCommissionEvaluations(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations = value;
       }

 get selectedEnjeuxIrdComiteEtCommissionEvaluation():EnjeuxIrdComiteEtCommissionEvaluationVo {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation;
       }
    set selectedEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation = value;
       }

   get viewEnjeuxIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.viewEnjeuxIrdComiteEtCommissionEvaluationDialog;

       }
    set viewEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.viewEnjeuxIrdComiteEtCommissionEvaluationDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
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
