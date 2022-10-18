import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-encadrement-etudiant-discipline-scientifique-view-admin',
  templateUrl: './encadrement-etudiant-discipline-scientifique-view-admin.component.html',
  styleUrls: ['./encadrement-etudiant-discipline-scientifique-view-admin.component.css']
})
export class EncadrementEtudiantDisciplineScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private encadrementEtudiantDisciplineScientifiqueService: EncadrementEtudiantDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private encadrementEtudiantService :EncadrementEtudiantService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewEncadrementEtudiantDisciplineScientifiqueDialog  = false;
}

// getters and setters

get encadrementEtudiantDisciplineScientifiques(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    return this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques;
       }
set encadrementEtudiantDisciplineScientifiques(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques = value;
       }

 get selectedEncadrementEtudiantDisciplineScientifique():EncadrementEtudiantDisciplineScientifiqueVo {
           return this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique;
       }
    set selectedEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique = value;
       }

   get viewEncadrementEtudiantDisciplineScientifiqueDialog():boolean {
           return this.encadrementEtudiantDisciplineScientifiqueService.viewEncadrementEtudiantDisciplineScientifiqueDialog;

       }
    set viewEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this.encadrementEtudiantDisciplineScientifiqueService.viewEncadrementEtudiantDisciplineScientifiqueDialog= value;
       }

       get selectedEncadrementEtudiant():EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
      set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }
       get encadrementEtudiants():Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiants;
       }
       set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }
       get editEncadrementEtudiantDialog():boolean {
           return this.encadrementEtudiantService.editEncadrementEtudiantDialog;
       }
      set editEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.editEncadrementEtudiantDialog= value;
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
