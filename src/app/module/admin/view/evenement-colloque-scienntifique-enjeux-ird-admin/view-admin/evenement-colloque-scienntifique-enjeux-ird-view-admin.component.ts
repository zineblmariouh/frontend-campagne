import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiqueEnjeuxIrdService} from '../../../../../controller/service/EvenementColloqueScienntifiqueEnjeuxIrd.service';
import {EvenementColloqueScienntifiqueEnjeuxIrdVo} from '../../../../../controller/model/EvenementColloqueScienntifiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-enjeux-ird-view-admin',
  templateUrl: './evenement-colloque-scienntifique-enjeux-ird-view-admin.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-enjeux-ird-view-admin.component.css']
})
export class EvenementColloqueScienntifiqueEnjeuxIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private evenementColloqueScienntifiqueEnjeuxIrdService: EvenementColloqueScienntifiqueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

hideViewDialog(){
    this.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiqueEnjeuxIrds(): Array<EvenementColloqueScienntifiqueEnjeuxIrdVo> {
    return this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds;
       }
set evenementColloqueScienntifiqueEnjeuxIrds(value: Array<EvenementColloqueScienntifiqueEnjeuxIrdVo>) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.evenementColloqueScienntifiqueEnjeuxIrds = value;
       }

 get selectedEvenementColloqueScienntifiqueEnjeuxIrd():EvenementColloqueScienntifiqueEnjeuxIrdVo {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd;
       }
    set selectedEvenementColloqueScienntifiqueEnjeuxIrd(value: EvenementColloqueScienntifiqueEnjeuxIrdVo) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.selectedEvenementColloqueScienntifiqueEnjeuxIrd = value;
       }

   get viewEvenementColloqueScienntifiqueEnjeuxIrdDialog():boolean {
           return this.evenementColloqueScienntifiqueEnjeuxIrdService.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog;

       }
    set viewEvenementColloqueScienntifiqueEnjeuxIrdDialog(value: boolean) {
        this.evenementColloqueScienntifiqueEnjeuxIrdService.viewEvenementColloqueScienntifiqueEnjeuxIrdDialog= value;
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
       get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques():Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get editEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;
       }
      set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
