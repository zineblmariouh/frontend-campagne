import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-conseils-scientifique-view-chercheur',
  templateUrl: './discipline-scientifique-conseils-scientifique-view-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-conseils-scientifique-view-chercheur.component.css']
})
export class DisciplineScientifiqueConseilsScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilsScientifiqueService: DisciplineScientifiqueConseilsScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conseilsScientifiqueService :ConseilsScientifiqueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueConseilsScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueConseilsScientifiques(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    return this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques;
       }
set disciplineScientifiqueConseilsScientifiques(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilsScientifique():DisciplineScientifiqueConseilsScientifiqueVo {
           return this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique;
       }
    set selectedDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique = value;
       }

   get viewDisciplineScientifiqueConseilsScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.viewDisciplineScientifiqueConseilsScientifiqueDialog;

       }
    set viewDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.viewDisciplineScientifiqueConseilsScientifiqueDialog= value;
       }

       get selectedConseilsScientifique():ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques():Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get editConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.editConseilsScientifiqueDialog;
       }
      set editConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.editConseilsScientifiqueDialog= value;
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
