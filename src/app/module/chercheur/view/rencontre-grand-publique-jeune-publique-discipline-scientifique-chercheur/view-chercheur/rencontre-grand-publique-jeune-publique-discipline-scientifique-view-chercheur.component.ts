import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-discipline-scientifique-view-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-discipline-scientifique-view-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-discipline-scientifique-view-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
       }
set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique():RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

   get viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;

       }
    set viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.viewRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog= value;
       }

       get selectedRencontreGrandPubliqueJeunePublique():RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques():Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get editRencontreGrandPubliqueJeunePubliqueDialog():boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set editRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.editRencontreGrandPubliqueJeunePubliqueDialog= value;
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
