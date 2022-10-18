import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';

@Component({
  selector: 'app-enjeux-ird-encadrement-doctorant-view-admin',
  templateUrl: './enjeux-ird-encadrement-doctorant-view-admin.component.html',
  styleUrls: ['./enjeux-ird-encadrement-doctorant-view-admin.component.css']
})
export class EnjeuxIrdEncadrementDoctorantViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdEncadrementDoctorantService: EnjeuxIrdEncadrementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private encadrementDoctorantService :EncadrementDoctorantService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
}

hideViewDialog(){
    this.viewEnjeuxIrdEncadrementDoctorantDialog  = false;
}

// getters and setters

get enjeuxIrdEncadrementDoctorants(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    return this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants;
       }
set enjeuxIrdEncadrementDoctorants(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants = value;
       }

 get selectedEnjeuxIrdEncadrementDoctorant():EnjeuxIrdEncadrementDoctorantVo {
           return this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant;
       }
    set selectedEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant = value;
       }

   get viewEnjeuxIrdEncadrementDoctorantDialog():boolean {
           return this.enjeuxIrdEncadrementDoctorantService.viewEnjeuxIrdEncadrementDoctorantDialog;

       }
    set viewEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this.enjeuxIrdEncadrementDoctorantService.viewEnjeuxIrdEncadrementDoctorantDialog= value;
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
       get selectedEncadrementDoctorant():EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants():Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get editEncadrementDoctorantDialog():boolean {
           return this.encadrementDoctorantService.editEncadrementDoctorantDialog;
       }
      set editEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.editEncadrementDoctorantDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
