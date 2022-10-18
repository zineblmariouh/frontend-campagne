import {Component, OnInit} from '@angular/core';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.service';
import {CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/CaracterisationDeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CaracterisationVo} from '../../../../../controller/model/Caracterisation.model';
import {CaracterisationService} from '../../../../../controller/service/Caracterisation.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-caracterisation-developpement-de-savoir-et-innovation-scientifique-view-admin',
  templateUrl: './caracterisation-developpement-de-savoir-et-innovation-scientifique-view-admin.component.html',
  styleUrls: ['./caracterisation-developpement-de-savoir-et-innovation-scientifique-view-admin.component.css']
})
export class CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private caracterisationService :CaracterisationService
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedCaracterisation = new CaracterisationVo();
    this.caracterisationService.findAll().subscribe((data) => this.caracterisations = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
}

// getters and setters

get caracterisationDeveloppementDeSavoirEtInnovationScientifiques(): Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques;
       }
set caracterisationDeveloppementDeSavoirEtInnovationScientifiques(value: Array<CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.caracterisationDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique():CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique(value: CaracterisationDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.selectedCaracterisationDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.caracterisationDeveloppementDeSavoirEtInnovationScientifiqueService.viewCaracterisationDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

       get selectedCaracterisation():CaracterisationVo {
           return this.caracterisationService.selectedCaracterisation;
       }
      set selectedCaracterisation(value: CaracterisationVo) {
        this.caracterisationService.selectedCaracterisation = value;
       }
       get caracterisations():Array<CaracterisationVo> {
           return this.caracterisationService.caracterisations;
       }
       set caracterisations(value: Array<CaracterisationVo>) {
        this.caracterisationService.caracterisations = value;
       }
       get editCaracterisationDialog():boolean {
           return this.caracterisationService.editCaracterisationDialog;
       }
      set editCaracterisationDialog(value: boolean) {
        this.caracterisationService.editCaracterisationDialog= value;
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
