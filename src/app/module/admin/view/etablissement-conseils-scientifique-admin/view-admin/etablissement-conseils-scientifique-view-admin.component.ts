import {Component, OnInit} from '@angular/core';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-conseils-scientifique-view-admin',
  templateUrl: './etablissement-conseils-scientifique-view-admin.component.html',
  styleUrls: ['./etablissement-conseils-scientifique-view-admin.component.css']
})
export class EtablissementConseilsScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementConseilsScientifiqueService: EtablissementConseilsScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private conseilsScientifiqueService :ConseilsScientifiqueService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

hideViewDialog(){
    this.viewEtablissementConseilsScientifiqueDialog  = false;
}

// getters and setters

get etablissementConseilsScientifiques(): Array<EtablissementConseilsScientifiqueVo> {
    return this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques;
       }
set etablissementConseilsScientifiques(value: Array<EtablissementConseilsScientifiqueVo>) {
        this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques = value;
       }

 get selectedEtablissementConseilsScientifique():EtablissementConseilsScientifiqueVo {
           return this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique;
       }
    set selectedEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique = value;
       }

   get viewEtablissementConseilsScientifiqueDialog():boolean {
           return this.etablissementConseilsScientifiqueService.viewEtablissementConseilsScientifiqueDialog;

       }
    set viewEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.viewEtablissementConseilsScientifiqueDialog= value;
       }

       get selectedEtablissement():EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements():Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get editEtablissementDialog():boolean {
           return this.etablissementService.editEtablissementDialog;
       }
      set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog= value;
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
