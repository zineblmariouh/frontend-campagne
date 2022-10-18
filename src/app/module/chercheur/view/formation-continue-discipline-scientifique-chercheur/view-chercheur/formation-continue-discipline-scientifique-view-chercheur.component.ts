import {Component, OnInit} from '@angular/core';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-formation-continue-discipline-scientifique-view-chercheur',
  templateUrl: './formation-continue-discipline-scientifique-view-chercheur.component.html',
  styleUrls: ['./formation-continue-discipline-scientifique-view-chercheur.component.css']
})
export class FormationContinueDisciplineScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private formationContinueService :FormationContinueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewFormationContinueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get formationContinueDisciplineScientifiques(): Array<FormationContinueDisciplineScientifiqueVo> {
    return this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques;
       }
set formationContinueDisciplineScientifiques(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques = value;
       }

 get selectedFormationContinueDisciplineScientifique():FormationContinueDisciplineScientifiqueVo {
           return this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique;
       }
    set selectedFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique = value;
       }

   get viewFormationContinueDisciplineScientifiqueDialog():boolean {
           return this.formationContinueDisciplineScientifiqueService.viewFormationContinueDisciplineScientifiqueDialog;

       }
    set viewFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this.formationContinueDisciplineScientifiqueService.viewFormationContinueDisciplineScientifiqueDialog= value;
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
       get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues():Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get editFormationContinueDialog():boolean {
           return this.formationContinueService.editFormationContinueDialog;
       }
      set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
