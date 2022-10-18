import {Component, OnInit} from '@angular/core';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-formation-continue-view-admin',
  templateUrl: './pays-formation-continue-view-admin.component.html',
  styleUrls: ['./pays-formation-continue-view-admin.component.css']
})
export class PaysFormationContinueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysFormationContinueService: PaysFormationContinueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private formationContinueService :FormationContinueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewPaysFormationContinueDialog  = false;
}

// getters and setters

get paysFormationContinues(): Array<PaysFormationContinueVo> {
    return this.paysFormationContinueService.paysFormationContinues;
       }
set paysFormationContinues(value: Array<PaysFormationContinueVo>) {
        this.paysFormationContinueService.paysFormationContinues = value;
       }

 get selectedPaysFormationContinue():PaysFormationContinueVo {
           return this.paysFormationContinueService.selectedPaysFormationContinue;
       }
    set selectedPaysFormationContinue(value: PaysFormationContinueVo) {
        this.paysFormationContinueService.selectedPaysFormationContinue = value;
       }

   get viewPaysFormationContinueDialog():boolean {
           return this.paysFormationContinueService.viewPaysFormationContinueDialog;

       }
    set viewPaysFormationContinueDialog(value: boolean) {
        this.paysFormationContinueService.viewPaysFormationContinueDialog= value;
       }

       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
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
