import {Component, OnInit} from '@angular/core';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-comite-et-commission-evaluation-view-admin',
  templateUrl: './etablissement-comite-et-commission-evaluation-view-admin.component.html',
  styleUrls: ['./etablissement-comite-et-commission-evaluation-view-admin.component.css']
})
export class EtablissementComiteEtCommissionEvaluationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementComiteEtCommissionEvaluationService: EtablissementComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

hideViewDialog(){
    this.viewEtablissementComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get etablissementComiteEtCommissionEvaluations(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    return this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations;
       }
set etablissementComiteEtCommissionEvaluations(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations = value;
       }

 get selectedEtablissementComiteEtCommissionEvaluation():EtablissementComiteEtCommissionEvaluationVo {
           return this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation;
       }
    set selectedEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation = value;
       }

   get viewEtablissementComiteEtCommissionEvaluationDialog():boolean {
           return this.etablissementComiteEtCommissionEvaluationService.viewEtablissementComiteEtCommissionEvaluationDialog;

       }
    set viewEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.viewEtablissementComiteEtCommissionEvaluationDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
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
