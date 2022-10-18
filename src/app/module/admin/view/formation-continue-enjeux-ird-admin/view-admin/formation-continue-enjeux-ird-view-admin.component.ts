import {Component, OnInit} from '@angular/core';
import {FormationContinueEnjeuxIrdService} from '../../../../../controller/service/FormationContinueEnjeuxIrd.service';
import {FormationContinueEnjeuxIrdVo} from '../../../../../controller/model/FormationContinueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-formation-continue-enjeux-ird-view-admin',
  templateUrl: './formation-continue-enjeux-ird-view-admin.component.html',
  styleUrls: ['./formation-continue-enjeux-ird-view-admin.component.css']
})
export class FormationContinueEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueEnjeuxIrdService: FormationContinueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private formationContinueService :FormationContinueService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
}

hideViewDialog(){
    this.viewFormationContinueEnjeuxIrdDialog  = false;
}

// getters and setters

get formationContinueEnjeuxIrds(): Array<FormationContinueEnjeuxIrdVo> {
    return this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds;
       }
set formationContinueEnjeuxIrds(value: Array<FormationContinueEnjeuxIrdVo>) {
        this.formationContinueEnjeuxIrdService.formationContinueEnjeuxIrds = value;
       }

 get selectedFormationContinueEnjeuxIrd():FormationContinueEnjeuxIrdVo {
           return this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd;
       }
    set selectedFormationContinueEnjeuxIrd(value: FormationContinueEnjeuxIrdVo) {
        this.formationContinueEnjeuxIrdService.selectedFormationContinueEnjeuxIrd = value;
       }

   get viewFormationContinueEnjeuxIrdDialog():boolean {
           return this.formationContinueEnjeuxIrdService.viewFormationContinueEnjeuxIrdDialog;

       }
    set viewFormationContinueEnjeuxIrdDialog(value: boolean) {
        this.formationContinueEnjeuxIrdService.viewFormationContinueEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
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
