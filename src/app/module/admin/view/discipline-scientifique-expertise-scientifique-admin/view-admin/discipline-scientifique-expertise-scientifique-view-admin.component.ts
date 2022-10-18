import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueExpertiseScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueExpertiseScientifique.service';
import {DisciplineScientifiqueExpertiseScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueExpertiseScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import {ExpertiseScientifiqueService} from '../../../../../controller/service/ExpertiseScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-expertise-scientifique-view-admin',
  templateUrl: './discipline-scientifique-expertise-scientifique-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-expertise-scientifique-view-admin.component.css']
})
export class DisciplineScientifiqueExpertiseScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueExpertiseScientifiqueService: DisciplineScientifiqueExpertiseScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private expertiseScientifiqueService :ExpertiseScientifiqueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
    this.expertiseScientifiqueService.findAll().subscribe((data) => this.expertiseScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueExpertiseScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueExpertiseScientifiques(): Array<DisciplineScientifiqueExpertiseScientifiqueVo> {
    return this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiques;
       }
set disciplineScientifiqueExpertiseScientifiques(value: Array<DisciplineScientifiqueExpertiseScientifiqueVo>) {
        this.disciplineScientifiqueExpertiseScientifiqueService.disciplineScientifiqueExpertiseScientifiques = value;
       }

 get selectedDisciplineScientifiqueExpertiseScientifique():DisciplineScientifiqueExpertiseScientifiqueVo {
           return this.disciplineScientifiqueExpertiseScientifiqueService.selectedDisciplineScientifiqueExpertiseScientifique;
       }
    set selectedDisciplineScientifiqueExpertiseScientifique(value: DisciplineScientifiqueExpertiseScientifiqueVo) {
        this.disciplineScientifiqueExpertiseScientifiqueService.selectedDisciplineScientifiqueExpertiseScientifique = value;
       }

   get viewDisciplineScientifiqueExpertiseScientifiqueDialog():boolean {
           return this.disciplineScientifiqueExpertiseScientifiqueService.viewDisciplineScientifiqueExpertiseScientifiqueDialog;

       }
    set viewDisciplineScientifiqueExpertiseScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueExpertiseScientifiqueService.viewDisciplineScientifiqueExpertiseScientifiqueDialog= value;
       }

       get selectedExpertiseScientifique():ExpertiseScientifiqueVo {
           return this.expertiseScientifiqueService.selectedExpertiseScientifique;
       }
      set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
       }
       get expertiseScientifiques():Array<ExpertiseScientifiqueVo> {
           return this.expertiseScientifiqueService.expertiseScientifiques;
       }
       set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
       }
       get editExpertiseScientifiqueDialog():boolean {
           return this.expertiseScientifiqueService.editExpertiseScientifiqueDialog;
       }
      set editExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.editExpertiseScientifiqueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
