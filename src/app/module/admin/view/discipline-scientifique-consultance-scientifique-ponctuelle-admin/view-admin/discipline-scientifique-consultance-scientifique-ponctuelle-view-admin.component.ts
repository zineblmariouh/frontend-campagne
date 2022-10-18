import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-consultance-scientifique-ponctuelle-view-admin',
  templateUrl: './discipline-scientifique-consultance-scientifique-ponctuelle-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-consultance-scientifique-ponctuelle-view-admin.component.css']
})
export class DisciplineScientifiqueConsultanceScientifiquePonctuelleViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConsultanceScientifiquePonctuelleService: DisciplineScientifiqueConsultanceScientifiquePonctuelleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private consultanceScientifiquePonctuelleService :ConsultanceScientifiquePonctuelleService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get disciplineScientifiqueConsultanceScientifiquePonctuelles(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles;
       }
set disciplineScientifiqueConsultanceScientifiquePonctuelles(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle():DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }
    set selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

   get viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog():boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;

       }
    set viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog= value;
       }

       get selectedConsultanceScientifiquePonctuelle():ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles():Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get editConsultanceScientifiquePonctuelleDialog():boolean {
           return this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog;
       }
      set editConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.editConsultanceScientifiquePonctuelleDialog= value;
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
