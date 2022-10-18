import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';

@Component({
  selector: 'app-discipline-scientifique-evenement-colloque-scientifique-view-chercheur',
  templateUrl: './discipline-scientifique-evenement-colloque-scientifique-view-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-evenement-colloque-scientifique-view-chercheur.component.css']
})
export class DisciplineScientifiqueEvenementColloqueScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueEvenementColloqueScientifiqueService: DisciplineScientifiqueEvenementColloqueScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
    ,private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueEvenementColloqueScientifiques(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    return this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques;
       }
set disciplineScientifiqueEvenementColloqueScientifiques(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques = value;
       }

 get selectedDisciplineScientifiqueEvenementColloqueScientifique():DisciplineScientifiqueEvenementColloqueScientifiqueVo {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique;
       }
    set selectedDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique = value;
       }

   get viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog():boolean {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog;

       }
    set viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog= value;
       }

       get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques():Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get editEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;
       }
      set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog= value;
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
