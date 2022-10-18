import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-encadrement-etudiant-enjeux-ird-view-admin',
  templateUrl: './encadrement-etudiant-enjeux-ird-view-admin.component.html',
  styleUrls: ['./encadrement-etudiant-enjeux-ird-view-admin.component.css']
})
export class EncadrementEtudiantEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private encadrementEtudiantService :EncadrementEtudiantService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewEncadrementEtudiantEnjeuxIrdDialog  = false;
}

// getters and setters

get encadrementEtudiantEnjeuxIrds(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    return this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds;
       }
set encadrementEtudiantEnjeuxIrds(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds = value;
       }

 get selectedEncadrementEtudiantEnjeuxIrd():EncadrementEtudiantEnjeuxIrdVo {
           return this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd;
       }
    set selectedEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd = value;
       }

   get viewEncadrementEtudiantEnjeuxIrdDialog():boolean {
           return this.encadrementEtudiantEnjeuxIrdService.viewEncadrementEtudiantEnjeuxIrdDialog;

       }
    set viewEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.viewEncadrementEtudiantEnjeuxIrdDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
