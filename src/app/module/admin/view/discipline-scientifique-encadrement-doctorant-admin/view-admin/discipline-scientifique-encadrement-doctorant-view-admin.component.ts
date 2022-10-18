import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';

@Component({
  selector: 'app-discipline-scientifique-encadrement-doctorant-view-admin',
  templateUrl: './discipline-scientifique-encadrement-doctorant-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-doctorant-view-admin.component.css']
})
export class DisciplineScientifiqueEncadrementDoctorantViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementDoctorantService: DisciplineScientifiqueEncadrementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private encadrementDoctorantService :EncadrementDoctorantService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueEncadrementDoctorantDialog  = false;
}

// getters and setters

get disciplineScientifiqueEncadrementDoctorants(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    return this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants;
       }
set disciplineScientifiqueEncadrementDoctorants(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants = value;
       }

 get selectedDisciplineScientifiqueEncadrementDoctorant():DisciplineScientifiqueEncadrementDoctorantVo {
           return this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant;
       }
    set selectedDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant = value;
       }

   get viewDisciplineScientifiqueEncadrementDoctorantDialog():boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.viewDisciplineScientifiqueEncadrementDoctorantDialog;

       }
    set viewDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.viewDisciplineScientifiqueEncadrementDoctorantDialog= value;
       }

       get selectedEncadrementDoctorant():EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants():Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get editEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.editEncadrementDoctorantDialog;
       }
      set editEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.editEncadrementDoctorantDialog= value;
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
