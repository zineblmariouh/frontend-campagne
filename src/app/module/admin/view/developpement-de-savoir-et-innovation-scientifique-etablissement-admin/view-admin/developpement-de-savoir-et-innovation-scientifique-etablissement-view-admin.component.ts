import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-etablissement-view-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-etablissement-view-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-etablissement-view-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEtablissementViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEtablissementService: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
    ,private etablissementService :EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEtablissements(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements;
       }
set developpementDeSavoirEtInnovationScientifiqueEtablissements(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement():DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.viewDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog= value;
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
