import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-comite-et-commission-evaluation-view-admin',
  templateUrl: './discipline-scientifique-comite-et-commission-evaluation-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-comite-et-commission-evaluation-view-admin.component.css']
})
export class DisciplineScientifiqueComiteEtCommissionEvaluationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueComiteEtCommissionEvaluationService: DisciplineScientifiqueComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get disciplineScientifiqueComiteEtCommissionEvaluations(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    return this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations;
       }
set disciplineScientifiqueComiteEtCommissionEvaluations(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations = value;
       }

 get selectedDisciplineScientifiqueComiteEtCommissionEvaluation():DisciplineScientifiqueComiteEtCommissionEvaluationVo {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation;
       }
    set selectedDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }

   get viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog():boolean {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog;

       }
    set viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog= value;
       }

       get selectedDisciplineScientifique():DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques():Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get editDisciplineScientifiqueDialog():boolean {
           return this.disciplineScientifiqueService.editDisciplineScientifiqueDialog;
       }
      set editDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.editDisciplineScientifiqueDialog= value;
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
