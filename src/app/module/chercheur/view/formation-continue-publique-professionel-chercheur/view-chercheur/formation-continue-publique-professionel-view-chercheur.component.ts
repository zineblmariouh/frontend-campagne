import {Component, OnInit} from '@angular/core';
import {FormationContinuePubliqueProfessionelService} from '../../../../../controller/service/FormationContinuePubliqueProfessionel.service';
import {FormationContinuePubliqueProfessionelVo} from '../../../../../controller/model/FormationContinuePubliqueProfessionel.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PubliqueProfessionelVo} from '../../../../../controller/model/PubliqueProfessionel.model';
import {PubliqueProfessionelService} from '../../../../../controller/service/PubliqueProfessionel.service';

@Component({
  selector: 'app-formation-continue-publique-professionel-view-chercheur',
  templateUrl: './formation-continue-publique-professionel-view-chercheur.component.html',
  styleUrls: ['./formation-continue-publique-professionel-view-chercheur.component.css']
})
export class FormationContinuePubliqueProfessionelViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinuePubliqueProfessionelService: FormationContinuePubliqueProfessionelService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private formationContinueService :FormationContinueService
    ,private publiqueProfessionelService :PubliqueProfessionelService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPubliqueProfessionel = new PubliqueProfessionelVo();
    this.publiqueProfessionelService.findAll().subscribe((data) => this.publiqueProfessionels = data);
}

hideViewDialog(){
    this.viewFormationContinuePubliqueProfessionelDialog  = false;
}

// getters and setters

get formationContinuePubliqueProfessionels(): Array<FormationContinuePubliqueProfessionelVo> {
    return this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels;
       }
set formationContinuePubliqueProfessionels(value: Array<FormationContinuePubliqueProfessionelVo>) {
        this.formationContinuePubliqueProfessionelService.formationContinuePubliqueProfessionels = value;
       }

 get selectedFormationContinuePubliqueProfessionel():FormationContinuePubliqueProfessionelVo {
           return this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel;
       }
    set selectedFormationContinuePubliqueProfessionel(value: FormationContinuePubliqueProfessionelVo) {
        this.formationContinuePubliqueProfessionelService.selectedFormationContinuePubliqueProfessionel = value;
       }

   get viewFormationContinuePubliqueProfessionelDialog():boolean {
           return this.formationContinuePubliqueProfessionelService.viewFormationContinuePubliqueProfessionelDialog;

       }
    set viewFormationContinuePubliqueProfessionelDialog(value: boolean) {
        this.formationContinuePubliqueProfessionelService.viewFormationContinuePubliqueProfessionelDialog= value;
       }

       get selectedPubliqueProfessionel():PubliqueProfessionelVo {
           return this.publiqueProfessionelService.selectedPubliqueProfessionel;
       }
      set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this.publiqueProfessionelService.selectedPubliqueProfessionel = value;
       }
       get publiqueProfessionels():Array<PubliqueProfessionelVo> {
           return this.publiqueProfessionelService.publiqueProfessionels;
       }
       set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this.publiqueProfessionelService.publiqueProfessionels = value;
       }
       get editPubliqueProfessionelDialog():boolean {
           return this.publiqueProfessionelService.editPubliqueProfessionelDialog;
       }
      set editPubliqueProfessionelDialog(value: boolean) {
        this.publiqueProfessionelService.editPubliqueProfessionelDialog= value;
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
