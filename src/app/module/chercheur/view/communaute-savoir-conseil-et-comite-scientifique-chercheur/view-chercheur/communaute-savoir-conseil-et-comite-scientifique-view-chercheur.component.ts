import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirConseilEtComiteScientifiqueService} from '../../../../../controller/service/CommunauteSavoirConseilEtComiteScientifique.service';
import {CommunauteSavoirConseilEtComiteScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirConseilEtComiteScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {ConseilEtComiteScientifiqueService} from '../../../../../controller/service/ConseilEtComiteScientifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-conseil-et-comite-scientifique-view-chercheur',
  templateUrl: './communaute-savoir-conseil-et-comite-scientifique-view-chercheur.component.html',
  styleUrls: ['./communaute-savoir-conseil-et-comite-scientifique-view-chercheur.component.css']
})
export class CommunauteSavoirConseilEtComiteScientifiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirConseilEtComiteScientifiqueService: CommunauteSavoirConseilEtComiteScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conseilEtComiteScientifiqueService :ConseilEtComiteScientifiqueService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
    this.conseilEtComiteScientifiqueService.findAll().subscribe((data) => this.conseilEtComiteScientifiques = data);
}

hideViewDialog(){
    this.viewCommunauteSavoirConseilEtComiteScientifiqueDialog  = false;
}

// getters and setters

get communauteSavoirConseilEtComiteScientifiques(): Array<CommunauteSavoirConseilEtComiteScientifiqueVo> {
    return this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiques;
       }
set communauteSavoirConseilEtComiteScientifiques(value: Array<CommunauteSavoirConseilEtComiteScientifiqueVo>) {
        this.communauteSavoirConseilEtComiteScientifiqueService.communauteSavoirConseilEtComiteScientifiques = value;
       }

 get selectedCommunauteSavoirConseilEtComiteScientifique():CommunauteSavoirConseilEtComiteScientifiqueVo {
           return this.communauteSavoirConseilEtComiteScientifiqueService.selectedCommunauteSavoirConseilEtComiteScientifique;
       }
    set selectedCommunauteSavoirConseilEtComiteScientifique(value: CommunauteSavoirConseilEtComiteScientifiqueVo) {
        this.communauteSavoirConseilEtComiteScientifiqueService.selectedCommunauteSavoirConseilEtComiteScientifique = value;
       }

   get viewCommunauteSavoirConseilEtComiteScientifiqueDialog():boolean {
           return this.communauteSavoirConseilEtComiteScientifiqueService.viewCommunauteSavoirConseilEtComiteScientifiqueDialog;

       }
    set viewCommunauteSavoirConseilEtComiteScientifiqueDialog(value: boolean) {
        this.communauteSavoirConseilEtComiteScientifiqueService.viewCommunauteSavoirConseilEtComiteScientifiqueDialog= value;
       }

       get selectedConseilEtComiteScientifique():ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
      set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }
       get conseilEtComiteScientifiques():Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
       set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }
       get editConseilEtComiteScientifiqueDialog():boolean {
           return this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog;
       }
      set editConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.editConseilEtComiteScientifiqueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
