import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-view-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-view-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-view-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
    ,private communauteSavoirService :CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique():DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.viewDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog= value;
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
       get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques():Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get editDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
