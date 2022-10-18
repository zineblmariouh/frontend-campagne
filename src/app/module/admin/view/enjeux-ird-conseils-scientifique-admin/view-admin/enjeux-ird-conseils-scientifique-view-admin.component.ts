import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConseilsScientifiqueService} from '../../../../../controller/service/EnjeuxIrdConseilsScientifique.service';
import {EnjeuxIrdConseilsScientifiqueVo} from '../../../../../controller/model/EnjeuxIrdConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-conseils-scientifique-view-admin',
  templateUrl: './enjeux-ird-conseils-scientifique-view-admin.component.html',
  styleUrls: ['./enjeux-ird-conseils-scientifique-view-admin.component.css']
})
export class EnjeuxIrdConseilsScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdConseilsScientifiqueService: EnjeuxIrdConseilsScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conseilsScientifiqueService :ConseilsScientifiqueService
    ,private enjeuxIrdService :EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
}

hideViewDialog(){
    this.viewEnjeuxIrdConseilsScientifiqueDialog  = false;
}

// getters and setters

get enjeuxIrdConseilsScientifiques(): Array<EnjeuxIrdConseilsScientifiqueVo> {
    return this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques;
       }
set enjeuxIrdConseilsScientifiques(value: Array<EnjeuxIrdConseilsScientifiqueVo>) {
        this.enjeuxIrdConseilsScientifiqueService.enjeuxIrdConseilsScientifiques = value;
       }

 get selectedEnjeuxIrdConseilsScientifique():EnjeuxIrdConseilsScientifiqueVo {
           return this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique;
       }
    set selectedEnjeuxIrdConseilsScientifique(value: EnjeuxIrdConseilsScientifiqueVo) {
        this.enjeuxIrdConseilsScientifiqueService.selectedEnjeuxIrdConseilsScientifique = value;
       }

   get viewEnjeuxIrdConseilsScientifiqueDialog():boolean {
           return this.enjeuxIrdConseilsScientifiqueService.viewEnjeuxIrdConseilsScientifiqueDialog;

       }
    set viewEnjeuxIrdConseilsScientifiqueDialog(value: boolean) {
        this.enjeuxIrdConseilsScientifiqueService.viewEnjeuxIrdConseilsScientifiqueDialog= value;
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
       get selectedConseilsScientifique():ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques():Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get editConseilsScientifiqueDialog():boolean {
           return this.conseilsScientifiqueService.editConseilsScientifiqueDialog;
       }
      set editConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.editConseilsScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
