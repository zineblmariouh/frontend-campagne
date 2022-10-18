import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-evenement-colloque-scientifique-view-admin',
  templateUrl: './communaute-savoir-evenement-colloque-scientifique-view-admin.component.html',
  styleUrls: ['./communaute-savoir-evenement-colloque-scientifique-view-admin.component.css']
})
export class CommunauteSavoirEvenementColloqueScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirEvenementColloqueScientifiqueService: CommunauteSavoirEvenementColloqueScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
}

hideViewDialog(){
    this.viewCommunauteSavoirEvenementColloqueScientifiqueDialog  = false;
}

// getters and setters

get communauteSavoirEvenementColloqueScientifiques(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    return this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques;
       }
set communauteSavoirEvenementColloqueScientifiques(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques = value;
       }

 get selectedCommunauteSavoirEvenementColloqueScientifique():CommunauteSavoirEvenementColloqueScientifiqueVo {
           return this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique;
       }
    set selectedCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique = value;
       }

   get viewCommunauteSavoirEvenementColloqueScientifiqueDialog():boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.viewCommunauteSavoirEvenementColloqueScientifiqueDialog;

       }
    set viewCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.viewCommunauteSavoirEvenementColloqueScientifiqueDialog= value;
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
