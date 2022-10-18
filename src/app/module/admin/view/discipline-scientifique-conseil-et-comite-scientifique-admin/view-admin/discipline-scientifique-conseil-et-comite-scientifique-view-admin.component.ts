import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilEtComiteScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilEtComiteScientifique.service';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {ConseilEtComiteScientifiqueService} from '../../../../../controller/service/ConseilEtComiteScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-conseil-et-comite-scientifique-view-admin',
  templateUrl: './discipline-scientifique-conseil-et-comite-scientifique-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-conseil-et-comite-scientifique-view-admin.component.css']
})
export class DisciplineScientifiqueConseilEtComiteScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilEtComiteScientifiqueService: DisciplineScientifiqueConseilEtComiteScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conseilEtComiteScientifiqueService :ConseilEtComiteScientifiqueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
    this.conseilEtComiteScientifiqueService.findAll().subscribe((data) => this.conseilEtComiteScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueConseilEtComiteScientifiques(): Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> {
    return this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques;
       }
set disciplineScientifiqueConseilEtComiteScientifiques(value: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilEtComiteScientifique():DisciplineScientifiqueConseilEtComiteScientifiqueVo {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique;
       }
    set selectedDisciplineScientifiqueConseilEtComiteScientifique(value: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique = value;
       }

   get viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog():boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog;

       }
    set viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.viewDisciplineScientifiqueConseilEtComiteScientifiqueDialog= value;
       }

       get selectedConseilEtComiteScientifique():ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
      set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }
       get conseilEtComiteScientifiques():Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
       set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }
       get editConseilEtComiteScientifiqueDialog():boolean {
           return this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog;
       }
      set editConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog= value;
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
