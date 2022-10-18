import {Component, OnInit} from '@angular/core';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-rencontre-media-discipline-scientifique-view-chercheur',
  templateUrl: './rencontre-media-discipline-scientifique-view-chercheur.component.html',
  styleUrls: ['./rencontre-media-discipline-scientifique-view-chercheur.component.css']
})
export class RencontreMediaDisciplineScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaDisciplineScientifiqueService: RencontreMediaDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private rencontreMediaService :RencontreMediaService
    ,private disciplineScientifiqueService :DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

hideViewDialog(){
    this.viewRencontreMediaDisciplineScientifiqueDialog  = false;
}

// getters and setters

get rencontreMediaDisciplineScientifiques(): Array<RencontreMediaDisciplineScientifiqueVo> {
    return this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques;
       }
set rencontreMediaDisciplineScientifiques(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques = value;
       }

 get selectedRencontreMediaDisciplineScientifique():RencontreMediaDisciplineScientifiqueVo {
           return this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique;
       }
    set selectedRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique = value;
       }

   get viewRencontreMediaDisciplineScientifiqueDialog():boolean {
           return this.rencontreMediaDisciplineScientifiqueService.viewRencontreMediaDisciplineScientifiqueDialog;

       }
    set viewRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.viewRencontreMediaDisciplineScientifiqueDialog= value;
       }

       get selectedRencontreMedia():RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias():Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get editRencontreMediaDialog():boolean {
           return this.rencontreMediaService.editRencontreMediaDialog;
       }
      set editRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.editRencontreMediaDialog= value;
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
