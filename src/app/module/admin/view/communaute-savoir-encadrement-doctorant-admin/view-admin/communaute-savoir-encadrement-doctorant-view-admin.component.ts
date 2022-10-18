import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-encadrement-doctorant-view-admin',
  templateUrl: './communaute-savoir-encadrement-doctorant-view-admin.component.html',
  styleUrls: ['./communaute-savoir-encadrement-doctorant-view-admin.component.css']
})
export class CommunauteSavoirEncadrementDoctorantViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirEncadrementDoctorantService: CommunauteSavoirEncadrementDoctorantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private encadrementDoctorantService :EncadrementDoctorantService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
}

hideViewDialog(){
    this.viewCommunauteSavoirEncadrementDoctorantDialog  = false;
}

// getters and setters

get communauteSavoirEncadrementDoctorants(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    return this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants;
       }
set communauteSavoirEncadrementDoctorants(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants = value;
       }

 get selectedCommunauteSavoirEncadrementDoctorant():CommunauteSavoirEncadrementDoctorantVo {
           return this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant;
       }
    set selectedCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant = value;
       }

   get viewCommunauteSavoirEncadrementDoctorantDialog():boolean {
           return this.communauteSavoirEncadrementDoctorantService.viewCommunauteSavoirEncadrementDoctorantDialog;

       }
    set viewCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.viewCommunauteSavoirEncadrementDoctorantDialog= value;
       }

       get selectedCommunauteSavoir():CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs():Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get editCommunauteSavoirDialog():boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;
       }
      set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog= value;
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
