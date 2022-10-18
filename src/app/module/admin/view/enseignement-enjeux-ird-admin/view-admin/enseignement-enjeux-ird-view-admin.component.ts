import {Component, OnInit} from '@angular/core';
import {EnseignementEnjeuxIrdService} from '../../../../../controller/service/EnseignementEnjeuxIrd.service';
import {EnseignementEnjeuxIrdVo} from '../../../../../controller/model/EnseignementEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enseignement-enjeux-ird-view-admin',
  templateUrl: './enseignement-enjeux-ird-view-admin.component.html',
  styleUrls: ['./enseignement-enjeux-ird-view-admin.component.css']
})
export class EnseignementEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementEnjeuxIrdService: EnseignementEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewEnseignementEnjeuxIrdDialog  = false;
}

// getters and setters

get enseignementEnjeuxIrds(): Array<EnseignementEnjeuxIrdVo> {
    return this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds;
       }
set enseignementEnjeuxIrds(value: Array<EnseignementEnjeuxIrdVo>) {
        this.enseignementEnjeuxIrdService.enseignementEnjeuxIrds = value;
       }

 get selectedEnseignementEnjeuxIrd():EnseignementEnjeuxIrdVo {
           return this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd;
       }
    set selectedEnseignementEnjeuxIrd(value: EnseignementEnjeuxIrdVo) {
        this.enseignementEnjeuxIrdService.selectedEnseignementEnjeuxIrd = value;
       }

   get viewEnseignementEnjeuxIrdDialog():boolean {
           return this.enseignementEnjeuxIrdService.viewEnseignementEnjeuxIrdDialog;

       }
    set viewEnseignementEnjeuxIrdDialog(value: boolean) {
        this.enseignementEnjeuxIrdService.viewEnseignementEnjeuxIrdDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
