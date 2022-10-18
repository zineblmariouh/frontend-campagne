import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-outil-pedagogique-discipline-scientifique-view-chercheur',
  templateUrl: './outil-pedagogique-discipline-scientifique-view-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-discipline-scientifique-view-chercheur.component.css']
})
export class OutilPedagogiqueDisciplineScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueDisciplineScientifiqueService: OutilPedagogiqueDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get outilPedagogiqueDisciplineScientifiques(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    return this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques;
       }
set outilPedagogiqueDisciplineScientifiques(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques = value;
       }

 get selectedOutilPedagogiqueDisciplineScientifique():OutilPedagogiqueDisciplineScientifiqueVo {
           return this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique;
       }
    set selectedOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique = value;
       }

   get viewOutilPedagogiqueDisciplineScientifiqueDialog():boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.viewOutilPedagogiqueDisciplineScientifiqueDialog;

       }
    set viewOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.viewOutilPedagogiqueDisciplineScientifiqueDialog= value;
       }

       get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques():Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get editOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.editOutilPedagogiqueDialog;
       }
      set editOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.editOutilPedagogiqueDialog= value;
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
