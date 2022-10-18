import {Component, OnInit} from '@angular/core';
import {EnseignementDisciplineScientifiqueService} from '../../../../../controller/service/EnseignementDisciplineScientifique.service';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-enseignement-discipline-scientifique-view-admin',
  templateUrl: './enseignement-discipline-scientifique-view-admin.component.html',
  styleUrls: ['./enseignement-discipline-scientifique-view-admin.component.css']
})
export class EnseignementDisciplineScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementDisciplineScientifiqueService: EnseignementDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

hideViewDialog(){
    this.viewEnseignementDisciplineScientifiqueDialog  = false;
}

// getters and setters

get enseignementDisciplineScientifiques(): Array<EnseignementDisciplineScientifiqueVo> {
    return this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques;
       }
set enseignementDisciplineScientifiques(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques = value;
       }

 get selectedEnseignementDisciplineScientifique():EnseignementDisciplineScientifiqueVo {
           return this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique;
       }
    set selectedEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique = value;
       }

   get viewEnseignementDisciplineScientifiqueDialog():boolean {
           return this.enseignementDisciplineScientifiqueService.viewEnseignementDisciplineScientifiqueDialog;

       }
    set viewEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this.enseignementDisciplineScientifiqueService.viewEnseignementDisciplineScientifiqueDialog= value;
       }

       get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements():Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
      set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
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
