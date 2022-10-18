import {Component, OnInit} from '@angular/core';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';

@Component({
  selector: 'app-formation-continue-objet-formation-generique-view-admin',
  templateUrl: './formation-continue-objet-formation-generique-view-admin.component.html',
  styleUrls: ['./formation-continue-objet-formation-generique-view-admin.component.css']
})
export class FormationContinueObjetFormationGeneriqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private objetFormationGeneriqueService :ObjetFormationGeneriqueService
    ,private formationContinueService :FormationContinueService
) {
}

// methods
ngOnInit(): void {
    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
}

hideViewDialog(){
    this.viewFormationContinueObjetFormationGeneriqueDialog  = false;
}

// getters and setters

get formationContinueObjetFormationGeneriques(): Array<FormationContinueObjetFormationGeneriqueVo> {
    return this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques;
       }
set formationContinueObjetFormationGeneriques(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques = value;
       }

 get selectedFormationContinueObjetFormationGenerique():FormationContinueObjetFormationGeneriqueVo {
           return this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique;
       }
    set selectedFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique = value;
       }

   get viewFormationContinueObjetFormationGeneriqueDialog():boolean {
           return this.formationContinueObjetFormationGeneriqueService.viewFormationContinueObjetFormationGeneriqueDialog;

       }
    set viewFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.viewFormationContinueObjetFormationGeneriqueDialog= value;
       }

       get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques():Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get editObjetFormationGeneriqueDialog():boolean {
           return this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog;
       }
      set editObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.editObjetFormationGeneriqueDialog= value;
       }
       get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues():Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get editFormationContinueDialog():boolean {
           return this.formationContinueService.editFormationContinueDialog;
       }
      set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
